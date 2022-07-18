CFLAGS=	-g -Wall -pedantic -O3
CC=	cc $(CFLAGS)
V=	20200401
R=	20200403

# Compile-time options
# SAFE = disable the .sys() function and the ]i and ]! meta commands
#        (or just run "make kg.safe")
# EDIT = include line editor and history (needs some POSIX functions)
#OPTIONS= -DEDIT

# Modules to load into image file
MODULES=-l nstat -l nplot -l time

all:	kg klong.image

klong.image:	kg
	./kg -n $(MODULES) -o klong.image
	cp klong.image lib

kg:	kg.o s9core.o
	$(CC) -o kg kg.o s9core.o

kg.safe:	kg.c s9core.o
	$(CC) -o kg.safe -DSAFE kg.c s9core.o

kg.o:	kg.c s9core.h s9import.h
	$(CC) $(OPTIONS) -o kg.o -c kg.c

s9core.o:	s9core.c s9core.h s9import.h
	$(CC) -o s9core.o -c s9core.c

kg.wasm:	s9core.c s9core.h wasm.c wasm.h kg.c
	clang -Dwasm -Wfatal-errors -Wno-builtin-requires-header -Oz --target=wasm32 -mbulk-memory --no-standard-libraries -Wl,--export=__heap_base,--export=kginit,--export=rep,--export=load_image_file,--allow-undefined -Wl,--no-entry -o kg.wasm s9core.c wasm.c kg.c

test:	kg test.kg
	./kg -n test.kg

clean:
	rm -f *.o a.out kg klong.image lib/klong.image kg.safe \
	*.core klong$(V).tgz klong$(R).tgz

arc:	clean
	cd ..; tar -cvf - klong | gzip -9c >klong$(V).tgz
	mv -f ../klong$(V).tgz .

version:
	vi kg.c klong-ref.txt CHANGES Makefile

dist:	clean
	cd ..; tar -cvf - `cat klong/_nodist` klong | gzip -9c >klong$(R).tgz
	mv ../klong$(R).tgz .

csums:
	csum -u <_csums >_csums.new
	mv _csums.new _csums

mksums:	clean
	find . -type f | grep -v _csums | grep -v klong2015 | csum >_csums
