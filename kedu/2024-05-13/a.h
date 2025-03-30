#define VF(g,z) V(g,z,Va,Vb)
#define i0(a,b) I(pshufb)(a,b)
#define i2(a,b) I(pshufd)(a,b)
#define c(z) _(cc[256];U d=(U)c;ns(_(z)-(U)c,c))
#define bI(z)     R(1,nx,i( 7+nx>>3,rc=b2(_(z))))
#define bC(z)     R(1,nx,i(31+nx>>5,ru=b_(_(z))))
#define TN(t,n,z) R(t,n, i(31+Nr>>5,rV=   _(z)))
#define KN(n,z)   R(0,n, i(nr      ,rU=   _(z)))
#define oo ws("oo\n")
#define sd (char*)d
#define s_(t) r((t##5){},i(NX,r+=O)r+=s(4,r);r+=s(8,r);r+=s(16,r))[7]
#define S_(t) a((t##5){},N(t##5 r=O;r+=s(4,r);r+=s(8,r);a=r+s(16,r)+a[7]))
#define Zu static u //abc.efg.ij.lmno..rst.v.x.z
#define ZU static U //.BC..FG.I....NOPQRSTUVW..Z
#define ZV static V
#define Zc static char
#define D(i) __attribute((vector_size(1<<i),aligned(1)))
typedef char V D(5);typedef unsigned u,u4 D(4),u5 D(5);typedef unsigned long(*_)(),U,U5 D(5),U6 D(6);typedef int i5 D(5);typedef float e5 D(5);static float E[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9};
ZU W,M[32],D[32],S[99],*c=S+99;Zu A,M1=65535,N=1<<31,L[]={3,0,0,2,2,3},g=95<<23;ZV c0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31};
static u5 u0,I2={0,1,2,3,4,5,6,7};static U5 U0;Zc*ws();ZU V_(),dn(),T(),b_(),a1(),jJ(),z(),_v(),_p(),_z(),aA(),n_(),err(),ys(),w_(U,...),qq(),wx(),r_(),_0(),_1(),_k(U,...),_i(),_r();
#define _(e) ({e;})
#define a(z,e) _(typeof(z)a=z;e)
#define b(z) ((1l<<(z))-1)
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,uf,Ux)
#define i(a,z) {unsigned _n=a;ii=-1;W(++i<_n){z;}}
#define j(a,z) {unsigned _n=a;ij=-1;W(++j<_n){z;}}
#define l(a,e) _(typeof(e)e_=e;(a)<e_?(a):e_)
#define m(a,e) _(typeof(e)e_=e;(a)>e_?(a):e_)
#define n(z) i(nx,z)
#define o (sx)[i]
#define r(z,e) _(typeof(z)r=z;e;r)
#define t(t,x) ((U)(t)<<61|(x))
#define x(z,e) _(typeof(z)x=z;e)
#define B(i) ((char)(i)>I0)
#define C(t,x) bu(convertvector)(x,t)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,uf,Ua,Ux)
#define I(f) bu(ia32_##f##256)
#define KX(z) _x(KN(nx,z))
#define N(z) TN(Tx,nx,z)
#define O ((V*)x)[i]
#define P(b,e) if(_(b))return _(e);
#define Q(z...) P(96==(z),96)
#define R(t,n,z)  r(T(t,n),z)
#define U(g,z,x...) static U g(x){return _(z);}
#define V(g,z,x...) static V g(x){return _(z);}
#define W(z) while(_(z))
#define v1($,z) f($,tx?_v($(  v_(x))):Tx?_(z):f1($,  x))
#define V1($,z) g($,tx?_v($(f,v_(x))):Tx?_(z):fr($,f,x))
#define bu(f) __builtin_##f
#define AN(f,s,x...) __attribute((naked))ZU f(x){asm(s);}
#define Ux U x
#define Vv V v
#define Va V a
#define Vb V b
#define _W(z) ii=nx;W(i--)_(z);
#define Ui(g,z) U(g,z,ii)
#define Us(g,z) U(g,z,ss)
#define Zs(g,e,x...) static char*g(x){return _(e);}
#define _R(t,n,z) _x(R(t,n,z))
#define TX(t,z) _x(TN(t,nx,z))
#define n5(z) i(31+n>>5,z)
#define nb(z) bu(popcountl)(z)
#define ib(z) bu(ctzl)(z)
#define lb(z) bu(clzl)(z)
#define a3(t) $3(f,t##a+t##x,t##a-t##x,t##a*t##x)
#define b3(a,x) $3(f-6,(a)<x,(a)>x,(a)==x)
#define bl(b,x,y) _(V _b=b;_b&(x)|~_b&(y))
#define B3(b,c,d,e,f,g) _N(bl(22>O,b,bl(c,d,bl(e,f,g))))
#define N6(z) i(63+nx>>6,z)
#define nS(g,z) U(g,z,in,ss)
#define _N(z) _x(N(z))
#define _a(z) r(z,_r(a))
#define _x(z) r(_(z),_r(x))
#define IU(a) r(ib(a),a&=a-1)
#define Z_(f,x...) static _ f[]={x};
#define Qx(f) Ux=f(s);Q(x)
#define Qs(e,s) P(e,err((U)__func__,(U)s))
#define QZ _(Qz(1)0)
#define ax a(x,xx)
#define Nx ((U)nx<<Lx)
#define xx *UX
#define mx (sx)[-6]
#define R_ UR[-1]
#define NX (31+Nx>>5)
#define ua ((u*)a)
#define ux (u*)x
#define ur (u*)r
#define si s[i]
#define xb (sx)[i/32]
#define Ca x(a,tx?cx:Cx)
#define Ia x(a,tx?ix:Ix)
#define Ea x(a,tx?ex:Ex)
#define ca x(a,cx)
#define AU r_(aU)
#define XU r_(xU)
#define UR ((U*)r)
#define UA ((U*)a)
#define UX ((U*)x)
#define Uu     C(U5,((u4*)x)[i])
#define _u (e5)C(u5,((U6*)x)[i])
#define u_ (e5)C(u5,((U6*)x)[i]>>32)
#define aU ((U*)a)[i]
#define rU ((U*)r)[i]
#define xU ((U*)x)[i]
#define na ((u*)a)[-1]
#define nr ((u*)r)[-1]
#define nx ((u*)x)[-1]
#define rc (sr)[i]
#define ru ((u*)r)[i]
#define xu ((u*)x)[i]
#define rV ((V*)r)[i]
#define aV ((V*)a)[i]
#define sr (char*)r
#define sa (char*)a
#define sx (char*)x
#define rx ((u*)x)[-2]
#define Tx (sx)[-5]
#define Bx (1==Tx)
#define tx (x>>61)
#define Cx O
#define Ix (u5)Cx
#define Ex (e5)Cx
#define ss char*s
#define cc char c
#define ee float e
#define uf unsigned f
#define ii unsigned i
#define ij unsigned j
#define ik unsigned k
#define im unsigned m
#define in unsigned n
#define it unsigned t
#define Ur U r
#define Ua U a
#define Un U n
#define _$ _ $
#define x_ (sx)[nx-1]
#define cx (char)x
#define px (128>x)
#define lx L[tx]
#define Lx L[Tx]
#define ix (unsigned)x
#define ex a(ix,*(float*)&a)
#define tU a(xU,ta)
#define nU a(xU,na)
#define sU a(xU,sa)
#define au x(a,xu)
#define pa x(a,px)
#define ta x(a,tx)
#define ia x(a,ix)
#define ea x(a,ex)
#define Ta x(a,Tx)
#define Na x(a,Nx)
#define Nr x(r,Nx)
#define au_ (i+1<na?((u*)a)[i+1]:nx)
#define Qz(e) Qs(e,"nyi")
#define Qr(e) Qs(e,"rank")
#define Qt(e) Qs(e,"type")
#define Qn(e) Qs(e,"count")
#define Qd(e) Qs(e,"domain")
#define IF(z,a) if(z){a;}else 
#define $3(z,a,b,c)       _(unsigned y=z;!y?_(a):1==y?_(b):_(c))
#define $4(z,a,b,c,d)     _(unsigned y=z;!y?_(a):1==y?_(b):2==y?_(c):_(d))
#define $5(z,a,b,c,d,e)   _(unsigned y=z;!y?_(a):1==y?_(b):2==y?_(c):3==y?_(d):_(e))
#define $6(z,a,b,c,d,e,f) _(unsigned y=z;!y?_(a):1==y?_(b):2==y?_(c):3==y?_(d):4==y?_(e):_(f))
#define C6(z,a,b,c,d,e,f) switch(z){case 0:{a;break;}case 1:{b;break;}case 2:{c;break;}case 3:{d;break;}case 4:{e;break;}default:{f;}}
U(_K,oo;0)Ui(tb,t(1,i))Ui(tc,t(2,i))Ui(ti,t(3,i))f(l2,64-lb(x-1))f(qr,Qr(1)0)f(av,1==nx?_v(x):x)f(qe,2==Tx&&32>x_%128)f(qf,!Tx&&qe(xx))U(ue,*(unsigned*)&e,ee)U(te,t(4,ue(e)),ee)
U(is,n5(Ua=b_(c==O);P(a,l(n,32*i+ib(a))))n,cc,in,V*x)g(ig,is(f,nx,sx))g(qg,nx>ig(f,x))Us(sl,ii=0;W(si)++i;i)nS(ns,R(2,n,dn(r,n,(U)s)))Us(xs,ns(sl(s),s))
Zs(ws,w_(2,(U)s,sl(s));s,ss)f(wc,w_(2,(U)&x,1))F(err,if(a)ws(sa);wc(58);ws(sx);wc(10);96)f(z4,64/4-lb(x)/4)U(eq,1-1e-6<e&&1+1e-6>e,ee)
f(_v,Q(x)_x(_i(0,x)))f(_n,_x(ti(nx)))
