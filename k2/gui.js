let G=[],gui=(x,y)=>G.push([x,y]),ui=_=>{G.forEach(x=>(x[0]?show:hide)(x[1])),G=[]}
let show=x=>win(x)
let fwin=x=>qs(dex,`[data-k="${x}"]`)
let hide=x=>(fwin(x).remove(),k(`${x}.:${x}. _di\`t`))

let ce=x=>document.createElement(x)
let ac=(c,x)=>(x.appendChild(c),x)
let ct=(t,x)=>(x.textContent=t,x)
let cl=(c,x)=>(x.classList.add(c),x)
let qs=(x,y)=>x.querySelector(y)
let bb=x=>x.getBoundingClientRect()
let attr=(x,l,a)=>l.includes(a)?J(`${x}..${a}`):0
let win=x=>{let i=dex.childElementCount
 let v=J(x),A=J(`!${x}.`);k(`${x}..t:"\`show$\`${x}"`)
 console.log("v",v,"A",A);
 let l=0,w=fwin(x)||(l=1,cl("win",ce("w")));w.dataset.k=x;
 let c=attr(x,A,"c")||atn(["data"],4,1);console.log("c",c);c=c.t==4?c[0]:"data";if(5==v.t&&c!="data")c="form";
 let f={data:data/*,char:char,plot:plot,check:check,radio:radio,button:button,form:form*/}[c]||(x=>`class ${c}?`);
 w.innerHTML=`<div class="hdr">
  <img src="../kelas32.png" width="16" style="float:left;position:relative;left:-5px">
  <span>${x}</span>
  <span style="float:right" style="padding-left:5px" class="cxx" data-k="${x}">&#x2717;</span>
 </div>`+f(x,v,A);
 ac(w,dex);if(l)lay(w,i);drag(w);return w}

let data=(x,v,a)=>{
 let t=v.t<0 //|| dict of vectors
 let[K,V]=v.t==5?v:[[last(x.split("."))],[v]]
 let A=v.t==5?K.map(k=>`!${x}.k.`):[a]
 if(t)return "table..";
 let r="";for(let i=0;i<K.length;i++){ let k=K[i],vi=V[i],xi=v.t==5?`${x}.${k}`:x,s=v[0]
  let l=attr(x,A[i],"l");l=l?l[0]:last(k.split("."))
  let e=attr(x,A[i],"e");console.log("e!",e);e=e?e[0]:1; console.log("e?",e);
  let f=attr(x,A[i],"f");if(f)s=J(f[0]+xi)[0]
//  let g=attr(x,A[i],"g");g=g?g=f[0]+xi:
  let h=attr(x,A[i],"h");h=h?h[0]:""
  console.log("s?",JSON.stringify(s));
  r+=`<tr title="${h}"><th>${l}</th><td>${input(s,e,h)}</td></tr>`
 }
 return"<table>"+r+"</table>"}

let input=(x,e,h)=>(console.log("input value",x),`<input value="${x}" ${e?"":"readonly"}>`)
let last=x=>x[x.length-1]
let inp=(x,v,a,t)=>{
 let g=atr(a,"g")||(t==-3?" ":["0","0.0",`" "`,"`"][t])+"$";g=`(${g})${x}`
 //let u=atr(a,"u')||":";u=`${x}:
 `<input value="${v[0]}" data-k=${k} data-g="${g}" onchange="valid(this)">`
}
let valid=x=>sk(x.dataset.g)

let lay=(w,i)=>{let r=bb(dex);w.style.left=(5+r.left+20*i)+"px";w.style.top=(5+r.top+30*i)+"px"}
let drag=w=>{let h=w.firstElementChild,a=0,p=0,c=0,d=0
 let cd=_=>{document.onmouseup=null;document.onmousemove=null}
 let mm=e=>{pd(e);a=c-e.clientX;b=d-e.clientY;c=e.clientX;d=e.clientY;
  let r=bb(dex),R=bb(w)
  w.style.top=Math.max(5,Math.min(-5+r.height-R.height,w.offsetTop-b))+"px"
  w.style.left=Math.min(r.left+r.width-R.width-5,Math.max(r.left+5,w.offsetLeft-a))+"px"}
 let md=e=>{pd(e);w.parentNode.appendChild(w);/*bring to top*/
 if(e.target.className=="cxx")return hide(e.target.dataset.k)
 c=e.clientX;d=e.clientY;document.onmouseup=cd;document.onmousemove=mm}
 h.onmousedown=md
}



