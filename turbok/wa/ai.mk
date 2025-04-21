while read res arg op mne xx; do
 if [ ! -z "$op" ]; then
  res=`echo $res|sed 's/-//'`
  arg=`echo $arg|sed 's/-//'`
  echo "$mne $res:$arg export $mne"
  n=`echo $arg|wc -c`
  if [ "2" = $n ]; then
   echo " get 0"
  elif [ "3" = $n ]; then
   echo " get 0"
   echo " get 1"
  elif [ "4" = $n ]; then
   echo " get 0"
   echo " get 1"
   echo " get 2"
  fi
  echo " $mne"
 fi
done < tab
