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
/* Verbs                                                                   */

#include "j.h"
#include "v.h"


F1(left1){R ca(w);}

F2(left2){R ca(a);}

F1(right1){R ca(w);}

F2(right2){R ca(w);}

F2(less){A s;I ar,k,m,*sv,wr,*ws;
 RZ(a&&w);
 ar=AR(a); wr=AR(w);
 if(ar>1+wr)R ca(a);
 if(wr&&ar!=wr){
  m=MAX(1,ar);
  GA(s,INT,m,1,0); sv=AV(s); ws=AS(w);
  k=ar>wr?0:1+wr-m; *sv=prod(k,ws); mv(INT,m-1,1+sv,k+ws);
  RZ(w=reshape(s,w));
 }
 R repeat(not(eps(a,w)),a);
}

F1(nub){R repeat(nubsieve(w),w);}

F1(iota){A z;I m,n,*v;
 F1RANK(1,iota,0);
 RZ(w=vi(w));
 n=AN(w); v=AV(w); m=prod(n,v);
 RZ(z=reshape(mag(w),apv(ABS(m),0L,1L)));
 DO(n*!!m, if(0>v[i])RZ(z=rank1ex(z,0L,n-i,reverse)););
 R z;
}

F1(immex){A z; R (z=parse(tokens(w)))&&!asgn ? jpr(z) : z;}

F1(exec1){A z;
 F1RANK(1,exec1,0);
 z=parse(tokens(vs(w))); asgn=0;
 R !z?0:MARK&AT(z)?mtv:vn(z);
}

F2(exec2){A z;C es=errsee;
 F2RANK(1,1,exec2,0);
 errsee=0; z=exec1(w); errsee=es; jerr=0;
 R z?z:exec1(a);
}


F1(box){RZ(w); R scalar4(BOX,ca(w));}

static void povtake(a,w,x)A a,w;C*x;{C*v;I d,i,j,k,m,n,q,r,*s,t,*u,y;
 m=AN(a); u=AV(a);
 n=AN(w); v=(C*)AV(w); r=AR(w); s=AS(w); t=AT(w); k=bp(t);
 if(r==m){C b=0; DO(m,if(b=u[i]!=s[i])break;); if(!b){mv(t,n,x,v); R;}}
 for(i=0;i<n;i++){
  y=0; d=1; q=i; /* y=.a#.((-$a){.(($a)$1),$w)#:i */
  DO(r, j=s[r-1-i]; y+=q%j*d; d*=u[m-i-1]; q/=j;);
  mv1(t,1L,x+y*k,v); v+=k;
}}

F1(ope){PROLOG;A a,*v,y,z;C*x;I j,k,m,n,p,r=0,*s,t=0,*u,*uu;
 RZ(w);
 n=AN(w); v=(A*)AV(w);
 if(!(BOX&AT(w)))R ca(w);
 if(!n)R cvt(BOOL,w);
 if(!AR(w))R*v;
 DO(n, r=MAX(r,AR(v[i])););
 DO(n, if(AN(v[i])){k=AT(v[i]); t=t?t:k; ASSERT(HOMO(t,k),EVDOMAIN); t=MAX(t,k);});
 t=MAX(BOOL,t);
 RZ(a=apv(r,0L,0L)); uu=r+AV(a);
 for(j=0;j<n;j++){
  y=v[j]; p=AR(y); s=p+AS(y); u=uu;
  DO(p, --s; --u; *u=MAX(*s,*u);); DO(r-p, --u; *u=MAX(1,*u););
 }
 u=AV(a); m=prod(r,u);
 GA(z,t,n*m,r+AR(w),AS(w)); mv(INT,r,AS(z)+AR(w),u);
 x=(C*)AV(z); mv1(t,n*m,x,FILL(t)); k=m*bp(t);
 DO(n, if(AN(v[i]))povtake(a,cvt(t,v[i]),x); x+=k;);
 EPILOG(z);
}

F1(raze){A u,*v,y,z;C b=0,*x;I c=0,k,m=0,n,p,r=1,t,*s;
 RZ(w);
 n=AN(w); v=(A*)AV(w);
 if(!(n&&BOX&AT(w)))R ravel(w);
 t=AT(*v); k=bp(t);
 DO(n, y=v[i]; c+=IC(y); m+=AN(y); r=MAX(r,AR(y)); if(b=t!=AT(y))break;);
 if(!b&&1<r){
  c=0;
  DO(n, y=v[i]; c+=r>AR(y)?1:(u=y,IC(y)););
  p=4*(r-1); s=1+AS(u);
  DO(n, y=v[i]; if(b=r>1+AR(y)||p&&memcmp(s,1+AS(y),p))break;);
 }
 if(b){z=*v++; DO(n-1,RZ(z=over(z,*v++));); R rankle(z);}
 GA(z,t,m,r,AS(u)); *AS(z)=c; x=(C*)AV(z);
 DO(n, y=*v++; p=k*AN(y); memcpy(x,AV(y),p); x+=p;);
 R z;
}

F2(link){RZ(a&&w); R over(box(a),AN(w)&&BOX&AT(w)?w:box(w));}


F1(zero1){RZ(   w); R zero;}

F2(zero2){RZ(a&&w); R zero;}

F1(one1 ){RZ(   w); R one;}

F2(one2 ){RZ(a&&w); R one;}

F1(inf1 ){RZ(   w); R scf(inf);}

F2(inf2 ){RZ(a&&w); R scf(inf);}


F1(roll){A z;D rl=qrl;static D m=16807,p=2147483647L;I k,wn,*wv,*zv;
 RZ(w=vi(w));
 wn=AN(w); wv=AV(w);
 GA(z,INT,wn,AR(w),AS(w)); zv=AV(z);
 DO(wn, k=*wv++; ASSERT(0<k, EVDOMAIN); rl=fmod(rl*m,p); *zv++=(I)floor(rl*k/p););
 qrl=rl;
 R z;
}  /* P.C. Berry, Sharp APL Reference Manual, 1979, p. 126. */

F2(deal){A y;D rl=qrl;static D m=16807,p=2147483647L;I am,j,k,wm,*yv;
 F2RANK(0,0,deal,0);
 am=i0(a);
 wm=i0(w);
 ASSERT(0<=am&&am<=wm,EVDOMAIN);
 RZ(y=apv(wm,wm-1,-1L)); yv=AV(y);
 DO(am, rl=fmod(rl*m,p); j=i+(I)floor(rl*(wm-i)/(1+p)); k=yv[i]; yv[i]=yv[j]; yv[j]=k;);
 qrl=rl;
 R take(a,y);
}  /* P.C. Berry, Sharp APL Reference Manual, 1979, p. 178. */
