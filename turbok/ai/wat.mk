# this is just for comparison
# the module is written on the fly by boot.js

echo "(module"
echo "(memory (export \"memory\") 1)"
while read res arg op mne xx; do
 if [ ! -z "$op" ]; then
  name=$mne
  y=""
  n=`echo $arg|wc -c`
  if [ "3" = $n ]; then
   y="(local.get 1)"
  fi
  case $arg in
  ee) arg="(param f32) (param f32)" ;;
  e)  arg="(param f32)"             ;;
  ff) arg="(param f64) (param f64)" ;;
  f)  arg="(param f64)"             ;;
  ii) arg="(param i32) (param i32)" ;;
  i)  arg="(param i32)"             ;;
  jj) arg="(param i64) (param i64)" ;;
  j)  arg="(param i64)"             ;;
  esac
  res=`echo $res|sed -e 's/i/i32/' -e 's/j/i64/' -e 's/f/f64/' -e 's/e/f32/'`
  echo "(func \$$name (export \"$name\") $arg (result $res) ($op (local.get 0) $y))"
 fi
done < tab
echo ")"
