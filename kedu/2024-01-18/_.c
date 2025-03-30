#define uI x=3>tx?av(3,x):x
#define uE x=4>tx?av(4,x):x
#define UU x=ta!=tx?uU(&a,x):x
#define qi (3>tx-1)
#include"_.h"
ZZ nZ={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#if __ARM_NEON
#define SY(f,i) As(f,"mov x16,"#i"\nldr x1,[sp]\nldr x2,[sp,#8]\nsvc #0\n",ux,...)
Ze eu=2.4e4;As(u_,"mrs x0,cntvct_el0\n",)SY(w_,4)SY(_w,3)SY(f_,5)SY(_f,6)SY(fs,338)us(nF,ii[36];!fs((u)s,(u)i)&&1&i[1]>>15?i[24]:0)
xf(q_,sqrt,41)xF(z_,qtbl1,32)x2(pg,X r={};asm("fcmla.4s %0,%1,%2,#0\nfcmla.4s %0,%1,%2,#90":"+w"(r):"w"(x),"w"(y));r)ZX x8={1,2,4,8,16,32,64,128,1,2,4,8,16,32,64,128};
f4(q,q_)F4(z,z_)F4(PG,pg)xF(s8,padd,48)du(b_,UX*b=&x;UX a=s8(s8(x8&b0,x8&b1),s8(x8&b2,x8&b3));a=s8(a,a);a0,Zx)zu(_b,1&0<(1<<nZ%8&z(x-Z3,nZ/8)))
#else
#define SY(f,i) As(f,"mov $"#i",%rax;syscall;",ux,...)
Ze eu=2.4e6;As(u_,"rdtsc;shl $32,%rdx;or%rdx,%rax;",)SY(w_,1)SY(_w,0)SY(f_,2)SY(_f,3)SY(fs,4)us(nF,ii[36];!fs((u)s,(u)i)&&1&i[6]>>15?i[12]:0)void _start(){asm("lea 8(%rsp),%rsi;call main");}
#if __AVX512F__
z1(q,zo(sqrtps)(x,4))z2(z,zo(pshufb)(x,y))z2(PG,wo(vfmaddsubps512_mask3)(z4(x,0xa0),y,z4(x,0xf5)*z4(y,0xb1),-1,9))du(b_,zo(cvtb2mask)(x),Zx)zu(_b,zo(selectb_)(x,1+Z0,Z0))
#else
y1(q_,yo(sqrtps)(x))y2(z_,yo(pshufb)(x,y))y2(pg,yo(vfmaddsubps)(y4(x,0xa0),y,y4(x,0xf5)*y4(y,0xb1)))
f2(q,q_)F2(z,z_)F2(PG,pg)du(b_,uu;i2*a=&u;Y*b=&x;a0=yo(pmovmskb)(b0);a1=yo(pmovmskb)(b1);u,Zx)zu(_b,1&0<(1<<nZ%8&z(x-Z3,nZ/8)))
#endif
#endif //lf(q)lF(z)lF(PG)
bZ(B_,wo(compressqi512_mask)(x,x^x,b))di(is,r(0,i(n,r=10*r+s[i]%16)),in,ss)z1(p,1/(EZ)x)
Zi lt[]={3,0,0,2,2,3},g=95<<23;i1(g_,~N&i?(N&i)/4|B(29)&m(g,i)-g:0)i1(_g,i=(N/4&i)*4|B(29)&i;~N&i?g+i:0)iu(t,(u)i<<60|(5>i?x:g_(x)|(u)g_(x>>32)<<30))du(ie,*(i2*)&e,e2 e)
#define gx (_g(x)|(u)_g(x>>30)<<32)
#define tx (7&x>>60)
#define ox (B(25)&x>>32)
#define sx ((i0*)(W+32*ox))
Zi W[1<<28],H[25];f(Ww,i(25,Hi=1<<i)0)di(_O,W[32*j]=Hi;Hi=j,ii,ij)i1(O_,r(Hi,Hi=W[32*r]))i1(O,Hi?O_(i):r(_O(i,O(i+1))+(1<<i),W[32*r-1]=0))i1(bn,i+=4+63;128<i?l(i)-7:0)
tn(t_,8L+t<<60|(u)O(bn(n<<lt[t]))<<32|n)f(_t,if(!tx)N(_r(xu))_O(bn(Nx),ox))F(V,in=Na;ii=bn(n+Nx);r(ar||i>bn(n)?$a(R(ta,na+nx,I(n,rz=az))):a+nx,Z*s=sr+n;I(Nx,s[i]=xz)))

di(iz,i_(b_(x)),Zx)du(ns,R(2,n,*(Z*)sr=(i0)n>nZ&*(Z*)s),in,ss)us(k,ns(iz(0==*(Z*)s),s))nu(cv,*zx=*(Z*)(sx-1);sx[0]=n;x+1)iF(cV,sa[na]=i;_x(V(a+1,x)))
f(w,10>x?w(48+x):127>x?w_(1,(u)&x,1L):_(if(10!=sx[nx-1])(sx[nx]=10,++x);_x(w_(1,(u)sx,(u)nx))))du(err,w(cV(58,k(f),k(s)));Q,sf,ss)f(r_,ax?x:(++xr,x))f(_r,ax?x:xr?(--xr,x):(_t(x),x))
ui(si,N&i?N-i?cv(45,si(-i)):k("NAN"):_(bs[10];sf=s+10;do*--f=48+i%10;W(i/=10);ns(s+10-f,f)))f(sb,Zy=48+_b(x);ns(32,&y))
ui(se,N&i?cv(45,se(N^i)):255<<23<i?k("nan"):191<<23<=i?k("inf"):127<<23>i?63<<23>=i?k("0"):cv(37,se(ie(1/ei))):(i2)ei==ei?si(ei):ns(3,(i0[]){b6(1+(i>>23)),58,b6(i>>17)}))
f(sg,ii=x;x=cv('&',se(x>>32));i?cV('+',se(i),x):x)
f(nw,0) //in=1<<12;ij=n;ii=h;W(n>i)(--j,i=oi);j)
