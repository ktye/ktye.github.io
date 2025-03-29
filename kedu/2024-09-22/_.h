#define ix (i2)x
#define H(n) __attribute((vector_size(1<<n),aligned(1)))//CD FG PQ U W
typedef char i0,g4 H(4),g5 H(5),g6 H(6),V H(6);typedef unsigned short i1;typedef unsigned i2,i4 H(4),i5 H(5),i6 H(6);
typedef int s6 H(6);typedef float e2,e6 H(6);typedef unsigned long U,i3,j4 H(4),j6 H(6),(*Uf)(U),(*Ug)(i2,U),(*UF)(U,U);

#define U(g,z,x...) __attribute((minsize,noinline))_U(g,z,x)
#define _(z) ({z;}) //a....fg.ij.lm.o..r.t...x.z//ABCD.FG.......OPQR.TUVW.YZ
#define $(a,b) if(a){b;}else
#define b(i) ((1L<<(i))-1)
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,ii,Ux)
#define h(b,z) {i2 $=b;ih=0;W(h<$){z;++h;}}
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define x(b,z) _(typeof(b)x=b;z)
#define C(t,x) bu(convertvector)(x,t)
#define D(t,g,z,x...) static t g(x){return _(z);}
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define P(b,z) if(b){return _(z);}
#define Q(z) P(255==_(z),255)
#define W(z) while(_(z))
#define _i(n,z) ii=n;W(i--)z;
#define Ve(g,z) D(e6,g,z,e6 x)
#define VU(g,z) D(V,g,z,Ux)
#define Vf(g,z) D(V,g,z,Va)
#define VF(g,z) D(V,g,z,Va,Vb)
#define V3(g,z) D(V,g,z,Va,Vb,Vc)
#define _X(g,z) U(g,z,U*_,Ux)
#define _U(g,z,x...) D(U,g,z,x)
#define _u(g,z) _U(g,z,ii)
#define _f(g,z) _U(g,z,Ux)
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define UV(g,z) _U(g,z,Va)
#define Us(g,z) U(g,z,ss)
#define is(g,z) U(g,z,ii,ss)
#define f_(g,z) U g(Ux){return _(z);}
#define g_(g,z) U g(ii,Ux){return _(z);}
#define G_(g,z) U g(ii,Ua,Ux){return _(z);}
#define Zf(z,x...) static Uf z[]={x};
#define ZF(z,x...) static UF z[]={x};
#define Zg(z,x...) static Ug z[]={x};
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#define bu(f) __builtin_##f 
#define gx (i0)x
#define ex *(e2*)&x
#define ea x(a,ex)
#define ga x(a,gx)
#define ia x(a,ix)
#define ja x(a,jx)
#define zi z[i]
#define ee e2 e
#define cc i0 c
#define ih i2 h
#define ii i2 i
#define ij i2 j
#define ik i2 k
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
#define sd i0*d
#define ss i0*s
#define Vs *(V*)s
#define Nr x(r,Nx)
#define na x(a,nx)
#define Na x(a,Nx)
#define pa x(a,px)
#define ta x(a,tx)
#define ma x(a,mx)
#define la x(a,lx)
#define za x(a,zx)
#define Za x(a,Zx)
#define oo ws("oo\n")
#define Z0 static i0
#define Z2 static i2
#define ZU static U
#define ZV static V
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
#define QZ _(Qz(1)0)
#define n3(z) ( 7+(z)>>3)
#define n4(z) (15+(z)>>4)
#define n6(z) (63+(z)>>6)
#define p5(a,b,c,d,e)   (a+x*(b+x*(c+x*(d+x*e))))
#define p6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) 
static V z0,BA={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11},
I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
static g4 I4={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15},R4[]={{15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0},{},{12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3},{8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7}};
static e6 ze;static j6 z3,P={-1},Q={0xc6a4a7935bd1e995};static i6 z2,I2={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
_g(t,(U)i<<60|x)_u(ti,t(3,i))
_u(tb,t(1,i))_u(tg,t(2,i))_U(te,t(4,*(i2*)&e),ee)_u(ug,i)_u(ui,i)D(i2,ue,*(i2*)&e,ee)
_F(mz,a<<32|x)
