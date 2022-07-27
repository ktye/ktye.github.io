/* ----------------------------------------------------------------------- */
/* J-Source Version 5.1 - COPYRIGHT 1992 Iverson Software Inc.             */
/* 33 Major Street, Toronto, Ontario, Canada, M5S 2K9, (416) 925 6096      */
/*                                                                         */
/* J-Source is provided "as is" without warranty of any kind.              */
/*                                                                         */
/* J-Source Version 5.1 license agreement:  You may use, copy, and         */
/* modify the source.  You have a non-exclusive, royalty-free right        */
/* to redistribute source and executable files.                            */
/* ----------------------------------------------------------------------- */
/*                                                                         */
/* Conjunctions:  Power Operator ^: and Associates                         */

#include "j.h"
#include "a.h"


static DF1(ply){PROLOG;DECLFG;A hs,j,x,*xv,y,z;I i,*jv,k,m,n,*nv,old,p=0;
 hs=sv->h; m=AN(hs); nv=AV(hs);
 RZ(j=grade1(ravel(hs))); jv=AV(j);
 GA(x,BOX,m,AR(hs),AS(hs)); xv=(A*)AV(x);
 while(p<m&&0>nv[jv[p]])p++;
 if(p<m){
  RZ(z=ca(w));
  n=nv[jv[m-1]]; k=p;
  while(k<m&&!nv[jv[k]]){xv[jv[k]]=z; ++k;}
  old=tbase+ttop;
  for(i=1;i<=n;++i){
   RZ(z=f1(y=z,fs));
   if(all1(match(y,z))){DO(m-k, xv[jv[k+i]]=z;); break;}
   while(k<m&&i==nv[jv[k]]){xv[jv[k]]=z; ++k;}
   gc3(x,z,0L,old);
 }}
 if(0<p){
  RZ(fs=inv(fix(fs))); f1=VAV(fs)->f1;
  RZ(z=ca(w));
  n=nv[jv[0]]; k=p-1;
  old=tbase+ttop;
  for(i=-1;i>=n;--i){
   RZ(z=f1(y=z,fs));
   if(all1(match(y,z))){DO(1+k, xv[jv[i]]=z;); break;}
   while(0<=k&&i==nv[jv[k]]){xv[jv[k]]=z; --k;}
   gc3(x,z,0L,old);
 }}
 z=ope(x); EPILOG(z);
}

static DF2(fibon){PROLOG;DECLFG;A hs,j,x,*xv,y,z,z0;B b,c;I i,*jv,k=0,m,n,*nv,old,q,r,s;
 hs=sv->h; m=AN(hs); nv=AV(hs);
 GA(x,BOX,m,AR(hs),AS(hs)); xv=(A*)AV(x);
 if(m){
  RZ(j=grade1(ravel(hs))); jv=AV(j);
  ASSERT(0<=nv[jv[0]],EVDOMAIN);
  RZ(z0=ca(a)); RZ(z=ca(w)); b=0;
  n=nv[jv[m-1]];
  while(k<m&&2>(r=nv[jv[k]])){xv[jv[k]]=r?z:z0; ++k;}
  old=tbase+ttop;
  for(i=2;i<=n;++i){
   RZ(z=f2(z0,y=z,fs)); c=b; b=all1(match(z0,z)); z0=y;
   if(c&&b){r=i%2; DO(m-k, s=nv[q=jv[k+i]]; xv[q]=r!=s%2||s>=LONG_MAX?y:z;); break;}
   while(k<m&&i==nv[jv[k]]){xv[jv[k]]=z; ++k;}
   gc3(x,y,z,old);
 }}
 z=ope(x); EPILOG(z);
}

static DF1(while1){DECLFG;A n,y,z;I old;
 RZ(z=ca(w));
 old=tbase+ttop;
 while(1){
  RZ(n=df1(z,gs));
  RZ(z=df1(y=z,!AR(n)&&BOOL&AT(n)&&*(B*)AV(n)?fs:powop(fs,n)));
  if(all1(match(z,y)))R z;
  tpop(z);
}}

static DF2(while2){DECLFG; R df1(w,powop(amp(a,fs),amp(a,gs)));}

static DF1(inv1){R df1(w,inv(fix(VAV(self)->f)));}

F2(powop){A hs;
 RZ(a&&w);
 switch(CONJCASE(a,w)){
  case VN:
   RZ(hs=vib(sc(LONG_MAX),w));
   if(AR(hs)||-1!=*AV(hs))R fdef(CPOWOP,VERB, ply,fibon, a,w,hs, RMAXL,RMAXL,RMAXL);
   R evoke(a) ? fdef(CPOWOP,VERB, inv1,0L, a,w,0L, RMAXL,RMAXL,RMAXL) : inv(fix(a));
  case VV:
   R CDERIV(CPOWOP,while1,while2,RMAXL,RMAXL,RMAXL);
  default: ASSERT(0,EVDOMAIN);
}}
