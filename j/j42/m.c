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
/* Memory Management Utilities                                             */

#include "j.h"

#if (SYS & SYS_PC)
#include <alloc.h>
#define FREE            farfree
#define MALLOC          (A)farmalloc
#define NMEM            65520L
#else
#define FREE            free
#define MALLOC          (A)malloc
#define NMEM            LONG_MAX
#endif


static A *tstack, tstacka;

static F1(fr){
 RZ(w);
 if(--AC(w))R zero;
 bytes-=4*WP(AT(w),AN(w),AR(w));
 FREE(w);
 R one;
}

static A ma(m)I m;{A z;
#if (SYS & SYS_PC)
 ASSERT(m<=NMEM,EVLIMIT);
#endif
 z=MALLOC(m);
 if(!breaker())R 0;
 ASSERT(z,EVWSFULL);
 bytes+=m; totbytes+=m; maxbytes=MAX(bytes,maxbytes);
 R z;
}

A traverse(w,f)A w;AF f;{
 RZ(w);
 switch(AT(w)){
  case BOX:
   {A*v=(A*)AV(w); DO(AN(w),f(*v++););}        break;
  case VERB: case ADV: case CONJ:
   {V*v=(V*)AV(w); f(v->f); f(v->g); f(v->h);} break;
  case SYMB:
   {SY*v=(SY*)AV(w); DO(AN(w), f(v->name); f(v->val); ++v;);}
 }
 R one;
}

F1(fa){traverse(w,fa); R fr(w);}

F1(ra){RZ(w); traverse(w,ra); ++AC(w); R w;}


static A tg(){A t=tstacka,z;
 RZ(z=ma(4*WP(BOX,NTSTACK,1L)));
 AT(z)=BOX; AC(z)=AR(z)=1; AN(z)=*AS(z)=NTSTACK;
 tstacka=z; tstack=(A*)AV(tstacka); tbase+=NTSTACK; ttop=1;
 *tstack=t;
 R z;
}

static A tf(){A t=tstacka;
 tstacka=*tstack; tstack=(A*)AV(tstacka); tbase-=NTSTACK; ttop=NTSTACK;
 R fr(t);
}

static F1(tpush){
 RZ(w);
 traverse(w,tpush);
 if(ttop>=NTSTACK)RZ(tg());
 tstack[ttop]=w;
 ++ttop;
 R w;
}

I tpop(old)I old;{while(old<tbase+ttop)1<ttop?fr(tstack[--ttop]):tf(); R old;}

A gc(w,old)A w;I old;{ra(w); tpop(old); R tpush(w);}

void gc3(x,y,z,old)A x,y,z;I old;{
 if(x)ra(x);    if(y)ra(y);    if(z)ra(z);
 tpop(old);
 if(x)tpush(x); if(y)tpush(y); if(z)tpush(z);
}


A ga(t,n,r,s)I t,n,r,*s;{A z;I m;
 ASSERT(r<=RMAX,EVLIMIT);
 RZ(z=ma(m=4*WP(t,n,r)));
 if(t&BOX+FUNC+SYMB)memset(z,'\000',m);
 AC(z)=1; AN(z)=n; AR(z)=r;
 AT(z)=0; tpush(z); AT(z)=t;
 if(t&IS1BYTE)*(n+(C*)AV(z))=0;
 if(1==r)*AS(z)=n; else if(r&&s)mv(INT,r,AS(z),s);
 R z;
}

F1(ca){A z; RZ(w); GA(z,AT(w),AN(w),AR(w),AS(w)); mv(AT(w),AN(w),AV(z),AV(w)); R z;}

F1(car){
 RZ(w=ca(w));
 switch(AT(w)){
  case BOX:
   {A*v=(A*)AV(w); DO(AN(w), RZ(*v=car(*v)); ++v;);}
   break;
  case VERB: case ADV: case CONJ:
   {V*v=(V*)AV(w);
    if(v->f)RZ(v->f=car(v->f));
    if(v->g)RZ(v->g=car(v->g));
    if(v->h)RZ(v->h=car(v->h));
 }}
 R w;
}
