//(c)atw 1974-2024
#define ax !(L&x)
#define tx (3&x>>61)
#define nx (_2)x
#define Ox O[ox]
#define ox (N-1&x>>32)
#define R(x,n,e) r(x,N(n,r=e))
#define AT(e...) __attribute((e))
#define Vn(n) AT(vector_size(1<<n),aligned(1))
typedef unsigned char Z Vn(6),_0;typedef unsigned int _2;typedef unsigned long(*_)(),u,X Vn(4),_3;
#define zs Z(s)
#define zr Z(sr)
#define zx Z(sx)
#define zy Z(sy)

#define _(e...) ({e;})
#define ua(g,e) u_(g,e,_0**s)
#define us(g,e) u_(g,e,_0*s)
#define un(g,e) u_(g,e,_2 n)
#define uz(g,e) u_(g,e,Z x)
#define ns(g,e) u_(g,e,_2 n,_0*s)
#define nz(g,e) u_(g,e,_2 n,Z x)
#define f(_,e)  u_(_,e,u x)
#define F(_,e)  u_(_,e,u x,u y)
#define ff(g,e) u_(g,e,u f,u x)
#define fF(g,e) u_(g,e,u f,u x,u y) 
#define nf(g,e) u_(g,e,_2 n,u x)
#define g(g,e)  z_(g,e,Z x)
#define G(g,e)  z_(g,e,Z x,Z y)
#define ng(g,e) z_(g,e,_2 n,Z x)
#define nG(g,e) z_(g,e,_2 n,Z x,Z y)
#define fg(g,e) z_(g,e,u f,Z x)
#define fG(g,e) z_(g,e,u f,Z x,Z y)
#define u_(g,e,x...) Zu g(x){return _(e);}
#define z_(g,e,x...) Zz g(x){return _(e);}
#define Z(e) (*(Z*)(e))
#define r(a,e) _(typeof(a)r=a;e;r)
#define x(a,e) _(typeof(a)x=a;e)
#define y(a,e) _(typeof(a)y=a;e)
#define _x(e) r(e,_r(x))
#define _y(e) r(e,_r(y))
#define _N(n,e) {_2 i=n;W(i--){e;}}
#define N(n,e) {_2 _n=n;_2 i=-1;W(++i<_n){e;}}
#define W(e) while(e)
#define P(a,e) if(a){return _(e);}
#define c3(x,a,b,c) _(_2 _i=x;!_i--?a:!_i?b:_(c))
#define c4(x,a,b,c,d) _(_2 _i=x;!_i--?a:!_i--?b:!_i?c:_(d))
#define c5(x,a,b,c,d,e) _(_2 _i=x;!_i--?a:!_i--?b:!_i--?c:!_i?d:_(e))
#define c6(x,a,b,c,d,e,f) _(_2 _i=x;!_i--?a:!_i--?b:!_i--?c:!_i--?d:!_i?e:f)
#define c7(x,a,b,c,d,e,f,g) _(_2 _i=x;!_i--?a:!_i--?b:!_i--?c:!_i--?d:!_i--?e:!_i?f:g)
#define oo w(2,"oo")
#define n0 (_0)n
#define Z_ static _
#define Z0 static _0
#define Z2 static _2
#define Zu static u
#define Zz static Z
#define bo(f) __builtin_##f
#define xo(f) __builtin_ia32_##f##128
#define zo(f) __builtin_ia32_##f##512
#define zg(f) __builtin_ia32_##f##qi512
#define zm(f) __builtin_ia32_##f##qi512_mask
AT(naked)Zu _t(){asm("rdtsc;shl $32,%rdx;or%rdx,%rax;ret");}
#define ay x(y,ax)
#define ty x(y,tx)
#define ny x(y,nx)
#define sy x(y,sx)
#define nr x(r,nx)
#define sr x(r,sx)
