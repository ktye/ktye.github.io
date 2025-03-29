o=-Ofast -fno-builtin -funsigned-char -fno-unwind-tables -Wno-multichar -Wno-parentheses -Wno-incompatible-pointer-types -Wfatal-errors

a:?.[ch] makefile
	clang $o -oa ?.c -s -nostdlib -mavx512f -mavx512dq -mavx512vbmi

