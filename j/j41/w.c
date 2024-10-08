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
/* Spelling and Word Formation                                             */

#include "j.h"

#define SS              0    /* space                           */
#define SX              1    /* base                            */
#define SA              2    /* alphanumeric                    */
#define SN              3    /* N                               */
#define SNB             4    /* NB                              */
#define SNZ             5    /* NB.                             */
#define S9              6    /* numeric                         */
#define SQ              7    /* quote                           */
#define SQQ             8    /* even quotes                     */
#define SZ              9    /* trailing comment                */

#define EI              1    /* emit (b,i-1); b=.i              */
#define EN              2    /* b=.i                            */

typedef struct {C new,effect;} ST;

static ST state[10][9]={
/*SS */ {{SX,EN},{SS,0 },{SA,EN},{SN,EN},{SA,EN},{S9,EN},{SX,EN},{SX,EN},{SQ,EN}},
/*SX */ {{SX,EI},{SS,EI},{SA,EI},{SN,EI},{SA,EI},{S9,EI},{SX,0 },{SX,0 },{SQ,EI}},
/*SA */ {{SX,EI},{SS,EI},{SA,0 },{SA,0 },{SA,0 },{SA,0 },{SX,0 },{SX,0 },{SQ,EI}},
/*SN */ {{SX,EI},{SS,EI},{SA,0 },{SA,0 },{SNB,0},{SA,0 },{SX,0 },{SX,0 },{SQ,EI}},
/*SNB*/ {{SX,EI},{SS,EI},{SA,0 },{SA,0 },{SA,0 },{SA,0 },{SNZ,0},{SX,0 },{SQ,EI}},
/*SNZ*/ {{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SX,0 },{SX,0 },{SZ,0 }},
/*S9 */ {{SX,EI},{SS,EI},{S9,0 },{S9,0 },{S9,0 },{S9,0 },{S9,0 },{SX,0 },{SQ,EI}},
/*SQ */ {{SQ,0 },{SQ,0 },{SQ,0 },{SQ,0 },{SQ,0 },{SQ,0 },{SQ,0 },{SQ,0 },{SQQ,0}},
/*SQQ*/ {{SX,EI},{SS,EI},{SA,EI},{SN,EI},{SA,EI},{S9,EI},{SX,EI},{SX,EI},{SQ,0 }},
/*SZ */ {{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 },{SZ,0 }}
};
/*         CX      CS      CA      CN      CB      C9      CD      CC      CQ   */

static F1(wordil){A z;C e,nv,s,t;I b,i,m,n,*x,xb,xe;ST p;UC*v;
 RZ(w);
 nv=0; s=SS;
 n=AN(w); v=(UC*)AV(w); GA(z,INT,1+n+n,1,0); x=1+AV(z);
 for(i=0;i<n;++i){
  p=state[s][wtype[v[i]]]; e=p.effect;
  if(e==EI){
   t&=s==S9;
   if(t){if(!nv){nv=1; xb=b;} xe=i;}
   else{if(nv){nv=0; *x++=xb; *x++=xe-xb;} *x++=b; *x++=i-b;}
  }
  s=p.new;
  if(e){b=i; t=s==S9;}
 }
 ASSERT(s!=SQ,EVOPENQ);
 t&=s==S9;
 if(t){*x++=xb=nv?xb:b; *x++=n-xb;}
 else{if(nv){*x++=xb; *x++=xe-xb;} if(s!=SS){*x++=b; *x++=n-b;}}
 m=x-AV(z); *AV(z)=s==SZ||s==SNZ?-m/2:m/2;
 R z;
}

F1(words){A t,*x,z;C*s;I k,n,*y;
 F1RANK(1,words,0);
 ASSERT(CHAR&AT(w)||!AN(w),EVDOMAIN);
 RZ(t=wordil(w));
 s=(C*)AV(w); y=AV(t); n=*y++; n=0>n?-n:n;
 GA(z,BOX,n,1,0); x=(A*)AV(z);
 DO(n, k=*y++; *x++=str(*y++,s+k););
 R z;
}


#if (SYS & SYS_AMIGA)

static C*ndig(s)C*s;{while(*s&&C9==ctype[(UC)*s])++s; R s;}

D strtod(s,p)C*s,**p;{C*t,*u,*v=s;
 while(' '==*v)++v;
 u=v+('-'==*v); t=ndig(u);
 if(u!=t){t=ndig(t+('.'==*t)); if('e'==*t){++t; t+='-'==*t; t=ndig(u=t);}}
 *p=u==t?s:t;
 R atof(v);
}

#endif

static C*coninf(s,t,v)C*s,*t;D*v;{C c,d;
 while(' '==*s)++s;
 ASSERT('-'==*s,EVILNUM);
 c=*++s; if(' '==c||s==t){*v=inf; R s;}
 d=*++s; if((' '==d||s==t)&&('-'==c||'.'==c)){*v='-'==c?-inf:nan; R s;}
 ASSERT(0,EVILNUM);
}

A connum(n,s)I n;C*s;{PROLOG;A y,z;B b,p=1;C*ss,*t;D*u;I i,m=0;Z*v;
 RZ(y=str(n,s)); s=t=(C*)AV(y); ss=n+s;
 DO(n, if(CSIGN==*t)*t='-'; else if(CTAB==*t)*t=' '; b=' '==*t; m+=p>b; p=b; ++t;);
 b=!memchr(s,'j',n);
 GA(z,b?FL:CMPX,m,1!=m,0); u=(D*)AV(z); v=(Z*)AV(z);
#if (SYS & SYS_NEXT)
 if(b)DO(m, while(' '==*s)++s; *u++=strtod(t=s,&s); if(t==s)RZ(s=coninf(s,ss,u-1));)
 else
  for(i=0;i<m;++i){
   while(' '==*s)++s;
   v->im=0;    v->re=strtod(t=  s,&s); if(t==s)RZ(s=coninf(s,ss,&v->re));
   while(t<s&&'j'!=*t)++t; s=t;
   if('j'==*s){v->im=strtod(t=++s,&s); ASSERT(t!=s,EVILNUM);}
   ++v;
  }
#else
 if(b)DO(m, *u++=strtod(t=s,&s); if(t==s)RZ(s=coninf(s,ss,u-1));)
 else
  for(i=0;i<m;++i){
   v->im=0;    v->re=strtod(t=  s,&s); if(t==s)RZ(s=coninf(s,ss,&v->re));
   if('j'==*s){v->im=strtod(t=++s,&s); ASSERT(t!=s,EVILNUM);}
   ++v;
  }
#endif
 ASSERT(' '==*s||s==ss,EVILNUM);
 z=xcvt(z); EPILOG(z);
}

static A conname(n,s)I n;C*s;{A z;
 ASSERT(vnm(n,s),EVILNAME);
 GA(z,NAME,n,1,0); memcpy(AV(z),s,n);
 R z;
}

static A constr(n,s)I n;C*s;{A z;C b,c,p,*t,*x;I m=0;
 p=0; t=s; DO(n-2, c=*++t; b=c==CQUOTE; if(!b||p)m++;    p=b&&!p;);
 GA(z,CHAR,m,1!=m,0); x=(C*)AV(z);
 p=0; t=s; DO(n-2, c=*++t; b=c==CQUOTE; if(!b||p)*x++=c; p=b&&!p;);
 R z;
}

static F2(enstack){A t,*x,z;B b;C c,d,e,*s,*wi;I i,n,*u,wl;
 RZ(a&&w);
 s=(C*)AV(w); u=AV(a); n=*u++; n=0>n?-(1+n):n;
 GA(z,BOX,5+n,1,0); x=(A*)AV(z); *x++=mark;
 for(i=0;i<n;i++){
  wi=s+*u++; wl=*u++; c=e=*wi; d=*(wi+wl-1);
  b=1==wl||!(C9!=ctype[c]&&CESC1==d||CA!=ctype[c]&&CESC2==d);
  ASSERT(b||(e=spellin(wl,wi)),EVSPELL);
  RZ(t=ds(e));
  if(AT(t)&MARK) switch(ctype[c]){
   case CA: RZ(*x++=conname(wl,wi)); break;
   case CS:
   case C9: RZ(*x++=connum(wl,wi) ); break;
   case CQ: RZ(*x++=constr(wl,wi) ); break;
   default: ASSERT(0,EVDOMAIN);
  } else *x++=t;
 }
 *x++=mark;
 *x++=mark;
 *x++=mark;
 *x++=mark;
 R z;
}

F1(tokens){R enstack(wordil(w),w);}


static C spell[3][47]={
 '=',     '<',     '>',     '_',     '+',     '*',     '-',     '%',
 '^',     '$',     '~',     '|',     '.',     ':',     ',',     ';',
 '#',     '@',     '/',     CBSLASH, '[',     ']',     '{',     '}',
 '`',     CQQ,     '&',     '!',     '?',     'a',     'A',     'b',
 'c',     'C',     'e',     'E',     'f',     'i',     'j',     'o',
 'p',     'r',     'x',     'y',     '0',     '1',     0,

 CASGN,   CFLOOR,  CCEIL,   1,       COR,     CAND,    CNOT,    CDOMINO,
 CLOG,    CGOTO,   CNUB,    CREV,    CDOTDOT, COBVERSE,CCOMDOT, CCUT,
 CBASE,   CATDOT,  CSLDOT,  CBSDOT,  CLEV,    CDEX,    CTAKE,   CDROP,
 CGRDOT,  CEXEC,   CUNDER,  CFIT,    1,       CALP,    CATOMIC, CBOOL,
 CEIGEN,  CCYCLE,  CEPS,    CEBAR,   CFIX,    CIOTA,   CJDOT,   CCIRCLE,
 CPOLY,   CRDOT,   CALPHA,  COMEGA,  1,       1,       0,

 CGASGN,  CLE,     CGE,     CUSCO,   CNOR,    CNAND,   CMATCH,  CROOT,
 CPOWOP,  CSELF,   CNE,     CCANT,   CDOTCO,  1,       CLAMIN,  CWORDS,
 CABASE,  CATCO,   CGRADE,  CDGRADE, 1,       1,       CTAIL,   CCTAIL,
 CGRCO,   CTHORN,  CAMPCO,  CIBEAM,  1,       1,       1,       1,
 1,       1,       1,       1,       1,       1,       1,       1,
 1,       1,       1,       1,       CZERO,   CONE,    0,
};

static C nu[12][5]={
 'A','T',  CAT,     CATDOT,  CATCO,
 'B','S',  CBSLASH, CBSDOT,  CDGRADE,
 'C','A',  CEXP,    CLOG,    CPOWOP,
 'G','R',  CGRAVE,  CGRDOT,  CGRCO,
 'L','B',  CLEFT,   CLEV,    CLTCO,
 'L','C',  CLBRACE, CTAKE,   CTAIL,
 'N','O',  CPOUND,  CBASE,   CABASE,
 'R','B',  CRIGHT,  CDEX,    CRTCO,
 'R','C',  CRBRACE, CDROP,   CCTAIL,
 'S','H',  CDOLLAR, CGOTO,   CSELF,
 'S','T',  CSTILE,  CREV,    CCANT,
 'T','I',  CTILDE,  CNUB,    CNE,
};

C spellin(n,s)I n;C*s;{C d,p,q,*t;I j,k;
 switch(n){
  case 1:
   R *s;
  case 2:
   d=*(s+1); j=d==CESC1?1:d==CESC2?2:0;
   R j&&(t=(C*)strchr(spell[0],*s)) ? spell[j][k=t-spell[0],k] : 0;
   /* k is workaround for TurboC bug */
  case 3:
  case 4:
   if(CESC1!=*(s+n-1))R 0;
   p=*s; q=*(1+s); d=*(2+s); j=CESC1==d?2:d=='1'?3:d=='2'?4:0;
   if(j)DO(12, if(p==nu[i][0]&&q==nu[i][1])R nu[i][j];);
  default:
   R 0;
}}

A spellout(c)C c;{A z;C*q,*s;I k;
 switch(c){
  case CHOOK:  R str(1L,"2");
  case CFORK:  R str(1L,"3");
  case CADVF:  R str(1L,"4");
  case CHOOKO: R str(1L,"5");
  case CFORKO: R str(1L,"6");
  case CPDT:   R str(1L,".");
 }
 if(0<=c&&c<=127)R str(1L,&c);
 RZ(z=str(2L,"??")); s=(C*)AV(z);
 if     (q=(C*)strchr(spell[1],c)){k=q-spell[1]; s[0]=spell[0][k]; s[1]=CESC1;}
 else if(q=(C*)strchr(spell[2],c)){k=q-spell[2]; s[0]=spell[0][k]; s[1]=CESC2;}
 R z;
}
