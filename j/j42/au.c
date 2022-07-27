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
/* Adverbs:  Utilities                                                     */

#include "j.h"
#include "a.h"


A ac1(f)AF f;{R fdef(0,VERB, f,0L, 0L,0L,0L, RMAXL,0L,0L   );}

A ac2(f)AF f;{R fdef(0,VERB, 0L,f, 0L,0L,0L, 0L,RMAXL,RMAXL);}

/* ktye:
 normal functions and derived functions are called with a self argument (a j-array of the verb).
 but the function definition for normal monadic or dyadic function does not include that parameter,
 which results in a function signature mismatch in wasm.
 e.g. applying the derived +/1 2 3 needs 'self' but 1+2 does not.
 i assume both self->f and self->g is 0 for normal functions.
 */
#ifdef WASM
DF1(df1){RZ(   w&&self); 
 if((VAV(self)->f!=0)||(VAV(self)->g!=0)) R(VAV(self)->f1)(  w,self);
 else R(VAV(self)->f1)(  w);
}

DF2(df2){RZ(a&&w&&self); 
 if((VAV(self)->f!=0)||(VAV(self)->g!=0)) R(VAV(self)->f2)(a,w,self);
 else R(VAV(self)->f2)(a,w);
}
#else
DF1(df1){RZ(   w&&self); R(VAV(self)->f1)(  w,self);}

DF2(df2){RZ(a&&w&&self); R(VAV(self)->f2)(a,w,self);}
#endif

A ds(c)C c;{I t;P*p;
 p=ps+psptr[(UC)c]; t=p->type;
 switch(t){
  case NOUN: R(A)p->f1;
  case ASGN: R scalar4(t,(I)(c==CASGN));
  case NAME: R scnm(c);
  case VERB:
  case ADV:
  case CONJ: R fdef(c,t, p->f1,p->f2, 0L,0L,0L,(I)p->mr,(I)p->lr,(I)p->rr);
  case LPAR:
  case RPAR: R scalar4(t,0L);
  default:   R mark;
}}

static F2(domerr){ASSERT(0,EVDOMAIN);}

A fdef(id,t,f1,f2,fs,gs,hs,m,l,r)C id;I t,m,l,r;AF f1,f2;A fs,gs,hs;{A z;V*v;
 GA(z,t,1,0,0); v=VAV(z);
 v->id=id;
 v->mr=m;
 v->lr=l;
 v->rr=r;
 v->f1=f1?f1:domerr;
 v->f2=f2?f2:domerr;
 v->f =fs;
 v->g =gs;
 v->h =hs;
 R z;
}
