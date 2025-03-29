#include"k.h"
e2 t;Z0*D=__DATE__"(c)arthur whitney (l)MIT",B=32,d[256];_D(i2,i$,i&&48>*s?-i$(i-1,s+1):r(0,i(i,r=10*r+s[i]-48)),ii,ss)
#if linux//x86
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
Z2 O;O(_k,60)O(_w,0)O(W_,1)O(_N,4)O(_d,3)O(d_,2)O(M_,9)O(_M,11)void _start(){asm("lea 8(%rsp),%rsi;call main;mov $60,%rax;syscall");}
_U(t_,bu(ia32_ldmxcsr)(0xbfc0);ii=d_((U)"/sys/devices/system/cpu/cpu0/cpufreq/base_frequency",0);_w(i,d,2);_d(i);1e8*i$(2,d))AS(_t,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
#else
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nldr x4,[sp,24]\nmov x5,0\nsvc 0\n",Ux,...)
Z2 O=1;O(_k,1)O(_w,3)O(W_,4)O(_N,338)O(_d,6)O(d_,5)O(M_,197)O(_M,73)AS(t_,"mrs x0,cntfrq_el0\n")AS(_t,"mrs x0,cntvct_el0\n")
#endif
#define Q(z) r(z,P(!r,0))
#define ins(g,z) D(U,g,z,ii,in,ss)
U_(w_,W_(2,s,n),in,ss)_U(_n,Ua[24];_N((U)s,a)|!(1&a[O?0:3]>>(O?47:15))?ws(s):a[O?12:6],ss)U_(_m,_M(a,x),Ua,Ux)
U_(m_,P(!s,M_(1L<<32,1l<<36,3,O?0x1052:0x4032,0,0))Q(*a=_n(s));ii=d_((U)s,0);r(M_(0,*a,3,2,i,0),_d(i)),U*a,ss)
void k_();U ku(i2,U);void exit(ii){_k(i);}typedef long(*_)(U);e2 E9[]={1,10,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9};
_U(b0,z&=0x8080808080808080;Ux=0;i(8,x|=(U)((__uint128_t)0x204081020408100*z[i]>>64)%256<<8*i)x,Jz)ins(nc,nu(b(i)&b0((i0)n==Vs)))
#define sx ((i0*)ku(2,x))
#define ux ku(3,x)
#define H(g,z) _U(g,z,Uf,Ua,Ux)
_f(_r,ax?x:ku(0,x))_f(r_,ax?x:ku(1,x))_g(_i,k(12,x,ti(i)))H(k3,0)
#define T(g,z) _U(g,ss=*_;U r=_(z);*_=s;r,ii,i0**_)
#define U(g,z) _U(g,ss=*_;U r=_(z);*_=s;r,ii,i0**_,Ux)
