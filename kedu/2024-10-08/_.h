#define Z_(g,z,x...) void g(x){z;}
#define _Z(g,z,x...) static Z_(g,z,x)
#define U(g,z,x...) __attribute((minsize,noinline))_U(g,z,x)
#define V(g,z,x...) _D(V,g,z,x)
#define H(n) __attribute((vector_size(1<<n),aligned(1)))//CD FG PQ U W
typedef char i0,g4 H(4),g5 H(5),g6 H(6),V H(6);typedef unsigned short i1;typedef unsigned i2,i4 H(4),i5 H(5),i6 H(6);
typedef int s6 H(6);typedef float e2,e6 H(6);typedef unsigned long U,i3,j4 H(4),j6 H(6),(*Uf)(i3),(*Ug)(i2,i3),(*UF)(i3,i3);
static V z0,BA={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11},
I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
static g4 I4={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15},R4[]={{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0},{},{12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3},{8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7}};
static i6 z2,I2={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};static e6 ze;static j6 z3,P={-1},Q={0xc6a4a7935bd1e995};

#define _(z) ({z;}) //a....fg.ij.lm.o..r.t...x.z//ABCD.FG.......OPQR.TUVW.YZ
#define $(b,z) if(b){z;}else
#define b(i) ((1L<<(i))-1)
#define f(g,z) D(U,g,z,Ux)
#define g(g,z) D(U,g,z,ii,Ux)
#define h(b,z) {i2 $=b;ih=0;W(h<$){z;++h;}}
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define r(b,z) _(typeof(b)r=b;z;r)
#define x(b,z) _(typeof(b)x=b;z)
#define _i(n,z) {ii=n;W(i--)z;}
#define C(t,z) bu(convertvector)(z,t)
#define D(t,g,z,x...) __attribute((minsize,noinline))_D(t,g,z,x)
#define F(g,z) D(U,g,z,Ua,Ux)
#define G(g,z) D(U,g,z,ii,Ua,Ux)
#define P(b,z) if(b){return _(z);}
#define Q(z) P(255==_(z),255)
#define W(z) while(_(z))
#define f_(g,z) U_(g,z,Ux)
#define g_(g,z) U_(g,z,ii,Ux)
#define F_(g,z) U_(g,z,Ua,Ux)
#define G_(g,z) U_(g,z,ii,Ua,Ux)
#define _D(t,g,z,x...) static t g(x){return _(z);}
#define _U(g,z,x...) _D(i3,g,z,x)
#define U_(g,z,x...) i3 g(x){return _(z);}
#define Ve(g,z) _D(e6,g,z,e6 x)
#define VU(g,z) _D(V,g,z,Ux)
#define Vf(g,z) _D(V,g,z,Va)
#define VF(g,z) _D(V,g,z,Va,Vb)
#define V3(g,z) _D(V,g,z,Va,Vb,Vc)
#define _u(g,z) _U(g,z,ii)
#define _f(g,z) _U(g,z,Ux)
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define Us(g,z) D(U,g,z,ss)
#define UV(g,z) _U(g,z,Va)
#define Zf(z,x...) static Uf z[]={x};
#define ZF(z,x...) static UF z[]={x};
#define Zg(z,x...) static Ug z[]={x};
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#define bu(f) __builtin_##f 
#define gx (i0)x
#define ex (4>tx?ix:*(e2*)&x)
#define zi z[i]
#define ee e2 e
#define cc i0 c
#define hh i1 h
#define ih i2 h
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
#define Va V a
#define Vb V b
#define Vc V c
#define VX V*X
#define VA V*A
#define VR V*R
#define uu i2*u
#define sd i0*d
#define ss i0*s
#define Vs *(V*)s
#define oo ws("oo\n")
#define Z0 static i0
#define Z2 static i2
#define ZU static i3
#define ZV static g6
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
#define A4 ((g4*)&a)[i]
#define B4 ((g4*)&b)[i]
#define C4 ((g4*)&c)[i]
#define A5 ((g5*)&a)[i]
#define B5 ((g5*)&b)[i]
#define C5 ((g5*)&c)[i]
#define p5(a,b,c,d,e)   (a+x*(b+x*(c+x*(d+x*e))))
#define p6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) 
#define aa x(a,ax)
#define pa x(a,px)
#define ta x(a,tx)
#define ma x(a,mx)
#define sa x(a,sx)
#define au x(a,xu)
#define na x(a,nx)
#define nr x(r,nx)
#define sr x(r,sx)
#define ru x(r,xu)
#define rU x(r,xU)
#define rV x(r,xV)
#define Nr x(r,Nx)
#define n3(z) ( 7+(z)>>3)
#define n4(z) (15+(z)>>4)
#define n5(z) (31+(z)>>5)
#define n6(z) (63+(z)>>6)
_f(bn,bu(popcountl)(x))_f(bs,x?bu(ctzl)(x):64)_f(br,x?64-bu(clzl)(x):0)_f(l8,n3(br(x)))_u(qa,26>i-97)_u(q0,10>i-48)
