ptree:{[]n:#P;n1:n-1
 np:{n:{x[y]+:1}/(,&#x),x;n[n1]-:1} /number of children
 dp:{+/n1>(x@)\!#x}                 /depth
 lp:{&(!#x)=x?x}                    /first child
 dt:{[P]
  d:dp P                            /depth
  r:m:1+|/d                         /1+max depth
  a:~np P                           /child nodes
  w: lp P                           /first child nodes
  t:!#P
  r:((d w)+r*{y+!x-y}'[1+P w;w]     / │
    (-1_d)+r*-1_t                   / ├
     (d w)+r*w)-1                   / ┌
  e:@[(m*#P)#" ";r;"|+L"]
  e:@[e;d+m*!#P;"R-"a];(#P)^e}      / ┴ ─
 r:{y/x\z};
 r["+";"├"]r["R";"┴"]r["L";"┌"]r["|";"│"]r["-";"─"]("\n"/(.`"lxy.")[70 300;+``i`P`T`I`S!(`$(dt P);!#P;P;T;I;S)]),"\n"}

