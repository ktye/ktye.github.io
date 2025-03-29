#define Vr *(V*)r
#define Vs *(V*)s
#define PI 3.1415927410125732
#define Q2 .70710678
#define IB i6*B
#define Ea e6 a
#define OO(b) if(b)__(__func__);
#define Yi Y[i]
#define ai a[i]
#define bi b[i]
#define ri r[i]
#define _R(t,n,z) _x(R(t,n,z))
#define R0(n,z) _x(R(0,n,UR=sr;      j(n ,R_=_(z))))
#define RV(t,n,z)  R(t,n,VR=sr;      J(Nr,R_=_(z)))
#define RG(z)  _x(R(1,nx,XR=sr;VX=sx;J(Nx,R_=C(g4,z))))
#define X(z)     r(uz(x),VR=sr;VX=sx;J(Nx,R_=_(z)))
#define EE {a=aa?a:T(3,a);x=T(3,x);}
#define Q(z) r(z,P(-1==r,-1))
#define p6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) //unroll4? rsqrt[14|28]ps .69314718 a*x%1+E-x erz x%%xx%n x%Sx:Ex-Mx
#define t(t,z) ((U)(t)<<61|(z))
#define tx (3&x>>61)
#define hx (31&x>>56)
#define ox (255&x>>48)
#define mx (b(16)&x>>32)
#define nx (i2)x
#define bx b[tx]
#define Nx (nx<<bx)
#define Ox O[ox]
#define ux (mx?:nx)
#define vx (mx?nx/mx:nx)
#define px (64>x)
#define ax !(x>>63)
#define ix (i2)x
#define ex (3>tx?(int)ix:ei(ix))
#define _(n) __attribute((vector_size(1<<n),aligned(1)))
typedef char V _(6),i0,g4 _(4),g5 _(5),g6 _(6);typedef unsigned short i1;typedef unsigned i2,i6 _(6);typedef float e2,e5 _(5),e6 _(6);typedef int s6 _(6);
typedef unsigned long U,i3,j4 _(4),j6 _(6),U;
#undef _
#define _(z) ({z;}) //_$ bfghijlmrtx CDFGPRW UV type(UV)
#define ZZ static void
#define ZU static i3
#define ZV static g6
#define ZI static i6
#define ZE static e6
#define ss i0*s
extern U __(ss),w2(i2,ss),tn(i2,i2),k(i2,U,U);ZU _r(),r_();ZI z2,I2={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15},CB={0,2,1,4,3,6,5,8,7,10,9,12,11,14,13,15};ZE ze;ZV 
z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define _u(g,z) _U(g,z,ii)
#define bu(o) __builtin_##o
#define $(b,z) if(b){z;}else
#define b(i) ((1L<<(i))-1)
#define U(g,z,x...) D(U,g,z,x)
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,ii,Ux)
#define h(b,z) {i2 $=b;ih=0;W(h<$){z;++h;}}
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define r(b,z) _(typeof(b)r=b;z;r)
#define x(b,z) _(typeof(b)x=b;z)
#define C(t,z) bu(convertvector)(z,t)
#define D(t,g,z,x...) __attribute((minsize,noinline))_D(t,g,z,x)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,ii,Ua,Ux)
#define J(n,z) j(n6(n),z)
#define P(b,z) if(b){return _(z);}
#define R(t,n,z) r(tn(t,n),z)
#define W(z) while(_(z))
#define _x(z) r(_(z),_r(x))
#define _a(z) r(_(z),_r(a))
#define _D(t,g,z,x...) static t g(x){return _(z);}
#define _e(g,z,x...) _D(e2,g,z,x)
#define _U(g,z,x...) _D(i3,g,z,x)
#define _V(g,z,x...) _D(g6,g,z,x)
#define _f(g,z) _U(g,z,U x)
#define g_(g,z) U g(ii,Ux){return({z;});}
#define F_(g,z) U g(Ua,Ux){return({z;});}
#define G_(g,z) U g(ii,Ua,Ux){return({z;});}
#define U_(g,z,x...) U g(x){return _(z);}
#define _Z(g,z,x...) ZZ g(x){z;}
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define is(g,z) _U(g,z,ii,ss)
#define inx(g,z) _U(g,z,ii,in,Ux)
#define UV(g,z) _U(g,z,Vx)
#define VU(g,z) _V(g,z,Ux)
#define Vf(g,z) _V(g,z,Vx)
#define Vg(g,z) _V(g,z,ii,Vx)
#define VF(g,z) _V(g,z,Va,Vx)
#define Ve(g,z) _D(e6,g,z,e6 x)
#define sd i0*d
#define ee e2 e
#define cc i0 c
#define hh i1 h
#define ii i2 i
#define ij i2 j
#define in i2 n
_f(nu,bu(popcountl)(x))_f(iu,x?bu(ctzl)(x):64)_f(lu,--x?64-bu(clzl)(x):0)is(ic,sd=s;W(i!=*s)++s;s-d)_e(ei,*(e2*)&i,ii)_f(ie,3>tx?ix:(i2)ei(ix))
_u(wi,i0 b[12];i0*s=b+11;*s=10;in=i>>31?-i:i;do*--s=48+n%10;W(n/=10);if(i>>31)*--s=45;w2(b+12-s,s);i)_u(ti,t(2,i))_U(te,t(3,*(i2*)&e),ee)
_u(wc,w2(1,&i))is(w0,w2(i,s);wc(10);-1)_U(ws,w0(ic(0,s),s),ss)_f(wu,i0 b[16];i(16,ij=15&x>>60-4*i;bi="0W"[9<j]+j)w0(16,b);x)
#define Z0 static i0
#define Z2 static i2
#define R_ *R++
#define A_ *A++
#define X_ *X++
#define zi z[i]
#define ih i2 h
#define ik i2 k
#define il i2 l
#define im i2 m
#define it i2 t
#define Ur i3 r
#define Ua i3 a
#define Ux i3 x
#define Ub i3 b
#define Uu i3 u
#define Un i3 n
#define Vz g6 z
#define Va g6 a
#define Vx g6 x
#define Vb g6 b
#define VX g6*X
#define VA g6*A
#define VR g6*R
#define UR i3*R
#define oo w2(3,"oo\n")
#define $3(z,a,b,c)       _(i2 $=z;!$?_(a):1==$?_(b):_(c))
#define $4(z,a,b,c,d)     _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d))
#define $5(z,a,b,c,d,e)   _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e))
#define $6(z,a,b,c,d,e,f) _(i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):_(f))
#define aa x(a,ax)
#define sr x(r,sx)
#define sa x(a,sx)
#define tr x(r,tx)
#define ta x(a,tx)
#define ma x(a,mx)
#define na x(a,nx)
#define nr x(r,nx)
#define rU x(r,xU)
#define aU x(a,xU)
#define n3(z) (7+(z)>>3)
#define n4(z) (15+(z)>>4)
#define n5(z) (31+(z)>>5)
#define n6(z) (63+(z)>>6)
#define n9(z) (511+(z)>>9)
#define aE x(a,xE)
#define Zr x(r,Zx)
#define Za x(a,Zx)
#define ae x(a,xe)
#define ka x(a,kx)
#define ia x(a,ix)
#define ea x(a,ex)
#define pa x(a,px)
#define iR i2*R
#define iA i2*A
#define iB i2*B
#define gX i0*X
#define iX i2*X
#define eR e2*R
#define eA e2*A
#define eX e2*X
#define IR i6*R
#define IA i6*A
#define IX i6*X
#define ER e6*R
#define EA e6*A
#define EX e6*X
#define Eb e6 b
#define Ec e6 c

#define Ib i6 b
#define Ez e6 z
#define Iz i6 z
#define Sz s6 z
#define Ix ((i6)X_)
#define Ex ((e6)X_)
#define Ia ((i6)A_)
#define Nr x(r,Nx)
#define ha x(a,hx)
#define ua x(a,ux)
#define va x(a,vx)
#define Na x(a,Nx)
#define q4(a,b,c,d) (a==i|b==i|c==i|d==i)
#define xe ((e2*)sx)
#define x0 ((i0*)sx)
#define x2 ((i2*)sx)
#define xU ((U*)sx)
#define xV ((V*)sx)
#define xE ((e6*)sx)
#define r2 x(r,x2)
#define rV x(r,xV)
#define QZ _(Qz(1)0)
#define Qi(b,i) P(b,err(i,__func__))
#define Qz(b) Qi(b,0)
#define Qr(b) Qi(b,1)
#define Qn(b) Qi(b,2)
#define Qt(b) Qi(b,3)
is(err,w2(3,$4(i,"com","rnk","len","typ"));wc(58);ws(s))
#define Ri R[i]
#define Ai A[i]
#define Xi X[i]
#define xi x2[i]
#define YX g5*X
#define XX g4*X
#define XR g4*R
