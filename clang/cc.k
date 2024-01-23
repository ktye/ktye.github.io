/c compiler

F:(0#`)!()
hx8:{[i]"0x",`x@|C i+!8}
cc:{[o]opts::o
 F[`prg`mem`con`var`tab`fun`arg`sym`res`loc`ast`lod`sto]:(ccprg;ccmem;cccon;ccvar;cctab;ccfun;ccarg;ccsym;ccres;ccloc;ccast;cclod;ccsto)
 F[`add`and`bnd`ant`asn`cal`cli`cnd`dfr`div`drp`eql`cst]:(ccadd;ccand;ccbnd;ccant;ccasn;cccal;cccli;cccnd;ccdfr;ccdiv;ccdrp;cceql;cccst)
 F[`for`get`Get`gte`jmp`les`lit`lte`mod`mor`mul`neg    ]:(ccfor;ccget;ccGet;ccgte;ccjmp;ccles;cclit;cclte;ccmod;ccmor;ccmul;ccneg)
 F[`neq`nop`not`orr`bor`xor`ret`shl`shr`stm`sub`swc`typ]:(ccneq;ccnop;ccnot;ccorr;ccbor;ccxor;ccret;ccshl;ccshr;ccstm;ccsub;ccswc;cctyp)

 ccren'`main`ldexp`hypot`atan2`atan`exp`log`pow /rename libm
 i:i@&{(0N~|/(T 1_c)?`swc`stm)&3=#c:&P=x}'i:&T=`cnd  /keep ternary
 rwcnd'|j@&~(j:&(~`=S)&(T=`cnd)|T=`swc)?\i     /rewrite cnd/swc expressions 
 S[0]:$[0N~i:o?`lib;S 0;o 1+i]                 /emit`lib`name (instead of main + remove func main)
 n:{x[y]+:1}/(,&#P),P;n[0]-:1;                 /number of children per node
 s:{c:(0,(#x)-z)^x                             /cut args from stack
   (c 0),,,/(F T y)[y;|c 1]}/[();|!#P;|n]      /fold over the tree in reverse order
*s}


INS:{[i;x]T::ins[i;T;*x];P::ins[i;@[P;&P>i-1;+;1];x 1];P[1+i]:i;I::ins[i;I;x 2];S::ins[i;S;x 3];S}
ins:{[i;x;y](i#x),y,i_x}
del:{T::T n:(!#P)_x;P::@[P n;&(P n)>x-1;-;1];I::I n;S::S n;S}
rwcnd:{c:|1_&P=x;S[x]:`;P[x]:P x-1;c INS\(T x;1+x;I x; S x:x-1);del x;restm'|i@&(T P i:&`stm=T)?\`ret`asn}
restm:{c:*|&P=x;INS[c;(T x-1;x;I x-1;S x-1)];P[x]:P[x-1];del[x-1]} /fix ret stm

ccren:{S[&(S=x)&T?\`fun`cal]:s:`$($x),"_";}

nl:{$[#x:"\n"/x;x,"\n";x]}

cctype:`i`u`j`k`f!("int32_t";"uint32_t";"int64_t";"uint64_t";"double")

ccprg:{
 f:(S i)!i:&T=`fun
 fpre:nl@ccsig'f@?S i@&i<f S i:&T=`cal
 fncs: ,/y@&`fun=T c:1_&P=0
 cons:nl y@&`con=T c
 vars:nl y@&`var=T c
 runt:$[`nort?opts;"";ccrnt]
 data:$[#D;"memcpy(M_,\"",("\\x","\\x"/(#D)^`x D),"\",",($#D),");";""]
 ftab:"void *F_[",($#&`tab=T c),"]"
 tabl:ftab,"={",(","/y@&`tab=T c),"};\n"
 mems:nl y@&`mem=T c
 init:$[|/(#mems;#data;#tabl);nl("char *init(void){\n";mems;data;"return M_;}\n");""]
 (ftab,";";runt;fpre;cons;vars),(,fncs),tabl,(ccfmt init)}
 
ccfun:{
 $[(`main~S x)&`lib?opts; :""; 0]
 stat:$[I x;"";"static "]
 args:", "/y@&`arg=T c:&x=P
 ret:$[#r:", "/y@&`res=T c;r;"void"]
 locs:nl@{(cctype x)," ",y,";"}'[!g;.g:","/'(y i)@=(S c)i:&`loc=T c]
 defr:     *y@&`dfr=T c
 setj:$[#defr;"if(!setjmp(jb_)){";""]
 body: 2_-1_y@*&`ast=T c
 ccfmt@,/(stat;ret;" ";$S x;"(";$[#args;args;"void"];"){\n";setj;locs;body;defr)}

ccsig:{
 args:","/cctype S c@&`arg=T c:&x=P
 stat:$[I x;"";"static "]
 ret:$[#r:cctype S c@&`res=T c;*r;"void"]," "
 stat,ret,($S x),"(",$[#args;args;"void"],");"}

ccmem:{y;("/*Memory";$[`b~S x;"2";""];"(";$I x;");*/")}
cctab:{y;$S x}

cclit:{hi:{*`i C 4+x+!4};lo:{*`i C x+!4}
 y;i:I x;$[`f~t:S x;0+`flt
           `i~t;$[0N~i;"(int32_t)0x80000000";$i]
           `u~t;$[i<0;"0x",`x@|`c@,i;$i]
           `j~t;$[i~0;,"0";(-1~h:hi i)&0>l:lo i;$l;(h~0)&l>0;$l;hx8 i],"ll"
           `k~t;$[i~0;,"0";(0~h:hi i)&0<l:lo i;$l;hx8 i],"ull";"???"]}
 

ccvar:{" "/("static"; cctype S 1+x;  $S x;,"=";(*y),";")}
cccon:{"static const ",(cctype S 1+x)," ",($S x),"=",(*y),";"}

cccst:{("(";cctype S x;")";,"(";y 1;,")")}

cctyp:{y;cctype S x} 
ccres:{y;cctype S x}
ccloc:{y}
ccsym:{y;$S x}
ccarg:{(cctype S x;" ";*y)}

ccstm:{ "{\n",(,/y,\";\n"),"}\n"}
ccast:ccstm
ccget:{y;$S x}
ccGet:ccget
ccret:{"return ",(", "/y),";\n"}

ccsiz:`b`i`j`f!`I8`I32`I64`F64
cclod:{($ccsiz S x;"(";y 0;")")}
ccsto:{("Set";$ccsiz S x;"(";y 0;",";y 1;")")}

cccal:{($S x;,"("; ","/y ;,")")}
ccdrp:{y}

cccli:{n:I x;("((";$[#r:cctype S x;r;"void"];"(*)("; $[#a:","/n#(1+n)_y;a;"void"]; "))F_[";*y;"])(";  ","/n#1_y; ")")}
ccasn:{r:(s:$S x),"=",(*|y),";\n";$[((n:3+2*#s)#r)~s,"=(",s,"+";$["+=1"~-3#r:s,"+=",(n_-3_r);s,"++";r],";\n";r]}
cccnd:{$[S x; (ccnd@*y;"?(";y 1;"):(";y 2;")") ;"if",(ccnd y 0),(ccemb ccsem y 1),$[3~#y;"else ",(ccemb ccsem y 2);""]]}
ccnop:{y;""}
ccswc:{("switch(";*y;"){\n"),(1_(@[("case ",/$-1+!#y); (-1+#y)*I x; "default"] ,\":"),'(ccsem'y),\"break;\n"),"}" }
 
ccfor:{$[I x;ccwhl[x;y];("for(;";ccnd y 0;";";$[";\n"~-2#r:y 1;-2_r;r];")";y 2)]}
ccwhl:{((,"do"),(,-12_y 2),(,y 1)),("}while";ccnd y 0;";\n")}
ccjmp:{y;$[I x;"break";"continue"]}
ccdfr:{("else{";*y;";}\n}")}

cc1:{x,*z}
cc2:{z;("(";z 0;x;z 1;")")}
ccneg:cc1"-"; ccnot:cc1"!"
ccadd:cc2"+"; ccsub:cc2"-"; ccmul:cc2"*"; ccdiv:cc2"/"; ccmod:cc2"%"
cceql:cc2"==";ccgte:cc2">=";ccles:cc2"<"; cclte:cc2"<=";ccmor:cc2">"; ccneq:cc2"!="
ccand:cc2"&"; ccbnd:cc2"&&";ccant:cc2"&~";ccorr:cc2"|"; ccbor:cc2"||";ccxor:cc2"^"; ccshl:cc2"<<";ccshr:cc2">>"

ccnd:{$["!=0)"~t:-4#x;(-4_x),")";"==0)"~t;"(!",(1_-4_x),")";x]}
ccsem:{$[(*|x)?";}\n";x;x,";"]}
ccemb:{$["{"=*x;x;"{\n",x,"\n}\n"]}

ccfmt:{
 x:@[x;1+find["}\nelse";x];" "]
 x:@[x;1+find["}\nwhil";x];" "]
 x:@[x;1+find["};\n"   ;x];" "]
 l:"\n"\x;
 l@:&~l~\"r=r;"
 l@:&~(""~/l)|(,";")~/l;s:_32+&'(-"}"=*'l)+-1_0,+\+/'("{"=l)-"}"=l
 ,/(s,'l),\"\n"}

/run time
ccrnt:"
typedef char int8_t;
typedef int int32_t;
typedef unsigned int uint32_t;
typedef long long int64_t;
typedef unsigned long long uint64_t;
static char M_[64*1024];
static int32_t  *I_= (int32_t*)M_;
static uint64_t *U_=(uint64_t*)M_;
#define I8(x)    (int8_t)(M_[x])
#define I32(x)           (I_[(x)>>2])
#define I64(x)  (int64_t)(U_[(x)>>3])
#define F64(x) ((double*)U_)[(x)>>3]
#define  SetI8(x,y) M_[x]=(char)(y);
#define SetI32(x,y) I_[(x)>>2]=(y);
#define SetI64(x,y) U_[(x)>>3]=(uint64_t)(y);
#define I32B(x) (int32_t)(x)
void *memcpy(void *dest, const void * src, unsigned long n);
static void Memorycopy(int32_t dst, int32_t src, int32_t n){ __builtin_memcpy(M_+dst, M_+src, n); }
static void Memoryfill(int32_t p, int32_t v, int32_t n){     __builtin_memset(M_+p, v, n); }
static int32_t  I32clz(int32_t x) { return (int32_t)__builtin_clz((unsigned int)x); }

int32_t Write(int32_t file, int32_t nfile, int32_t src, int32_t n);
static void panic(int32_t x) { I32(-x); }
"
ccmain:"int main(int args, char **argv){
 args_=(int32_t)args;
 argv_=argv;
 init();
 main_();
 return 0;
}
"
