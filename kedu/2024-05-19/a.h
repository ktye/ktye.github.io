#define l0 5
#define o(f) bu(ia32_##f##256)
#define s_(t,o) a(t##0,I(Nx,a=o##i(a,O))a=o##i(a,s(4,a));a=o##i(a,s(8,a));a=o##i(a,s(16,a));a=o##i(a,s(32,a)))[7]
#define S_(t,o) a(t##0,N(V##t v=O;v=o##i(v,s(4,v));v=o##i(v,s(8,v));v=o##i(v,s(16,v));v=o##i(v,s(32,v));a=a[7]+v))
#define ZU static U//abc.efg.ij.lmno..r.t...x..
#define ZV static V//ABC..FG.I....NOPQR.TUVW...
#define AV(n) __attribute((vector_size(1<<n),aligned(1)))
typedef char V AV(l0);typedef unsigned u,vu AV(l0-1),Vu AV(l0);typedef unsigned long(*_)(),U,U4 AV(4),VU AV(l0),UU AV(l0+1);typedef int Vi AV(l0);typedef float Ve AV(l0);
ZU _0(),r_(),z_(),_p(),a2(),wx(),w_(U,...),W,M[30],D[32],S[1<<10],*c=S+(1<<10);static Ve e0;static VU U0;static Vu u0,I2={0,1,2,3,4,5,6,7}; //,8,9,10,11,12,13,14,15};
ZV c0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31};//,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define e(_) ({_;})
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,uf,Ux)
#define B(v,a,b) ((v)&(a)|~(v)&(b)) //o(pblendvb)(a,b,v)
#define uf unsigned f
#define U(g,z,x...) ZU g(x){return e(z);}
#define V(g,z,x...) ZV g(x){return e(z);}
#define Ux U x
#define Va V a
#define Vb V b
#define VF(g,z) V(g,z,Va,Vb)
#define bu(f) __builtin_##f
#define i0(a,b) o(pshufb)(a,b)
#define i2(a,b) o(pshufd)(a,b)
U(b_,o(pmovmskb)(a),Va)U(b2,o(movmskps)(a),Va)VF(a0,B(I0/16==b/16,i0(a,b),i0(o(permvarsi)(a,4+I0/4),b)))V(sq,o(sqrtps)(a),Va)
VF(gg,o(vfmaddsubps)(a,i2(b,0xa0),(Ve)i2(a,0xb1)*(Ve)i2(b,0xf5)))g(X9,-f^bu(ia32_pclmulqdq128)((U4){x},~(U4){},0)[0])VF(li,o(pminud)(a,b))VF(mi,o(pmaxud)(a,b))
#define Zc static char
Zc*pP="23;2.3;2:3;\"23\"\n\
+-*sqr %sqrt &flip |flop <asc >desc =group ~ . !index @first ?nub  #count _floor ^order ,$\n+-*    %     &and  |or   <    >     =      ~ . !index @at    ?find #take  _drop  ^cut   ,$";
#define n0 (1L<<l0)
#define bI(z)    R(1,nx,I(Nx,rc=b2(e(z))))
#define bC(z)    R(1,nx,I(Nx,ru=b_(e(z))))
#define K(n,z)   R(0,n,i(x(r,nx),rU=e(z)))
#define L(t,n,z) R(t,n,I(x(r,Nx),rV=e(z)))
#define _(z) r(e(z),_r(x))
#define __(z) r(e(z),_r(x);_r(a))
#define a(z,y) e(typeof(z)a=z;y)
#define b(z) ((1l<<(z))-1)
#define c(z) _(cc[256];Ur=(U)c;ns(e(z)-(U)c,c))
#define i(a,z) {unsigned _n=a;ii=-1;W(++i<_n){z;}}
#define j(a,z) {unsigned _n=a;ij=-1;W(++j<_n){z;}}
#define l(a,z) e(typeof(z)e_=z;(a)<e_?(a):e_)
#define m(a,z) e(typeof(z)e_=z;(a)>e_?(a):e_)
#define n(z)   i(nx,z)
#define r(z,y) e(typeof(z)r=z;y;r)
#define t(t,x) ((U)(t)<<61|(x))
#define x(z,y) e(typeof(z)x=z;y)
#define A() (_&&23<j?_+j-24:D+j)
#define C(t,x) bu(convertvector)(x,t)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,uf,Ua,Ux)
#define I(n,z) i(n0-1+(n)>>l0,z)
#define N(z) L(Tx,nx,z)
#define O ((V*)x)[i]
#define P(b,z) if(e(b))return e(z);
#define Q(z...) P(96==(z),96)
#define R(t,n,z)  r(T(t,n),z)
#define W(z) while(e(z))
#define BL(b,c,d,e,f,g) _N(B(127<O,b,B(c,d,B(e,f,g))))
#define _N(z)     _(N(z))
#define _K(n,z)   _(K(n,z))
#define _R(t,n,z) _(R(t,n,z))
#define _T(t,z)   _(L(t,nx,z))
#define q3(o) Qd(1!=f&&10!=f&&1<f-5)f-=5;P(Bx,o(f,x))Qz(2!=Lx)
#define ai(a,b) (a)+(b)
#define v1($,z) f($,tx?e(Q(x=$(  v_(x)))_v(x)):Tx?e(z):f1($,  x))
#define V1($,z) F($,tx?e(Q(x=$(a,v_(x)))_v(x)):Tx?e(z):fr($,a,x))
#define AN(f,s,x...) __attribute((naked))U f(x){asm(s);}
#define _W(z) ii=nx;W(i--){z;}
#define Ui(g,z) U(g,z,ii)
#define Us(g,z) U(g,z,ss)
#define Zs(g,a,x...) static char*g(x){return e(a);}
#define nb(z) bu(popcountl)(z)
#define ib(z) bu(ctzl)(z)
#define lb(z) bu(clzl)(z)
#define a3(t) $3(f-1,t##a+t##x,t##a-t##x,t##a*t##x)
#define b3(a,x) $3(f-7,(a)<x,(a)>x,(a)==x)
#define N6(z) i(63+nx>>6,z)
#define nS(g,z) U(g,z,in,ss)
#define ve(g,z) U(g,z,ee)
#define IU(a) r(ib(a),a&=a-1)
#define Z_(f,x...) static _ f[]={x};
#define Qx(f) Ux=f(s);Q(x)
#define Qs(e,s) P(e,err((U)__func__,(U)s))
#define QZ e(Qz(1)0)
#define Nx tn(Tx,nx)
#define Uu     C(VU,((vu*)x)[i])
#define _u (Ve)C(Vu,((UU*)x)[i])
#define u_ (Ve)C(Vu,((UU*)x)[i]>>32)
#define Ix (Vu)Cx
#define Ex (Ve)Cx
#define Vv V v
#define ax a(x,xx)
#define xx (*UX)
#define mx sx[-6]
#define R_ UR[-1]
#define si s[i]
#define xb sx[i/32]
#define Ca x(a,tx?cx:Cx)
#define Ia x(a,tx?ux:Ix)
#define Ea x(a,tx?ex:Ex)
#define ca x(a,cx)
#define AU r_(aU)
#define XU r_(xU)
#define UR ((U*)r)
#define UA ((U*)a)
#define UX ((U*)x)
#define aU ((U*)a)[i]
#define rU ((U*)r)[i]
#define xU ((U*)x)[i]
#define na ((u*)a)[-1]
#define nx ((u*)x)[-1]
#define ac (sa)[i]
#define xc sx[i]
#define rc (sr)[i]
#define ru ((u*)r)[i]
#define xu ((u*)x)[i]
#define rV ((V*)r)[i]
#define aV ((V*)a)[i]
#define sr (char*)r
#define sa (char*)a
#define sx ((char*)x)
#define rx ((u*)x)[-2]
#define Tx sx[-5]
#define Bx (1==Tx)
#define tx (x>>61)
#define Cx O
#define ss char*s
#define cc char c
#define ee float e
#define ii unsigned i
#define ij unsigned j
#define ik unsigned k
#define im unsigned m
#define in unsigned n
#define it unsigned t
#define Ur U r
#define Ua U a
#define Un U n
#define oo w_(2,"oo\n",3)
#define x_ sx[nx-1]
#define Zu static u
#define S(f,i) static AN(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;ret",Ux,...)
AN(_start,"lea 8(%rsp),%rsi;call main")AN(ut,"rdtsc;shl $32,%rdx;or%rdx,%rax;ret")S(_w,0)S(w_,1)S(f_,2)S(_f,3)S(_l,4)S(m_,9)S(_k,60)U(OO,w_(2,"OO\n",3);_k(0))
Zc*_P,B=32;Zu A,M1=65535,N=1<<31,L[]={3,0,0,2,2,3},g=95<<23;static float E[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9};Ui(tb,t(1,i))Ui(tc,t(2,i))Ui(ti,t(3,i))f(l2,64-lb(x-1))
ve(ue,*(u*)&e)ve(te,t(4,ue(e)))ve(eq,1-1e-6<e&&1+1e-6>e)f(qe,2==Tx&&32>x_%128)f(qf,!Tx&&qe(xx))g(tn,1==f?7+x>>3:(x?:1)<<L[f])
Ui(g_,ij=N&i;j>>2|b(29)&m(g,i)-g)f(G_,g_(x)|g_(x>>32)<<30)Ui(_g,ij=i&b(29);j?N&i<<2|j+g:0)f(_G,_g(x)|_g(x>>30)<<32)f(z4,64/4-lb(x)/4)f(q0,10>x-48)f(qa,26>x-97)Us(sl,ii=0;W(si)++i;i)
Zs(ws,w_(2,(U)s,sl(s));s,ss)f(wc,w_(2,(U)&x,1))F(err,if(a)ws(sa);wc(58);ws(sx);wc(10);96)V(_b,Va=1<<I0%8&a0(U0+x,I0/8);1&0<a,Ux)V(s,Vb=I0-c;b<n0&a0(a,b),cc,Va)
ZU T();U(dn,I(n,rV=O)r+n,Ur,Un,Ux)U(is,I(n,Ua=b_(c==O);P(a,l(n,n0*i+ib(a))))n,cc,in,V*x)g(ig,is(f,nx,sx))g(qg,nx>ig(f,x))nS(ns,R(2,n,dn(r,n,(U)s)))Us(xs,ns(sl(s),s))

#define pt (px||tx)
#define ix ux
#define ia ua
#define cx (char)x
#define px (128>x)
#define lx L[tx]
#define Lx L[Tx]
#define ux (unsigned)x
#define ex a(ux,*(float*)&a)
#define au x(a,xu)
#define pa x(a,px)
#define ta x(a,tx)
#define ua x(a,ux)
#define ea x(a,ex)
#define Ta x(a,Tx)
#define Qz(e) Qs(e,"nyi")
#define Qr(e) Qs(e,"rank")
#define Qt(e) Qs(e,"type")
#define Qn(e) Qs(e,"count")
#define Qd(e) Qs(e,"domain")
#define $3(z,a,b,c)       e(unsigned y=z;!y?e(a):1==y?e(b):e(c))
#define $4(z,a,b,c,d)     e(unsigned y=z;!y?e(a):1==y?e(b):2==y?e(c):e(d))
#define $5(z,a,b,c,d,x)   e(unsigned y=z;!y?e(a):1==y?e(b):2==y?e(c):3==y?e(d):e(x))
#define $6(z,a,b,c,d,x,f) e(unsigned y=z;!y?e(a):1==y?e(b):2==y?e(c):3==y?e(d):4==y?e(x):e(f))
#define C6(z,a,b,c,d,e,f) switch(z){case 0:{a;break;}case 1:{b;break;}case 2:{c;break;}case 3:{d;break;}case 4:{e;break;}default:{f;}}
#define IF(z,a) if(z){a;}else //f(wi,r(x,cc[21];ss=c+20;*s=10;do*--s=48+x%10;W(x/=10);w_(2,s,c+21-s)))f(Y,wx(r_(x));x)
