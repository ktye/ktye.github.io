//profile: e.g. github.com/garmin/fit-python-sdk/blob/fa2e79e1/garmin_fit_sdk/profile.py#L8825

//wasm interface: (ifdef W)
//  Buf(filesize) => fill data to the return addr. 2mb max.
//  n=Parse();    => number of samples (0 error)
//  Start();Duration();Distance();Sport();Laps();
//  Lat();Lon();Time();Dist();Bpm();Alt(); => (u)int32 vector addr.  #frames.
//  LapStart();LapTime();LapDist();        => (u)int32 vector addr.  #laps.
//
//otherwise use libc, read file from argv1 and print

//my largest file is 2mb.
//24h is 86400 frames at 1hz.
//1frame: lat lon time dist bpm alt
//        4   4   4    4    4   4    =24bytes =>2mb
//
//session: start duration dist laps
//lap:     start duration dist   

//timestamps: uint32 seconds since fit-epoche(1989): 631065600(unix offset)

#ifndef W
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#endif


uint32_t start; uint32_t Start(){return start;}                     //session start timestamp. sec since fit-epoche, add 631065600 to unix seconds.
uint32_t duration;double Duration(){return 0.001*(double)duration;} //s
uint32_t distance;double Distance(){return 0.01*(double)distance;}  //m
uint32_t sport; uint32_t Sport(){return sport;}                     //1(run) 2(bike)

#define MX 86400  //samples
 int32_t  lat[MX], lon[MX]; //semicycles mult with 180.0/2147483648.0 (deg)
uint32_t time[MX];          //frame timestamp
uint32_t dist[MX];          //mult with 0.01 to m
uint32_t  bpm[MX];          //heart rate, was uint8
 int32_t  alt[MX];          //elevation. (x/5)-500 to m

uint8_t buf[2*1024*1024];   //file data
uint8_t*Buf(size_t s){data_end=buf+s;return buf;}

uint32_t Distance(){return start;}
uint32_t Start(){return start;}

static uint8_t  read_u8 (const uint8_t *b, size_t *p){ return b[(*p)++]; }
static uint16_t read_u16le(const uint8_t *b, size_t *p){
    uint16_t v = (uint16_t)b[*p] | ((uint16_t)b[*p+1] << 8);
    *p += 2; return v;
}
static uint32_t read_u32le(const uint8_t *b, size_t *p){
    uint32_t v = (uint32_t)b[*p] |
                 ((uint32_t)b[*p+1] << 8) |
                 ((uint32_t)b[*p+2] << 16) |
                 ((uint32_t)b[*p+3] << 24);
    *p += 4; return v;
}
static int32_t read_i32le(const uint8_t *b, size_t *p){
    int32_t v = (int32_t)(
        (uint32_t)b[*p] |
        ((uint32_t)b[*p+1] << 8) |
        ((uint32_t)b[*p+2] << 16) |
        ((uint32_t)b[*p+3] << 24)
    );
    *p += 4; return v;
}

typedef struct {
    uint8_t field_index;
    uint8_t size;
    uint8_t base_type;
} FieldDef;

typedef struct {
    int used;
    uint16_t global_msg_num;
    uint8_t field_count;
    FieldDef fields[128];
} MsgDef;

static int field_size_sum(const MsgDef *d){
    int s = 0;
    for (int i = 0; i < d->field_count; i++) s += d->fields[i].size;
    return s;
}

int main(int argc, char **argv){
    if (argc != 2) {
        fprintf(stderr, "Usage: %s activity.fit\n", argv[0]);
        return 1;
    }

    FILE *f = fopen(argv[1], "rb");
    if (!f){ perror("fopen"); return 1; }

    fseek(f, 0, SEEK_END);
    long sz = ftell(f);
    if (sz < 0) { fclose(f); return 1; }
    fseek(f, 0, SEEK_SET);

    uint8_t *buf = (uint8_t*)malloc((size_t)sz);
    if (!buf){ fclose(f); return 1; }
    if (fread(buf, 1, (size_t)sz, f) != (size_t)sz){
        perror("fread"); fclose(f); return 1;
    }
    fclose(f);

    size_t p = 0;

    uint8_t header_len = read_u8(buf, &p);
    (void)read_u8(buf, &p);              // proto_ver
    (void)read_u16le(buf, &p);         // profile
    uint32_t data_size = read_u32le(buf, &p);

    if (p + 4 > (size_t)sz){ return 1; }
    if (buf[p] != '.' || buf[p+1] != 'F' || buf[p+2] != 'I' || buf[p+3] != 'T'){
        fprintf(stderr, "Not a FIT file\n");
        return 1;
    }
    p += 4;

    size_t data_end = (size_t)header_len + (size_t)data_size;
    if (data_end > (size_t)sz) data_end = (size_t)sz;

    // FIT data begins at header_len in many files.
    p = (size_t)header_len;

    MsgDef defs[16];
    for (int i = 0; i < 16; i++) defs[i].used = 0;

    const double latScale = 180.0 / 2147483648.0; // 2^31
    const double distScale = 1.0 / 100.0;

    while (p < data_end) {
        uint8_t header = read_u8(buf, &p);
        uint8_t is_definition = (header & 0x40) != 0;
        uint8_t local_type = header & 0x0F;

        if (is_definition) {
            (void)read_u8(buf, &p); // reserved
            uint8_t endian_arch = read_u8(buf, &p); // 0=little
            uint16_t global_msg_num = read_u16le(buf, &p);
            uint8_t field_count = read_u8(buf, &p);

            MsgDef *d = &defs[local_type];
            d->used = 1;
            d->global_msg_num = global_msg_num;
            d->field_count = field_count;

            if (field_count > 128) { fprintf(stderr, "Too many fields\n"); return 1; }

            for (int i = 0; i < field_count; i++) {
                d->fields[i].field_index = read_u8(buf, &p);
                d->fields[i].size = read_u8(buf, &p);
                d->fields[i].base_type = read_u8(buf, &p);
            }
            continue;
        }

        MsgDef *d = &defs[local_type];
        if (!d->used) {
            fprintf(stderr, "Missing definition for local type %u\n", local_type);
            return 1;
        }

//printf("msg_num %d\n", d->global_msg_num);
        if (d->global_msg_num == 20) { // record
            int has_lat = 0, has_lon = 0;
            double lat = 0.0, lon = 0.0;

            int has_hr = 0;
            uint8_t hr = 0;

            int has_dist = 0;
            double dist = 0.0;

            for (int i = 0; i < d->field_count; i++) {
                uint8_t fi = d->fields[i].field_index;
                uint8_t szf = d->fields[i].size;

		//    printf("fi=%d sz=%d\n",fi,szf);
                if (szf == 4) {
                    int32_t v = read_i32le(buf, &p);

                    if (fi == 0) { lat = v * latScale; has_lat = 1; }
                    else if (fi == 1) { lon = v * latScale; has_lon = 1; }
                    else if (fi == 5) { has_dist = 1; dist = (double)(uint32_t)v * distScale; }
		    else if (fi == 78) { uint32_t alt=(uint32_t)v; printf("e-alt %d %f\n", v, ((double)alt)/5-500.0);}
		    else if (fi == 253) { uint32_t t=(uint32_t)v; printf("time %d\n", 631065600+(uint64_t)t); }
                } else if (szf == 1) {
                    uint8_t v = read_u8(buf, &p);
                    if (fi == 3) { hr = v; has_hr = 1; }
                } else if (szf == 2) {
			uint16_t alt=read_u16le(buf,&p);
			if(fi == 2) {
				printf("alt %d %f\n",alt,((double)alt)/5-500.0);
			}
                } else { //13(temperature) 2(altitude uint16 sc=5 of=500 "m") 6(speed) 87(why??)
                    // skip other field sizes
                    if (p + szf > data_end) { return 1; }
                    p += szf;
                }

                if (p > data_end) { return 1; }
            }

            if (has_lat && has_lon) {
                if(!has_hr)hr=0;
                printf("%.10f,%.10f,%.3f,%u\n", lat, lon, dist, hr);
            }
        } else if (d->global_msg_num == 18) { // session
printf("session\n");
            for (int i = 0; i < d->field_count; i++) {
                uint8_t fi = d->fields[i].field_index;
                uint8_t szf = d->fields[i].size;
		if (fi == 2) {
			uint32_t t = read_u32le(buf, &p);
			uint64_t fit_epoche = 631065600;
			printf(" session start time %u\n", fit_epoche+(uint64_t)t);
		} else if (fi == 5) { //sport
			printf("sport %d\n", (uint8_t)buf[p]); //1(run) 2(bike)
			p+=szf;
		} else if (fi == 8) { //time (excluding pause)
			uint32_t t = read_u32le(buf, &p);
			printf("duration: %ds (%.2fh)\n", t/1000, (double)t/3600000.0);
		} else if (fi == 9) { //distance
			uint32_t d = read_u32le(buf, &p);
			printf("distance: %.3fk\n", 0.00001*(double)d);
		} else if (fi==26) { //num laps
			uint32_t l = read_u16le(buf, &p);
			printf("laps: %d\n", l);
		} else {
			p+=szf;
		}
	    }
        } else if (d->global_msg_num == 19) { // lap
	    printf("lap\n");
            for (int i = 0; i < d->field_count; i++) {
                uint8_t fi = d->fields[i].field_index;
                uint8_t szf = d->fields[i].size;
		if(fi ==253) { //timestamp
			uint32_t t = read_u32le(buf, &p);
			uint64_t fit_epoche = 631065600;
			printf(" timestamp szf=%d %u\n", szf, fit_epoche+(uint64_t)t);
		} else if (fi == 2) {
			uint32_t t = read_u32le(buf, &p);
			uint64_t fit_epoche = 631065600;
			printf(" start time %u\n", fit_epoche+(uint64_t)t);
		} else if (fi == 8) { //time (excluding pause)
			uint32_t t = read_u32le(buf, &p);
			printf("duration: %ds (%.2fh)\n", t/1000, (double)t/3600000.0);
		} else if (fi == 9) { //distance
			uint32_t d = read_u32le(buf, &p);
			printf("distance: %.3fk\n", 0.00001*(double)d);

		} else {
			p+=szf;
		}
	    }

        } else {
            int skip = field_size_sum(d);
            if (p + (size_t)skip > data_end) break;
            p += (size_t)skip;
        }
    }

    return 0;
}

