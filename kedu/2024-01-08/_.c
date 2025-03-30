#include"_.h"
ZZ nZ={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
Zi lt[]={3,0,0,2,2,3};ZI NZ={q0,q1,q2,q3};X4(8,q0,q1,q0,q1)X4(0,q0,q0,q2,q2)X4(1,q1,q0,q3,q2)ZE E1={q9,q9,q9,q9};u(l,64-bu(clzl)(x))u(i,bu(ctzl)(x))ZZ N0={q0,q1,q2,q3};zz(p,1/(EZ)x)
#if __ARM_NEON 
#define SY(f,i) As(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,#8]\nsvc #0\n",ux,...)
Ze eu=2.4e4;As(u_,"mrs x0,cntvct_el0\n",)SY(w_,4)SY(_w,3)SY(f_,5)SY(_f,6)SY(fs,338)tnf(1,24)dX(q_,xa(vsqrtq_v)(x,41),Xx)zz(q,X*a=&x;a0=q_(a0);a1=q_(a1);a2=q_(a2);a3=q_(a3);x)
dX(z_,xa(vqtbl1q_v)(x,y,32),Xx,Xy)zZ(z,X*a=&x;X*b=&y;a0=z_(a0,b0);a1=z_(a1,b1);a2=z_(a2,b2);a3=z_(a3,b3);x)
dX(s0,xa(vpaddq_v)(x,y,48),Xx,Xy)uz(b,Xy=1<<*(X*)&S8;X*b=&x;X a=s0(s0(y&b0,y&b1),s0(y&b2,y&b3));i3(s0(a,a)))
#else
#define SY(f,i) As(f,"mov $"#i",%rax;syscall;",ux,...)
Ze eu=2.4e6;As(u_,"rdtsc;shl $32,%rdx;or%rdx,%rax;",)SY(w_,1)SY(_w,0)SY(f_,2)SY(_f,3)SY(fs,4)tnf(6,12)void _start(){asm("lea 8(%rsp),%rsi;call main");}
zz(q,zo(sqrtps)(x,4))zZ(z,zo(pshufb)(x,y))uz(b,zo(cvtb2mask)(x))
#endif
zu(_b,1&0<(1<<S8&z(x-Z3,nZ/8)))zZ(PG,(EZ)z(x,S0)*(EZ)y+E1*(EZ)z(x,S0+4)*(EZ)z(y,S1))dZ(s2,z(x,N0+_b(f)-_b(f<<1)),uf,Zx)

#define tx (7&x>>60)
#define ox (B(12)&x>>48)
#define Ox (B(24)&x>>24)
#define nx (B(24)&x)
#define sx ((i0*)(W+16*Ox))
Zi At(aligned(64))W[1<<28],H[25];ui(O_,r(Hi,Hi=W[16*r]))du(_O,W[16*r]=Hi;Hi=r,ii,ir)ui(O,N&Hi?_O(i,O(i+1))+(1<<i):O_(i))ui(bn,64<i?l(i)-6:0)tn(t_,8L+t<<60|n|O(bn(n<<lt[t]))<<24)
Zi h,o[1<<12];du(R_,ux=*a;ax?x:ox?(++o[ox],x):E(ii=h;h=oi;oi=1;*a|=(u)i<<48),u*a)u(_r,ii=ox;i&&(oi--||(oi=h,h=i,0))?x:E(if(!tx)N(_r(xu))_O(bn(Nx),Ox)))u(_R,ax?x:_r(x))du(ie,*(i2*)&e,ee)
u(hi,I(24,Hi=-1)I(1<<12,oi=i+1)0)U(V,im=Nx;in=Ny;ii=bn(m+n);r(ox||i>bn(m)?_x(R(tx,nx+ny,I(n6(m),rz=xz))):n+x,$(i>=bn(m+64*n6(n)),Z*s=sr+m;I(n6(n),s[i]=yz))I(n,sr[m+i]=sy[i])))
u(on,in=1<<12;ij=n;ii=h;W(n>i)(--j,i=oi);j)du(ns,r(t_(2,n),*zr=*(Z*)s),in,ss)us(k,ns(i(b(0==*(Z*)s)),s))nu(cv,*zx=*(Z*)(sx-1);sx[0]=n;x+1)nu(vc,sx[nx]=n;x+1)iU(cV,_y(V(vc(i,x),y)))
ui(si,N&i?-i-i?cv(45,si(-i)):k("NAN"):E(bs[10];sf=s+10;do*--f=48+i%10;W(i/=10);ns(s+10-f,f)))u(sb,Zy=48+_b(x);ns(32,&y))Zu se();u(sg,ii=x;x=cv(46,se(x>>32));i?cV(43,se(i),x):x)
ui(se,ee=ei(i);N&i?cv(45,se(N^i)):255<<23<i?k("nan"):190<<23<=i?k("inf"):127<<23>i?64<<23>i?k("0"):cv(37,se(ie(1/e))):(i2)e==e?si(e):ns(3,(i0[]){b6(1+(i>>23)),58,b6(i>>17)}))


