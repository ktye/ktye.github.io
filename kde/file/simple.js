
function main(){ console.log("main example running") }
function countup(x){ return 1+x }

ge("counter").onclick=function(e){ e.target.textContent=countup(Number(e.target.textContent)) }
