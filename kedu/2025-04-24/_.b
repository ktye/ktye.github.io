#include"_.a"
#define _(z) ({z;})
#define D(t,g,z,x...) static t g(x){return _(z);}
#define P(b,z) if(b){return _(z);}
#define W(z) while(_(z))
#define i(b,z) {i2 $=b;i2 i=0;W(i<$){z;++i;}}
#define f(g,z) U(g,z,U x)
#define U(g,z,x...) D(U,g,z,x)
#define Ui(g,z) U(g,z,ii)
#define Us(g,z) U(g,z,ss)
#define is(g,z) U(g,z,ii,ss)
#define o(o) __builtin_##o
#define t(t,z) ((U)(t)<<60|(z))
U w_(i2,ss);Ui(wc,w_(1,&i);0)is(wl,w_(i,s);wc(10))is(ic,sd=s;W(i!=*s)++s;s-d)Us(ws,wl(ic(0,s),s))Ui(wi,g0 d[12];d[11]=10;g0*s=d+11;in=i>>31?-i:i;do*--s=48+n%10;W(n/=10);if(i>>31)*--s=45;w_(d+12-s,s);i)
f(nu,o(popcountl)(x))f(iu,x?o(ctzl)(x):64)f(lu,--x?64-o(clzl)(x):0)Ui(tb,t(1,i))Ui(ti,t(2,i))U(te,t(5,*(i2*)&e),ee)f(iz,3>tx?x:(int)ex)f(wu,g0 d[17];d[16]=10;i(16,in=15&x>>60-4*i;d[i]="0W"[9<n]+n)w_(17,d);x)
#define _a(z...) _(typeof(_(z))z9=_(z);_r(a);z9)
#define _x(z...) _(typeof(_(z))z9=_(z);_r(x);z9)
#define b(z) ((1L<<(z))-1)
#define g(g,z) U(g,z,ii,U x)
#define h(b,z) {i2 $=b;i2 h=0;while(h<$){z;++h;}}
#define j(b,z) {i2 $=b;i2 j=0;while(j<$){z;++j;}}
#define r(b,z) _(typeof(b)r=b;z;r)
#define x(b,z) _(typeof(b)x=b;z)
#define l(a,z) _(i2 $=z;(a)<$?(a):$)
#define m(a,z) _(i2 $=z;(a)>$?(a):$)
#define $(b,z) if(b){z;}else
#define $3(z,a,b,c)           _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)         _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e)       _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define U_(g,z,x...) U g(x){return _(z);}
#define OO(b) if(b)(ws(__func__),_k(1));
#define oo ws("oo")
