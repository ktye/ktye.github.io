#define ax !(x>>63)
#define tx (7&x>>60)
#define Mx (1L<<32)
#define V_(n) __attribute((vector_size(1<<n),aligned(1)))//ABCDEFGHIJKLMNOPQRSTUVWXYZ
typedef unsigned long U,j6 V_(6);typedef char i0,g6 V_(6);typedef unsigned short i1;typedef unsigned i2,i6 V_(6);typedef float e2,e6 V_(6);
#define Z2 static i2
#define ZU static U
#define ZI static i6
#define ZE static e6
#define ZJ static j6
#define ZV static g6
#define ss i0*s
U k(i2,U,U),tn(i2,U),w_(i2,ss);void exit(i2);ZU _r(U),r_(U);ZI z2;ZJ z3;ZE ze;ZV 
z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define _(z) ({z;})
#define W(z) while(_(z))
#define r(b,z) ({typeof(b)r=b;z;r;})
#define i(b,z) {i2 $=b;i2 i=0;while(i<$){z;++i;}}
#define t(t,z) ((U)(t)<<60|(z))
#define bu(o) __builtin_##o
#define _D(t,g,z,x...) static t g(x){return({z;});}
#define _e(g,z,x...) _D(e2,g,z,x)
#define _U(g,z,x...) _D(U,g,z,x)
#define _f(g,z) _U(g,z,Ux)
#define Ui(g,z) _U(g,z,ii)
#define ii i2 i
#define in i2 n
#define ee e2 e
#define ix (i2)x
#define jx (b(60)&x)
#define sr x(r,sx)
#define tr x(r,tx)
#define Ux U x
_f(nu,bu(popcountl)(x))_f(iu,x?bu(ctzl)(x):64)_f(lu,--x?64-bu(clzl)(x):0)_e(ei,*(e2*)&i,ii)_f(iz,3>tx?ix:(i2)ei(ix))Ui(ti,t(2,i))_U(te,t(3,*(i2*)&e),ee)Ui(L_,r(0,W(i/=10)++r))
Ui(wi,i0 d[12];d[11]=10;i0*s=d+11;in=i>>31?-i:i;do*--s=48+n%10;W(n/=10);if(i>>31)*--s=45;w_(d+12-s,s);i)_f(wu,i0 d[17];d[16]=10;i(16,in=15&x>>60-4*i;d[i]="0W"[9<n]+n)w_(17,d);x)
#define _F(g,z) _U(g,z,Ua,Ux)
#define is(g,z) _U(g,z,ii,ss)
#define $(b,z) if(b){z;}else
#define b(i) ((1L<<(i))-1)
#define Z0 static i0
#define sd i0*d
#define ij i2 j
#define Ua U a
#define Ub U b
#define px (t(1,0)>x)
#define mx (Mx&x)
#define nx (i2)x
#define vx (mx?nx/ux:nx)
#define xg sx[i]
#define xi ((i2*)sx)[i]
#define xj ((U*)sx)[i]
#define rg sr[i]
#define ri ((i2*)sr)[i]
#define re ((e2*)sr)[i]
#define rj ((U*)sr)[i]
#define zi z[i]
#define Ci C[i]
#define x2 ((i2*)sx)
#define xV ((g6*)sx)
#define a2 x(a,x2)
#define r2 x(r,x2)
#define rV x(r,xV)
#define cc i0 c
#define ik i2 k
#define il i2 l
#define im i2 m
#define Uf U f
#define Va g6 a
#define Vb g6 b
#define ua x(a,ux)
#define aa x(a,ax)
#define pa x(a,px)
#define Vs *(g6*)s
#define Vd *(g6*)d
#define R_ *R++
#define Vc g6 c
#define VR g6*R
#define Jz j6 z
#define _a(z...) _(typeof(_(z))z9=_(z);_r(a);z9)
#define _x(z...) _(typeof(_(z))z9=_(z);_r(x);z9)
#define l(a,z) _(typeof(z)$=z;(a)<$?(a):$)
#define m(a,z) _(typeof(z)$=z;(a)>$?(a):$)
#define _g(g,z) _U(g,z,ii,Ux)
#define _G(g,z) _U(g,z,ii,Ua,Ux)
#define x(b,z) _(typeof(b)x=b;z)
#define R(t,n,z) r(tn(t,n),z)
#define f(g,z) D(U,g,z,Ux)
#define P(b,z) if(b){return _(z);}
#define D(t,g,z,x...) __attribute((minsize,noinline))_D(t,g,z,x)
#define AS(f,s,x...) ZU __attribute((naked))f(x){asm(s"ret");}
#define U_(g,z,x...) U g(x){return _(z);}
#define n6(n) (63+(n)>>6)
#define E1 (127<<23)
#define o(o) bu(ia32_##o)
#define h(b,z) {i2 $=b;i2 h=0;while(h<$){z;++h;}}
#define j(b,z) {i2 $=b;i2 j=0;while(j<$){z;++j;}}
#define _Z(g,z,x...) static void g(x){z;}
#define _V(g,z,x...) _D(g6,g,z,x)
#define $3(z,a,b,c)       ({i2 $=z;!$?_(a):1==$?_(b):_(c);})
#define $4(z,a,b,c,d)     ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):_(d);})
#define $5(z,a,b,c,d,e)   ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):_(e);})
#define $9(z,a,b,c,d,e,f,g,h,i) ({i2 $=z;!$?_(a):1==$?_(b):2==$?_(c):3==$?_(d):4==$?_(e):5==$?_(f):6==$?_(g):7==$?_(h):_(i);})
#define xe ((e2*)sx)[i]
#define oo w_(3,"oo\n")
