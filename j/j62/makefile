# J Makefile for Unix
# users at Waterloo will want to link to library -lcfix

CC     = gcc
CFLAGS = -O
HDR    = a.h io.h j.h jc.h je.h js.h jt.h p.h v.h x.h
OBJ    = a.o ai.o ap.o au.o \
	c.o cc.o cd.o cf.o cg.o cp.o cr.o ct.o cx.o \
	f.o i.o io.o j.o k.o   m.o  p.o pc.o pv.o \
	r.o rl.o rt.o s.o t.o ta.o u.o ut.o \
	v.o ve.o vg.o vi.o vm.o vp.o vs.o vx.o vz.o \
	w.o wn.o x.o xa.o xf.o xl.o

OB2    = vh.o vb.o xs.o

j      : $(OBJ) $(OB2)
	$(CC) $(OBJ) $(OB2) -lm -o j
	strip j

$(OBJ) : $(HDR)

$(OB2): $(@:.o=.c) $(HDR)
	$(CC) -c $<

