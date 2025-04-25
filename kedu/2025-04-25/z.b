#include"a.a"
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#if linux //void _start(){asm("lea 8(%rsp),%rsi;call main;mov $60,%rax;syscall");o(ia32_ldmxcsr)(0xbfc0);}
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
Z2 O=0x4032;O(_K,60)O(_n,4)O(W_,1)O(_w,0)O(d_,2)O(_d,3)O(M_,9)O(_M,11)O(_T,228)AS(T,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
#else
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nldr x4,[sp,24]\nmov x5,0\nsvc 0\n",Ux,...)
Z2 O=0x1052;O(_K,1)O(_n,338)O(W_,4)O(_w,3)O(d_,5)O(_d,6)O(M_,197)O(_M,73)AS(T,"mrs x0,cntvct_el0\n")
#endif
U(b0,z&=0x8080808080808080;Ux=0;i(8,x|=(U)((__uint128_t)0x204081020408100*z[i]>>64)%256<<8*i)x,j6 z)is(ib,iu(~b0((i0)i!=Vs)))ins(nc,nu(b(i)&b0((i0)n==Vs)))
U_(_k,_K(x),Ux)U_(w_,W_(2,s,n),in,ss)Ze t;static void _t(){ZU a,b,c[2];_T(0,c);Ux=1e9*(*c-11323*86400)+c[1];$(a,t=(e2)(x-b)/(T()-a))a=T(),b=x;}
#define Y(z) r(_(z),P(!r,0))
U_(m_,il=O>>14;Ub[24];Y(*_=_n((U)s,b)|!(1&b[l*3]>>(l?15:47))?ws(s):b[l?6:12]);ii=d_((U)s,0);r(M_(0,*_,3,2,i,0),_d(i)),U*_,ss)U_(_m,_M((U)s,x),Ux,ss)
#define ux k_(3,x)
#define sx ((i0*)k_(2,x))
U k(ii,U,U),K(U,U,U),k_(ii,U);f(_r,ax?x:k_(0,x))f(r_,ax?x:k_(1,x))is(ns,r(k_(1,i),*rV=Vs))is(gs,r(ns(i,s),*rV&=15))typedef unsigned long(*_)(U);Z0 B=32,d[256];e(ei,*(e2*)&i,ii)
Ui(wd,P(192>i,wl(i,d))w_(189,d);ws(".."))
#define si s[i]
is(i$,i&&48>*s?-i$(i-1,s+1):r(0,i(i,r=10*r+si-48)))U($n,*R=*(U*)&x;7+lu(x+1)>>3,Ux,U*R)is(n$,(8>i?b(8*i):-1)&*(U*)s)
Ui(L,r(0,W(i/=10)++r))ins($l,r(i,W(i--)(si=48|n%10,n/=10)))is($i,i>>31?(*s++=45,1+$i(-i,s)):$l(1+L(i),i,s))
#define xg sx[i]
#define xi xu[i]
#define xj xU[i]
#define xe ((e2*)sx)[i]
#define H(g,z) U(g,z,Uf,Ua,Ux)
#define pf x(f,px)
#define aj x(a,xj)
#define Fi F[i]
#define Ci C[i]
#define Gi G[i]
#define bi b[i]
