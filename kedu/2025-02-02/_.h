#define Is(g,z) _D(i6,g,z,ss,Vx)
#define mn(g,z) _Z(g,z,il,im,in,i2*d,i2*s)
#define MN(g,z) _Z(g,z,im,in,e2*r,e2*a,e2*x)
#define z4(z) i(4,zi+=z)
#define Jz j6 z
#define Rk R[k|i]
#define JR(t)   J(Nr,R_=C(t##6,X_))
#define JX(t,T) J(Nx,R_=C(t,T##x))
#define t(t,z) ((U)(t)<<60|(z))
#define tx (    7&x>>60)
#define hx (   31&x>>55)
#define ox (  255&x>>47)
#define mx (32767&x>>32)
#define _(n) __attribute((vector_size(1<<n),aligned(1)))
typedef unsigned long U,i3,j6 _(6);typedef char i0,g4 _(4),g5 _(5),g6 _(6);typedef unsigned short i1;typedef unsigned i2,i4 _(4),i5 _(5),i6 _(6);typedef float e2,e5 _(5),e6 _(6);typedef int s6 _(6);
#undef _
#define _(z) ({z;}) //_$ bfghijlmrtx CDFGPRW UV type(UV)
#define Z0 static i0
#define ZU static i3
#define ZV static g6
#define ZI static i6
#define ZJ static j6
#define ZE static e6
#define ss i0*s
extern U QQ(ss),w2(i2,ss),tn(i2,i2),k(i2,U,U);ZI z2,I={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15},CB={0,2,1,4,3,6,5,8,7,10,9,12,11,14,13,15};ZJ J={0,1,2,3,4,5,6,7};ZE ze;ZU _r(),r_();ZV 
z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define bu(o) __builtin_##o
#define _D(t,g,z,x...) static t g(x){return _(z);}
#define _U(g,z,x...) _D(i3,g,z,x)
#define _f(g,z) _U(g,z,U x)
#define _u(g,z) _U(g,z,ii)
#define _e(g,z,x...) _D(e2,g,z,x)
#define is(g,z) _U(g,z,ii,ss)
#define ix (i2)x
#define ii i2 i
#define ij i2 j
#define in i2 n
#define ee e2 e
#define sd i0*d
#define di d[i]
#define W(z) while(_(z))
#define i(b,z) {i2 $=b;ii=0;W(i<$){z;++i;}}
_f(nu,bu(popcountl)(x))_f(iu,x?bu(ctzl)(x):64)_f(lu,--x?64-bu(clzl)(x):0)_e(ei,*(e2*)&i,ii)_f(iz,3>tx?ix:(i2)ei(ix))_u(ti,t(2,i))_U(te,t(3,*(i2*)&e),ee)is(ic,sd=s;W(i!=*s)++s;s-d)
_u(wc,w2(1,&i))is(w0,w2(i,s);wc(10);-1)_U(ws,w0(ic(0,s),s),ss)_u(wi,i0 d[12];i0*s=d+11;*s=10;in=i>>31?-i:i;do*--s=48+n%10;W(n/=10);if(i>>31)*--s=45;w2(d+12-s,s);i)
Z0*es[]={"nyi","rnk","len","typ"};is(err,w2(3,es[i]);wc(58);ws(s))_f(wu,i0 d[16];i(16,ij=15&x>>60-4*i;di="0W"[9<j]+j)w0(16,d);x)
#define nx (i2)x
#define ux (mx?:nx)
#define vx (mx?nx/mx:nx)
#define ax !(x>>63)
#define px (64>x)
#define ex (3>tx?(int)ix:ei(ix))
#define Nx (nx<<bx)
#define bx b[tx]
#define $(b,z) if(b){z;}else
#define b(i) ((1L<<(i))-1)
#define f(g,z) D(U,g,z,Ux)
#define g(g,z) D(U,g,z,ii,Ux)
#define h(b,z) {i2 $=b;ih=0;W(h<$){z;++h;}}
#define j(b,z) {i2 $=b;ij=0;W(j<$){z;++j;}}
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define r(b,z) _(typeof(b)r=b;z;r)
#define x(b,z) _(typeof(b)x=b;z)
#define C(t,z) bu(convertvector)(z,t)
#define D(t,g,z,x...) __attribute((minsize,noinline))_D(t,g,z,x)
#define F(g,z) D(U,g,z,Ua,Ux)
#define G(g,z) D(U,g,z,ii,Ua,Ux)
#define J(n,z) j(n6(n),z)
#define P(b,z) if(b){return _(z);}
#define R(t,n,z) r(tn(t,n),z)
#define _x(z) r(_(z),_r(x))
#define _a(z) r(_(z),_r(a))
#define g_(g,z) U g(ii,Ux){return({z;});}
#define F_(g,z) U g(Ua,Ux){return({z;});}
#define G_(g,z) U g(ii,Ua,Ux){return({z;});}
#define U_(g,z,x...) U g(x){return _(z);}
#define _Z(g,z,x...) static void g(x){z;}
#define _g(g,z) _U(g,z,ii,Ux)
#define _F(g,z) _U(g,z,Ua,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define inx(g,z) _U(g,z,ii,in,Ux)
#define UV(g,z) _U(g,z,Vx)
#define VU(g,z) _D(g6,g,z,Ux)
#define Vf(g,z) _D(g6,g,z,Vx)
#define VF(g,z) _D(g6,g,z,Va,Vx)
#define VG(g,z) _D(g6,g,z,ii,Va,Vx)
#define Ef(g,z) _D(e6,g,z,e6 x)
#define Eg(g,z) _D(e6,g,z,ii,Vx)
#define EF(g,z) _D(e6,g,z,Va,Vx)
#define E3(g,z) _D(e6,g,z,Va,Vb,Vc)
#define cc i0 c
#define hh i1 h
#define EE {a=aa?a:T(3,a);x=T(3,x);}
#define RU(z)     _R(0,nx,      UR=sr;j(nx,R_=_(z)))
#define RV(t,n,z) _R(t,n,       VR=sr;J(Nr,R_=_(z)))
#define X(z)      r(uz(x),VX=sx;VR=sr;J(Nx,R_=_(z)))
#define RX(z) M(mx,_R(tx,nx,z))
#define _R(t,n,z) _x(R(t,n,z))
#define si s[i]
#define IB i6*B
#define Ea e6 a
#define OO(b) if(b)QQ(__func__);
#define Yi Y[i]
#define ai a[i]
#define si s[i]
#define p6(a,b,c,d,e,f) (a+x*(b+x*(c+x*(d+x*(e+x*f))))) //unroll4?
#define Vd *(g6*)d
#define Vs *(g6*)s
#define Z2 static i2
#define Ze static e2
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
#define Vb g6 b
#define Vc g6 c
#define Vx g6 x
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
#define rE x(r,xE)
#define aE x(a,xE)
#define Zr x(r,Zx)
#define Za x(a,Zx)
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
#define SX s6*X
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
#define Jx ((j6)X_)
#define Ex ((e6)X_)
#define Ia ((i6)A_)
#define Nr x(r,Nx)
#define ha x(a,hx)
#define ua x(a,ux)
#define va x(a,vx)
#define Na x(a,Nx)
#define x2 ((i2*)sx)
#define a2 x(a,x2)
#define xU ((i3*)sx)
#define xV ((g6*)sx)
#define xE ((e6*)sx)
#define r2 x(r,x2)
#define aV x(a,xV)
#define rV x(r,xV)
#define QZ _(Qz(1)0)
#define Qi(b,i) P(b,err(i,__func__))
#define Qz(b) Qi(b,0)
#define Qr(b) Qi(b,1)
#define Qn(b) Qi(b,2)
#define Qt(b) Qi(b,3)
#define Ri R[i]
#define Ai A[i]
#define Xi X[i]
#define xi ((i2*)sx)[i]
#define xe ((e2*)sx)[i]
#define ae x(a,xe)
#define YX i5*X
#define YR i5*R
#define XX g4*X
#define XR g4*R

/*
#define EB e6*B
#define Ed e6 d
#define Ee e6 e
#define Ef e6 f
#define Eg e6 g
#define Eh e6 h
*/
