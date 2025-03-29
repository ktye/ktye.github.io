#define b(i) ((1L<<(i))-1)
#define _(z) ({z;})
#define $(b,z) if(b){z;}else
#define W(z) while(_(z))
#define R(t,n,z) r(tn(t,n),z)
#define P(b,z) if(b){return _(z);}
#define V(g,z,x...) D(g6,g,z,x)
#define r(b,z) ({typeof(b)r=b;z;r;})
#define i(b,z) {i2 $=b;i2 i=0;while(i<$){z;++i;}}
#define h(b,z) {i2 $=b;i2 h=0;while(h<$){z;++h;}}
#define j(b,z) {i2 $=b;i2 j=0;while(j<$){z;++j;}}
#define l(a,z) _(i2 $=z;(a)<$?(a):$)
#define m(a,z) _(i2 $=z;(a)>$?(a):$)
#define x(b,z) _(typeof(b)x=b;z)
#define $b(g,i,j) (2<bx?_(j):bx?_(i):_(g))
#define _a(z...) _(typeof(_(z))z9=_(z);_r(a);z9)
#define _x(z...) _(typeof(_(z))z9=_(z);_r(x);z9)
#define U_(g,z,x...) U g(x){return _(z);}
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#define n4(z) (15+(z)>>4)
#define n6(n) (63+(n)>>6)
#define zi z[i]
#define Ci C[i]
#define oo ws("oo")
#define OO(b) if(b)(ws(__func__),exit(1));
#define p6(a,b,c,d,e,f) ((e2)a+x*((e2)b+x*((e2)c+x*((e2)d+x*((e2)e+x*(e2)f)))))
#define $3(z,a,b,c)       ({i2 $=z;!$?_(a):1==$?_(b):_(c);})
#define $4(z,a,b,c,d)     ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d);})
#define $5(z,a,b,c,d,e)   ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e);})
#define $6(z,a,b,c,d,e,f) ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f);})
#define $7(z,a,b,c,d,e,f,g) ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):_(g);})
#define $9(z,a,b,c,d,e,f,g,h,i) ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):6==$?_(g):7==$?_(h):_(i);})
