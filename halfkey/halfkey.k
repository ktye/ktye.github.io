/halfkey compiler
/interpreter source is stored in C D T P I S as a k table
/input parse tree is stored in A as kvm byte code
/the compiler converts A to lower form and appends it to T P I S
/the result is compiled to wasm with wb


shift:(`$$"cisfzk")!0 2 2 3 4 3
symtab:(0#`)!0#`                   /symbol-type map
tpisq:`t`p`i`s`q                   /table header

compile:{[name;f];f:.f
 a:(f 3)#f 1   /args
 t:"kisfzISFZ"
 t:`$$t@0|t?(*|)'$a
 x:`$$*'$a
 symtab::x!t   /symbol!type
 c:f 0         /code
 c:split[c;,`256] /split expression list
 tab:,+tpisq!(0#`;!0;!0;0#`;!0)      /stack of tpisq table and types
 *tab expr/c
}

expr:{[s;e]           /compile single expression
 r:prefix/[s;e]
 t:r 1
 ,(r 0),t[`p]:translate[#r 0;t`p]}
 

 
prefix:{[tab;y]
 pu:{tab::tab,,+tpisq!x}              /push
 po:{r:*|tab;tab::-1_tab;r}           /pop
 $[`v~yt:@y;$[0~n:64\0+y              /byte code: see exec.go:func exec
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
const:  {[t;x](,`lit;,0N;,$[`c~t;0+x;x];,`;,$[`c~t;`i;t])}       /todo fix floats later
monadic:{[f;x]t:*x`q;
 $[(f~(.))&`sym~*x`t;.x[0;`t]:`get
  ((op1 f),x`t;0N,translate[0;x`p];t,x`t;1,x`i;t,x`q)]}
dyadic:{[f;y;x]t:type2[*x`q;*y`q]
 ((op2 f),(x`t),y`t;0N,translate[1;x`p],translate[1+#x;y`p];1,(x`i),(y`i);t,(x`s),(y`s);t,(x`q),(y`q))}

op1:{$[f~(-);`neg;f~(~);`not;err`op1]}
op2:{$[s:ops 0+x;s;err`op2]}

ops:66 67 68 69 70 71 72 73 74 75 78!`add`sum`mul`div`and`orr`les`mor`eql`neq`xor

translate:{[n;p]0|n+p}   /catenate(translate) parent vector by n and link 0N to 0


type2:{$[x~y;x;err`type2]} /type check

err:{`err \x;0+x}      /trap e.g. err`type

/build:{[s;x]$[`v~@x;$[64>0+x;v1[s;x];v2[s;x]];s,x]}  /postfix byte code to treetable
/v1:{[s;v]}
/v2:{[s;v]`nyi}

expand:{[b;x;t]     /macro expansions in byte code
 c:$x
 xp:`$c,"p"
 xi:`$c,"i"
 sh:$[shift t;(shift t;\;`83);()]
 b:replace[b;(/;`83);,(/)]                         /shift-adverb as verb
 b:replace[b;(\;`83);,(\)]                         /
 b:replace[b;(xi;.);(`i;.;`x;.;`83)]               /xi    -> x[i]
 b:replace[b;(`x;.;`83);sh,(xp;.;+;`I32;.;`83)]    /x[..] -> I32[xp+shift\..]
}


join:   {(-#x)_,/y,\:x}
split:  {n_'(&n=+/rotate'[!n:#y;x~\:/:y])^x:y,x}
rotate: {y@n/x+!n:#y}
replace:{join[z;split[x;y]]}

/example: expand[`p"1+xi";`x;`i]

B:compile[`f;{[xi;yi]1+x*y;2*x;3+x}]

/compile'[A 2+i;A 1+i:4*!(#(A:0,A))%4]         /compile each function
