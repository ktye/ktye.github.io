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
/* Interpreter Utilities                                                   */

#include "j.h"


I aii(w)A w;{I m=IC(w); R m?AN(w)/m:prod(AR(w)-1,1+AS(w));}

B all1(w)A w;{B*b; RZ(w); b=(B*)AV(w); DO(AN(w), if(!*b++)R 0;); R 1;}

A apv(n,b,m)I n,b,m;{A z;I j=b-m,*x; GA(z,INT,n,1,0); x=AV(z); DO(n,*x++=j+=m;); R z;}

I bp(t)I t;{
 switch(t){
  case BOOL:  R sizeof(B);
  case NAME:
  case CHAR:  R sizeof(C);
  case LPAR:
  case RPAR:
  case ASGN:
  case MARK:
  case INT:   R sizeof(I);
  case FL:    R sizeof(D);
  case CMPX:  R sizeof(Z);
  case BOX:   R sizeof(A);
  case VERB:
  case ADV:
  case CONJ:  R sizeof(V);
  case SYMB:  R sizeof(SY);
  default:    jsignal(EVSYSTEM); jouts("bp\n"); R 0;
}}

I coerce1(w,mt)A*w;I mt;{I t,wt;
 RZ(*w);
 if(!AN(*w))R MAX(BOOL,mt);
 wt=AT(*w);
 t=MAX(wt,mt);
 ASSERT(!mt||!(t&NUMERIC)==!(mt&NUMERIC),EVDOMAIN);
 if(t!=wt)RZ(*w=cvt(t,*w));
 R t;
}

I coerce2(a,w,mt)A*a,*w;I mt;{I at,t,wt;
 RZ(*a&&*w);
 at=AT(*a)*!!AN(*a);
 wt=AT(*w)*!!AN(*w);
 if(!at&&!wt)R MAX(BOOL,mt);
 t=MAX(mt,MAX(at,wt));
 ASSERT(!mt||!(t&NUMERIC)==!(mt&NUMERIC),EVDOMAIN);
 if(t!=at)RZ(*a=cvt(t,*a));
 if(t!=wt)RZ(*w=cvt(t,*w));
 R t;
}

A cstr(s)C*s;{R str((I)strlen(s),s);}

B evoke(w)A w;{V*v=VAV(w); R CTILDE==v->id&&CHAR&AT(v->f);}

C*fi(s,v)C*s;I*v;{C*t; *v=strtol(s,&t,10); ASSERT(0<=*v&&s!=t,EVDOMAIN); R t;}

F1(filler){A z;I t; RZ(w); t=AT(w); GA(z,t,1,0,0); mv1(t,1L,AV(z),FILL(t)); R z;}

F1(ii){RZ(w); R apv(IC(w),0L,1L);}

I i0(w)A w;{RZ(w=vi(w)); ASSERT(!AR(w),EVRANK); R*AV(w);}

#if LINKJ
void jsignal(e)int e;{if(jerr)R; jerr=e;}
#else
void jsignal(e)int e;{A t=*(e+(A*)AV(qevm));
 if(jerr)R;
 jerr=e;
 if(errsee){jouts(AV(t)); jputc(CNL);}
}
#endif

C lc(w)A w;{RZ(w); R*((C*)AV(w)+AN(w)-1);}

void mv(t,n,z,w)I t,n;C*z,*w;{memcpy(z,w,n*bp(t));}

void mv1(t,n,z,w)I t,n;C*z,*w;{I m=bp(t);
 if(1==m)memset(z,*w,n);else DO(n, memcpy(z,w,m); z+=m;);
}

I prod(n,v)I n,*v;{I z=1; DO(n,if(!v[i])R 0;); DO(n,z*=v[i];); R z;}

F1(rankle){R!w||AR(w)?w:ravel(w);}

A sc(k)I k;{A z; GA(z,INT,1,0,0); *AV(z)=k; R z;}

A scalar4(t,v)I t,v;{A z; GA(z,t,1,0,0); *AV(z)=v; R z;}

A scc(c) C c;{A z; GA(z,CHAR,1,0,0); *(C*)AV(z)=c; R z;}

A scf(x) D x;{A z; GA(z,FL  ,1,0,0); *(D*)AV(z)=x; R z;}

A scnm(c)C c;{A z; GA(z,NAME,1,0,0); *(C*)AV(z)=c; R z;}

A str(n,s)I n;C*s;{A z; GA(z,CHAR,n,1,0); memcpy(AV(z),s,n); R z;}

F1(vi){RZ(w); ASSERT(!AN(w)||AT(w)&NUMERIC,EVDOMAIN); R INT&AT(w)?w:cvt(INT,w);}

F2(vib){
 RZ(w);
 if(INT&AT(w))R w;
 ASSERT(all1(eq(w,floor1(w))),EVDOMAIN);
 R cvt(INT,maximum(negate(a),minimum(a,w)));
}

F1(vn){RZ(w); ASSERT(NOUN&AT(w),EVSYNTAX); R w;}

F1(vs){RZ(w); ASSERT(!AN(w)||AT(w)&CHAR+NAME,EVDOMAIN); ASSERT(1>=AR(w),EVRANK); R w;}

A v2(a,b)I a,b;{A z;I*x; GA(z,INT,2,1,0); x=AV(z); *x++=a; *x=b; R z;}


I mr(w)A w;{R VAV(w)->mr;}

I lr(w)A w;{R VAV(w)->lr;}

I rr(w)A w;{R VAV(w)->rr;}
 