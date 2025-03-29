#define mn (ma?:na)
#define E(g,z)  _U(g,ss=*_;Ur=_(z);*_=s;r,ii,i0**_)
#define Q(z) r(z,P(!r,0))
#define Ex(g,z) _U(g,ss=*_;Ur=_(z);*_=s;r,ii,i0**_,Ux)
#define R(t,n,z) r(tn(t,n),z)
#define I(c,z) {i0*t=s+i;ii=-1;W((s+=i+1)<t&&(i=(10==c?ic:id)(c,s)))_(z);}
#define _s s[-1]
#include"_.h"
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#if __x86_64
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
AS(ut,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
#else
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nmov x4,0\nmov x5,x4\nsvc 0\n",Ux,...)
AS(ut,"mrs x0,cntvct_el0\nmov x1,100\nmul x0,x0,x1\n")
#endif
#if linux
Z2 O;O(_k,60)O(_w,0)O(w_,1)O(_n,4)O(_d,3)O(d_,2)O(m_,9)O(_m,11)
#else
Z2 O=1;O(_k,1)O(_w,3)O(w_,4)O(_n,188)O(_d,6)O(d_,5)O(m_,197)O(_m,73)
#endif
#define cb char b
#define sd i0*d
#define ss i0*s
#define Vs *(V*)s
#define s(g,z) D(U,g,z,ss)
#define is(g,z) D(U,g,z,ii,ss) //m_(a?:A,x,3,i?0x12:O?0x1042:0x4022,i,0)
#define ins(g,z) D(U,g,z,ii,in,ss)
_U(bg,a&=U1<<7;Uu=0;i(8,u|=(U)((__uint128_t)0x204081020408100*a[i]>>64)%256<<8*i)u,j6 a)D(V,d1,1>I0|32==Vs|101==Vs,ss)ins(nc,nu(b(i)&bg((i0)n==Vs)))UV(ib,iu(~bg(a)))is(id,ib((i0)i!=Vs))
ins(js,r(i,W(i--)(s[i]=48+n%10,n/=10)))s(fs,Ua[24];!_n((U)s,a)&&1&a[O?0:3]>>(O?47:15)?a[O?12:6]:0)is(ms,ij=d_((U)s,0);Ux=m_(0,i,1,2,j,0);_d(j);x)
Z2 E[]={1,10,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9};_i(li,r(0,W(i>=E[++r])))is($i,i>>31?(*s=45,1+$i(-i,s+1)):js(li(i),i,s))is(i$,48>*s?(i2)-i$(i-1,s+1):r(0,i(i,r=10*r+s[i]-48)))
e2 strtof(const i0*,i0**);int sprintf(i0*,const i0*,...);is(e$,ee=strtof(s,0);*(i2*)&e)is($e,sprintf(s,"%.7g",ei(i)))
//is(e$,ee=3==i&101==s[1]?*s%16*(e2)E[s[2]%16]:2.3;*(i2*)&e)is($e,i=$i(ei(i),s);s[i++]=46;i)void _start(){asm("lea 8(%rsp),%rsi;call main;mov $60,%rax;syscall");}
ins(t$,t(i,(4>i?i$:e$)(n,s)))U_(w2,w_(2,(U)s,i);0,ii,ss)is(w0,w2(i,s);wc(10))is(ic,sd=s;W(i!=*s)++s;s-d)s(ws,w0(ic(0,s),s))
Z0*L=__DATE__"(c)arthur whitney(l)MIT",B=32,b[256];
_i(wl,w0(i,b))_i(o,3>i-61)_i(v,33>i-B)
f(wb,cb[64];i(64,b[i]=48|1&x>>i)w0(64,b);x)f(wu,cb[16];i(16,ij=15&x>>60-4*i;b[i]="0W"[9<j]+j)w0(16,b);x)
#define sx ((i0*)k_(2,x))
extern U k_(i2,U);f(_r,ax?x:k_(0,x))f(r_,ax?x:k_(1,x))
ZU ls(ss),qs(ii,ss),p(ii,ss),w(ii,ss),wx(U),q(ii),e(ii,i0**);is(ns,R(2,i,*rV=Vs))
Z0 F[27][64];ZU C[27][8],G[27];_i(vf,ss=b;j(27,Ux=G[j];*s=96+j;s+=x&&i^px)ns(s-b,b))_i(_p,U*_=C+i;W(_r(*_))*_++=0;i)
_g(u,_r(G[i]);G[i]=x)_g(n,r_(B>x?C[i][x]:G[x%B]?:w0(1,&x)))
s(a,P(!s,0)*(V*)b=Vs;w(ic(0,b),b))
