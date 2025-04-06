#include"b.h"
#define _(z) ({z;})
#define $(b,z) if(b){z;}else
#define W(z) while(_(z))
#define P(b,z) if(b){return _(z);}
#define b(z) ((1L<<(z))-1)
#define r(b,z) _(typeof(b)r=b;z;r)
#define x(b,z) _(typeof(b)x=b;z)
#define h(b,z) {i2 $=b;i2 h=0;while(h<$){z;++h;}}
#define i(b,z) {i2 $=b;i2 i=0;while(i<$){z;++i;}}
#define j(b,z) {i2 $=b;i2 j=0;while(j<$){z;++j;}}
#define l(a,z) _(i2 $=z;(a)<$?(a):$)
#define m(a,z) _(i2 $=z;(a)>$?(a):$)
#define _a(z...) _(typeof(_(z))z9=_(z);_r(a);z9)
#define _x(z...) _(typeof(_(z))z9=_(z);_r(x);z9)
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#define $3(z,a,b,c)       _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)     _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define $6(z,a,b,c,d,e,f) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f))
#define $7(z,a,b,c,d,e,f,g) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):_(g))

f(nu,B(popcountl)(x))f(iu,x?B(ctzl)(x):64)f(lu,--x?64-B(clzl)(x):0)
#define OO(b) if(b)(ws(__func__),_k(1));
#define oo ws("oo")
#define zi z[i]
#define Ci C[i]
