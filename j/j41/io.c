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

static C          inbuf[2+NINPUT];

F1(joff){if(outfile&&outfile!=stdout)fclose(outfile); sesmexit(); exit(0);}

void jouts(s)C*s;{if(outfile)fputc(COUT,outfile); jputs(s);}


/* --------------------- Special Session Manager ------------------------- */

#if (!LINKJ && SYS & SYS_SESM)

C breaker(){if(sesm)jstkiav(); R!jerr;}

A jgets(){C c,*s=inbuf;I k=0,n;
 if(infile==stdin){if(sesm)jsti(NINPUT,s); else RZ(fgets(s,NINPUT,stdin));}
 else{do RZ(fgets(s,NINPUT,infile))while(COUT==*s); k=strspn(s," ");}
 n=strlen(s); if(c=*(s+n-1),CLF==c||CCR==c){--n; *(s+n)=0;}
 if(infile!=stdin){jputs(k+s); jputc(CNL);}
 else if(outfile){fputs(k+s,outfile); fputc(CNL,outfile);}
 if(CCTRLD==*(s+n-1))joff();
 R str(n,s);
}

void jputc(c)C c;{
 if(tostdout){if(sesm)jsto(MTYOUT,1,&c); else fputc(c,stdout);}
 if(outfile)fputc(c,outfile);
}

void jputs(s)C*s;{
 if(tostdout){if(sesm)jsto(MTYOUT,(int)strlen(s),s); else fputs(s,stdout);}
 if(outfile)fputs(s,outfile);
}

void prompt(s)C*s;{
 if(tostdout){if(sesm)jsto(MTYOIN,(int)strlen(s),s); else fputs(s,stdout);}
 if(outfile)fputs(s,outfile);
}

void sesmexit(){if(sesm)jststop();}

C sesminit(){
 if(sesm){A t;I j,mask=0xfffffff0L;struct{I*vlog;S nlog;I*vinb;S ninb;I*vfkd;S nfkd;}in;
#if (SYS & SYS_PCAT)
  /* The 15+ and &0xfffffff0 are because addresses must be segment aligned */
  GA(t,CHAR,15+NLOG,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vlog=(I*)j; in.nlog=NLOG;
  GA(t,CHAR,15+NINB,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vinb=(I*)j; in.ninb=NINB;
  GA(t,CHAR,15+NFKD,1,0); j=(I)(15+(C*)AV(t)); j&=mask; in.vfkd=(I*)j; in.nfkd=NFKD;
#endif
  jstinit((Ptr)&in);
 }
 R 1;
}

C*wr(n,v)I n;C*v;{I k=0,m;
 if(tostdout){
  if(sesm)while(n>k&&!jerr){m=MIN(3000,n-k); jsto(MTYOUT,(int)m,v+k); k+=m;}
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
 n=strlen(s); if(CNL==*(s+n-1)){--n; *(s+n)=0;}
 if(infile!=stdin){jputs(k+s); jputc(CNL);}
 else if(outfile){fputs(k+s,outfile); fputc(CNL,outfile);}
 if(CCTRLD==*(s+n-1))joff();
 R str(n,s);
}

void jputc(c)C c;{if(tostdout)fputc(c,stdout); if(outfile)fputc(c,outfile);}

void jputs(s)C*s;{if(tostdout)fputs(s,stdout); if(outfile)fputs(s,outfile);}

void prompt(s)C*s;{jputs(s);}

void sesmexit(){}

C sesminit(){R 1;}

C*wr(n,v)I n;C*v;{I k=0;
 if(tostdout)while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),stdout);
 if(outfile){
  fputc(COUT,outfile);
  k=0;       while(n>k&&!jerr)k+=fwrite(v+k,sizeof(C),(size_t)(n-k),outfile);
 }
 jputc(CNL); R v+n;
}

#endif
