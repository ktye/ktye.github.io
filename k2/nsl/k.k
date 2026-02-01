// K 2x2 parser

/ tokenize
t:{+((c@*:)'r;r:{x _dv""}1_{:[x=":";(y;x);y=":";"";,y]}':1!"  ",x _dv" ")}  / (..(type;token)..)
c:{`l`r`a`v`n(x _in/:"",/:("(";")";"'/\\";"~!@#$%^&*-_=+|:<,>.?"))?1}       / classify

/ actions
o:{,/.[(0,0 2+y)_ x;1;{,(y;|x)};C . x[1 0+y;0]]}                            / bind
n:{,/(::;,`n,1_ p@|1_;1_)@'(0,y,y+(=/+\'`r`l=\:y _*:'x)?1)_ x}              / split, parse, raze

/ symbols
S:`n`u`v`a`l`r

/ action
A[S;S]:((o;o;o;o; ;n)
        (o;o;o;o; ;n)
        (o;o;o;o; ;n)
        ( ; ; ; ; ;n)
        ( ; ; ; ; ;n)
        (n;n;n;n; ;n))

/ bind
B[S;S]:(1 1 5 6 0 7
        4 2 2 6 0 7
        3 2 2 6 0 7
        0 0 0 0 0 7
        0 0 0 0 0 7
        7 7 7 7 0 7)

/ class
C[S;S]:(`n`n`u`v` `n
        `n`u`u`v` `n
        `n`u`v`v` `n
        ` ` ` ` ` `n
        ` ` ` ` ` `n
        `n`n`n`n` `n)

/ parse
p:{*(1<#:)(b . d@)/|x}                                                      / typed-tokens -> parse-tree
b:{(A . x[1 0+y;0])[x]y}                                                    / ..xy.. -> ..(t;yx)..
d:{(x;:[&/=':k:{B[x;y]}':*:'x;0;((&':`n~*:'-1_ x)|<':k)?1])}                / drop in power or n n ..

/ represent
r:1_-1_{:[4:x 1;x 1;:[`n=*x;1!")(",;"",]@,/_f'x 1]}@                        / curried

/ diagram
u:{:[4:x 1;(x 1;f . x);l[*x;j@_f'x 1]]}                                     / underline components
k:-/+\'"()"=\:                                                              / depth of parens
f:{@[(#y)#"";(~y~"()")*(y _lin"()")?0;:;v x]}                               / primitive: ..t  ..
j:{{x,'" ",'y}/x,'.[s;(;0);:;(|/c)-c:*:'s:^:'x]#'" "}                       / join successive diagrams
l:{|.[.[|++y," ";0,,i;:;"-"];0,*i:h y 0;:;v x]}                             / underline diagram
h:{(-b)_(b:"()"~|2#-1!x)_(*|k x)_!#x}                                       / fully parenthesized part
v:*|"^",$:                                                                  / mark type

/ examples

/x:3 4#!10
/. r p t"(1+/+1+)x"
/
/p t"((a+b)-k)-c"
/p t"(2+)-"
/p t"((,/@/:)/,\(,<<:)'=:)"
/p t"((((1+))1+/1 1/1/+1+)/1 1///)"
/
/x:10;y:20;z:30 40 50
/. r p t"x+y-*z"
/
u p t"x+y-*z"
