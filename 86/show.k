/show increments the filename by one
/and writes to "ta1", "ta2", "ta3", ..

showtable:0
show:{showtable+:1;
 h:unicode'drawtree x`p
 r:h,'(`l@x),\"\n"
 (`$"ta",$showtable)<,/r;x}

drawtree:{[p]                       /p parent vector
 /p:0 0 1 2 3 3 1 6
 np:{n:{x[y]+:1}/(,&#x),x;n[0]-:1}  /number of children
 dp:{+/0<(x@)\!#x}                  /depth
 lp:{(~~)#@[&#x;x i;i:!#x]}         /last child
 d:dp p
 r:m:1+|/d                          /1+max depth
 a:~np p                            /child nodes
 w: `w \lp p                            /last child node
 t: !#p
 sp:_32+&m
 r:((d w)+r*{x+!y-x}'[1+p w;w]      /step(3)    "|"
    (1_d)+r*1_t                     /step(2)    "+"
    (d w)+r*w)-1                    /last child "L"
 e:@[(m*#p)#" ";r;"|+L"]
 e:@[e;d+m*!#p;"T-"a];(sp;sp),(#p)^e}  /step (1)

unicode:{"│"/"|"\ "┬"/"T"\ "─"/"-"\ "└"/"L"\ "├"/"+"\ x}

/          i  d  P        (1)              (2)              (3)
/ ┬     +  0  0  0         ┬     +          ┬     +          ┬     +
/ └┬    1  1  1  0          ┬    1          └┬    1          └┬    1
/  ├┬   -  2  2  1           ┬   -           ├┬   -           ├┬   -
/  │└┬  *  3  3  2            ┬  *            └┬  *           │└┬  *
/  │ ├─ 2  4  4  3             ─ 2             ├─ 2           │ ├─ 2
/  │ └─ 3  5  4  3             ─ 3             └─ 3           │ └─ 3
/  └┬   %  6  1  1           ┬   %           └┬   %           └┬   %
/   └─  4  7  2  6            ─  4            └─  4            └─  4
/
/ (1) draw at depth d:                  ┬ for nodes ─ for leaves
/ (2) draw at depth d-1:                └ if last child, ├ otherwise
/ (3) connect with parent at depth d-1: │ for rows 1+P i..i-1


