#include"_.a"
#define V(t,n) t##n __attribute((vector_size(1<<n),aligned(1)))
typedef int V(s,6);typedef float e2,V(e,6);typedef char i0,V(g,4),V(g,6);typedef unsigned i2,V(i,5),V(i,6),V(i,8);typedef unsigned long U,(*_U)(i2,U),V(j,6);
#undef V
#define D_(t,g,z,x...) static t g(x){return({z;});}
#define i2(g,z,x...) D_(i2,g,z,x)
#define e2(g,z,x...) D_(e2,g,z,x)
#define U(g,z,x...) static U g(x){return({z;});}
#define V(g,z,x...) static g6 g(x){return({z;});}
#define _(g,z,x...) static void g(x){z;}
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,ii,Ux)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define H(g,z) U(g,z,Uf,Ua,Ux)
#define g_(g,z) U_(g,z,ii,Ux)
#define F_(g,z) U_(g,z,Ua,Ux)
#define G_(g,z) U_(g,z,ii,Ua,Ux)
#define U_(g,z,x...) U g(x){return({z;});}
#define UV(g,z) U(g,z,Vx)
#define Vf(g,z) V(g,z,Vx)
#define Vg(g,z) V(g,z,ii,Vx)
#define VF(g,z) V(g,z,g6 a,Vx)
#define Ef(g,z) V(g,z,e6 x)
