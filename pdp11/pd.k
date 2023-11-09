/pdp11 compiler
/
/ pd`` compiles the table in T P I S to integers (pdp11 instructions) \
/ representing u16 as octal numbers. e.g. 177775 means -3
/
/ we use r0+r1 to hold 32 bit integers and r0..r4 for i64.
/ low bits are in r0, also comparison results.
/ r6 is the stack pointer(sp), initially at 177776 growing downwards.
/
/ on function entry arguments are on the stack
/   +=============+  sp(r6)
/   | x  i32    2 |
/   +-------------+
/   | y  i64    4 |  (4 words)
/   +-------------+
/
/ the function stores sp in r5 and pushes it's locals
/   +=============+  sp
/   | l1 i32    2 |
/   +-------------+
/   | l0 i32    2 |
/   +-------------+  r5
/   | x  i32    2 |
/   +-------------+
/   | y  i64    4 |
/   +-------------+
/ now arguments are at r5-i and locals r5+i


F:(0#`)!()
lp:{(~~)#@[&#x;x i;i:!#x]}
ifun:&#T          /function index of each node
locs:0            
atyp:anam:()            /argtypes  argnames for each function
ltyp:lnam:()            /loctypes  locnames for each function
ctyp:cnam:()            /combined arg+log names and types
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
 em:{$[#x;x;(!0)!0#`]}              /empty prototype
 a:i(=ifun i:&T=`arg)
 atyp::(em S   a)perfunc     /argtypes
 anam::(em S 1+a)perfunc     /argnames
 a:i(=ifun i:&T=`loc)
 ltyp::(em S   a)perfunc     /loctypes
 lnam::(em S 1+a)perfunc     /locnames
 offs::(+\'-pdw atyp),'(+\'pdw ltyp) /offsets for args and locals
 ctyp::atyp,'ltyp
 cnam::anam,'lnam
 
 /f:&T=`fun
 /a@:&`fun=T P a:&T=`arg
 /d:(S f)!(#f)#,0#`
 /d[S@!g]:S a@.g:=f@f'a
 /fsig::pdtype d,'@[(#f)#`;ifun r;S r:&T=`res]
 /fsig::$[`nort?opts;fsig;pdsys,fsig]          /imports
 /sigs::?.fsig
 /glob::     S@&`con=T
 /glob::glob,S@&`var=T
 
 S[0]:$[0N~i:o?`lib;S 0;o 1+i]
 n:{x[y]+:1}/(,&#P),P;n[0]-:1;
 s:{c:(0,(#x)-z)^x;(c 0),,,/(F T y)[y;|c 1]}/[();|!#P;|n]
*s}
 

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
 r:0 12705 177776
 c:1_&P=0;f:y fn:&`fun=T c;
 ,/f}

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
 body}
 
pdarg:{y;pdtype S x}
pdsym:{y;S x}
pdres:{y;"(result ",(pdtype S x),")"}
pdloc:{"(local ",(*y)," ",(pdtype S x),")"}
pdstm:{,/y}
pdast:pdstm
pdlod:{(y 0),(0x2c282829292b i),(0x000202030303 i:`b`i`u`j`k`f?S x),0x00}
pdsto:{(,/y),(0x3a3636373739 i),(0x000202030303 i:`b`i`u`j`k`f?S x),0x00}
pdant:{(,/y),(0x417f7371;0x427f8583)@(S x)?`j`k} /y0 y1 -1 xor and 
/pdasn:{y,$[I x;0x24,leb glob?S x;0x21,leb(locs ifun x)?S x]}


/local assign: mov r0,-2(r5) ... mov r3,-8(r5)
pdasn:{y; $[I x;0+`globalassign;0]; j:(cnam i:ifun x)?S x;o:offs[i;j];w:!pdw ctyp[i;j];y,,/+(10065+100*w;O'o-2*w)}

/ $[#pdinst S x;0;$[0N~(!fsig)?S x;`null \S x;0]];
pdcal:{$[`panic~s:S x;,0x00;`I32B~s;*y;(,/y),$[#c:pdinst s;c;0x10,leb@(!fsig)?s]]}

pdcli:{(,/(I x)#1_y),(*y),0x11,(leb sigs?(,/(1+I x)_y),pdtype S x),0x00 } 
pddfr:{y;""}
pddrp:{y,0x1a}
pdcst:{(y 1),$[0x00~c:pdcast[t?S x;(t:!pdtype)?S 1+x];"";c]}
pdfor:{$[I x;pdslp[x;y];pdlop[x;y]]}
pdslp:{0x0340,(-2_y 2),(y 1),(*y),0x0d000b }
pdlop:{0x02400340,(*y),$[#*y;0x450d01;""],(y 2),(y 1),0x0c000b0b}

/todo w:2*!.. ?
pdget:{y;j:(cnam i:ifun x)?S x;o:offs[i;j];w:!pdw ctyp[i;j];,/+(16500+w;O'o-w)}
pdGet:{y;0x23,leb glob?S x}

/pdlit:{y;i:I x;((`i`u`k`j`f!0x4141424244)t),,$[`f~t:S x;C i+!8;`i~t;leb i;`u~t;leb i;leb8 C i+!8]}
/todo float
pdlit:{y;i:I x;t:S x; x:10/'|'256!256+-2^$[2~w:pdw t;`c@,i;C i+!8]; r:012700+!#x; (push w),,/+(r;x) }

pdjmp:{y;0x0c,_$[`~S x;1+I x;pdtrg x]}
pdtrg:{l:S x;c:-~I x                    /calculate target for labeled break/continue
 x:1_{$[(`for;l)~(T x;S x);x;P x]}\x    /scan parents til for-with-label
 x:x@&~`stm=T x                         /dont nest statements
 c+-1++/(#x),(`for=T x)&~I x}           /simple loops add 1 level, others 2


pdneg:{$[`f~t:S x;(*y),0x9a;pdsub[x;((0x4141424244@`i`u`j`k?t),0x00;*y)]]}
pdnot:{(*y),0x45} /i32.eqz
pdnop:{y;""}
pdret:{y;!0} /todo rts

pdswc:{n:#$[I x;y;y,:,""]
 r:@[,/n#(,0x0240);1;$[t:S x;pdtype t;0x40]],(*y),0x0e,(leb n-2),(,/leb'!n-1),0x0b
 r,,/(1_y),'0x0c,/(leb'|!n-1),\0x0b}
pdcnd:{(*y),0x04,$[`~t:S x;0x40;pdtype t],(y 1),$[3~#y;0x05,(y 2);""],0x0b}

pdtyp:{y;pdtype S x} /keep as symbol

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
pdadd:{y;$[2~pdw S x;(push 2),(y 1),64600 05501 64601;0+`nyiaddl]}

pdw:`i`u`j`k`f!2 2 4 4 4   /type widths
pdtype:`i`u`j`k`f`!0x7f7f7e7e7c00
pdsign:`i`u`j`k`f!("_s";  "_u"; "_s"; "_u";   "")
pdinst:`Memorysize`Memorygrow`Memorycopy`Memoryfill!(0x3f00;0x4000;0xfc0a0000;0xfc0b00)
pdinst,:`Memorysize2`Memorygrow2`Memorycopy2`Memorycopy3!(0x3f01;0x4001;0xfc0a0001;0xfc0a0100)
pdinst,:`I32clz`F64abs`F64sqrt`F64floor`F64copysign`F64min`F64max`"F64reinterpret_i64"`"I64reinterpret_f64"!,'0x67999f9ca6a4a5bfbd

pdcast:(0x0000a7a7aa;0x0000a7a7ab;0xacad0000b0;0xadad0000b1;0xb7b8b9ba00) /iujkf

push:10026+100*!   /e.g. push 2 or push 4
pop: 14600+   |!

O:.,/$8\65536!65536+

leb:{leb8(`c@,x),4#$[x<0;0xff;0x00]}
leb8:{s:*x:,/+(8#2)\256!256+|x;|_2/'(1&!#x),'x:-7^(((7*1+(#x)%7)-#x)#s),x:(x?~s)_x}

pdsys:`Exit`Args`Arg`Read`Write`ReadIn`Native!pdtype@/(`i`;,`i;3#`i;4#`i;5#`i;3#`i;3#`k)


