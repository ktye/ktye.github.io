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
/* Conjunctions:  Rank Associates                                          */

#include "j.h"
#include "a.h"

#define DR(r)           (0>r?RMAXL:r)


static I efr(ar,r)I ar,r;{R 0>r?MAX(0,r+ar):MIN(r,ar);}

static DF1(rank1){DECLF;I m,wr;
 RZ(w);
 wr=AR(w); m=efr(wr,*AV(sv->h));
 R m<wr?rank1ex(w,fs,m,f1):f1(w,fs);
}

static DF2(rank2){DECLF;I ar,wr,l,r,*v=AV(sv->h);
 RZ(a&&w);
 ar=AR(a); l=efr(ar,v[1]);
 wr=AR(w); r=efr(wr,v[2]);
 R l<ar||r<wr?rank2ex(a,w,fs,l,r,f2):f2(a,w,fs);
}

F2(qq){A hs,t;D*d;I n,*hv,r[3],*v;
 RZ(a&&w);
 if(NOUN&AT(a))R qq(atop(amp(a,ds(CLEFT)),ds(CLEFT)),w);
 RZ(hs=apv(3L,0L,0L)); hv=AV(hs);
 if(VERB&AT(w)){
  GA(t,FL,3,1,0); d=(D*)AV(t);
  n=r[0]=hv[0]=mr(w); d[0]=n<=-RMAX?-inf:RMAX<=n?inf:n;
  n=r[1]=hv[1]=lr(w); d[1]=n<=-RMAX?-inf:RMAX<=n?inf:n;
  n=r[2]=hv[2]=rr(w); d[2]=n<=-RMAX?-inf:RMAX<=n?inf:n;
  w=t;
 }else{
  n=AN(w);
  ASSERT(1>=AR(w),EVRANK);
  ASSERT(0<n&&n<4,EVLENGTH);
  RZ(t=vib(sc(RMAXL),w)); v=AV(t);
  hv[0]=v[2==n]; r[0]=DR(hv[0]);
  hv[1]=v[3==n]; r[1]=DR(hv[1]);
  hv[2]=v[n-1];  r[2]=DR(hv[2]);
 }
 R fdef(CQQ,VERB, rank1,rank2, a,w,hs, r[0],r[1],r[2]);
}


A sex1(w,zt,f1)A w;I zt;SF f1;{A z;C*v,*x;I n,wk,zk;
 RZ(w);
 n=AN(w);
 GA(z,zt,n,AR(w),AS(w));
 wk=bp(AT(w)); v=(C*)AV(w)-wk;
 zk=bp(zt);    x=(C*)AV(z)-zk;
 DO(n,RZ(f1(v+=wk,x+=zk)););
 R z;
}

A sex2(a,w,zt,f2)A a,w;I zt;SF f2;{A z;C*av,b,*u,*v,*wv,*x;
 I ak,an,ar,*as,m,n,wk,wn,wr,*ws,zk;
 RZ(a&&w);
 an=AN(a); ar=AR(a); as=AS(a); ak=bp(AT(a)); u=av=(C*)AV(a);
 wn=AN(w); wr=AR(w); ws=AS(w); wk=bp(AT(w)); v=wv=(C*)AV(w);
 b=ar<=wr; m=b?an:wn; n=m?(b?wn:an)/m:0;
 DO(b?ar:wr, ASSERT(as[ar-1-i]==ws[wr-1-i],EVLENGTH););
 GA(z,zt,m*n,b?wr:ar,b?ws:as); zk=bp(zt); x=(C*)AV(z);
 DO(n, DO(m, RZ(f2(u,v,x)); x+=zk; u+=ak; v+=wk;); b?(u=av):(v=wv););
 R z;
}


A rank1ex(w,fs,mr,f1)A w,fs;I mr;AF f1;{PROLOG;A*x,yw,yz,z;C*v;
 I n,wcn,wcr,wf,wk,wr,*ws,wt;
 RZ(w);
 wr=AR(w); ws=AS(w); wt=AT(w); v=(C*)AV(w); wcr=efr(wr,mr); wf=wr-wcr;
 n=prod(wf,ws); wcn=n?AN(w)/n:prod(wcr,wf+ws);
 GA(yw,wt,wcn,wcr,ws+wf); wk=wcn*bp(wt);
 GA(yz,BOX,n,wf,ws); x=(A*)AV(yz);
 if(n){DO(n, mv(wt,wcn,AV(yw),v); RZ(*x++=f1(yw,fs)); v+=wk;); z=ope(yz);}
 else{A y;
  RZ(y=f1(reshape(shape(yw),zero),fs));
  GA(z,AT(y),0,wf+AR(y),ws); mv(INT,AR(y),wf+AS(z),AS(y));
 }
 EPILOG(z);
}

A rank2ex(a,w,fs,lr,rr,f2)A a,w,fs;I lr,rr;AF f2;{PROLOG;A*x,ya,yw,yz,z;
 C*av,b,*u,*v,*wv;I acn,acr,af,ak,ar,*as,at,i,j,m,n,p,q,*s,wcn,wcr,wf,wk,wr,*ws,wt;
 RZ(a&&w);
 ar=AR(a); as=AS(a); at=AT(a); u=av=(C*)AV(a);
 wr=AR(w); ws=AS(w); wt=AT(w); v=wv=(C*)AV(w);
 acr=efr(ar,lr); af=ar-acr; acn=prod(acr,as+af); ak=acn*bp(at);
 wcr=efr(wr,rr); wf=wr-wcr; wcn=prod(wcr,ws+wf); wk=wcn*bp(wt);
 b=af<=wf; p=b?wf:af; q=b?af:wf; s=b?ws:as; n=prod(p-q,s); m=prod(q,s+p-q);
 DO(q, ASSERT(as[af-1-i]==ws[wf-1-i],EVLENGTH););
 GA(ya,at,acn,acr,as+af);
 GA(yw,wt,wcn,wcr,ws+wf);
 GA(yz,BOX,m*n,p,s); x=(A*)AV(yz);
 if(n&&m){
  for(i=0;i<n;i++){
   for(j=0;j<m;j++){
    mv(at,acn,AV(ya),u); u+=ak;
    mv(wt,wcn,AV(yw),v); v+=wk;
    if((VAV(fs)->f!=0)||(VAV(fs)->g!=0)){ RZ(*x++=f2(ya,yw,fs)); }/*ktye, see au.c DF1 comments */
    else{ RZ(*x++=f2(ya,yw)); }
   }
   b?(u=av):(v=wv);
  }
  z=ope(yz);
 }else{A y;
  if(AN(a))mv(at,acn,AV(ya),av); else RZ(ya=reshape(shape(ya),zero));
  if(AN(w))mv(wt,wcn,AV(yw),wv); else RZ(yw=reshape(shape(yw),zero));
  RZ(y=f2(ya,yw,fs));
  GA(z,AT(y),0,p+AR(y),s); mv(INT,AR(y),p+AS(z),AS(y));
 }
 EPILOG(z);
}
