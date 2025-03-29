#include"_.h"
extern i2 O[];extern V M[];extern U tn(i2,i2);
#if __arm64
#define O(f,i) AS(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,8]\nldr x3,[sp,16]\nmov x4,0\nmov x5,x4\nsvc 0\nret",Ux,...)
#define o(f) bu(neon_v##f)
AS(ut,"mrs x0,cntvct_el0\nmov x1,100\nmul x0,x0,x1\n")D(j4,b,o(paddq_v)(x,y,48),g4 x,g4 y)UV(b_,g4*y=&a;g4 m=1<<I4%8;x(b(b(m&y[0],m&y[1]),b(m&y[2],m&y[3])),b(x,x)[0]))
#else
#define O(f,i) AS(f,"mov %rcx,%r10;mov $"#i",%rax;syscall;",Ux,...)
#define o(f) bu(ia32_##f##512)
AS(ut,"rdtsc;shl $32,%rdx;or %rdx,%rax;")UV(b_,o(cvtb2mask)(a))
#endif
#define ax (x<1L<<63)
#define tx (b(3)&x>>60) //to[shr]lmn
#define ox (b(8)&x>>52)
#define lx (b(4)&x>>48)
#define mx (b(16)&x>>32)
#define nx (b(32)&x)
#define Ox O[ox]
#define Oa O[x(a,ox)]
#define sx ((i0*)M+(Ox>>8<<6))
#define hx ((i0)Ox>>3)
#define xu ((i2*)sx)
#define xU ((i3*)sx)
#define t(t,z) ((U)(t)<<60|(z))
_u(tb,t(1,i))_u(tg,t(2,i))_u(ti,t(3,i))_D(i2,ue,*(i2*)&e,ee)_U(te,t(4,ue(e)),ee)_g(ai,t(tx,$4(tx-2,sx[i],xu[i],xu[i],xU[i])))
Z0 bt[]={6,0,3,5,5,0,0,6};_U(hn,n<<=bt[t];512<n?br(n-1)-9:0,it,in)
extern U w2();
_u(wc,w2(1,&i))UV(ib,bs(~b_(a)))
Us(ws,w2(ib(0<Vs),s))U(QQ,ws(d);wc(58);ws(s);wc(10);255,sd,ss)
f(wb,j(16,wc(48|1&x>>j))wc(10);x)f(wu,i(16,ij=15&x>>60-4*i;wc("0W"[9<j]+j))wc(10);x)
_u(wi,r(i,cc[12];ss=c+11;*s=10;in=i>>31;i=n?-i:i;do*--s=48+i%10;W(i/=10);if(n)*--s=45;w2(c+12-s,s)))

#define bx bt[tx]
#define kx (mx?nx/mx:nx)
#define Nx n3(nx<<bx) 
#define px (128>x)
#define Qs(b,z) P(b,QQ(__func__,_(z)))
#define xV ((V*)sx)
#define QZ _(Qz(1)0)
#define Gx *X++
#define Ga *A++
#define Ix ((i6)*X++)
#define Ex ((e6)*X++)
#define Ia ((i6)*A++)
#define Ea ((e6)*A++)
#define ga (x(a,gx)-z0)
#define ia (x(a,ix)-z2)
#define ea (e6)ia
#define jx (b(60)&x)
#define ix (i2)x
#define _x(z) r(_(z),$(7&Ox,--Ox)_o(x))
#define __(z) r(_(z),$(7&Oa,--Oa)_o(a))
#define R(t,n,z) r(tn(t,n),z)
#define A4 ((g4*)&a)[i]
#define B4 ((g4*)&b)[i]
#define C4 ((g4*)&c)[i]

