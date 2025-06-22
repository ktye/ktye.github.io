#define qn(x) (10>x-48|27>x-96|41==x|93==x)
#include"_.a"
#include"a.a"
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#if linux
void _start(){asm("lea 8(%rsp),%rsi;call main;mov $60,%rax;syscall");o(ia32_ldmxcsr)(0xbfc0);}
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
Z2 O=0x4032;O(_K,60)O(_N,4)O(W_,1)O(_w,0)O(o_,2)O(_o,3)O(M_,9)O(_M,11)O(ma,28)O(_T,228)AS(T,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
#else
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nldr x4,[sp,24]\nmov x5,0\nsvc 0\n",Ux,...)
Z2 O=0x1052;O(_K,1)O(_N,338)O(W_,4)O(_w,3)O(o_,5)O(_o,6)O(M_,197)O(_M,73)AS(T,"mrs x0,cntvct_el0\n")
#endif
#define si s[i]
#define Y(z) r(z,P(!r,0))
Z0 d[256];Z0 const B=32;Ui(wd,P(192>i,wl(i,d))w_(189,d);ws(".."))f(wu,cc[17];c[16]=10;i(16,in=15&x>>60-4*i;c[i]="0W"[9<n]+n)w_(17,c);x)
U(b0,x&=0x8080808080808080;Ua=0;i(8,a|=(U)((__uint128_t)0x204081020408100*x[i]>>64)%256<<8*i)a,Jx)is(ib,iu(~b0((i0)i!=Vs)))ins(nc,nu(b(i)&b0((i0)n==Vs)))
Ze t,E[40]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13,1e14,1e15,1e16,1e17,1e18,1e19,1e20,1e21,1e22,1e23,1e24,1e25,1e26,1e27,1e28,1e29,1e30,1e31,1e32,1e33,1e34,1e35,1e36,1e37,1e38,1e39};
static void _t(){ZU a,b,c[2];_T(0,c);Ux=1e9*(*c-11323*86400)+c[1];$(!a,a=T();b=x)t=(e2)(x-b)/(T()-a);}
U_(_k,_K(x),Ux)U_(w_,W_(2,s,n),in,ss)U_(_m,_M(x,a),Ua,Ux)U($n,*R=*(U*)&x;7+lu(x+1)>>3,Ux,U*R)is(n$,(8>i?b(8*i):-1)&*(U*)s)D(e2,ei,*(e2*)&i,ii)is(i$,46>*s?-i$(i-1,s+1):r(0,i(i,r=10*r+si-48)))
Us(_n,ii=O>>14;Ub[24];_N((U)s,b)|!(1&b[i*3]>>(i?15:47))?ws(s):b[i?6:12])U_(m_,Ux=a?Y(*a=_n(s)):1l<<36;ii=a?o_((U)s,0):0;r(M_(a?0:1l<<32,x,3,a?2:O,i,0),if(x>>21)ma(r,x,14);i?_o(i):0),U*a,ss)
is(ni,*(i2*)s=!i?' nan':' fni';3)ins($l,r(i,W(i--)(s[i]=48|n%10,n/=10)))f(L0,r(0,W(x/=10)++r))is($i,i>>31?i<<1?(*s++=45,1+$i(-i,s)):ni(1,s):$l(1+L0(i),i,s))
#define ux k_(2,x)
#define sx ((i0*)k_(3,x))
U k(ii,U,U),K(U,U,U),k_(ii,U),wx(U);f(_r,ax?x:k_(0,x))f(r_,ax?x:k_(1,x))is(ns,r(k_(1,i),*rV=Vs))is(gs,r(ns(i,s),*rV&=15))typedef unsigned long(*_)(U);Ui(v,33>i-B)
#define Gi G[i]
#define xg sx[i]
#define xi xu[i]
#define xj xU[i]
#define xe ((e2*)sx)[i]
#define pf x(f,px)
#define aj x(a,xj)
#define Fi F[i]
#define Ci C[i]
#define bi b[i]
#define H(g,z) U(g,z,Uf,Ua,Ux)
