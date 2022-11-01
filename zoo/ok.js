//import { oK } from './ok/oK.js'

let O,oK
function ini(left,o) {O=o

 let p=document.createElement("pre");p.textContent=help;left.appendChild(p)
 
 fetch("./ok/oK.js").then(r=>r.text()).then(r=>{
  oK=new Function(r + "\n return{run:run,parse:parse,format:format,baseEnv:baseEnv}")()
 })

 O("Welcome to oK v0.1\n ")
}

let help = `oK has atom, list (2;\`c), dict \`a\`b!(2;\`c) and func {[x;y]x+y}
20 primitives/verbs, 6 operators/adverbs and 3 system functions
Verb       (unary)    Adverb             Noun         (null)
: gets                '  each            name  \`a\`b    \`
+ plus      flip      /  over|join       char  "ab"    " "
- minus     negate    \\  scan|split      num   2 .3    0N(nan) 0w(inf)
* times     first     ': eachprior       hex   0x2a2b
% divide    sqrt      /: eachright       bool  01000b
! mod|map   enum|key  \\: eachleft
& min|and   where
| max|or    reverse   System             list (2;3.4;\`ab)
< less      asc       0: file r/w        dict \`a\`b!(2;\`c)
> more      desc      1: json r/w        view f::32+1.8*c
= equal     group     5: printable form  func {[c]32+1.8*c}
~ match     not
, concat    enlist
^ fill|out  null                         \\t x   time
# take|rsh  count                        \\\\     exit
_ drop|cut  floor
$ cast|sum  string    $[c;t;f]     COND
? find|rnd  distinct  ?[x;I;[f;]y] insert
@ at        type      @[x;i;[f;]y] amend
. dot       eval|val  .[x;i;[f;]y] dmend
A manual of the oK language is available with more details:
    https://github.com/JohnEarnest/ok/blob/gh-pages/docs/Manual.md
A more general introduction to array programming is also provided:
    https://github.com/JohnEarnest/ok/blob/gh-pages/docs/Programming.md
`

function evl(s){
 let env    = oK.baseEnv()
 let run    = oK.run
 let parse  = oK.parse
 let format = oK.format

 O("\n")
 let r
 try{ r=format(run(parse(s),env));r=r.length?r+"\n ":r}catch(e){r=e.message+"\n"}
 O(r)
}

let ok={ini:ini,evl:evl,src:'ok/oK.js'}

export { ok }
