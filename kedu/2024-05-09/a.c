#include"a.h"//(c)2024 arthur whitney(l)MIT
Zc*P="+-*sqr %sqrt &flip |flop <asc >desc =group ~ . !index @first ?nub  #count _floor ^order ,$\n+-*    %     &and  |or   <    >     =      ~ . !index @at    ?find #take  _drop  ^cut   ,$";
ZU z(),MO,W,M[32],D[32],S[99],*c=S+99;Zu M1=65535,N=1<<31,L[]={3,0,0,2,2,3},g=95<<23;Ze E[]={1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9};ZV I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
h(g_,(N&i)>>2|b(29)&m(g,i)-g)f(G_,g_(x)|g_(x>>32)<<30)h(_g,ij=i&b(29);j?N&i<<2|j+g:0)f(_G,_g(x)|_g(x>>30)<<32)e(ue,*(unsigned*)&e)Z(float,eu,*(float*)&i,ii)f(qf,!Tx&&a(xx,2==Ta))
//syscall avx2 nostdlib
void _start(){asm("lea 8(%rsp),%rsi;call main");}void*memcpy(void*r,const void*x,U n){i(n,rc=o)return r;}void*memset(void*r,int c,U n){i(n,rc=c)return r;}
AN(ut,"rdtsc;shl $32,%rdx;or%rdx,%rax;ret")S(_w,0)S(w_,1)S(f_,2)S(_f,3)S(_l,4)S(m_,9)S(_k,60)s(lf,it[36];!_l((U)s,(U)t)&&1&t[MO?1:6]>>15?t[MO?24:12]:0)f(mf,m_(0,x,3,MO?0x52:0x4022,0,0))
U(b_,io(pmovmskb128)(v),Vv)U(b2,io(movmskps)(v),Vv)U(B2,io(movmskps256)(v),u5 v)Vf(sq,io(sqrtps)(a))VF(a4,io(pshufb128)(a,b))VF(li,io(pminud128)(a,b))VF(mi,io(pmaxud128)(a,b))
Vf(ba,io(pshufd)(a,0xa0+0x11))VF(gg,io(vfmaddsubps)(a,io(pshufd)(b,0xa0),(e4)ba(a)*(e4)io(pshufd)(b,0xa0+0x55)))V(A2,io(vpermi2varps128)(a,v,b),Va,Vv,Vb)
V(a5,r((V){},i(2,r|=16>v-(char)(i<<4)&a4(_[i],v))),V*_,Vv)V(_b,1&0<(1<<I0%8&a4(x-(U4){},I0/8)),Ux)V(d,a4(v,I0+(char)i),ii,Vv)
//memcpy memchr
U(ds,n4(aV=O)a+n,Ua,Ux,Un)U(is,n4(Ua=b_(c==s[i]);P(a,l(n,16*i+ib(a))))n,V*s,cc,in)g(ig,is(sx,f,nx))g(qg,nx>ig(f,x))h(tb,t(1,i))h(tc,t(2,i))h(ti,t(3,i))e(te,t(4,ue(e)))f(l2,64-lb(x-1))
//malloc free
g(_M,W-=1<<f;xx=M[f];M[f]=x)h(M_,Ux=M[i];P(x,W+=1<<i;M[i]=xx;x)if(30<i)_k((U)oo);_M(i,M_(i+1))+(32L<<i))g(T,ii=l2(23+(1==f?x/8:x<<L[f]));r(16+M_(i),R_=i<<16|f<<24|x<<32))
f(_r,P(px||tx,x)P(M1&rx,--rx;x)if(!Tx)n(_r(xU))_M(mx,x-16);x)f(r_,P(px||tx,x)P(M1&++rx,x)_k(2))F(dx,if(!Tx)n(XU)ds(a,x,Nx))f(cp,M1&rx?(--rx,R(Tx,nx,dx(r,x))):x)
g(_i,ii=f;t(Tx,$6(Tx,XU,1&xb>>i%32,o,xu,xu,G_(xU))))G(i_,ii=f;$6(Tx,xU=a,a?xb|=1<<i%32:(xb&=~1<<i%32),o=a,xu=a,xu=a,xU=_G(a));x)U(f1,K($(_i(i,x))),_$,Ux)U(fr,K($(f,_i(i,x))),_$,uf,Ux)
//convert
g(t_,x=f-1>Tx?t_(f-1,x):x;$4(f-2,_N(_b(xh)),x,TX(4,C(e4,(i4)Ix)),TX(5,Uu)))f(_t,5>Tx?TX(3,C(i4,Ex)):TX(4,_u))g(T_,tx?t(f,f>3&&4>tx?ue((int)ix):ix):t_(f,x))
//,^!
F(C_,_a(_R(Ta,na+nx,dx(dx(r,a),x))))g(sS,in=f?nx:0;ij;n(n+=j=nU)_R(a(xx,Ta),n,sd=sr;n(d=(char*)dx((U)d,xU);if(f)*d++=f)))f(v_,R(tx,1,*UR=5==tx?_G(x):x))h(c1,R(2,1,*sr=i))
U(_c,R(Tx,n,ds(r,x+((int)i<<Lx),(U)n<<Lx)),ii,in,Ux)F(c_,_a(R(Ta,na+1,dx(r,a);i_(nr-1,x,r))))f(_v,_x(_i(0,x)))F(p0,i_(0,a,_c(-1,nx,x)))F(_C,_a(K(_c(xu,xu_-xu,a))))
F(V_,Qr(ta||tx)Qt(3!=Ta||Bx)_C(x,a))F(_V,a=ta?v_(a):a;x=tx?v_(x):x;Qz(Bx)C_(Tx>Ta?t_(Tx,a):a,Ta>Tx?t_(Ta,x):x))F(Ap,_V(a,v_(x)))
f(Ss,Ua=p0(x_,x);x=_C(x,IB(_a(aA(8,tc(x_),a))));n(Ur=xU;sr[--nr]=0)x)G(i3,Qz(f)P(2==Tx,x=c_(x,0);_x((ia?_1:_0)(sx)))QZ)G(c3,$3(f,QZ,Qr(Tx)sS(a,x),Qr(!Tx)Ss(c_(x,a))))
s(_1,in=lf(s);Qs(!n,s);ii=f_((U)s,0);R(2,n,_w(i,(U)sr,n);_f(i)))s(_0,Qx(_1)Qd(10!=x_)Ss(x))f(wx,x=sS(10,px||tx||Tx||qf(x)?v_(_z(x)):f1(_z,x));w_(2,x,nx);_x(0))
//n# [!?^#]n
g(nz,Vv=3>tx?cx+(V){}:5>tx?ix+(u4){}:_G(x)+(U4){};TN(tx,f,v))f(n_,R(3,x,i(nr,ru=i)))f(gd,R(4,x,i(nr,ru=ue(1.f*i/x))))f(Gd,k(x,Ua=(U)ue(1.f*i/x)<<32;R(5,x,i(nr,rU=a|ue(1.f*i/x)))))f(ra,0)
nS(ns,R(2,n,ds(r,(U)s,n)))G(NN,Qz(!ta)P(tx,nz(ia,x))P(1==nx,Tx?nz(ia,_v(x)):_x(k(ia,_i(0,x))))Qn(ia>nx)_x(_c(f?ia:0,f?nx-ia:ia,x)))f(z4,64/4-lb(x)/4)e(eq,1-1e-6<e&&1+1e-6>e)
s(sl,ii=0;W(si)++i;i)s(xs,ns(sl(s),s))Zs(ws,w_(2,(U)s,sl(s));s,ss)f(wc,w_(2,(U)&x,1))F(err,if(a)ws(sa);wc(58);ws(sx);wc(10);96)g(prr,wx(x);wx(c_(nz(f,tc(32)),'^'));96)
//$ -./09:
h($i,N&i?1|$i(-i)<<4:r(0l,do r=r<<4|4+i%10;W(i/=10)))e($e,0>e?1|$e(-e)<<4:1e-9>e?4:1e9<e?52:1>e?3|$e(1/e)<<4:eq((int)e/e)?$i(e):x($i(.5+1e4*e),in=z4(x)-4<<2;2<<n|b(n)&x|(~b(n)&x)<<4))
f($t,x=$3(tx-3,$i(ix),$e(ex),x=_G(x);Ua=$e(ex);x>>=32;a|(14|$e(ex)<<4)<<4*z4(a));Vv=44+(15&a4(*(V*)&x,I0/2)>>I0%2*4);ns(z4(x),&v))f($b,TX(2,32+14*_b(xh)))f(av,1==nx?_v(x):x)
nS(i$,48>*s?-i$(n-1,s+1):r(0,i(n,r=si%16+10*r)))nS(e$,P(48>*s,N|e$(n-1,s+1))ii=is(s,101,n);ue(n>i?i$(i,s)*E[s[i+1]%16]:(i=is(s,46,n),n>i?_(n-=i+1;i$(i,s)*E[n]+i$(n,s+i+1))/E[n]:i$(n,s))))
nS(t$,Ux=Ss(c_(ns(n,s),32));it=0;n(t=m(t,qg(58,xU)?2:qg(46,xU)||qg(101,xU)))av(_R(t+3,nx,IF(2>t,n(ru=(t?e$:i$)(nU,sU)))n(in=is(sU,58,nU);rU=G_(e$(n,sU)|e$(nU-n-1,sU+n+1)<<32)))))
//[+-..]'\/
f(sb,ii=nx/64;ij=nx%64;if(j)xU&=b(j);r(0,N6(r+=nb(xU))))f(IB,_R(3,sb(x),u*s=sr;N6(Ua=xU;j(nb(a),*s++=64*i+IU(a)))))g(fs,Qz(1<f)3==Tx?S_(i):S_(e))
g(bo,in=sb(x);_x(f?tb(n==nx):ti(n)))g(bp,Un=0;_R(1,nx,N6(Ua=xU;n|=a<<1;rU=f?$6(f-5,a&n,a|n,~a&n,a&~n,~(a^n),a^n):n;n=a>>63)))g(bs,QZ)vg(d_,Qz(3!=Tx)_N(Ix/f))vg(_d,Qz(3!=Tx)_N(Ix%f))
vf(ab,Qt(5>Tx)TX(4,_u*_u+u_*u_))vf(uu,P(4<Tx,TX(4,u_))x=4>Tx?t_(4,x):x;TX(5,Uu<<32))vf(no,Qz(!Bx)_N(~Ix))vf(fl,Qt(Bx)2==Tx?_N(O+(26>O-65&32)):_t(x))vg(j4,Qt(4<Tx)x=4>Tx?t_(4,x):x;_N(sq(Ex)))
G(aA,1<f&&4<Tx?N(gg(ta?_G(a)+(U4){}:Ea,Ex)):4>f?4>Tx?N(a3(I)):2<f?N(Ea/Ex):TN(Tx,nx,a3(E)):3>Tx?bC(b3(Ca,Cx)):bI(b3(IA,IX)))G(aa,4>f?4>tx?ti(a3(i)):te(2<f?ea/ex:a3(e)):tb(b3(ia,ix)))
g(fo,$3(f-5,lZ(),mZ(),ii=nx/4;if(nx%4)O&=B(nx%4*4);3==Tx?s_(i):ue(s_(e))))g(fp,Ur=x-(1<<Lx);Ua=R_;R_=UX[-1];x=aA(f,x,r);R_=a;x)f(vk,it=a(xx,ta);P(!t,x)n(P(t!=tU,x))Qz(2!=L[t])TX(3,_u))
G(jJ,ii=ta?:Ta;ij=tx?:Tx;P(!i||!j,Qz(!ta)K(jJ(f,a,XU)))it=m(3>f?3:4>f?4:1,m(i,j));a=t>i?T_(t,a):a;x=t>j?T_(t,x):x;P(tx,Qz(!ta)5==tx?_v(jJ(f,a,v_(x))):aa(f,a,x))_a(_x(aA(f,a,x))))
U(e1,Qn(!nx)Q(x=f1($,x))vk(x),_$,Ux)G(p3,Qd(!pa)P(1==f&&18==a,Qr(Tx)sS(0,x))P(Bx,$3(f,bp,bo,bs)(a,x))Qt(2!=Lx)_x($3(f,a--?fp(a,x):p0(0,x),t(Tx,fo(a,x)),fs(a,x))))
//@?~. ^?<>=
F(A_,Qt(3!=tx)_i(ix,a))F(_A,QZ)F(mm,QZ)f(at,Qr(tx)_v(x))F(No,QZ)F(Dt,QZ)f(dt,QZ)f(up,QZ)f(wd,IB(no(fp(8,x))))f(un,Q(x=up(x))Qt(Bx||2<Lx)A_(x,wd(x)))f(_o,QZ)f(o_,QZ)f(gr,QZ)
G(AA,ta?2==ta?_(ij=a-101;Qd(3==f)j4(f+2*j,x)):f&&3==ta?d_(f,x):jJ(2,f?te(1/ea):a,x):qf(a)?z(&x,a):!tx&&(!Tx||4==Tx)?mm(a,x):(f?A_:_A)(a,x))f(ty,ti(tx?:Tx))
f(ff,P(tx?:Tx,uu(x))QZ)f(rr,Qr(tx)Qz(2!=Tx)_R(2,nx,n(rc=sx[nx-1-i])))F(Bg,Qt(3!=ta)_d(ia,x))f(bg,tx?n_(ix):IB(x))f(nu,tx?ra(ix):un(x))f(_n,tx?Gd(ix):_x(ti(nx)))f(cu,tx?gd(ix):up(x))
Z_(F,ff,rr,_o,o_,gr,no,dt,bg,at,nu,_n,fl,cu,v_,ty)Z_(G,No,Dt,Bg,V_,_V,Ap)g(a1,P(!f--,x)Qr(px)4>f?$4(f,ab(x),3==tx?ti(-ix):jJ(1,ti(0),x),jJ(2,r_(x),x),j4(-1,x)):F[f-4](x))
G(a2,Qr(px)19<f?(f&=3,!f&&9>a-11)?e1(F[a-5],x):_(Qr(tx)$3(ta-2,c3,i3,p3)(f,a,x)):pa?_(Qr(13!=f)a1(a,x)):9>--f?jJ(f,a,x):12>f?G[f-9](a,x):14>f?AA(1&f,a,x):16>f?NN(1&f,a,x):G[f-13](a,x))
//global
Z(U*,v,_&&3>i-24?_+i-24:D+i,U*_,ii)U(sv,_=v(_,i);_r(*_);*_=x;0,U*_,ii,Ux)
//eval
U(z,Ur;Ua=x;x=xx;ii=nx;W(i--){ij=o%32;Q(r=*c=$5(o/32,--c;22>j?_i(j,a):ti(j-22),a1(j,r),a2(j,r,*++c),--i;sv(_,j,r);r_(r),--c;r_(*v(_,j))))}*c++,U*_,Ux)
//parse
Zc*P_=" l osdetwxcarbku`ygihnm v qp f j",*_P=":+-*%&|<>=~.!@?#_^,$'/\\";f(p_,B3(O,10>O-48,O-26,26>O-97,O+(58!=d(1,O)&32),a5(P_,O-32-(57<O&10)-(90<O&26)-(122<O&27))-64))ZU a,py();
f(_p,B3(90,32>O,O+26,96<O,O%32+96,a5(_P,O%32)))f($,tx?lx?$t(x):$(v_(x)):$3(Tx-1,$b(x),32>x_%128?_p(x):x,f1($,x)))f(_z,px?c1(_P[x]):tx||!Lx?$(x):qf(x)?$(_v(x)):sS(32,f1(_z,x)))
f(Bq,bC(34==O))f(Bt,bp(5,bC(Vv=10>O-48;v|d(1,v)&(45==O&~d(-1,10>O-48|26>O-97)|(46==O|58==O|101==O|32==O)&d(-1,v)))))f(Bp,bC(2>O-55))g(nv,cc=-f;bC(Va=160>O&32<O-32;d(-1,a)&(c^a)))
f(Bn,nv(0,x))f(Bv,nv(1,x))f(Bo,bC(3>O-52))f(ap,UA[na]=x;na++)f(pz,qg(57,x)?(x=f1(py,Ss(c_(x,57))),a(C_(c1(32),nz(nx-1,tc(83))),C_(a,sS(0,x)))):py(x))nS(p$,pz(ns(n-2,s+1)))
nS(v$,r(rr(ns(n,s)),*sr+=32))nS(o$,if(32>*s-32)*s=ap(*s%32);v$(n,s))nS(n$,C_(nz(n-1,tc(77)),ns(n,s)))nS(q$,av(ns(n-2,s+1)))Z_(P0,Bq,Bt,Bp,Bo,Bv,Bn)Z_(P1,q$,t$,p$,o$,v$,n$)
g(rd,Ua=P0[f](x);_a(a&&(a=IB(bp(!f||2==f?0:10,a)),na)?_x(c(ij=0;i(na,ik=au-1;d=(char*)ds((U)d,x+j,k-j);j=++i<na?au:nx;Ur=P1[f](j-k,sx+k);*d++=160*(1<f)+ap(r))d=(char*)ds((U)d,x+j,nx-j))):x))
f(py,i(4,x=rd(2+i,x))x)Zs(pS,n(IF(160>o,*d++=o)d=pS(d,UA[o%32]))d,sd,Ux)s(ps,Ux=xs(s);a=T(0,32);na=1;i(2,x=rd(i,x))ii=ig(224,x=p_(x));P(nx>i,prr(i,xs(s)))*UA=x=_x(c(d=pS(c,x=py(x))));a)
//repl
s(zs,P(92==*s,ys(s+1))P(32==s[1]&&26u>*s-97,sv(0,*s-96,ps(s+2)))Qx(ps)x=_x(z(0,x));58==s[1]?_x(0):x)s(os,P(!*s||39==*s,0)Qx(zs)x?wx(x):0)s(ls,Qx(_0)n(Q(nU?os(sU):_x(96)))_x(0))
g(ts,Q(x)Ua=ut();i(f,Q(_r(z(0,x))))_x(ti(((ut()-a)/2.4e6-f/2e5))))s(ys,if(!*s)_k(0);$5(is("ltvw",*s,4),ls(s+2),ii=is(s,32,20);si=0;ts(i?zs(s+2):1,ps(s+i+1)),QZ,ti(W),xs(P)))
int main(int n,char**_){M[31]=mf(32L<<31);if(*++_)ls(*_);cc[256];W(1)wc(32),c[_w(0,(U)c,256)-1]=0,*c?os(c):0;}
