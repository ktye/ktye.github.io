/ ┌─
/ │┌─
/ │├─
/─┴┴

tree:{[]
 np:{n:{x[y]+:1}/(,&#x),x;n[0]-:1} /number of children
 dp:{+/0<(x@)\!#x}                 /depth
 lp:{(~~)#@[&#x;x i;i:!#x]}        /last child
 dt:{[P]
  d:dp P                           /depth
  r:m:1+|/d                        /1+max depth
  a:~np P                          /child nodes
  w: lp P                          /last child nodes
  t:!#P
  r:((d w)+r*{x+!y-x}'[1+P w;w]    /step(3)    "|"
     (1_d)+r*1_t                   /step(2)    "+"
     (d w)+r*w)-1                  /last child "L"
  e:@[(m*#P)#" ";r;"|+L"]
  e:@[e;d+m*!#P;"R-"a];(#P)^e}     /step (1)
 r:{y/x\z};
 `<r["+";"├"]r["R";"┬"]r["L";"└"]r["|";"│"]r["-";"─"]("\n"/(.`"lxy.")[70 300;t:+``i`P`T`I`S!(`$(dt P);!#P;P;T;I;S)]),"\n"
 `0}

ptree:{[]n:#P;n1:n-1
 np:{n:{x[y]+:1}/(,&#x),x;n[n1]-:1} /number of children
 dp:{+/n1>(x@)\!#x}                /depth
 lp:{&(!#x)=x?x}                   /first child
 dt:{[P]
  d:dp P                           /depth
  r:m:1+|/d                        /1+max depth
  a:~np P                          /child nodes
  w: lp P                          /first child nodes
  t:!#P
  r:((d w)+r*{x+!y-x}'[1+P w;w]    /step(3)    "|"
     (1_d)+r*1_t                   /step(2)    "+"
     (d w)+r*w)-1                  /last child "L"
  e:@[(m*#P)#" ";r;"|+L"]
  e:@[e;d+m*!#P;"R-"a];(#P)^e}     /step (1)
 r:{y/x\z};
 `<r["+";"├"]r["R";"┴"]r["L";"┌"]r["|";"│"]r["-";"─"]("\n"/(.`"lxy.")[70 300;t:+``i`P`T`I`S!(`$(dt P);!#P;P;T;I;S)]),"\n"
 `0}


C:0x
D:0x
T:`prg`fun`arg`sym`res`loc`sym`ast`asn`add`lit`get`ret`get`fun`arg`sym`res`loc`sym`ast`drp`cal`get`asn`cal`get`ret`get
P:0 0 1 2 1 1 5 1 7 8 9 9 7 12 0 14 15 14 14 18 14 20 21 22 20 24 25 20 27
I:0 0 0 0 0 0 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
S:`asn`f`i`x`i`i`r``r`i`i`x`i`r`h`i`x`i`i`r```f`x`r`f`x`i`r 

`dp \{+/0<(x@)\!#x} P

a:?'+|(,(#P)##P),(,!#P),(P@)\P
i:<a

n:#P;n1:n-1
T:T i
P:(i?P)i; P[n1]:n1
I:I i
S:S i

/ np:{n:{x[y]+:1}/(,&#x),x;n[n1]-:1} /number of children
d: {+/n1>(x@)\!#x}P                /depth

