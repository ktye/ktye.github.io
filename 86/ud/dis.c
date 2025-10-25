#include"udis86.h"

//exported: dis_init and dis
//dis_init returns pointer to ud_obj
//ud_obj.inp_buf contains the pointer to the input buffer.
//fill this buffer with the next 16 bytes relative to rip,
//and call dis(). the result is stored in ud_obj.
//increment rip by the return from dis(), and interprete ud_obj.

ud_t    ud_obj;
uint8_t buf[16];

//uint32_t ptrdiff(void*a,void*b){return((uint32_t)b-(uint32_t)a);}
//uint32_t dis_init(uint32_t x){return ptrdiff(&ud_obj,&ud_obj.inp_buf);}

ud_t*dis_init(uint32_t pc){
 ud_init(&ud_obj);
 ud_set_pc(&ud_obj,(uint64_t)pc);
 ud_set_mode(&ud_obj,64);
 ud_obj.inp_buf=buf;
 return&ud_obj;
}

int dis(void){
 ud_set_input_buffer(&ud_obj,buf,16);
 int r=ud_disassemble(&ud_obj);
 return r?ud_obj.inp_ctr:0;
}
