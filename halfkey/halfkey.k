/halfkey compiler
/interpreter source is stored in C D T P I S as a k table
/input parse tree is stored in A as kvm byte code
/the compiler converts A to lower form and appends it to T P I S
/the result is compiled to wasm with wb


shift:(`$$"cisfzk")!0 2 2 3 4 3

compile:{[name;f];f:.f
 a:(f 3)#f 1   /args
 t:"kisfzISFZ"
 t:`$$t@0|t?(*|)'$a
 x:`$$*'$a
 st:x!t        /symbol!type
 c:f 0         /code
 c:split[c;,`256] /split expression list
 st expr/c
}

expr:{[st;e]           /compile single expression, track types
 x:prefix/[(st;0#`;());e]
 `result \x
}
 
prefix:{st:x 0;t:x 1;s:x 2
 pu:{t::t,x;s::`pu \s,y}                                          /push type and value to stack
 po:{[]r:*|s;s::-1_s;t::-1_t;r}                                   /pop
 $[`v~yt:@y;$[0~n:64\0+y                                          /byte code: see exec.go:func exec
        pu[,t1;,y,/*(v;t1:type1[y;v:po[];*|t])]                   /monadic 
    1~n;pu[,t2;,y,/2#(v1;v2;t2:type2[y;v1:po[];*|t;v2:po[];*|t])] /dyadic
    2~n;err`dyadicindirect
    3~n;err`tetradic
    4~n;err`drop
    5~n;err`jump
    6~n;err`jumpifnot
    err`quotedverb]
   yt~`s;pu[st y;y];pu[yt;y]]
 (st;t;s)}


/type propagation
type1:{[f;x;xt]        /monadic: typeof f(x:xt)  xt is a type vector for each expr node
 (*xt),xt}
type2:{[f;x;xt;y;yt]   /dyadic:  typeof f(x:xt;y:yt)
 (*xt),xt,yt}

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

compile[`f;{[xi;yi]1+x*y}]

/compile'[A 2+i;A 1+i:4*!(#(A:0,A))%4]         /compile each function
