/ki parses i source and writes the IR as a k table
/see ik.k for a description of i.

/program IR
kiC:0x    /constants
kiD:0x    /data
kiT:0#`   /type
kiP:!0    /parent
kiI:!0    /ivalue
kiS:0#`   /svalue
tpis:`T`P`I`S

/k appends a list of subtrees to the IR table (and translate parents), e.g. k[t;((`con`lit;0N 1;0N 1;`x`i);(..))]
k:{$[#y;0;:x];y:@[,/'+y;1;+;(#x)+,/n#'0,-1_+\n:#'*'y];x,+tpis!(*y;0|y 1;y 2;y 3)}
kn:{y:@[y;1;+;#*x];y[1]:0|y 1;x,'y}
ki0:(0#`;!0;!0;0#`)

kiprg:{,(`prg;0;0;*x)}
kimem:{kiD,:$[#i:&`C=@'x;,/x i;""];,(`mem;0N;1;`a)}
kitab:{i:&"t"~/:x;s:x i-2; {(`tab;0;x;y)}'[,/(x i-1)+!'#'s;,/s]}
kivar:{v:x -2+i:&(`64)~/:x;s:x -1+i;{(`con`lit;0N 1;0N,kival y;(`$-1_c),`$*|c:$x)}'[s;v]}
kicon:{v:x -3+i:&(`74)~/:x;s:x -2+i;{(`var`lit;0N 1;0N,kival y;(`$-1_c),`$*|c:$x)}'[s;v]}
kival:{$[`i~t:@x;x;[kiC,:`c x:$[`f~t;`c@,x;x];:-8+#kiC]]}
kilam:{i:&"l"~/:x; kifun'[x i-1;x i-6;x i-8]}

kifun:{[s;r;f]f:.f;x:((`fun;0N;0;s)),'(kiarg f),'(+kires'$r),'(kiast f);kn[x;(kiloc f)]}
kiarg:{a:(n:x 3)#x 1; i:2/!2*n; (`arg`sym@i;0 1 i ;,/+2^(!n),&n;,/+2^(kits'a),a)}
kiloc:{n:#l:(x 3)_x 1;i:2/!2*n; (`loc`sym@i;0N 1 i;,/+2^(!n),&n;,/+2^(kits'l),l)}
kires:{(`res;0;0;`$x)}
kiast:{l:x 1;x:*x
 r:()kiprs/x
 r:(`ast;0N;0;`)kn/r}            /todo `ret


kiprs:{t:@y;
 f2:{kn[kn[(x;0N;0;kits(*|y)3);*|y];y@-2+#y]}
 f:(0;f2`asn;f2`add;f2`sub;f2`mul;0)@0|(0;`64;`66;`67;`68)?y
 $[~f~0;(-2_x),,f x;`s~t;x,,(`sym;0N;0;y);`i~t;x,,(`lit;0N;y;`i);x]}
 


kits:{`$*|$x}
kiel:{i@&`v=@'x[-7+i:&(`64)~/:x]}    /lambda assignments -> `64->"l"
kiev:{i@&`v=@'x[-6+i:&(`64)~/:x]}    /lambda (void)      -> `64->"v"
kiet:{i@&`i=@'x[-1+i:&(`64)~/:x]}    /table assignments  -> `64->"t"




/l: \`p@<`"tests/asn.i"




/t:+tpis!(T;P;I;S)
/ \t k/(kiprg;kimem;kitab;kivar;kicon;kilam)@\: @[l; (kiel;kiev;kiet)@\:l; "lvt"]

ki:{x:`p@x;t:+tpis!(kiT;kiP;kiI;kiS)
 t k/(kiprg;kimem;kitab;kivar;kicon;kilam)@\: @[x; (kiel;kiev;kiet)@\:x; "lvt"]}

