CC = cc -std=c89
CFLAGS = -O
HEADER = a.h io.h j.h jc.h je.h jt.h lj.h p.h v.h x.h

OBJECT = a.o ai.o ap.o au.o c.o cc.o cf.o cg.o cp.o cr.o ct.o cx.o \
	f.o i.o io.o j.o k.o lj.o m.o p.o pc.o pv.o r.o rt.o s.o \
	t.o u.o ut.o v.o vb.o ve.o vg.o vi.o vm.o vp.o vs.o \
	vz.o w.o x.o xf.o xs.o xw.o

j41: $(OBJECT) vh.o
	$(CC) $(OBJECT) vh.o -lm -o j41.$(MACHINE)

$(OBJECT): $(HEADER)

vh.o: $(HEADER)
	$(CC) $(CFLAGS) -c vh.c

clean:
	rm -f *.o core

strip:
	strip j.mips
	chmod +x j.mips
	ls -l j.mips
