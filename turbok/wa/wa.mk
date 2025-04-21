sed '/o-p-s/q'      ../wa/wa_js     #head

echo "ops={"

while read res arg op mne xx; do
 if [ ! -z "$op" ]; then
  echo "$mne:$xx,"
 fi
done < tab

echo "}"

sed -n '/o-p-s/,$p' ../wa/wa_js     #tail
