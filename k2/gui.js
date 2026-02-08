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
let win=x=>{let i=dex.childElementCount
 let v=J(x),a=J(x+".");k(`${x}..t:"\`show$\`${x}"`)
 console.log("v",v,"a",a);
 let l=0,w=fwin(x)||(l=1,cl("win",ce("w")));w.dataset.k=x
 w.innerHTML=`<div class="hdr">
  <img src="../kelas32.png" width="16" style="float:left;position:relative;left:-5px">
  <span>${x}</span>
  <span style="float:right" style="padding-left:5px" class="cxx" data-k="${x}">&#x2717;</span>
 </div>
 <table><tr><td>${x}</td><td>
 </td></tr></table>`

 ac(w,dex);if(l)lay(w,i);drag(w);return w}

let atr=(a,x,i)=>6==a._?null:(i=a[0].indexOf(x),i<0?null:a[1][i])
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


