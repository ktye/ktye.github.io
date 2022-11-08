
function f1(x){return f2(x)}
function f2(x){return 1+undefinedVariable}

ge("jsbutton").onclick=function(e){ f1(f2()) }

ge("kbutton" ).onclick=function(e){
 k("kclick",1).then(r=>ge("output").textContent += "\nresult is\n"+r)
}