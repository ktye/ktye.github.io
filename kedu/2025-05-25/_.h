#define I0 ((g6){0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63})
#define I2 ((i6){0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15})
#define V(t,n) t##n __attribute((vector_size(1<<n),aligned(1)))//bpqghij.. efz
typedef int V(s,6);typedef float e2,V(e,6);typedef char i0,V(g,4),V(g,6);typedef unsigned i2,V(i,5),V(i,6),V(i,8);typedef unsigned long U,(*_U)(i2,U),V(j,6);
#undef V
#define zk z[i|k]
#define Ze static e2
#define Z0 static i0
#define Z2 static i2
#define ZI static i6
#define ZE static e6
#define ZJ static j6
#define ZU static U
#define Vd *(g6*)d
#define Vs *(g6*)s
#define z0 (g6){}
#define z2 (i6){}
#define ze (e6){}
#define Iz i6 z
#define Ez e6 z
#define Ex e6 x
#define Gz g6 z
#define Va g6 a
#define Vx g6 x
#define iH i2 H
#define iJ i2 J
#define gg i0 g
#define ee e2 e
#define sd i0*d
#define ss i0*s
#define st i0*t
#define ih i2 h
#define ii i2 i
#define ij i2 j
#define ik i2 k
#define il i2 l
#define im i2 m
#define in i2 n
#define iI i2 I
#define it i2 t
#define tx (15&x>>59)
#define bx (A[tx]%16)
#define sx ((i0*)(Ox&~b(6)))
#define ux (mx?b(mx)&ix:ix)
#define vx ((b(31)&ix)>>mx)
#define nx (mx?ux*vx:ix)
#define ox (255&x>>36)
#define Nx n3(nx<<bx)
#define px (1l<<59>x)
#define hx (31&x>>54)
#define mx (31&x>>31)
#define aV ((g6*)sa)
#define ax !(x>>63)
#define rx (63&Ox)
#define Ox O[ox]
#define ex (*(e2*)&x)
#define r5 ((i2*)sr)[i]
#define r6 ((U*)sr)[i]
#define r9 ((g6*)sr)[i]
#define x0 (1&((U*)sx)[i/64]>>i%64)
#define x3 sx[i]
#define x5 ((i2*)sx)[i]
#define x6 ((U*)sx)[i]
#define x9 ((g6*)sx)[i]
#define ix (i2)x
#define rU ((U*)sr)
#define oo ws("oo")
#define Uf U f
#define Ua U a
#define Ub U b
#define Ux U x
#define Un U n
#define re ((e2*)sr)[i]
#define ai a[i]
#define aj a[j]
#define bi b[i]
#define di d[i]
#define zi z[i]
#define zj z[j]

#define Ai A[i]
#define Bi B[i]
#define Ci C[i]
#define Di D[i]
#define Fi F[i]
#define Gi G[i]
#define Oi O[i]
#define Ri R[i]
#define Xi X[i]
#define Xj X[j]
#define Zi Z[i]
#define a6 x(a,x6)
#define tr x(r,tx)
#define pf x(f,px)
#define pa x(a,px)
#define aa x(a,ax)
#define ta x(a,tx)
#define ma x(a,mx)
#define ua x(a,ux)
#define va x(a,vx)
#define sa x(a,sx)
#define na x(a,nx)
#define Na x(a,Nx)
#define ia x(a,ix)
#define ea x(a,ex)
#define ha x(a,hx)
#define sr x(r,sx)
#define pr x(r,px)
#define nr x(r,nx)
#define Nr x(r,Nx)
#define ER e6*R
#define EA e6*A
#define EX e6*X
#define IR i6*R
#define IA i6*A
#define IX i6*X
#define iR i2*R
#define iA i2*A
#define eR e2*R
#define eA e2*A
#define eX e2*X
#define VR g6*R
#define VA g6*A
#define VX g6*X
