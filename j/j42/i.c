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
/* Initializations                                                         */

#include "j.h"
#include "io.h"

#define GGA(v,t,n,r)    {GA(v,t,n,r,0); AC(v)=LONG_MAX/2;}
#define GG4(v,t,exp)    {GGA(v,t,1,0); *AV(v)=(I)(exp);}
#define GG8(v,t,exp)    {GGA(v,t,1,0); *(D*)AV(v)=(exp);}


#if (!LINKJ && SYS & SYS_MACINTOSH)
#include "mac.h"
static A initevm(v,i,s)A*v;S i;C*s;{C x[256];
 GetIndString(x,IdErrMsgs,i);
 R v[i]=str((I)*x,1+x);
}
#else
static A initevm(v,i,s)A*v;S i;C*s;{R v[i]=cstr(s);}
#endif

#ifndef WASM
static void sigflpe(k)int k;{jsignal(EVDOMAIN); signal(SIGFPE,sigflpe);}
#endif

C jinit2(argc,argv)int argc;C**argv;{A*v;C b=1,*s;D*d;S t;
 tssbase=CLOCK;
 infile=stdin; outfile=0; jstf->act=JFPROF;
#if !(SYS & SYS_ARCHIMEDES)
#ifndef WASM
 b=isatty(fileno(stdin));
#endif
#endif
#if (!LINKJ && SYS & SYS_SESM)
 sesm=b;
 if(1<argc){C*s;
  ASSERT(2==argc,EVLENGTH); s=argv[1];
  if('/'==*s){ASSERT('s'==s[1],EVDOMAIN); sesm=0;}
 }
#endif
 sesminit();
 GGA(alp,CHAR,NALP,1); s=(C*)AV(alp); DO(NALP,*s++=i;); ps[psptr[(UC)CALP]].f1=(AF)alp;
 GGA(global,SYMB,twprimes[3],1);
 GGA(mtv, BOOL,0,1);
 GGA(zero,BOOL,1,0); *(B*)AV(zero)=0;
 GGA(one, BOOL,1,0); *(B*)AV(one )=1;
 GGA(dash,CHAR,1,0); *(C*)AV(dash)='-';
 GGA(a0j1,CMPX,1,0); d=(D*)AV(a0j1); *d=0; *(1+d)=1;
 GG4(jot, BOX ,mtv);
 GG4(neg1,INT ,-1 );
 GG4(two, INT ,2  );
 GG4(mark,MARK,0  );
 GG8(pie ,FL  ,PI );
 qct=1.0; DO(44, qct  *=0.5;);
 qfuzz=qct;
 memcpy(&inf,XINF,(size_t)sizeof(D));
 memcpy(&naN,XNAN,(size_t)sizeof(D));
 GA(qevm,BOX,1+NEVM,1,0); v=(A*)AV(qevm);
 RZ(initevm(v,EVBREAK  ,"break"            ));
 RZ(initevm(v,EVDEFN   ,"defn error"       ));
 RZ(initevm(v,EVDOMAIN ,"domain error"     ));
 RZ(initevm(v,EVILNAME ,"ill-formed name"  ));
 RZ(initevm(v,EVILNUM  ,"ill-formed number"));
 RZ(initevm(v,EVINDEX  ,"index error"      ));
 RZ(initevm(v,EVINPRUPT,"input interrupt"  ));
 RZ(initevm(v,EVFACE   ,"interface error"  ));
 RZ(initevm(v,EVLENGTH ,"length error"     ));
 RZ(initevm(v,EVLIMIT  ,"limit error"      ));
 RZ(initevm(v,EVNONCE  ,"nonce error"      ));
 RZ(initevm(v,EVNOTASGN,"not reassignable" ));
 RZ(initevm(v,EVOPENQ  ,"open quote"       ));
 RZ(initevm(v,EVRANK   ,"rank error"       ));
 RZ(initevm(v,EVSPELL  ,"spelling error"   ));
 RZ(initevm(v,EVSYNTAX ,"syntax error"     ));
 RZ(initevm(v,EVSYSTEM ,"system error"     ));
 RZ(initevm(v,EVVALUE  ,"value error"      ));
 RZ(initevm(v,EVWSFULL ,"ws full"          ));
 ra(qevm);
#if (SYS & SYS_PC+SYS_PC386)
 t=EM_ZERODIVIDE+EM_INVALID; _control87(t,t);
#else
#ifndef WASM
 signal(SIGFPE,sigflpe);
#endif
#endif
 if(b&&!LINKJ){
  jouts("J 4.2   Copyright (c) 1990-1992, Iverson Software Inc.  All Rights Reserved.");
  jputc(CNL); jputc(CNL);
 }else qprompt[0]=0;
 R 1;
}
