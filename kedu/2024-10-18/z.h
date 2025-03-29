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

#define _x(z) r(_(z),_r(x))
#define is(g,z) D(U,g,z,ii,ss)
#define Qx(z) Ux=z;Q(x)
extern U om(),_o(U),tn(i2,i2),k(i2,U,U);is(ic,ij=0;W(i!=s[j])++j;j)U_(w2,w_(2,s,i),ii,ss)U_(ws,w2(ic(0,s),s),ss)
_f(_r,P(ax,x)P(rx,--rx;x)if(!tx)i(nx,_r(xU[i]))_o(x))_f(r_,P(ax,x)++rx;x)U(tns,V(t,n,*rV=Vs),it,in,ss)is(ns,tns(2,i,s))Us(ks,ns(ic(0,s),s))
