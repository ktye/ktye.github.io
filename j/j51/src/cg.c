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
/* Conjunctions: Gerunds ` and `:                                          */

#include "j.h"
#include "a.h"


static DF1(con1){A h,*hv,*x,z;V*sv;
 PREF1(con1);
 sv=VAV(self); h=sv->h; hv=(A*)AV(h);
 GA(z,BOX,AN(h),AR(h),AS(h)); x=(A*)AV(z);
 DO(AN(h), RZ(*x++=(VAV(*hv)->f1)(w,*hv)); ++hv;);
 R ope(z);
}

static DF2(con2){A h,*hv,*x,z;V*sv;
 PREF2(con2);
 sv=VAV(self); h=sv->h; hv=(A*)AV(h);
 GA(z,BOX,AN(h),AR(h),AS(h)); x=(A*)AV(z);
 DO(AN(h), RZ(*x++=(VAV(*hv)->f2)(a,w,*hv)); ++hv;);
 R ope(z);
}

static DF1(insert){PROLOG;A hs,*hv,z;I hn,j,k,m,n;
 RZ(w);
 m=IC(w); hs=VAV(self)->h; hn=AN(hs); hv=(A*)AV(hs);
 if(!m)R df1(w,iden(fix(*hv)));
 j=n=MAX(hn,m-1);
 RZ(z=AR(w)?from(sc(n%m),w):ca(w));
 if(1==n)R z;
 DO(n, --j; k=j%hn; RZ(z=(VAV(hv[k])->f2)(from(sc(j%m),w),z,hv[k])););
 EPILOG(z);
}

F2(evger){A hs,*hv,u;I i,l=0,m=0,n,r=0;
 RZ(a&&w);
 RZ(w=vi(w)); ASSERT(!AR(w),EVRANK);
 n=AN(a); ASSERT(n,EVLENGTH); ASSERT(BOX&AT(a),EVDOMAIN);
 RZ(hs=every(a,fx)); hv=(A*)AV(hs);
 for(i=0;i<n;++i){
  u=hv[i];
  ASSERT(VERB&AT(u),EVDOMAIN);
  m=MAX(m,mr(u)); l=MAX(l,lr(u)); r=MAX(r,rr(u));
 }
 switch(*AV(w)){
  case GAPPEND:
   R AR(a) ? fdef(CGRCO,VERB, con1,con2, a,w,hs, m,l,r) : *hv;
  case GINSERT:
   ASSERT(1>=AR(a),EVRANK);
   R fdef(CGRCO,VERB, insert,0L, a,w,hs, RMAXL,0L,0L);
  case GTRAIN:
   R gtrain(a);
  default:
   ASSERT(0,EVDOMAIN);
}}

F2(tie){RZ(a&&w); R over(VERB&AT(a)?arep(a):a,VERB&AT(w)?arep(w):w);}


static DF1(case1){A u;V*sv;
 PREF1(case1);
 sv=VAV(self);
 RZ(u=from(df1(w,sv->g),sv->h));
 ASSERT(!AR(u),EVRANK);
 R df1(w,*AV(u));
}

static DF2(case2){A u;V*sv;
 PREF2(case2);
 sv=VAV(self);
 RZ(u=from(df2(a,w,sv->g),sv->h));
 ASSERT(!AR(u),EVRANK);
 R df2(a,w,*AV(u));
}

F2(agenda){A hs;
 RZ(a&&w)
 ASSERT(NOUN&AT(a)&&VERB&AT(w),EVDOMAIN);
 ASSERT(AN(a),EVLENGTH);
 ASSERT(BOX&AT(a),EVDOMAIN);
 RZ(hs=every(a,fx));
 R fdef(CATDOT,VERB, case1,case2, a,w,hs, mr(w),lr(w),rr(w));
}
