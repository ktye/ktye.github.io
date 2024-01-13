#include"a.h"//cc -Os -oa a.c -w
//include copies the content from a.h here. as if it was one file in the first place.


//these are multiple functions:
F(w_,write(1,y,x))f(w,127>x?w_(1,(u)&x):w_(strlen(x),x))F(err,w(x);w(58);w(y);w(10);96)f(qz,Qz(1)0)
//lets take them apart:

 F(w_,write(1,y,x))
 //write is a unix system call. see "man 2 write".
 //the above defines a function called w_(x,y) that takes 2 arguments and calls write.
 //think of it like a projection over the first parameter (1 is stdout)


 f(w,127>x?w_(1,(u)&x):w_(strlen(x),x))
 //this defines another function w(x), again like a projection now using only 1 argument.
 //if x is small it prints a single character (the ascii value), otherwise a string.
 //strlen returns the length of the string, in c that's until there is a 0 within the character data.
 //it also uses the ternary operator:
 //a?b:c that's like cond: $[a;b;c] but it's hard to know/learn the precedence rules.

 
 F(err,w(x);w(58);w(y);w(10);96)
 //err(x,y) is used by Qr and prints an error message
 // #define Qr(e) if(e){return err((u)__func__,(u)"rank");}
 //__func__ is special, the preprocessor replaces it with the current function name.
 //so Qr(expr) writes an error message if the expression is nonzero.
 //it looks like that: ind:rank<newline>
 //96 is the return value, it propagates the parse error back to the calling function.

 
 f(qz,Qz(1)0)
 //function qz always prints an error. we know it as `nyi.


G(m,(u)memcpy((void*)x,(void*)y,f))
//#define _u(f,e,x...) u f(x){return _(e);}
//#define G(g,e) _u(g,e,u f,u x,u y)
//
//G(m,.. defines function m. maybe short for memcpy or move.
//it copies memory, but arthur seems to prefer a different order of the arguments.
//it's used e.g. in Cat below: m(nx,r,x) means copy #x elements(bytes)
//from the position x (that's the memory index where the vector-list of x starts)
//to the position of the destination r (r like result/return value).

f(a,char*s=malloc(x+1);*s++=x;(u)s)
//this is a central part of k. the allocator. malloc is libc's standard memory allocator.
//the line defines function a. it's used like a(1) to create a one element vector.
//under the cover it allocates 1+x number of elements and stores the size in the first.
//it then increases the pointer and returns s.
//as above: s is just a number but points to memory where the array data list starts.
//implictly we know that 1 value before, e.g. "at" s-1 we find the array length.
//it's just a convention. e.g. strlen we used above needs to count elements until it finds a 0,
//called a sentinal value. this takes some time. in k we usually store the array length directly,
//e.g. like here just in front of the data.

f(ind,Qr(!ax)x=a(x);i(nx,xi=i)x)
//function ind is monadic !x. index-generator? i don't know why arthur calls this ind now.
//i liked til.
//Qr(!ax) checks the argument, you call the function like ind(x). if x is a vector it should fail.
//only atoms are allowed. ax means: is x atomic? the rank-check Qr(..) takes over if x is a vector.
//this is how ax is defined:
// #define ax (10>x)
//that means atoms are all numbers by themselves 0..9.
//vectors are pointers that are usually much larger and point to a memory location.

f(cat,Qr(!ax)u r=a(1);*sr=x;r)
//as above f(cat,..) defines a monadic function. arthur uses cat Cat for enlist,catenation.
//later it's even worse: cnt,Cnt means take count,take.
//enlist allocates a vector of length 1 and puts the atom inside.

F(Cat,x=ax?cat(x):x;y=ay?cat(y):y;u r=a(nx+ny);m(ny,r+nx,y);m(nx,r,x))
//captial-F: defines a dyadic function. catenate.
//first it checks both x and y, and enlists each if it is atomic.
//r=a(nx+ny) allocates a result vector, long enough to hold both lists and
//m(..) copies both inputs to the right position within r.


f(at,Qr(ax)*sx)
//at is our new first. it allowes only vectors and returns the "value at the start"
//*s is a pointer-dereference. think of it as x at 0, or x[0].

F(At,Qr(ax||!ay)sx[y])
//dyadic At allows only x-vectors and atom index. x@y is indexing x[y].

f(cnt,Qr(ax)nx)
//monadic #x returns, as an atom, the length of a vector.

F(Cnt,Qr(!ax||ay)x=a(x);m(nx,x,y))
//dyadic x#y is take. even if the function is called Cnt here.
//it checks if x is an atom and y a vector, then allocates a result of the length x.
//it also uses x as the result value instead of r.
//m copies the first nx elements from y to x. we can call "nx" at this point because
//we just allocated it. using nx at the start of the function would not work, when it was still an atom.

F(Add,ax?ay?x+y:Add(y,x):r(a(ny),i(nr,ri=(ax?x:xi)+yi)))
//Add is the only only scalar function defined, allowing all 4 atom/vector combinations possible.
//it checks if x is an atom, if y is an atom and calls itself again with reversed arguments,
//to reduce the number of combinations.
//the function uses two nested ternary expressions which may take some time to read.
//the last expression r(...) assumes y is a vector now and does r[i]:$[ax;x;x i] looping over i.
//i(..) is the loop (which you never wanted to see):
// #define i(n,e) {int $n=n;int i=0;for(;i<$n;++i){e;}}
//arthur also built in an error for you to spot (the one 1 send yesterday).

u(*f[])()={0,qz,ind,cnt,cat,at},(*F[])()={0,Add,qz,Cnt,Cat,At};
//this defines two lists of functions(pointers).
//f is the list of monadic functions: qz,ind,cnt,cat,at: +!#,@
// +x is nyi(qz).
//F is the list of dyadic functions: Add,qz,Cnt,Cat,At
// x!y is nyi.
//c's function pointer syntax is horrible. don't even try to bother at the start of learning c.

u U[26];f(n,10>x-48?x-48:U[x-97])
//U is a static array that should hold single char variables.
//only we have no way of assigning them so it's useless.
//f(n,..) defines function n(x) probably noun.
//you pass it a character (an ascii value) an it substracts the value '0' (48).
//for letters it substracts 'a'/97 and looks them up within U, but there is nothing to find.

char*V=" +!#,@";f(v,(strchr(V,x)?:V)-V)
//V is a constant character vector that we use in the parser.
//f(v,..) defines function v(x) i guess for verb.
//strchr is a library function that searches V and returns the index x, like V?x.
//only it's a little more complicated: it returns the pointer (an absolute value much larger)
//when it finds something, or 0 when nothing is found.
//x?:y is a special case of the ternary operator and a shortcut for x?x:y
//at the end V is substracted, so the end result is again the index we wanted in the first place.

us(e,u i=*s++;v(i)?x(e(s),Q(x)f[v(i)](x)):x(n(i),*s?y(e(s+1),Q(y)F[v(*s)](x,y)):x))
//function e(x) is the core of the parser. it parses an expression.
//it's parsing recursively, and applies the monadic or dyadic functions directly.
//so we do not build a parse tree here, or byte code, we execute directly like apl.
//it soes nothing fancy like operators/parens... just monadic or dyadic infix application.

us(ws,u x=*s?e(s):0;Q(x)ax?w(48+x):_(i(nx,w(48+xi);w(32))0);w(10))
//ws(s) parses the input s by calling e(s) and prints the result.
//it loops over vector responses printing them nicely with spaces between the elements.

int main(){char s[99];while(1)w(32),s[read(0,s,99)-1]=0,ws(s);}
//main is the entry point to the program. it allocates our input buffer s (don't type more than 100 characters).
//then goes right in the read-eval-print-loop.
//the string needs to be terminated by 0 and ws(s) parses and prints the current input line.


typedef unsigned long u;
#define _u(f,e,x...) u f(x){return _(e);}
#define ax (10>x)
#define nx sx[-1]
#define sx ((char*)x)
#define xi sx[i]
#define _(e) ({e;})
#define r(a,e) _(u r=a;e;r)
#define x(a,e) _(u x=a;e)
#define y(a,e) _(u y=a;e)
#define i(n,e) {int $n=n;int i=0;for(;i<$n;++i){e;}}
#define f(f,e) _u(f,e,u x)
#define F(f,e) _u(f,e,u x,u y)
#define G(g,e) _u(g,e,u f,u x,u y)
#define us(f,e) _u(f,e,char*s)
#define Q(e) if(96==(e))return 96;
#define Qr(e) if(e){return err((u)__func__,(u)"rank");}
#define Qz(e) if(e){return err((u)__func__,(u)"todo");}
#define ri sr[i]
#define yi x(y,xi)
#define nr x(r,nx)
#define ny x(y,nx)
#define sr x(r,sx)
#define sy x(y,sx)
#define ay x(y,ax)

