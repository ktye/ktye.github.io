eye:{(!x)=/!x}
dia:{x*eye@#x}
uni:{|/|/abs mul[+conj x;x]-eye@#x}              /test if unitary: maxabs I-x'*x
mul:{(+/*)/[x;y]}                                /r,x,y: list of rows
dvs:{[U;s;V]|/|/abs a-mul[U]mul[dia s;+conj V]}  /test if A is U*S*V'

a:50^?50*50
q:svd a
`fail`ok 1e-6>|/(uni U:q 0;uni V:q 2;dvs.q;1>cond a)

