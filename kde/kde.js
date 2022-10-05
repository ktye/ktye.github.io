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
 ed = CodeMirror(left,{
  "lineNumbers":true,
  "dragDrop":false,"tabSize":8,"smartIndent":false,
  "matchBrackets":true,
  "foldGutter":true,
  "gutters":["CodeMirror-linenumbers","CodeMirror-foldgutter"]})
 ed.on("contextmenu",function(_,e){pd(e)})
 ed.setValue(decodeURIComponent(window.location.hash.substr(1)))
 ed.modified=false
 ed.sp=false //.sp(span) ed.sp.h(handle)
 ed.on("change",modify)
 ed.on("change",function(){})
 kmode(true)
 if(!crossOriginIsolated)ge("expl").append(document.createTextNode("no hr timer"))
 fetch("z.k").then(r=>r.text()).then(r=>zk=r)
 kstart("")
}
function save(){if(ed.sp)ed.sp.u=us(ed.getValue())}

function kmode(x){
 let ex=[] //words in a.k b.k if first line is /!a.k b.k
 if(x){
  let em={}
  let s=ed.getValue()
  s=(s.startsWith("/!"))?cats(s.slice(2,s.indexOf("\n")).split(" "),""):""
  let re=/[a-zA-Z][\w]*/g
  var a=s.match(re)
  if(a)a.forEach(x=>{em[x]=true})
  ex=Object.keys(em)
 }
 let WORD = /[\w$]+/, RANGE = 500; //from anyword-hint.js
 let hnt=function(ed,o){
  var w=o&&o.word||WORD;
  var range=o&&o.range||RANGE;
  var cur=ed.getCursor(),curLine=ed.getLine(cur.line);
  var end=cur.ch,start=end;
  while(start&&w.test(curLine.charAt(start-1)))--start;
  var curWord=start!=end&&curLine.slice(start,end);
  var li=o&&o.list||[],seen={};
  var re=new RegExp(w.source,"g");
  for(var d=-1;d<=1;d+=2){
   var l=cur.line,endLine=Math.min(Math.max(l+d*range,ed.firstLine()),ed.lastLine())+d;
   for(;l!=endLine;l+=d){
    var text=ed.getLine(l),m;
    while(m=re.exec(text)){
     if(l==cur.line&&m[0]===curWord)continue;
      if((!curWord||m[0].lastIndexOf(curWord,0)==0)&&!Object.prototype.hasOwnProperty.call(seen,m[0])){
       seen[m[0]]=true;
       li.push(m[0]);
  }}}}
  for(let i=0;i<ex.length;i++)if(ex[i].startsWith(curWord))li.push(ex[i])
  return{list:li,from:CodeMirror.Pos(cur.line,start),to:CodeMirror.Pos(cur.line,end)};
 }
 ed.setOption("mode",x?"k":"")  
 ed.setOption("theme",x?"k":"")
 if(x)ed.on("gutterClick",execline);else ed.off("gutterClick",execline)
 if(x)ed.setOption("extraKeys",{"RightClick":search,"Shift-RightClick":exec,"Shift-Enter":exec,'F11':function(cm){cm.setOption("fullScreen",!cm.getOption("fullScreen"))},"Tab":"autocomplete"})
 else ed.setOption("extraKeys",{})
 CodeMirror.commands.autocomplete=function(cm){cm.showHint({hint:hnt})}
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
 if(s.length){repl.lastChild.textContent+=s+"\n";krep(s);return}
 kstart(cm.getValue())
}
function execline(ed,n,gutter){ //click on linenumber executes
 if(gutter=="CodeMirror-linenumbers"){ //-foldgutter for folding
  repl.lastChild.textContent+=ed.getLine(n)+"\n"
  krep(ed.getLine(n))  
}}
function modify(){if(ed.modified)return
 ed.modified=true
 if(ed.sp)ed.sp.classList.add("modified")
}
function grep(s){if(!s)return
 ge(repl.lastChild.textContent+="\\grep "+s+" *\n")
 let g=function(f,a){
  let l=a.split("\n")
  let p=0
  for(let i=0;i<l.length;i++){
   let j=l[i].indexOf(s)
   if(j>=0){
    let sp=ce("span");sp.textContent=l[i]
    fileat(f,p+j,false,[sp])
   }
   p+=1+l[i].length
  }
 }
 let a=ge("expl").children;for(let i=0;i<a.length;i++)if(a[i].u)g(a[i].textContent,su(a[i].u))
 pr()
}
ge("grep").onkeydown=function(e){if(e.key=="Enter")grep(e.target.value)}

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
 if(k)s.classList.add("kfile")
 s.onclick=function(){openfile(s,ex)}
 if(k)preload(s)
 return s
}

function openfile(s,ex,p){ //span: .h(handle)
 s.classList.add("curfile")
 let set=function(s,u){
  save()
  ed.sp=false
  s.u=new Uint8Array(u)
  ed.setValue(su(s.u))
  ed.sp=s
  ed.modified=false
  kmode(s.textContent.endsWith(".k")&&ge("ksyn").checked) 
  if(p)showpos(p)
  ge("putb").disabled=false
  let a=ex.children;for(let i=0;i<a.length;i++)if(a[i]!=s)a[i].classList.remove("curfile")
 }
 if("(z.k)"==s.textContent){set(s,s.u);return}
 if("u"in s)set(s,s.u) //from cache
 else s.h.getFile().then(r=>r.arrayBuffer()).then(u=>set(s,u))
}

ge("rall").onclick=function(){ //preload all files for k synchronous read
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++)preload(a[i])
}

function preload(s){
 s.h.getFile().then(r=>r.arrayBuffer()).then(u=>{s.u=new Uint8Array(u)})
}

function findfile(name){
 let ex=ge("expl")
 let a=ex.children;for(let i=0;i<a.length;i++){let s=a[i].textContent
  if(s==name)return a[i]
 }
 if(name=="(z.k)"){
  let s=newspan(name,null)
  s.u=us(zk);ex.appendChild(s);return s
}}

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

ge("putb").onclick=async function(){
 if(ed.sp!==false){
  const w=await ed.sp.h.createWritable()
  await w.write(ed.getValue())
  await w.close()
  ed.sp.u=us(ed.getValue())
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

ge("ksyn").onchange=function(e){kmode(e.target.checked)}


//dbl-click on editor scrollbar to request more space, or F11 to toggle fullscreen, when editor is focused
let sbclick=0
window.onmousedown=function(e){
 let dbl=function(){
  let t=performance.now(), r=(t-sbclick)<200
  sbclick=t;return r}
 let t=function(){ if(dbl()){
  ge("left").classList.toggle("left0");ge("left").classList.toggle("left1")
  ge("repl").classList.toggle("repl0");ge("repl").classList.toggle("repl1")
 }}
 if     (e.target.classList.contains("CodeMirror-hscrollbar"))t()
 else if(e.target.classList.contains("CodeMirror-vscrollbar"))t()
}


function clickrun(e){
 let s=ed.getValue()
 save()
 location.hash=(s.length<1000)?"#"+encodeURIComponent(s):""
 kstart(s,e.target.textContent=="trc")
}
ge("runb").onclick=clickrun
ge("trcb").onclick=clickrun
ge("intr").onclick=interrupt


//repl
function O(s,k){if(s=="")return
 let e=ce("span");
 if("object"==typeof k)kval(e,k)
 e.contentEditable="true"
 e.textContent=s
 e.onkeydown=enterkey
 repl.appendChild(e);
}
function kval(sp,k){ //double-click:redisplay, right-click:assign to x
 sp.k=k
 sp.title=k.i
 sp.classList.add("kval")
 sp.ondblclick=function(e){
  repl.lastChild.textContent+=e.target.textContent+"\n"
  kw.postMessage({m:"kst",k:e.target.k.k})
 }
 sp.oncontextmenu=function(e){pd(e);kw.postMessage({m:"xgets",k:e.target.k.k})}
}
function pr(){
 let e=ce("span")
 e.textContent=(repl.children.length&&repl.lastChild.textContent.endsWith("\n"))?" ":"\n "
 e.contentEditable=true
 e.classList.add("kinput")
 e.onkeydown=enterkey
 repl.appendChild(e)
 let c=window.getSelection() //go to end
 c.removeAllRanges()
 let r=document.createRange()
 r.selectNodeContents(e)
 r.collapse(false)
 c.addRange(r)
 repl.scrollTo(0,repl.scrollHeight)
 e.focus()
}
function enterkey(e){if(e.key!="Enter")return
 let t=e.target;let s=t.textContent;t.textContent+="\n"
 s=s.startsWith(" ")?s.slice(1):s.startsWith("\n ")?s.slice(2):s
 if(t.parentElement==repl){
  if(repl.lastChild!=t)repl.lastChild.textContent=s
  krep(s)
 }
 pd(e)
}
function consize(){let mono=ge("mono");return{
  w:Math.floor(repl.clientWidth/mono.clientWidth),
  h:Math.floor(repl.clientHeight/mono.clientHeight)}
}


function kstart(s,trc){
 intr.disabled=false
 repl.textContent=""
 s=cats(s.startsWith("/!")?s.slice(2,s.indexOf("\n")).split(" "):[],s)
 //console.log("cats",s)
 kw.postMessage({m:"start",s:s,trc:trc,cons:consize()})
}
function krep(s){
 if(s==""){rm(repl);pr();return}
 if(s.startsWith("\\")){help();return}
 intr.disabled=false
 kw.postMessage({m:"repl",s:s,cons:consize()})
}
function cats(files,s){
 src={f:["(z.k)"],n:[zk?zk.length:0]}
 let k={}; let r=[]
 if(files.length){
  let a=ge("expl").children;for(let i=0;i<a.length;i++)k[a[i].textContent]=su(a[i].u)
  if(a.length==0)return s;
  for(let i=0;i<files.length;i++){
   if(!files[i]in k)throw(files[k]+" is missing")
   let fi=files[i]; let si=k[fi]
   src.f.push(fi);src.n.push(si.length)
   r.push(si)
 }}
 r.push(s)
 src.f.push((ed.sp===false)?"(ed)":ed.sp.textContent);src.n.push(s.length)
 return r.join("\n")
}
let src={}

function help(){fetch("../readme").then(r=>r.text()).then(t=>{O(t);pr()})}
 
let kw
function newk(){
 kw=new Worker("kwork.js", {type:"module",name:"kwork"})
 
 kw.onmessage=function(e){let d=e.data
  switch(d.m){
  case"write":
   if(d.f==""){O(d.s,d.k);if(d.mem!==undefined)ge("memo").textContent=d.mem}
   else        writefile(d.f,d.u)
   break
  case"prompt":pr();break
  case"indicate":indicate(d.p,d.e,d.l,d.stack);break
  default: console.log("unknown from kwork:", e.data)
 }}
 kw.onerror=function(e){
  console.log("err from kwork:",e.message,e.filename+":"+e.lineno, e)
 }
}
newk()

function interrupt(){
 kw.terminate()
 newk()
 kstart("")
}

let zk //built-in z.k source for error indication
function indicate(p,e,l,fstack){
 if(e!=""){
  let a=ce("a")
  a.href=l;a.target="_blank";a.innerText=e
  let d=ce("div");d.contentEditable=false;d.appendChild(a);repl.appendChild(d) //wrap to make it clickable
 }
 if(fstack.length)printstack(fstack)
 else filelink(p,true)
}
function fileat(f,p,direct,extra){
 if(direct&&f=="(ed)"){showpos(p);return}
 let a=ce("a");
 a.href=f+":"+p
 a.textContent=(f+":"+p).padEnd(10)
 if(f=="(ed)")a.onclick=function(e){pd(e);showpos(p)}
 else         a.onclick=function(e){pd(e);openfile(findfile(f),ge("expl"),p)}
 repl.appendChild(a)
 if(extra!==undefined)for(let i=0;i<extra.length;i++)repl.appendChild(extra[i])
 let e=ce("span");e.textContent="\n";repl.appendChild(e)
}
function filelink(p,direct,extra){
 for(let i=0;i<src.n.length;i++){let ni=src.n[i]
  if(p<ni){fileat(src.f[i],p-2,direct,extra);return}
  p-=1+ni
 }
 console.log("filelink:",p)
}
function showpos(i){
 let p=ed.posFromIndex(i)
 ed.setSelection(p,{line:p.line,ch:1+p.ch})
}
function printstack(fstack){for(let i=0;i<fstack.length;i++){
 let kx=fstack[i].k
 let spn=function(s){let r=ce("span");r.textContent=s;return r}
 let extra=[spn("(")]
 for(let j=0;j<kx.length;j++){let kj=kx[j]
  let e=ce("span")
  kval(e,kj)
  e.textContent=kj.s+((j==kx.length-1)?"":" ")
  extra.push(e)
 }
 extra.push(spn(")"))
 filelink(fstack[i].p,false,extra)

}}

window.ge=ge //for js console
