let G=[],gui=(x,y)=>G.push([x,y]),ui=_=>{G.forEach(x=>(x[0]?show:hide)(x[1])),G=[]}
let show=x=>console.log("show",x)
let hide=x=>console.log("hide",x)
