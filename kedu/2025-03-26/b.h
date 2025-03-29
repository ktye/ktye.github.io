#define Vn(n) __attribute((vector_size(1<<n),aligned(1)))
typedef unsigned long U,j6 Vn(6);typedef char i0,g4 Vn(4),g6 Vn(6);typedef unsigned short i1;typedef unsigned i2,i5 Vn(5),i6 Vn(6);typedef float e2,e6 Vn(6);typedef int s6 Vn(6);
#define B(o) __builtin_##o
#define ZU static U
#define Z0 static i0
#define Z2 static i2
#define ZI static i6
#define ZE static e6
#define ZJ static j6
#define ZZ static g6
static i5 y0,I5={0,1,2,3,4,5,6,7};ZI z2;ZJ z3;ZE ze;ZZ 
z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define f(g,z) D(U,g,z,Ux)
#define g(g,z) D(U,g,z,ii,Ux)
#define F(g,z) D(U,g,z,Ua,Ux)
#define G(g,z) D(U,g,z,ii,Ua,Ux)
#define D(t,g,z,x...) static t g(x){return({z;});}
#define U(g,z,x...) D(U,g,z,x)
#define Ui(g,z) U(g,z,ii)
#define is(g,z) U(g,z,ii,ss)
#define Ux U x
f(nu,B(popcountl)(x))f(iu,x?B(ctzl)(x):64)f(lu,--x?64-B(clzl)(x):0)
#define Uf U f
#define Ua U a
#define Ub U b
#define Gz g6 z
#define Ez e6 z
#define Sz s6 z
#define Vs *(g6*)s
#define Vd *(g6*)d
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
#define GR g6*R
#define GA g6*A
#define GX g6*X
#define R_ *R++
#define A_ *A++
#define X_ *X++
#define E1 (127<<23)
