import { Bqn } from './bqn/bqn.js'

let O
function ini(left,o){O=o
 fetch("./bqn/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 
 O("BQN\n  ")
}

function evl(s){
 O("\n")
 let src=Bqn.str(Array.from(s))
 let c=Bqn.compile(src)
 O(Bqn.fmt(Bqn.run.apply(null,c)))
 O("\n  ")
}

let bqn={ini:ini,evl:evl}

export { bqn }
