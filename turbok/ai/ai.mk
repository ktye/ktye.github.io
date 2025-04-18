while read res arg op mne xx; do
 if [ ! -z "$op" ]; then
  echo "$mne $res:$arg export $mne"
  echo " get 0"
  n=`echo $arg|wc -c`
  if [ "3" = $n ]; then
   echo " get 1"
  fi
  echo " $mne"
 fi
done < tab
