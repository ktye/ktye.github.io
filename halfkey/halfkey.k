/halfkey compiler
/interpreter source is stored in C D T P I S as a k table
/input parse tree is stored in A as kvm byte code
/the compiler converts A to lower form and appends it to T P I S

symtab:(0#`)!0#`                   /symbol-type map
tpis:4#tpisq:`t`p`i`s`q            /table header
load:`I8`I32`F64`I64!`b`i`f`k
ftype:`I32`F64`nn!`i`f`i           /return types (default k)
atype:`Kf`Ki!`f`i                  /arg type for monadic funcs (default k)
atyps:`f1`f2!(`i`k`f;`i`i)         /arg types for function calls
def:``k`i`f`I`C`S`F!`k`k`i`f`k`k`k`k
float1:`hypot`atan2`pow`fmin`fmax`copysign!`hypot`atan2`pow`F64min`F64max`F64copysign
float2:`exp`log`atan`abs`sqrt`ceil`floor`nearest!`exp`log`atan`F64abs`F64sqrt`F64ceil`F64floor`F64nearest

replace:{join[z;split[x;y]]}  /replacements in bytecode
join:   {(-#x)_,/y,\:x}
split:  {n_'(&n=+/rotate'[!n:#y;x~\:/:y])^x:y,x}
rotate: {y@n/x+!n:#y}

compile:{[prog;name;f];f:.f
 a:(f 3)#f 1   /args
 t:"kisfzISFZ"
 t:`$$t@0|t?(*|)'$a
 x:`$$*'$a
 symtab::(`X!`k),x!t   /symbol!type
 c:unpack/[f 0;x;t;!#t]    /code
 c:replace[c;(`1;1048576;`320);,(`1)],(`1)  /:(return)
 c:unref expand/[c;!symtab;.symtab]         /X[i] -> I64(..)
 c:split[c;,`256]                           /split expression list
 ast:*(,+tpisq!(s0;!0;!0;s0;s0:0#`))expr/c
 
 r:+tpis!(`fun`arg`sym`res;0N 0 1 0;0 0N 0 0N;name,`k`X`k)
 r:locals/[r;l`s;(l:`s`q#ast[&`asn=ast`t])`q]
 r,:+tpis!(,`ast;,0;,0N;,`)
 r,:tpis#ast[`p]:(-1+#r)|(#r)+ast`p
 prog,r[`p]:0|(#prog)+r`p
}                                       /todo fix k-literals

unpack:{[e;s;y;i];c:$[`i~y;"i ";""]
 xn:$[y':`I`F;";",($s),"n: nn ",$(s);""]
 (`p($s),":",c,"X[",($i),"]",xn),(`256),e}     /x:i X[i] ..
 

expand:{[e;s;t]  /X[i] -> rx I64 (int32 x)+8*i
 $[t~`k;replace[e;(s;.;`83);1_`p"rx I64 (i ",($s),")+8*0"]
   t~`I;replace[e;(s;.;`83);1_`p"   I32 (i ",($s),")+4*0;"]
   t~`F;replace[e;(s;.;`83);1_`p"   I32 (i ",($s),")+4*0;"];e]}

expr:{[s;e]           /compile single expression
 t:(r:prefix/[s;e])1
 $[1=#r;r;,(r 0),t[`p]+:#r 0]}  /keep root nodes negative
 
unref:{[c]s:,/(=symtab)`k`C`I`S`F   /unref at return  :Dex[x;Dex[y;..]]
 replace[c;,(`1);(1_`p(";"/:"Dex[",/:$s),";0",(#s)#"]"),(`1)]}

locals:{[t;s;q]r:(+tpis!(`loc`sym;0N 0;0N 0;(def q),s));t,r[`p]:0|(#t)+r`p}
 
prefix:{[tab;y]
 pu:{tab::tab,,+tpisq!x}              /push
 po:{r:*|tab;tab::-1_tab;r}           /pop
 li:{n:-x;tab::(n_tab),,|n#tab}
 $[`v~yt:@y;$[(y)~`27;li@*po[]`i      /list(call args)
    0~n:64\0+y              /byte code: see exec.go:func exec
        pu monadic[y;po[]]
    1~n;pu  dyadic[y;po[];po[]]
    2~n;err`indirect
    3~n;err`tetradic
    4~n;err`drop
    5~n;err`jump
    6~n;err`jumpifnot
    err`quotedverb]
   yt~`s;pu symbol y;pu const[yt;y]]
 tab}

symbol: {(,`sym;,0N;,0;,x;,symtab x)}
const:  {[t;x](,`lit;,0N;,$[`c~t;0+x;x];t;t:,$[`c~t;`i;t])}       /todo fix floats later
monadic:{[f;x]t:*x`q;
 $[(f~(.))&`sym~*|x`t;.x[-1+#x;`t]:`get
  f~(`1);.(+tpisq!(,`ret;,0N;,0N;,`k;,`k)),x[`p]:0|1+x`p
  ((op1 f),x`t;0N,(0|x`p);t,x`t;1,x`i;t,x`q)]}
dyadic:{[f;y;x]$[f~`64+(@); :index[x;y];f~`64; :assign[x;y];f~`84; :call[x;y];0];t:type2[*x`q;*y`q]
 ((op2 f),(x`t),y`t;0N,(0|1+x`p),(0|1+(#x)+y`p);1,(x`i),(y`i);t,(x`s),(y`s);q:t,(x`q),(y`q))}

index:{$[`get~*|x`t;0;err`index];p:*|x`p;s:*|x`s;t:symtab s
 $[s~`i;.(+tpisq!(`cst`typ;0N 0;0N 0N;`i,q;`i,(q:*y`q))),y[`p]:0|2+y`p                /i x (cast)
   s':!load;.(+tpisq!(,`lod;,0N;,0;,$[`k~q;`j;q];,q:load s)),y[`p]:0|1+y`p
  .(+tpisq!(,`cal;,0N;,0N;,s;,r:def ftype s)),y[`p]:0|1+(y:coerce[def atype s;y])`p]} /call

assign:{(x;y);symtab[s:*x`s]:t:*y`q;.(+tpisq!(,`asn;,0N;,0;s;t)),y[`p]:0|1+y`p}

argtypes:{[f;n];$[f':!float2;`f`f;f':!atyps;atyps`f;n#`k]}
call:{[f;x]x:coerce'[argtypes[*f`s;#x];x];.(+tpisq!(,`cal;,0N;,0N;f`s;,`k)){x,y[`p]:0|(#x)+y`p}/x}


op1:{$[f~(-);`neg;f~(~);`not;err`op1]}
op2:{$[s:ops 0+x;s;err`op2]}

ops:66 67 68 69 70 71 72 73 74 75 78!`add`sum`mul`div`and`orr`les`mor`eql`neq`xor

type2:{$[x~y;x;err`type2]} /type check


coerce:{[t;a]t:def t                   /type conversion, e.g. convert args to k is automatic
 s:def@*a`q;$[t~s;a;(t':`k`C`I`S`F)&s':`k`C`I`S`F;a           /compatible types   
 (t,s)~`k`i;(+tpisq!(,`cal;,0N;,0;,`Ki;,`k)),a[`p]:0|1+a`p    /Ki
 (t,s)~`k`f;(+tpisq!(,`cal;,0N;,0;,`Kf;,`k)),a[`p]:0|1+a`p;err`coerce,t,s]} /Kf
 

native:{[t]                                         /redirect calls to native to generated functions
 /append function halfkey: func halfkey(x,y int64)int64{return Func[int32(x)].(func(int64)int64)(y)}
 asm:(+tpis!(`fun`arg`sym`arg`sym`res`ast`ret`cli`cst`typ`get`get`arg
  0N 0 1 0 3 0 0 6 7 8 9 9 8 8
  0 0N 0 0N 0 0N 0N 0N 1 0N 0N 0N 0N 0N
  `halfkey`j`x`j`y`j``j`j`i`j`x`y`j))
 t,:asm[`p]:0|(#t)+asm[`p]
 t[*&`Native=t`s;`s]:`halfkey /replace call to Native with call to halfkey
 
 /function reg creates a function type xf(native) and stores in in Ku(f)
 asm:+tpis!(`fun`arg`sym`arg`sym`arg`sym`loc`sym`ast`asn`cal`cal`get`cal`lit`sto`sub`cst`typ`get`lit`get`cal`cal`cal`cal`get`orr`cst`typ`cst`typ`get`cst`typ`lit
  0N 0 1 0 3 0 5 0 7 0 9 10 11 12 11 14 9 16 17 18 18 17 16 9 23 24 25 26 24 28 29 29 31 31 28 34 34
  0 0N 0 0N 0 0N 0 0N 0 0N 0 0N 0N 0N 0N 120 0N 2 0N 0N 0N 12 0N 0N 0N 0N 0N 0N 2 0N 0N 0N 0N 0N 0N 0N 0
  `reg`k`f`i`i`i`a`k`r``r`l2`Ki`i`Kc`i`i`i`i`k`r`i`a`dx`Asn`sc`Ku`f`k`k`u`u`k`r`k`k`k)
 asm[36;`i]:#C;C::C,0x0000000000000070 /fix 64bit const
 t:t,:asm[`p]:0|(#t)+asm[`p]
 t:register[t;names;i:(1+!n:#names)+|/t[&`tab=t`t;`i];codes]
 t,+tpis!(n#`tab;&n;i;names)} /tab nodes (put generated funcs to indirect function table)


register:{[t;f;n;c]  /create native function and store it to global at the end of kinit (after zk())
 i:1+*&(`zk=t`s)&`cal=t`t
 e:i_t;p:e[`p];e[`p]:p[&p=0]:0N
 t:reg/[i#t;f;n;c]
 t,e[`p]:0|((#t)-i)+e`p}
reg:{[t;f;n;a]       /register function, e.g. after zk(): f:interal[567;2]
 p:*&(`kinit=t`s)&`fun=t`t
 p:*&(p<!#t)&`ast=t`t        /first ast node within fun kinit
 a:(.a)3             /arity from lambda
 c:#C;C::C,f:@[_&8;!#f;f:(8&#f)#f:$f]
 asm:+tpis!(`cal`lit`lit`lit;0N 0 0 0;0N,c,n,a;`reg`k`i`i) /reg(f,n,a)
 t,asm[`p]:p|(#t)+asm`p}


err:    {`err \x;0+x}      /trap e.g. err`type

/A:`p"f:{[xi;yi]x*y}"
/A:`p"f:{[xi;yi]i 2}"
/A:`p"f:{[xI]x[0]}"
codes:A 1+i:4*!(#(A:0,A))%4
names:A 2+i

full:{[]export native compile/[+tpis!(T;P;I;S);names;codes]}               /full interpreter
simple:{[]D::"";export compile/[+tpis!(,`prg;,0;,0;`"k.5");names;codes]}  /only extensions
export:{T::x`t;P::x`p;I::x`i;S::x`s;x}

draw:{[x]t:drawtree x`p;`<"\n"/:((2^(2*#*t)#" "),t),'(`lxy 20,10+#x)(+`id!,!#x),'x}

/B:compile/[+tpis!(,`prg;,0;,0;`"exa");names;codes]
