#define Zx (tx|!nx?0:_(Ua=*xU;!ta&&x(*aU,2==tx)))
#define Za x(a,Zx)
#define Q(z) r(z,P(!r,0))
#define Qs(b) P(b,ws(s))
#include"k.h"
#if __x86_64
AS(ut,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
#else
AS(ut,"mrs x0,cntvct_el0\nmov x1,100\nmul x0,x0,x1\n")
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nmov x4,0\nmov x5,x4\nsvc 0\n",Ux,...)
#endif
#if linux
O(_w,0)O(w_,1)O(_d,3)O(d_,2)O(_n,5)_u(nd,Ua[24];!_n(i,a)&1&a[3]>>15?a[6]:0)
#else
O(_w,3)O(w_,4)O(_d,6)O(d_,5)O(_n,189)_u(nd,Ua[24];!_n(i,a)&1&*a>>47?a[12]:0)
#endif
#define Us(g,z) U(g,z,ss)
#define is(g,z) D(U,g,z,ii,ss)
#define ins(g,z) D(U,g,z,ii,in,ss)

extern U k(ii,U,U),k_(U),_k(U);g(K,k(i,x,0))_f(_r,P(ax,x)P(63&rx,--rx;x)if(!tx)i(nx,_r(xU[i]))_k(x))is(ns,r(K(2,i),*rV=Vs))UV(ib,iu(~bg(a)))is(ic,ib((i0)i!=Vs))
U_(w2,w_(2,s,i),ii,ss)_u(wc,w2(1,&i))Us(ws,w2(ic(0,s),s);wc(10);0)f(wb,j(64,wc(48|1&x>>j))wc(10);x)f(wu,i(16,ij=15&x>>60-4*i;wc("0W"[9<j]+j))wc(10);x)
is(i$,48>*s?-i$(i-1,s+1):r(0,i(i,r=10*r+s[i]-48)))is(e$,e2 strtof();ee=strtof(s,0);*(i2*)&e)is($e,int sprintf(i0*,const i0*,...);sprintf(s,"%g",*(e2*)&i))
ZU*A,G[32],w0(U),wx(U),E(U),es(ii,ss),ys(ii,ss),ps(ii,ss),w(ii,ss);
Z0*D="+-*%&|<>=~.!@?#_^,",*L=__DATE__" (c)arthur whitney (l)MIT",B=32,b[256];_u(wl,b[i++]=10;w2(i,b);0)
#define _x(z) r(_(z),_r(x))
