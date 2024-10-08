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
/* Formatting (Thorn)                                                      */

#include "j.h"

#if (SYS & SYS_PC386+SYS_386IX)
#define CPINF           'i'             /* printf result of _  */
#define CPNAN           'n'             /* printf result of _. */
#else
#define CPINF           'I'             /* printf result of _  */
#define CPNAN           'N'             /* printf result of _. */
#endif

#define CPMINUS         '-'             /* printf minus sign   */
#define CPPLUS          '+'             /* printf plus  sign   */

#define NTH2            500
#define WB              2L
#define WI              12L
#define WD              (9L+NPP)
#define WZ              (WD+WD)

#define ENGAP(j,r,s,exp) {C b;I k=1;I p=j;I*sr=s+r-2;          \
                           DO((r-1)*!!p, k*=*(sr-i); b=!(p%k); exp;); }
#define FMTX(f,T)       void f(s,v)C*s;T*v;


static FMTX(fmtB,B){*s=*v?'1':'0'; *++s=0;}

static FMTX(fmtI,I){sprintf(s,"%ld",*v); if('-'==*s)*s=CSIGN;}

static FMTX(fmtD,D){C buf[1+WD],c,q,*t;D x=*v;I k=0;
 sprintf(buf,qpps,0==x&&1!=x?0:x);  /* 1!=x to handle NaN */
 c=*buf;
 if(c==CPMINUS)*s++=CSIGN;
 q=(c==CPMINUS)||(c==CPPLUS);
 c=buf[q];
 if(c==CPINF){*s++='_'; *s=0;}
 else if(c==CPNAN){if('-'!=*buf)*s++='_'; *s++='.'; *s=0;}
 else{
  if('.'==c)*s++='0';
  memcpy(s,buf+q,1+WD);
  if(t=strchr(s,'e')){
   if(CPMINUS==*++t)*t++=CSIGN;
   while(c=*(k+t),c=='0'||c==CPPLUS)k++;
   if(k)while(*t=*(k+t))t++;
}}}

static FMTX(fmtZ,Z){
 fmtD(s,&v->re);
 if(0!=v->im){I k=strlen(s); *(k+s)='j'; fmtD(1+k+s,&v->im);}
}

static A th(w,wd,fmt)A w;I wd;void(*fmt)();{
 PROLOG;A d,t,z;C q[WZ],*tv,*x,*y;I b,c,*dv,k,m,n,r,*s;
 RZ(w);
 n=AN(w); r=AR(w); s=AS(w);
 c=r?s[r-1]:1; m=n/c; b=bp(AT(w));
 GA(t,CHAR,wd*n,1,0); tv=(C*)AV(t);
 y=tv-wd; x=(C*)AV(w)-b; DO(n,fmt(y+=wd,x+=b);); y=tv;
 RZ(d=apv(c,1L,0L)); dv=AV(d);
 DO(m*(BOOL!=AT(w)), DO(c, k=strlen(y); dv[i]=MAX(dv[i],k); y+=wd;););
 --dv[c-1]; k=0; DO(c, k+=++dv[i];); y=tv;
 GA(z,CHAR,m*k,r+!r,s); *(AS(z)+r-!!r)=k; x=(C*)AV(z); memset(x,' ',AN(z));
 DO(m, DO(c, x+=dv[i]; k=strlen(y); memcpy(x-k-(c>1+i),memcpy(q,y,k),k); y+=wd;););
 EPILOG(z);
}


static F1(rc){A*v,x,y;I j,k,n,r,*s,xn,*xv,yn,*yv;
 RZ(w);
 n=AN(w); r=AR(w); s=AS(w); v=(A*)AV(w);
 xn=1<r?s[r-2]:1; yn=r?s[r-1]:1;
 RZ(x=apv(xn,0L,0L)); xv=AV(x);
 RZ(y=apv(yn,0L,0L)); yv=AV(y);
 DO(n, s=AS(*v++); j=i/yn%xn; k=i%yn; xv[j]=MAX(xv[j],*s); yv[k]=MAX(yv[k],*(1+s)););
 DO(xn,xv[i]++;); DO(yn,yv[i]++;);
 R link(x,y);
}

static void encell(zv,wd,w)C*zv;I wd;A w;{C*p,*q;I c,*s;
 s=AS(w); c=*(1+s); p=zv-wd; q=(C*)AV(w)-c; DO(*s, memcpy(p+=wd,q+=c,c););
}

static void fram(k,n,x,v)I k,n,*x;C*v;{C a,b=9==k,d,l,r;
 l=qbx[k]; a=b?' ':qbx[10]; d=b?l:qbx[1+k]; r=b?l:qbx[2+k];
 *v++=l; DO(n, memset(v,a,x[i]-1); v+=x[i]-1; *v++=d;); *--v=r;
}

static F1(enframe){A d,*v,x,y,z;C*s,*t,*zv;I ht,j,k,m,n,p,q,r,wd,xn,*xv,yn,*yv;
 RZ(d=rc(w));
 n=AN(w); r=MAX(2,AR(w)); v=(A*)AV(w);
 x=*(A*)(0+AV(d)); xn=AN(x); xv=AV(x); ht=1; DO(xn,ht+=xv[i];);
 y=*(A*)(1+AV(d)); yn=AN(y); yv=AV(y); wd=1; DO(yn,wd+=yv[i];);
 p=ht*wd; q=MAX(1,xn*yn); m=n/q;
 GA(z,CHAR,m*p,r,AS(w)); *(AS(z)+r-2)=ht; *(AS(z)+r-1)=wd; zv=(C*)AV(z);
 if(!n)R z;
  /* Initialize with box-drawing characters */
 fram(9L,yn,yv,zv); t=zv; DO(ht-2, memcpy(t+=wd,zv,wd););
 fram(3L,yn,yv,s=t=zv+wd*xv[0]); DO(xn-1, memcpy(t+=wd*xv[1+i],s,wd););
 fram(0L,yn,yv,zv);
 fram(6L,yn,yv,zv+p-wd);
 t=zv; DO(m-1, memcpy(t+=p,zv,p););
  /* Fill in each cell */
 j=1; DO(xn, k=xv[i]; xv[i]=j; j+=k;);
 j=1; DO(yn, k=yv[i]; yv[i]=j; j+=k;);
 DO(n, j=i/yn%xn; k=i%yn; encell(zv+i/q*p+wd*xv[j]+yv[k],wd,*v++););
 R z;
}

static F1(mat){A z;C*v,*x;I c,k,m=1,p,q,qc,r,*s,t;
 RZ(w);
 r=AR(w); s=AS(w); t=AT(w); v=(C*)AV(w);
 q=1<r?s[r-2]:1; c=r?s[r-1]:1; qc=q*c;
 k=2<r?2-r:0; DO(r-2, m*=s[i]; k+=m;); p=m*q+k*(m&&q);
 GA(z,t,p*c,2,0); *AS(z)=p; *(1+AS(z))=c; x=(C*)AV(z);
 if(2<r)mv1(t,AN(z),x,FILL(t));
 DO(m, ENGAP(i*q,r,s,x+=c*b); mv(t,qc,x,v); x+=qc; v+=qc;);
 R z;
}

F1(matth1){R mat(thorn1(w));}

static F1(thbox){PROLOG;A z;
 RZ(w);
 z=BOX&AT(w)?enframe(every(w,matth1)):matth1(w);
 EPILOG(z);
}

F1(thorn1){
 RZ(w);
 if(!AN(w)){A z;C b=BOX==AT(w);I r=MAX(2*b,AR(w));
  GA(z,CHAR,0,r,AS(w));
  if(b){I*s=r+AS(z); *--s=0; *--s=0;}
  R z;
 }
 switch(AT(w)){
  case NAME:
  case CHAR: R ca(w);
  case BOX:  R thbox(w);
  case BOOL: R th(w,WB,fmtB);
  case INT:  R th(w,WI,fmtI);
  case FL:   R th(w,WD,fmtD);
  case CMPX: R th(w,WZ,fmtZ);
  case VERB:
  case ADV:
  case CONJ: R thbox(drep(evoke(w)?symbrd(VAV(w)->f):w));
  default:   R 0;
}}

F1(jpr){PROLOG;A y;C*v;I c,m=1,n,q,r,*s;
 RZ(w);
 RZ(y=thorn1(w));
 n=AN(y); r=AR(y); s=AS(y); v=(C*)AV(y);
 q=1<r?s[r-2]:1; c=r?s[r-1]:1; DO(r-2,m*=s[i];);
 DO(m, ENGAP(i*q,r,s,if(b)jputc(CNL)); DO(q, v=wr(c,v); if(!breaker())R 0;););
 EPILOG(w);
}

static void c2j(wd,s,x)I wd;C*s,*x;{B b;C c,*q=s,*t=s;I k=0,m;
 if(m=strspn(x," ")){memcpy(s,x,m); s+=m; x+=m;}
 if(b=CPMINUS==*x){*s++=CSIGN; ++x;}
 c=*x;
 if(c==CPINF||c==CPPLUS||c==CPNAN){
  if(!wd&&' '==*t)++t; else if(1<wd){memset(q,' ',wd); t=q+wd-2;}
  if(c==CPNAN)strcpy(t,"_."); else strcpy(t+(!b&&1<wd),b?"__":"_");
 }else{
  if('.'==*x)*s++='0';
  memcpy(s,x,1+strlen(x));
  if(t=strchr(s,'e')){
   if(CPMINUS==*++t)*t++=CSIGN;
   while(c=*(k+t),c=='0'||c==CPPLUS)++k;
   if(k){
    if(!c||' '==c){*t++='0'; --k;}
    while(*t=*(k+t))++t;
    if(wd){DO(wd-(t-q),*t++=' ';); *t=0;}
}}}}

static I pstr(p,e)C*p;D e;{D x,y;S d,w;
 w=x=fabs(0.1*tfloor(10*e));
 if(0<=e)sprintf(p, w?"%%%1.1ff":" %%%1.1ff", x);
 else{y=10*(x-w); d=tfloor(y)+!!(SYS&SYS_PC); sprintf(p," %%- %d.%de",w-1,d);}
 R w;
}

F2(thorn2){PROLOG;A z;C buf[NTH2],p[15],*wv,*x;D*av,e,y;I an,i,k,m=0,n,wd,wk,wn,wt,zn;
 F2RANK(1,1,thorn2,0);
 an=AN(a); wn=AN(w); n=MAX(an,wn);
 ASSERT(1==an||1==wn||wn==an,EVLENGTH);
 wt=AT(w); wk=1==wn?0:bp(wt); ASSERT(wt&NUMERIC,EVDOMAIN);
 RZ(a=cvt(FL,a));
 av=(D*)AV(a); wv=(C*)AV(w);
 zn=20*n; GA(z,CHAR,zn,1,0); x=(C*)AV(z);
 for(i=0;i<n;++i){
  if(!i||1<an){wd=pstr(p,e=*av++); ASSERT(wd<NTH2,EVLIMIT);}
  switch(wt){
   case BOOL: sprintf(buf,p,(D)*wv);     break;
   case INT:  sprintf(buf,p,(D)*(I*)wv); break;
   default:   y=*(D*)wv; sprintf(buf,p,y);
  }
  while(zn<m+strlen(buf)){RZ(z=over(z,z)); zn+=zn; x=(C*)AV(z);}
  c2j(wd,m+x,buf+(!i&&!wd&&' '==*buf&&0<=e));
  k=strlen(m+x);
  if(wd&&wd<k)memset(m+x,'*',wd);
  wv+=wk; m+=wd?wd:k;
 }
 *(m+x)=0; z=str(m,x);
 EPILOG(z);
}
