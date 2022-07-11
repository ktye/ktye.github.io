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
/* Verbs:  Elementary Functions (Arithmetic, etc.)                         */

#include "j.h"
#include "v.h"


static SF1(jconjug,Z,Z, zconjug(*v))

F1(conjug){
 switch(coerce1(&w,BOOL)){
  case BOOL:
  case INT:
  case FL:   R ca(w);
  case CMPX: R sex1(w,CMPX,jconjug);
  default:   R 0;
}}

static SF2(bplus,B,I, *u+*v)

static SF2(iplus,I,D, *u+(D)*v)

static SF2(dplus,D,D, *u+*v)

static SF2(jplus,Z,Z, zplus(*u,*v))

F2(plus){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,INT ,bplus);
  case INT:  R pcvt(INT,sex2(a,w,FL,iplus));
  case FL:   R sex2(a,w,FL  ,dplus);
  case CMPX: R sex2(a,w,CMPX,jplus);
  default:   R 0;
}}

extern A sreduce();

F1(sum){
 RZ(w);
 switch(AT(w)){
  case FL:   R sreduce(zero,w,dplus);
  case CMPX: R sreduce(zero,w,jplus);
  default:   R pcvt(INT,sreduce(zero,cvt(FL,w),dplus));
}}

F1(negate){R minus(zero,w);}

static SF2(bminus,B,I, *u-*v)

static SF2(iminus,I,D, *u-(D)*v)

static SF2(dminus,D,D, *u-*v)

static SF2(jminus,Z,Z, zminus(*u,*v))

F2(minus){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,INT ,bminus);
  case INT:  R pcvt(INT,sex2(a,w,FL,iminus));
  case FL:   R sex2(a,w,FL  ,dminus);
  case CMPX: R sex2(a,w,CMPX,jminus);
  default:   R 0;
}}

static SF1(isignum,I,I, SGN(*v))

static SF1(dsignum,D,I, qct<ABS(*v)?SGN(*v):0)

static B jsignum(v,x)Z*v,*x;{if(qct<zmag(*v))*x=ztrend(*v); else *x=zeroZ; R!jerr;}

F1(signum){
 switch(coerce1(&w,BOOL)){
  case BOOL: R ca(w);
  case INT:  R sex1(w,INT ,isignum);
  case FL:   R sex1(w,INT ,dsignum);
  case CMPX: R sex1(w,CMPX,jsignum);
  default:   R 0;
}}

static SF2(band,B,B, *u&&*v)

static SF2(itymes,I,D, *u*(D)*v)

static SF2(dtymes,D,D, *u&&*v?*u**v:0)

static SF2(jtymes,Z,Z, ztymes(*u,*v))

F2(tymes){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,band);
  case INT:  R pcvt(INT,sex2(a,w,FL,itymes));
  case FL:   R sex2(a,w,FL  ,dtymes);
  case CMPX: R sex2(a,w,CMPX,jtymes);
  default:   R 0;
}}

F1(recip){R divide(one,w);}

static B bdiv(u,v,x)B*u,*v,*x;{*x=!*u?0:*v?1:(jerr=EVDOMAIN,0); R!jerr;}

static B idiv(u,v,x)I*u,*v;D*x;{*x=*v?*u/(D)*v:*u?*u*inf:0; R 1;}

static B ddiv(u,v,x)D*u,*v,*x;{*x=*v?*u/ *v:*u?*u*inf:0; R 1;}

static B jdiv(u,v,x)Z*u,*v,*x;{*x=zdiv(*u,*v); R!jerr;}

F2(divide){A z;C es;
 switch(coerce2(&a,&w,BOOL)){
  case BOOL:
   es=errsee; errsee=0; z=sex2(a,w,BOOL,bdiv); errsee=es;
   R jerr?(jerr=0,divide(a,cvt(INT,w))):z;
  case INT:  R sex2(a,w,FL  ,idiv);
  case FL:   R sex2(a,w,FL  ,ddiv);
  case CMPX: R sex2(a,w,CMPX,jdiv);
  default:   R 0;
}}

F1(decrem){R minus(w,one);}

F1(increm){R plus(one,w);}

F1(not){R w&&BOOL&AT(w)?eq(zero,w):minus(one,w);}

F1(duble){R plus(w,w);}

F1(halve){R divide(w,two);}

F1(square){R tymes(w,w);}

static SF1(jmag,Z,D, zmag(*v))

F1(mag){R w&&CMPX&AT(w)?sex1(w,FL,jmag):maximum(w,negate(w));}

static I xirem(u,v)I u,v;{I r; R!u?v:(r=v%u,0<u?r+u*(0>r):r+u*(0<r));}

static D xdrem(u,v)D u,v;{D q,t;
 if(!u)R v;
 q=v/u; t=tfloor(q); R teq(t,tceil(q))?0:v-u*t;
}

static SF2(brem,B,B, *u<*v)

static SF2(irem,I,I, xirem(*u,*v))

static SF2(dren,D,D, xdrem(*u,*v))

static SF2(jrem,Z,Z, zrem(*u,*v))

F2(residue){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,brem);
  case INT:  R sex2(a,w,INT ,irem);
  case FL:   R sex2(a,w,FL  ,dren);
  case CMPX: R sex2(a,w,CMPX,jrem);
  default:   R 0;
}}

static I xigcd(u,v)I u,v;{R u?xigcd(xirem(u,v),u):v;}

static D xdgcd(u,v)D u,v;{D a,aa,b,bb,c,d,t,x,y;
 a=d=1; b=c=0; x=u; y=v;
 while(!teq(u,u+x)){
  aa=a; bb=b; t=floor(y/x);
  a=c-t*a; b=d-t*b; x=a*u+b*v;
  c=aa;    d=bb;    y=c*u+d*v;
 }
 R y;
}

static SF2(bor,B,B, *u||*v)

static SF2(igcd,I,I, xigcd(ABS(*u),ABS(*v)))

static SF2(dgcd,D,D, xdgcd(ABS(*u),ABS(*v)))

static SF2(jgcd,Z,Z, zgcd(*u,*v))

F2(gcd){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,bor);
  case INT:  R sex2(a,w,INT ,igcd);
  case FL:   R sex2(a,w,FL  ,dgcd);
  case CMPX: R sex2(a,w,CMPX,jgcd);
  default:   R 0;
}}

static I ilcm(u,v,x)I*u,*v;D*x;{I a,b;
 a=ABS(*u); b=ABS(*v);
 *x=a&&b?*u*(D)*v/xigcd(a,b):0;
 R!jerr;
}

static I dlcm(u,v,x)D*u,*v,*x;{D a,b;
 a=ABS(*u); b=ABS(*v);
 *x=a&&b?*u**v/xdgcd(a,b):0;
 R!jerr;
}

static SF2(jlcm,Z,Z, zlcm(*u,*v))

F2(lcm){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,band);
  case INT:  R pcvt(INT,sex2(a,w,FL,ilcm));
  case FL:   R sex2(a,w,FL  ,dlcm);
  case CMPX: R sex2(a,w,CMPX,jlcm);
  default:   R 0;
}}

static SF1(dfloor,D,D, tfloor(*v))

static SF1(jfloor,Z,Z, zfloor(*v))

F1(floor1){
 switch(coerce1(&w,BOOL)){
  case BOOL:
  case INT:  R ca(w);
  case FL:   R pcvt(INT,sex1(w,FL,dfloor));
  case CMPX: R sex1(w,CMPX,jfloor);
  default:   R 0;
}}

static SF2(imin,I,I, MIN(*u,*v))

static SF2(dmin,D,D, MIN(*u,*v))

F2(minimum){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R lcm(a,w);
  case INT:  R sex2(a,w,INT ,imin);
  case FL:   R sex2(a,w,FL  ,dmin);
  default:   R sex2(cvt(FL,a),cvt(FL,w),FL,dmin);
}}

F1(ceil1){R negate(floor1(negate(w)));}

F2(maximum){R negate(minimum(negate(a),negate(w)));}

F1(base1){R base2(two,w);}

F2(base2){PROLOG;A z;
 F2RANK(1,1,base2,0);
 ASSERT(!AR(a)||!AR(w)||AN(a)==AN(w),EVLENGTH);
 if(!AN(a))R zero;
 z=pdt(behead(df1(over(AR(a)?a:reshape(tally(w),a),one),bsdot(slash(ds(CSTAR))))),w);
 EPILOG(z);
}

F1(abase1){PROLOG;A b,t,z;
 RZ(w);
 if(!AN(w))R reshape(over(shape(w),zero),zero);
 RZ(t=df1(mag(ravel(w)),slash(ds(CMAX))));
 RZ(b=increm(floor1(logar2(two,maximum(one,t)))));
 z=abase2(reshape(b,two),w);
 EPILOG(z);
}

F2(abase2){PROLOG;A y,z,*zv;C*u,*yv;I at,k,n,wt;
 F2RANK(1,0,abase2,0);
 n=AN(a); at=AT(a); wt=AT(w); k=bp(at); u=n*k+(C*)AV(a);
 GA(y,at ,1,0,0); yv=(C*)AV(y);
 GA(z,BOX,n,1,0); zv=(A*)AV(z);
 DO(n, mv(at,1L,yv,u-=k); RZ(w=divide(minus(w,zv[n-1-i]=residue(y,w)),y)););
 RZ(z=ope(z));
 if(at&BOOL+INT&&wt&BOOL+INT)z=cvt(INT,z);
 EPILOG(z);
}
