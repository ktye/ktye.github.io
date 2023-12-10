/todo load/store global-get/set const initmem indirect-call div(i) mod(i) intrinsics

F:(0#`)!()
ifun:&#T                /function index of each node
afun:s!-!#s:S@&T=`fun   /fname!-addr  first is 0(main), never called
locs:0            
atyp:anam:()            /argtypes  argnames for each function
ltyp:lnam:()            /loctypes  locnames for each function (args+locs)
glob:0#`
fsig:(0#`)!()
sigs:()
offs:0                  /`symbol!offset for get/set args+locals for each function

pd:{[o]opts::o
 F[`prg`mem`con`var`tab`fun`arg`sym`res`loc`ast`lod`sto]:(pdprg;pdmem;pdcon;pdvar;pdtab;pdfun;pdarg;pdsym;pdres;pdloc;pdast;pdlod;pdsto)
 F[`add`and`bnd`ant`asn`cal`cli`cnd`dfr`div`drp`eql`cst]:(pdadd;pdand;pdbnd;pdant;pdasn;pdcal;pdcli;pdcnd;pddfr;pddiv;pddrp;pdeql;pdcst)
 F[`for`get`Get`gte`jmp`les`lit`lte`mod`mor`mul`neg    ]:(pdfor;pdget;pdGet;pdgte;pdjmp;pdles;pdlit;pdlte;pdmod;pdmor;pdmul;pdneg)
 F[`neq`nop`not`orr`bor`xor`ret`shl`shr`stm`sub`swc`typ]:(pdneq;pdnop;pdnot;pdorr;pdbor;pdxor;pdret;pdshl;pdshr;pdstm;pdsub;pdswc;pdtyp)
 
 $[1~#i:i@&`store=S P i:&T=`ast;T[&P=*i]:`nop;0]  /remove store/catch
 $[1~#i:i@&`catch=S P i:&T=`ast;T[&P=*i]:`nop;0]
 
 ifun::1_+\-1,T=`fun                              /function index for each node
 perfunc:!1+*|ifun
 fill:{x[i]:(#i:&~#'x@!n:+/T=`fun)#,!0}
 a:fill i(=ifun i:&T=`arg)
 atyp::(S   a)perfunc     /argtypes
 anam::(S 1+a)perfunc     /argnames
 a:fill i $[#j:ifun i:&T=`loc;=j;(!0)!()]
 ltyp::(S   a)perfunc     /loctypes
 lnam::(S 1+a)perfunc     /locnames                                     
 offs::({x!$[#r:8*y+!#x;-8,1_r;!0]}'[anam;#'lnam]) /  main   ; xyz:args ab:locals
 @[`offs;i;,';{x!8*!#x}'lnam(i:&~~#'lnam)]         /((0#`)!!0;`x`y`z`a`b!-8 16 24 0 8;..)
 
 /f:&T=`fun
 /a@:&`fun=T P a:&T=`arg
 /d:(S f)!(#f)#,0#`
 /d[S@!g]:S a@.g:=f@f'a
 /fsig::pdtype d,'@[(#f)#`;ifun r;S r:&T=`res]
 /fsig::$[`nort?opts;fsig;pdsys,fsig]          /imports
 /sigs::?.fsig
 /glob::     S@&`con=T
 /glob::glob,S@&`var=T
 
 /S[0]:`so \ $[0N~i:o?`lib;S 0;o 1+i]
 n:{x[y]+:1}/(,&#P),P;n[0]-:1
 s:{c:(0,(#x)-z)^x;(c 0),,,/(F@ \ T y)[y;|c 1]}/[();|!#P;|n]
      /link@*s}   
"0",",\n0"/$link@*s}

link:{o:(!builtins)!512+2*-1_+\(#x),#'b:.builtins;@[x;i;O o x i:&x<0],,/b}

pdprg:{
 /s:{(_x),(leb@#y),y} /0(custom) 1(type) 2(import) 3(func) 4(table) 5(mem) 6(global) 7(export) 8(start) 9(element) 10(code) 11(data) 12(data count)
 /c:1_&P=0;f:y fn:&`fun=T c;
 /sysi:$[`nort?opts;"";s[2;(leb@#i),,/i:{0x03,"env",(leb@#x),x,0x00,(leb sigs?y)}'[$!pdsys;.pdsys]]]
 /fncs:$[#f;s[10;,/(,leb@#f),f];""]
 /fnsg:$[#f;s[3;,/(,leb@#f),leb'sigs?fsig S c fn];""]
 /typs:s[1;(leb@#t),,/t:pdsig'sigs]
 /cons:,/y@&`con=T c
 /vars:,/y@&`var=T c
 /mems:s[5;0x010001]
 /glbs:s[6;(leb@#glob),,/cons,vars]
 /expo:s[7;(leb@1+#n),0x06,"memory",0x0200,,/pdfex'[S i n;(#pdsys)+n:&I i:&`fun=T]]
 /tabl:$[#t:&`tab=T c;s[4;0x017000,(leb@1+|/I c t)];""]
 /elem:$[#t;s[9;(leb@#t),,/t:pdtbl y t];""]
 /data:$[#D;s[11;0x010041000b,(leb@#D),D];""]
 /0x0061736d01000000,typs,sysi,fnsg,tabl,mems,glbs,expo,elem,fncs,data}
 init: 12706 11776            /mov #11776,sp (init sp: 1k reserved for kos)
 c:1_&P=0;f:y fn:&`fun=T c
 d:(- 1_!#f)!O 512+2*1_-1_+\(#init),#'f      /-1 -2..!function start addresses
 @[r;i;d r i:&(r>-#f)&0>r:init,,/f]}         /link calls

pdsig:{0x60,(,/(,leb@#a),a:-1_x),$[0x00~r:*|x;_0;(_1),r]} //pdsig args, ret
pdmem:{y;""}
pdcon:{(pdtype S 1+x),0x00,(*y),0x0b}
pdvar:{(pdtype S 1+x),0x01,(*y),0x0b}
pdtab:{y;(I x;(!fsig)?S x)}
pdtbl:{{0x0041,(leb x),0x0b,(leb@#y),,/leb'y}'[(*x)i;(i:&~1=`d@*x)^(x:+x)1]}

pdfun:{
 c:&x=P
 body:opt y@*&`ast=T c
 n:O 4+8*+/`loc=T c
 m:0|8*-1++/`arg=T c
 pro:10546 162706,n,10605                /mov fp,-(sp); sub #n(sp); mov sp,fp
 epi:10506 62706,n,12605 12604           /mov fp,sp   ; add #n,sp ; mov (sp)+,fp; mov (sp)+,r4; add 8*-1+#args,sp
 epi,:$[m;62706,O m;!0],104              /add #m,sp   ; jmp r4
 $[`main~S x;body,127 0;ret[pro,body;epi]]}
 
ret:{x[i]:$[+/127<j:(#x)-1+i:&x=-66666;0+`ljmp;10/8\256+j];x,y}  /replace -66666 (return) with br +j (jump to epilog)
 
pdarg:{y;pdtype S x}
pdsym:{y;S x}
pdres:{y;S x}
pdloc:{y;S x}
pdstm:{,/y}
pdast:pdstm

pdlod:{  (*y),4727,-(70000+`b`i`j?S x)}
pdsto:{(,/|y),4727,-(60000+`b`i`j?S x)}


/todo: detect tee instruction (don't pop result)
pdasn:{y;(y 0),$[I x;0+`globalassign;(set setbuiltin@(offs ifun x)S x),po]}
pdget:{y;pu,get getbuiltin@(offs ifun x)S x}
pdGet:{y;0x23,leb glob?S x}


/pdcal:{$[`panic~s:S x;,0x00;`I32B~s;*y;(,/y),$[#c:pdinst s;c;0x10,leb@(!fsig)?s]]}
pdcal:{(,/|y),4727,(afun S x)}


pdcli:{(,/(I x)#1_y),(*y),0x11,(leb sigs?(,/(1+I x)_y),pdtype S x),0x00 } 
pddfr:{y;!0}

pddrp:{(*y),po}
pdcst:{s:*y;d:S x;(y 1),$[(pdw d)>pdw s;4727 -50007;!0]}

pdfor:{(pdlop;pdslp)[I x].(x;y)}                    /slp:do-while; lop:while-do
pdlop:{cnt brk of[nc y 0;1+#b],(b:,/1_y),-44444}    /cond,br+,body,post,cont
pdslp:{slp;b,of[*y;-(#*y)+#b:cnt brk(-1_y 2),y 1]}  /body,post,br? -n

brk:{x[i]:$[+/127<j:(#x)-1+i:&x=-55555;0+`ljmp;10/8\256+     j]}  /replace -55555 (break)    with br +j
cnt:{x[i]:$[+/128<j:     1+i:&x=-44444;0+`ljmp;10/8\256+256!-j]}  /replace -44444 (continue) with br -j

pdjmp:{y;,$[I x;-55555;-44444]}         /no nested loops, just break/continue

lit:0 1 2 -1!(!0;,5200;5200 5200;5300 5301)
pdlit:{y;i:I x;t:S x;pu,$[`I~@r:lit i;r;2~pdw t
 $[*|r:,/12700 12701,'O@|65536 65536\i;r;2#r]
 ,/12700 12701 12702 12703,'O@,/|'+65536 65536\(`i@C i+!4),`i@C i+4+!4]} /todo copy from literal section?



pdneg:{(*y),5401 5400 5601}             /neg32:neg r1;neg r0;sbc r1
pdnot:{(*y),0+`not}                     /should not exist
pdnop:{y;!0}
pdret:{(*y),$[`ast~T P x;!0;-66666]}

pdswc:{b:1_y,\-55555;brk@-1_,/(!0
 (*y)                               /switch-expr in r0
 22700,O@-1+#b                      /cmp #(n-1),r0
 of[,34304;#*|b]                    /bcc #def
 *|b                                /default
 6300 60007                         /asl r0;add r0,pc (jump to case offset)
 ,/of[,256]'(2*|-1_!#b)+-2_0,+\#'b  /branch offsets
 ,/-1_b)}                           /cases


pdcnd:{(iff;ife)[3~#y].(x;y)}
ife:{of[*y;1+#y 2],(y 2),of[,256;#y 1],y 1}  /if  y0 then y1 [else y2]
iff:{of[nc@*y;#b],b:y 1}                     /if !y0 then br

of:{$[(y<-128)|y>127;0+`ljmp;(-1_x),10/8\(*|x)+256!y]} /add 8bit offset to branch instruction

pdtyp:{y;S x}

pd2: {(,/z),x(`i`u`j`k`f?S y)}
pd2s:{"\n"/(z 0;z 1;(pdtype t  ),x,pdsign@t:S y)}
pddiv:pd2 0x6d6e7f80a3;pdmod:pd2 0x6f70818200 

pdadd:{$[2~pdw S x;(,/|y),4727 -50000;0+`nyiaddl]}
pdsub:{$[2~pdw S x;(,/|y),4727 -50001;0+`nyisubl]}
pdmul:{$[2~pdw S x;(,/|y),4727 -50002;0+`nyimul]}
pdshl:{$[2~pdw S x;(,/|y),4727 -50010; c32~y 1; (*y),4727 -50017; c59~y 1;(*y),4727 -50019;0+`nyishll]}
pdshr:{$[`i~S x;(,/|y),4727 -50011;c32~y 1;4727 -50018;c59~y 1;4727 -50020;0+`nyishrl]}

c59:4727 -99999 12700 73 12701 0 12702 0 12703 0
c32:4727 -99999 12700 40 12701 0 12702 0 12703 0

pd2:{(,/|z),(4727;-50000-x)}
pdbnd:pdand:pd2 13;pdbor:pdorr:pd2 14;pdxor:pd2 15;pdant:pd2 16

/todo bor bnd receive boolean input: insert I32B

pdc:{(,/|z),(4727;-50020-(pdw t)%2),x(t:S y)?`u`k} /x:branch instruction without offset (decimal)
pdneq:pdc  512 512  ;pdeql:pdc  768 768            /bne beq
pdles:pdc 1280 34560;pdmor:pdc 1536 33280          /blt blo  bgt bhi
pdlte:pdc 1792 33536;pdgte:pdc 1024 34304          /blt blos bge bhis
nc:{(-1_x),$[512!c:*|x;c-256;c+256]}               /negate condition +/- 0400


pdw:`i`u`j`k`f!2 2 4 4 4   /type widths
pdtype:`i`u`j`k`f`!0x7f7f7e7e7c00
pdsign:`i`u`j`k`f!("_s";  "_u"; "_s"; "_u";   "")
pdinst:`Memorysize`Memorygrow`Memorycopy`Memoryfill!(0x3f00;0x4000;0xfc0a0000;0xfc0b00)
pdinst,:`Memorysize2`Memorygrow2`Memorycopy2`Memorycopy3!(0x3f01;0x4001;0xfc0a0001;0xfc0a0100)
pdinst,:`I32clz`F64abs`F64sqrt`F64floor`F64copysign`F64min`F64max`"F64reinterpret_i64"`"I64reinterpret_f64"!,'0x67999f9ca6a4a5bfbd

inc2:62706 4              /drop top 2 from stack
pu:4727 -99999            /jsr pc,#push
po:4727 -88888            /jsr pc,#pop
get:4727,-10000-          /e.g. -9996..-10002
set:4727,-20000-


O:10/8\65536!

leb:{leb8(`c@,x),4#$[x<0;0xff;0x00]}
leb8:{s:*x:,/+(8#2)\256!256+|x;|_2/'(1&!#x),'x:-7^(((7*1+(#x)%7)-#x)#s),x:(x?~s)_x}

pdsys:`Exit`Args`Arg`Read`Write`ReadIn`Native!pdtype@/(`i`;,`i;3#`i;4#`i;5#`i;3#`i;3#`k)

/               -44444(break) -55555(continue) -66666(return)
builtins:!/+-2^(-99999;12604,(10046+100*|!4),(5000+!4),104  /push4: mov (sp)+,r4;push r3..r0;jmp r4
                -88888;12604,(12600+     !4),104            /pop4 : mov (sp)+,r4;pop  r0..r3;jmp r4
		-70000;12604 111000 6701 104                /load`b:movb (r0),r0;sxt r1
		-70001;12604 10001 11000 16101 2 104        /load`i:mov r0,r1;mov (r0),r0;mov 2(r1),r1
		-70002;12604 10003 16301 2 16302 4 16303 6 104   /load`j
		-60000;12604 111610 62706 10 104                 /store`b:movb (sp),(r0);add #8,sp
		-60001;12604 10003 12623 12623 62706 4 104       /store`i:mov r0,r3;mov (sp+),(r3)+;..;add #4;sp
		-60002;12604 10003 12623 12623 12623 12623 104   /store`j:mov r0,r3;mov (sp)+,(r3)+;..
		-50000;12604 62600 5501 62601 62706 4 104   /add32: mov (sp)+,r4;add (sp)+,r0;adc r1;add (sp)+,r1;add #4,sp;jmp r4
                -50001;12604 162600 5601 162601 62706 4 104 /sub32: mov (sp)+,r4;sub (sp)+,r0;sbc r1;sub (sp)+,r1;add #4,sp;jmp r4
		-50002;12604 10102 10046 70066 2 70266 2 60300 16602 4 70216 60300 10002 10100 10201 62706 10 104 /mul32
		-50003;99999 99999 104                      /todo idiv
		-50004;99999 99999 104                      /todo udiv
		-50005;99999 99999 104                      /todo irem
		-50006;99999 99999 104                      /todo urem
		-50007;12604 5701 6702 6703 104             /int64: mov (sp)+,r4;tst r1;sxt r2;sxt r3;jmp r4
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
		-50021;12604 162600 5601 162601 62706 4 5701 1001 5700 104 /cmp4
		-50022;99999 99999 104                      /todo cmp8
		-50023;99999 99999 104)


/mul32 r0..r3:[a b][c d]     ab*cd = [a*c +a*d+b*c]
/  mov  r1,r2     10102      shift high bit
/  push r0        10046
/  mul  2(sp),r0  70066 2    a*c in r0,r1   pdp11 mul stores hi,lo words in r0,r1
/  mul  2(sp),r2  70266 2    b*c in r2,r3
/  add  r3,r0     60300      (hi ac)+lo bc
/  mov  4(sp),r2  16602 4    d in r2
/  mul  (sp),r2   70216      a*d in r2,r3
/  add  r3,r0     60300      (hi ac)+(lo bc)+lo ad
/  mov  r0,r2     10002      swap r0 and r1
/  mov  r1,r0     10100
/  mov  r2,r1     10201
/  add  #8,sp     62706 10 


getbuiltin:{$[#builtins i:-10000-x;x;builtins[i]:12604 16500 0 16501 0 16502 0 16503 0 104+0,(,/+2^(&4),O x+2*!4),0];x}  /e.g. mov 20(r5),r0 .. 26(r5),r3;jmp r4  (get x2)
setbuiltin:{$[#builtins i:-20000-x;x;builtins[i]:12604 10065 0 10165 0 10265 0 10365 0 104+0,(,/+2^(&4),O x+2*!4),0];x}  /e.g. mov r0,50(r5) .. r3,56(r5);jmp r4  (set x5)

/optimizations (before linking)
/opt:{oppo oppu x}     /breaks missing clr for small literals
opt:{x}
oppu:{s:2_x,0 0;$[#i:&(-99999=s)&-88888=x;(*x),,/4_'1_x:(0,i-1)^x;x]} /remove pop push   4727 -88888 4727 -99999
oppo:{s:2_x,0 0;$[#i:&(-88888=s)&-99999=x;(*x),,/4_'1_x:(0,i-1)^x;x]} /remove push pop



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
/the first arg is not pushed but remains on r0..r3, it is pushed implicitly by the first leaf node.
/access is 4 word aligned on the stack. this requires fewer helper functions for get/set.
/
/caller                    count      stack
/ push z y, x on r0..r3    (words)    z
/                                     y
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
/ arg0 x                          -8(fp)
/ argi y(1),z(2)..                8*i+nloc(fp)
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
