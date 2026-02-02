/ final versions of arthur's k6 2x2 parser

c:@[127#"n";_ic("'/\\";":+-*%!&|<>=~,^#_$?@.";"({";")]}"),";[";:;"av();["]          / class
u:{(:[~x~*x;x;"v"=c _ic x;x,":";x];y)}                                              / unary
h:{(y[0]#x),:[7=4:z;z y[0]_ y[1]#x;z],y[1]_ x}                                      / k6 ?[x;y;z]
d:{(2#'x;2_'x:,/x,''"10")}                                                          / form (cc;bc) (bind;class)
e:"vmn",\:                                                                          / verb/monad/noun
k:d(e["av"],e"[(";("nvm";"()n";";))"),e"))")                                        / patterns
l:{{(z,,"  ")y?x}[y]. x}                                                            / lookup
b:{:[" "~*r@:i:*>*|+r:l[k]'(|,)':x;x;h[x;i,i+2;*r]]}                                / bind with first desc pair
f:{`0:(#x)b\c _ic"{",x,"}";}                                                        / show all steps
f"4;x(2+)/3+y"

k:d(e["a|v"],e"[[(";("nv|m";"(](n";";];)"),e["))]"],e"]@]")                         / cc!acb (action class bind)
u:{(:[~x~*x;x;"v"=c _ic x;x,":";x];y)}                                              / unarycall , e.g. change +x to (+:;x)
a:("|[(;)@";(,|:;,1#;,{:[(x~*x)&2=#y;*y;-1_ x,y]}/;1_;,{(,x),y}/;,{@[y;0;u[x]]}/))  / action
l:{{(z,,"   ")y?x}[y]. x}                                                           / lookup
b:{:[" "~*r@:i:*>*|+r:l[k]'(|,)':*|x;x;x h[;i+0 2]'(l[a;*r];r 1)]}                  / bind with first desc pair
f:{**(1+#x)b/1{c _ic x}\"{",x,"}"}                                                  / parse
x:("2;3";"x+y";"x+*y";"1+3*x";"(+x)%y";"(+/x)%#x";"x+m[*i]/y")                      / examples
f'x

\

original:

c:@[127#"n";("'/\\";":+-*%!&|<>=~,^#_$?@.";"({";")]}"),";[";"av();["]           / class
d:{(2#'x)!2_'x:,/x,''"10"};e:"vmn",\:                                           / form cc!cb (class bind)
k:d(e["av"],e"[(";("nvm";"()n";";))"),e"))")                                    / k lang
b:{$[^*r@:i:*>*|+r:k@2':x;x;?[x;i,i+2;*r]]}                                     / bind first pair
f:{`0:b\c"{",x,"}";}                                                            / show all steps
f"4;x(2+)/3+y"                                                                  / example

/ build parse tree with action

k:d(e["a|v"],e"[[(";("nv|m";"(](n";";];)"),e["))]"],e"]@]")                     / cc!acb (action class bind)
u:{($[~x~*x;x;"v"=c x;x,":";x];y)}                                              / unarycall , e.g. change +x to (+:;x)
a:"|[(;)@"!(,|:;,1#;,{$[(x~*x)&2=#y;*y;-1_x,y]}/;1_;,{(,x),y}/;,{@[y;0;u x]}/)  / action
b:{$[^*r@:i:*>*|+r:k@2':*|x;x;x?[;i+0 2;]'(a;)@'2#r]}                           / bind first pair
f:{**b/1 c\"{",x,"}"}                                                           / run to convergence
x:("2;3";"x+y";"x+*y";"1+3*x";"(+x)%y";"(+/x)%#x";"x+m[*i]/y")
f'x
