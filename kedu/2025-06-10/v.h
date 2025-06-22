#define Vm(g,x) V(g,ij=(i*m+m)/N;i=i*m/N;x,ii)
#define Vn(g,x) V(g,ij=(i*n+n)/N;i=i*n/N;x,ii)
#define un(g,e) u(g,e,in,IZ)
#define IJ iI,iJ,ER,eY,EZ
#include"_.h"
#define c(a,x)      o(convertvector)(a,x)
#define q(a,x)      o(shufflevector)((typeof(x))a,x)
#define p(a,x,i...) o(shufflevector)(a,(typeof(a))x,i)
Gg(S2,$4(i,p(Z2,z,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30),p(Z2,z,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29),p(Z2,z,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27),p(Z2,z,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23)))
Gg(S0,$3(i,p(Z0,z,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126),p(Z0,z,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125),S2(i-2,z)))
Gf(R2,q(z,15-I2))GF(l2,p((I)y,z,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30))GF(l0,p(y,z,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126))
Gf(R0,q(z,63-I0))GF(h2,p((I)y,z,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31))GF(h0,p(y,z,1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125,127))
D(E,EI,c(z,E),Iz)D(G,GI,c(z,G),I_ z)GF(GA,y+z)GF(IA,(I)y+z)GF(EA,(E)y+z)
#define O(f) o(ia32_##f##512)
#define AT(s,z,i) o(ia32_gathersiv16si)(Z0,s,z,-1,1<<i)
Ef(_Q,O(sqrtps)(z,4))Gf(IE,o(ia32_cvtps2dq512_mask)(z,Z0,-1,9))Gf(SB,O(vpopcntd_)(z))UG(b0,O(cvtb2mask)(z))UG(b2,O(cvtd2mask)(z))GU(GB,O(selectb_)(z,1|Z0,Z0))GF(GM,O(pmaxub)(y,z))GF(IM,O(pmaxud)(y,z))
#define p6(z,a,b,c,d,e,f) ({E $=z;a+$*(b+$*(c+$*(d+$*(e+$*f))));})
Ef(E_,z*=1.442695f;I y=IE(z-.5);p6(z-EI(y),.99999994f,.69315308f,.24015361f,.055826318f,.0089893397f,.0018775767f)*(y+127<<23))
#define _z ((_G*)z)[i]
#define z_ ((I_*)z)[i]
#define ye (E)yi
#define ze (E)zi
#define zg (G)zi
#define h(n,x) {unsigned $=n;ih=0;while(h<$){x;++h;}}
#define j(n,x) {unsigned $=n;ij=0;while(j<$){x;++j;}}
#define k(b,x) {unsigned $=b;ik=0;while(k<$){x;++k;}}
#define iH unsigned H
#define iI unsigned I
#define iJ unsigned J
#define IR I*R
#define EZ E*Z
#define EY E*Y
#define ER E*R
#define eY e*Y
#define x(b,_) ({typeof(b)x=b;_;})
#define gy (char)(U)y
