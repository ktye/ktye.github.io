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
/* Parsing; see APL Dictionary, pp. 12-13 & 38.                            */

#include "j.h"
#include "p.h"
#include "a.h"

#if (SYS & SYS_PC)
#define NDEPTH          512
#endif
#ifndef NDEPTH
#define NDEPTH          4096
#endif

static I depth;
static A selfv;


F1(self1){A z; ASSERT(NDEPTH>++depth,EVLIMIT); z=df1(  w,selfv); --depth; R z;}

F2(self2){A z; ASSERT(NDEPTH>++depth,EVLIMIT); z=df2(a,w,selfv); --depth; R z;}

static DF1(dfs1){A oself=selfv,z; z=df1(  w,selfv=self); selfv=oself; R z;}

static DF2(dfs2){A oself=selfv,z; z=df2(a,w,selfv=self); selfv=oself; R z;}

DF2(unquote){A fs,z;
 RZ(fs=symbrd(VAV(self)->f));
 ASSERT(AT(self)==AT(fs),EVDOMAIN);
 ASSERT(NDEPTH>++depth,EVLIMIT); z=a?dfs2(a,w,fs):dfs1(w,fs); --depth; R z;
}


static ACTION(monad){R dfs1(stack[e],stack[b]);}

static ACTION(dyad ){R dfs2(stack[b],stack[e],stack[e-1]);}

static ACTION(adv  ){R df1(stack[b],stack[e]);}

static ACTION(conj ){R df2(stack[b],stack[e],stack[e-1]);}

static ACTION(forkv){R folk(stack[b],stack[1+b],stack[e]);}

static ACTION(hookv){R hook(stack[b],stack[e]);}

static ACTION(formo){A f,g,h;
 f=stack[b]; g=stack[1+b]; h=stack[2+b];
 R b==e-1?hooko(f,g):forko(f,g,h);
}

static ACTION(curry){R advform(stack[b],stack[e]);}

static ACTION(punc ){R stack[e-1];}

static ACTION(move ){A z=stack[MAX(0,e)]; R NAME&AT(z)&&!(ASGN&AT(stack[b]))?swap(z):z;}

static F2(isg){R symbis(onm(a),ope(w),global);}

static F2(isl){R symbis(onm(a),ope(w),local );}

static ACTION(is){A n=stack[b],v=stack[e];C p=local&&*AV(stack[1+b]);
 RZ(NAME&AT(n) ? symbis(n,v,p?local:global) : rank2ex(n,v,0L,0L,0L,p?isl:isg));
 R v;
}


#define EDGE    (MARK+ASGN+LPAR)
#define NOTCONJ (NOUN+VERB+ADV)

PT cases[] = {
 EDGE,         VERB,      NOUN,      ANY,       monad, vmonad, cmonad, 1, 2,
 EDGE+NOTCONJ, VERB,      VERB,      NOUN,      monad, vmonad, cmonad, 2, 3,
 EDGE+NOTCONJ, NOUN,      VERB,      NOUN,      dyad,  vdyad,  cdyad,  1, 3,
 EDGE+NOTCONJ, NOUN+VERB, ADV,       ANY,       adv,   vadv,   cadv,   1, 2,
 EDGE+NOTCONJ, NOUN+VERB, CONJ,      NOUN+VERB, conj,  vconj,  cconj,  1, 3,
 EDGE+NOTCONJ, VERB,      VERB,      VERB,      forkv, vforkv, cforkv, 1, 3,
 EDGE,         VERB,      VERB,      ANY,       hookv, vhookv, chookv, 1, 2,
 EDGE,         ADV+CONJ,  ADV+CONJ,  ADV+CONJ,  formo, vformo, cformo, 1, 3,
 EDGE,         ADV+CONJ,  ADV+CONJ,  ANY,       formo, vformo, cformo, 1, 2,
 EDGE,         CONJ,      NOUN+VERB, ANY,       curry, vcurry, ccurry, 1, 2,
 EDGE,         NOUN+VERB, CONJ,      ANY,       curry, vcurry, ccurry, 1, 2,
 NAME+NOUN,    ASGN,      RHS,       ANY,       is,    vis,    vis,    0, 2,
 LPAR,         RHS,       RPAR,      ANY,       punc,  vpunc,  vpunc,  0, 2,
};

I ncases=(sizeof cases)/(sizeof cases[0]);


F1(parse){A*s,*stack,z;I b,*c,e,i,j,k,m,n;
 RZ(w);
 stack=(A*)AV(w); n=m=AN(w)-4; asgn=0;
 do{
  for(i=0;i<ncases;i++){
   c=cases[i].c; s=n+stack;
   if(*c++&AT(*s++)&&*c++&AT(*s++)&&*c++&AT(*s++)&&*c++&AT(*s++)) break;
  }
  if(i<ncases){
   b=cases[i].b; j=n+b;
   e=cases[i].e; k=n+e;
   asgn=is==cases[i].f;
   RZ(stack[k]=(cases[i].f)(j,k,stack));
   DO(b,stack[--k]=stack[--j];); n=k;
  } else {RZ(stack[n-1]=move(n,m-1,stack)); n-=0<m--;}
 } while(0<=m);
 z=stack[1+n];
 ASSERT(AT(z)&MARK+RHS&&AT(stack[2+n])&MARK,EVSYNTAX);
 R z;
}
