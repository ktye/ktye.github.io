/*
 * Kilo LISP, a kilo byte-sized LISP system
 * Nils M Holm, 2019
 * In the public domain
 */

#define MAGIC	"KL21"

#ifndef wasm
 #include <stdlib.h>
 #include <stdio.h>
 #include <string.h>
 #include <ctype.h>
 #include <setjmp.h>
 
 #ifdef __TURBOC__
  #include <io.h>
  #include <dos.h>
  #include <fcntl.h>
  #define BINARY	setmode(fd, O_BINARY)
  #define KBDINT	ctrlbrk(kbbrk); setcbrk(1)
 #else
  #include <signal.h>
  #ifdef COHERENT
   #define O_RDONLY 0
  #else
   #include <unistd.h>
   #include <fcntl.h>
  #endif
  #define BINARY	
  #define KBDINT	signal(SIGINT, kbint)
 #endif
#endif

#ifdef __SUBC__
 #define write	_write
 #define read	_read
 #define open	_open
 #define creat	_creat
 #define close	_close
 #define byte	char
 #define cell	int
 #define CATCH	setjmp(&Restart)
 #define THROW	longjmp(&Restart, 1)
#else
 #define cell	short
 #define byte	unsigned char
 #define CATCH	setjmp(Restart)
 #define THROW	longjmp(Restart, 1)
#endif

#ifdef wasm
 #define BINARY
 #define KBDINT
 #define O_RDONLY 0
 #undef THROW
 #undef CATCH
 #define THROW trap()
 #define CATCH
 int open (char *, int);
 int creat(char *, int);
 int read (int, char*, int);
 int write(int, char*, int);
 void close(int);
 int memcmp(const void *vl, const void *vr, unsigned long n){
	const unsigned char *l=vl, *r=vr;
	for (; n && *l == *r; n--, l++, r++);
	return n ? *l-*r : 0;
 }
 void *memcpy(void *dest, const void *src, unsigned long n) {
	 unsigned char *d = dest;
	 unsigned char *s = src;
	 for (int i=0; i<n; i++) d[i] = s[i];
	 return d;
 }
 int strcmp(const char *l, const char *r) {
	for (; *l==*r && *l; l++, r++);
	return *(unsigned char *)l - *(unsigned char *)r;
 }
 unsigned long strlen(const char *c) {
	 unsigned long i;
	 while(c[i]){i++;}
	 return i;
 }
 #define isalpha(a) (0 ? isalpha(a) : (((unsigned)(a)|32)-'a') < 26)
 #define isdigit(a) (0 ? isdigit(a) : ((unsigned)(a)-'0') < 10)
 void trap();
 #define exit(x)
 #define jmp_buf int
 #define tolower(a) ((a)|0x20)
#endif

#define NNODES	8192

#define SYMLEN	64
#define BUFLEN	128
#define PRDEPTH	128
#define NLOAD	2

#define	ATOM	0x01
#define	MARK	0x02
#define SWAP	0x04

#define NIL	(NNODES+5)
#define EOT	(NNODES+4)
#define DOT	(NNODES+3)
#define RPAREN	(NNODES+2)
#define UNDEF	(NNODES+1)
#define SPCL	NNODES

byte	Tag[NNODES];

cell	Car[NNODES],
	Cdr[NNODES];

int	Freelist;

int	Acc, Env;

int	Stack, Mstack;

int	Tmp, Tmpcar, Tmpcdr;

int	Input, Inp, Ink;
char	*Inbuf, Buffer[BUFLEN];
int	Rejected;

int	Output, Outp;
char	Outbuf[BUFLEN];

int	Symbols;
int	Id;

jmp_buf		Restart;
volatile int	Error;

int	Parens;
int	Loads;

int	Verbose_GC;

int	S_apply, S_if, S_ifnot, S_lambda, S_lamstar, S_macro, S_prog,
	S_quote, S_qquote, S_unquote, S_splice, S_setq;
int	S_t, S_cons, S_car, S_cdr, S_atom, S_eq, S_gensym, S_it,
	S_suspend, S_gc, S_eofp, S_load, S_setcar, S_setcdr, S_read,
	S_prin, S_prin1, S_print, S_error;

int car(int x) { return Car[x]; }
int cdr(int x) { return Cdr[x]; }

void setcar(int x, int v) { Car[x] = v; }
void setcdr(int x, int v) { Cdr[x] = v; }

int atomp(int n) {
	return n >= SPCL || (car(n) < SPCL && (Tag[car(n)] & ATOM));
}

int symbolp(int n) {
	return n < SPCL && car(n) < SPCL && (Tag[car(n)] & ATOM);
}

int caar(int x) { return Car[Car[x]]; }
int cadr(int x) { return Car[Cdr[x]]; }
int cdar(int x) { return Cdr[Car[x]]; }
int cddr(int x) { return Cdr[Cdr[x]]; }

int caadr(int x) { return Car[Car[Cdr[x]]]; }
int cadar(int x) { return Car[Cdr[Car[x]]]; }
int caddr(int x) { return Car[Cdr[Cdr[x]]]; }
int cdadr(int x) { return Cdr[Car[Cdr[x]]]; }
int cddar(int x) { return Cdr[Cdr[Car[x]]]; }

int caddar(int x) { return Car[Cdr[Cdr[Car[x]]]]; }
int cdddar(int x) { return Cdr[Cdr[Cdr[Car[x]]]]; }

void pr(char *s) {
	int	k, n;

	k = strlen(s);
	while (Outp + k >= BUFLEN) {
		if (Outp > 0) {
			n = BUFLEN-Outp;
			memcpy(Outbuf+Outp, s, n);
			write(Output, Outbuf, BUFLEN);
			k -= n;
			s += n;
			Outp = 0;
		}
		else {
			write(Output, s, BUFLEN);
			k -= BUFLEN;
			s += BUFLEN;
		}
	}
	memcpy(Outbuf+Outp, s, k);
	Outp += k;
}

void flush(void) {
	write(Output, Outbuf, Outp);
	Outp = 0;
}

void nl(void) { pr("\n"); flush(); }

char *ntoa(int n) {
	static char	buf[20];
	char		*q, *p;

	p = q = &buf[sizeof(buf)-1];
	*p = 0;
	while (n || p == q) {
		p--;
		*p = n % 10 + '0';
		n = n / 10;
	}
	return p;
}

void prnum(int n) { pr(ntoa(n)); }

void print(int n);

void error(char *m, int n) {
	pr("? ");
	pr(m);
	if (n != UNDEF) {
		pr(": ");
		print(n);
	}
	nl();
	Input = 0;
	Inbuf = Buffer;
	Inp = Ink = 0;
	Rejected = EOT;
	THROW;
}

void fatal(char *m) {
	error(m, UNDEF);
	pr("? aborting");
	nl();
	exit(1);
}

/* Deutsch/Schorr/Waite graph marker */

void mark(int n) {
	int	p, x;

	p = NIL;
	for (;;) {
		if (n >= SPCL || Tag[n] & MARK) {
			if (NIL == p) break;
			if (Tag[p] & SWAP) {
				x = cdr(p);
				setcdr(p, car(p));
				setcar(p, n);
				Tag[p] &= ~SWAP;
				n = x;
			}
			else {
				x = p;
				p = cdr(x);
				setcdr(x, n);
				n = x;
			}
		}
		else if (Tag[n] & ATOM) {
			x = cdr(n);
			setcdr(n, p);
			p = n;
			n = x;
			Tag[p] |= MARK;
		}
		else {
			x = car(n);
			setcar(n, p);
			Tag[n] |= MARK;
			p = n;
			n = x;
			Tag[p] |= SWAP;
		}
	}
}

int gc(int v) {
	int	i, k;

	k = 0;
	mark(Acc);
	mark(Env);
	mark(Symbols);
	mark(Stack);
	mark(Mstack);
	mark(Tmpcar);
	mark(Tmpcdr);
	mark(Tmp);
	Freelist = NIL;
	for (i=0; i<NNODES; i++) {
		if (0 == (Tag[i] & MARK)) {
			setcdr(i, Freelist);
			Freelist = i;
			k++;
		}
		else {
			Tag[i] &= ~MARK;
		}
	}
	if (v || Verbose_GC) {
		prnum(k);
		pr(" nodes reclaimed");
		nl();
	}
	return k;
}

int cons3(int a, int d, int t) {
	int	n;

	if (NIL == Freelist) {
		Tmpcdr = d;
		if (0 == t) Tmpcar = a;
		gc(0);
		Tmpcar = Tmpcdr = NIL;
		if (NIL == Freelist) error("out of nodes", UNDEF);
	}
	n = Freelist;
	Freelist = cdr(Freelist);
	setcar(n, a);
	setcdr(n, d);
	Tag[n] = t;
	return n;
}

int cons(int a, int d) { return cons3(a, d, 0); }

int nrev(int n) {
	int	m, h;

	m = NIL;
	while (n != NIL) {
		h = cdr(n);
		setcdr(n, m);
		m = n;
		n = h;
	}
	return m;
}

void save(int n) { Stack = cons(n, Stack); }

int unsave(int k) {
	int	n;

	while (k) {
		if (NIL == Stack) fatal("stack empty");
		n = car(Stack);
		Stack = cdr(Stack);
		k--;
	}
	return n;
}

void msave(int n) { Mstack = cons3(n, Mstack, ATOM); }

int munsave(void) {
	int	n;

	if (NIL == Mstack) fatal("mstack empty");
	n = car(Mstack);
	Mstack = cdr(Mstack);
	return n;
}

int strsym(char *s) {
	int	i, n;

	i = 0;
	if (0 == s[i]) return NIL;
	save(n = cons3(NIL, NIL, ATOM));
	for (;;) {
		setcar(n, (s[i] << 8) | s[i+1]);
		if (0 == s[i+1] || 0 == s[i+2]) break;
		setcdr(n, cons3(NIL, NIL, ATOM));
		n = cdr(n);
		i += 2;
	}
	n = unsave(1);
	return cons(n, UNDEF);
}

char *symstr(int n) {
	static char	b[SYMLEN+2];
	int		i;

	i = 0;
	n = car(n);
	while (n != NIL) {
		b[i] = car(n) >> 8;
		b[i+1] = car(n) & 0xff;
		i += 2;
		n = cdr(n);
	}
	b[i] = 0;
	return b;
}

int findsym(char *s) {
	int	p;

	p = Symbols;
	while (p != NIL) {
		if (strcmp(s, symstr(car(p))) == 0)
			return car(p);
		p = cdr(p);
	}
	return NIL;
}

int addsym(char *s, int v) {
	int	n;

	n = findsym(s);
	if (n != NIL) return n;
	n = strsym(s);
	save(n);
	if (SPCL == v)
		setcdr(n, cons(n, NIL));
	else
		setcdr(n, cons(v, NIL));
	Symbols = cons(n, Symbols);
	unsave(1);
	return n;
}

int rdch(void) {
	int	c;

	if (Rejected != EOT) {
		c = Rejected;
		Rejected = EOT;
		return c;
	}
	if (Inp >= Ink) {
		Ink = read(Input, Inbuf, BUFLEN);
		if (Ink < 1) return EOT;
		Inp = 0;
	}
	return Inbuf[Inp++];
}

int rdchci(void) {
	int	c;

	c = rdch();
	if (c >= SPCL) return c;
	return tolower(c);
}

int	xread(void);

int rdlist(void) {
	int	n, lst, a, count;
	char	*badpair;

	badpair = "bad pair";
	Parens++;
	lst = cons(NIL, NIL);
	save(lst);
	a = NIL;
	count = 0;
	for (;;) {
		if (Error) return NIL;
		n = xread();
		if (EOT == n) error("missing ')'", UNDEF);
		if (DOT == n) {
			if (count < 1) error(badpair, UNDEF);
			n = xread();
			setcdr(a, n);
			if (RPAREN == n || xread() != RPAREN)
				error(badpair, UNDEF);
			unsave(1);
			Parens--;
			return lst;
		}
		if (RPAREN == n) break;
		if (NIL == a) 
			a = lst;
		else
			a = cdr(a);
		setcar(a, n);
		setcdr(a, cons(NIL, NIL));
		count++;
	}
	Parens--;
	if (a != NIL) setcdr(a, NIL);
	unsave(1);
	return count? lst: NIL;
}

int symbolic(int c) {
	return isalpha(c) || isdigit(c) || '-' == c || '/' == c;
}

int rdsym(int c) {
	char	s[SYMLEN+1];
	int	i;

	i = 0;
	while (symbolic(c)) {
		if ('/' == c) c = rdchci();
		if (SYMLEN == i)
			error("long symbol", UNDEF);
		else if (i < SYMLEN) {
			s[i] = c;
			i++;
		}
		c = rdchci();
	}
	s[i] = 0;
	Rejected = c;
	if (!strcmp(s, "nil")) return NIL;
	return addsym(s, UNDEF);
}

void syntax(int x) { error("syntax", x); }

int quote(int q, int n) { return cons(q, cons(n, NIL)); }

int rdword(void) {
	char	s[2];
	int	n, c;

	s[1] = 0;
	c = rdchci();
	if (!symbolic(c)) syntax(UNDEF);
	save(n = cons(NIL, NIL));
	for (;;) {
		if ('/' == c) c = rdchci();
		s[0] = c;
		setcar(n, addsym(s, UNDEF));
		c = rdchci();
		if (symbolic(c)) {
			setcdr(n, cons(NIL, NIL));
			n = cdr(n);
		}
		else {
			break;
		}
	}
	Rejected = c;
	n = unsave(1);
	return quote(S_quote, n);
}

void type(int x) { error("type", x); }

int xread(void) {
	int	c;

	c = rdchci();
	for (;;) {
		while (' ' == c || '\t' == c || '\n' == c || '\r' == c) {
			if (Error) return NIL;
			c = rdchci();
		}
		if (c != ';') break;
		while (c != '\n') c = rdchci();
	}
	if (EOT == c || '%' == c) return EOT;
	if ('(' == c) {
		return rdlist();
	}
	else if ('\'' == c) {
		return quote(S_quote, xread());
	}
	else if ('@' == c) {
		return quote(S_qquote, xread());
	}
	else if (',' == c) {
		c = rdchci();
		if ('@' == c) return quote(S_splice, xread());
		Rejected = c;
		return quote(S_unquote, xread());
	}
	else if (')' == c) {
		if (!Parens) error("extra paren", UNDEF);
		return RPAREN;
	}
	else if ('.' == c) {
		if (!Parens) error("free dot", UNDEF);
		return DOT;
	}
	else if (symbolic(c)) {
		return rdsym(c);
	}
	else if ('#' == c) {
		return rdword();
	}
	else {
		syntax(UNDEF);
		return UNDEF;
	}
}

void print2(int n, int d) {
	if (d > PRDEPTH) error("print depth", UNDEF);
	if (Error) error("stop", UNDEF);
	if (NIL == n) {
		pr("nil");
	}
	else if (EOT == n) {
		pr("*eot*");
	}
	else if (n >= SPCL || Tag[n] & ATOM) {
		pr("*unprintable*");
	}
	else if (symbolp(n)) {
		pr(symstr(n));
	}
	else {	/* List */
		if (!atomp(n) && S_lamstar == car(n)) {
			pr("*closure*");
			return;
		}
		pr("(");
		while (n != NIL) {
			print2(car(n), d+1);
			n = cdr(n);
			if (symbolp(n)) {
				pr(" . ");
				print2(n, d+1);
				n = NIL;
			}
			else if (n != NIL) {
				pr(" ");
			}
		}
		pr(")");
	}
}

void print(int n) { print2(n, 0); }

int lookup(int x) {
	int	a ,e;

	for (e = Env; e != NIL; e = cdr(e)) {
		for (a = car(e); a != NIL; a = cdr(a)) {
			if (caar(a) == x)
				return cdar(a);
		}
	}
	return cdr(x);
}

int specialp(int n) {
	return	n == S_quote ||
		n == S_if ||
		n == S_prog ||
		n == S_ifnot ||
		n == S_lambda ||
		n == S_lamstar ||
		n == S_apply ||
		n == S_setq ||
		n == S_macro;
}

void check(int x, int k0, int kn) {
	int	i, a;

	i = 0;
	for (a = x; !atomp(a); a = cdr(a))
		i++;
	if (a != NIL || i < k0 || (kn != -1 && i > kn))
		syntax(x);
}

int	eval(int x);

void load(char *s) {
	char	buf[BUFLEN];
	char	*ib;
	int	ip, ik, in, re;

	if (Loads >= NLOAD)
		error("nested load", UNDEF);
	in = Input;
	ip = Inp;
	ik = Ink;
	ib = Inbuf;
	re = Rejected;
	Inbuf = buf;
	Inp = Ink = 0;
	Rejected = EOT;
	Input = open(s, O_RDONLY);
	if (Input < 0) error("load", strsym(s));
	Loads++;
	for (;;) {
		Acc = xread();
		if (EOT == Acc) break;
		eval(Acc);
	}
	Loads--;
	Rejected = re;
	Inbuf = ib;
	Ink = ik;
	Inp = ip;
	Input = in;
}

void dowrite(int fd, void *b, int k) {
	if (write(fd, b, k) != k)
		error("write error", UNDEF);
}

void suspend(char *s) {
	int	fd, k;
	byte	buf[BUFLEN];

	fd = creat(s, 0644);
	BINARY;
	if (fd < 0) error("suspend", strsym(s));
	memcpy(buf, MAGIC, strlen(MAGIC)+1);
	k = strlen(MAGIC)+1;
	buf[k] = (byte) (NNODES >> 8);
	buf[k+1] = (byte) NNODES;
	buf[k+2] = (byte) (Freelist >> 8);
	buf[k+3] = (byte) Freelist;
	buf[k+4] = (byte) (Symbols >> 8);
	buf[k+5] = (byte) Symbols;
	buf[k+6] = (byte) (Id >> 8);
	buf[k+7] = (byte) Id;
	dowrite(fd, buf, k+8);
	dowrite(fd, Car, NNODES * sizeof(cell));
	dowrite(fd, Cdr, NNODES * sizeof(cell));
	dowrite(fd, Tag, NNODES);
	close(fd);
}

void doread(int fd, void *b, int k) {
	if (read(fd, b, k) != k)
		error("read error", UNDEF);
}

void fasload(char *s) {
	int	fd, k, n;
	byte	buf[BUFLEN];
	char	*badimg;

	badimg = "bad image";
	fd = open(s, O_RDONLY);
	BINARY;
	if (fd < 0) return;
	k = strlen(MAGIC)+1;
	doread(fd, buf, k+8);
	n = (buf[k] << 8) | buf[k+1];
	Freelist = (buf[k+2] << 8) | buf[k+3];
	Symbols = (buf[k+4] << 8) | buf[k+5];
	Id = (buf[k+6] << 8) | buf[k+7];
	if (n != NNODES || memcmp(buf, MAGIC, k) != 0)
		error(badimg, UNDEF);
	doread(fd, Car, NNODES * sizeof(cell));
	doread(fd, Cdr, NNODES * sizeof(cell));
	doread(fd, Tag, NNODES);
	if (read(fd, buf, 1) != 0)
		error(badimg, UNDEF);
	close(fd);
}

int builtin(int x) {
	char	*s;

	if (S_car == car(x)) {
		check(x, 2, 2);
		if (atomp(cadr(x))) type(x);
		return caadr(x);
	}
	else if (S_cdr == car(x)) {
		check(x, 2, 2);
		if (atomp(cadr(x))) type(x);
		return cdadr(x);
	}
	else if (S_eq == car(x)) {
		check(x, 3, 3);
		return cadr(x) == caddr(x)? S_t: NIL;
	}
	else if (S_atom == car(x)) {
		check(x, 2, 2);
		return atomp(cadr(x))? S_t: NIL;
	}
	else if (S_cons == car(x)) {
		check(x, 3, 3);
		return cons(cadr(x), caddr(x));
	}
	else if (S_setcar == car(x)) {
		check(x, 3, 3);
		if (atomp(cadr(x))) type(x);
		setcar(cadr(x), caddr(x));
		return cadr(x);
	}
	else if (S_setcdr == car(x)) {
		check(x, 3, 3);
		if (atomp(cadr(x))) type(x);
		setcdr(cadr(x), caddr(x));
		return cadr(x);
	}
	else if (S_gensym == car(x)) {
		check(x, 1, 1);
		s = ntoa(++Id);
		s--;
		*s = 'G';
		return addsym(s, UNDEF);
	}
	else if (S_eofp == car(x)) {
		check(x, 2, 2);
		return EOT == cadr(x)? S_t: NIL;
	}
	else if (S_read == car(x)) {
		check(x, 1, 1);
		return xread();
	}
	else if (S_prin == car(x)) {
		check(x, 2, 2);
		print(cadr(x));
		pr(" ");
		return cadr(x);
	}
	else if (S_prin1 == car(x)) {
		check(x, 2, 2);
		print(cadr(x));
		return cadr(x);
	}
	else if (S_print == car(x)) {
		check(x, 2, 2);
		print(cadr(x));
		nl();
		return cadr(x);
	}
	else if (S_load == car(x)) {
		check(x, 2, 2);
		if (!symbolp(cadr(x))) type(x);
		load(symstr(cadr(x)));
		return S_t;
	}
	else if (S_error == car(x)) {
		check(x, 2, 3);
		if (!symbolp(cadr(x))) type(x);
		if (NIL == cddr(x))
			error(symstr(cadr(x)), UNDEF);
		else
			error(symstr(cadr(x)), caddr(x));
		return UNDEF;
	}
	else if (S_gc == car(x)) {
		check(x, 1, 2);
		if (cdr(x) != NIL) Verbose_GC = cadr(x) != NIL;
		gc(1);
		return NIL;
	}
	else if (S_suspend == car(x)) {
		check(x, 2, 2);
		if (!symbolp(cadr(x))) type(x);
		suspend(symstr(cadr(x)));
		return S_t;
	}
	else {
		syntax(x);
		return UNDEF;
	}
}

void cklam(int x) {
	int	p;

	check(x, 3, -1);
	for (p = cadr(x); !atomp(p); p = cdr(p))
		if (!symbolp(car(p))) syntax(x);
}

enum { MHALT = 0, MEXPR, MLIST, MBETA, MRETN, MAPPL, MPRED, MNOTP,
       MSETQ, MPROG };

int special(int x, int *pm) {
	if (S_quote == car(x)) {
		check(x, 2, 2);
		*pm = munsave();
		return cadr(x);
	}
	else if (S_if == car(x)) {
		check(x, 4, 4);
		msave(MPRED);
		*pm = MEXPR;
		save(cddr(x));
		return cadr(x);
	}
	else if (S_prog == car(x)) {
		*pm = MEXPR;
		if (NIL == cdr(x)) return NIL;
		if (NIL == cddr(x)) return cadr(x);
		msave(MPROG);
		save(cddr(x));
		return cadr(x);
	}
	if (S_ifnot == car(x)) {
		check(x, 3, 3);
		msave(MNOTP);
		*pm = MEXPR;
		save(caddr(x));
		return cadr(x);
	}
	else if (S_lambda == car(x)) {
		cklam(x);
		*pm = munsave();
		return cons(S_lamstar, cons(Env, cdr(x)));
	}
	else if (S_lamstar == car(x)) {
		check(x, 3, -1);
		*pm = munsave();
		return x;
	}
	else if (S_apply == car(x)) {
		check(x, 3, 3);
		msave(MAPPL);
		*pm = MEXPR;
		save(caddr(x));
		save(NIL);
		return cadr(x);
	}
	else if (S_macro == car(x)) {
		check(x, 2, 2);
		if (atomp(cadr(x)) || caadr(x) != S_lambda)
			syntax(x);
		cklam(cadr(x));
		*pm = munsave();
		return cons(S_macro,
			cons(cons(S_lamstar, cons(Env, cdadr(x))),
			     NIL));
	}
	else if (S_setq == car(x)) {
		check(x, 3, 3);
		if (!symbolp(cadr(x))) syntax(x);
		msave(MSETQ);
		*pm = MEXPR;
		save(cadr(x));
		return caddr(x);
	}
	else {
		syntax(x);
		return UNDEF;
	}
}

void bindargs(int v, int a) {
	int	e, n;

	save(e = NIL);
	while (!atomp(v)) {
		if (NIL == a) error("too few args", Acc);
		n = cons(car(v), cons(car(a), NIL));
		e = cons(n, e);
		setcar(Stack, e);
		v = cdr(v);
		a = cdr(a);
	}
	if (symbolp(v)) {
		n = cons(v, cons(a, NIL));
		e = cons(n, e);
		setcar(Stack, e);
	}
	else if (a != NIL) {
		error("extra args", Acc);
	}
	Env = cons(e, Env);
	unsave(1);
}

int funapp(int x) {
	Acc = x;
	if (atomp(car(x)) || caar(x) != S_lamstar)
		syntax(x);
	if (Mstack != NIL && MRETN == car(Mstack)) {
		Env = cadar(Acc);
		bindargs(caddar(Acc), cdr(Acc));
	}
	else {
		save(Env);
		Env = cadar(Acc);
		bindargs(caddar(Acc), cdr(Acc));
		msave(MRETN);
	}
	return cons(S_prog, cdddar(x));
}

int expand(int x) {
	int	n, m, p;

	if (atomp(x)) return x;
	if (S_quote == car(x)) return x;
	n = symbolp(car(x))? car(lookup(car(x))): UNDEF;
	if (!atomp(n) && car(n) == S_macro) {
		m = cons(cdr(x), NIL);
		m = cons(S_quote, m);
		m = cons(m, NIL);
		m = cons(cadr(n), m);
		m = cons(S_apply, m);
		save(m);
		n = eval(m);
		setcar(Stack, n);
		n = expand(n);
		unsave(1);
		return n;
	}
	for (p = x; !atomp(p); p = cdr(p))
		;
	if (symbolp(p)) return x;
	save(x);
	save(n = NIL);
	for (p = x; p != NIL; p = cdr(p)) {
		m = expand(car(p));
		n = cons(m, n);
		setcar(Stack, n);
	}
	n = nrev(unsave(1));
	unsave(1);
	return n;
}

int eval(int x) {
	int	n, m;

	Acc = expand(x);
	msave(MHALT);
	m = MEXPR;
	for (;0 == Error;) {
		switch (m) {
		case MEXPR:
			if (symbolp(Acc)) {
				n = car(lookup(Acc));
				if (UNDEF == n)
					error("undefined", Acc);
				Acc = n;
				m = munsave();
			}
			else if (atomp(Acc)) {
				m = munsave();
			}
			else if (specialp(car(Acc))) {
				m = MBETA;
			}
			else {
				save(cdr(Acc));
				Acc = car(Acc);
				save(NIL);
				msave(MLIST);
			}
			break;
		case MLIST:
			if (NIL == cadr(Stack)) {
				Acc = nrev(cons(Acc, unsave(1)));
				unsave(1);
				m = MBETA;
			}
			else {
				setcar(Stack, cons(Acc, car(Stack)));
				Acc = caadr(Stack);
				setcar(cdr(Stack), cdadr(Stack));
				msave(m);
				m = MEXPR;
			}
			break;
		case MAPPL:
			if (NIL == car(Stack)) {
				setcar(Stack, Acc);
				Acc = cadr(Stack);
				msave(MAPPL);
				m = MEXPR;
			}
			else {
				n = unsave(1);
				unsave(1);
				Acc = cons(n, Acc);
				m = MBETA;
			}
			break;
		case MPRED:
			n = unsave(1);
			if (NIL == Acc)
				Acc = cadr(n);
			else
				Acc = car(n);
			m = MEXPR;
			break;
		case MNOTP:
			n = unsave(1);
			if (NIL == Acc) {
				Acc = n;
				m = MEXPR;
			}
			else {
				m = munsave();
			}
			break;
		case MBETA:
			if (specialp(car(Acc))) {
				Acc = special(Acc, &m);
			}
			else if (symbolp(car(Acc))) {
				Acc = builtin(Acc);
				m = munsave();
			}
			else {
				Acc = funapp(Acc);
				m = MEXPR;
			}
			break;
		case MRETN:
			Env = unsave(1);
			m = munsave();
			break;
		case MSETQ:
			n = unsave(1);
			setcar(lookup(n), Acc);
			Acc = n;
			m = munsave();
			break;
		case MPROG:
			if (NIL == cdar(Stack)) {
				Acc = car(unsave(1));
				m = MEXPR;
			}
			else {
				Acc = caar(Stack);
				setcar(Stack, cdar(Stack));
				msave(MPROG);
				m = MEXPR;
			}
			break;
		case MHALT:
			return Acc;
		}
	}
	return NIL;
}

void init() {
	Verbose_GC = 0;
	Symbols = NIL;
	Tmpcar = NIL;
	Tmpcdr = NIL;
	Tmp = NIL;
	Id = 0;
	Freelist = NIL;
	Input = 0;
	Inbuf = Buffer;
	Inp = Ink = 0;
	Output = 1;
	Outp = 0;
	Rejected = EOT;
	Parens = 0;
	Stack = NIL;
	Mstack = NIL;
	Error = 0;
	Env = NIL;
	S_t = addsym("t", SPCL);
	S_apply = addsym("apply", UNDEF);
	S_if = addsym("if", UNDEF);
	S_ifnot = addsym("ifnot", UNDEF);
	S_lambda = addsym("lambda", UNDEF);
	S_lamstar = addsym("lambda*", UNDEF);
	S_macro = addsym("macro", UNDEF);
	S_prog = addsym("prog", UNDEF);
	S_quote = addsym("quote", UNDEF);
	S_qquote = addsym("qquote", UNDEF);
	S_unquote = addsym("unquote", UNDEF);
	S_splice = addsym("splice", UNDEF);
	S_setq = addsym("setq", UNDEF);
	S_it = addsym("it", UNDEF);
	S_cons = addsym("cons", SPCL);
	S_car = addsym("car", SPCL);
	S_cdr = addsym("cdr", SPCL);
	S_atom = addsym("atom", SPCL);
	S_eq = addsym("eq", SPCL);
	S_eofp = addsym("eofp", SPCL);
	S_setcar = addsym("setcar", SPCL);
	S_setcdr = addsym("setcdr", SPCL);
	S_gensym = addsym("gensym", SPCL);
	S_read = addsym("read", SPCL);
	S_prin = addsym("prin", SPCL);
	S_prin1 = addsym("prin1", SPCL);
	S_print = addsym("print", SPCL);
	S_error = addsym("error", SPCL);
	S_load = addsym("load", SPCL);
	S_gc = addsym("gc", SPCL);
	S_suspend = addsym("suspend", SPCL);
}

void kbint(int x) { Error = 1; }
int kbbrk(void) { return Error = 1; }

#ifdef wasm
void rep() {
	Parens = 0;
	Loads = 0;
	Error = 0;
	Acc = Env = NIL;
	Stack = Mstack = NIL;
	// pr("* ");
	flush();
	Acc = xread();
	if (Error) return;
	if (EOT == Acc) return;
	print(eval(Acc));
	setcar(cdr(S_it), Acc);
	nl();
}
#else
int main(int argc, char **argv) {
	init();
	if (CATCH) exit(1);
	fasload(argc>1? argv[1]: "klisp");
	CATCH;
	KBDINT;
	for (;;) {
		Parens = 0;
		Loads = 0;
		Error = 0;
		Acc = Env = NIL;
		Stack = Mstack = NIL;
		pr("* ");
		flush();
		Acc = xread();
		if (Error) continue;
		if (EOT == Acc) break;
		print(eval(Acc));
		setcar(cdr(S_it), Acc);
		nl();
	}
	nl();
	return 0;
}
#endif
