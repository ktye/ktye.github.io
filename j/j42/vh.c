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
/* Verbs:  Indexof with Hashing                                            */

#include "j.h"
#include "v.h"

/* Archimedes    byte order:  3 2 1 0 7 6 5 4 */
/* VAX           byte order:  1 0 3 2 5 4 7 6 */
/* little endian byte order:  7 6 5 4 3 2 1 0 */
/* normal        byte order:  0 1 2 3 4 5 6 7 */

#if (SYS & SYS_ARCHIMEDES+SYS_VAX)
static I thn = 4;
static I ths = 0;
#else
static I thn = (5+(8!=sizeof(D)));
static I ths = (3+(8!=sizeof(D))) * !!(SYS & SYS_LILENDIAN);
#endif


static F2(ciof){A z;I an,k,t[256],wn,*x;UC*u,*v;
 RZ(a&&w);
 an=AN(a); u=(UC*)AV(a)+an; k=an;
 wn=AN(w); v=(UC*)AV(w);
 GA(z,INT,wn,AR(w)-MAX(0,AR(a)-1),AS(w)); x=AV(z);
 DO(256,t[i]=an;); DO(an,t[*--u]=--k;); DO(wn,*x++=t[*v++];);
 R z;
}  /* a i.w, byte-size items */

static UC htab[256]={
 122, 139,  99,  84, 246,  45, 155, 114,   7,  62,  50,  59, 133, 144, 182,  71,
 188,  80, 141, 171, 249, 164,  72,  10,  51,  22, 225,   5, 215, 243, 189, 250,
 221,  88,  17, 196, 100, 203,  96, 226, 112, 130, 126,  93,  12,  63,  86, 206,
 149, 213,  52,  89,  90, 148, 178, 168, 129,  38, 145, 159, 248,  68,  91, 201,
 101, 118, 236,  95, 163, 146, 104, 119,   1,  19, 190, 191,  35,   3, 124,  74,
  78, 207,  85, 209,  46, 156, 216, 254, 103, 185, 255, 137,  23, 165, 223,  33,
 228, 184, 113,  70,  43,  75,  79, 253,  21, 222, 186, 211, 220, 210,   0, 172,
 244,  27, 252, 134, 174, 120,  58,   4, 235, 107, 234, 230, 212, 218,   2, 183,
  53, 237,  60, 195, 187,  39,  49, 217, 239, 152, 208, 131,  24,  14, 115, 102,
  94,  83,  26, 205,  65, 177, 170,  42, 132, 128, 136, 161, 167,  31,  15,  36,
 181,  57, 198, 127,  18,  47, 142,  16, 162,  61, 179,  44,   8, 214, 125, 135,
 153, 204, 105, 160, 157, 154, 193,  25, 227, 231,  97, 194, 251, 200, 180,  77,
  13,  82, 117,  69, 166,  98, 147, 140,   6,  41,  66, 150, 175, 109,  87, 176,
  56, 247, 240, 224, 192, 138,  30,  48,   9, 110, 116,  20, 143, 202,  11,  37,
 111, 158,  55, 123,  40, 169, 197,  28,  92, 238,  32, 242,  76, 173,  54, 232,
  34, 199,  64, 108,  81,  73, 121, 233, 241, 151, 106, 229,  29,  67, 245, 219
};  /* P.K. Pearson, CACM 1990 6, pp. 677 */

static UC fh(fzz,t,k,v)B fzz;I k,t;C*v;{A x,*y;C*u;I i,n;UC z=0;
 if(t&BOX){
  n=k/4; y=(A*)v;
  for(i=0;i<n;++i){
   x=*y++; t=AT(x);
   if(AN(x)){t=t&NUMERIC?NUMERIC:t; u=(C*)&t; DO(4,z=htab[z^*u++];);}
   u=(C*)AS(x); DO(4*AR(x)+(t&CHAR?AN(x):0),z=htab[z^*u++];);
  }
  R z;
 }
 if(fzz){if(0==*(D*)v)v=(C*)&zeroZ; v+=ths; k=thn;}  /* NB. !*(D*)v is not the same */
 DO(k,z=htab[z^*v++];); 
 R z;
}

static int ane(u,v,k)A*u,*v;I k;{DO(k/4, if(one!=match(*u++,*v++))R 1;); R 0;}

static int dne(u,v,n)D*u,*v;I n;{DO(n, if(!teq(*u++,*v++))R 1;); R 0;}

static int jne(u,v,n)Z*u,*v;I n;{DO(n, if(!zeq(*u++,*v++))R 1;); R 0;}

static int fne(fzz,t,u,v,n)B fzz;I t;C*u,*v;I n;{
 if(fzz)R t&FL  ? dne(u,v,n) : jne(u,v,n);
 else   R t&BOX ? ane(u,v,n) : memcmp(u,v,n);
}

#define FINDC(c,lim)    \
  {j=0; p=hv-1;                                                       \
   do{p=memchr(1+p,c,m-j); j=p-hv;} while(p&&fne(fzz,t,v,u+j*k,lim)); \
   j=p?j:m;                                                           \
  }

F2(indexof){PROLOG;A h,z;C fzz,*hv,*p,*u,*v,*yv;D qctl=1-qct,qctr=1+qct,y,yy;
  I*as,at,i,j,j1,k,m,n,r,t,*ws,wt,*x,zn,zr;UC c,d;
 RZ(a&&w);
 at=AT(a); as=AS(a); m=IC(a); n=aii(a);
 wt=AT(w); ws=AS(w);
 r=MAX(0,AR(a)-1); zr=MAX(0,AR(w)-r); zn=n?AN(w)/n:0;
 if(c=r<=AR(w))DO(r,if(as[1+i]!=ws[zr+i]){c=0; break;});
 if(!(c&&m&&n&&zn&&HOMO(at,wt)))R reshape(take(sc(zr),shape(w)),c&&!n?sc(0L):tally(a));
 t=MAX(at,wt); k=n*bp(t);
 if(1==k)R ciof(a,w);
 if(t!=at)RZ(a=cvt(t,a)); u=(C*)AV(a);
 if(t!=wt)RZ(w=cvt(t,w)); v=(C*)AV(w);
 fzz=0!=qct&&t&FL+CMPX;
 GA(h,CHAR,m,1,0); hv=(C*)AV(h); p=u-k; DO(m,hv[i]=fh(fzz,t,k,p+=k););
 GA(z,INT,zn,zr,AS(w)); x=AV(z);
 if(fzz){
  yv=(C*)&y;
  for(i=0;i<zn;++i){
   yy=*(D*)v;
   y=qctl*yy; c=fh(fzz,t,k,yv); FINDC(c,n);
   y=qctr*yy; d=fh(fzz,t,k,yv); if(c==d)*x++=j; else{j1=j; FINDC(d,n); *x++=MIN(j,j1);}
   v+=k;
 }} else for(i=0;i<zn;++i){c=fh(fzz,t,k,v); FINDC(c,k); *x++=j; v+=k;}
 EPILOG(z);
}
