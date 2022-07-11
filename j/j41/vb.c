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
/* Verbs:  Boolean-valued                                                  */

#include "j.h"
#include "v.h"


static SF2(ble,B,B, !*u||*v)

static SF2(ile,I,B, *u<=*v)

static SF2(dle,D,B, tle(*u,*v))

F2(le){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,ble);
  case INT:  R sex2(a,w,BOOL,ile);
  case FL:   R sex2(a,w,BOOL,dle);
  default:   R sex2(cvt(FL,a),cvt(FL,w),BOOL,dle);
}}

static SF2(blt,B,B, !*u&&*v)

static SF2(ilt,I,B, *u<*v)

static SF2(dlt,D,B, tlt(*u,*v))

F2(lt){
 switch(coerce2(&a,&w,BOOL)){
  case BOOL: R sex2(a,w,BOOL,blt);
  case INT:  R sex2(a,w,BOOL,ilt);
  case FL:   R sex2(a,w,BOOL,dlt);
  default:   R sex2(cvt(FL,a),cvt(FL,w),BOOL,dlt);
}}

F2(ge){R not(lt(a,w));}

F2(gt){R not(le(a,w));}

static SF2(beq,B,B, *u==*v)

static SF2(ieq,I,B, *u==*v)

static SF2(deq,D,B, teq(*u,*v))

static SF2(jeq,Z,B, zeq(*u,*v))

static SF2(ceq,C,B, *u==*v)

static SF2(aeq,A,B, one==match(*u,*v))

static SF2(neq,C,B, 0)

F2(eq){I at,t=-1,wt;
 RZ(a&&w);
 at=AT(a); wt=AT(w);
 if(AN(a)&&AN(w)&&HOMO(at,wt)){
  t=MAX(at,wt);
  if(t!=at)RZ(a=cvt(t,a));
  if(t!=wt)RZ(w=cvt(t,w));
 }
 switch(t){
  case BOOL: R sex2(a,w,BOOL,beq);
  case INT:  R sex2(a,w,BOOL,ieq);
  case FL:   R sex2(a,w,BOOL,deq);
  case CMPX: R sex2(a,w,BOOL,jeq);
  case CHAR:
  case NAME: R sex2(a,w,BOOL,ceq);
  case BOX:  R sex2(a,w,BOOL,aeq);
  case -1:   R sex2(a,w,BOOL,neq);
}}

F2(ne){R not(eq(a,w));}

F2(nand){R not(lcm(cvt(BOOL,a),cvt(BOOL,w)));}

F2(nor){R not(gcd(cvt(BOOL,a),cvt(BOOL,w)));}

F1(sclass){A x;
 RZ(w);
 x=indexof(w,AR(w)?w:ravel(w));
 R df2(repeat(eq(ii(w),x),x),x,slash(ds(CEQ)));
}

F1(nubsieve){R eq(ii(w),indexof(w,w));}

F2(match){PROLOG;A y,z;I an,ar,*as,at,wn,wr,*ws,wt;
 RZ(a&&w);
 if(a==w)R one;
 an=AN(a); ar=AR(a); as=AS(a); at=AT(a);
 wn=AN(w); wr=AR(w); ws=AS(w); wt=AT(w);
 if(an!=wn||ar!=wr)R zero;
 DO(ar,if(*as++!=*ws++)R zero;);
 if(!an)R one;
 if(!HOMO(at,wt))R zero;
 if(BOX&at&&1==an)z=match(*(A*)AV(a),*(A*)AV(w));
 else{RZ(y=eq(a,w)); z=all1(y)?one:zero;}
 EPILOG(z);
}

F2(eps){R lt(indexof(w,a),tally(w));}

F1(razein){R df2(w,box(raze(w)),amp(swap(ds(CEPS)),ds(COPE)));}

F2(ebar){A z;B*x;I i,k=0,m,n,p,td1[NALP];UC*u,*v;
 ASSERT((!AN(a)||CHAR&AT(a))&&(!AN(w)||CHAR&AT(w))&&1>=AR(a)&&1>=AR(w),EVNONCE);
 m=AN(a); u=(UC*)AV(a);
 n=AN(w); v=(UC*)AV(w);
 DO(NALP, td1[i]=1+m;); DO(m, td1[u[i]]=m-i;);
 GA(z,BOOL,n,AR(w),0); x=(B*)AV(z); mv1(BOOL,n,x,"");
 p=1+n-m;
 while(k<p){for(i=0;i<m&&u[i]==v[k+i];++i); x[k]=i==m; k+=td1[v[k+m]];}
 R z;
}  /* Daniel M. Sunday, CACM 1990 8, 132-142 */
