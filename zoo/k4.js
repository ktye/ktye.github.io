let O,K
let k
function ini(left,o){O=o
 let ce=x=>document.createElement(x),ac=(x,y)=>{x.appendChild(y);return y}
 let p=ce("pre");k=ac(p,ce("kbd"));
 ac(p,ce("div"))
 ac(left,p)
 p.style.display="none"
 fetch("./k4/w.js").then(r=>r.text()).then(r=>{
  let f=new Function(r),k=f()
  addEventListener('output',({detail:t})=>O(t))
 })
}
function evl(s){O("\n");let i=k.firstChild;i.value=s;i.onchange();O("q)")}
let k4={ini:ini,evl:evl,src:""}
export{k4}