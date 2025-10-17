out:();o:();O:{o,:,x}

ti:15#1     /map of free regs
nr:0        /number of args&locals
R:0#`       /symbol list

rs:{$[`i~@x;"r",$x;x]}
xyz:{x," ",(rs y),",",(rs z)}
mov:xyz"mov"
alloc:{[]ti[r:*&ti]:0;r}
free:{$[x<nr;0;ti[x]:1]}

prg:{y;0}
fun:{y;o::(,($S x),":")," ",/o;out,:o;o::();ti::15#1;nr::0;R::0#`;0}  /prepend function label and reset
ast:{("\n"/y),"\n"}

arg:{y;nr+:1;0}            /increase register count
loc:arg                    /same for local and arg nodes
sym:{y;ti[nr]:0;R,:S x;0}  /mark register as used, store symbol
res:{y;0}

ast:{y;0}
ret:{O mov[0;y 0];O"ret";0}
get:{y;R?S x}
lit:{y;O mov[r:alloc[];$I x];r}
asn:{O mov[r:R?S x;y 0]," ;",$S x;r}

cal:{O'"push ",/s:rs'&~tmp;$[#m:pmov[!#y;y;t:alloc[]];O'mov.'-2^m;0];free t;O"call ",$S x; O mov[r:alloc[];0]; O'"pop ",/|s;   r}
drp:{free[*y];0}
add:{O mov[r:alloc[];y 0];O xyz["add";r;y 1];free'y;r}

nc:{n:{x[y]+:1}/(,&#x),x;n[-1+#n]-:1}
as:{c:(0,(#x)-z)^x;(c 0),,,/(.T y)[y;c 1]}
as/[();!#P;nc P]

`<("\n"/out),"\n"; `0
