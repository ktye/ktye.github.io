#include"v.a"
#define Gf(g,z) D(g6,g,z,Vx)
#define If(g,z) D(i6,g,z,i6 x)
#define Ef(g,z) D(e6,g,z,e6 x)
#define Gg(g,z) D(g6,g,z,ii,g6 x)
#define IF(g,z) D(i6,g,z,i6 a,i6 x)
#define EF(g,z) D(e6,g,z,e6 a,e6 x)
#define GF(g,z) D(g6,g,z,g6 a,g6 x)
#define G3(g,z) D(g6,g,z,g6 a,g6 b,g6 x)
#define C(t,u,m) D(t##6,t##u,o(convertvector)(x,t##6),u##m x)
C(g,i,8)C(i,g,4)C(e,i,6)C(j,i,5)Ui(n3,7+i>>3)Ui(n4,15+i>>4)Ui(n6,63+i>>6)IF(SI,a+x)EF(SE,a+x)
#define O(f) o(ia32_##f##512)//GF(p2,O(permvarsi)(a,x))
Ef(q,O(sqrtps)(x,4))GF(MG,O(pmaxub)(a,x))IF(LI,O(pminsd)(a,x))IF(MI,O(pmaxsd)(a,x))IF(ME,O(maxps)(a,x,4))
U(b2,O(cvtd2mask)(x),Vx)If(ie,o(ia32_cvtps2dq512_mask)(x,z0,-1,4))D(i6,G2,o(ia32_gathersiv16si)(z0,s,x,-1,4),ss,Vx)EF(d8,ei(O(vpdpbusd)(z2,a,x)))
If(R2,O(permvarsi)(x,15-I2))G3(P0,O(vpermi2varqi)(a,b,x))G3(P2,O(vpermi2varps)(a,b,x))
EF(qq,q(a*a+x*x))Gg(r6,P0(x,I0-(g0)(1<<i),z0))Gg(r4,P2(x,I2-(1<<i),z0))IF(_P,P2(a,2*I2,x))IF(P_,P2(a,1|2*I2,x))
#define R3(z) i(n3(n),Ri=_(z))
#define R4(z) i(n4(n),Ri=_(z))
#define R6(z) i(n6(n),Ri=_(z))
#define y(g,z) Z(g,R4(z),in,IR)
#define a(g,z) Z(g,R4(z),im,U3)
#define e(g,z) Z(g,R4(z),ee,U3)
#define A(g,z) Z(g,R4(z),IA,U3)
#define B(g,f) z(g,x(*X++,f(x,*X++)))
#define Z(g,z,x...) static void g(x){z;}
#define z(g,z) Z(g,R4(z),U3)
#define c(g,z) Z(g,R6(1&gi(m z X8)),im,U3)
