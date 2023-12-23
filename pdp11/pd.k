
O:10/8\65536!
D:O@+/1 256*256!+-2^@[`c@&2^14;!#D;D]  /convert data section to uint16 (and fill)
F:(0#`)!()
ifun:&#T                /function index of each node
afun:(0#`)!!0           /fname!-addr  first is 0(main), never called
locs:0            
atyp:anam:()            /argtypes  argnames for each function
ltyp:lnam:()            /loctypes  locnames for each function (args+locs)
cons:(0#`)!()           /constant!literal-offset
offs:0                  /`symbol!offset for get/set args+locals for each function
lits:()
rtyp:(0#`)!!0

/print table
/print:{`<(`l@x_+`n`t`p`i`s!(!#T;T;P;I;S)),\"\n"}
/stack at 2559 word offset (5118 011776 bytes) within data

pd:{[o]opts::o
 F[`prg`mem`con`var`tab`fun`arg`sym`res`loc`ast`lod`sto]:(pdprg;pdmem;pdcon;pdvar;pdtab;pdfun;pdarg;pdsym;pdres;pdloc;pdast;pdlod;pdsto)
 F[`add`and`bnd`ant`asn`cal`cli`cnd`dfr`div`drp`eql`cst]:(pdadd;pdand;pdbnd;pdant;pdasn;pdcal;pdcli;pdcnd;pddfr;pddiv;pddrp;pdeql;pdcst)
 F[`for`get`Get`gte`jmp`les`lit`lte`mod`mor`mul`neg    ]:(pdfor;pdget;pdGet;pdgte;pdjmp;pdles;pdlit;pdlte;pdmod;pdmor;pdmul;pdneg)
 F[`neq`nop`not`orr`bor`xor`ret`shl`shr`stm`sub`swc`typ]:(pdneq;pdnop;pdnot;pdorr;pdbor;pdxor;pdret;pdshl;pdshr;pdstm;pdsub;pdswc;pdtyp)
 F[`i32b]:i32b
 
 rwcnd'|&(~`=S)&(T=`cnd)|T=`swc
 $[1~#i:i@&`store=S P i:&T=`ast;T[&P=*i]:`nop;0]  /remove store/catch
 $[1~#i:i@&`catch=S P i:&T=`ast;T[&P=*i]:`nop;0]

 cons::S@&T=`con
 afun::s!-!#s:S@&T=`fun   
 
 T[i:&(S=`I32B)&T=`cal]:`i32b
 ifun::1_+\-1,T=`fun                              /function index for each node
 perfunc:!1+*|ifun
 fill:{x[i]:(#i:&~#'x@!n:+/T=`fun)#,!0}
 a:fill i(=ifun i:i@&`fun=T P i:&T=`arg)
 atyp::(S   a)perfunc     /argtypes
 anam::(S 1+a)perfunc     /argnames
 a:fill i $[#j:ifun i:&T=`loc;=j;(!0)!()]
 ltyp::(S   a)perfunc     /loctypes
 lnam::(S 1+a)perfunc     /locnames                                     
 offs::({(|x)!$[#r:8*y+!#x;-8,1_r;!0]}'[anam;#'lnam]) /  main   ; xyz:args ab:locals
 `"k.off"<","/(($S@&T=`fun),\":"),'$#'anam            /k.off: number of args per func

 @[`offs;i;,';{x!8*!#x}'lnam(i:&~~#'lnam)]         /((0#`)!!0;`z`y`x`a`b!-8 16 24 0 8;..)

 rtyp:(!afun)!(#afun)#`
 rtyp[S P r]:S r:&T=`res                           /funcs with empty results have no `res node

 glob::$[#s:S@&T=`var;s!O 5118-8*!#s;(0#`)!!0]
 lits::$[#glob;-4^&4*#glob;()];T[1+&T=`con]:`nop    /initial values for globals are assigned later
 cons::$[#cons;cons!pdlit'[1+&T=`con;0];(0#`)!!0]

 n:{x[y]+:1}/(,&#P),P;n[0]-:1
 s:{c:(0,(#x)-z)^x;(c 0),,,/(F@ T y)[y;|c 1]}/[();|!#P;|n]
 lits[!#glob]:litl'[I i;S i:1+&T=`var]
"0",",\n0"/$imag stak link@*s}

link:{o:(!builtins)!512+2*-1_+\(#x),#'b:.builtins;@[x;i;O o x i:&x<0],,/b}
stak:{D[(2558)-!n:4*#lits]:,/lits;x}   /embed literals/constants/gobals in stack
imag:{@[&(2^15)-256;!`size \#x;x],D}          /fill disk image: code(32kw-01000) + data(32kw)

INS:{[i;x]T::ins[i;T;*x];P::ins[i;@[P;&P>i-1;+;1];x 1];P[1+i]:i;I::ins[i;I;x 2];S::ins[i;S;x 3];S}
ins:{[i;x;y](i#x),y,i_x}
del:{T::T n:(!#P)_x;P::@[P n;&(P n)>x-1;-;1];I::I n;S::S n;S}
rwcnd:{c:|1_&P=x;S[x]:`;P[x]:P x-1;c INS\(T x;1+x;I x; S x:x-1);del x;restm'|i@&(T P i:&`stm=T)?\`ret`asn}
restm:{c:*|&P=x;INS[c;(T x-1;x;I x-1;S x-1)];P[x]:P[x-1];del[x-1]} /fix ret stm


pdprg:{
 c:1_&P=0;f:y fn:&`fun=T c
 tabl:$[#i:&`tab=T c;62707,(O 32+4*#i),10004 16600 02 16601 04 16602 06 16603 10 11666 10 62706 10 6304 6304 60407,,/y i;!0]
 init: tabl,12706,O 5118-8*#lits             /mov #11776,sp (init sp: 1k reserved for kos) -literals
 
 d:(- 1_!#f)!O 512+2*1_-1_+\(#init),#'f      /-1 -2..!function start addresses
 ($1_(S c)fn),$.d
 `"k.map"<"({",(",\n"/(($1_(S c)fn),\":"),'$.d),"})"
 @[r;i;d r i:&(r>-#f)&0>r:init,,/f]}
 


pdsig:{*y}
pdmem:{*y}
pdcon:{*y}
pdvar:{*y}
pdtab:{y;127,afun S x}
pdtbl:{*y}

pdfun:{
 c:&x=P
 body:y@*&`ast=T c
 n:O 4+8*+/`loc=T c
 m:0|8*-1++/`arg=T c
 pro:10546 162706,n,10605                /mov fp,-(sp); sub #n(sp); mov sp,fp
 epi:10506 62706,n,12605 12604           /mov fp,sp   ; add #n,sp ; mov (sp)+,fp; mov (sp)+,r4; add 8*-1+#args,sp
 epi,:$[m;62706,O m;!0],104              /add #m,sp   ; jmp r4
 $[`main~S x;body,127 0;ret[pro,body;epi]]}
 
ret:{j:(#x)-2+i:&x=-66666; x[i]:62707;x[1+i]:O 2*j ;x,y}  /replace -66666 0 with add #n,pc (jump to epilog) 
 
pdarg:{*y}
pdsym:{y;S x}
pdres:{y;S x}
pdloc:{y;S x}
pdstm:{,/y}
pdast:pdstm

pdlod:{(*y),4727,-(70000+`b`i`j?S x)}
pdsto:{(,/|y),4727,-(60000+`b`i`j?S x)}

pdasn:{(y 0),$[I x;12746,(glob S x),4727 -75000;(set setbuiltin@(offs ifun x)S x)]}
pdget:{y;get getbuiltin@(offs ifun x)S x}
pdGet:{y;$[`Lt~S x;4727 -55523;(S x)?!cons;cons S x;10346 12703,(glob S x),4727 -77000]}

pdcal:{(S x;y);$[#y;(,/y);4727 -99999],4727,$[`panic~S x;0;0~r:pdinst S x;(afun S x),$[`~rtyp S x;po;!0];r]}



pdcli:{$[1~#y;4727 -99999;,/1_y],(*y),4727 1004}    /there are no indirect calls of funcs without results
pddfr:{y;!0}

pddrp:{(*y),po}
pdcst:{s:*y;d:S x;(y 1),$[(pdw d)>pdw s;4727,-50007-s~`u;!0]}

pdfor:{(pdlop;pdslp)[I x].(x;y)}                    /slp:do-while; lop:while-do
pdlop:{p:$[#*y;po;!0];(cnt brk $[#*y;(y 0),5700 1002 62707,(O@2*#b);!0],b:(p,,/|1_y),-44444 0),p}
pdslp:{c:(*y),5700 1402 162707;b:po,cnt brk(-2_y 2),y 1;  pu,b,c,O 2+2*(#b)+#c}

brk:{j:(#x)-2+i:&x=-55555;x[i]:62707;x[1+i]:O 2*j;x}   /replace -55555(break)    with add #n,pc
cnt:{j:2+i:&x=-44444;x[i]:162707;x[1+i]:O 2*j;x}       /replace -44444(continue) with sub #n,pc
pdjmp:{y;,$[I x;-55555 0;-44444 0]}                    /break/continue (no nested loops)



/literals, constants and globals are embedded in the stack
pdlit:{y;i:I x;$[2~pdw s:S x;lit1 I x;0x00000000~C i+4+!4;lit1@*`i C i+!4;10346 12703,lit[i;`k],4727 -77000]}    /push r3;mov #literal-offset to r3
lit1:{$[0~x; pu;1~x; pu,5200;-1~x;pu,5300 5301;8~x;4727 -55508;16~x;4727 -55516;(x<32767)&x>0; pu,12700,O x; 10346 12703,lit[x;`i],4727 -77000]}            /0.. 1.. -1.. mov #small,r0 
litl:{$[`i~y;O@,/(`i@,/(2^`c@,x),\0x0000),0 0;O@,/|'+65536 65536\(`i@C x+!4),`i@C x+4+!4]}
lit: {O 5118-8*$[0N~r:lits?x:litl[x;y]; -1+#lits,:,x ;r]}


pdneg:{(*y),5401 5400 5601}             /neg32:neg r1;neg r0;sbc r1
pdnot:{(*y),0+`not}                     /should not exist
pdnop:{y;!0}
pdret:{(*y),$[`ast~T P x;!0;-66666 0]}

pdswc:{b:(1_y),\-55555 0;brk@-2_,/(!0
 (*y)                               /switch-expr in r0
 22700,O@-1+#b                      /cmp #(n-1),r0
 101402 62707,O@2*#*|b              /jump over default
 *|b                                /default
 6300 6300 60007                    /asl r0;add r0,pc (jump to case offset)
 ,/62707,/'O(4*|-1_!#b)+2*-2_0,+#'b /branch offsets
 ,/-1_b                             /cases
 po)}                               /pop switch expr


i32b:{(*y),5001}
pdcnd:{(iff;ife)[3~#y].(x;y)}
/iff:{(*y),5700 1401 402 62707,(O@2*#y 1),(y 1)}                         /if y0 then y1
/ife:{(*y),5700 1401 402 62707,(O@2*#b),(b:(y 1),62707,O@2*#y 2),(y 2)}  /if y0 then y1 else y2

iff:{$[(T 1+x)?`bnd`bor;(*y),5700 1401 402;(-4_*y)],62707,(O@2*#y 1),(y 1),po}
ife:{$[(T 1+x)?`bnd`bor;(*y),5700 1401 402;(-4_*y)],62707,(O@2*#b),(b:(y 1),62707,O@2*#y 2),(y 2),po}  /if y0 then y1 else y2

bp:{(-1_x),10/8\(*|x)+2}

/of:{$[(y<-128)|y>127;0+`ljmp;(-1_x),10/8\(*|x)+256!y]}  /add 8bit offset to branch instruction


pd2:{(,/|z),(4727;-50000-x)}
pdand:pd2 13;pdorr:pd2 14;pdxor:pd2 15;pdant:pd2 16
pdbnd:{(,/y),11666 6 62706 6 5116 42600}            /mov(sp),6(sp);add #6,sp;com(sp);bic(sp)+,r0
pdbor:{(,/y),11666 6 62706 6 52600}                 /mov(sp),6(sp);add #6,sp;bis(sp)+,r0

/rewrite to short circuit:
/bnd: (*y);tst r0;beq +#y1: add #4,sp; (y 1)
/bor: (*y);tst r0;bne +#y1: add #4,sp; (y 1)

/pdc:{(,/z),(4727;-50020-(pdw t)%2),ib (x(t:S y)?`u`k)}  /x:branch instruction without offset (decimal)
pdc:{(,/z),(4727;$[4~pdw t;-50022;`u~t;-50023;-50021]),ib(x(t:S y)?`u`k)}
pdneq:pdc  512 512  ;pdeql:pdc  768 768                 /bne beq
pdles:pdc 1280 34560;pdmor:pdc 1536 33280               /blt blo  bgt bhi
pdlte:pdc 1792 33536;pdgte:pdc 1024 34304               /blt blos bge bhis
nc:{(-1_x),$[512!c:*|x;c-256;c+256]}                    /negate condition +/- 0400
ib:{(O x+2),5000 402 5000 5200}

pdtyp:{y;S x}

pdadd:{(,/y),4727 -50000}
pdsub:{(,/|y),4727 -50001}
pdmul:{$[2~pdw S x;(,/y),4727 -50002;0+`nyimul+ \y]}
pdshl:{$[2~pdw S x;(,/|y),4727 -50010; c32~y 1; (*y),4727 -50017; c59~y 1;(*y),4727 -50019;0+`nyishll+`shl \y]}
pdshr:{$[`i~S x;(,/|y),4727 -50011;c32~y 1;(*y),4727 -50018;c59~y 1;(*y),4727 -50020;0+`nyishrl+ \y]}
pddiv:{(,/|y),4727 -50003}
pdmod:{(,/|y),4727 -50004}

c59:4727 -99999 12700 73
c32:4727 -99999 12700 40
c21:4727 -99999 12700 25

pdw:`i`u`j`k`f!2 2 4 4 4   /type widths
pdtype:`i`u`j`k`f`!0x7f7f7e7e7c00

pdinst:{$[0N~`Memorysize`Memorygrow`Memoryfill`Memorysize2`Memorygrow2`Memorycopy2`Memorycopy3`F64abs`F64sqrt`F64floor`F64copysign`F64min`F64max`"F64reinterpret_i64"`"I64reinterpret_f64"?x;0;0+`nyi]
 $[`Memorycopy~x;-55000;`I32clz~x;-55001;`Write~x;-55002;`ReadIn~x;-55003;0]}


pu:4727 -99999            /jsr pc,#push
po:4727 -88888            /jsr pc,#pop
get:4727,-10000-          /e.g. -9996..-10002
set:4727,-20000-



/pdsys:`Exit`Args`Arg`Read`Write`ReadIn`Native!pdtype@/(`i`;,`i;3#`i;4#`i;5#`i;3#`i;3#`k)

readin:12604 62706 10 10001 105727 177560 100375 112721 177562 1375 160100 5400 5300 5001 104 /todo
/readin:
/ add #10,sp         62706 10
/ mov r0,r1          10001
/ tstb #177560       105727 177560
/ bpl -2             100375
/ movb #177562,(r1)+ 112721 177562
/ bne -3             1375
/ sub r1,r0          160100
/ neg r0             5400
/ dec r0             5300
/ clr r1             5001

write:12604 62706 10 16600 10 5700 1404 11601 112127 177566 77003 62706 10 5000 5001 104
/write:
/ add #10,sp           62706 10
/ mov 10(sp),r0        16600 10
/ tst r0               5700
/ beq +4               1404
/ mov (sp),r1          11601
/ movb (r1)+,#177566   112127 177566
/ sob r0 -3            77003
/ add #10,sp           62706 10
/ clr r0               5000
/ clr r1               5001


memcpy:12604 10002 12600 16601 6 5702 1403 112021 5302 773 62706 16 12600 12601 12602 12603 104
clz:   12604 10102 10003 5000 5702 1003 62700 20 10302 32702 100000 1003 5200 6302 772 5001 104

/               -44444(break) -55555(continue) -66666(return)
builtins:!/+-2^(-99999;12604,(10046+100*|!4),(5000+!4),104  /push4: mov (sp)+,r4;push r3..r0;jmp r4
                -88888;12604 12600 12601 12602 12603 104    /pop4 : mov (sp)+,r4;pop  r0..r3;jmp r4
		-77000;12604 10246 10146 10046 14300 14301 14302 14303 104 /get literal: store offset (rel to stack bottom) in r3;push r0..r3;load r0..r3 from stack
                -75000;16604 2 10044 10144 10244 10344 12604 62706 2 12600 12601 12602 12603 104  /global assign: mov 2(sp),r4;..
		-70000;12604 111000 6701 104                /load`b:movb (r0),r0;sxt r1
		-70001;12604 10001 11000 16101 2 104        /load`i:mov r0,r1;mov (r0),r0;mov 2(r1),r1
		-70002;12604 10003 11000 16301 2 16302 4 16303 6 104   /load`j
		-60000;12604 111610 62706 10 12600 12601 12602 12603 104  /store`b:movb (sp),(r0);add #8,sp
		-60001;12604 10003 12623 12623 62706 4 12600 12601 12602 12603 104       /store`i:mov r0,r3;mov (sp+),(r3)+;..;add #4;sp
		-60002;12604 10003 12623 12623 12623 12623 12600 12601 12602 12603 104   /store`j:mov r0,r3;mov (sp)+,(r3)+;..
		-55523;12604 10346 10246 10146 10046 12700 27 5001 5002 5003 104 /get constant Lt(23) used 70 times
		-55516;12604 10346 10246 10146 10046 12700 20 5001 5002 5003 104 /get literal 16 used 94 times
		-55508;12604 10346 10246 10146 10046 12700 10 5001 5002 5003 104 /get literal  8 used 90 times
		-55003;readin
		-55002;write
		-55001;clz
		-55000;memcpy
		-50000;12604 62600 5501 5502 5503 62601 5502 5503 62602 5503 62603 104  /add: mov (sp)+,r4;add (sp)+,r0;adc r1;add (sp)+,r1;add #4,sp;jmp r4
                -50001;12604 162600 5601 5602 5603 162601 5602 5603 162602 5603 162603 104 /sub: mov (sp)+,r4;sub (sp)+,r0;sbc r1;sub (sp)+,r1;add #4,sp;jmp r4
		-50002;12604 10102 10046 70066 2 70266 2 60300 16602 4 70226 60300 10002 10100 10201 62706 10 104 /mul32
		-50003;12604 12602 12603 62706 4 71002 104              /idiv(cheating slightly)
		-50004;12604 12602 12603 62706 4 71002 10200 10301 104  /irem
		-50007;12604 5701 6702 6703 104             /int64: mov (sp)+,r4;tst r1;sxt r2;sxt r3;jmp r4
		-50008;12604 5002 5003 104                  /int64u
		-50010;12604 10003 10102 12600 73200 12600 12600 12600 10300 10201 104  /x<<y (ashc)
		-50011;12604 10003 10102 12600 5400 73200 12600 12600 12600 10300 10201 104  /x>>y (neg;ashc)
		-50012;99999 99999 104                      /todo x>>y unsigned
		-50013;12604 5116 5166 2 5166 4 5166 6 42600 42601 42602 42603 104  /x&y: com (sp)..; bic (sp)+,r0..
		-50014;12604 52600 52601 52602 52603 104    /x|y: bis (sp)+,r0..
		-50015;16604 2 74400 16604 4 74401 16604 6 74402 16604 10 74403 12604 61627 10 104 /x^y: xor src must be a register
		-50016;12604 42600 42601 42603 42604 104    /x&^y (and not: bic..)
		-50017;10002 10103 5000 5001 207            /u64<<32
		-50018;10200 10301 5002 5003 207            /u64>>32
		-50019;12701 13 72001 10003 5000 5001 5002 207     /u64<<59
		-50020;12700 177765 72300 10300 5001 5002 5003 207 /u64>>59
		-50021;12604 12602 12603 62706 4 20200 5603 160103 1001 20200 104 /cmp4
		-50022;12604 162600 162601 162602 162603 1010 5702 1006 5701 1004 5700 1002 5000 104 5000 5200 104 /cmp8                      /todo cmp8 (only for == and !=)
		-50023;12604 12602 12603 62706 4 20301 1001 20200 104)   /cmpu 32 bit unsigned
getbuiltin:{$[#builtins i:-10000-x;x;builtins[i]:12604 10346 10246 10146 10046 16500 0 16501 0 16502 0 16503 0 104+0 0 0 0 0,(,/+2^(&4),O x+2*!4),0];x}  /e.g. mov 20(r5),r0 .. 26(r5),r3;jmp r4  (get x2)
setbuiltin:{$[#builtins i:-20000-x;x;builtins[i]:12604 10065 0 10165 0 10265 0 10365 0 12600 12601 12602 12603 104+0,(,/+2^(&4),O x+2*!4),0 0 0 0 0];x}  /e.g. mov r0,50(r5) .. r3,56(r5);jmp r4  (set x5)

/-50021;12604 162600 5601 162601 62706 4 5701 1001 5700 104 /cmp4
/-50021;12604 162600 5601 162601 62706 4 5401 1001 5400 104 /cmp4
/-50021;12604 12602 12603 62706 4 20200 5603 160103 1001 20200 104 /cmp4

/bne :1  /1010
/tst r2  /5702
/bne :1  /1006
/tst r1  /5701
/bne :1  /1004
/tst r0  /5700
/bne :1  /1002
/clr r0  /5000
/jmp r4  /104
/clr r0  /5000
/inc r0  /5200
/jmp r4  /104


/optimizations (before linking)
/opt:{oppo oppu x}     /breaks missing clr for small literals
/opt:{x}
/oppu:{s:2_x,0 0;$[#i:&(-99999=s)&-88888=x;(*x),,/4_'1_x:(0,i-1)^x;x]} /remove pop push   4727 -88888 4727 -99999
/oppo:{s:2_x,0 0;$[#i:&(-88888=s)&-99999=x;(*x),,/4_'1_x:(0,i-1)^x;x]} /remove push pop



/mul32 r0..r3:[a b][c d]     ab*cd = [a*c +a*d+b*c]
/  mov  r1,r2     10102      shift high bit
/  push r0        10046
/  mul  2(sp),r0  70066 2    a*c in r0,r1   pdp11 mul stores hi,lo words in r0,r1
/  mul  2(sp),r2  70266 2    b*c in r2,r3
/  add  r3,r0     60300      (hi ac)+lo bc
/  mov  4(sp),r2  16602 4    d in r2
/  mul  (sp+),r2  70226      a*d in r2,r3
/  add  r3,r0     60300      (hi ac)+(lo bc)+lo ad
/  mov  r0,r2     10002      swap r0 and r1
/  mov  r1,r0     10100
/  mov  r2,r1     10201
/  add  #8,sp     62706 10 
/
/memcpy:
/ mov (sp)+,r4
/                /r0 src       n mov r0,r2       10002
/ mov (sp+),r1   /r1 dst       s mov (sp)+,r0    12600
/ mov 6(sp),r2   /r2 n         d mov 6(sp),r1    16601 06
/ tst r2
/ beq +3
/ movb (r0)+,(r1)+
/ dec r2
/ br -5
/ add #16,sp
/ mov +(sp),r0
/ mov +(sp),r1
/ mov +(sp),r2
/ mov +(sp),r3
/ rts pc
/
/clz  x in r0,r1
/ mov(sp)+,r4
/ mov r1,r2
/ mov r0,r3
/ clr r0
/ tst r2
/ bne +3
/ add #20,r0
/ mov r3,r2
/ bit #100000,r2
/ bne +3
/ inc r0
/ asl r2
/ br -5
/ clr r1
/ jmp r4

/11/45 mmu: www.bitsavers.org/www.computer.museum.uq.edu.au/pdf/DEC-11-HGKTCB-D%20PDP-1145%20Memory%20Management%20Reference%20Manual.pdf

/ pdp11 refcard
/ 
/ register modes              pc(r7) addressing
/  0    R     reg             2   #n  immediate
/  1   (R)    deferred        3  @#A  absolute
/  2   (R)+   increment       6    A  relative 
/  3  @(R)+   def inc         7   @A  rel def
/  4  -(R)    decrement
/  5 @-(R)    def dec
/  6  X(R)    index
/  7 @X(R)    def ind
/ 
/ opcodes
/  00 00 00 halt      00 60 dd ror     10 40 00
/  00 00 01 wait      00 61 dd rol        ..    emt
/  00 00 02 rti       00 62 dd asr     10 43 77
/  00 00 03 bpt       00 63 dd asl
/  00 00 04 iot       00 64 dd mark    10 44 00
/  00 00 05 reset     00 65 dd mfpi       ..    trap
/  00 00 06 rtt       00 66 dd mtpi    10 47 77
/                     00 67 dd sxt
/  00 01 dd jmp                        10 50 dd clrb
/  00 02 or rts       01 ss dd mov     10 51 dd comb
/                     02 ss dd cmp     10 52 dd decb
/  00 02 3n spl       03 ss dd bit     10 53 dd necb
/  00 02 40 nop       04 ss dd bic     10 54 dd negb
/                     05 ss dd bis     10 55 dd adcb
/  00 02 41 cond      06 ss dd add     10 56 dd sbcb
/     ..    codes                      10 57 dd tstb
/  00 02 77           
/                     07 0r ss mul     10 60 dd rorb
/  00 03 dd swab      07 1r ss div     10 61 dd rolb
/                     07 2r ss ash     10 62 dd asrb
/  00 04 xx br        07 3r ss ashc    10 63 dd aslb
/  00 10 xx bne       07 4r dd xor 
/  00 14 xx beq                        10 65 ss mfpd
/  00 20 xx bge       07 7r nn sob     10 66 dd mtpd
/  00 24 xx blt
/  00 30 xx bgt       10 00 xx bpl     11 ss dd movb
/  00 34 xx ble       10 04 xx bmi     12 ss dd cmpb
/                     10 10 xx bhi     13 ss dd bitb
/  00 4r dd jsr       10 14 xx blos    14 ss dd bicb
/                     10 20 xx bvc     15 ss dd bisb
/  00 50 dd clr       10 24 xx bcs     16 ss dd sub
/  00 51 dd com       10 30 xx bcc,bhis 
/  00 52 dd inc       10 34 xx bcs,blo  
/  00 53 dd dec
/  00 54 dd neg       00 02 41 clc  c  sec 00 02 61
/  00 55 dd adc       00 02 42 clv  v  sev 00 02 62
/  00 56 dd sbc       00 02 44 clz  z  sez 00 02 64
/  00 57 dd tst       00 02 50 cln  n  sen 00 02 70
/                     00 02 57 ccc all scc 00 02 77



/calling convention: overhead is 2 words for the caller (that's the minimum) and 12 for the callee.
/there are about 6 times more calls than functions.
/the last arg is not pushed but remains on r0..r3, it is pushed implicitly by the first leaf node.
/access is 4 word aligned on the stack. this requires fewer helper functions for get/set.
/
/caller                    count      stack
/ push x y, z on r0..r3    (words)    y
/                                     x
/ jsr pc,#f                2          ret addr              4727 -f
/callee
/ mov fp,-(sp)             1      +-> old fp               10546 
/ sub 4+8*#loc,sp          2      |   gap                 162706 (4+8*#loc)
/                                 |   [locs]
/ mov sp,fp                1      |         ^-fp           10605
/ (body)                          |   x  (body pushes x)
/ mov fp,sp                1                               10506
/ add (4+8*#loc),sp        2      sp                       62706 (4+8*#loc)
/ mov (sp)+,fp             1                               12605
/ mov (sp)+,r4             1                               12604
/ add 8*-1+#args,sp        2                               62706 (8*-1+#args)
/ jmp r4                   1                                 104
/total:                           caller(2) callee(12)
/access:
/ arg0 z                          -8(fp)
/ argi y(1),x(2)..                8*i+nloc(fp)
/ loci a(0),b(1)..                8*1+i(fp) 

/see also: c-calling convention https://www.bell-labs.com/usr/dmr/www/clcs.html

/pdp11 compiler
/
/ pd`` compiles the table in T P I S to integers (pdp11 instructions)
/ representing u16 as octal numbers. e.g. 177775 means -3
/
/ we use r0,r1 to hold 32 bit integers and r0..r4 for i64.
/ low bits are in r0, also comparison results.
/ r6 is the stack pointer(sp), initially at 11776 growing downwards.
/
/
/ pu/po from the stack replaces r0..r4.
/ it takes 2 instructions: jsr pc,#push  or jsr pc,#pop
/ #push/#pop are addresses of these operations that need 7 instructions each.
/
/ get[0..n] are instructions to jump to functions
/ that copy local variables to the accumulator r0..r3
/ set[0..n] do the reverse, they set locals to the values of r0..r3.
/ 
/
/linking
/ in the first pass all instructions are generated and unknown function
/ addresses are replaced with negative numbers.
/ when assembling, the function addresses are collected and offsets are adjusted
