# J Makefile for Unix

CC     = gcc
CFLAGS = -O
HDR    = a.h io.h j.h jc.h je.h jt.h p.h v.h x.h
OBJ    = a.o ai.o ap.o au.o  c.o cc.o cf.o cg.o cp.o cr.o ct.o cx.o \
	  f.o i.o io.o j.o k.o m.o  p.o pc.o pv.o \
	  r.o rl.o rt.o  s.o  t.o ta.o  u.o ut.o \
	  v.o ve.o vg.o vi.o vm.o vp.o vs.o vx.o vz.o \
	  w.o  x.o xf.o xl.o xs.o 

j      : $(OBJ) vb.o vh.o
	gcc $(OBJ) vb.o vh.o -lm -lcfix -o j

$(OBJ) : $(HDR)

vh.o   : $(HDR) vh.c
	gcc -c vh.c

vb.o   : $(HDR) vb.o
	gcc -c vb.c
