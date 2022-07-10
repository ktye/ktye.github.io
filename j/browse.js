function ge(x){ return document.getElementById(x) }
function ce(x){ return document.createElement(x) }

let tab=ge("tab")
let edt=ge("edt")
let grp=ge("grp")
let lst=ge("lst")
let src

function ld(x){ fetch(x).then(r=>r.json()).then(r=>st(r)) }
function st(x){ src=x; let k=Object.keys(x); let m=10;
 let r=ce("tr")
 for(let i=0;i<k.length;i++){
  if(r.childElementCount==m){tab.appendChild(r);r=ce("tr")}
  let d=ce("td"); d.textContent=k[i]; d.classList.add("link")
  let s=x[k[i]].join("\n");  d.onclick=function(){edt.value=s}
  r.appendChild(d)
 }
 tab.appendChild(r)
}
function gr(x){ cl(lst); if(x.length==0)return; let k=Object.keys(src);
 for(let i=0;i<k.length;i++){
  let lines=src[k[i]]
  for(let l=0;l<lines.length;l++){
   if(lines[l].indexOf(x)>=0){
    let li=ce("li")
    let sp=ce("span")
    sp.style.color="blue"
    sp.innerText=k[i]+":"+String(1+l)+":"
    let f=k[i]; let ll=l; sp.onclick=function(){fl(f,ll)}
    li.appendChild(sp)
    li.appendChild(document.createTextNode(lines[l]))
    lst.appendChild(li)
   }
  }
 }
}
function cl(x){while(x.firstChild)x.removeChild(x.firstChild)}
function fl(f,l){let y=src[f]
 let x=[]
 for(let i=0;i<y.length;i++){
  x.push( (String(1+i)+":  ").padStart(4) + y[i] )
 }
 edt.value=x.join("\n")
 edt.style.lineHeight="20px"
 edt.scrollTop=20*l
}

grp.onchange=function(e){gr(e.target.value)}
