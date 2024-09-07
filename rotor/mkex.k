/k mkex.k -e
/reshapes file 1234 into 2x2

l:4^"\n"\<`"1234"
j:" "/
a:j'+l 0 1
b:j'+l 2 3

`"2x2"<,/(a,b),'"\n"
