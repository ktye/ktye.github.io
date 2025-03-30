#define D(i) __attribute((vector_size(1<<i),aligned(1)))
typedef char V D(4);typedef unsigned long(*_)(),U,U4 D(4),U5 D(5);typedef unsigned u,u3 D(3),u4 D(4),u5 D(5);typedef int i4 D(4);typedef float e4 D(4);
#define S(f,i) AN(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;ret",Ux,...)
#define _(e) ({e;})
#define a(z,e) _(typeof(z)a=z;e)
#define b(z) ((1l<<(z))-1)
#define c(z) _(cc[256];sd=c;z;ns(d-c,c))
#define e(g,z) U(g,z,ee)
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,uf,Ux)
#define h(g,z) U(g,z,ii)
#define i(a,z) {unsigned _n=a;ii=-1;W(++i<_n){z;}}
#define j(a,z) {unsigned _n=a;ij=-1;W(++j<_n){z;}}
#define k(n,z) R(0,n,i(nr,rU= _(z)))
#define l(a,e) _(typeof(e)e_=e;(a)<e_?(a):e_)
#define m(a,e) _(typeof(e)e_=e;(a)>e_?(a):e_)
#define n(z) i(nx,z)
#define o sx[i]
#define r(z,e) _(typeof(z)r=z;e;r)
#define s(g,z) U(g,z,ss)
#define t(t,x) ((U)(t)<<61|(x))
#define x(z,e) _(typeof(z)x=z;e)
#define B(i) ((char)(i)>I0)
#define C(t,x) bu(convertvector)(x,t)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,uf,Ua,Ux)
#define K(z) _x(k(nx,z))
#define N(z) TN(Tx,nx,z)
#define O ((V*)x)[i]
#define P(b,e) if(_(b))return _(e);
#define Q(z...) P(96==(z),96)
#define R(t,n,z)  r(T(t,n),z)
#define U(g,z,x...) Z(U,g,z,x)
#define V(g,z,x...) Z(V,g,z,x)
#define W(z) while(_(z))
#define Z(t,g,e,x...) static t g(x){return _(e);}
#define Zs(g,e,x...) static char*g(x){return _(e);}
#define bC(z)     R(1,nx,i(15+nx>>4,rh=b_(_(z))))
#define bI(z)     R(1,nx,i( 7+nx>>3,rc=B2(_(z))))
#define TN(t,n,z) R(t,n, i(15+Nr>>4,rV=   _(z)))
#define TX(t,z) _x(TN(t,nx,z))
#define _R(t,n,z) _x(R(t,n,z))
#define n4(z) i(15+n>>4,z)
#define nb(z) bu(popcountl)(z)
#define ib(z) bu(ctzl)(z)
#define lb(z) bu(clzl)(z)
#define vf($,z) f($,tx?_v($(  v_(x))):Tx?_(z):f1($,  x))
#define vg($,z) g($,tx?_v($(f,v_(x))):Tx?_(z):fr($,f,x))
#define S_(t) a((t##4){},N(t##4 r=O;r+=d(-4,r);a=r+d(-8,r)+a[3]))
#define s_(t) r((t##4){},i(NX,r+=O)r+=d(-4,r);r+=d(-8,r))[3]
#define lZ() r(~(u4){},i(NX,r=li(r,O))r=li(r,d(-4,r));r=li(r,d(-8,r)))[3]
#define mZ() r( (u4){},i(NX,r=mi(r,O))r=mi(r,d(-4,r));r=mi(r,d(-8,r)))[3]
#define a3(t) $3(f,t##a+t##x,t##a-t##x,t##a*t##x)
#define b3(a,x) $3(f-6,(a)<x,(a)>x,(a)==x)
#define B3(b,c,d,e,f,g) _N(bl(22>O,b,bl(c,d,bl(e,f,g))))
#define io(f) bu(ia32_##f)
#define AN(f,s,x...) __attribute((naked))ZU f(x){asm(s);}
#define bl(b,x,y) _(V _b=b;_b&(x)|~_b&(y))
#define N6(z) i(63+nx>>6,z)
#define nS(g,z) U(g,z,in,ss)
#define Vf(g,z) V(g,z,Va)
#define VF(g,z) V(g,z,Va,Vb)
#define _N(z) _x(N(z))
#define _a(z) r(z,_r(a))
#define _x(z) r(_(z),_r(x))
#define IU(a) r(ib(a),a&=a-1)
#define bu(f) __builtin_##f
#define Z_(f,x...) static _ f[]={x};
#define Qx(f) Ux=f(s);Q(x)
#define Qs(e,s) P(e,err((U)__func__,(U)s))
#define QZ _(Qz(1)0)
#define ax a(x,xx)
#define Nx ((U)nx<<Lx)
#define xx *UX
#define mx sx[-6]
#define R_ UR[-1]
#define NX (15+Nx>>4)
#define Vv V v
#define Va V a
#define Vb V b
#define ua ((u*)a)
#define ux (u*)x
#define ur (u*)r
#define si s[i]
#define xb sx[i/32]
#define IA x(a,tx?ix:IX)
#define Ca x(a,tx?cx:Cx)
#define Ia x(a,tx?ix:Ix)
#define Ea x(a,tx?ex:Ex)
#define ca x(a,cx)
#define XU r_(xU)
#define UR ((U*)r)
#define UA ((U*)a)
#define UX ((U*)x)
#define Uu     C(U4,((u3*)x)[i])
#define _u (e4)C(u4,((U5*)x)[i])
#define u_ (e4)C(u4,((U5*)x)[i]>>32)
#define IX ((u5*)x)[i]
#define aU ((U*)a)[i]
#define rU ((U*)r)[i]
#define xU ((U*)x)[i]
#define na ((u*)a)[-1]
#define nr ((u*)r)[-1]
#define nx ((u*)x)[-1]
#define rc sr[i]
#define rh ((short*)r)[i]
#define xh ((short*)x)[i]
#define ru ((u*)r)[i]
#define xu ((u*)x)[i]
#define rV ((V*)r)[i]
#define aV ((V*)a)[i]
#define sx ((char*)x)
#define rx ((u*)x)[-2]
#define Tx sx[-5]
#define Bx (1==Tx)
#define tx (x>>61)
#define Zc static char
#define Ze static float
#define Zu static unsigned
#define ZU static U 
#define ZV static V
#define Cx O
#define Ix (u4)Cx
#define Ex (e4)Cx
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
#define Ux U x
#define Un U n
#define _$ _ $
#define x_ sx[nx-1]
#define sd char*d
#define cx (char)x
#define px (128>x)
#define lx L[tx]
#define Lx L[Tx]
#define ix (u)x
#define ex eu(x)
#define tU a(xU,ta)
#define nU a(xU,na)
#define sU a(xU,sa)
#define au x(a,xu)
#define sa x(a,sx)
#define pa x(a,px)
#define ta x(a,tx)
#define ia x(a,ix)
#define ea x(a,ex)
#define Ta x(a,Tx)
#define Na x(a,Nx)
#define sr x(r,sx)
#define Nr x(r,Nx)
#define oo ws("oo\n")
#define xu_ (i+1<nx?((u*)x)[i+1]:na)
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
Zc*ws();ZU _z(),aA(),IB(),err(),ys(),w_(U,...),qq(),wx(),r_(),_0(),_1(),_k(U,...);int printf(const char*,...);Z(u,wi,printf("%d\n",n);n,in)f(Y,wx(r_(x));x)
