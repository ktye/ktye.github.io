#define rx nx,sr,sx
#define arx sa,rx
#define irx ia,rx
#define erx ea,rx
#define rax m,n,sr,sa,sx

#define R(t,n,z) r(o_(t,n),z)
#define mR(m,t,n,z) _(i2 $=m;r(o_(t,n+$),z)-$)

#define sx ((i0*)(Ox&~b(6)))
#include"a.a"//(qx|63&ox?Z(tx,z):r(x,z))
#define X(z) Z(tx,z) 
#define Z(t,z) _x(R(t,nx,r=mx?u_(ux,r):r;z)) 
#define F(g,z) U(g,z,Ua,Ux)
#define inx(g,z) U(g,z,ii,in,Ux)
#define bc(q,z) _(q##2 b=q##a;q##2 c=q##x;t##q(z))
#define Qi(b,i)  if(b)return i;
#define Q_(b) Qi(b,0)
#define Qr(b) Qi(b,1)
#define Qn(b) Qi(b,2)
#define Qt(b) Qi(b,3)
#define g_(g,z) U_(g,z,ii,Ux)
#define G_(g,z) U_(g,z,ii,Ua,Ux)
