a:?'1030a 1030a 1030a 1030a
x:?4a
b:(+a)(+/*)\x

n:300;while[n-:1;r:lsq[a;b]]
`ok`fail 1e-6<|/abs r-x
