typedef unsigned long u;
#define _u(f,e,x...) u f(x){return _(e);}
#define ax (10>x)
#define nx sx[-1]
#define sx ((char*)x)
#define xi sx[i]
#define _(e) ({e;})
#define r(a,e) _(u r=a;e;r)
#define x(a,e) _(u x=a;e)
#define y(a,e) _(u y=a;e)
#define i(n,e) {int $n=n;int i=0;for(;i<$n;++i){e;}}
#define f(f,e) _u(f,e,u x)
#define F(f,e) _u(f,e,u x,u y)
#define G(g,e) _u(g,e,u f,u x,u y)
#define us(f,e) _u(f,e,char*s)
#define Q(e) if(96==(e))return 96;
#define Qr(e) if(e){return err((u)__func__,(u)"rank");}
#define Qz(e) if(e){return err((u)__func__,(u)"todo");}
#define ri sr[i]
#define yi x(y,xi)
#define nr x(r,nx)
#define ny x(y,nx)
#define sr x(r,sx)
#define sy x(y,sx)
#define ay x(y,ax)

