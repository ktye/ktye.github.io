/86.k compiles to x86/64

$[`l~@show;0;show::{x}] /show.k(drawtree)
print:{`<(`l@x),\"\n";x}

/8(args/scratch/rax:return) 7(saved by callee)
Rx:`rax`rdi`rsi`rdx`rcx`r8`r9`r11`rbp`r10`r11`r12`r13`r14`r15
all:,`main
compile:{(c1'x),\"\n"}

c1:{t: print show asin show lift show tf(.x)
 ($x),":\n ;",($.x)," todo.."}

tt:{{x,tr[#x;y]}/(,x),y}    /t0;(t1;t2;..) catenate tables
tr:{y[`p]:0|x+y`p}          /translate parent vector
t0:+`p`t`i`s!(!0;0#`;!0;0#`)
t1:+`p`t`i`s!(,0N),,'
tf:{               /table from func
 n:`n \#x          /arity
 v:`v \(.x)2       /vars args,locals
 b:split(*.x)      /body (instruction list)
 tt[t0;te'b]}      /catenate expression tables
te:{               /table from expression
 /mo:{(-1_x),,(t1`op1,1,(`$$y)),tr[1;*|x]}
 mo:{(-1_x),,tt[t1`op1,1,(`$$y); -1#x]}
 dy:{(-2_x),,tt[t1`op2,2,(`$$y);|-2#x]} 
 no:{$[`i~t:@x;t1(`lit;x;`);`s~t;t1(`var;0;x);0+`noun]}
 f:{$[~`v~@y;x,,no y;64>c:0+y;mo[x;y];dy[x;y]]}
*f/(,t0),x}

drop:{y x_!#y}                                    /drop xI from yT
shft:{x[`p]-:+/p>/(p:x`p)y}                       /shift parent to remove yI
lift:{drop[i]shft[x]i:&(`var=1_(x`t),`)&`"."=x`s} /lift var: . var -> var
asin:{drop[i]{shft[y;x]}[i]x[i-1;`t`s]:(,(#i)#`asn),x[i:1+&`"`64"=x`s;`s]}
/asin:{x}

split:{1_'(&(`256)~/x)^x:(`256),x}

O:`<       /nathanotterness.com/2021/10/tiny_elf_modernized.html
O"[bits 64]\na0: equ 4096 * 40   ;load address
db 0x7f,'E','L','F' ;11
db 2\ndb 1\ndb 1\ndb 0\ndq 0\ndw 2\ndw 0x3e\ndd 1
dq main + a0\ndq phead\ndq 0\ndd 0\ndw 64\ndw 0x38
dw 1\ndw 0x40\ndw 0\ndw 0\n\nphead:
dd 1\ndd 5\ndq 0\ndq a0\ndq a0\ndq end\ndq end\ndq 0x200000\n\n"

O compile all
O"end:\n"

