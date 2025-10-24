#include"udis86.h"

uint32_t word;
int p;
uint8_t b[16];
ud_t ud_obj;
int hook(struct ud*u){
 if(p==16)return UD_EOI;
 return 0xff&b[p++];
}
void dis_init(uint32_t pc){p=0;ud_init(&ud_obj);ud_set_pc(&ud_obj,(uint64_t)pc);ud_set_mode(&ud_obj,64);ud_set_input_hook(&ud_obj,&hook);}



int dis(uint32_t A,uint32_t B,uint32_t C,uint32_t D){
 uint32_t *u=(uint32_t*)b;u[0]=A;u[1]=B;u[2]=C;u[3]=D;p=0;
 int r=ud_disassemble(&ud_obj);
 return r;
}
uint32_t offset(void){return(uint32_t)ud_obj.insn_offset;}
uint32_t length(void){return ud_obj.inp_ctr;}
// uint32_t op(void){return ud_obj.mnemonic;}



