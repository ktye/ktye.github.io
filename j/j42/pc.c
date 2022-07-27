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
/* Parsing: Tacit Conjunction Translator (s : 12)                          */

#include "j.h"
#include "p.h"


TACT(cmonad){AA z; z.a=df1(stack[e].a,stack[b].a); z.t=0; R z;}

TACT(cdyad){AA z; z.a=df2(stack[b].a,stack[e].a,stack[e-1].a); z.t=0; R z;}

TACT(cadv){A fs;AA x,z;
 x=stack[b]; fs=stack[e].a;
 z.a=df1(x.a,fs);
 z.t=x.t?hooko(x.t,fs):0;
 R z;
}

TACT(cconj){A fs;AA x,y,z;
 x=stack[b]; y=stack[e]; fs=stack[e-1].a;
 z.a=df2(x.a,y.a,fs);
 switch(2*!x.t+!y.t){
  case 0: z.t=forko(x.t,fs,y.t);          break;
  case 1: z.t=hooko(x.t,advform(fs,y.a)); break;
  case 2: z.t=hooko(y.t,advform(x.a,fs)); break;
  case 3: z.t=0;
 }
 R z;
}

static F1(gt1){R hooko(  w,ds(CBSLASH));}

static F2(gt2){R forko(a,w,ds(CBSLASH));}

static A consa(w)AA w;{R w.t?w.t:advform(ds(CDEX),w.a);}

TACT(cforkv){AA p,q,r,z;
 p=stack[b]; q=stack[1+b]; r=stack[e];
 z.a=folk(p.a,q.a,r.a);
 switch(4*!p.t+2*!q.t+!r.t){
  case 3:  z.t=gt2(p.t,advform(ds(CGRAVE),tie(q.a,r.a))); break;
  case 6:  z.t=gt2(r.t,advform(tie(p.a,q.a),ds(CGRAVE))); break;
  case 7:  z.t=0; break;
  default: z.t=gt1(forko(forko(consa(p),ds(CGRAVE),consa(q)),ds(CGRAVE),consa(r)));
 }
 R z;
}

TACT(chookv){AA x,y,z;
 x=stack[b]; y=stack[e];
 z.a=hook(x.a,y.a);
 switch(2*!x.t+!y.t){
  case 0: z.t=gt1(forko(x.t,ds(CGRAVE),y.t));   break;
  case 1: z.t=gt2(x.t,advform(ds(CGRAVE),y.a)); break;
  case 2: z.t=gt2(y.t,advform(x.a,ds(CGRAVE))); break;
  case 3: z.t=0;
 }
 R z;
}

TACT(cformo){AA p,q,r,z;
 p=stack[b]; q=stack[1+b]; r=stack[e];
 tfail=p.t||q.t||r.t;
 z.a=b==e-1?hooko(p,q):forko(p,q,r);
 z.t=0;
 R z;
}

TACT(ccurry){AA x,y,z;
 x=stack[b]; y=stack[e];
 tfail=x.t||y.t;
 z.a=advform(x.a,y.a);
 z.t=0;
 R z;
}

F1(ctrans){PROLOG;A loc=local,z;
 RZ(w);
 ASSERT(CHAR&AT(w),EVDOMAIN);
 ASSERT(1>=AR(w),EVRANK);
 GA(local,SYMB,twprimes[0],1,0);
 symbis(scnm(CALPHA),ds(CPLUS),local);
 symbis(scnm(COMEGA),ds(CPLUS),local);
 RZ(tname=link(ds(CALPHA),ds(COMEGA)));
 RZ(tval =link(ds(CLEV  ),ds(CDEX  )));
 z=tparse(zero,ttokens(w));
 if(z&&MARK&AT(z))z=colon(w,sc(2L));
 local=loc;
 EPILOG(z);
}
