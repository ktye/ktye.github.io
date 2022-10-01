/* todo
- shift-return        (kstart  & eval-editor)
- mark shift-return   (no-reset; eval selected line)
- write file
- read file? reading is async, does not work from wasm
 - maybe preload, or click-file first?
- plot
*/

import {K} from '../k.js'

if('serviceWorker'in navigator)navigator.serviceWorker.register("kde.sw.js")

function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

let left,repl,ed,dir

function err(x){ge("repl").textContent+="\n"+x+"\n "}

window.onerror=function(m,s,l,c,e){err(s+m)}

window.init=function(){
 left=ge("left")
 repl=ge("repl")
 ed = CodeMirror(left, {"mode":"k","lineNumbers":true,"dragDrop":false,"tabSize":1,"smartIndent":false,"matchBrackets":true})
 ed.setOption("theme","k")
 ed.setValue("!3")
 ed.modified=false
 ed.sp=false //.sp(span) ed.sp.h(handle)
 ed.on("change",modify)
 ed.on("change",function(){})
 kstart("")
}

function modify(){if(ed.modified)return
 ed.modified=true
 if(ed.sp)ed.sp.classList.add("modified")
}

//opendir by button click or dropping a directory (requires support&authorization)
async function opendir(d){dir=d
 ge("newb").disabled=false
 ge("rall").disabled=false
 
 console.log("opendir", dir)
 
 let ex=rm(ge("expl"))
 for await(const [f,v]of dir.entries()){
  if(v.kind=="file"){
   let s=newspan(f,v)
   ex.appendChild(s)
  }
 }
 
 console.log("opendir!", dir)
 
 document.title=dir.name
 ge("odir").textContent="/"+dir.name
}
ge("odir").onclick=async function(){window.showDirectoryPicker().then(h=>opendir(h))}

function newspan(name,h){
 let s=ce("span")
 let ex=ge("expl")
 s.textContent=name
 s.h=h
 s.classList.add((name.endsWith(".k"))?"kfile":"file")
 s.onclick=function(){openfile(s,ex)}
 return s
}

function openfile(s,ex){ //span: .h(handle)
 s.classList.add("curfile")
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>{
  s.u=new Uint8Array(u)
  ed.setValue(new TextDecoder("utf-8").decode(s.u))
  ed.sp=s
  ed.modified=false
  ge("wrtb").disabled=false
  let a=ex.children;for(let i=0;i<a.length;i++)if(a[i]!=s)a[i].classList.remove("curfile","modified")
 })
}

ge("rall").onclick=function(){ //preload all files for k synchronous read
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++)
  a[i].h.getFile().then(r=>r.arrayBuffer()).then(u=>{a[i].u=new Uint8Array(u)})
}

function readfile(name){ // from k(must be preloaded), or readdir: `$"\n"\:<`"."
 let ex=ge("expl")
 let d=[]
 let a=ex.children;for(let i=0;i<a.length;i++){let s=a[i].textContent;
  if((s==name)&&("u"in a[i])&&("object"==typeof a[i].u))return a[i].u
  d.push(s)
 }
 if(name==".")return new TextEncoder("utf-8").encode(d.join("\n"))
 return new Uint8Array(0)
}

async function writefile(name,u){ //from k
 console.log("writefile", name)
 if(dir){
  console.log("dir?",dir)
  const h=await dir.getFileHandle(name,{create:true})
  const w=await h.createWritable()
  await w.write(u)
  await w.close()
  addfile(h)
 }else return 1
}

ge("wrtb").onclick=async function(){
 if(ed.sp!==false){
  const w=await ed.sp.h.createWritable()
  await w.write(ed.getValue())
  await w.close()
  ed.sp.classList.remove("modified")
  ed.modified=false
 }
}

ge("newb").onclick=async function(e){
 let b=e.target
 let h=await window.showSaveFilePicker({startIn:dir})
 addfile(h)
 openfile(s,ge("ex"))
}

function addfile(h){
 let ex=ge("expl")
 let a=ex.children
 for(let i=0;i<a.length;i++)if(a[i].textContent==h.name){ex.removeChild(a[i]);break}
 let s=newspan(h.name,h)
 let ok=false;for(let i=0;i<a.length;i++)if(a[i].textContent>h.name){ex.insertBefore(s,a[i]);ok=true;break}
 if(!ok)ex.appendChild(s)
}

window.ondragover=function(e){pd(e)}
window.ondrop=function(e){pd(e);
 if(e.dataTransfer.items){
  let d=e.dataTransfer.items
  if((1==d.length)&&(d[0].kind=="file")){
   d=d[0].getAsFileSystemHandle().then(h=>{
    if(h.kind!="directory"){err("only a directory can be dropped");return}
    opendir(h)
   })
   return
  }
 }
 err("only a directory can be dropped")
}


function kstart(s){        //todo: read args from hash, e.g. #a.k,b.k,c.k
 repl.textContent=""
 let  ext={}
 ext.init= function(){
  if(("string"==typeof s)&&(s!="")){
   K._.repl(K.KC(s))
  }
  O("ktye/k "+K.n+"\n ");
  end()
 }
 ext.read= readfile
 ext.write=function(f,x){if(f==="")O(new TextDecoder("utf-8").decode(x));else writefile(f,x)}
 K.kinit(ext,"../k.wasm")
}
ge("runb").onclick=function(){kstart(ed.getValue())}

ge("repl").onkeydown=function(e){if(e.key!="Enter")return
 pd(e)
 
 let s=window.getSelection()
 let r=s.getRangeAt(0)
 let t=repl.textContent.slice(0,r.endOffset)
 repl.textContent=t
 let i=t.lastIndexOf("\n")
 t=t.slice(i>0?1+i:0)
 repl.textContent+="\n"
 if(t.trim()!="")krep(t)
}

function O(s){
 repl.textContent+=s
}

function krep(s){
 if(s.startsWith(" "))s=s.slice(1)
 if((s=="\\")||s=="\\h"){help();return}
 try     {K._.repl(K.KC(s));K.save()}
 catch(e){console.log(e);K.restore()}
 repl.textContent+=" ";end()
}

function end(){
 let s=window.getSelection()
 s.removeAllRanges()
 let r=document.createRange()
 r.selectNodeContents(repl)
 r.collapse(false)
 s.addRange(r)
 let m=K._.memory.buffer.byteLength>>>10
 ge("memo").textContent=(m>1000)?((m>>>10)+"M"):m+"k"
 repl.scrollTo(0,repl.scrollHeight)
 repl.focus()
}

function help(){fetch("../readme").then(r=>r.text()).then(t=>{document.body.textContent+=t+" ";end()})}
 


