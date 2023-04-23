/halfkey compiler
/interpreter source is stored in C D T P I S as a k table
/input parse tree is stored in A as kvm byte code
/the compiler converts A to lower form and appends it to T P I S

symtab:(0#`)!0#`                   /symbol-type map
tpis:4#tpisq:`t`p`i`s`q            /table header
shift:(`$$"cisfk")!0 2 2 3 3
load:(`$$"cisfk")!`I8`I32`I32`F64`I64
ftype:`I32`I64!`i`k

compile:{[prog;name;f];f:.f
 a:(f 3)#f 1   /args
 t:"kisfzISFZ"
 t:`$$t@0|t?(*|)'$a
 x:`$$*'$a
 symtab::(`X!`k),x!t   /symbol!type
 c:unpack/[f 0;x;t;!#t]    /code
 c:replace[c;(`1;1048576;`320);,(`1)],(`1)  /:(return)
 c:unref expand/[c;!symtab;.symtab]          /X[i] -> I64(..)
 c:split[`c \c;,`256] /split expression list
 ast:*(,+tpisq!(s0;!0;!0;s0;s0:0#`))expr/c
 
 r:+tpis!(`fun`arg`sym`res;0N 0 1 0;0 0N 0 0N;name,`k`X`k)
 r,:+tpis!(,`ast;,0;,0N;,`)
 r,:tpis#ast[`p]:(-1+#r)|(#r)+ast`p
 /r:r epilog/|1+&`ret=r`t
 prog,r[`p]:0|(#prog)+r`p
}                                       /todo fix k-literals

unpack:{[e;s;y;i];y:$[y':`i`f`I`F;y;`]
 (`p@ \($s),":",($y)," X[",($i),"]"),(`256),e}     /x:i X[i] ..

expand:{[e;s;t]  /X[i] -> rx I64 (int32 x)+8*i
 $[t':`I`F`k;replace[e;(s;.;`83);1_`p"rx I64 (i ",($s),")+8*0"]
   t~`i     ;replace[e;(s;.;`83);1_`p"   I32 (i ",($s),")+4*0"]
   t~`f     ;replace[e;(s;.;`83);1_`p"   I32 (i ",($s),")+4*0"];e]}

expr:{[s;e]           /compile single expression
 t:(r:prefix/[s;e])1
 $[1=#r;r;,(r 0),t[`p]+:#r 0]}  /keep root nodes negative
 

/kif:{[s;t]$[s':`i`f;(+tpis!(,`cal;,0N;,0N;,`$"K",$s)),t[`p]+:1;t]} /call Ki or Kf on atoms

unref:{[c]s:,/(=symtab)`k`C`I`S`F   /unref at return  :Dex[x;Dex[y;..]]
 replace[c;,(`1);(1_`p(";"/:"Dex[",/:$s),";0",(#s)#"]"),(`1)]}

 
 
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
  f~(`1);.(+tpisq!(,`ret;,0N;,0N;,`k;,`k)),x[`p]:0|1+x`p /todo Ki Kf
  ((op1 f),x`t;0N,(0|x`p);t,x`t;1,x`i;t,x`q)]}
dyadic:{[f;y;x]$[f~`64+(@); :index[x;y];f~`64; :assign[x;y];f~`84; :call[x;y];0];t:type2[*x`q;*y`q]
 ((op2 f),(x`t),y`t;0N,(0|1+x`p),(0|1+(#x)+y`p);1,(x`i),(y`i);t,(x`s),(y`s);t,(x`q),(y`q))}

index:{$[`get~*|x`t;0;err`index];p:*|x`p;s:*|x`s;t:symtab s;sh:shift s;ld:load s
 $[s~`i;.(+tpisq!(`cst`typ;0N 0;0N 0N;`i,q;`i,(q:*y`q))),y[`p]:0|2+y`p   /i x (cast)
   .(+tpisq!(,`cal;,0N;,0N;,s;,r:ftype s)),y[`p]:0|1+y`p]}               /call

assign:{.(+tpisq!(,`asn;,0N;,0;(*x)`s;(*x)`q)),y[`p]:0|1+y`p}

call:{[f;x].(+tpisq!(,`cal;,0N;,0N;f`s;,`k)){x,y[`p]:0|(#x)+y`p}/x}


op1:{$[f~(-);`neg;f~(~);`not;err`op1]}
op2:{$[s:ops 0+x;s;err`op2]}

ops:66 67 68 69 70 71 72 73 74 75 78!`add`sum`mul`div`and`orr`les`mor`eql`neq`xor

type2:{$[x~y;x;err`type2]} /type check


err:{`err \x;0+x}      /trap e.g. err`type

/build:{[s;x]$[`v~@x;$[64>0+x;v1[s;x];v2[s;x]];s,x]}  /postfix byte code to treetable
/v1:{[s;v]}
/v2:{[s;v]`nyi}

/expand:{[b;x;t]     /macro expansions in byte code
/ c:$x
/ xp:`$c,"p"
/ xi:`$c,"i"
/ sh:$[shift t;(shift t;\;`83);()]
/ b:replace[b;(/;`83);,(/)]                         /shift-adverb as verb
/ b:replace[b;(\;`83);,(\)]                         /
/ b:replace[b;(xi;.);(`i;.;`x;.;`83)]               /xi    -> x[i]
/ b:replace[b;(`x;.;`83);sh,(xp;.;+;`I32;.;`83)]    /x[..] -> I32[xp+shift\..]
/}
//example: expand[`p"1+xi";`x;`i]

replace:{join[z;split[x;y]]}
join:   {(-#x)_,/y,\:x}
split:  {n_'(&n=+/rotate'[!n:#y;x~\:/:y])^x:y,x}
rotate: {y@n/x+!n:#y}

/ x'        int32(x)
/ y:<x[i]   copy/clone
/ x:I y[i]
/ i:i x

A:`p"f:{[xi;yi]x*y}"
/A:`p"f:{[xi;yi]i 2}"
codes:A 1+i:4*!(#(A:0,A))%4
names:A 2+i

full:{[]export compile/[+tpis!(T;P;I;S);names;codes]}               /full interpreter
simple:{[]export compile/[+tpis!(,`prg;,0;,0;`"k.5");names;codes]}  /only extensions
export:{T::x`t;P::x`p;I::x`i;S::x`s;x}

draw:{[x]t:drawtree x`p;`<"\n"/:((2^(2*#*t)#" "),t),'(`lxy 20,10+#x)(+`id!,!#x),'x}

B:compile/[+tpis!(,`prg;,0;,0;`"exa");names;codes]
