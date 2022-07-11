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
/* Verbs: Grades                                                           */

#include "j.h"
#include "v.h"


#define COMP(f,T,Tp)    int f(a,b)I*a,*b;{I q;T*x=(T*)*a,*y=(T*)*b;Tp p;  \
                         DO(compn,if(p=*x++-*y++)break;);                 \
                         R p?SGN(p):(q=*++a-*++b,SGN(q));                 \
                        }

static I compn;

static COMP(compUC,UC,int)

static COMP(compI, I, I  )

static COMP(compD, D, D  )

static F2(grade){PROLOG;A y,z;B ascend;C*wv;I j,k,m,wk,wt,*x,*yv;
 RZ(w);
 ascend=a==one;
 if(CMPX&AT(w))RZ(w=cvt(FL,w));
 wt=AT(w); wv=(C*)AV(w); m=IC(w); compn=aii(w); wk=compn*bp(wt);
 ASSERT(wt&BOOL+CHAR+INT+FL,EVDOMAIN);
 if(1>=m||!compn)R ii(w);
 GA(y,INT,2*m,1,0); yv=AV(y);
 j=(I)wv-wk; DO(m, *yv++=j+=wk; *yv++=ascend?i:-i;);
 qsort(AV(y),m,2*sizeof(I),wt&BOOL+CHAR?compUC:wt&INT?compI:compD);
 GA(z,INT,m,1,0); x=AV(z);
 yv=AV(y); j=ascend?1:2*m-1; k=ascend?2:-2; DO(m, x[i]=ascend?yv[j]:-yv[j]; j+=k;);
 EPILOG(z);
}

F1(grade1){R grade(one,w);}

F2(grade2){R from(grade1(w),a);}

F1(dgrade1){R grade(neg1,w);}

F2(dgrade2){R from(dgrade1(w),a);}
