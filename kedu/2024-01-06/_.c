#define q4 X*a=&x;a0=q_(a0);a1=q_(a1);a2=q_(a2);a3=q_(a3);x
#include"_.h"
ZZ nZ={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
ZX X6={1,2,4,8,16,32,64,128,1,2,4,8,16,32,64,128};
#if __APPLE__ 
fU(w_,write(f,x,y))fU(_w,read(f,x,y))U(f_,open(x,y))u(_f,close(x))U(fs,stat(x,y))us(nF,ii[36];fs((u)s,(u)i)||8!=i[6]>>12?0:i[12])
dX(q_,xa(sqrt)(x),Xx)_X(ap,xa(vpaddq_v)(x,y,48))du(b,X*a=&x;X r=ap(ap(a0&MM,a1&MM),ap(a2&MM,a3&MM));r=ap(r,r);*(u*)&r,Zx)dZ(_b,Z0,ux)z(q,q4)  
#else
#define SY(f,i) At(naked)Zu f(ux,...){asm("mov $"#i",%rax;syscall;ret");}
At(naked)u _start(){asm("lea 8(%rsp),%rsi;call main");}SY(w_,1)SY(_w,0)SY(f_,2)SY(_f,3)SY(fs,4)us(nF,ii[36];fs((u)s,(u)i)||8!=i[6]>>12?0:i[12])At(naked)Zu u_(){asm("rdtsc;shl $32,%rdx;or%rdx,%rax;ret");}
#if __AVX512F__
Z(Z4,zo(pshufb)(x,y))ZZ S0={0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11},
S2={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11};
ZE E1={-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1};Z(PG,(EZ)Z4(x,S0)*(EZ)y+E1*(EZ)Z4(x,S0+4)*(EZ)Z4(y,S2))z(q,zo(sqrtps)(x,4))du(b,zo(cvtb2mask)(x),Zx)dZ(_b,zo(selectb_)(x,1+Z0,Z0),ux)
#elif __AVX2__
ZX _B(ii){ij=i>>8;Xx={i,i,i,i,i,i,i,i,j,j,j,j,j,j,j,j};return 1&0<(X6&x);}dZ(_b,Zy;X*a=&y;i1*b=&x;a0=_B(b0);a1=_B(b1);a2=_B(b2);a3=_B(b3);y,ux)
_Y(Y4,yo(pshufb)(x,y))ZY S0={0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11,0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11},S2={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11};
static EY E1={-1,1,-1,1,-1,1,-1,1};_Y(pg,(EY)Y4(x,S0)*(EY)y+E1*(EY)Y4(x,S0+4)*(EY)Y4(y,S2))dY(q_,yo(sqrtps)(x),Yx)du(b_,yo(pmovmskb)(x),Yx)z(q,Y*a=&x;a0=q_(a0);a1=q_(a1);x)
du(b,uf;i2*a=&f;Y*b=&x;a0=b_(b0);a1=b_(b1);f,Zx)Z(Z4,Y*a=&x;Y*b=&y;a0=Y4(a0,b0);a1=Y4(a1,b1);x)Z(PG,Y*a=&x;Y*b=&y;a0=pg(a0,b0);a1=pg(a1,b1);x)
#else
ZX _B(ii){ij=i>>8;Xx={i,i,i,i,i,i,i,i,j,j,j,j,j,j,j,j};return 1&0<(X6&x);}dZ(_b,Zy;X*a=&y;i1*b=&x;a0=_B(b0);a1=_B(b1);a2=_B(b2);a3=_B(b3);y,ux)
_X(X4,xo(pshufb)(x,y))dX(q_,bu(ia32_sqrtps)(x),Xx)du(b_,xo(pmovmskb)(x),Xx)du(b,uf;i1*a=&f;X*b=&x;a0=b_(b0);a1=b_(b1);a2=b_(b2);a3=b_(b3);f,Zx)
ZX S0={0,1,2,3,0,1,2,3,8,9,10,11,8,9,10,11},S2={4,5,6,7,0,1,2,3,12,13,14,15,8,9,10,11};ZEX E1={-1,1,-1,1};_X(pg,(EX)X4(x,S0)*(EX)y+E1*(EX)X4(x,S0+4)*(EX)X4(y,S2))
Z(Z4,X*a=&x;X*b=&y;a0=X4(a0,b0);a1=X4(a1,b1);a2=X4(a2,b2);a3=X4(a3,b3);x)Z(PG,X*a=&x;X*b=&y;a0=pg(a0,b0);a1=pg(a1,b1);a2=pg(a2,b2);a3=pg(a3,b3);x)z(q,q4)
#endif
#endif


ZI NZ={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};ZZ N0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};uz(s2,Z4(x,N0+_b(f)-_b(f<<1)))
dZ(z_,*(Z*)&y,Yx,Yy)
Zi lt[]={3,0,0,2,2,3},N=1<<31;u(l,64-bu(clzl)(x))u(i,bu(ctzl)(x))iu(t,(u)i<<60|(5>i?x:g_(x)|(u)g_(x>>32)<<30))ui(bn,64<i?l(i)-6:0)z(p,1/(EZ)x)z(z4,X*a=&x;a1=*a;a2=*a;a3=*a;x)
#define tx (7&x>>60)
#define ox (B(12)&x>>48)
#define Ox (B(24)&x>>24)
#define nx (B(24)&x)
#define sx ((i0*)(W+16*Ox))
Zi At(aligned(1<<6))W[1<<28],H[25];ui(O_,r(Hi,Hi=W[16*r]))du(_O,W[16*r]=Hi;Hi=r,ii,ir)ui(O,N&Hi?_O(i,O(i+1))+(1<<i):O_(i))tn(t_,8L+t<<60|n|O(bn(n<<lt[t]))<<24)
Zi h,o[1<<12];du(R_,ux=*a;ax?x:ox?(++o[ox],x):E(ii=h;h=oi;oi=1;*a|=(u)i<<48),u*a)u(_r,ii=ox;i&&(oi--||(oi=h,h=i,0))?x:E(if(!tx)X(_r(xu))_O(bn(Nx),Ox)))u(_R,ax?x:_r(x))
U(V,im=Nx;in=Ny;ii=bn(m+n);r(ox||i>bn(m)?_x(R(tx,nx+ny,I(n6(m),rz=xz))):n+x,$(i>=bn(m+64*n6(n)),Z*s=sr+m;I(n6(n),s[i]=yz))I(n,sr[m+i]=sy[i])))
nU(cV,sx[nx]=n;++x;_y(V(x,y)))nu(cv,*zx=*(Z*)(sx-1);sx[0]=n;x+1)
du(ns,r(t_(2,n),*zr=*(Z*)s),in,ss)us(k,ns(i(b(0==*(Z*)s)),s))ni(b6,ij=i;R(2,n,I(nr,sr[i]="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ./"[63&j>>26];j<<=6)))
Zu wx();u(w,10>x?w(48+x):127>x?w_(1,(u)&x,1L):E(x=ax?k((i0*)x):x;if(10!=sx[nx-1])(sx[nx]=10,++x);_x(w_(1,(u)sx,(u)nx))))fu(err,w(cV(58,k((i0*)f),k((i0*)x))))u(qz,QZ)U(qZ,QZ)
ui(si,N&i?-i-i?cv(45,si(-i)):k("NAN"):E(bs[10];st=s+10;do*--t=48+i%10;W(i/=10);ns(s+10-t,t)))du(ie,*(i2*)&e,ee)fu(prr,w(x);Zy=32+Z0;in=i(f);y[n++]=94;wx(ns(n,&y));96)
ui(se,ee=ei(i);N&i?cv(45,se(N^i)):255<<23<i?k("nan"):190<<23<=i?k("inf"):127<<23>i?64<<23>i?k("0"):cv(37,se(ie(1/e))):(i2)e==e?si(e):cv(58,b6(2,(1<<23)+i<<3)))
u(sg,cV(46,se(x),se(x>>32)))us(f1,in=nF(s);Qs(!n,s)R(2,n,ii=f_((u)s,0);_w(i,(u)sr,(u)n);_f(i)))u(sb,Zy=48+_b(x);ns(32,&y))
u(hi,N0=z4(N0);I(24,Hi=-1)I(1<<12,oi=i+1)0)u(on,in=1<<12;ij=n;ii=h;W(n>i)(--j,i=oi);j)
