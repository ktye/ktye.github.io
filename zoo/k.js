import { K  } from '../k.js'
import { D  } from '../draw.js'
import { fs } from './fs.js'


function U(){ return new   Uint32Array(K._.memory.buffer) }
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}
function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}

var O
var ctx

function ktry(s){
 try     { let x=K._.repl(K.KC(s)); K.save() }
 catch(e){ console.log(e); K.restore() }
}
function display(){
 let cnv=ce("canvas")
 cnv.id="_cnv"
 cnv.style.position="absolute"
 cnv.style.left=0;
 cnv.style.bottom="0vh"
 cnv.style.zIndex=10;
 ctx=cnv.getContext("2d")
 return cnv
}

const ref=`ktye/k ktye.github.io/kdoc.htm
+ flp add  '  ech     both bin
- neg sub  /  ovr/fix echright
* fst mul  \  scn/fix eachleft
% sqr div      / join   decode
! til key  mod \ split  encode
& wer min  $[a;b;...]     cond
| rev max  while[c;a;b;d;e;..]
< asc les  f:{x+y}   [bl;o;ck]
> dsc mor              "abc" c
= grp eql  01234567   1 2 3  i
~ not mtc   :+-*%&|   4 5 6. f
, enl cat  <>=~!,^#   2a300  z
^ srt cut  _$?@.     (1;2 3) L
# cnt tak           °a°b!5 6 D
_ flr drp  t,d t,t t,'t   join
$ str cst           k!t    key
? unq fnd  in       k?t  group
@ typ atx  @[x;i;+;y]    amend
. val cal  .[x;i;+;y]    dmend
                              
abs sin cos exp log find angle
imag conj  types:cisfzLDTvcdlx
?n(uniform) ?-n(normal) ?z(bi)
n?n(with)   random   -n?n(w/o)
`.replace(/°/g,"`")

function ini(left,o){O=o
 let p=ce("pre");p.textContent=ref;left.appendChild(p)
 left.appendChild(display())

 var ext={
  init: function( ){O("ktye/k\n ")},
  read: fs.readfile,
  write:function(f,u){if(f==""){O(su(u))}else{fs.writefile(f,u)}},
 }

 fs.init(U,O)

 Object.assign(ext, D)
 K.kinit(ext,"../k.wasm")
 
 tty.drop=function(name,u){
  if(name.endsWith(".k")){O("\\l "+name+"\n"); ktry(u); O(" ")}
 }
 
}

function evl(s){
 O("\n")
 //K._.repl(K.KC(s))
 ktry(s)
 O(" ")
}

let k={ini:ini,evl:evl,src:""}

export { k }
