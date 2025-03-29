#define H(n) __attribute((vector_size(1<<n),aligned(1))) //f(char,short,long)f(int,float)i(0,2)
typedef char i0,g4 H(4),g5 H(5),g6 H(6),g7 H(7);typedef unsigned short i1,h6 H(6);typedef unsigned i2,i5 H(5),i6 H(6);typedef unsigned long U,i3,j4 H(4),j6 H(6),(*Uf)(U),(*Ug)(i2,U),(*UF)(U,U);
static g6 z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
static i6 z2,I2={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};static j6 z3;typedef int s6 H(6);typedef float e2,e6 H(6);
#define _(z) ({z;}) //a....fg.ij.lm....r.t...x.. //..C..FG........PQR.TUVW...(DHNX)  type sig rax[*]rax
#define C(t,x) __builtin_convertvector(x,t)
#define D(t,g,z,x...) static t g(x){return _(z);}
#define P(b,z) if(b){return _(z);}
#define Q(z) P(255==_(z),255)
#define U(g,z,x...) __attribute((minsize,noinline))_U(g,z,x) //#define U(g,z,x...) __attribute((minsize))_U(g,z,x)
#define V(g,z,x...) D(g6,g,z,x)
#define W(z) while(_(z))
#define I(a,b) if(a){b;}else
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,ii,Ux)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define r(b,z) _(typeof(b)r=b;typeof(b)$=r;z;$)
#define x(b,z) _(typeof(b)x=b;z)
#define _i(n,z) ii=n;W(i--)z;
#define _U(g,z,x...) D(U,g,z,x)
#define f_(g,z) U g(Ux){return _(z);}
#define g_(g,z) U g(ii,Ux){return _(z);}
#define G_(g,z) U g(ii,Ua,Ux){return _(z);}
#define as x(a,xs)
#define au x(a,xu)
#define aU x(a,xU)
#define aV x(a,xV)
#define xs ((i0*)x)
#define xu ((i2*)x)
#define xU ((i3*)x)
#define xV ((g6*)x)
#define px (256>x)
#define tx (x>>61)
#define gx (i0)ix
#define ix (i2)x
#define jx (-1UL>>3&x)
#define ex eu(x)
#define mx xu[-3]
#define Tx xs[-5]
#define zx l[Tx]
#define Nx tn(Tx,nx)
#define Bx (1==Tx)
#define Us(g,z)  U(g,z,ss)
#define Uis(g,z)  U(g,z,ii,ss)
#define _u(g,z) _U(g,z,ii)
#define _f(g,z) _U(g,z,Ux)
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define cc i0 c
#define ii i2 i
#define ij i2 j
#define ik i2 k
#define il i2 l
#define im i2 m
#define in i2 n
#define it i2 t
#define Ur i3 r
#define Ua i3 a
#define Ub i3 b
#define Ux i3 x
#define Va g6 a
#define Vb g6 b
#define Vc g6 c
#define sd i0*d
#define ss i0*s
#define Vd *(g6*)d
#define Vs *(g6*)s
#define Vi(g,z) D(i6,g,z,i6 x)
#define Ve(g,z) D(e6,g,z,e6 x)
#define Vf(g,z) V(g,z,Va)
#define VF(g,z) V(g,z,Va,Vb)
#define VG(g,z) V(g,z,ii,Va,Vb)

#define Zf(z,x...) static Uf z[]={x};
#define Zg(z,x...) static Ug z[]={x};
#define ZF(z,x...) static UF z[]={x};
#define I4(n,z) i(15+(n)>>4,z)
#define I6(n,z) i(63+(n)>>6,z)
#define nr ru[-1]
#define na au[-1]
#define nx xu[-1]
#define a2 x(a,x2)
#define ae (e6)ai
#define ag x(a,gx-z0)
#define ai x(a,ix-z2)
#define aj x(a,jx-z3)
#define xE ((e6*)x)[i]
#define xG ((g6*)x)[i]
#define xI ((i6*)x)[i]
#define xJ ((j6*)x)[i]
#define ea x(a,ex)
#define ia x(a,ix)
#define ja x(a,jx)
#define aE x(a,xE)
#define aG x(a,xG)
#define aI x(a,xI)
#define aJ x(a,xJ)
#define xx xU[0]
#define xy xU[1]
#define xz xU[2]
#define x0 ((i0*)x)[i]
#define x1 ((i1*)x)[i]
#define x2 ((i2*)x)[i]
#define x3 ((i3*)x)[i]
#define x4 ((g4*)x)[i]
#define x5 ((g5*)x)[i]
#define x6 ((g6*)x)[i]
#define r0 ((i0*)r)[i]
#define r1 ((i1*)r)[i]
#define r2 ((i2*)r)[i]
#define r3 ((i3*)r)[i]
#define r4 ((g4*)r)[i]
#define r5 ((g5*)r)[i]
#define r6 ((g6*)r)[i]
#define a6 ((g6*)a)[i]
#define tr x(r,tx)
#define Tr x(r,Tx)
#define Nr x(r,Nx)
#define rs x(r,xs)
#define ru x(r,xu)
#define rU x(r,xU)
#define rV x(r,xV)
#define pa x(a,px)
#define ta x(a,tx)
#define Ta x(a,Tx)
#define Na x(a,Nx)
#define ma x(a,mx)
#define Ba x(a,Bx)
#define mxx (nx?a(xx,ma):0)
#define nxx (nx?a(xx,na):0)
#define txx (nx?a(xx,ta):0)
#define Txx (nx?a(xx,ta|pa?0:Ta):0)

#define Qs(b,s) P(b,err((U)__func__,(U)s))
#define Qr(b) Qs(b,"rank")
#define Qt(b) Qs(b,"type")
#define Qn(b) Qs(b,"length")
#define Qd(b) Qs(b,"domain")
#define Qz(b) Qs(b,"nyi")
#define $3(z,a,b,c)       _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)     _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e)   _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define $6(z,a,b,c,d,e,f) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f))
#define $7(z,a,b,c,d,e,f,g) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):_(g))
#define oo ws("oo")
#define f5(a,b,c,d,e)   (a+x*(b+x*(c+x*(d+x*e))))
#define f6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) 
#define Z0 static i0
#define Z2 static i2
#define ZU static U
#define AS(f,s,x...) __attribute((naked))ZU f(x){asm(s);}
