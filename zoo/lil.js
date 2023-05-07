import {fs} from './fs.js'

window.readfile=fs.readfile
window.writefile=fs.writefile

let O,ev
function ini(left,o) {O=o

 //let p=document.createElement("pre");p.textContent=help;left.appendChild(p)
 
 let d=document.createElement("div")
 d.style.height="100%"
 let p=document.createElement("iframe")
 //p.src="https://beyondloom.com/decker/lil.html"
 p.src="lil/lilquickref.html"
 p.style.width="100%";p.style.height="100%"
 left.style.overflow="hidden"
 let a=document.createElement("button")
 a.textContent="manual"
 a.onclick=e=>{ p.src="https://beyondloom.com/decker/lil.html"}
 d.appendChild(a)
 d.appendChild(p)
 left.appendChild(d)
 
 
 
 fetch("./lil/lil.js").then(l=>l.text()).then(l=>{
  fetch("./lil/repl.js").then(r=>r.text()).then(r=>{
   ev=new Function("O", l+"\n"+r)(O)
   O("lil\n ")
  })
 })
}

function evl(s){ev(s)}

let help = `lil 
https://beyondloom.com/decker/lil.html
`

let lil={ini:ini,evl:evl,src:'lil/lil.js'}

export { lil }
