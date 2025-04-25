V(gi,1&o(convertvector)(x,g6),i8 x)D(i6,ig,o(convertvector)(x,i6),g4 x)D(e6,ei,o(convertvector)(x,e6),i6 x)D(j6,ji,o(convertvector)(x,j6),i5 x)
#define O(f) o(ia32_##f##512)//elementwise(min max)sqrt
U(b2,O(cvtd2mask)(x),Vx)If(ie,o(ia32_cvtps2dq512_mask)(x,z0,-1,4))D(i6,G2,o(ia32_gathersiv16si)(z0,s,x,-1,4),ss,Vx)EF(d8,ei(O(vpdpbusd)(z2,a,x)))Ef(q,O(sqrtps)(x,4))GF(MG,O(pmaxub)(a,x))IF(LI,O(pminsd)(a,x))IF(MI,O(pmaxsd)(a,x))
If(R2,O(permvarsi)(x,15-I2))G3(P0,O(vpermi2varqi)(a,b,x))G3(P2,O(vpermi2varps)(a,b,x))Gg(r6,P0(x,I0-(i0)(1<<i),z0))Gg(r4,P2(x,I2-(1<<i),z0))IF(_P,P2(a,2*I2,x))IF(P_,P2(a,1|2*I2,x))
#define R4(z) i(n4(n),Ri=_(z))
#define y(g,z) Z(g,R4(z),in,IR)
#define z(g,z) Z(g,R4(z),U3)
#define a(g,z) Z(g,R4(z),im,U3)
#define d(g,z) Z(g,R4(z),ee,U3)
#define A(g,z) Z(g,R4(z),IA,U3)
#define B(g,f) z(g,x(*X++,f(x,*X++)))
#define Z(g,z,x...) static void g(x){z;}
