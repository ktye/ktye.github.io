#define s(g,e) u(g,e,ss)
#define f(g,e) u(g,e,ux)
#define F(g,e) u(g,e,ua,ux)
#define g(g,e) u(g,e,_u f,ux)
#define G(g,e) u(g,e,_u f,ua,ux)
#define Zu static u //ubcieE [paieEtnNs][ax] [rax][ucieE] w[ucieE] //clang -Os -oa a.c -lm
#define Ze static float
#define Zi static _u
#define ZE static E //#define l(a,e) _(typeof(e)e_=e;(a)<e_?(a):e_)//#define m(a,e) _(typeof(e)e_=e;(a)>e_?(a):e_)
#include<complex.h> //E cexpf(E);
typedef unsigned _u;typedef unsigned long(*_)(),u;typedef float e;typedef complex float E;
Zi N=1<<31,O,W,lt[]={3,0,0,2,2,3,3},i9[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9};Zu w(),Q=96;
#define __(e) {return _(e);}
#define _(e) ({e;})
#define N(e) i(nx,e)
#define P(b,e) if(b)return _(e);
#define Q(e) P(Q==(e),Q)
#define R(t,n,z) r(T(t,n),z)
#define W(z) while(z)
#define i(n,e) {_u $n=n;ii=0;for(;i<$n;++i){e;}}
#define r(a,e) _(typeof(a)r=a;e;r)
#define t(t,z) ((u)(t)<<51|(z))
#define x(a,e) _(typeof(a)x=a;e)
#define y(a,e) _(typeof(a)y=a;e)
#define u(g,e,x...) Zu g(x)__(e)
#define ii _u i
#define ij _u j
#define in _u n
#define it _u t
#define ss char*s
#define ur u r
#define ua u a
#define ux u x
#define px (32>x)
#define ax y(x>>51,5>y?y:5)
#define sx ((char*)x)
#define xr ((_u*)x)[-2]
#define tx sx[-5]
#define nx ((_u*)x)[-1]
#define xc sx[i]
#define xu ((u*)x)[i]
#define ru ((u*)r)[i]
#define bu(o) __builtin_##o
#define n3(z) ((7+(z))>>3)
#define pax ((x-Q+1)>>50)
u(sl,ii=0;W(s[i])++i;i,ss)u(is,i(n,P(j==s[i],i))n,ij,in,ss)u(dn,i(n3(n),ru=xu)r,ur,in,ux)u(tE,ux=*(u*)&E;x>>32?x:1l<<63|x,E E)f(s_,r(0,N(r+=xc)))g(err,if(f)w(f);w(58);w(x);w(10);Q)
Zi i$(in,ss)__(r(0,i(n,r=10*r+s[i]%16)))Ze e$(in,ss)__(ii=is(46,n,s);n-=i;ij=n?i$(--n,s+i+1):0;(i$(i,s)*i9[n]+j)/(e)i9[n])ZE E$(in,ss)__(ii=is(58,n,s);e$(i,s)+I*e$(n-i-1,s+i+1))
#if __arm64
Ze et=2.4e4;static void ftz(){O=1;asm("msr fpcr,%0"::"r"(1l<<24));}u(ut,ur;asm volatile("mrs %0,cntvct_el0":"=r"(r));r)
#else
Ze et=2.4e6;static void ftz(){bu(ia32_ldmxcsr)(0x9fc0);}__attribute((naked))Zu ut(){asm("rdtsc;shl $32,%rdx;or%rdx,%rax;ret");}
#endif
