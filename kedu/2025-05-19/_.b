#include"_.a"
#define T(t,x...) typedef t x;
#define V(t,n) t##n __attribute((vector_size(1<<n),aligned(1)))
T(char,i0,V(g,4),V(g,5),V(g,6))T(unsigned short,i1)T(unsigned,i2,V(i,6),V(i,5),V(i,8))T(unsigned long,U,(*_U)(i2,U),V(j,6))T(float,e2,V(e,6),V(e,5),V(e,7),V(e,8))T(int,V(s,6))
#undef T
#undef V
#define Tf(t,g,z,x...) static t g(x){return({z;});}
#define U(g,z,x...) Tf(U,g,z,x)
#define i2(g,z,x...) Tf(i2,g,z,x)
#define e2(g,z,x...) Tf(e2,g,z,x)
#define g6(g,z,x...) Tf(g6,g,z,x)
#define i6(g,z,x...) Tf(i6,g,z,x)
#define e6(g,z,x...) Tf(e6,g,z,x)
#define j6(g,z,x...) Tf(j6,g,z,x)
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,ii,U x)
#define K(g,z) U_(g,z,Uf,Ua,Ux)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define V(g,z,x...) static void g(x){z;}

#define U_(g,z,x...)  U g(x){return({z;});}
#define g_(g,z) U_(g,z,ii,Ux)
#define F_(g,z) U_(g,z,Ua,Ux)
#define G_(g,z) U_(g,z,ii,Ua,Ux)
#define is(g,z) U(g,z,ii,ss)
#define Us(g,z) U(g,z,ss)
#define Ui(g,z) U(g,z,ii)
#define Gf(g,z) g6(g,z,Vx)
#define Gg(g,z) g6(g,z,ii,Vx)
#define GF(g,z) g6(g,z,g6 a,Vx)
#define G3(g,z) g6(g,z,g6 a,g6 b,Vx)
#define If(g,z) i6(g,z,i6 x)
#define Ig(g,z) i6(g,z,ii,i6 x)
#define IF(g,z) i6(g,z,i6 a,i6 x)
#define Ef(g,z) e6(g,z,e6 x)
#define EF(g,z) e6(g,z,e6 a,e6 x)
