#include"v.a"
#define c(a,x)      o(convertvector)(a,x)
#define q(a,x)      o(shufflevector)((typeof(x))a,x)
#define p(a,x,i...) o(shufflevector)(a,(typeof(a))x,i)
Vg(S2,$4(i,p(z2,x,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30),p(z2,x,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29),p(z2,x,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27),p(z2,x,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23)))
Vg(S0,$3(i,p(z0,x,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126),
p(z0,x,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125),S2(i-2,x)))
VF(l0,p(a,x,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126))
VF(m0,p(a,x,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125,127))
V(IG,c(x,i6),g4 x)V(GI,c(x,g6),i8 x)Vf(EI,c((s6)x,e6))Vf(R0,q(x,63-I0))Vf(R2,q(x,15-I2))VF(l2,p((i6)a,x,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30))VF(m2,p((i6)a,x,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31))
#define O(f) o(ia32_##f##512)
V(GB,O(selectb_)(x,1|z0,z0),Ux)UV(b0,O(cvtb2mask)(x))UV(b2,O(cvtd2mask)(x))V(G2,o(ia32_gathersiv16si)(z2,s,x,-1,4),ss,Vx)V(G0,o(ia32_gathersiv16si)(z2,s,x,-1,1),ss,Vx)VF(MG,O(pmaxub)(a,x))VF(LI,O(pminud)(a,x))VF(MI,O(pmaxud)(a,x))
#define p6(z,a,b,c,d,e,f) ({e6 $=z;(e2)(a)+$*((e2)b+$*((e2)c+$*((e2)d+$*((e2)e+$*(e2)f))));})
Ef(IE,o(ia32_cvtps2dq512_mask)(x,z2,-1,9))Ef(E,x*=1.442695f;s6 z=IE(x-.5);p6(x-EI(z),.99999994,.69315308,.24015361,.055826318,.0089893397,.0018775767)*(z+127<<23))Vg(dv,Iz=(65535&i)*(i6)x>>16;(i>>=16)?(i6)x-i*z:z)
Ef(qq,O(sqrtps)(x,4))Ef(Se,i(4,x+=S2(i,(i6)x))x)V(JJ,ZJ A={-1};ZJ B={0xc6a4a7935bd1e995};Z2 a;if(!a){i(a=8,if(i)Ai=Bi=i)i(1e4,JJ())}A^=B;B^=B<<14^(A<<55|A>>9);B=B<<37|B>>27;(e6)(127<<23|1<<23&(i6)(A+B))-1)
#define V2(g,z,x...) _(g,i(n4(I),Ri=z),x)
#define kk(b,z) {i2 $=b;i2 k=0;while(k<$){z;++k;}}
