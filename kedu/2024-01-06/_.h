#define ei(x) (*(e2*)&x)
#define g_(e) y((i2)(e),y+=1<<23;(N&y)>>2|B(29)&y)
#define _g(e) y((i2)(e),(N&y<<2|B(29)&y)+(127<<23))
#define At(e...) __attribute((e))
#define v4 At(vector_size(1<<4),aligned(1))
#define v5 At(vector_size(1<<5),aligned(1))
#define v6 At(vector_size(1<<6),aligned(1))
typedef unsigned char X v4,Y v5,Z v6,i0;typedef unsigned short i1;
typedef unsigned IX v4,IY v5,IZ v6,i2;typedef unsigned long(*_)(),UZ v6,u;
typedef float EX v4,EY v5,EZ v6,e2;
#define Qp(e) E(uf=e;if(f)return prr(f,x));
#define r(a,e) E(typeof(a)r=a;e;r)
#define x(a,e) E(typeof(a)x=a;e)
#define y(a,e) E(typeof(a)y=a;e)
#define _x(e) r(e,_r(x))
#define _y(e) r(e,_r(y))
#define _xy(e) _x(_y(e))
#define rz zr[i]
#define ax !(1L<<63&x) //[atiegoOnszlNEG]x[ciuxyz] 
#define ix (i2)x
#define gx (_g(x)|(u)_g(x>>30)<<32)
#define zx ((Z*)sx)
#define lx lt[tx]
#define Nx (nx<<lx)
#define xc sx[i]
#define xi ((i2*)sx)[i]
#define xu ((u*)sx)[i]
#define xx ((X*)sx)[i]
#define xy ((Y*)sx)[i]
#define xz zx[i]
#define zr ((Z*)sr)
#define ru ((u*)sr)[i]
#define rx ((X*)sr)[i]
#define ry ((Y*)sr)[i]
#define l3(c,i,g) c3(lx-2,i,g,c)
#define $(b,e) if(b){e;}else
#define B(e) ((1L<<(e))-1)
#define E(e) ({e;})
#define Q(e) if(96==(e)){return 0;}
#define W(e...) while(e) 
#define X(e) I(nx,e)
#define I(n,e) {i2 $n=n;ii=-1;W(++i<$n){e;}}
#define _I(n,e) {ii=n;W(i--){e;}}
#define m(x,y) E(typeof(y)y_=y;(x)>y_?(x):y_)
#define i2(e) ((IZ)(e))[0]
#define i3(e) ((UZ)(e))[0]
#define du(f,e,x...) Zu f(x){return E(e);}
#define dZ(f,e,x...) ZZ f(x){return E(e);}
#define dY(f,e,x...) ZY f(x){return E(e);}
#define dX(f,e,x...) ZX f(x){return E(e);}
#define tn(f,e) du(f,e,it,in)
#define ni(f,e) du(f,e,in,ii)
#define au(f,e) du(f,e,u*a,ux)
#define ui(f,e) du(f,e,ii)
#define un(f,e) du(f,e,in)
#define us(f,e) du(f,e,ss)
#define u(f,e)  du(f,e,ux)
#define U(f,e)  du(f,e,ux,uy)
#define _u(f,e) du(f,e,_ f_,ux)
#define _U(f,e) du(f,e,_ f_,ux,uy)
#define fu(f,e) du(f,e,uf,ux)
#define fU(f,e) du(f,e,uf,ux,uy)
#define iu(f,e) du(f,e,ii,ux)
#define iU(f,e) du(f,e,ii,ux,uy)
#define nu(f,e) du(f,e,in,ux)
#define nU(f,e) du(f,e,in,ux,uy)
#define z(f,e)  dZ(f,e,Zx)
#define Z(f,e)  dZ(f,e,Zx,Zy)
#define uz(f,e) dZ(f,e,uf,Zx)
#define nz(f,e) dZ(f,e,in,Zx)
#define nZ(f,e) dZ(f,e,in,Zx,Zy)
#define TV(T,e) bu(convertvector)(e,T)
#define bs i0 s
#define ss i0*s
#define st i0*t
#define ee e2 e
#define ii i2 i
#define ij i2 j
#define im i2 m
#define in i2 n
#define io i2 o
#define ir i2 r
#define it i2 t
#define uf u f
#define ux u x
#define uy u y
#define Zf Z f
#define Zx Z x
#define Zy Z y
#define Yx Y x
#define Yy Y y
#define Xx X x
#define Xy X y
#define Qs(b,s) if(b){err((u)__func__,(u)s);return 96;}
#define Qz(b) Qs(b,"nyi")
#define Qr(b) Qs(b,"rank")
#define Qt(b) Qs(b,"type")
#define Qn(b) Qs(b,"length")
#define Qd(b) Qs(b,"domain")
#define QD E(Qd(1)0)
#define QZ E(Qz(1)0)
#define oo w_(1,"oo\n",3L)
#define Z_ static _
#define Zc static i0
#define Zi static i2
#define Ze static e2
#define Zu static u
#define ZX static X
#define ZY static Y
#define ZZ static Z
#define ZI static IZ
#define ZE static EZ
#define ZU static UZ
#define ZEX static EX

#define nxu y(xu,ny)
#define sxu y(xu,sy)
#define wb(e) r(e,w(sb(r)))
#define wi(e) r(e,w(si(r)))
#define we(e) r(e,w(se(r)))
#define wg(e) r(e,w(sg(r)))
#define wr(e) r(e,wx(cp(r)))
#define c3(x,a,b,c) E(io=E(x);!o?a:2>o?b:E(c))
#define c4(x,a,b,c,d) E(io=E(x);!o?a:2>o?b:3>o?c:d)
#define c5(x,a,b,c,d,e) E(io=E(x);!o?a:2>o?b:3>o?c:4>o?d:e)
#define c6(x,a,b,c,d,e,f) E(io=E(x);!o?a:2>o?b:3>o?c:4>o?d:5>o?e:E(f))
#define bu(f) __builtin_##f
#define Hi H[i]
#define oi o[i]
ZZ Z0;ZI Z2;ZU Z3;Zu U1=0x0f0f0f0f0f0f0f0f,u0=0x3030303030303030;
#define ur ((u*)sr)
#define af x(f,ax)
#define tf x(f,tx)
#define fy x(f,xy)
#define fz x(f,xz)
#define nr x(r,nx)
#define sr x(r,sx)
#define Nr x(r,Nx)
#define Ny x(y,Nx)
#define ay x(y,ax)
#define gf x(f,gx)
#define iy x(y,ix)
#define ly x(y,lx)
#define ny x(y,nx)
#define sy x(y,sx)
#define zy x(y,zx)
#define ty x(y,tx)
#define yz x(y,xz)
#define n6(n) (63+(n)>>6)
#define R(t,n,e) r(t_(t,n),e)
#define T(t,n,e) R(t,n,I(n6(Nr),rz=(e)))
#define Tx(e) _x(T(tx,nx,e))
#define T0(e) R(0,nx,I(nr,Q(ru=(e)))) 
#define T1(e) T(1,nx,1&(e))
#define tb(e) t(1,e)
#define ti(e) t(3,e)
#define te(e) t(4,e)
#define tg(e) t(5,e)
#define zX R(3,nx,I(15+Nr>>4,rz=TV(IZ,xx)))
#define Xz(e) R(1,nx,I(15+Nr>>4,rx=TV(X,1&(e))))
#define xa(f) bu(neon_##f) 
#define xo(f) bu(ia32_##f##128)
#define yo(f) bu(ia32_##f##256)
#define zo(f) bu(ia32_##f##512)
#define _X(f,e) dX(f,e,Xx,Xy)
#define _Y(f,e) dY(f,e,Yx,Yy)
#define a0 a[0]
#define a1 a[1]
#define a2 a[2]
#define a3 a[3]
#define b0 b[0]
#define b1 b[1]
#define b2 b[2]
#define b3 b[3]
