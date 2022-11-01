//import { Bqn } from './bqn/bqn.js'

let O,Bqn
function ini(left,o){O=o
 fetch("./bqn/ref.txt").then(r=>r.text()).then(r=>{let p=document.createElement("pre");p.textContent=r;left.appendChild(p)});
 
 fetch("./bqn/bqn.js").then(r=>r.text()).then(r=>{
  Bqn = new Function(r+"\n return{str:str,compile:compile,run:run,fmt:fmt}")()
 })
 
 O("BQN\n  ")
}

function evl(s){
 O("\n")
 let src=Bqn.str(Array.from(s))
 let c=Bqn.compile(src)
 O(Bqn.fmt(Bqn.run.apply(null,c)))
 O("\n  ")
}

let bqn={ini:ini,evl:evl,src:"./bqn/bqn.js"}

export { bqn }
