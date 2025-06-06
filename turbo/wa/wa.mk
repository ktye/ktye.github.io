sed '/o-p-s/q'      wa_js  #head

echo -n "ops={"
awk '$3~/./{printf "%s:%s,",$4,$5;if(++x%16==0)printf("\n")}' tab
echo "}"

sed -n '/o-p-s/,$p' wa_js  #tail
