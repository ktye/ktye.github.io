#define f2(e,f) zz(e,Y*a=&x;a0=f(a0);a1=f(a1);x)
#define F2(e,f) zZ(e,Y*a=&x;Y*b=&y;a0=f(a0,b0);a1=f(a1,b1);x)
#define f4(e,f) zz(e,X*a=&x;a0=f(a0);a1=f(a1);a2=f(a2);a3=f(a3);x)
#define F4(e,f) zZ(e,X*a=&x;X*b=&y;a0=f(a0,b0);a1=f(a1,b1);a2=f(a2,b2);a3=f(a3,b3);x)
#define xf(e,f,n) dX(e,bu(neon_v##f##q_v)(x,n),Xx)
#define xF(e,f,n) dX(e,bu(neon_v##f##q_v)(x,y,n),Xx,Xy)
#define dX(f,e,x...) ZX f(x){return _(e);}
#define xX(f,e) dX(f,e,Xx,Xy)
#define Xx X x
#define Xy X y
#define b0 b[0]
#define b1 b[1]
#define b2 b[2]
#define b3 b[3]
#define dY(f,e,x...) ZY f(x){return _(e);}
#define yY(f,e) dY(f,e,Yx,Yy)
#define Yx Y x
#define Yy Y y
#define yo(f) bu(ia32_##f##256)
#define zo(f) bu(ia32_##f##512)
#define y4(x,i) yo(vpermilps)(x,i)
#define z4(x,i) zo(vpermilps)(x,i)
#define i2(e) _(IZ z=e;z[0])
#define i3(e) _(UZ z=e;z[0])
#define I(n,e) i(n6(n),e)
#define Ix ((i2)x-Z2)
#define Gx (EZ)(gx-Z3)
#define xz ((Z*)sx)[i]
#define xx ((X*)sx)[i]
#define xy ((Y*)sx)[i]
#define rz ((Z*)sr)[i]
#define rx ((X*)sr)[i]
#define ry ((Y*)sr)[i]
#define ru ((u*)sr)[i]
#define zZ(f,e) dZ(f,e,Zx,Zy)
#define Zx Z x
#define Zy Z y
#define T(t,n,e) R(t,n,I(Nr,rz=(e)))
#define T0(e) R(0,nx,i(nr,Q(ru=(e)))) 
#define T1(e) T(1,nx,1&(e))
#define zX    T(3,nx,TV(IZ,xx))
#define zY(j) T(5,nx,j?TV(UZ,(IY)xy)<<32:TV(UZ,(IY)xy))
#define Tx(e) _x(T(tx,nx,e))
#include"a.h"
#define v(n) __attribute((vector_size(1<<n),aligned(1)))
typedef u UX v(4),UZ v(6);typedef i0 X v(4),Y v(5),Z v(6);typedef i2 IY v(5),IZ v(6);typedef e2 EZ v(6);
#define As(f,e,x...) __attribute((naked))Zu f(x){asm(e"ret");}
#define xZ(e) R(1,nx,I(Nx,rx=TV(X,1&(e))))
#define yZ(j) R(4,nx,I(Nx,ry=j?TV(IY,(UZ)xz>>32):TV(IY,(UZ)xz)))
#define iZ(f,e) dZ(f,e,ii,Zx)
#define zz(f,e) dZ(f,e,Zx)
#define zu(f,e) dZ(f,e,ux)
#define dZ(f,e,x...) ZZ f(x){return _(e);}

#define TV(T,e) bu(convertvector)(e,T)
#define ZX static X
#define ZY static Y
#define ZZ static Z
#define ZI static IZ
#define ZE static EZ
#define ZU static UZ
#define ZEX static EX
#define ZEY static EY
#define ZIY static IY
#define X4(i,e...) ZZ S##i={e,e,e,e};
#define q0 0,1,2,3
#define q1 4,5,6,7
#define q2 8,9,10,11
#define q3 12,13,14,15
ZZ Z0;ZI Z2;ZU Z3;ZI NZ={q0,q1,q2,q3};
#define a0 a[0]
#define a1 a[1]
#define a2 a[2]
#define a3 a[3]
