#define l0 5
#define s_(t,o) a(t##0,I(Nx,a=o##i(a,O))a=o##i(a,s(4,a));a=o##i(a,s(8,a));a=o##i(a,s(16,a));a=o##i(a,s(32,a)))[7]
#define S_(t,o) a(t##0,N(V##t v=O;v=o##i(v,s(4,v));v=o##i(v,s(8,v));v=o##i(v,s(16,v));v=o##i(v,s(32,v));a=a[7]+v))
#define ZU static U//abc.efg.ij.lmno..r.t...x..
#define ZV static V//ABC..FG.I....NOPQR.TUVW...
#define AV(n) __attribute((vector_size(1<<n),aligned(1)))
typedef char V AV(l0);typedef unsigned u,vu AV(l0-1),Vu AV(l0);typedef int Vi AV(l0);typedef float Ve AV(l0);typedef unsigned long long U,U4 AV(4),VU AV(l0),UU AV(l0+1),(*Uf)(U),(*UF)(U,U);
ZU w_(U,...),W,M[30],D[32],S[1<<10],*c=S+(1<<10);static Ve e0;static VU U0;static Vu u0,I2={0,1,2,3,4,5,6,7}; //,8,9,10,11,12,13,14,15};
ZV I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31};//,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define e(z) ({z;})
#define f(g,z) U(g,z,Ux)
#define g(g,z) U(g,z,uf,Ux)
#define uf unsigned f
#define U(g,z,x...) ZU g(x){return e(z);}
#define V(g,z,x...) ZV g(x){return e(z);}
#define Ux U x
#define Va V a
#define Vb V b
#define VF(g,z) V(g,z,Va,Vb)
#define AN(f,s,x...) __attribute((naked))U f(x){asm(s);}
#define bu(f) __builtin_##f
#define B(v,a,b) ((v)&(a)|~(v)&(b)) //o(pblendvb)(a,b,v)
#if __arm64
#define S(f,i) static AN(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,#8]\nsvc #0\nret",Ux,...)
AN(ut,"mrs x0,cntvct_el0\nret")S(w_,4)S(_w,3)S(f_,5)S(_f,6)S(_l,338)
V(sq,a,Va)
#else
#define S(f,i) static AN(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;ret",Ux,...)
AN(ut,"rdtsc;shl $32,%rdx;or%rdx,%rax;ret")AN(_start,"lea 8(%rsp),%rsi;call main")S(_w,0)S(w_,1)S(f_,2)S(_f,3)S(_l,4)S(m_,9)S(_k,60)
#define o(f) bu(ia32_##f##256)
g(X9,-f^bu(ia32_pclmulqdq128)((U4){x},~(U4){},0)[0])U(b_,o(pmovmskb)(a),Va)U(b2,o(movmskps)(a),Va)V(sq,o(sqrtps)(a),Va)VF(li,o(pminud)(a,b))VF(mi,o(pmaxud)(a,b))VF(mb,o(pmaxub)(a,b))
VF(a0,B(I0/16==b/16,o(pshufb)(a,b),o(pshufb)(o(permvarsi)(a,4+I0/4),b)))VF(gg,o(vfmaddsubps)(a,o(pshufd)(b,0xa0),o(pshufd)(a,0xb1)*o(pshufd)(b,0xf5)))
#endif
#define Zc static char
Zc*PP="+-*    %     &and  |or   <    >     =      ~ . !index @at    ?find #take  _drop  ^cut   ,$\n+-*sqr %sqrt &flip |flop <asc >desc =group ~ . !index @first ?nub  #count _floor ^order ,$";
#define n0 (1LL<<l0)
#define bI(z)    R(1,nx,I(Nx,rc=b2(e(z))))
#define bC(z)    R(1,nx,I(Nx,ru=b_(e(z))))
#define K(n,z)   R(0,n,i(x(r,nx),rU=e(z)))
#define L(t,n,z) R(t,n,I(x(r,Nx),rV=e(z)))
#define _(z) r(e(z),_r(x))
#define __(z) r(e(z),_r(x);_r(a))
#define a(z,y) e(typeof(z)a=z;y)
#define b(z) ((1LL<<(z))-1)
#define c(z) _(cc[1<<18];Ur=(U)c;ns(e(z)-(U)c,c))
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
#define D(z) (10>(z)-48)
#define F(g,z) U(g,z,Ua,Ux)
#define G(g,z) U(g,z,uf,Ua,Ux)
#define I(n,z) i(n0-1+(n)>>l0,z)
#define N(z) L(Tx,nx,z)
#define O ((V*)x)[i]
#define P(b,z) if(e(b))return e(z);
#define Q(z...) P(96==(z),96)
#define R(t,n,z)  r(T(t,n),z)
#define W(z) while(e(z))
#define _O ((V*)(x-1))[i]
#define O_ ((V*)(x+1))[i]
#define BL(a,b,c,d,e) _N(B(a,b,B(c,d,e)))
#define _N(z)     _(N(z))
#define _K(n,z)   _(K(n,z))
#define _R(t,n,z) _(R(t,n,z))
#define _T(t,z)   _(L(t,nx,z))
#define q3(o) Qd(1!=f&&10!=f&&1<f-5)f-=5;P(Bx,o(f,x))Qz(2!=Lx)
#define ai(a,b) (a)+(b)
#define v1($,z) f($,tx?e(Q(x=$(  v_(x)))_v(x)):Tx?e(z):f1($,  x))
#define V1($,z) F($,tx?e(Q(x=$(a,v_(x)))_v(x)):Tx?e(z):fr($,a,x))
#define _W(z) ii=nx;W(i--){z;}
#define Ui(g,z) U(g,z,ii)
#define Us(g,z) U(g,z,ss)
#define Zs(g,a,x...) static char*g(x){return e(a);}
#define nb(z) bu(popcountll)(z)
#define ib(z) bu(ctzll)(z)
#define lb(z) bu(clzll)(z)
#define a3(t) $3(f-1,t##a+t##x,t##a-t##x,t##a*t##x)
#define b3(a,x) $3(f-7,(a)<x,(a)>x,(a)==x)
#define N6(z) i(63+nx>>6,z)
#define nS(g,z) U(g,z,in,ss)
#define ve(g,z) U(g,z,ee)
#define IU(a) r(ib(a),a&=a-1)
#define Zf(f,x...) static Uf f[]={x};
#define ZF(f,x...) static UF f[]={x};
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
#define xb ((u*)x)[i/32]
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
Zc*_P,B=32;Zu A,M1=65535,N=1<<31,L[]={3,0,0,2,2,3},g=95<<23;static float E[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9};Ui(tb,t(1,i))Ui(tc,t(2,i))Ui(ti,t(3,i))f(l2,64-lb(x-1))
ve(ue,*(u*)&e)ve(te,t(4,ue(e)))ve(eq,1-1e-6<e&&1+1e-6>e)f(qe,2==Tx&&32>x_%128)f(qf,!Tx&&qe(xx))g(tn,1==f?7+x>>3:(x?:1)<<L[f])U(OO,w_(2,"OO\n",3);_k(0))
Ui(g_,ij=N&i;j>>2|b(29)&m(g,i)-g)f(G_,g_(x)|g_(x>>32)<<30)Ui(_g,ij=i&b(29);j?N&i<<2|j+g:0)f(_G,_g(x)|_g(x>>30)<<32)f(z4,64/4-lb(x)/4)f(q0,10>x-48)f(qa,26>x-97)Us(sl,ii=0;W(si)++i;i)
Zs(ws,w_(2,(U)s,sl(s));s,ss)f(wc,w_(2,(U)&x,1))F(err,if(a)ws(sa);wc(58);ws(sx);wc(10);96)V(_b,Va=1<<I0%8&a0(U0+x,I0/8);1&0<a,Ux)V(s,Vb=I0-c;b<n0&a0(a,b),cc,Va)
ZU T(u,U),wx(U);U(dn,I(n,rV=O)r+n,Ur,Un,Ux)U(is,I(n,Ua=b_(c==O);P(a,l(n,n0*i+ib(a))))n,cc,in,V*x)g(ig,is(f,nx,sx))g(qg,nx>ig(f,x))nS(ns,R(2,n,dn(r,n,(U)s)))Us(xs,ns(sl(s),s))
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
#define IF(z,a) if(z){a;}else //
ZU r_(U);f(wi,r(x,cc[21];ss=c+20;*s=10;do*--s=48+x%10;W(x/=10);w_(2,s,c+21-s)))f(Y,wx(r_(x));x)
g(_M,W-=1<<f;xx=M[f];M[f]=x)Ui(M_,Ux=M[i];x?(W+=1<<i,M[i]=xx,x):30>i?_M(i,M_(i+1))+(2*n0<<i):OO())f(_r,pt?x:M1&rx?(--rx,x):e(if(!Tx)n(_r(xU))_M(mx,x-n0);x))f(r_,pt?x:M1&++rx?x:OO())
g(T,ii=l2(n0+tn(f,x))-l0-1;r(M_(i)+n0,R_=i<<16|f<<24|x<<32))f(gi,in=ux;R(3,n,i(n,ru=i)))f(ge,in=ux;R(4,n,i(n,ru=ue((i+.5)/n))))f(gE,in=ux;K(n,Ua=ue((i+.5)/n)<<32;R(5,n,i(n,rU=a|ue((i+.5)/n)))))
g(a_,ii=f;t(Tx,$6(Tx,XU,1&xb>>i%32,xc,xu,xu,G_(xU))))U(f1,_K(nx,$(a_(i,x))),Uf $,Ux)U(fr,_K(nx,$(a,a_(i,x))),UF $,Ua,Ux)
F(dx,if(!Tx)n(XU)Un=Nx;ij=b(l0)&n;a=dn(a,n-=j,x);x+=n;i(j,ac=xc)a+j)F(V_,__(R(Ta,na+nx,dx(dn(r,x(a,Nx),a),x))))g(sS,in=f?nx:0;ij;n(Ua=xU;n+=j=na)_R(a(xx,Ta),n,Ua=r;n(a=dx(a,xU);if(f)(*sa=f,++a))))
f(v_,R(tx,1,*UR=5==tx?_G(x):x))f(_v,_(a_(0,x)))U(ln,R(Tx,n,dn(r,(U)n<<Lx,x+((int)i<<Lx))),ii,in,Ux)F(_V,__(K(na,ln(au,(i+1<na?((u*)a)[i+1]:nx)-au,x))))Ui(c1,v_(tc(i)))g(vc,V_(x,c1(f)))
nS(i$,48>*s?-i$(n-1,s+1):r(0,i(n,r=si%16+10*r)))nS(e$,P(48>*s,N|e$(n-1,s+1))ii=is(101,n,s);ue(n>i?i$(i,s)*E[s[i+1]%16]:n>(i=is(46,n,s))?(n-=i+1,(i$(i,s)*E[n]+i$(n,s+i+1))/E[n]):i$(n,s)))
Ui($i,N&i?1|$i(-i)<<4:r(0LL,do r=r<<4|4+i%10;W(i/=10)))ve($e,0>e?1|$e(-e)<<4:1e-9>e?4:1e9<e?52:1>e?3|$e(1/e)<<4:eq((int)e/e)?$i(e):x($i(.5+1e4*e),in=z4(x)-4<<2;2<<n|b(n)&x|(~b(n)&x)<<4))
g(t_,x=f-1>Tx?t_(f-1,x):x;$4(f-2,_N(_b(xu)),x,_T(4,C(Ve,(Vi)Ix)),_T(5,Uu)))v1(_t,3>Tx?_N(O+(26>O-65&32)):_T(Tx-1,5>Tx?C(Vi,Ex):sq(_u*_u+u_*u_)))g(T_,tx?t(f,$3(f-3,ux,ue((int)ux),G_(4>tx?(u)T_(4,x):ux))):t_(f,x))
g(v0,_T(f,_u))f(vk,Q(x)it=a(xx,ta);P(!t,x)n(Ua=xU;P(t!=ta,x))Qz(2!=L[t])v0(t,x))g(nz,Vv=1==tx?ux?~u0:u0:3>tx?cx+(V){}:5>tx?u0+ux:U0+_G(x);L(tx,f,v))
v1(uu,P(4<Tx,_T(4,u_))x=4>Tx?t_(4,x):x;_T(5,Uu<<32))v1(no,_($3(Tx-1,N(~Ix),bC(33>O),bI(0==Ix))))V1(j4,Qt(4<Tx)x=4>Tx?t_(4,x):x;_N(sq(Ex)))V1(d_,Qz(3!=Tx)_N(Ix/ua))V1(_d,Qz(3!=Tx)_N(Ix%ua))
f(sb,ii=nx/64;if(nx%64)xU&=b(nx%64);r(0,N6(r+=nb(xU))))f(n_,_R(3,sb(x),u*s=sr;N6(Ua=xU;j(nb(a),*s++=64*i+IU(a)))))f(Ss,Ua=ln(-1,nx,x);cc=*sa=x_;a=x(a,_(bC(c==O)));a=n_(a);x=_V(a,x);n(Ua=xU;(sa)[--na]=0)x)
Us(lf,it[36];!_l((U)s,(U)t)&&1&t[A?1:6]>>15?t[A?24:12]:0)Us(_1,in=lf(s);Qs(!n,s);ii=f_((U)s,0);R(2,n,_w(i,(U)sr,n);_f(i)))Us(_0,Qx(_1)Qd(10!=x_)ii=59==sx[nx-2];if(i)I(--nx,O=mb(B+(V){},O))Ss(x))
g(bo,in=sb(x);_(2>f?tb(f?0<n:n==nx):ti(n)))g(bs,Un=0;_R(1,nx,N6(rU=n=X9(n>>63,xU))))g(bp,Un=0;_R(1,nx,N6(Ua=xU;n|=a<<1;rU=f?$6(f-5,a&n,a|n,~a&n,a&~n,0,a^n):n;n=a>>63)))f(d,bp(10,x))
g(fo,q3(bo)Qz(!f)ii=nx/8;if(nx%8)O=B(nx%8>I2,O,f?u0:~u0);_(t(Tx,$3(f,s_(u,l),s_(u,m),3==Tx?s_(u,a):ue(s_(e,a))))))g(fs,q3(bs)_(3==Tx?S_(u,a):S_(e,a)))
G(aA,Qz(2>f-5)7>f?N($3(Tx-3,a3(I),4>f?a3(E):Ea/Ex,Ve v=ta?U0+_G(a):Ea;$3(f-1,v+Ex,v-Ex,gg(v,Ex)))):3>Tx?bC(b3(Ca,Cx)):bI(b3(Ia,Ix)))
G(aa,5>f?4>tx?ti(a3(i)):te(4>f?a3(e):ea/ex):t(7>f?tx:1,$3(f-5,l(ua,ux),m(ua,ux),b3(ua,ux))))f(ff,P(tx?:Tx,uu(x))QZ)
g(fp,P(Bx,bp(f,x))Ua=6>f-1?xx:0;IF(f,Ur=x-(1<<Lx);Un=R_;R_=UX[-1];x=_(aA(f,x,r));R_=n)x=_(ln(-1,nx,x));ii=0;$3(Tx-1,xc&=254,xc=a,xu=a);x)
G(p3,Qd(!pa)P(18==a,Qr(1-f||Tx)sS(0,x))$3(f,fp,fo,fs)(a,x))f(wd,n_(no(fp(8,x))))
F(C_,a=ta?v_(a):a;x=tx?v_(x):x;Qz(Bx)V_(Tx>Ta?t_(Tx,a):a,Ta>Tx?t_(Ta,x):x))F(Ll,C_(a,v_(x)))F(_C,Qr(ta||tx)Qt(3!=Ta||Bx)_V(a,x))F(mm,QZ)F(No,QZ)F(Dt,QZ)f(dt,QZ)
G(NN,Qr(!ta||tx)P(1==nx,x=_v(x);tx?nz(ua,x):_K(ua,r_(x)))Qn(ua>nx)_(ln(f?ua:0,f?nx-ua:ua,x)))f(rr,Qz(2!=Tx)_R(2,nx,n(rc=sx[nx-1-i])))f(qr,Qr(1)0)f(ty,t(3,pt?tx:Tx))g(LMS,QZ)F(N_,Qt(3!=ta)_d(ua,x))
ZU z_(U*,U),_p(U),a2(u,U,U),ps(char*),zs(char*);G(e2,_K(nx,a2(f,ta?a:AU,tx?x:XU)))
G(jJ,ii=ta?:Ta;ij=tx?:Tx;P(!i||!j,e2(f,a,x))it=m(4>f?3:5>f?4:1,m(i,j));a=t>i?T_(t,a):a;x=t>j?T_(t,x):x;P(tx,Qz(!ta)5>tx?aa(f,a,x):_v(jJ(f,a,v_(x))))__(aA(f,a,x)))
F(A_,Qt(3!=tx)a_(ux,a))F(_A,QZ)G(AA,P(2==ta,ij=a-101;Qd(3==f)j4(f+2*j,x))ta?f&&3==ta?d_(a,x):jJ(3,f?te(1/ea):a,x):qf(a)?z_(&x,a):!tx&&(!Tx||4==Tx)?mm(a,x):(f?A_:_A)(a,x))
f(or,QZ)f(ou,Q(x=or(x))Qt(Bx||2<Lx)A_(x,wd(x)))f(_o,QZ)f(o_,QZ)f(og,QZ)f(_n,_(ti(nx)))
f($,px?c1(_P[x]):tx?lx?a($3(tx-3,$i(ux),$e(ex),x=_G(x);Ua=$e(ex);x>>=32;a|(14|$e(ex)<<4)<<4*z4(a)),Vv=44+(15&a0(*(V*)&a,I0/2)>>I0%2*4);ns(z4(a),&v)):$(v_(x)):$3(Tx-1,_T(2,48+_b(xu)),10!=x_&&qe(x)?_p(x):x,f1($,x)))
Us(os,P(!*s||39==*s,0)Qx(zs)x?wx(x):0)Us(ls,Qx(_0)n(Ua=xU;Q(na?os(sa):_(96)))_(0))g(ts,Q(x)Ua=ut();i(f,Q(_r(z_(0,x))))_(ti(((ut()-a)/(A?2.4e3:2.4e6)-f/2e5))))
Us(ys,
$6(is(*s,5,"\\ltvw"),_k(0),ls(s+2),ii=is(B,20,s);si=0;ts(i?zs(s+2):1,ps(s+i+1)),QZ,ti(W),Qd(*s)xs(PP)))

f(_z,pt||!Lx?$(x):qf(x)?$(_v(x)):sS(B,f1(_z,x)))f(wx,x=sS(10,px||tx||Tx||qf(x)?v_(_z(x)):f1(_z,x));w_(2,x,nx);_(0))
ZU h4(U),pr(U),o3(u,U,U);
Zf(h,ff,qr,qr,qr,qr,no,dt,gi,qr,qr,gE,_t,ge,v_,h4)Zf(H,ff,rr,_o,o_,og,no,dt,n_,_v,ou,_n,_t,or,v_,$)G(i3,P(2==Tx,x=vc(0,x);_((ua?_1:_0)(sx)))QZ)G(c3,$3(f,QZ,Qr(Tx)sS(a,x),Qr(!Tx)Ss(vc(a,x))))
g(a1,P(20>f,Qr(px&&17>f-1)$6(f,x,3==tx?++x:jJ(1,ti(1),x),3==tx?--x:jJ(1,ti(-1),x),jJ(3,r_(x),x),j4(-1,x),(tx?h:H)[f-5](x)))LMS(f-20,x))ZF(G,No,Dt,N_,0,0,0,0,_C,C_,0)
G(a2,P(20>f,P(!f,Ll(a,x))P(pa||px,Qr(13!=f)a1(a,x))10>f?jJ(f,a,x):4>f-13?(15>f?AA:NN)(1&f-1,a,x):G[f-10](a,x))Qz(29>f)Qr(tx)f-=29;!f&&9>a-11?vk(f1(H[a-5],x)):$3(ta-2,c3,i3,pa?p3:o3)(f,a,x))
U(v,_r(*_);*_=x,U*_,Ux)U(z_,Ua=x;x=xx;Ur;_W(ij=xc%32;Q(r=*c=$5(xc/32,--c;20>j?j:ti(j-20),j?a1(j,r):(--i,j=xc%32,r_(v(A(),r))),a2(j,r,*++c),--c;r_(*A()),--c;a_(j,a))))*c++,U*_,Ux)
