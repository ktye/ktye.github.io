a:[a_].[ch] makefile o
	clang-13 -oa a.c @o -mavx512f -mavx512vbmi 
	clang-13 -oa a.c @o -mavx2 -mfma
	clang-13 -om a.c @o -fno-stack-protector -target arm64-apple-macos -fuse-ld=lld

