/* ----------------------------------------------------------------------- */
/* J-Source Version 6.2 - COPYRIGHT 1992 Iverson Software Inc.             */
/* 33 Major Street, Toronto, Ontario, Canada, M5S 2K9, (416) 925 6096      */
/*                                                                         */
/* J-Source is provided "as is" without warranty of any kind.              */
/*                                                                         */
/* J-Source Version 6.2 license agreement:  You may use, copy, and         */
/* modify the source.  You have a non-exclusive, royalty-free right        */
/* to redistribute source and executable files.                            */
/* ----------------------------------------------------------------------- */
/*                                                                         */
/* Parsing: Tacit Verb Translator (s :20)                                  */
/* See  Hui, Iverson & McDonnell, Tacit Definition, APL91                  */

#include "j.h"
#include "p.h"


B tfail;
A tname;
A tval;

F1(ttokens){A t,*y,z;AA*x;
 RZ(t=tokens(w));
 GA(z,BOX,2*AN(t),1,0);
 x=(AA*)AV(z); y=(A*)AV(t); DO(AN(t), x++->a=*y++;);
 R z;
}

TACT(vmonad){A fs;AA y,z;
 y=stack[e]; fs=stack[b].a;
 if(y.t){z.a=one;         z.t=atop(fs,y.t);}
 else   {z.a=df1(y.a,fs); z.t=0;           }
 R z;
}

TACT(vdyad){A fs;AA x,y,z;
 x=stack[b]; y=stack[e]; fs=stack[e-1].a; z.a=one;
 switch(2*!x.t+!y.t){
  case 0: z.t=folk(x.t,fs,y.t);      break;
  case 1: z.t=atop(amp(fs,y.a),x.t); break;
  case 2: z.t=atop(amp(x.a,fs),y.t); break;
  case 3: z.t=0; z.a=df2(x.a,y.a,fs);
 }
 R z;
}

TACT(vadv){AA z;
 if(stack[b].t)tfail=1;
 else{z.t=0; z.a=df1(stack[b].a,stack[e].a);}
 R z;
}

TACT(vconj){AA z;
 if(stack[b].t||stack[e].t)tfail=1;
 else{z.t=0; z.a=df2(stack[b].a,stack[e].a,stack[e-1].a);}
 R z;
}

TACT(vforkv){AA z; z.a=folk(stack[b].a,stack[1+b].a,stack[e].a); z.t=0; R z;}

TACT(vhookv){AA z; z.a=hook(stack[b].a,stack[e].a); z.t=0; R z;}

TACT(vformo){AA z;A f=stack[b].a,g=stack[1+b].a,h=stack[2+b].a;
 z.a=b==e-1?hooko(f,g):forko(f,g,h);
 z.t=0;
 R z;
}

TACT(vcurry){AA z;
 tfail=stack[b].t||stack[e].t;
 z.a=advform(stack[b].a,stack[e].a);
 z.t=0;
 R z;
}

TACT(vpunc){R stack[e-1];}

TACT(vis){A n=stack[b].a,v=stack[e].a;C p=local&&*AV(stack[1+b].a);
 tfail=!(NAME&AT(n));
 symbis(n,v,p?local:global);
 tname=link(n,tname); tval=link(stack[e].t,tval);
 R stack[e];
}

static TACT(vmove){A j;AA x,z;
 x=stack[MAX(0,e)];
 if(NAME&AT(x.a)&&!(ASGN&AT(stack[b].a))){
  j=indexof(tname,box(x.a));
  z.a=swap(x.a);
  z.t=all1(lt(j,tally(tname)))?ope(from(j,tval)):0;
  R z;
 }
 R x;
}

A tparse(p,w)B p;A w;{A*s,x,t;AA*stack;C d;I b,*c,e,i,j,k,m,n;
 RZ(w);
 stack=(AA*)AV(w); n=m=AN(w)/2-4; tfail=0;
 do{
  for(i=0;i<ncases;i++){
   c=cases[i].c; s=(A*)(n+stack); d=1;
   d=d&&*c++&AT(*s); s+=2;
   d=d&&*c++&AT(*s); s+=2;
   d=d&&*c++&AT(*s); s+=2;
   d=d&&*c++&AT(*s);
   if(d)break;
  }
  if(i<ncases){
   b=cases[i].b; j=n+b;
   e=cases[i].e; k=n+e;
   stack[k]=(p?cases[i].vf:cases[i].cf)(j,k,stack);
   RZ(stack[k].a);
   if(tfail)R mark;
   DO(b,stack[--k]=stack[--j];); n=k;
  } else {stack[n-1]=vmove(n,m-1,stack); n-=0<m--;}
 } while(0<=m);
 ASSERT(MARK&AT(stack[2+n].a),EVSYNTAX);
 x=stack[1+n].a;
 t=stack[1+n].t;
 ASSERT(AT(x)&NOUN+(p?0:VERB),EVSYNTAX);
 R t?t:p?qq(x,ainf):advform(ds(CDEX),x);
}

F1(vtrans){PROLOG;A loc=local,z;
 RZ(w);
 ASSERT(CHAR&AT(w),EVDOMAIN);
 ASSERT(1>=AR(w),EVRANK);
 RZ(tname=link(ds(CALPHA),ds(COMEGA)));
 RZ(tval =link(ds(CLEFT ),ds(CRIGHT)));
 GA(local,SYMB,twprimes[0],1,0);
 symbis(scnm(CALPHA),one,local);
 symbis(scnm(COMEGA),one,local);
 z=tparse(1,ttokens(w));
 if(z&&MARK&AT(z))z=all1(eps(box(cstr("x.")),words(w)))?colon(mtv,w):colon(w,mtv);
 local=loc;
 EPILOG(z);
}
