#define ix (i2)x
#define px (64>x)
#define ax !(x>>63)
#define tx (7&x>>60)
#define mx (b(16)&x>>32)
#define nx (i2)x
#define kx (mx?nx/mx:nx)
#define _(n) __attribute((vector_size(1<<n),aligned(1)))
typedef char V _(6),i0,g4 _(4),g5 _(5),g6 _(6);typedef unsigned short i1;typedef unsigned i2,i4 _(4),i5 _(5),i6 _(6);typedef float e2,e5 _(5),e6 _(6);
typedef unsigned long U,i3,j4 _(4),j6 _(6),(*Uf)(U),(*Ug)(i2,U),(*Uh)(i2,V*),(*UF)(U,U),U;extern U w2(i2,i0*),tn(i2,U),k(i2,U,U);typedef int s6 _(6);
#undef _
#define _(z) ({z;}) //_$ bfghijlmrtx CDFGPRW UV type(UV)
#define $(b,z) if(b){z;}else
#define b(i) ((1L<<(i))-1)
#define f(g,z) D(U,g,z,Ux)
#define g(g,z) D(U,g,z,ii,Ux)
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define r(b,z) _(typeof(b)r=b;z;r)
#define t(t,z) ((U)(t)<<60|(z))
#define x(b,z) _(typeof(b)x=b;z)
#define B(f) __builtin_##f
#define D(t,g,z,x...) __attribute((minsize,noinline))_D(t,g,z,x)
#define F(g,z) D(U,g,z,Ua,Ux)
#define G(g,z) D(U,g,z,ii,Ua,Ux)
#define P(b,z) if(b){return _(z);}
#define W(z) while(_(z))
#define ZU static i3
#define ZV static g6
#define I0 ((V){0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63})
ZU U1=0x0101010101010101;static i6 z2,I2={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};static e6 ze;ZV z0,R4[]={{63-I0},{},
{60,61,62,63,56,57,58,59,52,53,54,55,48,49,50,51,44,45,46,47,40,41,42,43,36,37,38,39,32,33,34,35,28,29,30,31,24,25,26,27,20,21,22,23,16,17,18,19,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3},
{56,57,58,59,60,61,62,63,48,49,50,51,52,53,54,55,40,41,42,43,44,45,46,47,32,33,34,35,36,37,38,39,24,25,26,27,28,29,30,31,16,17,18,19,20,21,22,23,8,9,10,11,12,13,14,15,0,1,2,3,4,5,6,7}},
AB={0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11},
BA={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11};
#define _D(t,g,z,x...) static t g(x){return _(z);}
#define _U(g,z,x...) _D(U,g,z,x)
#define _f(g,z) _U(g,z,U x)
#define _e(g,z,x...) _D(e2,g,z,x)
_f(nu,B(popcountl)(x))_f(iu,x?B(ctzl)(x):64)_f(ju,x?64-B(clzl)(x):0)
#define g_(g,z) U g(ii,Ux){return({z;});}
#define F_(g,z) U g(Ua,Ux){return({z;});}
#define G_(g,z) U g(ii,Ua,Ux){return({z;});}
#define U_(g,z,x...) U g(x){return _(z);}
#define Z_(g,z,x...) void g(x){z;}
#define _Z(g,z,x...) static Z_(g,z,x)
#define _i(g,z) _U(g,z,ii)
#define UV(g,z) _U(g,z,Va)
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define inx(g,z) _U(g,z,ii,in,Ux)
#define VE(g,z) _D(e6,g,z,e6 x)
#define VU(g,z) _D(V,g,z,Ux)
#define Vf(g,z) _D(V,g,z,Va)
#define Vg(g,z) _D(V,g,z,ii,Va)
#define VF(g,z) _D(V,g,z,Va,Vb)
#define V3(g,z) _D(V,g,z,Va,Vb,Vc)
#define _x(z) r(_(z),_r(x))
#define _a(z) r(_(z),_r(a))
#define ii i2 i
#define in i2 n
_e(ei,*(e2*)&i,ii)
_i(wc,w2(1,&i))
_i(wi,r(i,i0 b[12];i0*s=b+11;*s=10;in=i>>31;i=n?-i:i;do*--s=48+i%10;W(i/=10);if(n)*--s=45;w2(b+12-s,s)))
_i(ti,t(3,i))
#define xe ((e2*)sx)
#define x2 ((i2*)sx)
#define xU ((U*)sx)
#define xV ((V*)sx)
#define xE ((e6*)sx)
#define Zf(z,x...) static Uf z[]={x};
#define Zg(z,x...) static Ug z[]={x};
#define Zh(z,x...) static Uh z[]={x};
#define ZF(z,x...) static UF z[]={x};
#define gx (i0)x
#define zi z[i]
#define ee e2 e
#define hh i1 h
#define ih i2 h
#define ij i2 j
#define ik i2 k
#define il i2 l
#define im i2 m
#define it i2 t
#define Ur i3 r
#define Ua i3 a
#define Ux i3 x
#define Ub i3 b
#define Uc i3 c
#define Uu i3 u
#define Va V a
#define Vb V b
#define Vc V c
#define VX V*X
#define VA V*A
#define VR V*R
#define oo w2(3,"oo\n")
#define $3(z,a,b,c)       _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)     _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e)   _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define $6(z,a,b,c,d,e,f) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f))
#define $7(z,a,b,c,d,e,f,g) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):_(g))
#define p3(a,b,c)       (a+x*(b+x*c)) //unroll4?
#define p5(a,b,c,d,e)   (a+x*(b+x*(c+x*(d+x*e))))
#define p6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) 
#define aa x(a,ax)
#define ba x(a,bx)
#define sr x(r,sx)
#define sa x(a,sx)
#define tr x(r,tx)
#define ta x(a,tx)
#define ma x(a,mx)
#define na x(a,nx)
#define Na x(a,Nx)
#define nr x(r,nx)
#define rV x(r,xV)
#define r2 x(r,x2)
#define a2 x(a,x2)
#define rU x(r,xU)
#define aU x(a,xU)
#define Nr x(r,Nx)
#define n3(z) (7+(z)>>3)
#define n4(z) (15+(z)>>4)
#define n5(z) (31+(z)>>5)
#define n6(z) (63+(z)>>6)
#define n9(z) (511+(z)>>9)
#define Ze static e2
#define Z0 static i0
#define Z2 static i2
#define aE x(a,xE)
#define Zr x(r,Zx)
#define Za x(a,Zx)
#define ae x(a,xe)
#define ka x(a,kx)
#define ga x(a,gx)
#define ia x(a,ix)
#define ea x(a,ex)
#define pa x(a,px)
