out:();o:();O:{o,:,x}
R:0#`
tmp:15#1
rs:{$[`i~@x;"r",$x;x]}
xyz:{x," ",(rs y),",",(rs z)}
mov:xyz"mov"
alloc:{r:*&tmp;tmp[r]:0;r}
free:{$[x<#R;tmp[x]:1;0];0}

prg:{y;0}
fun:{y;o::(,($S x),":")," ",/o;out,:o;o::();R::0#`;tmp::15#1;0}
ast:{("\n"/y),"\n"}

arg:{y;0}
sym:{y;tmp[#R]:0;R,:S x;0}
res:{y;0}
loc:{y;0}

ast:{y;0}
ret:{O mov[0;y 0];O"ret";0}
get:{y;R?S x}
lit:{y;O mov[alloc[];$I x];I x}
asn:{O mov[r:R?S x;y 0]," ;",$S x;r}

cal:{O'"push ",/rs'y;O"call ",$S x;0} /todo: pmov
drp:{free[*y];0}
add:{O mov[r:alloc[];y 0];O xyz["add";r;y 1];free'y;r}

nc:{n:{x[y]+:1}/(,&#x),x;n[-1+#n]-:1}
as:{c:(0,(#x)-z)^x;(c 0),,,/(.T y)[y;c 1]}
as/[();!#P;nc P]

`<("\n"/out),"\n"; `0
