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
/* External (Foreign) Stuff                                                */

#include "j.h"
#include "a.h"
#include "io.h"
#include "x.h"

#if (!LINKJ && SYS & SYS_MACINTOSH)
#include "mac.h"
#include "PrintTraps.h"
#endif

#if (SYS & SYS_MACINTOSH)
#include "PrintTraps.h"
#endif


static DF1(stype){R sc(AT(w));}

static DF1(ir){A z;I m;
 RZ(w);
 m=4*WP(AT(w),AN(w),AR(w)); GA(z,CHAR,m,1,0); memcpy(AV(z),w,m);
 R z;
}

static DF1(ri){A y,z;I n,r,*s,t;
 PREF1(ri);
 ASSERT(CHAR&AT(w),EVDOMAIN);
 y=(A)AV(w); n=AN(y); r=AR(y); s=AS(y); t=AT(y);
 ASSERT(t==BOOL||t==CHAR||t==INT||t==FL||t==CMPX,EVDOMAIN);
 ASSERT(0<=r,EVRANK);
 DO(r,ASSERT(0<=s[i],EVLENGTH);); ASSERT(n==prod(r,s),EVLENGTH);
 ASSERT((3+AN(w))/4==WP(t,n,r),EVLENGTH);
 GA(z,t,n,r,0); memcpy(AS(z),s,AN(w)-AH*sizeof(I));
 R z;
}

static DF1(fxx){
 RZ(w);
 ASSERT(AT(w)&CHAR+BOX,EVDOMAIN);
 ASSERT(1>=AR(w),EVRANK);
 R AT(w)&CHAR ? unsr(ca(w)) : fx(ope(w));
}

static DF1(arx){PREF1(arx); ASSERT(BOX&AT(w),EVDOMAIN); R arep(symbrd(onm(w)));}

static DF1(drx){PREF1(drx); ASSERT(BOX&AT(w),EVDOMAIN); R drep(symbrd(onm(w)));}

static DF1(srx){PREF1(srx); ASSERT(BOX&AT(w),EVDOMAIN); R srep(ope(w),symbrd(onm(w)));}

static DF1(trx){PREF1(trx); ASSERT(BOX&AT(w),EVDOMAIN); R trep(ope(w),symbrd(onm(w)));}

static DF1(ts){A z;I*x;struct tm*t;time_t now;
 RZ(w);
 time(&now); t=localtime(&now);
 GA(z,INT,6,1,0); x=AV(z);
 x[0]=t->tm_year+1900;
 x[1]=t->tm_mon+1;
 x[2]=t->tm_mday;
 x[3]=t->tm_hour;
 x[4]=t->tm_min;
 x[5]=t->tm_sec;
 R z;
}

static DF1(tss){R scf(CLOCK-tssbase);}

static DF1(tsit){D t; PREF1(tsit); t=CLOCK; RZ(exec1(w)); R scf(CLOCK-t);}

static DF1(dl){
 PREF1(dl);
#if (!LINKJ && SYS & SYS_MACINTOSH)
 {I m=TickCount()+60*i0(w); while(m>TickCount()&&breaker());}
#else
 DO(i0(w), sleep(1); if(!breaker())R 0;);
#endif
 R w;
}

static DF1(sp){R sc(bytes);}

static DF1(sps){R sc(totbytes);}

static DF1(spit){I k;
 PREF1(spit);
 k=maxbytes;
 RZ(exec1(w));
 R sc(maxbytes-k);
}


#if (!LINKJ && SYS_SESM && SYS & SYS_PC+SYS_PC386)

static int      cgav;
extern I        jstratts();
extern void     jstref();
extern void     jstsatts();
extern void     jstslow();

static DF1(cgaq){ASSERT(sesm,EVDOMAIN); R sc((I)cgav);}

static DF1(cgas){
 ASSERT(sesm,EVDOMAIN);
 ASSERT(!AR(w),EVRANK);
 RZ(w=cvt(BOOL,w));
 jstslow(cgav=*(B*)AV(w));
 R mtv;
}

static DF1(colorq){A z;I k,*s,*x;UC t[4];
 RZ(w);
 ASSERT(sesm,EVDOMAIN);
 GA(z,INT,8,2,0); s=AS(z); *s=4; *++s=2;
 x=AV(z);
 k=jstratts(); memcpy(t,&k,4L); DO(4, *x++=t[i]/16; *x++=t[i]%16;);
 R z;
}

static DF1(colors){I*x;UC c,t[4],*tv;
 ASSERT(sesm,EVDOMAIN);
 RZ(w=vi(w));
 ASSERT(2==AR(w),EVRANK);
 ASSERT(8==AN(w)&&4==*AS(w),EVLENGTH);
 x=AV(w);
 DO(8, ASSERT(0<=x[i]&&x[i]<16,EVDOMAIN););
 tv=t; DO(4, c=16**x++; c+=*x++; *tv++=c;); jstsatts(*(unsigned long*)t);
 R mtv;
}

static DF1(refresh){ASSERT(sesm,EVDOMAIN); jstref(); R mtv;}


#if (SYS & SYS_PC386)

extern SI       jstedit(SI);

static DF1(edit){PROLOG;A z;I k,n;
 RZ(w);
 ASSERT(sesm,EVDOMAIN);
 ASSERT(1>=AR(w),EVRANK);
 n=AN(w);
 ASSERT(!n||CHAR&AT(w),EVDOMAIN);
 ASSERT(n<=NEDB,EVLIMIT);
 memcpy(edbuf,AV(w),n);
 k=jstedit((SI)n);
 z=0>k?ca(w):str(k,edbuf);
 EPILOG(z);
}

#else

extern SI       jstedit(SI,SI,C*);

static DF1(edit){PROLOG;A t,z;C*s;I k,m,n;
 RZ(w);
 ASSERT(sesm,EVDOMAIN);
 ASSERT(1>=AR(w),EVRANK);
 n=AN(w);
 ASSERT(!n||CHAR&AT(w),EVDOMAIN);
 m=MIN(32767,4000+n);
 GA(t,CHAR,m,1,0);
 k=(I)(15+(C*)AV(t)); k&=0xfffffff0L; s=(C*)k; /* ensure segment aligned */
 memcpy(s,AV(w),n);
 k=jstedit((S)n,(S)m-15,s);
 z=0>k?ca(w):str(k,s);
 EPILOG(z);
}

#endif
#endif


#if (!LINKJ && SYS & SYS_MACINTOSH)

static DF1(fontq){A z;I*x;
 GA(z,INT,3,1,0); x=AV(z);
 x[0]=texi.tsFont;
 x[1]=texi.tsFace;
 x[2]=texi.tsSize;
 R z;
}

static DF1(fonts){I*v;TextStyle old=texi;
 RZ(w=vi(w));
 ASSERT(1==AR(w),EVRANK);
 ASSERT(3==AN(w),EVLENGTH);
 v=AV(w);
 texi.tsFont=v[0];
 texi.tsFace=v[1];
 texi.tsSize=v[2];
 reFont(&old,&texi);
 R mtv;
}

static DF1(prtscr){
 PrClose(); PrDrvrClose();
 PrDrvrOpen();
 PrCtlCall(iPrDevCtl,lPrReset,0L,0L);
 PrCtlCall(iPrBitsCtl,&screenBits,&screenBits.bounds,lPaintBits);
 PrDrvrClose();
 PrOpen();
 R mtv;
}
#endif


static DF1(rlq){R sc(qrl);}

static DF1(rls){I k; RE(k=i0(w)); ASSERT(0<k&&k<2147483646L,EVDOMAIN); qrl=k; R mtv;}

static DF1(promptq){R cstr(qprompt);}

static DF1(prompts){C*v;I n;
 RZ(vs(w));
 n=AN(w); v=(C*)AV(w);
 ASSERT(!memchr(v,'\0',n),EVDOMAIN);
 ASSERT(NPROMPT>=n,EVLIMIT);
 memcpy(qprompt,v,1+n);
 R mtv;
}

static DF1(boxq){R str(11L,qbx);}

static DF1(boxs){RZ(vs(w)); ASSERT(11==AN(w),EVLENGTH); memcpy(qbx,AV(w),11L); R mtv;}

static DF1(evmq){R behead(qevm);}

static DF1(evms){A t,*y;
 ASSERT(1==AR(w),EVRANK);
 ASSERT(NEVM==AN(w),EVLENGTH);
 ASSERT(BOX&AT(w),EVDOMAIN);
 y=(A*)AV(w); DO(NEVM, RZ(vs(*y++)););
 RZ(t=link(mtv,w)); ra(t); fa(qevm); qevm=t;
 R mtv;
}


#if !LINKJ
C jc(k,f1,f2)I k;AF*f1,*f2;{R 0;}
#endif


F2(foreign){I p,q;
 p=i0(a); q=i0(w);
 switch(XC(p,q)){
  case XC(0,0):   R CDERIV(CIBEAM, host,    0L,       1L,   0L,   0L   );
  case XC(0,1):   R CDERIV(CIBEAM, hostne,  0L,       1L,   0L,   0L   );
  case XC(0,2):   R CDERIV(CIBEAM, script1, script2,  0L,   0L,   0L   );
  case XC(0,3):   R CDERIV(CIBEAM, sscript1,sscript2, 0L,   0L,   0L   );
  case XC(0,55):  R CDERIV(CIBEAM, joff,    0L,       RMAXL,0L,   0L   );
  case XC(1,0):   R CDERIV(CIBEAM, jfdir,   0L,       RMAXL,0L,   0L   );
  case XC(1,1):   R CDERIV(CIBEAM, jfread,  0L,       0L,   0L,   0L   );
  case XC(1,2):   R CDERIV(CIBEAM, 0L,      jfwrite,  0L,   RMAXL,0L   );
  case XC(1,3):   R CDERIV(CIBEAM, 0L,      jfappend, 0L,   RMAXL,0L   );
  case XC(1,4):   R CDERIV(CIBEAM, jfsize,  0L,       0L,   0L,   0L   );
  case XC(1,11):  R CDERIV(CIBEAM, jiread,  0L,       1L,   0L,   0L   );
  case XC(1,12):  R CDERIV(CIBEAM, 0L,      jiwrite,  0L,   RMAXL,1L   );
  case XC(1,55):  R CDERIV(CIBEAM, jferase, 0L,       0L,   0L,   0L   );
  case XC(2,0):   R CDERIV(CIBEAM, 0L,      wnc,      0L,   0L,   0L   );
  case XC(2,1):   R CDERIV(CIBEAM, wnl,     0L,       0L,   0L,   0L   );
  case XC(2,2):   R CDERIV(CIBEAM, save1,   save2,    0L,   0L,   0L   );
  case XC(2,3):   R CDERIV(CIBEAM, psave1,  psave2,   0L,   0L,   0L   );
  case XC(2,4):   R CDERIV(CIBEAM, copy1,   copy2,    0L,   0L,   0L   );
  case XC(2,5):   R CDERIV(CIBEAM, pcopy1,  pcopy2,   0L,   0L,   0L   );
  case XC(2,55):  R CDERIV(CIBEAM, 0L,      wex,      0L,   0L,   0L   );
  case XC(3,0):   R CDERIV(CIBEAM, stype,   0L,       RMAXL,0L,   0L   );
  case XC(3,1):   R CDERIV(CIBEAM, ir,      0L,       RMAXL,0L,   0L   );
  case XC(3,2):   R CDERIV(CIBEAM, ri,      0L,       1L,   0L,   0L   );
  case XC(4,0):   R CDERIV(CIBEAM, ncx,     0L,       0L,   0L,   0L   );
  case XC(4,1):   R CDERIV(CIBEAM, nl1,     nl2,      RMAXL,RMAXL,RMAXL);
  case XC(4,55):  R CDERIV(CIBEAM, ex,      0L,       0L,   0L,   0L   );
  case XC(5,0):   R fdef(CIBEAM,ADV, fxx,0L, a,w,0L, 0L,0L,0L);
  case XC(5,1):   R CDERIV(CIBEAM, arx,     0L,       0L,   0L,   0L   );
  case XC(5,2):   R CDERIV(CIBEAM, drx,     0L,       0L,   0L,   0L   );
  case XC(5,3):   R CDERIV(CIBEAM, srx,     0L,       0L,   0L,   0L   );
  case XC(5,4):   R CDERIV(CIBEAM, trx,     0L,       0L,   0L,   0L   );
  case XC(6,0):   R CDERIV(CIBEAM, ts,      0L,       RMAXL,0L,   0L   );
  case XC(6,1):   R CDERIV(CIBEAM, tss,     0L,       RMAXL,0L,   0L   );
  case XC(6,2):   R CDERIV(CIBEAM, tsit,    0L,       1L,   0L,   0L   );
  case XC(6,3):   R CDERIV(CIBEAM, dl,      0L,       0L,   0L,   0L   );
  case XC(7,0):   R CDERIV(CIBEAM, sp,      0L,       RMAXL,0L,   0L   );
  case XC(7,1):   R CDERIV(CIBEAM, sps,     0L,       RMAXL,0L,   0L   );
  case XC(7,2):   R CDERIV(CIBEAM, spit,    0L,       1L,   0L,   0L   );
#if (!LINKJ && SYS_SESM && SYS & SYS_PC+SYS_PC386)
  case XC(8,0):   R CDERIV(CIBEAM, cgaq,    0L,       RMAXL,0L,   0L   );
  case XC(8,1):   R CDERIV(CIBEAM, cgas,    0L,       RMAXL,0L,   0L   );
  case XC(8,4):   R CDERIV(CIBEAM, colorq,  0L,       RMAXL,0L,   0L   );
  case XC(8,5):   R CDERIV(CIBEAM, colors,  0L,       RMAXL,0L,   0L   );
  case XC(8,7):   R CDERIV(CIBEAM, refresh, 0L,       RMAXL,0L,   0L   );
  case XC(8,9):   R CDERIV(CIBEAM, edit,    0L,       RMAXL,0L,   0L   );
#endif
#if (!LINKJ && SYS & SYS_MACINTOSH)
  case XC(8,16):  R CDERIV(CIBEAM, fontq,   0L,       RMAXL,0L,   0L   );
  case XC(8,17):  R CDERIV(CIBEAM, fonts,   0L,       RMAXL,0L,   0L   );
  case XC(8,19):  R CDERIV(CIBEAM, prtscr,  0L,       RMAXL,0L,   0L   );
#endif
  case XC(9,0):   R CDERIV(CIBEAM, rlq,     0L,       RMAXL,0L,   0L   );
  case XC(9,1):   R CDERIV(CIBEAM, rls,     0L,       RMAXL,0L,   0L   );
  case XC(9,4):   R CDERIV(CIBEAM, promptq, 0L,       RMAXL,0L,   0L   );
  case XC(9,5):   R CDERIV(CIBEAM, prompts, 0L,       RMAXL,0L,   0L   );
  case XC(9,6):   R CDERIV(CIBEAM, boxq,    0L,       RMAXL,0L,   0L   );
  case XC(9,7):   R CDERIV(CIBEAM, boxs,    0L,       RMAXL,0L,   0L   );
  case XC(9,8):   R CDERIV(CIBEAM, evmq,    0L,       RMAXL,0L,   0L   );
  case XC(9,9):   R CDERIV(CIBEAM, evms,    0L,       RMAXL,0L,   0L   );
  case XC(128,0): R CDERIV(CIBEAM, qr,      0L,       2L,   0L,   0L   );
  case XC(128,1): R CDERIV(CIBEAM, rinv,    0L,       2L,   0L,   0L   );
 }
 if(10==p){AF*f1,*f2;
  ASSERT(jc(q,&f1,&f2),EVDOMAIN);
  R CDERIV(CIBEAM, f1,f2, RMAXL,RMAXL,RMAXL);
 }
 ASSERT(0,EVDOMAIN);
}
