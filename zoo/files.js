import { fs } from './fs.js'

function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function us(s){return new TextEncoder("utf-8").encode(s)}
function su(u){return (u.length)?new TextDecoder("utf-8").decode(u):""}



function ini(left,o){
 let tty=ge("tty")
 tty.onkeydown=undefined
 let currentfile=""
 let editfile=function(e){if(currentfile.length)fs.writefile(currentfile,us(tty.value))}
 tty.onchange=editfile

 let t=ce("table")
 let keys=Object.keys(fs.files)

 for(let i=0;i<keys.length;i++){
  let filename=keys[i]
  let u=fs.files[filename]
  let r=ce("tr")
  
  let name=ce("td")
  name.textContent=filename
  name.style.color="blue"
  name.onclick=function(){tty.value=su(u);currentfile=filename}
  r.appendChild(name)
  
  let bytes=ce("td")
  bytes.textContent=String(u.length)
  r.appendChild(bytes)
  t.appendChild(r)
  
  let a=ce("a")
  a.textContent="↓"
  r.appendChild(a)
  let b=new Blob([u],{type:"application/octet-stream"})
  a.href=URL.createObjectURL(b)
  a.download=filename
 }
 left.appendChild(t)
}
function evl(s){}


let files = {ini:ini,evl:evl,src:""}
export { files } 