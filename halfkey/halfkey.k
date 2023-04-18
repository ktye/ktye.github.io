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
 
 c:f 0         /code
}

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

/compile'[A 2+i;A 1+i:4*!(#(A:0,A))%4]         /compile each function
