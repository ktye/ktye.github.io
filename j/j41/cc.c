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
/* Conjunctions:  Cuts                                                     */

#include "j.h"
#include "a.h"


static DF2(cut02){DECLF;A p,y;I*av0,*av1,k,*pv,*ws,*yv;
 PREF2(cut02);
 /* Approximately,  f(i.1{a){,(1{a){.(0{a)}.w */
 RZ(a=vi(a));
 ASSERT(2==AR(a),EVRANK);
 k=*(1+AS(a)); av0=AV(a); av1=k+av0; ws=AS(w);
 ASSERT(2==IC(a)&&k<=AR(w),EVLENGTH);
 RZ(p=rank2ex(shape(w),take(rank(w),head(a)),0L,0L,0L,pind)); pv=AV(p);
 RZ(y=shape(w)); yv=AV(y); DO(k,yv[i]=av1[i];);
 DO(k, if(0>av0[i])pv[i]+=1-ABS(yv[i]); ASSERT(0<=pv[i]&&pv[i]<ws[i],EVLENGTH););
 R f1(from(iota(y),ravel(take(mag(y),drop(p,w)))),fs);
}

static DF1(cut01){R cut02(lamin2(zero,negate(shape(w))),w,self);}

static DF2(cut2){PROLOG;DECLFG;A t,*x,y,z;B*u;C c,*v;I an,i,j=0,k,m=0,n,s,wcn,wk,wt;
 PREF2(cut2);
 ASSERT(IC(a)==IC(w),EVLENGTH);
 RZ(a=cvt(BOOL,a));
 an=AN(a); u=(B*)AV(a); v=(C*)AV(w); wt=AT(w); wcn=aii(w); wk=wcn*bp(wt);
 DO(an, m+=u[i];);
 GA(t,BOX,m,1,0); x=(A*)AV(t);
 RZ(y=ca(rankle(w))); n=AN(w); s=*AS(w);
 c=1==*AV(gs); if(c)while(an>j&&!u[j])j++;
 for(i=0;i<m;i++){
  k=j; j+=c; while(an>j&&!u[j])j++; j+=!c;
  AN(y)=wcn*(j-k); *AS(y)=j-k; mv(wt,AN(y),AV(y),v+k*wk);
  RZ(*x++=f1(y,fs));
 }
 AN(y)=n; *AS(y)=s;
 z=ope(t); EPILOG(z);
}

static DF1(cut1){DECLFG;
 RZ(w);
 R!IC(w)?mtv:cut2(eps(w,take(1==*AV(gs)?one:neg1,w)),w,self);
}

F2(cut){I k;
 RZ(a&&w);
 switch(CONJCASE(a,w)){
  case VN:
   RZ(w=vi(w));
   RE(k=i0(w));
   ASSERT(-3<=k&&k<=3,EVDOMAIN);
   if(0>k){RZ(a=amp(a,ds(k==-1?CDROP:CCTAIL))); RZ(w=sc(-k));}
   switch(ABS(k)){
    case 0:  R CDERIV(CCUT,cut01,cut02,RMAXL,2L,RMAXL);
    case 1:
    case 2:  R CDERIV(CCUT,cut1 ,cut2 ,RMAXL,1L,RMAXL);
   }
  default: ASSERT(0,EVDOMAIN);
}}
