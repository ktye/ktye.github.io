// gcc -O3 fft2.c -lm -o fft2
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define TOP_K 10

typedef struct {
    int bin;
    double amplitude;
} Peak;

static uint32_t state;

static uint32_t rng(void)
{
    state = UINT32_C(1103515245) * state + UINT32_C(12345);
    return state >> 16;
}

/* A min-heap: the smallest retained peak is at heap[0]. */
static int smaller(Peak a, Peak b)
{
    return a.amplitude < b.amplitude ||
           (a.amplitude == b.amplitude && a.bin > b.bin);
}

static void sift_up(Peak *heap, int i)
{
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (!smaller(heap[i], heap[parent]))
            break;

        Peak tmp = heap[i];
        heap[i] = heap[parent];
        heap[parent] = tmp;
        i = parent;
    }
}

static void sift_down(Peak *heap, int size, int i)
{
    for (;;) {
        int left = 2 * i + 1;
        int right = left + 1;
        int smallest = i;

        if (left < size && smaller(heap[left], heap[smallest]))
            smallest = left;
        if (right < size && smaller(heap[right], heap[smallest]))
            smallest = right;
        if (smallest == i)
            break;

        Peak tmp = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = tmp;
        i = smallest;
    }
}

static int larger(Peak a, Peak b)
{
    return a.amplitude > b.amplitude ||
           (a.amplitude == b.amplitude && a.bin < b.bin);
}

static void sort_descending(Peak *peaks, int count)
{
    /* Insertion sort is efficient for at most 10 items. */
    for (int i = 1; i < count; ++i) {
        Peak value = peaks[i];
        int j = i;
        while (j > 0 && larger(value, peaks[j - 1])) {
            peaks[j] = peaks[j - 1];
            --j;
        }
        peaks[j] = value;
    }
}

void fft(double *a, size_t n) {
    if (a == NULL || n == 0 || (n & (n - 1)) != 0) exit(1);
    if (n == 1) return;

    const double angle = -2.0 * M_PI / (double)n;

    double *even = calloc(8,n);
    double *odd  = calloc(8,n);

    /* Split input into even-indexed and odd-indexed complex values. */
    for (size_t k = 0; k < n / 2; ++k) {
        even[2 * k]     = a[4 * k];
        even[2 * k + 1] = a[4 * k + 1];
        odd[2 * k]      = a[4 * k + 2];
        odd[2 * k + 1]  = a[4 * k + 3];
    }

    fft(even, n / 2);
    fft(odd, n / 2);

    for (size_t k = 0; k < n / 2; ++k) {
     double theta = angle * (double)k;
     double wr = cos(theta);
     double wi = sin(theta);

     double or = odd[2 * k];
     double oi = odd[2 * k + 1];

     /* t = (wr + i*wi) * odd[k] */
     double tr = wr * or - wi * oi;
     double ti = wr * oi + wi * or;

     double er = even[2 * k];
     double ei = even[2 * k + 1];

     a[2 * k]         = er + tr;
     a[2 * k + 1]     = ei + ti;
     a[2 * (k + n/2)]     = er - tr;
     a[2 * (k + n/2) + 1] = ei - ti;
    }

    free(even);
    free(odd);
}


#include <math.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

/* Multiply (xr + i*xi) by (wr + i*wi). */
static void cmul(double xr, double xi, double wr, double wi,
                 double *yr, double *yi)
{
    *yr = xr * wr - xi * wi;
    *yi = xr * wi + xi * wr;
}

void fft4(double *a, size_t n) { //radix-4
    if (n == 1) return;
    if (n == 2) { // Radix-2 base case. 
        double ar = a[0], ai = a[1];
        double br = a[2], bi = a[3];
        a[0] = (ar + br) ;
        a[1] = (ai + bi) ;
        a[2] = (ar - br) ;
        a[3] = (ai - bi) ;
        return;
    }

    size_t m = n / 4; if (n > SIZE_MAX / (2 * sizeof(double))) return;

    /* Temporary storage for the four decimated subsequences. */
    double *tmp = malloc(2 * n * sizeof(*tmp));
    double *s0 = tmp;
    double *s1 = tmp + 2 * m;
    double *s2 = tmp + 4 * m;
    double *s3 = tmp + 6 * m;

    /* Split x[4*j + r] into four length-m sequences. */
    for (size_t j = 0; j < m; ++j) {
        s0[2*j]     = a[8*j];
        s0[2*j + 1] = a[8*j + 1];

        s1[2*j]     = a[8*j + 2];
        s1[2*j + 1] = a[8*j + 3];

        s2[2*j]     = a[8*j + 4];
        s2[2*j + 1] = a[8*j + 5];

        s3[2*j]     = a[8*j + 6];
        s3[2*j + 1] = a[8*j + 7];
    }

    fft4(s0,m);fft4(s1,m);fft4(s2,m);fft4(s3,m);

    for (size_t k = 0; k < m; ++k) {
        double theta = -2.0 * M_PI * (double)k / (double)n;

        double c1 = cos(theta),     w1i = sin(theta);
        double c2 = cos(2 * theta), w2i = sin(2 * theta);
        double c3 = cos(3 * theta), w3i = sin(3 * theta);

        double ar = s0[2*k],     ai = s0[2*k + 1];
        double br, bi, cr, ci, dr, di;

        cmul(s1[2*k], s1[2*k + 1], c1, w1i, &br, &bi);
        cmul(s2[2*k], s2[2*k + 1], c2, w2i, &cr, &ci);
        cmul(s3[2*k], s3[2*k + 1], c3, w3i, &dr, &di);

        /* Radix-4 butterfly. */
        double pr = ar + cr, pi_ = ai + ci;
        double qr = ar - cr, qi_ = ai - ci;
        double rr = br + dr, ri = bi + di;
        double tr = br - dr, ti = bi - di;

        size_t i0 = k;
        size_t i1 = k + m;
        size_t i2 = k + 2*m;
        size_t i3 = k + 3*m;

        /* X[k] */
        a[2*i0]     = (pr + rr) ;
        a[2*i0 + 1] = (pi_ + ri) ;

        /* X[k + m] */
        a[2*i1]     = (qr + ti) ;
        a[2*i1 + 1] = (qi_ - tr) ;

        /* X[k + 2m] */
        a[2*i2]     = (pr - rr) ;
        a[2*i2 + 1] = (pi_ - ri) ;

        /* X[k + 3m] */
        a[2*i3]     = (qr - ti) ;
        a[2*i3 + 1] = (qi_ + tr);
    }

    free(tmp);
}

#include <math.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

void fft_stockham(double *a, size_t n) {
    if (a == NULL || n == 0 || (n & (n - 1)) != 0 || n == 1) return;
    if (n > SIZE_MAX / (2 * sizeof(*a))) return;

    double *scratch = malloc(2 * n * sizeof(*scratch));
    if (scratch == NULL) return;

    double *src = a;
    double *dst = scratch;

    size_t r = n / 2;
    size_t l = 1;

    while (r != 0) {
        /* One twiddle step for this stage: exp(-i*pi/l). */
        double step_angle = -M_PI / (double)l;
        double step_re = cos(step_angle);
        double step_im = sin(step_angle);

        for (size_t j = 0; j < l; ++j) {
            double w_re = 1.0;
            double w_im = 0.0;

            size_t jrs = j * (2 * r);
            size_t m = jrs / 2;

            for (size_t k = jrs; k < jrs + r; ++k, ++m) {
                double ar = src[2 * k];
                double ai = src[2 * k + 1];
                double br = src[2 * (k + r)];
                double bi = src[2 * (k + r) + 1];

                /* t = (w_re + i*w_im) * (br + i*bi) */
                double tr = w_re * br - w_im * bi;
                double ti = w_re * bi + w_im * br;

                dst[2 * m]             = ar + tr;
                dst[2 * m + 1]         = ai + ti;
                dst[2 * (m + n / 2)]   = ar - tr;
                dst[2 * (m + n / 2)+1] = ai - ti;

                /* Advance the twiddle by one step. */
                double next_re = w_re * step_re - w_im * step_im;
                w_im = w_re * step_im + w_im * step_re;
                w_re = next_re;
            }
        }

        double *swap = src;
        src = dst;
        dst = swap;

        r /= 2;
        l *= 2;
    }

    if (src != a) memcpy(a, src, 2 * n * sizeof(*a));
    free(scratch);
}

void rfft(double *x, size_t n) {
    if (x == NULL || n == 0 || (n & (n - 1)) != 0) return;
    if (n == 1) return;
    if (n > SIZE_MAX / sizeof(double)) return;

    size_t m = n / 2;
    double *a = malloc(n * sizeof(*a));
    if (a == NULL) return;

    for (size_t j = 0; j < m; ++j) {
        a[2 * j]     = x[2 * j];
        a[2 * j + 1] = x[2 * j + 1];
    }

    fft_stockham(a, m);

    /* DC and Nyquist bins come from the packed FFT's bin zero. */
    x[0] = a[0] + a[1];
    //x[1] = a[0] - a[1]; //nyquist
    x[1] = 0.0;


    for (size_t k = 1; k < m; ++k) {
        size_t km = m - k;

        double ar = a[2 * k];
        double ai = a[2 * k + 1];

        /* B = conjugate(a[m-k]). */
        double br = a[2 * km];
        double bi = -a[2 * km + 1];

        double dr = ar - br;
        double di = ai - bi;

        double theta = -2.0 * M_PI * (double)k / (double)n;
        double wr = cos(theta);
        double wi = sin(theta);

        /* t = W_n^k * (A - B). */
        double tr = wr * dr - wi * di;
        double ti = wr * di + wi * dr;

        x[2 * k]     = 0.5 * (ar + br + ti);
        x[2 * k + 1] = 0.5 * (ai + bi - tr);
    }

    free(a);
}




int main(int argc, char **argv) {
    char *end; long parsed_n = (argc > 1) ? strtol(argv[1], &end, 10) : 16;

    if (argc > 1 && (*end != '\0' || parsed_n <= 0 || parsed_n > 2147483647L)) { return 1; }

    int n = (int)parsed_n; int bins = n / 2;  /* Matches Python's fft_raw[:N // 2]. */

    //double *x=calloc(16,n);
    //state = (uint32_t)n; for (int i = 0; i < n; ++i){x[2*i] = (double)rng() / 32768.0 - 1.0; x[2*i+1]=0.0;}
    //fft_stockham(x,n);

    double *x=calloc(8,n);
    state = (uint32_t)n; for (int i = 0; i < n; ++i)x[i] = (double)rng() / 32768.0 - 1.0;
    rfft(x,n);


    Peak heap[TOP_K];
    int count = 0;
    int limit = bins < TOP_K ? bins : TOP_K;

    for (int k = 0; k < bins; ++k) {
        double re = x[2*k];
        double im = x[2*k+1];
        double amplitude = (re * re + im * im) / ((double)n * n);
        if (k != 0) amplitude *= 4.0; /* Squaring the Python's factor-of-2 scale. */
        amplitude = sqrt(amplitude);

        Peak peak = { k, amplitude };
        if (count < limit) {
            heap[count] = peak;
            sift_up(heap, count);
            ++count;
        } else if (larger(peak, heap[0])) {
            heap[0] = peak;
            sift_down(heap, count, 0);
        }
    }

    sort_descending(heap, count);
    for (int i = 0; i < count; ++i) printf("%.1f\t%.9f\n", (double)heap[i].bin, heap[i].amplitude);

    return 0;
}

