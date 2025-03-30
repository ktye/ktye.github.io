a:a.[ch] makefile
	clang -Os -oa a.c -mavx2 -mfma -nostdlib -s -funsigned-char -ffast-math -fno-finite-math-only -fno-unwind-tables -Wno-incompatible-pointer-types -Wno-parentheses

#	clang-13 -oa a.c @o -lm
#	clang-13 @o -lm -mavx512f -mavx512vbmi -mavx512vbmi2 #-nostdlib
#	clang-13 -mavx2 -mfma
#	clang-13 -target arm64-apple-macos -fno-stack-protector -fuse-ld=lld

