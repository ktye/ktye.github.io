sed '/o-p-s/q'      ai_js   #head

echo "let ops={"

awk '/:/{split($2,a,":");printf "%s", $1 ":" length(a[2]) ","; if(++x%16==0)printf("\n")  }' ai.a

echo "}"

sed -n '/o-p-s/,$p' ai_js   #tail
