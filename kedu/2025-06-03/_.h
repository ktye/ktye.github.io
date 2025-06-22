#define IR I*R
#define IY I*Y
#define IZ I*Z
#define P(b,x) if(b)return({x;});
#define ri r[i]
#define Ci C[i]
#define oo ws("oo")
#define v(n) __attribute((vector_size(1<<n),aligned(1)))
typedef unsigned long(*_)(),U,J v(6);typedef char G v(6),_G v(6-2);typedef unsigned I v(6),I_ v(6+2);typedef int Int v(6);typedef float e,E v(6);
#undef v
#define ZG static G
ZG Z0,I0={0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63};
#define ZU static U
#define Gz G z
#define Gf(g,x) D(G,g,x,Gz)
#define GR G*R
#define GY G*Y
#define GZ G*Z
#define Ri R[i]
#define Yi Y[i]
#define Zi Z[i]
#define i1 65536
#define gg char g
#define ee e e
#define ii unsigned i
#define D(t,g,x,a...) static t g(a){return({x;});}
#define U(g,x,a...) D(U,g,x,a)
#define f(g,x) U(g,x,Uz)
#define u(g,x,a...) D(unsigned,g,x,a)
#define e(g,x,a...) static e g(a){return({x;});}
#define Zg static char
#define Uz U z
Zg*L="30123456789:;456";u(ue,*(unsigned*)&e,ee)e(eu,*(e*)&i,ii)U(b,(1L<<i)-1,ii)f(n3,7+z>>3)f(n4,15+z>>4)f(n6,63+z>>6)f(n9,511+z>>9)
#define tz (15&z>>59)
#define iz (unsigned)z
#define ez eu(z)
#define o(o) __builtin_##o
#define z(b,x) ({typeof(b)z=b;x;})
#define r(b,x) ({typeof(b)r=b;x;r;})
#define Un U n
#define Ur U r
#define Uy U y
#define zi z[i]
#define Zu static unsigned
#define u$ unsigned $
#define ih unsigned h
#define ij unsigned j
#define ik unsigned k
#define im unsigned m
#define in unsigned n
#define it unsigned t
#define U_(g,x,a...) U g(a){return({x;});}
#define G_(g,x) U_(g,x,ii,Uy,Uz)
#define V(g,x,a...) static void g(a){x;}
#define i(b,e) {unsigned $=b;ii=0;while(i<$){e;++i;}}
#define $(b,z) if(b){z;}else
#define $3(z,a,b,c) ({unsigned $=z;!$?a:1==$?b:c;})
#define $4(z,a,b,c,d) ({unsigned $=z;!$?a:1==$?b:2==$?c:d;})
#define $5(z,a,b,c,d,e) ({unsigned $=z;!$?a:1==$?b:2==$?c:3==$?d:e;})
#define $6(z,a,b,c,d,e,f) ({unsigned $=z;!$?a:1==$?b:2==$?c:3==$?d:4==$?e:f;})
#define $7(z,a,b,c,d,e,f,g) ({unsigned $=z;!$?a:1==$?b:2==$?c:3==$?d:4==$?e:5==$?f:g;})
#define $8(z,a,b,c,d,e,f,g,h) ({unsigned $=z;!$?a:1==$?b:2==$?c:3==$?d:4==$?e:5==$?f:6==$?g:h;})
#define ty z(y,tz)
#define iy z(y,iz)
#define ey z(y,ez)
#define W(x) while(({x;}))
#define ss char*s
U wr(ii,ss);f(wc,wr(1,&z);0)U(wn,wr(i,s);wc(10),ii,ss)Zg d[1<<8];U(wi,ss=d+16;ij=i>>31?-i:i;do*--s=48+j%10;W(j/=10);if(i>>31)*--s='-';wn(d+16-s,s);i,ii)
