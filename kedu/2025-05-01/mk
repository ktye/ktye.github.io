a:?.[abc] o mk
	clang @o -oa ?.c -Ofast -nostdlib

#SHELL=bash -static -nostartfiles /usr/lib/x86_64-linux-musl/{crt1.o,libc.a}
# -fpic -shared
#	clang-17 $o -oa ?.c -s -nostdlib -mavx2
#	clang-13 $o -ob ?.c -mavx512f -mavx512dq -mavx512vbmi 
#	clang $o -om ?.c -w -target arm64-apple-macos -fuse-ld=lld -fno-stack-protector 
#%.x:%.c
#	cat $^ >$@   #now make knows how to get file.x from file.c by running cat (=identity)
#a:?.h a.x z.x makefile
#	clang-13 -xc -oa [az].x -w -Ofast -fno-builtin -funsigned-char -fno-stack-protector
#"-xc" is to tell clang that it's c language (bacause extension is different). no need if you want to do say .b -> .c


