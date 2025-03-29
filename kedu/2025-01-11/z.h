#include"_.h"
#define ins(g,z) D(U,g,z,ii,in,ss)
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");} //m_(a?:A,x,3,i?0x12:O?0x1042:0x4022,i,0)
Z0*L=__DATE__"(c)arthur whitney(l)MIT",B=32,b[256];void*memset(void*d,int i,Un){VR=d;J(n,R_=(i0)i|z0)return d;}
Z2 I[]={1e0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9};_u(li,r(0,W(i>=I[++r])))ins(js,r(i,W(i--)(si=48+n%10,n/=10)))is($i,i>>31?(*s=45,1+$i(-i,s+1)):js(li(i),i,s))
is(i$,48>*s?(i2)-i$(i-1,s+1):r(0,i(i,r=10*r+si-48)))e2 strtof(const i0*,i0**);int sprintf(i0*,const i0*,...);is(e$,ee=strtof(s,0);*(i2*)&e)is($e,sprintf(s,"%.5g",ei(i)))
#if linux//is(e$,ee=3==i&101==s[1]?*s%16*(e2)I[s[2]%16]:2.3;*(i2*)&e)is($e,i=$i(ei(i),s);si=46;++i)void _start(){asm("lea 8(%rsp),%rsi;call main;mov $60,%rax;syscall");}
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...) //scaling_cur_freq
Z2 O;O(_k,60)O(_w,0)O(w_,1)O(_n,4)O(_d,3)O(d_,2)O(m_,9)O(_m,11)AS(_t,"rdtsc;shl $32,%rdx;or %rdx,%rax;")
_U(nt,Z2 i;_t()*10./(i=i?:(_w(i=d_((U)"/sys/devices/system/cpu/cpu0/cpufreq/base_frequency",0),b,2),_d(i),i$(2,b))))
#else
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nldr x4,[sp,24]\nmov x5,0\nsvc 0\n",Ux,...)
Z2 O=1;O(_k,1)O(_w,3)O(w_,4)O(_n,338)O(_d,6)O(d_,5)O(m_,197)O(_m,73)AS(_t,"mrs x0,cntvct_el0\n")AS(t_,"mrs x0,cntfrq_el0\n")_U(nt,Z2 i;1e9/(i=i?:t_())*_t())
#endif
#define s(g,z) _U(g,z,ss)
U_(w2,w_(2,(U)s,i);0,ii,ss)U_(__,ws(s);_k(1),ss)_u(wl,w0(i,b))f(wb,i(64,bi=48|1&x>>i)w0(64,b);x)
_U(b0,a&=0x8080808080808080;Uu=0;i(8,u|=(U)((__uint128_t)0x204081020408100*a[i]>>64)%256<<8*i)u,j6 a)ins(nc,nu(b(i)&b0((i0)n==Vs)))UV(ib,iu(~b0(x)))is(id,ib((i0)i!=Vs))
_V(d1,1>I0|32==Vs|101==Vs,ss)
#define sx ((i0*)k_(2,x))
extern U k_(i2,U);f(_r,ax?x:k_(0,x))f(r_,ax?x:k_(1,x))g(_i,k(13,r_(x),ti(i)))Z0 F[27][64];ZU C[27][8],G[27],wx(U),ls(ss),qs(ii,ss),p(ii,ss),w(ii,ss),q(ii),e(i2,i0**),zs(ii,ss),ts(ii,ss);
s(o,*(V*)b=Vs;w(ic(0,b),b))_g(u,_r(G[i]);G[i]=x)_Z(_p,U*_=C+i;W(_r(*_))*_++=0,ii)is(ns,R(1,i,*(V*)sr=Vs))_u(vf,ss=b;j(27,Ux=G[j];*s=96+j;s+=x&&i^px)ns(s-b,b))ins(t$,t(i,(3>i?i$:e$)(n,s)))
#define _s s[-1]
#define L(c,z) {i0*t=s+i;ii=-1;W((s+=i+1)<t&&(i=(10==c?ic:id)(c,s)))Q(_(z));}
#define T(g,z) _U(g,ss=*_;Ur=_(z);*_=s;r,ii,i0**_)
#define S(g,z) _U(g,ss=*_;Ur=_(z);*_=s;r,ii,i0**_,Ux)
