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
/* Input/Output                                                            */

#include "j.h"
#include "io.h"

#if (SYS & SYS_PC)
#include <dos.h>
static int cbrk;
#endif


static C inbuf[2+NINPUT];
I        jbrk=0;


F1(joff){
#if (SYS & SYS_PC)
 setcbrk(cbrk);
#endif
 if(outfile&&outfile!=stdout)fclose(outfile); sesmexit(); exit(0);
}

void jouts(s)C*s;{if(outfile)fputc(COUT,outfile); jputs(s);}

#ifndef WASM
static void sigint(k)int k;{++jbrk; signal(SIGINT,sigint);}
#endif


/* --------------------- Special Session Manager ------------------------- */

#if (!LINKJ && SYS & SYS_SESM)

#define CINPRUPT "o\010u\010t"

#if (SYS & SYS_PC386)
C breaker(){if(sesm)jstpoll(); if(jbrk){jbrk=0; jsignal(EVBREAK);} R!jerr;}
#else
C breaker(){if(sesm)jstkiav(); if(jbrk){jbrk=0; jsignal(EVBREAK);} R!jerr;}
#endif

A jgets(){C c,*s=inbuf;I k=0,n;
 if(infile==stdin){if(sesm)jsti((SI)NINPUT,s); else RZ(fgets(s,NINPUT,stdin));}
 else{do RZ(fgets(s,NINPUT,infile))while(COUT==*s); k=strspn(s," ");}
 jbrk=0;
 n=strlen(s); if(n&&(c=*(s+n-1),CLF==c||CCR==c)){--n; *(s+n)=0;}
 if(infile!=stdin){jputs(k+s); jputc(CNL);}
 else if(outfile){fputs(k+s,outfile); fputc(CNL,outfile);}
 ASSERT(5!=n||memcmp(s,CINPRUPT,n),EVINPRUPT);
 if(n&&CCTRLD==*(s+n-1))joff(zero);
 R str(n,s);
}

void jputc(c)C c;{
 if(tostdout){if(sesm)jsto((SI)MTYOUT,(SI)1,&c); else fputc(c,stdout);}
 if(outfile)fputc(c,outfile);
}

void jputs(s)C*s;{
 if(tostdout){if(sesm)jsto((SI)MTYOUT,(SI)strlen(s),s); else fputs(s,stdout);}
 if(outfile)fputs(s,outfile);
}

void prompt(s)C*s;{
 if(tostdout){if(sesm)jsto((SI)MTYOIN,(SI)strlen(s),s); else fputs(s,stdout);}
 if(outfile)fputs(s,outfile);
}

void sesmexit(){if(sesm)jststop();}

C sesminit(){
 if(sesm){A t;I j,mask=0xfffffff0L;
  struct{Ptr vlog;SI nlog;Ptr vinb;SI ninb;Ptr vfkd;SI nfkd;Ptr vedb;SI nedb;}in;
#if (SYS & SYS_PC+SYS_PC386)
  /* The 15+ and &0xfffffff0 are because addresses must be segment aligned */
  GA(t,CHAR,15+NLOG,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vlog=(Ptr)j; in.nlog=NLOG;
  GA(t,CHAR,15+NINB,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vinb=(Ptr)j; in.ninb=NINB;
  GA(t,CHAR,15+NFKD,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vfkd=(Ptr)j; in.nfkd=NFKD;
  GA(t,CHAR,15+NEDB,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vedb=(Ptr)j; in.nedb=NEDB;
  edbuf=in.vedb;
#endif
  jstinit((Ptr)&in);
 }
#if (SYS & SYS_PC386)
 else jstsbrk();
#else
 signal(SIGINT,sigint);
#endif
#if (SYS & SYS_PC)
 cbrk=getcbrk(); setcbrk(1);
#endif
 R 1;
}

C*wr(n,v)I n;C*v;{I k=0,m;
 if(tostdout){
  if(sesm)while(n>k&&!jerr){m=MIN(3000,n-k); jsto((SI)MTYOUT,(SI)m,v+k); k+=m;}
  else    while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),stdout);
 }
 if(outfile){
  fputc(COUT,outfile);
  k=0;    while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),outfile);
 }
 jputc(CNL); R v+n;
}


/* --------------------- Others (No Session Manager) --------------------- */

#else

C breaker(){R!jerr;}

A jgets(){C*s=inbuf;I k=0,n;
 if(infile==stdin)RZ(fgets(s,NINPUT,stdin))
 else{do RZ(fgets(s,NINPUT,infile))while(COUT==*s); k=strspn(s," ");}
 jbrk=0;
 n=strlen(s); if(n&&CNL==*(s+n-1)){--n; *(s+n)=0;}
 if(infile!=stdin){jputs(k+s); jputc(CNL);}
 else if(outfile){fputs(k+s,outfile); fputc(CNL,outfile);}
 if(n&&CCTRLD==*(s+n-1))joff(zero);
 R str(n,s);
}

void jputc(c)C c;{if(tostdout)fputc(c,stdout); if(outfile)fputc(c,outfile);}

void jputs(s)C*s;{if(tostdout)fputs(s,stdout); if(outfile)fputs(s,outfile);}

void prompt(s)C*s;{jputs(s);}

void sesmexit(){}

#ifdef WASM
C sesminit(){R 1;}
#else
C sesminit(){signal(SIGINT,sigint); R 1;}
#endif

C*wr(n,v)I n;C*v;{I k=0;
 if(tostdout)while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),stdout);
 if(outfile){
  fputc(COUT,outfile);
  k=0;       while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),outfile);
 }
 jputc(CNL); R v+n;
}

#endif
