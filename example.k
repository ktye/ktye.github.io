/listbox-ui example application
/run as: http://ktye.github.io/example

path:,`
tags:{"List Dict Text Monad Nilad | About"}
drop:{}

List:("alpha beta gamma";"werner hansen hat ein haus";"peter enner nicht")
Dict:`alpha`beta`gamma!(1 2 3;"hallo";`a`b`zeta)
Text:(_10)/:("this is multiline";"text within";"codemirror editor")
Monad:{("was called with";x)}
Nilad:{("eins";"zwei";"drei")}



About:"this is a listbox-ui example application

application source: ktye.github.io/example.k
listbox source    : ktye.github.io/listbox.html
"

disp:{ \(`path;path);k: 'k;ke: 'k';((k;{x};ke;ke;ke;ke;tochar';tdict)@@x)x}
/disp:   {t:@x;(_10)/:$[t~6;tochar'x;t~7;tabdict x; 'kx]}
rpad:   {y#x,(y-#x)#" "}
tdict:{k:$!x;pad:rpad[;|/#'k]; ((pad'k),'"|"),' 'k'.x}
tochar: {$[1~@x;x; 'kx]}
