#define t3(i,e) c3(ax-2,tc(i),ti(i),te(e))
#define T3(c,i,e) c3(tx-2,R2(c),R3(i),R4(e))
#define uu(e) _(if(aa!=ax)If(aa<ax,a=Ua(ax,a))x=Ua(aa,x);e)
#define UU(e) _(it=aa?:ta;if(t!=tx)If(t<tx,a=ax?Ua(tx,a):Uv(tx,a))x=Uv(t,x);e)
#define R(t,n,e) r(t_(t,n),e)
#define k(n,e) R(2,n,mc(n,r,(u)(e)))
#define R0(e) _x(R(0,nx,X(ru=e)))
#define R1(e) _x(R(1,nx,X(rc=e)))
#define R2(e) _x(R(2,nx,X(rc=e)))
#define R3(e) _x(R(3,nx,X(ri=e)))
#define R4(e) _x(R(4,nx,X(re=e)))
#define X(e) i(nx,e)
#define _a(e) r(_(e),_r(a))
#define b(e) ((1<<(e))-1)
#define tc(e) t(2,(unsigned char)(e))
#define ti(e) t(3,(unsigned)(e))
#define te(e) t(4,float _=e;*(unsigned*)&_)
#define ex (*(float*)&x)
#define ea x(a,ex)
#define nr x(r,nx)
#define W(e) while(e)
#define ns(g,e) u(g,e,in,ss)
#define Rx ((1<<24)-1&xr)
#define sa ((char*)a)
#define rC x(r,sx)
#define rI x(r,xI)
#define rU x(r,xU)
#define ru rU[i]
#define sr ((char*)r)
#define ai x(a,ax?ix:xi)
#define ae x(a,ax?ex:xe)
#define ci (lx?xi:xc)
#define Z_ static _
#define Zi static int
#define Zu static unsigned long  
#define Ze static float //[paietnNs][ax]  [rax][cieu] w[bcieu]
typedef unsigned long(*_)(),u;Zi N=1<<31;Zu Q=96,lt[]={3,0,0,2,2,3,3};Ze eu=2.4e6;__attribute((naked))Zu ut(){asm("rdtsc;shl $32,%rdx;or%rdx,%rax;ret");}
#define t(t,e) ((u)(t)<<61|(unsigned)_(e)) //rrrtnnnn
#define ax (x>>61)
#define ix (int)x
#define Ax (ax||px)
#define px (32>x)
#define xr ((unsigned*)x)[-2]
#define nx ((unsigned*)x)[-1]
#define sx ((char*)x)
#define tx sx[-5]
#define lx lt[tx]
#define Nx (nx<<lx)
#define xc sx[i]
#define xi xI[i]
#define xe xE[i]
#define xu xU[i]
#define xI ((int*)x)
#define xE ((float*)x)
#define xU ((u*)x)
#define _(e) ({e;})
#define m(a,e) _(typeof(e)e_=e;(a)>e_?(a):e_)
#define r(a,e) _(typeof(a)r=a;e;r)
#define x(a,e) _(typeof(a)x=a;e)
#define _x(e) r(_(e),_r(x))
#define u(g,e,x...) Zu g(x){return({e;});}
#define s(g,e) u(g,e,char*s)
#define f(g,e) u(g,e,ux)
#define F(g,e) u(g,e,ua,ux)
#define G(g,e) u(g,e,uf,ua,ux)
#define iu(g,e) u(g,e,ii,ux)
#define i(n,e) {unsigned $n=n;ii=0;for(;i<$n;++i){e;}}
#define Q(e) if(Q==(e))return Q;
#define Qs(e,s) if(e)return err((u)__func__,(u)s);
#define Qp(e) Qs(e,"parse")
#define Qz(e) Qs(e,"nyi")
#define Qr(e) Qs(e,"rank")
#define Qt(e) Qs(e,"type")
#define Qd(e) Qs(e,"domain")

#define QZ Qz(1)0
#define If(a,b) if(a){b;}else
#define Pr(b,e) if(b)return _(e);
#define oo w((u)"oo\n")
#define uf u f
#define ua u a
#define ux u x
#define un u n
#define bs char s
#define st char*t
#define ss char*s
#define ii unsigned i
#define in unsigned n
#define it unsigned t
#define c3(x,a,b,c) ({unsigned o=x;!o?a:2>o?b:_(c);})
#define c4(x,a,b,c,d) ({unsigned o=x;!o?a:2>o?b:3>o?c:_(d);})
#define rc x(r,sx)[i]
#define ri x(r,xI)[i]
#define re x(r,xE)[i]
#define pa x(a,px)
#define aa x(a,ax)
#define ia x(a,ix)
#define ta x(a,tx)
#define na x(a,nx)
#define Na x(a,Nx)
#define aC x(a,sx)
#define aI x(a,xI)
#define nxu ((unsigned*)xu)[-1]
#define sxu ((char*)xu)
#define wu(e) r((u)(e),bs[24];w_(sprintf(s,"%lx\n",r),s))
#define wi(e) r((int)(e),bs[24];w_(sprintf(s,"%d\n",r),s))
#define we(e) r((float)(e),bs[24];w_(sprintf(s,"%g\n",r),s))
