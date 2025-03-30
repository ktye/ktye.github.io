#include"_.h"
ZZ nZ={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#if __ARM_NEON
#define SY(f,i) As(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,#8]\nsvc #0\n",ux,...)
Ze eu=2.4e4;As(u_,"mrs x0,cntvct_el0\n",)SY(w_,4)SY(_w,3)SY(f_,5)SY(_f,6)SY(fs,338)us(nF,ii[36];!fs((u)s,(u)i)&&1&i[1]>>15?i[24]:0)
dX(q_,xa(vsqrtq_v)(x,41),Xx)dX(z_,xa(vqtbl1q_v)(x,y,32),Xx,Xy)zz(q,X*a=&x;a0=q_(a0);a1=q_(a1);a2=q_(a2);a3=q_(a3);x)zZ(z,X*a=&x;X*b=&y;a0=z_(a0,b0);a1=z_(a1,b1);a2=z_(a2,b2);a3=z_(a3,b3);x)
dX(s8,xa(vpaddq_v)(x,y,48),Xx,Xy)ZX x8={1,2,4,8,16,32,64,128,1,2,4,8,16,32,64,128};uz(b,X*b=&x;X a=s8(s8(x8&b0,x8&b1),s8(x8&b2,x8&b3));i3(s8(a,a)))zu(_b,1&0<(1<<nZ%8&z(x-Z3,nZ/8)))
#else
#define SY(f,i) As(f,"mov $"#i",%rax;syscall;",ux,...)
Ze eu=2.4e6;As(u_,"rdtsc;shl $32,%rdx;or%rdx,%rax;",)SY(w_,1)SY(_w,0)SY(f_,2)SY(_f,3)SY(fs,4)us(nF,ii[36];!fs((u)s,(u)i)&&1&i[6]>>15?i[12]:0)void _start(){asm("lea 8(%rsp),%rsi;call main");}
zz(q,zo(sqrtps)(x,4))zZ(z,zo(pshufb)(x,y))uz(b,zo(cvtb2mask)(x))zu(_b,zo(selectb_)(x,1+Z0,Z0))
#endif
X4(0,q0,q0,q2,q2)X4(1,q1,q0,q3,q2)ZE E1={q9,q9,q9,q9};zZ(PG,(EZ)z(x,S0)*(EZ)y+E1*(EZ)z(x,S0+4)*(EZ)z(y,S1))zz(p,1/(EZ)x)du(ie,*(i2*)&e,ee)f(l,64-bu(clzl)(x-1))f(i_,bu(ctzl)(x))
Zi lt[]={3,0,0,2,2,3};ZI NZ={q0,q1,q2,q3};dZ(s2,z(x,nZ%16+_b(f)-_b(f<<1)),uf,Zx)di(bn,i+=67;128<i?l(i)-7:0,i)
di(g_,i?(i+=1<<23,(N&i)>>2|B(29)&i):0,ii)di(_g,i?((N>>2&i)<<2|B(29)&i)+(127<<23):0,ii)f(g,g_(x)|(u)g_(x>>32)<<30)iu(t,(u)i<<60|(5>i?x:g_(x)|(u)g_(x>>32)<<30))
#define gx (_g(x)|(u)_g(x>>30)<<32)
#define tx (7&x>>60)
#define ox (B(25)&x>>32)
#define nx ix
#define sx ((i0*)(W+32*ox))
#define xr ((i2*)sx)[-1]
#define R(t,n,e) r(t_(t,n),e)
Zi H[25],W[1<<28];di(_o,W[32*j]=Hi;Hi=j,ii,ij)di(o_,r(Hi,Hi=W[32*r]),ii)di(o,Hi?o_(i):_o(i,o(i+1))+(1<<i),ii)f(_r,xr?(--xr,x):_(if(!tx)N(_r(xu))_o(bn(Nx),ox)))
tn(t_,8L+t<<60|(u)o(bn(n<<lt[t]))<<32|n)F(V,im=Nx;in=Ny;ii=bn(m+n);r(xr||i>bn(m)?_x(R(tx,nx+ny,i(n6(m),rz=xz))):ny+x,Z*s=sr+m;i(n6(n),s[i]=yz)))
du(ns,R(2,n,*zr=*(Z*)s),in,ss)us(ks,ns(i_(b(0==*(Z*)s)),s))nu(cv,*zx=*(Z*)(sx-1);sx[0]=n;x+1)nU(cV,sx[nx]=n;_y(V(x+1,y)))
f(w,10>x?w(48+x):127>x?w_(1,(u)&x,1L):_(if(10!=sx[nx-1])(sx[nx]=10,++x);_x(w_(1,(u)sx,(u)nx))))du(err,w(cV(58,ks(f),ks(s))),sf,ss)
ui(si,N&i?-i-i?cv(45,si(-i)):ks("NAN"):_(bs[10];sf=s+10;do*--f=48+i%10;W(i/=10);ns(s+10-f,f)))f(sb,Zy=48+_b(x);ns(32,&y))
ui(se,ee=ei;N&i?cv(45,se(N^i)):255<<23<i?ks("nan"):190<<23<=i?ks("inf"):127<<23>i?64<<23>i?ks("0"):cv(37,se(ie(1/e))):(i2)e==e?si(e):ns(3,(i0[]){b6(1+(i>>23)),58,b6(i>>17)}))
f(sg,ii=x;x=cv(46,se(x>>32));i?cV(43,se(i),x):x)
f(nw,0) //in=1<<12;ij=n;ii=h;W(n>i)(--j,i=oi);j)
f(_R,ax?x:_r(x))f(R_,ax?x:(++xr,x))
f(oO,i(25,Hi=(1<<i)-1)0)

