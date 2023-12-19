s/^func \([a-zA-Z][a-z0-9]*\)(\([a-z][^ ,]*\)\([^{]*\){/func \1(\2\3{P("\1",\2);/
s/^func \([a-zA-Z][a-z0-9]*\)() {/func \1() {P("\1",nil);/
s/SetI32/setI32/g
s/SetI64/setI64/g
s/\([^a-z]\)I32(/\1getI32(/g
s/import (/import ("fmt";"reflect"/
