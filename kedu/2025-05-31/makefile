SHELL=bash
a:?.[ch] makefile;clang $o -oa ?.c -funsigned-char -fno-{builtin,unwind-tables} -w -s -nostdlib -mavx512{f,dq,vbmi,vnni,vpopcntdq} -Ofast

#a:mk v.o [az].[ch];clang -oa v.o -w $f [az].c -s -Oz
#v.o:mk v.[ch];clang -c -w $f v.c -Ofast
