#include"a.h"
#define At(e...) __attribute((e))
#define v(n) At(vector_size(1<<n),aligned(1))
typedef u UZ v(6);typedef i0 X v(4),Y v(5),Z v(6);typedef i2 IY v(5),IZ v(6);typedef e2 EZ v(6);
#define As(f,e,x...) At(naked)Zu f(x){asm(e"ret");}
#define xZ(e) R(1,nx,i(n6(Nx),rx=TV(X,1&(e))))
#define yZ(j) R(4,nx,i(n6(Nx),ry=j?TV(IY,(UZ)xz>>32):TV(IY,(UZ)xz)))
#define If x(f,Ix)
#define Gf x(f,Gx)
#define Ix ((i2)x-Z2)
#define Gx (EZ)(gx-Z3)
#define CF (af?((i0)f-Z0):fz)
#define IF (af?If:(IZ)fz)
#define EF (EZ)IF
#define zx ((Z*)sx)
#define xz zx[i]
#define xx ((X*)sx)[i]
#define xy ((Y*)sx)[i]
#define zr ((Z*)sr)
#define rz zr[i]
#define rx ((X*)sr)[i]
#define ry ((Y*)sr)[i]
#define ru ((u*)sr)[i]
#define fz x(f,xz)
#define yz x(y,xz)
#define zy x(y,zx)
#define i2(e) y(e,*(i2*)&y)
#define i3(e) y(e,*(u*)&y)
#define dZ(f,e,x...) ZZ f(x){return _(e);}
#define dY(f,e,x...) ZY f(x){return _(e);}
#define dX(f,e,x...) ZX f(x){return _(e);}
#define zz(f,e) dZ(f,e,Zx)
#define zZ(f,e) dZ(f,e,Zx,Zy)
#define nz(f,e) dZ(f,e,in,Zx)
#define nZ(f,e) dZ(f,e,in,Zx,Zy)
#define zu(f,e) dZ(f,e,ux)
#define uz(f,e) du(f,e,Zx)
#define TV(T,e) bu(convertvector)(e,T)
#define Zf Z f
#define Zx Z x
#define Zy Z y
#define Yx Y x
#define Yy Y y
#define Xx X x
#define Xy X y
#define ZX static X
#define ZY static Y
#define ZZ static Z
#define ZI static IZ
#define ZE static EZ
#define ZU static UZ
#define ZEX static EX
#define ZEY static EY
#define ZIY static IY
ZZ Z0;ZI Z2;ZU Z3;
#define xa(f) bu(neon_##f) 
#define yo(f) bu(ia32_##f##256)
#define zo(f) bu(ia32_##f##512)
#define X4(i,e...) ZZ S##i={e,e,e,e};
#define q0 0,1,2,3
#define q1 4,5,6,7
#define q2 8,9,10,11
#define q3 12,13,14,15
#define q9 -1,1,-1,1
#define a0 a[0]
#define a1 a[1]
#define a2 a[2]
#define a3 a[3]
#define b0 b[0]
#define b1 b[1]
#define b2 b[2]
#define b3 b[3]

