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
/* Adverbs:  Partitions                                                    */

#include "j.h"
#include "a.h"


static F1(oind){A*x,z;I d,m,m1,n,n1,p,q,r,*s;
 r=AR(w); s=AS(w);
 m=1<r?*s:1;       m1=m-!!m;
 n=r?*(s+(1<r)):1; n1=n-!!n;
 d=m&&n?m+n-1:0;
 GA(z,BOX,d,1,0); x=(A*)AV(z);
 DO(d, p=MIN(i,m1); q=MIN(i,n1); RZ(*x++=apv((1+p+q-i),q+n*(i-q),n1));)
 R z;
}

static F2(osub){R ope(IC(w)?from(ope(a),w):w);}

static AS1(oblique, df2(oind(w),ravel(rank1ex(w,0L,-2L,box)),
  atop(fs,qq(ac2(osub),v2(0L,1L))) ))

static DF2(key){PROLOG;DECLF;A i,p,x,z;B*u;I c,d=-1,n,*v;
 RZ(a&&w);
 ASSERT(IC(a)==IC(w),EVLENGTH);
 RZ(x=indexof(a,a));
 RZ(i=grade1(x));
 RZ(x=from(i,x));
 n=AN(x); GA(p,BOOL,n,1,0);
 u=(B*)AV(p); v=AV(x); DO(n, c=d; d=*v++; *u++=c!=d;);
 z=df2(p,from(i,w),cut(fs,one));
 EPILOG(z);
}

F1(sldot){
 RZ(w);
 R VERB&AT(w)?ADERIV(CSLDOT,oblique,key,RMAXL,RMAXL,RMAXL):evger(w,sc(GAPPEND));
}

static F2(seg){A z;I c,k,m=0,n=0,*u,wt;
 RZ(a&&w);
 if(INT&AT(a)){u=AV(a); m=*u; n=*(1+u);}
 wt=AT(w); c=aii(w); k=c*bp(wt);
 GA(z,wt,n*c,MAX(1,AR(w)),AS(w)); *AS(z)=n;
 memcpy(AV(z),m*k+(C*)AV(w),n*k);
 R z;
}

static F2(iind){A z;I d,j,k,m,n,p,*x;
 RZ(a&&w);
 m=i0(a); p=ABS(m); n=IC(w);
 d=0>m?(n+p-1)/p:MAX(0,1+n-m);
 GA(z,INT,2*d,2,0); *AS(z)=d; *(1+AS(z))=2;
 x=AV(z); k=0>m?p:1; j=-k; DO(d, *x++=j+=k; *x++=p;); if(d)*--x=MIN(p,n-j);
 R z;
}

static F2(omask){A c,r,x,y;I m,n,p;
 RZ(a&&w);
 m=i0(a); p=ABS(m); n=IC(w);
 RZ(r=sc(0>m?(n+p-1)/p:MAX(0,1+n-m)));
 RZ(c=tally(w));
 RZ(x=reshape(sc(p)  ,zero));
 RZ(y=reshape(0>m?c:r,one ));
 R reshape(over(r,c),over(x,y));
}

static AS1(prefix, df2(table(apv(IC(w),1L,1L)),w,atop(fs,ds(CTAKE))))

static AS1(suffix, df2(table(ii(w)),           w,atop(fs,ds(CDROP))))

static AS2(infix , df2(iind(a,w),              w,atop(fs,qq(ac2(seg),v2(1L,RMAXL)))))

static AS2(outfix, df2(omask(a,w),             w,atop(fs,ds(CPOUND))))

F1(bslash){RZ(w); R VERB&AT(w)?ADERIV(CBSLASH,prefix,infix,RMAXL,0L,RMAXL):gtrain(w);}

F1(bsdot){
 RZ(w);
 ASSERT(VERB&AT(w),EVDOMAIN);
 R ADERIV(CBSDOT,suffix,outfix,RMAXL,0L,RMAXL);
}
