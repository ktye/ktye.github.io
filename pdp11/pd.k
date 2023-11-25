F:(0#`)!()
ifun:&#T                /function index of each node
afun:s!-1-!#s:S@&T=`fun /fname!-addr
locs:0            
atyp:anam:()            /argtypes  argnames for each function
ltyp:lnam:()            /loctypes  locnames for each function (args+locs)
offs:0                  /ifun!(symbol!offset)
glob:0#`
fsig:(0#`)!()
sigs:()

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
 a:fill i(=ifun i:&T=`loc)
 ltyp::(S   a)perfunc     /loctypes
 lnam::(S 1+a)perfunc     /locnames
 ltyp::atyp,'ltyp
 lnam::anam,'lnam
 offs::{x!-4*!#x}'lnam    /local offsets (name!off) per function
 
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
 s:{c:(0,(#x)-z)^x;(c 0),,,/(F T y)[y;|c 1]}/[();|!#P;|n]
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
 init,,/f}

pdsig:{0x60,(,/(,leb@#a),a:-1_x),$[0x00~r:*|x;_0;(_1),r]} //pdsig args, ret
pdmem:{y;""}
pdcon:{(pdtype S 1+x),0x00,(*y),0x0b}
pdvar:{(pdtype S 1+x),0x01,(*y),0x0b}
pdtab:{y;(I x;(!fsig)?S x)}
pdtbl:{{0x0041,(leb x),0x0b,(leb@#y),,/leb'y}'[(*x)i;(i:&~1=`d@*x)^(x:+x)1]}
pdfex:{(leb@#$x),($x),0x00,leb y}

pdfun:{
 /s:$S x;c:&x=P
 /eqlx:{$[#x;x~'`x,-1_x;0#`]}
 /locs:(leb@#l),,/l:{(leb@#x),pdtype@*x}'(&~eqlx l)^l:S c@&`loc=T c
 /body:    y@*&`ast=T c
 /(leb@#r),r:locs,((- 0x0f~*|body)_body),0x0b}
 c:&x=P
 body:y@*&`ast=T c
 pro:10605      /mov sp,r5
 pro,:$[n:#&`loc=T c;,/n#,pu;!0] /push locals   /todo loop for n>..
 pro,body}
 
pdarg:{y;pdtype S x}
pdsym:{y;S x}
pdres:{y;"(result ",(pdtype S x),")"}
pdloc:{"(local ",(*y)," ",(pdtype S x),")"}
pdstm:{,/y}
pdast:pdstm
pdlod:{(y 0),(0x2c282829292b i),(0x000202030303 i:`b`i`u`j`k`f?S x),0x00}
pdsto:{(,/y),(0x3a3636373739 i),(0x000202030303 i:`b`i`u`j`k`f?S x),0x00}
pdant:{(,/y),(0x417f7371;0x427f8583)@(S x)?`j`k} /y0 y1 -1 xor and 


pdasn:{y;(y 0),$[I x;0+`globalassign;set setbuiltin(lnam ifun x)?S x]}
pdget:{y;pu,get getbuiltin(lnam ifun x)?S x}
pdGet:{y;0x23,leb glob?S x}


pdcal:{$[`panic~s:S x;,0x00;`I32B~s;*y;(,/y),$[#c:pdinst s;c;0x10,leb@(!fsig)?s]]}

pdcli:{(,/(I x)#1_y),(*y),0x11,(leb sigs?(,/(1+I x)_y),pdtype S x),0x00 } 
pddfr:{y;""}
pddrp:{y,0x1a}
pdcst:{d:*y;s:S x;(y 1),$[(pdw d)~pdw s;!0;0+`cast]}
pdfor:{$[I x;pdslp[x;y];pdlop[x;y]]}
pdslp:{0x0340,(-2_y 2),(y 1),(*y),0x0d000b }
pdlop:{0x02400340,(*y),$[#*y;0x450d01;""],(y 2),(y 1),0x0c000b0b}


pdlit:{y;i:I x;t:S x; pu,$[t?`i`u; 12701,(O i),5001; 0+`lit64]}  /x:10/'|'256!256+-2^$[2~w:pdw t;`c@,i;C i+!8]; r:12700+!#x;`lit \ pu,,/+(r;x)

pdjmp:{y;0x0c,_$[`~S x;1+I x;pdtrg x]}
pdtrg:{l:S x;c:-~I x                    /calculate target for labeled break/continue
 x:1_{$[(`for;l)~(T x;S x);x;P x]}\x    /scan parents til for-with-label
 x:x@&~`stm=T x                         /dont nest statements
 c+-1++/(#x),(`for=T x)&~I x}           /simple loops add 1 level, others 2


pdneg:{$[`f~t:S x;(*y),0x9a;pdsub[x;((0x4141424244@`i`u`j`k?t),0x00;*y)]]}
pdnot:{(*y),0x45} /i32.eqz
pdnop:{y;""}
pdret:{y;,/y} /todo rts

pdswc:{n:#$[I x;y;y,:,""]
 r:@[,/n#(,0x0240);1;$[t:S x;pdtype t;0x40]],(*y),0x0e,(leb n-2),(,/leb'!n-1),0x0b
 r,,/(1_y),'0x0c,/(leb'|!n-1),\0x0b}
pdcnd:{(*y),0x04,$[`~t:S x;0x40;pdtype t],(y 1),$[3~#y;0x05,(y 2);""],0x0b}

pdtyp:{y;S x}

pd2: {(,/z),x(`i`u`j`k`f?S y)}
pd2s:{"\n"/(z 0;z 1;(pdtype t  ),x,pdsign@t:S y)}
/pdadd:pd2 0x6a6a7c7ca0;
pdsub:pd2 0x6b6b7d7da1
pdmul:pd2 0x6c6c7e7ea2;pddiv:pd2 0x6d6e7f80a3;pdmod:pd2 0x6f70818200 
pdand:pdbnd:pd2 0x7171838300;pdorr:pdbor:pd2 0x7272848400;pdxor:pd2 0x7373858500
pdneq:pd2 0x4747525262;pdeql:pd2 0x4646515161
pdmor:pd2 0x4a4b555664;pdgte:pd2 0x4e4f595a66;pdles:pd2 0x4849535463; pdlte:pd2 0x4c4d575865
pdshl:pd2 0x7474868600;pdshr:pd2 0x7576878800

//add 32bit: push y;x;add -(sp),r0;adc r1;add -(sp),r1
pdadd:{y;$[2~pdw S x;(,/y),62600 05501 62601;0+`nyiaddl]}

pdw:`i`u`j`k`f!2 2 4 4 4   /type widths
pdtype:`i`u`j`k`f`!0x7f7f7e7e7c00
pdsign:`i`u`j`k`f!("_s";  "_u"; "_s"; "_u";   "")
pdinst:`Memorysize`Memorygrow`Memorycopy`Memoryfill!(0x3f00;0x4000;0xfc0a0000;0xfc0b00)
pdinst,:`Memorysize2`Memorygrow2`Memorycopy2`Memorycopy3!(0x3f01;0x4001;0xfc0a0001;0xfc0a0100)
pdinst,:`I32clz`F64abs`F64sqrt`F64floor`F64copysign`F64min`F64max`"F64reinterpret_i64"`"I64reinterpret_f64"!,'0x67999f9ca6a4a5bfbd


pu:4727 -99999            /jsr pc,#push
po:4727 -88888            /jsr pc,#pop
get:4727,-10000-
set:4727,-20000-


O:10/8\65536!

leb:{leb8(`c@,x),4#$[x<0;0xff;0x00]}
leb8:{s:*x:,/+(8#2)\256!256+|x;|_2/'(1&!#x),'x:-7^(((7*1+(#x)%7)-#x)#s),x:(x?~s)_x}

pdsys:`Exit`Args`Arg`Read`Write`ReadIn`Native!pdtype@/(`i`;,`i;3#`i;4#`i;5#`i;3#`i;3#`k)


builtins:!/+-2^(-99999;12604,(10046+100*|!4),104   /mov (sp)+,r4;push r3..r0;jmp r4
                -88888;12604,(12600+     !4),104)  /mov (sp)+,r4;pop  r0..r3;jmp r4

getbuiltin:{$[#builtins i:-10000-x;x;builtins[i]:16500 0 16501 2 16502 4 16503 6 104+(,/+2^(&4),O(8*x)+&4),0];x}  /e.g. mov 20(r5),r0 .. 26(r5),r3;rts pc  (get x2)
setbuiltin:{$[#builtins i:-20000-x;x;builtins[i]:10065 0 10165 2 10265 4 10365 6 104+(,/+2^(&4),O(8*x)+&4),0];x}  /e.g. mov r0,50(r5) .. r3,56(r5);rts pc  (set x5)

		

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





/pdp11 compiler
/
/ pd`` compiles the table in T P I S to integers (pdp11 instructions)
/ representing u16 as octal numbers. e.g. 177775 means -3
/
/ we use r0,r1 to hold 32 bit integers and r0..r4 for i64.
/ low bits are in r0, also comparison results.
/ r6 is the stack pointer(sp), initially at 11776 growing downwards.
/
/ on function entry arguments are on the stack.
/ values on the stack are always 64 bits (4 words).
/   +---------+
/   | x     4 |
/   +---------+
/   | y     4 |
/   +=========+  sp(r6)
/
/ the function sets r5 to the start of the arguments
/ and pushes it's locals
/   +---------+ r5
/   | x     4 |
/   +---------+
/   | y     4 |
/   +---------+ 
/   | l1    4 |
/   +---------+
/   | l2    4 |
/   +=========+  sp
/ now all args/locals can be accessed by r5-4*i
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
/ in the first pass all instructions are generated and absolute function
/ addresses are replaced with negative numbers
/ when the function is assembled the known address is collected
/ and at the end all negative instructions are replaced with correct addresses.
/
/prelink addresses for assembler builtins:
/ pu  -88888     push 1 value   on the stack
/ po  -77777     pop  1 value from the stack
/ get -10000-i   get local index i
/ set -20000-i   set local index i



