#include"_.a"
#define T(t,x...) typedef t x;
#define V(t,n) t##n __attribute((vector_size(1<<n),aligned(1)))
T(char,i0,V(g,4),V(g,5),V(g,6))T(unsigned short,i1)T(unsigned,i2,V(i,6),V(i,5),V(i,8))T(unsigned long,U,(*_)(i2,U),V(j,6))T(float,e2,V(e,6),V(e,5),V(e,7),V(e,8))T(int,V(s,6))
#undef T
#undef V
#define D(t,g,z,x...) static t g(x){return _(z);}
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define L(a,b) _(typeof(b)$=b;(a)<$?(a):$)
#define M(a,b) _(typeof(b)$=b;(a)>$?(a):$)
#define P(b,z) if(b){return _(z);}
#define Q(b) if(b)(ws(__func__),_k(1));
#define U(g,z,x...) D(U,g,z,x)
#define V(g,z,x...) static void g(x){z;}
#define W(z) while(_(z))
#define _(z) ({z;})
#define b(z) ((1l<<(z))-1)
#define f(g,z) U(g,z,Ux)
#define g(g,z)  U(g,z,ii,U x)
#define h(b,z) {i2 $=b;i2 h=0;while(h<$){z;++h;}}
#define i(b,z) {i2 $=b;i2 i=0;while(i<$){z;++i;}}
#define j(b,z) {i2 $=b;i2 j=0;while(j<$){z;++j;}}
#define o(o) __builtin_##o
#define r(b,z) _(typeof(b)r=_(b);z;r)
#define t(t,z) ((U)(t)<<60|(z))
#define x(b,z) _(typeof(b)x=_(b);z)
#define $(b,z) if(b){z;}else
#define W_(z) while(!_(z))
#define g_(g,z) U_(g,z,ii,Ux)
#define F_(g,z) U_(g,z,Ua,Ux)
#define G_(g,z) U_(g,z,ii,Ua,Ux)
#define U_(g,z,x...)  U g(x){return _(z);}
#define Ui(g,z) U(g,z,ii)
#define is(g,z) U(g,z,ii,ss)
#define i2(g,z,x...) D(i2,g,z,x)
#define e2(g,z,x...) D(e2,g,z,x)
#define _a(z...) _(typeof(_(z))z9=_(z);_r(a);z9)
#define _x(z...) _(typeof(_(z))z9=_(z);_r(x);z9)
#define $3(z,a,b,c)           _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)         _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e)       _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define $6(z,a,b,c,d,e,f)     _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f))
#define $7(z,a,b,c,d,e,f,g)   _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):_(g))
#define $8(z,a,b,c,d,e,f,g,h) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):6==$?_(g):_(h))
#define $9(z,a,b,c,d,e,f,g,h,i) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):6==$?_(g):7==$?_(h):_(i))
U k_(ii,U),k(ii,U,U),w2(ii,ss),ws(ss),wi(ii);f(n2,3+x>>2)f(n3,7+x>>3)f(n4,15+x>>4)f(n6,63+x>>6)f(n9,511+x>>9)
f(nu,o(popcountl)(x))f(iu,x?o(ctzl)(x):64)f(lu,x?64-o(clzl)(x):0)Ui(wc,w2(1,&i);0)Ui(ti,t(4,i))U(te,t(5,*(i2*)&e),ee)
