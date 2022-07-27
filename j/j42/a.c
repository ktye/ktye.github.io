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
/* Adverbs                                                                 */

#include "j.h"
#include "a.h"


static B booltab[64]={
 0,0,0,0, 0,0,0,1, 0,0,1,0, 0,0,1,1,  0,1,0,0, 0,1,0,1, 0,1,1,0, 0,1,1,1,
 1,0,0,0, 1,0,0,1, 1,0,1,0, 1,0,1,1,  1,1,0,0, 1,1,0,1, 1,1,1,0, 1,1,1,1,
};

static DF2(bool2){R from(plus(duble(cvt(BOOL,a)),cvt(BOOL,w)),VAV(self)->h);}

static DF1(bool1){R bool2(zero,w,self);}

F1(bool){A b,h;I j,*v;
 RZ(w=vi(w));
 v=AV(w);
 DO(AN(w), j=*v++; ASSERT(-16<=j&&j<16,EVINDEX););
 GA(b,BOOL,64,2,0); *AS(b)=16; *(1+AS(b))=4; mv(BOOL,64L,AV(b),booltab);
 RZ(h=cant2(apv(AR(w),0L,1L),from(w,b)));
 R fdef(CBOOL,VERB, bool1,bool2, w,0L,h, RMAXL,0L,0L);
}


A sreduce(a,w,f2)A a,w;SF f2;{A z;C*v,*x,*xx;I c,k,m;
 RZ(w);
 m=IC(w); c=aii(w); k=bp(AT(w));
 if(!m)R reshape(behead(shape(w)),a);
 if(!AR(w))R ca(w);
 RZ(z=from(neg1,w));
 if(1==m)R z;
 v=(C*)AV(w)+c*k*(m-1);
 x=(C*)AV(z)+c*k;
 if(1==c){x-=k; DO(m-1, RZ(f2(v-=k,x,x)););}
 else {xx=x; DO(m-1, DO(c, v-=k; x-=k; RZ(f2(v,x,x));); x=xx;);}
 R z;
}

extern A sum();

static DF1(reduce){PROLOG;DECLF;A y,z;C*u,*v;I c,k,m,old,r,*s,t;
 RZ(w);
 r=AR(w); s=AS(w); t=AT(w); m=IC(w); c=aii(w);
 if(!m)R df1(w,iden(fix(fs)));
 if(!r)R ca(w);
 RZ(z=from(neg1,w));
 if(1==m)R z;
 if(CPLUS==ID(fs))R sum(w);
 GA(y,t,c,r-1,1+s); u=(C*)AV(y); k=c*bp(t); v=(C*)AV(w)+k*(m-1);
 old=tbase+ttop;
 DO(m-1, mv(t,c,u,v-=k); RZ(z=f2(y,z,fs)); gc(z,old););
 EPILOG(z);
}

static AS2(oprod, rank2ex(a,w,fs,lr(fs),RMAXL,f2))

F1(slash){
 RZ(w);
 R VERB&AT(w)?ADERIV(CSLASH,reduce,oprod,RMAXL,RMAXL,RMAXL):evger(w,sc(GINSERT));
}

static DF1(merge1){PROLOG;DECLF;A ind,z;C*v,*x;I c,k,r,*s,t,*u;
 RZ(w);
 r=MAX(0,AR(w)-1); s=1+AS(w); t=AT(w); c=aii(w);
 RZ(ind=pind(tally(w),f1(w,fs)));
 ASSERT(r==AR(ind),EVRANK);
 u=AS(ind); DO(r,ASSERT(s[i]==u[i],EVLENGTH););
 GA(z,t,c,r,s); x=(C*)AV(z); v=(C*)AV(w); u=AV(ind); k=bp(t);
 DO(c, mv1(t,1L,x+k*i,v+k*(i+c*u[i])););
 EPILOG(z);
}

static DF2(merge2){PROLOG;DECLF;A ind,z;C*u,*x;I ak,an,ar,*as,in,ir,*is,*iv,t,zk;
 RZ(a&&w);
 an=AN(a); ar=AR(a); as=AS(a);
 ASSERT(!an||HOMO(AT(a),AT(w)),EVDOMAIN);
 RZ(ind=pind(sc(AN(w)),f2(a,w,fs)));
 in=AN(ind); ir=AR(ind); is=AS(ind); iv=AV(ind);
 ASSERT(ar<=ir,EVRANK);
 DO(ar, ASSERT(as[i]==is[i+ir-ar],EVLENGTH););
 t=MAX(AT(a),AT(w)); RZ(a=cvt(t,a)); RZ(z=cvt(t,w));
 zk=bp(t); ak=zk*!!ar;
 x=(C*)AV(z); u=(C*)AV(a);
 DO(in, mv1(t,1L,x+zk**iv++,u+ak*(i%an)););
 EPILOG(z);
}

F1(rbrace){
 RZ(w);
 R NOUN&AT(w)?rbrace(qq(w,scf(inf))):ADERIV(CRBRACE,merge1,merge2,RMAXL,RMAXL,RMAXL);
}


static AS1(swap1, f2(w,w,fs))

static AS2(swap2, f2(w,a,fs))

static DF1(unquo1){RZ(   w); R unquote(0L,w,self);}

static DF2(unquo2){RZ(a&&w); R unquote(a ,w,self);}

F1(swap){
 RZ(w);
 if(VERB&AT(w))R ADERIV(CTILDE,swap1,swap2,RMAXL,rr(w),lr(w));
 else{A t;
  RZ(w=onm(w)); AT(w)=CHAR;
  t=srdlg(w);
  if(!t)RZ(t=ds(CZERO));
  R NOUN&AT(t) ? t : fdef(CTILDE,AT(t), unquo1,unquo2, w,0L,0L, mr(t),lr(t),rr(t));
}}


static I fixi;
static A fixpath;
static A*fixpv;

static F1(fixa){A fs,z;V*v;
 RZ(z=ca(w));
 if(NOUN&AT(z))R z;
 v=VAV(z);
 switch(v->id){
  case CGRCO:
  case CATDOT:
   v->h=every(v->h,fixa); v->f=every(v->h,aro); v->g=fixa(v->g);
   R z;
  case CTILDE:
   fs=v->f;
   if(CHAR&AT(fs)&&!all1(eps(box(fs),fixpath))){
    ASSERT(fixi,EVLIMIT);
    fixpv[--fixi]=fs; z=fixa(symbrd(fs)); fixpv[fixi++]=mtv;
    R z;
   }
  default:
   v->f=fixa(v->f); v->g=fixa(v->g); v->h=fixa(v->h);
   R z;
}}

F1(fix){PROLOG;A z;
 ASSERT(VERB&AT(w),EVDOMAIN);
 RZ(fixpath=reshape(sc(fixi=255L),jot)); fixpv=(A*)AV(fixpath);
 z=fixa(w);
 EPILOG(z);
}


A every(w,f)A w;AF f;{A*v,*x,z;
 RZ(w);
 GA(z,BOX,AN(w),AR(w),AS(w));
 x=(A*)AV(z); v=(A*)AV(w); DO(AN(w),RZ(*x++=f(*v++)););
 R z;
}
