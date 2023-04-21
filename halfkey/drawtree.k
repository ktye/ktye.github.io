/draw tree from parent vector
/see ktye.github.io/kweb/compile (drawtree.k)

np:{n:(&#x){x[y]+:1}/x;n[0]-:1}  /number of children
dp:{+/0<(x@)\:!#x}               /depth
lp:{(~~)#@[&#x;x i;i:!#x]}       /last child

drawtree:{[P]
 d:dp P                         /depth
 r:m:1+|/d                      /1+max depth
 a:~np P                        /child nodes
 w: lp P                        /last child nodes
 t:!#P
 r:((d w)+r*{x+!y-x}'[1+P w;w]  /step(3)    "|"
    (1_d)+r*1_t                 /step(2)    "+"
    (d w)+r*w)-1                /last child "L"
 e:@[(m*#P)#" ";r;"|+L"]
 e:@[e;d+m*!#P;"T-"a];(#P)^e}   /step (1)

