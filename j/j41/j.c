/* ----------------------------------------------------------------------- */
/* J-Source Version 4.1 - COPYRIGHT 1992 Iverson Software Inc.             */
/* 33 Major Street, Toronto, Ontario, Canada, M5S 2K9, (416) 925 6096      */
/*                                                                         */
/* J-Source is provided "as is" without warranty of any kind.              */
/*                                                                         */
/* J-Source Version 4.1 license agreement:  You may use, copy, and         */
/* modify the source.  You have a non-exclusive, royalty-free right        */
/* to redistribute source and executable files.                            */
/* ----------------------------------------------------------------------- */
/*                                                                         */
/* main(), Main Loop, & Global Variables                                   */

#include "j.h"


A alp,a0j1,dash,jot,mark,mtv,neg1,one,pie,two,zero;
B asgn;
I bytes,maxbytes,tbase= -NTSTACK,totbytes,ttop=NTSTACK;
B errsee=!LINKJ;
D inf;
C jerr;
D nan;
C obuf[NOBUF],tostdout=1; FILE*infile,*outfile;
A qevm;
D qfuzz;
C qprompt[1+NPROMPT]="   ";
I qrl=16807;
B sesm;
D tssbase;
Z zeroZ={0,0};

#if (SYS & SYS_PC+SYS_PC386)
C*edbuf;
U _stklen = 65535u;
C qbx[11]={218,194,191, 195,197,180, 192,193,217, 179,196};
#else
C qbx[11]={43,43,43,    43,43,43,    43,43,43,    124,45 };
#endif


C immloop(){A x=mtv;I old=tbase+ttop;
 while(x)
  if(!appf()){
   prompt(qprompt); x=jgets();
   if(jerr)x=mtv; else{maxbytes=bytes; immex(x);}
   jerr=0;
   tpop(old);
}}


#if !LINKJ
int main(argc,argv)int argc;C**argv;{if(jinit2(argc,argv))immloop();}
#endif
