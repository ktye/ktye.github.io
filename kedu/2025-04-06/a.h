#include"_.h"//13<clang VF(MG,B(elementwise_max)(a,x))IF(MI,B(elementwise_max)(a,x))VF(ME,B(elementwise_max)((e6)a,(e6)x))
#define O(f) B(ia32_##f##512) 
UV(b2,O(cvtd2mask)(x))VF(LI,O(pminsd)(a,x))VF(MI,O(pmaxsd)(a,x))VF(LE,O(minps)(a,x,4))VF(ME,O(maxps)(a,x,4))VF(MG,O(pmaxub)(a,x))
VF(p2,O(permvarsi)(a,x))V3(P2,O(vpermi2varps)(a,b,c))Vg(s0,2>i?O(vpermi2varqi)(x,I0-(i0)(1<<i),z0):P2(x,I2-(1<<i-2),z0))Vg(r0,2>i?O(permvarqi)(x,63-I0):p2(x,15-I2))
If(IE,o(cvtps2dq512_mask)(x,z0,-1,4))If(ab,O(pabsd)(x))Ef(_q,O(sqrtps)(x,4))V3(bc,o(vfmaddsubps512_mask3)(a,b,c,-1,9))V(G2,o(gathersiv16si)(z0,s,x,-1,4),ss,Vx)
j6 A={-1},B={0xc6a4a7935bd1e995};V(JJ,B=RJ(37,RJ(55,A^=B)^B^B<<14);A+B)Vf(ba,p2(x,BA))VF(c,bc(p2(a,I2/2*2),x,(e6)p2(a,1|I2/2*2)*ba(x))) //Vf(lm,AB&LI(x,ba(x))|~AB&MI(x,ba(x)))
IF(_P,B(shufflevector)(a,x,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30))Ef(_l,Sa=IE(x-.5);p6(x-C(e6,a),.99999994,.69315308,.24015361,.055826318,.0089893397,.0018775767)*(a+127<<23))
IF(P_,B(shufflevector)(a,x,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31))If(l_,C(e6,x-E1>>23)+p6(E1|b(23)&x,-1,3.1157899,-3.324199,2.5988452,-1.2315303,.31821337))static i6 Z[1<<14];
