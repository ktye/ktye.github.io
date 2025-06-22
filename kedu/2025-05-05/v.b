#include"v.a"
e6(JJ,ZJ A={-1};ZJ B={0xc6a4a7935bd1e995};Z2 a;if(!a){i(a=8,if(i)Ai=Bi=i)i(1e4,JJ())}A^=B;B^=B<<14^(A<<55|A>>9);B=B<<37|B>>27;(e6)(127<<23|b(23)&(i6)(A+B))-1)
e6(EI,o(convertvector)(x,e6),s6 x)i6(IG,o(convertvector)(x,i6),g4 x)g6(GI,1&o(convertvector)(x,g6),i8 x)IF(SI,a+x)EF(SE,a+x)GF(SG,a|x)
#define O(f) o(ia32_##f##512)//GF(MG,o(elementwise_max)(a,x))IF(LI,o(elementwise_min)(a,x))IF(MI,o(elementwise_max)(a,x))
GF(MG,O(pmaxub)(a,x))IF(LI,O(pminsd)(a,x))IF(MI,O(pmaxsd)(a,x))
Ef(Q,O(sqrtps)(x,4))Ef(IE,o(ia32_cvtps2dq512_mask)(x,z0,-1,9))EF(d8,EI(O(vpdpbusd)(z2,a,x)))U(b2,O(cvtd2mask)(x),Vx)i6(G2,o(ia32_gathersiv16si)(z0,s,x,-1,4),ss,Vx)
If(R2,O(permvarsi)(x,15-I2))G3(P2,O(vpermi2varps)(a,b,x))Gg(S0,O(vpermi2varqi)(x,I0-(i0)(1<<i),z0))Gg(S2,P2(x,I2-(1<<i),z0))EF(_P,P2(a,2*I2,x))EF(P_,P2(a,1|2*I2,x))
#define p6(z,a,b,c,d,e,f) _(e6 $=z;(e2)(a)+$*((e2)b+$*((e2)c+$*((e2)d+$*((e2)e+$*(e2)f)))))//Ef(L,i6 z=x;.69314575f*(EI((z>>23)-127)+p6(127<<23|b(23)&z,-1,3.1157899,-3.324199,2.5988452,-1.2315303,.31821337)))
Ef(E,x*=1.442695f;s6 z=IE(x-.5);p6(x-EI(z),.99999994,.69315308,.24015361,.055826318,.0089893397,.0018775767)*(z+127<<23))EF(AZ,Q(a*a+x*x))Ef(Se,i(4,x+=S2(i,x))x)

