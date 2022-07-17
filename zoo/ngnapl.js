import { Apl } from './ngnapl/apl.js'

let O,ctx
function ini(left,o) {O=o
 console.log("left/o",left,o)
 let p=document.createElement("pre");p.textContent=help;left.appendChild(p)

 O("ngn/apl\n      ")
 ctx=Apl.ini() 
}

let help = `ngn/apl

see: https://github.com/abrudz/ngn-apl`

function evl(s){
 O("\n")
 O(Apl.apl(s,ctx))
 O("\n      ")
}

let ngnapl={ini:ini,evl:evl,src:'./ngnapl/apl.js'}

export { ngnapl }
