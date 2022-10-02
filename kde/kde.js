if('serviceWorker'in navigator)navigator.serviceWorker.register("kde.sw.js")

function ge(x){return document.getElementById(x)}
function ce(x){return document.createElement(x)}
function pd(e){if(e){e.preventDefault();e.stopPropagation()}}
function rm(p){while(p.firstChild)p.removeChild(p.firstChild);return p}

let left,repl,intr,ed,dir
const td_=new TextDecoder("utf-8"),su=x=>td_.decode(x)
const te_=new TextEncoder("utf-8"),us=x=>te_.encode(x)

function err(x){ge("repl").textContent+="\n"+x+"\n "}

window.onerror=function(m,s,l,c,e){err(s+m)}

window.init=function(){
 left=ge("left")
 repl=ge("repl")
 intr=ge("intr")
 ed = CodeMirror(left, {
  "mode":"k","theme":"k","lineNumbers":true,
  "dragDrop":false,"tabSize":1,"smartIndent":false,
  "matchBrackets":true,
  "foldGutter":true,
  "gutters":["CodeMirror-linenumbers","CodeMirror-foldgutter"]})
 ed.setOption("extraKeys",{"RightClick":search,"Shift-RightClick":exec,"Shift-Enter":exec})
 ed.on("contextmenu",function(_,e){pd(e)})
 ed.setValue("!3")
 ed.modified=false
 ed.sp=false //.sp(span) ed.sp.h(handle)
 ed.on("change",modify)
 ed.on("change",function(){})
 ge("expl").append(document.createTextNode("high resolution timer: "+crossOriginIsolated))
 kstart("")
}


function search(cm,pos){ //right click selected text in the editor
 let t=cm.getSelection()
 if(!t.length)return 
 let i=cm.indexFromPos(cm.getCursor())
 let s=cm.getValue()
 let r=s.slice(i)
 let x=r.indexOf(t)
 let p=cm.posFromIndex((x>0)?i+x:s.indexOf(t))
 cm.setSelection(p,{line:p.line,ch:p.ch+t.length})
}
function exec(cm,pos){ //shift-enter or shift-rightclick, eval current selection or restart
 let s=cm.getSelection()
 if(s.length){repl.textContent+=s+"\n";krep(s);return}
 kstart(cm.getValue())
}

function modify(){if(ed.modified)return
 ed.modified=true
 if(ed.sp)ed.sp.classList.add("modified")
}

//opendir by button click or dropping a directory (requires support&authorization)
async function opendir(d){dir=d
 ge("newb").disabled=false
 ge("rall").disabled=false
 let ex=rm(ge("expl"))
 let ak=false
 for await(const [f,v]of dir.entries()){
  if(v.kind=="file"){
   let s=newspan(f,v)
   ex.appendChild(s)
   if("a.k"==f)ak=s
  }
 }
 document.title=dir.name
 ge("odir").textContent="/"+dir.name
 if(ak!==false)openfile(ak,ex)
}
ge("odir").onclick=async function(){window.showDirectoryPicker().then(h=>opendir(h))}

function newspan(name,h){
 let s=ce("span")
 let ex=ge("expl")
 s.textContent=name
 s.h=h
 let k=name.endsWith(".k")
 s.classList.add(k?"kfile":"file")
 s.onclick=function(){openfile(s,ex)}
 if(k)preload(s)
 return s
}

function openfile(s,ex){ //span: .h(handle)
 s.classList.add("curfile")
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>{
  s.u=new Uint8Array(u)
  ed.setValue(su(s.u))
  ed.sp=s
  ed.modified=false
  ge("wrtb").disabled=false
  let a=ex.children;for(let i=0;i<a.length;i++)if(a[i]!=s)a[i].classList.remove("curfile","modified")
 })
}

ge("rall").onclick=function(){ //preload all files for k synchronous read
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++)preload(a[i])
}

function preload(s){
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>{s.u=new Uint8Array(u)})
}

function readfile(name){ // from k(must be preloaded), or readdir: `$"\n"\:<`"."
 let ex=ge("expl")
 let d=[]
 let a=ex.children;for(let i=0;i<a.length;i++){let s=a[i].textContent;
  if((s==name)&&("u"in a[i])&&("object"==typeof a[i].u))return a[i].u
  d.push(s)
 }
 if(name==".")return us(d.join("\n"))
 return new Uint8Array(0)
}

async function writefile(name,u){ //from k
 if(dir){
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
 openfile(addfile(h),ge("expl"))
}

function addfile(h){
 let ex=ge("expl")
 let a=ex.children
 for(let i=0;i<a.length;i++)if(a[i].textContent==h.name){ex.removeChild(a[i]);break}
 let s=newspan(h.name,h)
 let ok=false;for(let i=0;i<a.length;i++)if(a[i].textContent>h.name){ex.insertBefore(s,a[i]);ok=true;break}
 if(!ok)ex.appendChild(s)
 return s
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

function cats(files,s){
 let k={}; let r=[]
 let a=ge("expl").children;for(let i=0;i<a.length;i++)k[a[i].textContent]=su(a[i].u)
 for(let i=0;i<files.length;i++){
  if(!files[i]in k)throw(files[k]+" is missing")
  r.push(k[files[i]])
 }
 r.push(s)
 return r.join("\n")
}

function kstart(s){        //todo: read args from hash, e.g. #a.k,b.k,c.k
 intr.disabled=false
 repl.textContent=""
 if(s.startsWith("/!"))s=cats(s.slice(2,s.indexOf("\n")).split(" "),s)
 kw.postMessage({m:"start",s:s})
}
ge("runb").onclick=function(){kstart(ed.getValue())}
ge("intr").onclick=interrupt
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
 intr.disabled=false
 kw.postMessage({m:"repl",s:s})
 //try     {K._.repl(K.KC(s));K.save()}
 //catch(e){console.log(e);K.restore()}
 //repl.textContent+=" ";end()
}

function end(m){
 intr.disabled=true
 let s=window.getSelection()
 s.removeAllRanges()
 let r=document.createRange()
 r.selectNodeContents(repl)
 r.collapse(false)
 s.addRange(r)
 if(m!==undefined)ge("memo").textContent=m
 //let m=K._.memory.buffer.byteLength>>>10
 //ge("memo").textContent=(m>1000)?((m>>>10)+"M"):m+"k"
 repl.scrollTo(0,repl.scrollHeight)
 repl.focus()
}

function help(){fetch("../readme").then(r=>r.text()).then(t=>{repl.textContent=t+" ";end()})}
 
let kw
function newk(){
 kw=new Worker("kwork.js", {type:"module",name:"kwork"})
 
 kw.onmessage=function(e){let d=e.data
  switch(d.m){
  case "write":
   if(d.f==""){O(su(d.u));end(d.mem)}
   else        writefile(d.f,d.u)
   break
  default: console.log("unknown from kwork:", e.data)
 }}
 kw.onerror=function(e){
  console.log("err from kwork:",e)
 }
}
newk()

function interrupt(){
 kw.terminate()
 newk()
 kstart("")
}

