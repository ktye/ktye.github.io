#include<stdio.h>
#include<stdlib.h>
#include"udis86.h"

uint32_t elf,entry,vaddr,end;
char*b;
/*
int hook(struct ud*){
 static int p=0;
 if(p==end)return UD_EOI;
 p++;
 int i=p-entry+elf-1;
 //if(i>=0)printf("read p=%d %d\n", p-1, i);
 if(i>=0)printf("%x %x  %02x %02x %02x\n",p,p+elf,0xff&b[i],0xff&b[1+i],0xff&b[2+i]);
 if(p<entry)return 0;
 return 0xff&b[i];
}
*/
int hook(struct ud*){
 static int p=0;
 if(p+entry==end)return UD_EOI;
 return 0xff&b[p++];
}

int main(int args,char**argv) {
 ud_t ud_obj;

 if(args!=2){printf("use: ud file.elf\n");return 1;}
 b=malloc(1024*1024);
 FILE *fp=fopen(argv[1],"rb");
 if(!fp){printf("cannot open file: %s\n",argv[1]);return 1;}
 size_t n=fread(b,1,1024*1024,fp);
 fclose(fp);
 if(n==0||n<300){printf("cannot read file: %s\n",argv[1]);return 1;}
 if((b[1]!='E'||b[2]!='L'||b[3]!='F')){printf("not an elf file\n");return 1;}
 //uint16_t*h=(uint16_t*)b;
 uint32_t*u=(uint32_t*)b;
 entry=u[6];                             //entry point
 uint32_t p=u[8]>>2;                     //pointer to 1st program header
 uint32_t o=u[p+2],fs=u[p+8];            //offset, section size in elf
 vaddr=u[p+4];                           //virtual address
 if(o){printf("offset is not 0\n");return 1;}
 elf=entry-vaddr;
 end=vaddr+fs;
 printf("elf %u is vaddr %u, entry: %u, end: %u\n",elf,vaddr,entry,fs);
/*
    let M,rip
let loadelf=u=>{let U=new Uint32Array(u.buffer,0,u.buffer.byteLength>>>2),H=new Uint16Array(u.buffer,0,u.buffer.byteLength>>>1),n=H[28],p=U[8]>>>2,i,s=[],m=0
 for(i=0;i<n;i++){s.push({o:U[p+2],va:U[p+4],fs:U[p+8]});m=Math.max(m,U[p+4]+U[p+10]);p+=14};M=new Uint8Array(m);s.forEach(x=>M.set(u.subarray(x.o,x.o+x.fs),x.va));rip=U[6]}

let show=_=>{let s="";for(let i=0;i<10;i++)s+=M[rip+i].toString(16).padStart("0")+" ";return s}
*/

 ud_init(&ud_obj);
 //ud_set_input_file(&ud_obj, stdin);
 ud_set_input_hook(&ud_obj,&hook);
 //ud_input_skip(&ud_obj,entry);
 ud_input_skip(&ud_obj,elf);
 ud_set_pc(&ud_obj,entry);
 ud_set_mode(&ud_obj, 64);
 ud_set_syntax(&ud_obj, UD_SYN_INTEL);

 while (ud_disassemble(&ud_obj)) {
  uint64_t p=ud_insn_off(&ud_obj);
  uint8_t*b=ud_obj.inp_sess;
  uint8_t x=b[0];
  printf("%016x\t%s\t%s\tpc=%x\n", p, ud_insn_asm(&ud_obj),ud_insn_hex(&ud_obj),ud_obj.pc);

  if(x==0x2e||x==0x36||x==0x3e||x==0x26||x==0x64||x==0x65||x==0xf0){
   printf("prefix %x\n",x);return 1;
  }
  // 66 67 f2 f3 65
 }

 return 0;
}
