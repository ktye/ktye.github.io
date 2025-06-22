#define qr(b,i) P(b,er(0,i))
#define Us(g,e) U(g,e,ss)
#define is(g,e) U(g,e,ii,ss)
#define N_(x) i(N,$(i,x))
#define Pi P[8*i]
#define _A(x...) __attribute((x))
#define Ai A[i]
#define Ni N[i]
#define di d[i]
#define si s[i]
#define sd char*d
#include"a.h"
#if linux
void _start(){asm("lea 8(%rsp),%rsi;call main");o(ia32_ldmxcsr)(0xbfc0);}_A(naked)V(P9,asm("mov $56,%rax;syscall;test%rax,%rax;jz L;ret;L:pop%rdi;jmp _p"),Uz,UZ)
#define O(f,i) _A(naked)ZU f(_A(unused)Uz,...){asm("mov %rcx,%r10;mov $"#i",%rax;syscall;ret");}//D_(void*,memset,i(n6(n),Ri=z0),Un,int g,IR)
Zu M=0x4032;O(_K,60)O(_N,4)O(w_,1)O(_w,0)O(d_,2)O(_d,3)O(M_,9)O(_m,11)O(m9,28)O(_T,228)_A(naked)ZU T(){asm("rdtsc;shl $32,%rdx;or %rdx,%rax;ret");}
#else
#define O(f,i) _A(naked)ZU f(_A(unused)Uz,...){asm("mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nldr x4,[sp,24]\nmov x5,0\nsvc 0\nret");}
Zu M=0x1052;O(_K,1)O(_N,338)O(w_,4)O(_w,3)O(d_,5)O(_d,6)O(M_,197)O(_m,73)_A(naked)ZU T(){asm("mrs x0,cntvct_el0\nret");}
#endif
#define qd(x) (10u>x-48)
#define qn(x) (10u>x-48|27>x-96|34==x|41==x|93==x)//0a()[]-2
#define Q(z) r(z,P(!r,0))
Us(_n,ii=M>>14;Ub[24];_N((U)s,b)|!(1&b[i*3]>>(i?15:47))?ws(s):b[i?6:12])
U k(ii,U,U),mo();U_(wr,w_(2,s,n);0,in,ss)g_(m_,r(M_(i?0:1l<<32,z,3,i?2:M,i,0),i?_d(i):0;$(z>>18,m9(r,z,14))))U_(ms,Un=Q(_n(s));Uz=m_(d_((U)s,0),n);r(a(n,z),_m(z,n)),_ a,ss)
U(b0,z&=0x8080808080808080;Ua=0;i(8,a|=(U)((__uint128_t)0x204081020408100*zi>>64)%256<<8*i)a,J z)U(nc,nu((1L<<i)-1&b0(g==Gs)),ii,gg,ss)U(ib,iu(~b0(g!=Gs)),gg,ss)
Ze t,D[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13,1e14,1e15,1e16,1e17,1e18,1e19,1e20,1e21,1e22,1e23,1e24,1e25,1e26,1e27,1e28,1e29,1e30,1e31,1e32,1e33,1e34,1e35,1e36,1e37,1e38,1e39};
is(i$,i*(46>*s)?(unsigned)-i$(i-1,s+1):r(0,i(i,r=10*r+si-48)))
e(e$,ii=ib(101,s);n>i?z(e$(i++,s),(i=i$(n-i,s+i))>>31?z/D[-i]:z*Di):46>*s?-e$(n-1,s+1):z(i$(i=l(n,ib(46,s)),s),n-=i+=n>i;(z*D[n]+i$(n,s+i))/D[n]),in,ss)
f(l0,r(1,W(z/=10)++r))U(ni,*(U*)s=i?' fni':' nan';3,ss,ii)U($l,r(j,W(j--)(s[j]=48|i%10,i/=10)),ss,ij,ii)U($i,i>>31?i<<1?(*s++=45,1+$i(s,-i)):ni(s,1):$l(s,l0(i),i),ss,ii)
U($e,*s++="+-"[0>e];ii=l0(e=m(e,-e)+5e-5);$(5>i,s[$l(s,i,e)]=46;$(4>i,$l(s+i+1,3-i,D[3-i]*(e-(U)e))))11>i?(s[$l(s,2,e/D[i-2])]=96+5,s[3]=46+i):ni(s,e==e);5,ss,ee)
char d[256];e we(ee){return(wn($e(d,e),d),e);}
U dg();U(_t,ZU a;ZU b;ZU c[2];_T(0,c);Un=1e9*(*c-11323*86400)+c[1];$(!a,a=T();b=n;i(2e5,asm volatile("nop")))t=(e)(n-b)/1e6/(T()-a);0)
is(n$,o(bswap64)(*(U*)s))U($n,*(U*)s='city',ss,Uz)f(rx,az?z:r_(z))is(ns,R(4,i,GR=sr;GZ=s;i(n6(i),Ri=Zi)))is(gs,r(ns(i,s),*(G*)sr&=15))
