DATE=	20190222

CFLAGS=		-g -O0 -ansi

all:	kl klisp kl.com

kl:	kl.c
	$(CC) $(CFLAGS) -o kl kl.c

kl.wasm: kl.c
	/c/local/LLVM/bin/clang --target=wasm32 -Dwasm -Oz -Wl,--no-entry,--export=init,--export=rep,--export=memory,--allow-undefined -nostdlib kl.c -o klc.wasm
	/c/local/binaryen/wasm-opt -Oz klc.wasm -o kl.wasm

klisp:	kl klsrc
	rm -f klisp && echo "(load 'klsrc) (suspend 'klisp)" | ./kl

kl.com:	kl.t
	t3xz kl

zdist:	kl.com
	mkdir t
	cp kl.com t/KL.COM
	cpmfile klsrc t/KLSRC
	cpmfile kltest t/KLTEST
	cpmfile klisp.txt t/KLISP.TXT
	cpmfile src/eval t/EVAL
	cpmfile src/flat t/FLAT
	cpmfile src/grind t/GRIND
	cpmfile src/guess t/GUESS
	cpmfile src/hanoi t/HANOI
	cpmfile src/letn t/LETN
	cpmfile src/setops t/SETOPS
	cpmfile src/tree t/TREE
	(cd t; lhcx c ../KLISP.LZH *)
	rm -r t

test:	kl klisp
	./kl <kltest >kltest.tmp
	diff kltest.ok kltest.tmp && rm -f kltest.tmp

csums:
	csum -u <_checksums >_checksums.new
	mv -f _checksums.new _checksums

clean:
	rm -f *.o *.a a.out *.core core kl klisp kl.com kltest.tmp klisp.tgz \
		KLISP.LZH

mksums:	clean
	find . -type f | grep -v _checksums | grep -v klisp.tgz \
		| sort | csum -m >_checksums

arc:	clean
	(cd ..; tar cfz klisp.tgz klisp) && mv ../klisp.tgz .

