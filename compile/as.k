out:();o:();O:{o,:$[#x;,x;""]}
rb:$`al`bl`spl`dil`sil`dl`r8l`r9l`r10l`r11l`r12l`r13l`r14l`r15l
ri:$`eax`ebx`ebp`edi`esi`edx`r8d`r9d`r10d`r11d`r12d`r13d`r14d`r15d
rj:$`rax`rbx`rbp`rdi`rsi`rdx`r8`r9`r10`r11`r12`r13`r14`r15
rf:$`xmm0`xmm1`xmm2`xmm3`xmm4`xmm5`xmm6`xmm7
ti:(#ri)#1    /map of free int regs
tf:(#rf)#1    /              floats
ai:0;af:0     /number of args int/float
R:(0#`)!!0    /map sym to reg
sy:`Args`Arg`Read`Write`ReadIn`Native
nc:{n:{x[y]+:1}/(,&#x),x;n[-1+#n]-:1}  /num children
sb:{c:&#x;{c[x]+:1;-1+c x}'x}          /sibling number

i:<?'+|(,(#P)##P),(,!#P),(P@)\P;P::(i?P)i;T@:i;I@:i;S@:i /postfix

ins:{[i;x;y];-1_,/((0,i)^x),'y,*y}
insert:{[j;t;p;i;s]T::ins[j;T;t];P::((0,j)'P)+P::ins[j;P;p];I::ins[j;I;i];S::ins[j;S;s]}

n:nc P
I[i]:n i:&`cnd=T                       /store number of children in cnd nodes
e:&(1=sb P)&(3=n P)&`cnd=T P           /look for 2nd of 3 children of a node type `cnd
i:insert[1+e;n#`els;P e;n#0;(n:#e)#`]  /insert els nodes

c:sb P;n:#i:&`swc=T P                  /insert `cas nodes before each case in a switch
insert[1+i;n#`cas;P i;c i;n#`]

i:i@&`lit=T@-1+i:&`cst=T               /replace (cst (lit typ)) with lit
/replace[i;T i-1;P i;I i-1;S i-2]


s:`var`con`cst`add`sub`mul`shl`shr`and`orr`mor`les`eql`gte`lte`neq
T[i@&(#s)>s?T 1+i:&(`lit=T)&~`f=S]:`Lit  /replace literal nodes with `Lit where they can be used as immediates

cons:(S i)!I1+i:&`con=T /replace Get-const with literal node
i:i@&(#cons)>(!cons)?S i:&`Get=T;T[i]:`Lit;I[i]:cons S[i]

t:(I i)!S i:&`tab=T                    /function pointers
tabl:$[#t;,/{"dq ",$[`~x;"0";$x],"\n"}'t@!|/I i;""]

T[&(`cal=T)&`Exit=S]:`exi     /replace special node type `exi
rets:(S P a)! S a:&`res=T     /ret types `g`h!`i`i
args:(S   a).=P a:&`arg=T     /arg types `g`h!(`f`i`i;`i`j)
rets,:`Read`Write!`i`i
args,:`Read`Write!(`i`i`i;`i`i`i`i)
glob:|^(S i)!(`i`u`j`k`f!4 4 8 8 8)S 1+i:&`var=T  /`g1`g2!4 8  global!size
/lits:{$[(S x)?`i`u;$I x;"0x",`x@|C(I x)+!8]}

rs:{$[`i~@x;rj x;x]}
xyz:{x," ",(rs y),",",(rs z)}
mov:{$[x~y;"";xyz["mov";x;y]]}
alloc:{$[`f~x;[r:*&tf;tf[r]:0];[r:*&ti;ti[r]:0]];r}
free:{$[`f~x;$[y<af;0;tf[y]:1];$[y<ai;0;ti[y]:1]]}

prg:{y;out::(,sys),out;0}
fun:{y;o::(,($S x),":")," ",/o;out,:o;o::();ai::0;af::0;ti::(#ri)#1;tf::(#rf)#1;R::(0#`)!!0;0}
ast:{("\n"/y),"\n"}
mem:{y;0}
var:{y;0}
con:{y;0}
tab:{y;0}

arg:{y;$[`f=S x;af+:1;ai+:1];0}
loc:arg
sym:{y;R,:(,S x)!,-1+#&~$[`f~S 1+x;tf[af]:0;ti[ai]:0];0}
res:{y;0}

ast:{y;0}
ret:{O mov[0;y 0];O"ret";0}
get:{y;R S x}

lit:{y;r:$[`asn~T a:P x;R S a;alloc[S x]];O mov[r;$I x];r}
Lit:{y;0}
asn:{O mov[r:R S x;y 0];r}
exi:{O mov[3;*y];O"mov rax,60";O"syscall";0}

typ:{y;`i`u`j`k`f?S x}
cst:{s:`i`u`j`k`f@*y;0+`nyi}

/cal:{O'"push ",/s:rs'&~tmp;$[#m:pmov[!#y;y;t:alloc[]];O'mov.'-2^m;0];free t;O"call ",$S x; O mov[r:alloc[];0]; O'"pop ",/|s;   r}
cal:{y;O"call ",$S x;0}
drp:{free[*y];0}

op2:{free[S y]'z;O mov[r:alloc[S y];z 0];O xyz[$x;r;z 1];r}
add:op2`add;sub:op2`sub;and:op2`and;orr:op2`or;xor:op2`xor;mul:op2`imul
bor:{r:orr[x;y];$[`cnd~P x;iff[`ne;P x];r]}
bnd:{r:and[x;y];$[`cnd~P x;iff[`ne;P x];r]}

neg:{i:*y;free[S x;i];r:alloc[S y];O mov[r;i];O "neg",rs r;r}
not:{i:*y;free[S x;i];r:alloc[S y];O mov[r;i];O "not",rs r;r}
ant:{and[x;(y 0),not[x;y 1]]}

sh:{x; a:*z;b:z 1; free[S y]'z; r:alloc[S y];b:$[`Lit~T y-1;$I y-1;[O"mov cl,",(rb b);"cl"]]; O($x)," ",(rs r),",",b; r}
shl:sh`shl;shr:{sh[`shr`sar(S x)?`u`k;x;y]}

// <les =eql >mor <=lte !=neq >=gte &&bnd &and ||bor |or &^ant -sub +add *mul /div %mod >>shr <<shl
// js:<0 jns:>=0 >0 
cnd:{y;O".en",($I x),":";0}
iff:{O@("j",$x)," .e",("ln"3=I y),$y;0}
els:{y;O"jmp .en",i:$P x;O".el",i,":";0}
cmp:{[c;x;y]O xyz[$`cmp`comisd@`f~S x;y 0;y 1];free[S x]'y;$[`cnd~T P x;r:iff[c 2+(S x)?`u`k;P x];O("set",$c(S x)?`u`k),rb r:alloc[S x]];r}
mor:cmp`a`g`le`be;les:cmp`b`l`ge`ae;eql:cmp`e`e`ne`ne
lte:cmp`le`be`a`q;gte:cmp`ge`ae`b`l;neq:cmp`ne`ne`e`e

sys:"format ELF64 executable
segment readable writable ;.data
_a: dq 0 ;args
_b: dq 0 ;break
_t:
",tabl,(,/{(": "/$x)," 0\n"}'(!glob),'`dq`dw 8=.glob),"_h:      ;heap
",$[#D;,/{"dq 0x",(`x x),"\n"}'|'-8^D;""],"
segment readable executable ;.text
 entry _start ;global _start
_start:
 mov qword [_a],rsp
 mov rax,12
 mov rdi,0
 syscall
 mov qword [_b],rax
 jmp main
Write:
 mov rdx,rdi ;len
 mov rsi,rbp ;src
 mov rdi,1
 mov rax,1
 syscall
 ret"

nc:{n:{x[y]+:1}/(,&#x),x;n[-1+#n]-:1}
as:{c:(0,(#x)-z)^x;(c 0),,,/(. \T y)[y;c 1]}
as/[();!#P;nc P]

`<("\n"/out),"\n"; `0


