sed '/o-p-s/q'      ai_js   #head

echo "let ops={"

awk '/:/{split($2,a,":");print $1 ":[" length(a[1]) "," length(a[2]) "]," }' ai.a

echo "}"

sed -n '/o-p-s/,$p' ai_js   #tail
