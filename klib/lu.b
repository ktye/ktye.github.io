A:400^?400*400
x:?400
b:(+/*)\[A;x]
r:x-lusolve[lu A;b]
`fail`ok 1e-6>|/abs r
