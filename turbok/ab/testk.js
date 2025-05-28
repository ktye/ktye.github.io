let tests=[
 "abc+def","abc + def",
 "1+2","1 + 2",
 "1<'y","1 <' y",
 "x:a+:b","x : a +: b",
 "x\ny","x ; y",
 "a /comment", "a",
 "a /comment\nb","a ; b",
 "a\n/comment\nb","a ; ; b",
 "/comment\na\nb","; a ; b",
 "a\n/\nc\n/d\ne","a ; ; c ; ; e",
]
for(let i=0;i<tests.length;i+=2){let r=token(tests[i])[0].reverse();if(r.join(" ")!=tests[1+i]){throw new Error(tests[i]+"\ngot\n"+r.join(" "))}}