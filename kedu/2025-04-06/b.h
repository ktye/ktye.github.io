#define Vn(n) __attribute((vector_size(1<<n),aligned(1)))
typedef char i0,g4 Vn(4),g6 Vn(6);typedef unsigned short i1;typedef unsigned i2,i5 Vn(5),i6 Vn(6);typedef unsigned long U,j6 Vn(6);typedef float e2,e5 Vn(5),e6 Vn(6);typedef int s6 Vn(6);
#define E1 (127<<23)
#define I2 ((i6){0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15}) //static i5 y0,I5={0,1,2,3,4,5,6,7};
static i6 z2,AB=I2%2-1,BA=I2+1-I2%2*2;static e6 ze;static j6 z3;static g6 
z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define B(o) __builtin_##o
#define D(t,g,z,x...) static t g(x){return _(z);}
#define U(g,z,x...) D(U,g,z,x)
#define V(g,z,x...) D(g6,g,z,x)
#define f(g,z) U(g,z,U x)
#define g(g,z) U(g,z,ii,Ux)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define Ui(g,z) U(g,z,ii)
#define is(g,z) U(g,z,ii,ss)
#define U_(g,z,x...) U g(x){return _(z);}
#define f_(g,z) U_(g,z,Ux)
#define F_(g,z) U_(g,z,Ua,Ux)
#define ZU static U
#define Z0 static i0
#define Z2 static i2
#define Ux U x
#define Uf U f
#define Ua U a
#define Ub U b
#define Gz g6 z
#define Ez e6 z
#define Eb e6 b
#define Sa s6 a
#define ss i0*s
#define sd i0*d
#define ee e2 e
#define cc i0 c
#define ih i2 h
#define ii i2 i
#define ij i2 j
#define ik i2 k
#define il i2 l
#define im i2 m
#define in i2 n
#define it i2 t
#define Va g6 a
#define Vb g6 b
#define Vc g6 c
#define Vx g6 x
#define Ib i6 b
#define Iz i6 z
#define Jz j6 z
#define IA i6*A
#define VR g6*R
#define VA g6*A
#define VX g6*X
