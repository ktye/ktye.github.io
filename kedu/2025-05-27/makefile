SHELL=bash
a:?.[ch] makefile
	clang $o -oa ?.c -fno-builtin -funsigned-char -fno-unwind-tables -w -s -nostdlib -mavx512{f,dq,vbmi,vnni,vpopcntdq} -Ofast

