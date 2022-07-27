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
/* Symbol Table & Associates                                               */

#include "j.h"
#include "a.h"


A global,local=0;
I twprimes[]={61,139,271,523,1021,2029,4093,8221,16363,0}; /* p-2 also prime */

static I probe(a,symb,is)A a,symb;C is;{A t;C*av;I c,i,k,m;SY*tab;
 av=(C*)AV(a); tab=(SY*)AV(symb); m=AN(symb);
 k=256L*(UC)*av+*(av+AN(a)-1);
 i=k%m;
 c=1+k%(m-2);
 if(is)while((t=tab[i].name)&&!(MARK&AT(t)))i-=i<c?c-m:c;
 else  while((t=tab[i].name)&&(MARK&AT(t)||strcmp(av,(C*)AV(t))))i-=i<c?c-m:c;
 R i;
} /* D.E. Knuth, Algorithm D, "Searching & Sorting", p. 521. */

F2(srd){R(probe(a,w,0)+(SY*)AV(w))->val;}

static B sex(a,w,b)A a,w;B b;{SY*e;
 e=probe(a,w,0)+(SY*)AV(w);
 if(e->val&&!b){
  fa(e->name); e->name=mark;
  fa(e->val ); e->val =0;
 }
 R!!e->val;
}

A symbis(a,w,symb)A a,w,symb;{B b;SY*e;
 RZ(a&&w);
 a=ra(a); w=ra(w);
 b=CESC2==lc(a);
 ASSERT(!(sex(a,symb,b)&&b),EVNOTASGN);
 e=probe(a,symb,1)+(SY*)AV(symb);
 e->name=a; e->val=w;
 R mark;
}

F1(srdlg){A z; R local&&(z=srd(w,local))?z:srd(w,global);}

static F1(stdnm){C c,*s;I j,n,p,q;
 RZ(vs(w));
 n=AN(w); s=(C*)AV(w);
 j=0;    DO(n, if(' '!=s[j++])break;); p=n?j-1:0;
 j=n-1;  DO(n, if(' '!=s[j--])break;); q=n?(n-2)-j:0;
 if(p||q)RZ(w=drop(sc(p),drop(sc(-q),w)));
 c=spellin(n,AV(w));
 R c&&1!=c? scc(c) : w;
}


DF1(ex){A y;B b;
 PREF1(ex);
 ASSERT(BOX&AT(w),EVDOMAIN);
 RZ(y=stdnm(*AV(w)));
 b=CESC2==lc(y);
 R !vnm(AN(y),AV(y)) ? zero : b ? (sex(y,global,b)?zero:one) :
   (local&&sex(y,local,b)||sex(y,global,b),one);
}

I nc(w)A w;{R !w ? 0 : NOUN&AT(w) ? 2 : VERB&AT(w) ? 3 : ADV&AT(w) ? 4 : 5;}

DF1(ncx){A t,y;
 PREF1(ncx);
 R sc(BOX&AT(w) && (t=*(A*)AV(w)) && AN(t) && 1>=AR(t) && AT(t)&CHAR+NAME &&
  (y=stdnm(t)) && vnm(AN(y),AV(y)) ? nc(srdlg(y)) : -1L);
}

static C nla[256];
static I nlmask[] = {0, 0, NOUN, VERB, ADV, CONJ};

static A nls(tm,w)I tm;A w;{A x,y,*yv;C b,c;I i,k=0,n;SY*e;
 RZ(w);
 n=AN(w); e=(SY*)AV(w);
 GA(y,BOX,n,1,0); yv=(A*)AV(y);
 for(i=0;i<n;i++){
  x=e->name;
  b=x&&e->val&&tm&AT(e->val)&&nla[c=*(C*)AV(x),(UC)c];
  if(b){*yv++=0<=c&&c<=127?str(AN(x),AV(x)):spellout(c); ++k;}
  ++e;
 }
 R take(sc(k),y);
}

static F1(nlx){A l=0,z;I tm=0,*v;
 RZ(w=vi(w));
 v=AV(w); DO(AN(w), ASSERT(0<*v&&*v<6,EVDOMAIN); tm+=nlmask[*v++];);
 RZ(z=nls(tm,global));
 if(local)RZ(z=over(l=nls(tm,local),z));
 RZ(z=grade2(z,ope(z)));
 if(l)z=repeat(ne(z,behead(over(z,jot))),z);
 R z;
}

DF1(nl1){DO(256,nla[i]=1;); R nlx(w);}

DF2(nl2){UC*u;
 RZ(a&&w);
 ASSERT(CHAR&AT(a),EVDOMAIN);
 u=(UC*)AV(a); DO(256,nla[i]=0;); DO(AN(a),nla[*u++]=1;);
 R nlx(w);
}

F1(onm){RZ(w=stdnm(ope(w))); ASSERT(vnm(AN(w),AV(w)),EVILNAME); R w;}

F1(symbrd){A z; RZ(w); ASSERT(z=srdlg(w),EVVALUE); R z;}

B vnm(n,s)I n;C*s;{C c=*s;
 RZ(n);
 if(1==n&&(c==CALPHA||c==COMEGA||c==CGOTO))R 1;
 DO(n-1, c=ctype[s[i]]; RZ(c==CA||c==C9););
 c=ctype[s[n-1]];
 R CA==ctype[s[0]]&&(c==CA||c==C9||c==CC);
}
