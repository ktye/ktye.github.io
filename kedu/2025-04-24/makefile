o=-fno-builtin -funsigned-char -fno-unwind-tables -fwritable-strings -Wno-psabi -Wfatal-errors -Wno-multichar -Wno-parentheses -Wno-pointer-type-mismatch -Wno-incompatible-pointer-types

a:?.[ch] makefile
	clang $o -oa [az].c -Ofast -s -nostdlib -mavx512f -mavx512dq -mavx512vbmi -mavx512vnni


