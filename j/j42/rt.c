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
/* Tree Representation                                                     */

#include "j.h"

static A trr();
static C xdash;


static F1(rc){A bot,p,top,*v,x,y;C*bv,*pv,*tv;I i,j,k,m,n,*s,xn,*xv,yn,*yv;
 RZ(w);
 n=AN(w); s=AS(w); v=(A*)AV(w);
 xn=*s;   RZ(x=apv(xn,0L,0L)); xv=AV(x);
 yn=*++s; RZ(y=apv(yn,0L,0L)); yv=AV(y);
 j=0; DO(xn, xv[i]=IC(v[j]); j+=yn;);
 GA(top,CHAR,n,1,0); tv=(C*)AV(top); memset(tv,' ',n);
 GA(bot,CHAR,n,1,0); bv=(C*)AV(bot); memset(bv,' ',n);
 for(i=j=k=0;i<n;++i){
  p=*v++;
  if(AN(p)){
   pv=(C*)AV(p); tv[i]=*pv; if(IC(p)==xv[j])bv[i]=*(pv+AN(p)-*(1+AS(p)));
   m=*(1+AS(p)); yv[k]=MAX(yv[k],m);
  }
  ++k; if(k==yn){k=0; ++j;}
 }
 {C ll,*u,ul,*v;
  u=tv+yn; v=bv; ul=qbx[0]; ll=qbx[6]; m=xn-1;
  for(j=0;j<m;++j){
   DO(yn, if(' '!=v[i]&&ul==u[i]||ll==v[i]&&' '!=u[i]){xv[j]+=1; break;});
   u+=yn; v+=yn;
 }}
 R link(x,y);
}

static F2(pad){A z;C*wv,*zv;I c,d,k;
 RZ(a&&w);
 if(!AN(w))R reshape(a,scc(' '));
 RZ(z=take(a,w));
 c=*(1+AS(w)); wv=(C*)AV(w)+c-1; zv=(C*)AV(z)+c;
 d=*(1+AS(z)); k=d-c;
 if(0<k)DO(IC(w), if(xdash==*wv)memset(zv,xdash,k); wv+=c; zv+=d;);
 R z;
}

static F1(graft){A p,q,t,*u,x,y,z,*zv;C*v;I d,j,k,m,n,*pv,*s,xn,*xv,yn,*yv;
 RZ(t=rc(w)); u=(A*)AV(t);
 x=*u;   xn=AN(x); xv=AV(x); m=0; DO(xn,m+=xv[i];);
 y=*++u; yn=AN(y); yv=AV(y);
 RZ(p=v2(0L,0L));  pv=AV(p);
 GA(z,BOX,yn,1,0); zv=(A*)AV(z);
 u=(A*)AV(w);
 for(j=0;j<yn;++j){
  GA(q,CHAR,m*yv[j],2,0); s=AS(q); *s=m; *++s=yv[j]; v=(C*)AV(q);
  pv[1]=yv[j]; k=j;
  DO(xn, *pv=xv[i]; RZ(t=pad(p,u[k])); memcpy(v,AV(t),AN(t)); v+=AN(t); k+=yn;);
  zv[j]=q;
 }
 t=zv[0]; n=yv[0];
 if(1==m)RZ(p=scc(xdash))
 else{
  v=(C*)AV(t);         DO(m, if(' '!=*v){j=i;   break;} v+=n;);
  v=(C*)AV(t)+AN(t)-n; DO(m, if(' '!=*v){k=m-i; break;} v-=n;);
  d=k-j;
  GA(p,CHAR,m,1,0); v=(C*)AV(p); memset(v,' ',m);
  if(1==d)*(v+j)=xdash; else{memset(v+j,qbx[9],d); *(v+j)=*qbx; *(v+k-1)=qbx[6];}
 }
 RZ(zv[0]=overr(p,t));
 R z;
}

static F2(center){A z;B*v;C b=1,*x;I j,k=0,m,n,*s;
 RZ(a&&w);
 m=AN(a); n=AN(w);
 GA(z,CHAR,m*n,2,0); s=AS(z); *s=n; *++s=m;
 v=(B*)AV(w); DO(n, if(b&&*v){b=0; j=i;} k+=*v++;);
 x=(C*)AV(z); memset(x,' ',AN(z)); memcpy(x+m*(k/2+j),AV(a),m);
 R z;
}

static F2(troot){A s,t,x;B d;C*u,*v;I j,k,m,n;
 RZ(a&&w);
 m=AN(a); u=(C*)AV(a); d=!m||'0'<=*u&&*u<='9';
 GA(s,CHAR,d?1:4+m,1,0); v=(C*)AV(s);
 *v=xdash; if(!d){v[3+m]=xdash; v[1]=v[2+m]=' '; memcpy(2+v,u,m);}
 t=*(A*)AV(w); m=IC(t); n=*(1+AS(t));
 u=(C*)AV(t);         DO(m, if(' '!=*u){j=i;   break;} u+=n;);
 u=(C*)AV(t)+(m-1)*n; DO(m, if(' '!=*u){k=m-i; break;} u-=n;);
 GA(x,BOOL,m,1,0); v=(B*)AV(x);
 d=0; mv1(BOOL,m,  v,  &d);
 d=1; mv1(BOOL,k-j,v+j,&d);
 R link(center(s,x),w);
}

static F1(tleaf){A t,*x,z;C d[2],*v;I n,*s;
 RZ(w);
 GA(z,BOX,1,1,0); x=(A*)AV(z);
 if(CHAR&AT(w)&&1>=AR(w)){
  n=AN(w);
  GA(t,CHAR,2+n,2,0); s=AS(t); *s=1; *++s=2+n;
  v=(C*)AV(t); *v=xdash; *(v+1)=' '; memcpy(2+v,AV(w),n);
  *x=t;
 }else{
  RZ(t=matth1(w)); d[0]=xdash; d[1]=' ';
  RZ(*x=overr(center(str(2L,d),reshape(tally(t),one)),t));
 }
 R z;
}

static F1(connect){C b,c=' ',d=' ',*x;I i,j=0,n,p;
 RZ(w);
 x=(C*)AV(w); n=AN(w); p=n/ *AS(w);
 for(i=0;i<n;++i){
  b=j?c:' '; c=j?d:x[i]; d=j==p-1?' ':x[1+i];
  if(c==qbx[9]&&b==xdash)x[i]=c=qbx[5];
  if(c==qbx[5]&&d==xdash)x[i]=c=qbx[4];
  if(c==qbx[9]&&d==xdash)x[i]=c=qbx[3];
  if(c==qbx[6]&&b==xdash)x[i]=c=qbx[7];
  ++j; j=j==p?0:j;
 }
 R w;
}

static F1(treach){R troot(scc('0'),graft(ope(every(w,trr))));}

static F1(trr){PROLOG;A fs,gs,hs,p,t,*x,z;B b;C c,id;I m;V*v;
 RZ(w);
 if(AT(w)&NOUN+NAME)R tleaf(w);
 v=VAV(w); id=v->id;  fs=v->f; gs=v->g; hs=v->h;
 m=!!fs+!!gs+(id==CFORK||id==CFORKO);
 if(!m)R tleaf(spellout(id));
 if(evoke(w))R tleaf(CA==ctype[c=*(C*)AV(fs)]?fs:spellout(c));
 GA(t,BOX,m,1,0); x=(A*)AV(t);
 if(id==CADVF&&((b=CGRAVE==ID(fs))||CGRAVE==ID(gs))){
  p=b?gs:fs;
  RZ(x[!b]=tleaf(scc(CGRAVE)));
  RZ(x[ b]=NOUN&AT(p)&&1>=AR(p) ? treach(every(p,fx)) : trr(p) );
 }else{
  RZ(x[0]=(id==CGRCO||id==CATDOT)&&1>=AR(fs) ? treach(hs) : trr(fs) );
  if(1<m)RZ(x[1]=trr(gs));
  if(2<m)RZ(x[2]=trr(hs));
 }
 z=troot(spellout(id),graft(ope(t)));
 EPILOG(z);
}

F2(trep){PROLOG;A*v,x,y,z;
 xdash=qbx[10];
 RZ(x=troot(a,trr(w)));
 RZ(y=ope(head(x)));
 v=(A*)AV(x); DO(AN(x)-1, RZ(y=overr(y,*++v)););
 z=connect(y);
 EPILOG(z);
}
