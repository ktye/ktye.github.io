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
/* Verbs:  Selection & Structural                                          */

#include "j.h"
#include "v.h"


F1(reverse){RZ(w); R AR(w)?from(apv(IC(w),-1L,-1L),w):ca(w);}

F2(rotate){I n,p;
 F2RANK(0,RMAX,rotate,0);
 p=i0(a); n=IC(w);
 R n&&AR(w)?from(apv(n,p%n-n*(0<p),1L),w):ca(w);
}

F1(cant1){RZ(w); R cant2(apv(AR(w),AR(w)-1,-1L),w);}

static F2(canta){PROLOG;A e,p,*pv,q,*qv,t,z;C b;I an,*av,d,*ev,i,j,k,*tv,*v,wr,*ws,zr;
 RZ(a&&w);
 an=AN(a); av=AV(a); wr=AR(w); ws=AS(w);
 ASSERT(an==wr,EVLENGTH);
 if(!wr)R ca(w);
 zr=0; DO(an, zr=MAX(zr,av[i]);); zr++;
 DO(zr, k=i; DO(an,if(b=k==av[i])break;); ASSERT(b,EVINDEX););
 GA(t,INT,wr,1,0); tv=AV(t);
 GA(p,BOX,zr,1,0); pv=(A*)AV(p);
 k=1; DO(wr, j=wr-1-i; tv[j]=k; k*=ws[j];);
 for(i=0;i<zr;i++){
  j=i; d=0; k=LONG_MAX;
  DO(an, if(j==av[i]){d+=tv[i]; k=MIN(k,ws[i]);});
  RZ(*pv++=apv(k,0L,d));
 }
 RZ(q=catalog(p)); qv=(A*)AV(q);
 GA(e,INT,AN(q),zr,AS(q)); ev=AV(e);
 DO(AN(q), k=0; v=AV(*qv); DO(zr,k+=*v++;); qv++; *ev++=k;);
 z=from(e,ravel(w)); EPILOG(z);
}  /* R.K.W. Hui, Uses of { and }, APL87, p. 57 */

static F1(cantm){A z;C*v,*vv,*x;I j,k,m,n,*s,t;
 RZ(w);
 s=AS(w); m=*s; n=*++s;
 t=AT(w); j=bp(t); k=j*n;
 GA(z,t,AN(w),AR(w),0); s=AS(z); *s=n; *++s=m;
 x=(C*)AV(z)-j; v=vv=(C*)AV(w)-k;
 DO(n, DO(m, memcpy(x+=j,v+=k,j);); v=vv+=j;);
 R z;
}

F2(cant2){A p,r,t,*v,y;I j=0,k,*pv,*yv;
 F2RANK(1,RMAX,cant2,0);
 RZ(r=rank(w));
 if(BOX&AT(a)){
  RZ(t=raze(a));
  RZ(p=pfill(r,t)); pv=AV(p);
  RZ(y=ca(p)); yv=AV(y);
  v=(A*)AV(a);
  DO(AR(w)-IC(t),yv[*pv++]=j++;);
  DO(AN(a), k=AN(v[i]); DO(k,yv[*pv++]=j;); j+=!!k;);
  R canta(y,w);
 } else {RZ(p=pinv(pfill(r,a))); R all1(match(p,v2(1L,0L)))?cantm(w):canta(p,w);}
}

static F2(itake){A z;I c,k,m,n,p,r,*s,t;
 RZ(a&&w);
 n=IC(w); r=AR(w); s=AS(w); t=AT(w);
 p=*AV(a); m=ABS(p); c=aii(w); k=c*bp(t)*(0>p);
 GA(z,t,c*m,MAX(1,r),s); *AS(z)=m; mv1(t,c*m*(m>n),AV(z),FILL(t));
 mv(t,c*MIN(m,n),(C*)AV(z)+k*MAX(0,m-n),(C*)AV(w)+k*MAX(0,n-m));
 R z;
}

F2(take){PROLOG;A s,t,z;B b;I an,*sv,*tv,*u,wr,*ws;
 F2RANK(1,RMAX,take,0);
 RZ(a=vi(a));
 an=AN(a); u=AV(a);
 if(!AR(w))RZ(w=reshape(apv(an,1L,0L),w));
 wr=AR(w); ws=AS(w);
 ASSERT(an<=wr,EVLENGTH);
 RZ(s=shape(w)); sv=AV(s);
 b=0; DO(wr,if(b=!sv[i])break;); if(!b)DO(an,if(b=!u[i])break;);
 if(b){mv(INT,an,sv,u); R reshape(mag(s),filler(one));}
 z=w; RZ(t=sc(0L)); tv=AV(t);
 DO(an, *tv=*u++; RZ(z=rank2ex(t,z,0L,0L,wr-i,itake)););
 EPILOG(z);
}

F2(drop){A s;I an,*sv,*u,wr,*ws;
 F2RANK(1,RMAX,drop,0);
 RZ(a=vi(a));
 an=AN(a); u=AV(a);
 if(!AR(w))RZ(w=reshape(apv(an,1L,0L),w));
 wr=AR(w); ws=AS(w);
 ASSERT(an<=wr,EVLENGTH);
 RZ(s=shape(w)); sv=AV(s);
 DO(an, sv[i]=0<u[i]?MIN(0,u[i]-ws[i]):MAX(0,u[i]+ws[i]););
 R take(s,w);
}

F1(head   ){R from(zero,w);}

F1(tail   ){R from(neg1,w);}

F1(behead ){R drop(one ,w);}

F1(curtail){R drop(neg1,w);}

F1(rank){RZ(w); R sc(AR(w));}

F1(shape){A z; RZ(w); GA(z,INT,AR(w),1,0); mv(INT,AR(w),AV(z),AS(w)); R z;}

F2(reshape){A z;C*v,*x;I k,m,n,r,t,*u;
 F2RANK(1,RMAX,reshape,0);
 RZ(a=vi(a)); r=AN(a); u=AV(a);
 n=AN(w); t=AT(w); k=n*bp(t); v=(C*)AV(w);
 DO(r,ASSERT(0<=u[i],EVDOMAIN););
 m=prod(r,u); ASSERT(n||!m, EVLENGTH);
 GA(z,t,m,r,u);
 if(n){x=(C*)AV(z); DO(m/n, mv(t,n,x,v); x+=k;); mv(t,m%n,x,v);}
 R z;
}

F2(reitem){F2RANK(1,RMAX,reitem,0); R reshape(over(a,behead(shape(w))),w);}

F1(tally){RZ(w); R sc(IC(w));}

F2(repeat){A z;C*v,*x;I c,j,k,m,p=0,n,r,t,*u;
 F2RANK(1,RMAX,repeat,0);
 RZ(a=vi(a));
 n=AN(a); u=AV(a); v=(C*)AV(w); r=AR(w); t=AT(w);
 m=IC(w); c=aii(w); k=c*bp(t);
 ASSERT(!AR(a)||!r||n==m,EVLENGTH);
 DO(n, ASSERT(0<=u[i],EVDOMAIN); p+=u[i];); p=1==n?m*p:p;
 if(r){
  GA(z,t,p*c,r,AS(w)); *AS(z)=p; x=(C*)AV(z);
  DO(1==n?m:n, j=i; DO(u[1<n?j:0], mv(t,c,x,v+j*k); x+=k;););
  R z;
 } else R reshape(sc(p),w);
}

F1(ravel){A z; RZ(w); GA(z,AT(w),AN(w),1,0); mv(AT(w),AN(w),AV(z),AV(w)); R z;}

F2(over){A s,z;C*x;I ar,*as,r,*sv,t,wr,*ws;
 RZ(a&&w);
 ar=AR(a); wr=AR(w); r=MAX(ar,wr); RZ(s=r?shape(r==ar?a:w):apv(1L,1L,0L)); sv=AV(s);
 if(r>ar){DO(ar?r-ar:1,sv[i]=1;); mv(INT,ar,sv+r-ar,AS(a)); RZ(a=reshape(s,a));}
 if(r>wr){DO(wr?r-wr:1,sv[i]=1;); mv(INT,wr,sv+r-wr,AS(w)); RZ(w=reshape(s,w));}
 as=AS(a); ws=AS(w); DO(r,sv[i]=MAX(as[i],ws[i]););
 sv[0]=IC(a); RZ(a=take(s,AN(a)?a:filler(w)));
 sv[0]=IC(w); RZ(w=take(s,AN(w)?w:filler(a)));
 RZ(t=coerce2(&a,&w,0L));
 GA(z,t,AN(a)+AN(w),r+!r,sv); *AS(z)=IC(a)+IC(w);
 x=(C*)AV(z); mv(t,AN(a),x,AV(a)); mv(t,AN(w),x+AN(a)*bp(t),AV(w));
 R z;
}

F2(overr){R rank2ex(a,w,0L,-1L,-1L,over);}

F1(lamin1){R reshape(over(one,shape(w)),w);}

F2(lamin2){RZ(a&&w); R over(AR(a)?lamin1(a):a, AR(w)?lamin1(w):AR(a)?w:table(w));}

F1(table){A z;
 RZ(w);
 GA(z,AT(w),AN(w),2,0); *AS(z)=IC(w); *(1+AS(z))=aii(w); mv(AT(w),AN(w),AV(z),AV(w));
 R z;
}

F1(catalog){PROLOG;A b,c,p,q,*v,*x,z;C*bu,*bv,**pv;I*cv,i,j,k,m,n,*qv,r=0,*s,t=0,*u;
 F1RANK(1,catalog,0);
 if(!(AN(w)&&BOX&AT(w)))R box(w);
 n=AN(w); v=(A*)AV(w);
 DO(n, if(AN(v[i])){k=AT(v[i]); t=t?t:k; ASSERT(HOMO(t,k),EVDOMAIN); t=MAX(t,k);});
 t=MAX(BOOL,t);
 GA(b,t,n,1,0);      bv=(C*)AV(b);
 GA(q,INT,n,1,0);    qv=AV(q);
 GA(p,BOX,n,1,0);    pv=(C**)AV(p);
 RZ(c=apv(n,0L,0L)); cv=AV(c);
 DO(n, RZ(c=cvt(t,v[i])); r+=AR(c); qv[i]=AN(c); pv[i]=(C*)AV(c););
 m=prod(n,qv);
 GA(z,BOX,m,r,0);    x=(A*)AV(z);
 s=AS(z); DO(n, u=AS(v[i]); k=AR(v[i]); DO(k,*s++=*u++;););
 k=bp(t);
 for(i=0;i<m;i++){
  bu=bv-k;
  DO(n, mv1(t,1L,bu+=k,pv[i]+k*cv[i]););
  DO(n, j=n-1-i; if(qv[j]>++cv[j])break; cv[j]=0;);
  *x++=ca(b);
 }
 EPILOG(z);
}  /* R.K.W. Hui, Uses of { and }, APL87, p. 57 */

static A ifrom(a,w,r)A a,w;I r;{A z;C*v,*x;I an,ar,*as,c,d,k,wr,*ws,wt,*u;
 RZ(a&&w);
 ar=AR(a); u=    AV(a); as=AS(a); an=AN(a);
 wr=AR(w); v=(C*)AV(w); ws=AS(w); wt=AT(w);
 d=MAX(0,wr-r); c=prod(d,r+ws); k=c*bp(wt);
 GA(z,wt,an*c,ar+d,as); mv(INT,d,ar+AS(z),ws+r); x=(C*)AV(z)-k;
 DO(an, memcpy(x+=k,v+k**u++,k););
 R z;
}

static F2(afi){RZ(a&&w); R(BOX&AT(w))?less(iota(a),pind(a,ope(w))):pind(a,w);}

static F2(afrom){PROLOG;A j,s,z;
 F2RANK(0,RMAX,afrom,0);
 RZ(a=ope(a));
 ASSERT(IC(a)<=AR(w),EVLENGTH);
 ASSERT(1>=AR(a),EVRANK);
 if(!AR(w))R w;
 RZ(s=take(tally(a),shape(w)));
 RZ(j=catalog(df2(s,a,under(ac2(afi),ds(COPE)))));
 z=ifrom(AN(j)?base2(s,ope(j)):j,w,IC(a));
 EPILOG(z);
}  /* R.K.W. Hui, Some Uses of { and }, APL87, p. 57 */

F2(from){RZ(a&&w); R BOX&AT(a)?afrom(a,w):ifrom(pind(tally(w),a),w,1L);}
