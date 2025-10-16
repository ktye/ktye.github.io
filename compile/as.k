out:();o:();O:{o,:,x}
ri:$`eax`ebx`ebp`edi`esi`edx`r8d`r9d`r10d`r11d`r12d`r13d`r14d`r15d
rj:$`rax`rbx`rbp`rdi`rsi`rdx`r8`r9`r10`r11`r12`r13`r14`r15
rf:$`xmm0`xmm1`xmm2`xmm3`xmm4`xmm5`xmm6`xmm7
ti:(#ri)#1    /map of free int regs
tf:(#rf)#1    /              floats
ai:0;af:0     /number of args int/float
R:(0#`)!!0    /map sym to reg

rets:(S P a)! S a:&`res=T /ret types `g`h!`i`i
args:(S   a).=P a:&`arg=T /arg types `g`h!(`f`i`i;`i`j)


rs:{$[`i~@x;rj x;x]}
xyz:{x," ",(rs y),",",(rs z)}
mov:xyz"mov"
alloc:{$[`f~x;[r:*&tf;tf[r]:0];[r:*&ti;ti[r]:0]];r}
free:{$[`f~x;$[y<af;0;tf[y]:1];$[y<ai;0;ti[y]:1]]}

prg:{y;0}
fun:{y;o::(,($S x),":")," ",/o;out,:o;o::();ai::0;af::0;ti::(#ri)#1;tf::(#rf)#1;R::(0#`)!!0;0}
ast:{("\n"/y),"\n"}

arg:{y;$[`f=S x;af+:1;ai+:1];0}
loc:arg
sym:{y;R,:(,S x)!,#&~$[`f~S 1+x;tf[af]:0;ti[ai]:0];0}
res:{y;0}

ast:{y;0}
ret:{O mov[0;y 0];O"ret";0}
get:{y;R S x}
lit:{y;O mov[r:alloc[S x];$I x];r}
asn:{O mov[r:R S x;y 0]," ;",$S x;r}

/cal:{O'"push ",/s:rs'&~tmp;$[#m:pmov[!#y;y;t:alloc[]];O'mov.'-2^m;0];free t;O"call ",$S x; O mov[r:alloc[];0]; O'"pop ",/|s;   r}
cal:{y;O"call ",$S x;0}
drp:{free[*y];0}
add:{O mov[r:alloc[S x];y 0];O xyz["add";r;y 1];free[S x]'y;r}

nc:{n:{x[y]+:1}/(,&#x),x;n[-1+#n]-:1}
as:{c:(0,(#x)-z)^x;(c 0),,,/(.T y)[y;c 1]}
as/[();!#P;nc P]

`<("\n"/out),"\n"; `0
