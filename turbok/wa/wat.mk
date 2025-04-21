# this is just for comparison
# the module is written on the fly by boot.js

echo "(module"
echo "(memory (export \"memory\") 1)"
while read res arg op mne xx; do
 if [ ! -z "$op" ]; then
  name=$mne
  x=""
  if [ $arg != "-" ]; then
   x="(local.get 0)"
  fi
  y=""
  n=`echo $arg|wc -c`
  if [ "3" = $n ]; then
   y="(local.get 1)"
  fi
  if [ "4" = $n ]; then
   y="(local.get 1) (local.get 2)"
  fi
  case $arg in
  ee) arg="(param f32) (param f32)" ;;
  e)  arg="(param f32)"             ;;
  ff) arg="(param f64) (param f64)" ;;
  f)  arg="(param f64)"             ;;
  iii)arg="(param i32) (param i32) (param i32)" ;;
  ii) arg="(param i32) (param i32)" ;;
  i)  arg="(param i32)"             ;;
  jj) arg="(param i64) (param i64)" ;;
  ij) arg="(param i32) (param i64)" ;;
  ie) arg="(param i32) (param f32)" ;;
  if) arg="(param i32) (param f64)" ;;
  j)  arg="(param i64)"             ;;
  -)  arg=""                        ;;
  esac
  res=`echo $res|sed -e 's/i/i32/' -e 's/j/i64/' -e 's/f/f64/' -e 's/e/f32/'`
  r="(result $res)"
  if [ $res = "-" ]; then
   r=""
  fi
  echo "(func \$$name (export \"$name\") $arg $r ($op $x $y))"
 fi
done < tab
echo ")"
