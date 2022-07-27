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
/* Conjunction: Fit !.                                                     */

#include "j.h"
#include "a.h"

D qct;
C qpps[7]="%0.6g";

static DF1(fitct1){DECLFG;A z;D q=qct; qct=*(D*)AV(gs); z=f1(  w,fs); qct=q; R z;}

static DF2(fitct2){DECLFG;A z;D q=qct; qct=*(D*)AV(gs); z=f2(a,w,fs); qct=q; R z;}

static DF1(fitpp1){DECLFG;A z;C q[3];
 memcpy(q,3+qpps,3L);
 sprintf(3+qpps,"%ldg",*AV(gs)); z=f1(w,fs);
 memcpy(3+qpps,q,3L);
 R z;
}

static DF2(shift2){A gs,s,x,y;I c,m,n,p,t;
 F2RANK(0,RMAX,shift2,self);
 n=IC(w); t=AT(w); c=aii(w);
 p=i0(a); p=p<-n?-n:n<p?n:p; m=ABS(p);
 gs=VAV(self)->g;
 RZ(s=shape(w)); if(AR(w))*AV(s)=m;
 if(!AR(gs))RZ(x=reshape(s,gs))
 else if(AN(gs))RZ(x=rank2ex(behead(s),reitem(sc(m),gs),0L,1L,-1L,reshape))
 else RZ(x=reshape(s,filler(w)))
 if(AR(w)){y=drop(sc(p),w); R 0<p?over(y,x):over(x,y);} else R m?x:ca(w);
}

static DF1(shift1){R shift2(neg1,w,self);}

static DF1(factp1){R df1(w,amp(scf(exp(1.0)),self));}

static DF2(factp2){A gs,z;I n;V*sv;
 F2RANK(0,0,factp2,self);
 sv=VAV(self); gs=sv->g;
 RE(n=i0(w)); ASSERT(0<=n,EVDOMAIN);
 RZ(z=reshape(shape(gs),one));
 DO(n, RZ(z=tymes(z,a)); RZ(a=plus(a,gs)););
 R z;
}

F2(fit){D d;I k;
 RZ(a&&w);
 ASSERT(VERB&AT(a)&&NOUN&AT(w),EVDOMAIN);
 switch(ID(a)){
  case CLT:    case CLE:    case CGE:    case CGT:   case CNE:
  case CEQ:    case CMATCH: case CEPS:   case CIOTA: case CNUB: case CSTAR:
  case CFLOOR: case CCEIL:  case CSTILE: case COR:   case CAND: case CBASE:
   ASSERT(!AR(w),EVRANK);
   RZ(w=cvt(FL,w)); d=*(D*)AV(w);
   ASSERT(0<=d&&d<=5.820766091e-11,EVDOMAIN);
   R CDERIV(CFIT,fitct1,fitct2,mr(a),lr(a),rr(a));
  case CTHORN: case CIBEAM:
   ASSERT(!AR(w),EVRANK);
   RZ(w=vi(w)); k=*AV(w); ASSERT(0<k&&k<=NPP,EVDOMAIN);
   R CDERIV(CFIT,fitpp1,VAV(a)->f2,mr(a),lr(a),rr(a));
  case CROT:
   R CDERIV(CFIT,shift1,shift2,RMAXL,0L,RMAXL);
  case CEXP:
   R CDERIV(CFIT,factp1,factp2,RMAXL,0L,0L);
  default:
   ASSERT(0,EVDOMAIN);
}}
