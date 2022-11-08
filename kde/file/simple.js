
function main(){ console.log("main example running") }
function countup(x){ return 1+x }

//standard js callback
ge("counter").onclick=function(e){
 e.target.textContent=String(countup(+e.target.textContent))
}

//k-callbacks are promises created by k(f,args)
ge("k-button").onclick=function(e){
 let r=k("acc",+ge("num").value).then(r=>ge("k-output").textContent=r).catch(e=>console.log(e))
}
