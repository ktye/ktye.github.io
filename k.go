package main

import (
	. "github.com/ktye/wg/module"
)

func init() {
	Memory(1)
	Memory2(1)
	Data(132, "\x00\x01@\x01\x01\x01\x01\t\x10`\x01\x01\x01\x01\x01\t\xc4\xc4\xc4\xc4\xc4\xc4\xc4\xc4\xc4\xc4\x01 \x01\x01\x01\x01\x01BBBBBBBBBBBBBBBBBBBBBBBBBB\x10\t`\x01\x01\x00\xc2\xc2\xc2\xc2\xc2\xc2BBBBBBBBBBBBBBBBBBBB\x10\x01`\x01") // k_test.go: TestClass
	Data(228, ":+-*%&|<>=~!,^#_$?@.':/:\\:")
	Data(520, "vbcisfzldtmdplx00BCISFZLDT") //546
	Export(main, Asn, Atx, Cal, cs, dx, Kc, Kf, Ki, kinit, l2, mk, nn, repl, rx, sc, src, Srcp, tp, trap, Val)

	//            0    :    +    -    *    %    &    |    <    >    =10   ~    !    ,    ^    #    _    $    ?    @    .20  '    ':   /    /:   \    \:                  30                       35                       40                       45
	Functions(00, nul, Idy, Flp, Neg, Fst, Sqr, Wer, Rev, Asc, Dsc, Grp, Not, Til, Enl, Srt, Cnt, Flr, Str, Unq, Typ, Val, ech, nyi, rdc, nyi, scn, nyi, lst, Kst, Out, nyi, nyi, Abs, Img, Cnj, Ang, nyi, Uqs, nyi, Cos, Fwh, Las, Exp, Log, Sin, Tok, Prs)
	Functions(64, Asn, Dex, Add, Sub, Mul, Div, Min, Max, Les, Mor, Eql, Mtc, Key, Cat, Cut, Tak, Drp, Cst, Fnd, Atx, Cal, Ech, Whl, Rdc, nyi, Scn, nyi, com, prj, Otu, In, Find, Hyp, Cpx, nyi, Rot, Enc, Dec, nyi, nyi, Bin, Mod, Pow, Lgn, nyi, nyi, Rtp)
	Functions(193, tchr, tnms, tvrb, tpct, tvar, tsym)
	Functions(211, Amd, Dmd)

	Functions(220, negi, negf, negz) //220
	Functions(223, absi, absf, nyi)  //227
	Functions(226, addi, addf, addz) //234
	Functions(229, subi, subf, subz) //245
	Functions(232, muli, mulf, mulz) //256
	Functions(235, divi, divf, divz) //267
	Functions(238, mini, minf, minz) //278
	Functions(241, maxi, maxf, maxz) //289
	Functions(244, modi, sqrf, nyi)  //300

	Functions(247, eqi, eqf, eqz, eqC, eqI, eqI, eqF, eqZ) //308
	Functions(255, lti, ltf, ltz, guC, guI, guI, guF, guZ) //323
	Functions(263, gti, gtf, gtz, gdC, gdI, gdI, gdF, gdZ) //338

	Functions(271, guC, guC, guI, guI, guF, guZ, guL, gdC, gdC, gdI, gdI, gdF, gdZ, gdL) //353

	Functions(285, sum, rd0, prd, rd0, min, max) //367
	Functions(291, sums, rd0, prds, rd0, rd0)    //374
}

// kvm
var IP int32 //instruction pointer
var RS K     //return stack

func exec(x K) K {
	//println("exec>sp", sp)
	//println("exec IP", IP)
	//println("exec#", nn(x), sK(x))
	if nn(x) < 2 {
		dx(x)
		return 0
	}

	rpush(IP)
	rpush(0)
	IP = int32(x)
	for step() != 0 {
	}

	//rpop() //0
	IP = rpop()
	r := pop()

	dx(x)
	//println("st", K(I64(256)))
	//println("exec<sp", sp)
	//println("exec return", sK(r))
	return r
}
func step() int32 {
	var x, a, b, c K
	for {
		x = K(I64(IP)) //fetch instruction
		//fmt.Println("fetch", sK(x))
		if x == 320 {
			//rest()
			//println("retn")
			IP = rpop()
			//println("jmp IP", IP)
			if IP != 0 {
				//println("    IP", IP, ":", sK(K(Lt)<<59|K(IP)))
			}
			if IP == 0 {
				//println("halt")
				return 0 //halt
			}
			continue
		}
		break
	}

	/*
		if tp(x) != 0 {
			println("u", tp(x), sK(x))
		} else {
			println("v", int32(x))
		}
	*/

	if tp(x) != 0 { //noun
		push(rx(x))
		//println("push", sK(x))
	} else {
		v := int32(x)
		//println("v", v, v>>6)
		switch v >> 6 {
		case 0: //monadic
			push(Func[v].(f1)(pop()))
		case 1: //dyadic
			a = pop()
			push(Func[v].(f2)(a, pop()))
		case 2: //dyadic indirect
			a = pop()
			b = pop()
			push(Cal(a, l2(b, pop())))
		case 3: //tetradic
			a = pop()
			b = pop()
			c = pop()
			push(Func[v].(f4)(a, b, c, pop()))
		case 4: // drop
			if v == 256 {
				dx(pop())
			}
			if v == 257 {
				cnd()
			}
		case 5:
			trap(Nyi) //todo RET
		default: //quoted
			push(x - 448)
		}
	}
	IP += 8
	return 1
}
func rpush(x int32) {
	//fmt.Println("rpush #", nn(RS)+1, RS, x)
	RS = cat1(RS, Ki(x))
	/*
		if RS != 10952754293765050768 {
			println("RS push", RS, "relocation")
			panic("RS")
		}
	*/
}
func rpop() int32 {
	//fmt.Println("rpop  #", nn(RS)-1, RS)
	if nn(RS) == 13 {
		panic("rs underflow")
	}
	r := I32(int32(RS) + 4*(nn(RS)-1))

	RS = ndrop(-1, RS)
	/*
		if RS != 10952754293765050768 {
			println("RS pop", RS, "relocation")
			panic("RS")
		}
	*/
	//fmt.Println("rpop ", r, "#", nn(RS))
	return r
}
package main

import (
	. "github.com/ktye/wg/module"
)

type rdf = func(int32, T, int32) K
type scf = func(K, int32, T, int32) K

func ech(x K) K { return l2t(x, 0, df) } // '
func rdc(x K) K { return l2t(x, 2, df) } // /
func scn(x K) K { return l2t(x, 4, df) } // \

func Ech(f, x K) K {
	r := K(0)
	t := tp(f)
	if isfunc(t) == 0 {
		if nn(x) == 2 {
			r = x0(x)
			return lin(r, f, r1(x))
		}
		return Bin(f, Fst(x))
	}
	if nn(x) == 1 {
		x = Fst(x)
	} else {
		return ecn(f, x)
	}
	if tp(x) < 16 {
		trap(Type)
	}
	xt := tp(x)
	if xt == Dt {
		r = x0(x)
		return Key(r, Ech(f, l1(r1(x))))
	}
	if xt == Tt {
		x = explode(x)
	}
	xn := nn(x)
	r = mk(Lt, xn)
	rp := int32(r)
	for i := int32(0); i < xn; i++ {
		SetI64(rp, int64(Atx(rx(f), ati(rx(x), i))))
		rp += 8
	}
	dx(f)
	dx(x)
	return uf(r)
}
func ecn(f, x K) K {
	if nn(x) == 2 {
		r := x0(x)
		x = r1(x)
		if r == 0 {
			return Ech(f, l1(x))
		}
		if tp(f) == 0 && int32(f) == 13 {
			if tp(r) == Tt && tp(x) == Tt { // T,'T (horcat)
				if nn(r) != nn(x) {
					trap(Length)
				}
				f = Cat(x0(r), x0(x))
				return key(f, Cat(r1(r), r1(x)), Tt)
			}
		}
		return ec2(f, r, x)
	}
	return Ech(20, l2(f, Flp(x)))
}
func ec2(f, x, y K) K {
	r := K(0)
	t := dtypes(x, y)
	if t > Lt {
		r = dkeys(x, y)
		return key(r, ec2(f, dvals(x), dvals(y)), t)
	}
	n := conform(x, y)
	switch n {
	case 0: // a-a
		return Cal(f, l2(x, y))
	case 1: // a-v
		n = nn(y)
	case 2: // v-a
		n = nn(x)
	default: // v-v
		n = nn(x)
	}
	r = mk(Lt, n)
	rp := int32(r)
	for i := int32(0); i < n; i++ {
		SetI64(rp, int64(Cal(rx(f), l2(ati(rx(x), i), ati(rx(y), i)))))
		rp += 8
	}
	dx(f)
	dx(x)
	dx(y)
	return uf(r)
}

func Rdc(f, x K) K { // x f/y   (x=0):f/y
	r := K(0)
	t := tp(f)
	if isfunc(t) == 0 {
		if nn(x) == 2 {
			trap(Nyi) // state machine
		}
		x = Fst(x)
		if t&15 == ct {
			return join(f, x)
		} else {
			return Dec(f, x)
		}
	}
	a := arity(f)
	if a != 2 {
		if a > 2 {
			return rdn(f, x, 0)
		} else {
			return fix(f, Fst(x), 0)
		}
	}

	if nn(x) == 2 {
		return Ecr(f, x)
	}
	x = Fst(x)
	xt := tp(x)
	if xt == Dt {
		x = Val(x)
		xt = tp(x)
	}
	if xt < 16 {
		dx(f)
		return x
	}
	xn := nn(x)
	if t == 0 {
		fp := int32(f)
		if fp > 1 && fp < 8 { // sum,prd,min,max (reduce.go)
			if xt == Tt {
				return Ech(rdc(f), l1(Flp(x)))
			}
			r = Func[283+fp].(rdf)(int32(x), xt, xn) //365
			if r != 0 {
				dx(x)
				return r
			}
		}
		if fp == 13 { // ,/
			if xt < Lt {
				return x
			}
			r = ucats(x)
			if r != 0 {
				return r
			}
		}
	}

	if xn == 0 {
		return ov0(f, x)
	}

	i := int32(1)
	x0 := ati(rx(x), 0)
	for i < xn {
		x0 = cal(rx(f), l2(x0, ati(rx(x), i)))
		i++
	}
	dx(x)
	dx(f)
	return x0
}
func rdn(f, x, l K) K { // {x+y*z}/x  {x+y*z}\x
	r := Fst(rx(x))
	x = Flp(ndrop(1, x))
	n := nn(x)
	for i := int32(0); i < n; i++ {
		r = Cal(rx(f), Cat(l1(r), ati(rx(x), i)))
		if l != 0 {
			l = cat1(l, rx(r))
		}
	}
	dx(f)
	dx(x)
	if l != 0 {
		dx(r)
		return uf(l)
	}
	return r
}

func Ecr(f, x K) K { //x f/y
	r := K(0)
	y := x1(x)
	x = r0(x)
	yt := tp(y)
	if yt < 16 {
		return cal(f, l2(x, y))
	}
	if yt > Lt {
		t := dtypes(x, y)
		r = dkeys(x, y)
		return key(r, Ecr(f, l2(dvals(x), dvals(y))), t)
	}
	yn := nn(y)
	r = mk(Lt, yn)
	rp := int32(r)
	for i := int32(0); i < yn; i++ {
		SetI64(rp, int64(cal(rx(f), l2(rx(x), ati(rx(y), i)))))
		rp += 8
	}
	dx(f)
	dx(x)
	dx(y)
	return uf(r)
}
func fix(f, x, l K) K {
	r := K(0)
	y := rx(x)
	for {
		r = Atx(rx(f), rx(x))
		if match(r, x) != 0 {
			break
		}
		if match(r, y) != 0 {
			break
		}
		dx(x)
		x = r
		if l != 0 {
			l = cat1(l, rx(x))
		}
	}
	dx(f)
	dx(r)
	dx(y)
	if l != 0 {
		dx(x)
		return l
	}
	return x
}
func Scn(f, x K) K {
	r := K(0)
	t := tp(f)
	if isfunc(t) == 0 {
		if nn(x) != 1 {
			trap(Rank)
		}
		x = Fst(x)
		if t&15 == ct {
			return split(f, x)
		} else {
			return Enc(f, x)
		}
	}
	a := arity(f)
	if a != 2 {
		if a > 2 {
			return rdn(f, x, mk(Lt, 0))
		} else {
			x = rx(Fst(x))
			return fix(f, x, Enl(x))
		}
	}
	//kdb:if int32(f)==29{trap(Err);}
	if nn(x) == 2 {
		return Ecl(f, x)
	}
	x = Fst(x)
	xt := tp(x)
	if xt < 16 {
		dx(f)
		return x
	}
	xn := nn(x)
	if xn == 0 {
		dx(f)
		return x
	}
	if xt == Dt {
		r = x0(x)
		return Key(r, Scn(f, l1(r1(x))))
	}
	if tp(f) == 0 {
		fp := int32(f)
		if fp == 2 || fp == 4 { // sums,prds (reduce.go)
			if xt == Tt {
				return Flp(Ech(scn(f), l1(Flp(x)))) // +f\'[x;+y]
			}
			r = Func[289+fp].(rdf)(int32(x), xt, xn) //372
			if r != 0 {
				dx(x)
				return r
			}
		}
	}
	r = mk(Lt, xn)
	rp := int32(r)
	i := int32(1)
	z := ati(rx(x), 0)
	SetI64(rp, int64(rx(z)))
	rp += 8
	for i < xn {
		z = cal(rx(f), l2(z, ati(rx(x), i)))
		SetI64(rp, int64(rx(z)))
		rp += 8
		i++
	}
	dx(z)
	dx(x)
	dx(f)
	return uf(r)
}
func Ecl(f, x K) K { // x f\y
	y := x1(x)
	x = r0(x)
	if tp(x) < 16 {
		return cal(f, l2(x, y))
	}
	xn := nn(x)
	r := mk(Lt, xn)
	rp := int32(r)
	for i := int32(0); i < xn; i++ {
		SetI64(rp, int64(cal(rx(f), l2(ati(rx(x), i), rx(y)))))
		rp += 8
	}
	dx(f)
	dx(x)
	dx(y)
	return uf(r)
}

func uf(x K) K {
	rt := T(0)
	xn := nn(x)
	xp := int32(x)
	for i := int32(0); i < xn; i++ {
		t := tp(K(I64(xp)))
		if i == 0 {
			rt = t
		} else if t != rt {
			return x
		}
		xp += 8
	}
	if rt == Dt {
		return ufd(x)
	}
	if rt == 0 || rt > zt {
		return x
	}
	rt += 16
	r := mk(rt, xn)
	s := sz(rt)
	rp := int32(r)
	xp = int32(x)
	switch s >> 2 {
	case 0:
		for i := int32(0); i < xn; i++ {
			SetI8(rp, I32(xp))
			xp += 8
			rp++
		}
	case 1:
		for i := int32(0); i < xn; i++ {
			SetI32(rp, I32(xp))
			xp += 8
			rp += 4
		}
	case 2:
		for i := int32(0); i < xn; i++ {
			SetI64(rp, I64(I32(xp)))
			xp += 8
			rp += 8
		}
	default:
		for i := int32(0); i < xn; i++ {
			s := I32(xp)
			SetI64(rp, I64(s))
			SetI64(rp+8, I64(s+8))
			xp += 8
			rp += 16
		}
	}
	dx(x)
	return r
}
func ufd(x K) K {
	r := Til(x0(x))
	if tp(r) != St {
		dx(r)
		return x
	}
	n := nn(x)
	xp := int32(x)
	for i := int32(0); i < n; i++ {
		if match(r, K(I64(int32(I64(xp))))) == 0 {
			dx(r)
			return x
		}
		xp += 8
	}
	return key(r, Flp(Ech(20, l1(x))), Tt)
}

func ov0(f, x K) K {
	dx(f)
	dx(x)
	return missing(tp(x))
}
package main

import (
	. "github.com/ktye/wg/module"
)

func minit(a, b int32) {
	p := int32(1 << a)
	for i := a; i < b; i++ {
		SetI32(4*i, p)
		SetI32(p, 0)
		p *= 2
	}
	SetI32(128, b)
}
func alloc(n, s int32) int32 {
	size := n * s
	t := bucket(size)
	if int64(n)*int64(s) > 2147483647 /*|| t > 31*/ {
		trap(Grow)
	}
	i := 4 * t
	m := 4 * I32(128)
	for I32(i) == 0 {
		if i >= m {
			m = 4 * grow(i)
		} else {
			i += 4
		}
	}
	a := I32(i)
	SetI32(i, I32(a))
	for j := i - 4; j >= 4*t; j -= 4 {
		u := a + int32(1)<<(j>>2)
		SetI32(u, I32(j))
		SetI32(j, u)
	}
	if a&31 != 0 { // memory corruption
		trap(Unref)
	}
	return a
}
func grow(p int32) int32 {
	m := I32(128)                       // old total memory (log2)
	n := 1 + (p >> 2)                   // required total mem (log2)
	g := (1 << (n - 16)) - Memorysize() // grow by 64k blocks

	if g > 0 {
		if Memorygrow(g) < 0 {
			trap(Grow)
		}
	}
	minit(m, n)
	return n
}
func mfree(x, bs int32) {
	if x&31 != 0 {
		trap(Unref)
	}
	t := 4 * bs
	SetI32(x, I32(t))
	SetI32(t, x)
}
func bucket(size int32) int32 {
	r := int32(32) - I32clz(15+size)
	if r < 5 {
		r = 5
	}
	return r
}
func mk(t T, n int32) K {
	if t < 17 {
		trap(Value)
	}
	r := K(uint64(t) << uint64(59))
	x := alloc(n, sz(t))
	SetI32(x+12, 1) //rc
	SetI32(x+4, n)
	return r | K(x+16)
}
func tp(x K) T     { return T(uint64(x) >> 59) }
func nn(x K) int32 { return I32(int32(x) - 12) }
func ep(x K) int32 { return int32(x) + sz(tp(x))*nn(x) }
func sz(t T) int32 {
	if t < 16 {
		return 8
	} else if t < 19 {
		return 1
	} else if t < 21 {
		return 4
	} else if t == Zt {
		return 16
	}
	return 8
}
func rx(x K) K {
	if tp(x) < 5 {
		return x
	}
	p := int32(x) - 4
	SetI32(p, 1+I32(p))
	return x
}
func dx(x K) {
	t := tp(x)
	if t < 5 {
		return
	}
	p := int32(x) - 16
	rc := I32(p + 12)
	SetI32(p+12, rc-1)
	if rc == 0 {
		trap(Unref)
	}
	if rc == 1 {
		n := nn(x)
		if t&15 > 6 {
			if t == 14 || t == 24 || t == 25 {
				n = 2 // nat | D | T
			} else if t == 12 || t == 13 {
				n = 3 // prj | lam
			}
			p := int32(x)
			for i := int32(0); i < n; i++ {
				dx(K(I64(p)))
				p += 8
			}
		}
		mfree(p, bucket(sz(t)*n))
	}
}
func rl(x K) { // ref list elements
	xp := int32(x)
	xn := nn(x)
	for i := int32(0); i < xn; i++ {
		rx(K(I64(xp)))
		xp += 8
	}
}
func lfree(x K) { // free list non-recursive
	mfree(int32(x)-16, bucket(8*nn(x)))
}
package main

import (
	. "github.com/ktye/wg/module"
)

func Cal(x, y K) K {
	xt := tp(x)
	y = explode(y)
	if isfunc(xt) != 0 {
		return cal(x, y)
	}
	return atdepth(x, y)
}
func isfunc(t T) int32 { return I32B(t == 0 || (t < 16 && t > tt)) }

func cal(f, x K) K {
	r := K(0)
	z := K(0)
	t := tp(f)
	fp := int32(f)
	xn := nn(x)
	if t < df {
		switch xn - 1 {
		case 0:
			x = Fst(x)
		case 1:
			r = x1(x)
			x = r0(x)
		case 2:
			r = x1(x)
			z = x2(x)
			x = r0(x)
		}
	}
	if t != 0 {
		t -= 9
	}
	switch t {
	case 0: // basic
		switch xn - 1 {
		case 0:
			r = Func[int32(f)].(f1)(x)
		case 1:
			r = Func[fp+64].(f2)(x, r)
		case 2:
			r = Func[fp+192].(f4)(x, r, 1, z)
		case 3:
			r = x0(x)
			y := x1(x)
			z = x2(x)
			r = Func[fp+192].(f4)(r, y, z, r3(x))
		default:
			r = trap(Rank)
		}
		r = r
	case 1: // cf
		switch xn - 1 {
		case 0:
			r = calltrain(f, x, 0)
		case 1:
			r = calltrain(f, x, r)
		default:
			r = trap(Rank)
		}
		r = r
	case 2: // df
		d := x0(f)
		a := 85 + int32(I64(fp+8))
		r = Func[a].(f2)(d, x)
	case 3: // pf
		r = callprj(f, x)
	case 4: // lf
		r = lambda(f, x)
	case 5: // xf
		r = native(f, x)
	default:
		r = trap(Type)
	}
	dx(f)
	return r
}

func calltrain(f, x, y K) K {
	r := K(0)
	n := nn(f)
	if y == 0 {
		r = cal(x0(f), l1(x))
	} else {
		r = cal(x0(f), l2(x, y))
	}
	for i := int32(1); i < n; i++ {
		r = cal(x0(f+8), l1(r))
	}
	return r
}
func callprj(f, x K) K {
	n := nn(x)
	fn := nn(f)
	if fn != n {
		if n < fn {
			rx(f)
			return prj(f, x)
		}
		trap(Rank)
	}
	return Cal(x0(f), stv(x1(f), x2(f), x))
}
func native(f K, x K) K {
	fn := nn(f)
	xn := nn(x)
	if xn < fn {
		rx(f)
		return prj(f, x)
	}
	if xn != fn {
		trap(Rank)
	}
	return K(Native(int64(x0(f)), int64(x))) // +/api: KR
}
func lambda(f K, x K) K {
	fn := nn(f)
	xn := nn(x)
	if xn < fn {
		rx(f)
		return prj(f, x)
	}
	if xn != fn {
		trap(Rank)
	}
	fp := int32(f)
	c := K(I64(fp))
	lo := K(I64(fp + 8))
	nl := nn(lo)
	sa := mk(It, 2*nl) //K(I64(fp + 16))
	sp := int32(sa)
	vp := I32(8)
	lp := int32(lo)
	xp := int32(x)
	rl(x)
	dx(x)
	for i := int32(0); i < nl; i++ {
		p := vp + I32(lp)
		SetI64(sp, I64(p))
		if i < fn {
			SetI64(p, I64(xp))
			xp += 8
		} else {
			SetI64(p, 0)
		}
		sp += 8
		lp += 4
	}
	spp, spe := pp, pe
	r := exec(rx(c))
	vp = I32(8)
	sp = int32(sa)
	lp = int32(lo)
	for i := int32(0); i < nl; i++ {
		p := vp + I32(lp)
		dx(K(I64(p)))
		SetI64(p, I64(sp))
		SetI64(sp, 0)
		lp += 4
		sp += 8
	}
	dx(sa)
	pp, pe = spp, spe
	return r
}
func com(x, y K) K { return K(int32(l2(y, x))) | K(cf)<<59 } // compose
func prj(f, x K) K { // project
	r := K(0)
	if isfunc(tp(f)) == 0 {
		return atdepth(f, x)
	}
	xn := nn(x)
	xp := int32(x)
	a := mk(It, 0)
	for i := int32(0); i < xn; i++ {
		if I64(xp) == 0 {
			a = cat1(a, Ki(i))
		}
		xp += 8
	}
	ar := arity(f)
	for i := xn; i < ar; i++ {
		a = cat1(a, Ki(i))
		x = cat1(x, 0)
	}
	an := nn(a)
	if tp(f) == pf { // collapse
		r = x1(f)
		y := x2(f)
		f = r0(f)
		x = stv(r, rx(y), x)
		a = Drp(a, y)
	}
	r = l3(f, x, a)
	SetI32(int32(r)-12, an)
	return K(int32(r)) | K(pf)<<59
}
func arity(f K) int32 {
	t := tp(f)
	if t > df {
		return nn(f)
	}
	return 2
}
package main

import (
	. "github.com/ktye/wg/module"
)

func Cat(x, y K) K {
	xt, yt := tp(x), tp(y)
	if xt == Tt && yt == Dt {
		y, yt = Enl(y), Tt
	}
	if xt&15 == yt&15 {
		if xt < 16 {
			x = Enl(x)
		}
		if yt < 16 {
			return cat1(x, y)
		} else {
			return ucat(x, y)
		}
	} else if xt == Lt && yt < 16 {
		if nn(x) > 0 {
			return cat1(x, y)
		}
	}
	x = uf(Cat(explode(x), explode(y)))
	if nn(x) == 0 {
		dx(x)
		return mk(xt|16, 0)
	}
	return x
}
func Enl(x K) K {
	t := tp(x)
	if t > 0 && t < 7 {
		t += 16
		r := mk(t, 1)
		rp := int32(r)
		xp := int32(x)
		s := sz(t)
		switch s >> 2 {
		case 0:
			SetI8(rp, xp)
		case 1:
			SetI32(rp, xp)
		case 2:
			SetI64(rp, I64(xp))
		case 3:
		case 4:
			SetI64(rp, I64(xp))
			SetI64(rp+8, I64(xp+8))
		}
		dx(x)
		return r
	}
	if t == Dt {
		if tp(K(I64(int32(x)))) == St {
			return Flp(Ech(13, l1(x))) // +,'x
		}
	}
	return l1(x)
}
func explode(x K) K {
	r := K(0)
	xt := tp(x)
	if xt < 16 {
		r = l1(x)
	} else if xt == Dt {
		r = mk(Lt, 1)
		SetI64(int32(r), int64(x))
	} else if xt < Lt {
		xn := nn(x)
		r = mk(Lt, xn)
		if xn == 0 {
			dx(x)
			return r
		}
		xp, rp := int32(x), int32(r)
		e := ep(x)
		switch xt - 18 {
		case 0: //Ct
			for xp < e {
				SetI64(rp, int64(Kc(I8(xp))))
				rp += 8
				xp++
				continue
			}
		case 1: //It
			for xp < e {
				SetI64(rp, int64(Ki(I32(xp))))
				rp += 8
				xp += 4
				continue
			}
		case 2: //St
			for xp < e {
				SetI64(rp, int64(Ks(I32(xp))))
				rp += 8
				xp += 4
				continue
			}
		case 3: //Ft
			for xp < e {
				SetI64(rp, int64(Kf(F64(xp))))
				rp += 8
				xp += 8
				continue
			}
		default: //Zt
			for xp < e {
				SetI64(rp, int64(Kz(F64(xp), F64(xp+8))))
				rp += 8
				xp += 16
				continue
			}
		}
		dx(x)
	} else if xt == Lt {
		r = x
	} else if xt == Tt {
		xn := nn(x)
		k := x0(x)
		x = r1(x)
		r = mk(Lt, xn)
		rp := int32(r)
		x = Flp(x)
		xp := int32(x)
		for i := int32(0); i < xn; i++ {
			SetI64(rp, int64(Key(rx(k), x0(K(xp)))))
			xp += 8
			rp += 8
		}
		dx(x)
		dx(k)
		return r
	}
	return r
}
func flat(x K) K { // ((..);(..)) -> (...)
	r := mk(Lt, 0)
	xn := nn(x)
	xp := int32(x)
	for i := int32(0); i < xn; i++ {
		r = Cat(r, x0(K(xp)))
		xp += 8
	}
	dx(x)
	return r
}
func ucat(x, y K) K { // Bt,Bt .. Lt,Lt
	xt := tp(x)
	if xt > Lt {
		return dcat(x, y)
	}
	xn := nn(x)
	yn := nn(y)
	r := uspc(x, xt, yn)
	s := sz(xt)
	if xt == Lt {
		rl(y)
	}
	Memorycopy(int32(r)+s*xn, int32(y), s*yn)
	dx(y)
	return r
}
func dcat(x, y K) K { // d,d  t,t
	t := tp(x)
	if t == Tt {
		if match(K(I64(int32(x))), K(I64(int32(y)))) == 0 {
			return ucat(explode(x), explode(y))
		}
	}
	r := x0(x)
	x = r1(x)
	q := x0(y)
	y = r1(y)
	if t == Dt {
		r = Cat(r, q)
		return Key(r, Cat(x, y))
	} else {
		dx(q)
		x = Ech(13, l2(x, y))
		return key(r, x, t)
	}
}
func ucats(x K) K { // ,/ unitype-lists
	rt := T(0)
	xn := nn(x)
	if xn == 0 {
		return x
	}
	xp := int32(x)
	rn := int32(0)
	for i := int32(0); i < xn; i++ {
		xi := K(I64(xp))
		t := tp(xi)
		if i == 0 {
			rt = t
		}
		if rt != t || rt < 16 || t > Zt {
			return 0
		}
		rn += nn(xi)
		xp += 8
	}
	r := mk(rt, rn)
	s := sz(rt)
	rp := int32(r)
	xp = int32(x)
	for i := int32(0); i < xn; i++ {
		xi := K(I64(xp))
		rn = s * nn(xi)
		Memorycopy(rp, int32(xi), rn)
		rp += rn
		xp += 8
	}
	dx(x)
	return r
}
func cat1(x, y K) K {
	xt := tp(x)
	xn := nn(x)
	r := uspc(x, xt, 1)
	s := sz(xt)
	rp := int32(r) + s*xn
	yp := int32(y)
	if s == 1 {
		SetI8(rp, yp)
	} else if s == 4 {
		SetI32(rp, yp)
	} else if s == 8 {
		if xt == Ft {
			SetI64(rp, I64(yp))
			dx(y)
		} else {
			SetI64(rp, int64(y))
		}
	} else if s == 16 {
		//F64x2store(rp, F64x2load(yp))
		Memorycopy(rp, yp, 16)
		dx(y)
	}
	return r
}
func uspc(x K, xt T, ny int32) K {
	r := K(0)
	nx := nn(x)
	s := sz(xt)
	if I32(int32(x)-4) == 1 && bucket(s*nx) == bucket(s*(nx+ny)) {
		r = x
	} else {
		r = mk(xt, nx+ny)
		Memorycopy(int32(r), int32(x), s*nx)
		if xt == Lt {
			rl(x)
		}
		dx(x)
	}
	SetI32(int32(r)-12, nx+ny)
	return r
}
func ncat(x, y K) K {
	xt := tp(x)
	if xt < 16 {
		x = Enl(x)
	}
	xt = maxtype(x, y)
	x = uptype(x, xt)
	y = uptype(y, xt)
	return cat1(x, y)
}
package main

/*
import (
	. "github.com/ktye/wg/module"
)

// +266 bytes
func lz(x K) K { // long from zipped (lz4) one block: 11_-8_x
	r := mk(Ct, 0)
	p := int32(x)
	for {
		t := I8(p) //token
		p++
		l := t >> 4 //literal length
		if l == 15 {
			for {
				l += I8(p)
				p++
				if I8(p-1) != 255 {
					break
				}
			}
		}
		r = ucat(r, mk(Ct, l))
		Memorycopy(ep(r)-l, p, l) //literal
		p += l
		if p >= nn(x) {
			dx(x)
			return r
		}

		o := I8(p) | I8(p+1)<<8 //offset
		p += 2
		l = 4 + t&15 //match length
		if l == 19 {
			for {
				l += I8(p)
				p++
				if I8(p-1) != 255 {
					break
				}
			}
		}
		for l != 0 {
			l--
			r = cat1(r, Kc(I8(ep(r)-o)))
			continue
		}
	}
	return 0
}

func Des(x K) K { //deserialize
	pp := int32(x)
	r = des()
	dx(x)
	return r
}
func des() K { //deserialize
	t := I8(pp)
	n := I32(pp+1)
	pp += 1 + 4*I32B(t > 6) //all but atoms followed by len
	r := K(0)
	if t == 0 {
		r = K(I8(p))
	} else if t&15 < 7 {
		if t < 16 {
			t += 16
			r = mk(t, 1)
			n = sz(t)
			Memorycopy(int32(r), n)
			r = Fst(r)
		} else {
			n *= sz(t)
			Memorycopy(int32(r), n)
			r = mk(t, n)
		}
		pp += n
	} else {
		//10(comp) 11(derv) 12(proj) 13(lamb)
		//23(list) 24(dict) 25(table)
		r = mk(L, 0)
		for n != 0 {
			n--
			r = cat1(r, ser())
		}
		r = int32(r) | K(t)<<59
	}
	return r
}
*/
package main

import (
	. "github.com/ktye/wg/module"
)

const ( // iota is not supported by wg
	Err    = int32(0)
	Type   = int32(1)
	Value  = int32(2)
	Index  = int32(3)
	Length = int32(4)
	Rank   = int32(5)
	Parse  = int32(6)
	Stack  = int32(7)
	Grow   = int32(8)
	Unref  = int32(9)
	Io     = int32(10)
	Nyi    = int32(11)
)

func trap(x int32) K {
	s := src()
	//kdb:Trap(p,x,srcp,int64(s))
	//Printf("src %d %d, nn=%d srcp:%d\n", int32(src), int32(src>>32), nn(src), srcp)
	//if srcp < nn(src) {
	if srcp == 0 {
		write(Ku(2608)) // 0\n
	} else {
		a := maxi(srcp-30, 0)
		for i := a; i < srcp; i++ {
			if I8(int32(s)+i) == 10 {
				a = 1 + i
			}
		}
		b := mini(nn(s), srcp+30)
		for i := srcp; i < b; i++ {
			if I8(int32(s)+i) == 10 {
				b = i
				break
			}
		}
		Write(0, 0, int32(s)+a, b-a)
		if srcp > a {
			write(Cat(Kc(10), ntake(srcp-a-1, Kc(32))))
		}
	}
	write(Ku(2654)) // ^\n
	panic(x)
	return 0
}
func Srcp() int32 { return srcp }
package main

import (
	. "github.com/ktye/wg/module"
)

type f1 = func(K) K
type f2 = func(K, K) K
type f3 = func(K, K, K) K
type f4 = func(K, K, K, K) K

func quoted(x K) int32 { return I32B(int32(x) >= 448 && tp(x) == 0) }
func quote(x K) K      { return x + 448 }
func unquote(x K) K    { return x - 448 }

/*
func exec(x K) K {
	srcp = 0
	a := K(0) // accumulator
	b := K(0)
	c := K(0)
	xn := nn(x)
	if xn < 2 { //only `320 // xn == 0 {
		dx(x)
		return 0
	}

	//if I64(ep(x)-8)!=320{panic("exec not terminated")}

	p := int32(x)
	e := p + 8*xn
	//kdb:var arg K
	for p < e {
		u := K(I64(p))
		if tp(u) != 0 {
			push(a)
			a = rx(u)
		} else {

			if int32(u) == 320 { //todo
				break
			}

			switch int32(u) >> 6 {
			case 0: //   0..63   monadic
				//kdb:arg=l1(rx(a))
				//kdb:fpush(u,arg)
				a = Func[marksrc(u)].(f1)(a)
				//kdb:dx(arg);fpop()
			case 1: //  64..127  dyadic
				//kdb:arg=l2(rx(a),rx(K(I64(sp-8))))
				//kdb:fpush(u,arg)
				a = Func[marksrc(u)].(f2)(a, pop())
				//kdb:dx(arg);fpop()
			case 2: // 128       dyadic indirect
				//kdb:arg=l2(rx(K(I64(sp-8))),rx(K(I64(sp-16))))
				marksrc(a)
				//kdb:c:=rx(a)
				//kdb:fpush(c,arg)
				b = pop()
				a = Cal(a, l2(b, pop()))
				//kdb:dx(c);dx(arg);fpop()
			case 3: // 192..255  tetradic
				//kdb:arg=l2(l2(rx(a),rx(K(I64(sp-8)))),l2(rx(K(I64(sp-16))),rx(K(I64(sp-24)))))
				//kdb:fpush(u,arg)
				b = pop()
				c = pop()
				a = Func[marksrc(u)].(f4)(a, b, c, pop())
				//kdb:dx(arg);fpop()
			case 4: // 256       drop
				dx(a)
				a = pop()
			case 5: // 320       jump
				trap(Nyi) //jumps will be removed, 320 will be RET
				//p += int32(a)
				//a = pop()
				//
				//	case 6: // 384       jump if not
				//		trap(Nyi) //jumps will be removed
				//		u = pop()
				//		p += int32(a) * I32B(int32(u) == 0)
				//		dx(u)
				//		a = pop()
				//
			default: //448..     quoted verb
				push(a)
				a = rx(u - 448)
			}
		}
		//vcount: vcount(a)
		p += 8
		continue
	}
	dx(pop())
	dx(x)
	return a
}
*/

//kdb:func fpush(f, x K){}
//kdb:func fpop(){}

func marksrc(x K) int32 {
	if p := 0xffffff & int32(x>>32); p != 0 {
		srcp = p
	}
	return int32(x)
}
func push(x K) {
	SetI64(sp, int64(x))
	sp += 8
	if sp == 512 {
		trap(Stack)
	}
}
func pop() K {
	if sp == 256 {
		println("underflow")
		return 0
	}
	sp -= 8
	return K(I64(sp))
}

/*
func pop() K {
	sp -= 8
	if sp < 256 {
		trap(Stack)
	}
	return K(I64(sp))
}
*/
func lst(n K) K {
	rn := int32(n)
	r := mk(Lt, rn)
	rp := int32(r)
	for i := int32(0); i < rn; i++ {
		SetI64(rp, int64(pop()))
		rp += 8
	}
	return uf(r)
}

//null is a pseudo function. it appears in the parser e.g. on empty list elements. it should should return 0 (as a value, like if it was quoted).
//implemented as a function it pushed back it's argument on the stack.
func nul(x K) K { push(x); return 0 }
func lup(x K) K {
	vp := I32(8) + int32(x)
	r := x0(K(vp))
	return r
}
func Asn(x, y K) K {
	if tp(x) != st {
		trap(Type)
	}
	vp := I32(8) + int32(x)
	dx(K(I64(vp)))
	SetI64(vp, int64(rx(y)))
	return y
}
func Amd(x, i, v, y K) K {
	xt := tp(x)
	if xt == st {
		return Asn(x, Amd(Val(x), i, v, y))
	}
	if xt < 16 {
		trap(Type)
	}
	if tp(i) == Lt { // @[;;v;]/[x;y;i]
		n := nn(i)
		for j := int32(0); j < n; j++ {
			x = Amd(x, ati(rx(i), j), rx(v), ati(rx(y), j))
		}
		dx(i)
		dx(v)
		dx(y)
		return x
	}
	if xt > Lt {
		r := x0(x)
		x = r1(x)
		if xt == Tt && tp(i)&15 == it { // table-assign-rows
			if tp(y) > Lt {
				y = Val(y)
			}
			return key(r, Dmd(x, l2(0, i), v, y), xt)
		}
		r = Unq(Cat(r, rx(i)))
		return key(r, Amd(ntake(nn(r), x), Fnd(rx(r), i), v, y), xt)
	}
	if i == 0 {
		if v == 1 {
			if tp(y) < 16 {
				y = ntake(nn(x), y)
			}
			dx(x)
			return y
		}
		return Cal(v, l2(x, y))
	}
	if tp(v) != 0 || v != 1 {
		y = cal(v, l2(Atx(rx(x), rx(i)), y))
	}
	ti, yt := tp(i), tp(y)
	if xt&15 != yt&15 {
		x, xt = explode(x), Lt
	}
	if ti == it {
		if xt != yt+16 {
			x = explode(x)
		}
		return sti(x, int32(i), y)
	}
	if yt < 16 {
		y = ntake(nn(i), y)
		yt = tp(y)
	}
	if xt == Lt {
		y = explode(y)
	}
	return stv(x, i, y)
}
func Dmd(x, i, v, y K) K {
	if tp(x) == st {
		return Asn(x, Dmd(Val(x), i, v, y))
	}
	i = explode(i)
	f := Fst(rx(i))
	if nn(i) == 1 {
		dx(i)
		return Amd(x, f, v, y)
	}
	if f == 0 {
		f = seq(nn(x))
	}
	i = ndrop(1, i)
	if tp(f) > 16 { // matrix-assign
		n := nn(f)
		if nn(i) != 1 {
			trap(Rank)
		}
		i = Fst(i)
		if tp(f) == It && tp(x) == Tt {
			t := rx(x0(x))
			return key(t, Dmd(r1(x), l2(Fnd(t, i), f), v, y), Tt)
		}
		if tp(f) != It || tp(x) != Lt {
			trap(Nyi) // Dt
		}
		x = use(x)
		for j := int32(0); j < n; j++ {
			rj := int32(x) + 8*I32(int32(f)+4*j)
			SetI64(rj, int64(Amd(K(I64(rj)), rx(i), rx(v), ati(rx(y), j))))
		}
		dx(f)
		dx(i)
		dx(v)
		dx(y)
		return x
	}
	x = rx(x)
	return Amd(x, f, 1, Dmd(Atx(x, f), i, v, y))
}

func Whl(c, b K) K { // while[c;b..]
	r := K(0)
	for {
		p := exec(rx(c))
		dx(p)
		if int32(p) == 0 {
			break
		}
		dx(r)
		r = exec(rx(b))
	}
	dx(c)
	dx(b)
	return r
}

/*
func Cnd(x K) K { // $[x0;x1;x2;..]
	c := K(0)
	n := nn(x) - 1
	i := int32(0)
	for i < n {
		dx(c)
		c = exec(ati(rx(x), i))
		if int32(c) != 0 {
			i++
			break
		}
		i += 2
	}
	dx(c)
	return exec(ati(x, i))
}
*/
func cnd() { // $[x0;x1;x2;..]
	rpush(IP + 8)
	x := pop()
	c := K(0)
	n := nn(x) - 1
	i := int32(0)
	for i < n {
		dx(c)
		c = exec(ati(rx(x), i)) //assume no tail in condition
		if int32(c) != 0 {
			i++
			break
		}
		i += 2
	}
	dx(c)
	x = ati(x, i)
	dx(x)
	IP = int32(x) - 8
}

//vcount: func vcount(x K) {
//vcount: 	i := Cnt(rx(x))
//vcount: 	Printf("vcount %d\n", int32(i))
//vcount: }
package main

import (
	. "github.com/ktye/wg/module"
)

func Fnd(x, y K) K { // x?y
	r := K(0)
	xt, yt := tp(x), tp(y)
	if xt < 16 {
		if yt == Tt {
			return grp(x, y)
		} else {
			return deal(x, y)
		}
	}
	if xt > Lt {
		if xt == Tt {
			trap(Nyi) // t?..
		}
		r = x0(x)
		return Atx(r, Fnd(r1(x), y))
	} else if xt == yt {
		yn := nn(y)
		if xt < Ft && yn > 2 {
			if yn > 4 && xt == Ct || yn > 8 {
				r = fndXs(x, y, xt, yn)
				if r != 0 {
					return r
				}
			}
		}
		r = mk(It, yn)
		rp := int32(r)
		if xt == Lt {
			yp := int32(y)
			for i := int32(0); i < yn; i++ {
				SetI32(rp, fndl(x, x0(K(yp))))
				rp += 4
				yp += 8
			}
		} else {
			for i := int32(0); i < yn; i++ {
				yi := ati(rx(y), i)
				SetI32(rp, fnd(x, yi, xt-16))
				dx(yi)
				rp += 4
			}
		}
	} else if xt == yt+16 {
		r = Ki(fnd(x, y, yt))
	} else if xt == Lt {
		r = Ki(fndl(x, rx(y)))
	} else if yt == Lt {
		return Ecr(18, l2(x, y))
	} else {
		trap(Type)
	}
	dx(x)
	dx(y)
	return r
}
func fnd(x, y K, t T) int32 {
	r := int32(0)
	xn := nn(x)
	if xn == 0 {
		return nai
	}
	xp, yp := int32(x), int32(y)
	xe := ep(x)
	s := int32(0)
	switch t - 2 {
	case 0: // ct
		r = inC(yp, xp, xe) //idxc(yp, xp, xe)
	case 1: // it
		s = 2
		r = inI(yp, xp, xe) //idxi(yp, xp, xe)
	case 2: // st
		s = 2
		r = inI(yp, xp, xe) //idxi(yp, xp, xe)
	case 3: // ft
		s = 3
		r = inF(F64(yp), xp, xe) //idxf(F64(yp), xp, xe)
	default: // zt
		s = 4
		r = inZ(F64(yp), F64(yp+8), xp, xe) //idxz(F64(yp), F64(yp+8), xp, xe)
	}
	if r == 0 {
		return nai
	}
	return (r - xp) >> s
}
func fndXs(x, y K, t T, yn int32) K {
	xn := nn(x)
	a := int32(min(int32(x), t, xn))
	b := 1 + (int32(max(int32(x), t, xn))-a)>>(3*I32B(t == St))
	if b > 256 && b > yn {
		return 0
	}
	if t == St {
		x, y = Div(Flr(x), Ki(8)), Div(Flr(y), Ki(8))
		a >>= 3
	}
	r := ntake(b, Ki(nai))
	rp := int32(r) - 4*a
	x0 := int32(x)
	xp := ep(x)
	if t == Ct {
		for xp > x0 {
			xp--
			SetI32(rp+4*I8(xp), xp-x0)
		}
	} else {
		for xp > x0 {
			xp -= 4
			SetI32(rp+4*I32(xp), (xp-x0)>>2)
		}
	}
	dx(x)
	return Atx(r, Add(Ki(-a), y))
}
func fndl(x, y K) int32 {
	xn := nn(x)
	xp := int32(x)
	dx(y)
	r := int32(0)
	for r < xn {
		if match(K(I64(xp)), y) != 0 {
			return r
		}
		r++
		xp += 8
	}
	return nai
}
func idx(x, a, b int32) int32 {
	for i := a; i < b; i++ {
		if x == I8(i) {
			return i - a
		}
	}
	return -1
}

func Find(x, y K) K { // find[pattern;string] returns all matches (It)
	xt, yt := tp(x), tp(y)
	if xt != yt || xt != Ct {
		trap(Type)
	}
	xn, yn := nn(x), nn(y)
	if xn == 0 || yn == 0 {
		dx(x)
		dx(y)
		return mk(It, 0)
	}
	r := mk(It, 0)
	xp, yp := int32(x), int32(y)
	y0 := yp
	e := yp + yn + 1 - xn
	for yp < e { // todo rabin-karp / knuth-morris / boyes-moore..
		if findat(xp, yp, xn) != 0 {
			r = cat1(r, Ki(yp-y0))
			yp += xn
		} else {
			yp++
		}
		continue
	}
	dx(x)
	dx(y)
	return r
}
func findat(xp, yp, n int32) int32 {
	for i := int32(0); i < n; i++ {
		if I8(xp+i) != I8(yp+i) {
			return 0
		}
		continue
	}
	return 1
}

func Mtc(x, y K) K {
	r := Ki(match(x, y))
	dx(x)
	dx(y)
	return r
}
func match(x, y K) int32 {
	yn := int32(0)
	if x == y {
		return 1
	}
	xt, yt := tp(x), tp(y)
	if xt != yt {
		return 0
	}
	if xt > 16 {
		xn := nn(x)
		yn = nn(y)
		if xn != yn {
			return 0
		}
		if xn == 0 {
			return 1
		}
		xp, yp := int32(x), int32(y)
		e := ep(y)
		switch xt - 18 {
		case 0: // Ct
			return mtC(xp, yp, e)
		case 1: // It
			return mtC(xp, yp, e) //mtI
		case 2: // St
			return mtC(xp, yp, e) //mtI
		case 3: // Ft
			return mtF(xp, yp, e)
		case 4: // Zt
			return mtF(xp, yp, e)
		case 5: // Lt
			for i := int32(0); i < xn; i++ {
				if match(K(I64(xp)), K(I64(yp))) == 0 {
					return 0
				}
				xp += 8
				yp += 8
			}
			return 1
		default: // Dt, Tt
			if match(K(I64(xp)), K(I64(yp))) != 0 {
				return match(K(I64(xp+8)), K(I64(yp+8)))
			}
			return 0
		}
	}
	xp, yp := int32(x), int32(y)
	if xt < ft {
		return I32B(xp == yp)
	}
	switch int32(xt-ft) - 3*I32B(xt > 9) {
	case 0: // ft
		return eqf(F64(xp), F64(yp))
	case 1: // zt
		return eqz(F64(xp), F64(xp+8), F64(yp), F64(yp+8))
	case 2: // composition
		yn = 8 * nn(y)
	case 3: // derived
		yn = 16
	case 4: // projection
		yn = 24
	case 5: // lambda
		return match(K(I64(xp+16)), K(I64(yp+16))) // compare strings
	default: // xf
		return I32B(I64(xp) == I64(yp))
	}
	for yn > 0 { // composition, derived, projection
		yn -= 8
		if match(K(I64(xp+yn)), K(I64(yp+yn))) == 0 {
			return 0
		}
	}
	return 1
}
func mtC(xp, yp, e int32) int32 {
	ve := e &^ 7
	for yp < ve {
		if I64(xp) != I64(yp) {
			return 0
		}
		xp += 8
		yp += 8
	}
	for yp < e {
		if I8(xp) != I8(yp) {
			return 0
		}
		xp++
		yp++
	}
	return 1
}
func mtF(xp, yp, e int32) int32 {
	for yp < e {
		if eqf(F64(xp), F64(yp)) == 0 {
			return 0
		}
		xp += 8
		yp += 8
		continue
	}
	return 1
}
func In(x, y K) K {
	xt, yt := tp(x), tp(y)
	if xt == yt && xt > 16 {
		return Ecl(30, l2(x, y))
	} else if xt+16 != yt {
		trap(Type)
	}
	dx(y)
	return in(x, y, xt)
}
func in(x, y K, xt T) K {
	xp, yp := int32(x), int32(y)
	e := ep(y)
	switch xt - 2 {
	case 0: //ct
		e = inC(xp, yp, e)
	case 1: //it
		e = inI(xp, yp, e)
	case 2: //st
		e = inI(xp, yp, e)
	case 3: //ft
		dx(x)
		e = inF(F64(xp), yp, e)
	default: //zt
		dx(x)
		e = inZ(F64(xp), F64(xp+8), yp, e)
	}
	return Ki(I32B(e != 0))
}
func inC(x, yp, e int32) int32 {
	// maybe splat x to int64
	for yp < e {
		if x == I8(yp) {
			return yp //used in idxc
		}
		yp++
	}
	return 0
}
func inI(x, yp, e int32) int32 {
	for yp < e {
		if x == I32(yp) {
			return yp //used in idxi
		}
		yp += 4
	}
	return 0
}
func inF(x float64, yp int32, e int32) int32 {
	for yp < e {
		if eqf(x, F64(yp)) != 0 {
			return yp
		}
		yp += 8
	}
	return 0
}
func inZ(re, im float64, yp int32, e int32) int32 {
	for yp < e {
		if eqz(re, im, F64(yp), F64(yp+8)) != 0 {
			return yp
		}
		yp += 16
	}
	return 0
}
package main

import (
	. "github.com/ktye/wg/module"
)

func Atx(x, y K) K { // x@y
	r := K(0)
	xt, yt := tp(x), tp(y)
	xp := int32(x)
	if xt < 16 {
		if xt == 0 || xt > tt {
			return cal(x, l1(y))
		}
		if xt == st {
			if xp == 0 {
				if yt == it { // `123 (quoted verb)
					return K(int32(y))
				}
			}
			return cal(Val(sc(cat1(cs(x), Kc('.')))), l1(y))
		}
	}
	if xt > Lt && yt < Lt {
		r = x0(x)
		x = r1(x)
		if xt == Tt {
			if yt&15 == it {
				return key(r, Ecl(19, l2(x, y)), Dt+T(I32B(yt == It)))
			}
		}
		return Atx(x, Fnd(r, y))
	}
	if yt&15 == ft {
		return Rot(x, y)
	}
	if yt < It {
		y = uptype(y, it)
		yt = tp(y)
	}
	if yt == It {
		return atv(x, y)
	}
	if yt == it {
		return ati(x, int32(y))
	}
	if yt == Lt {
		return Ecr(19, l2(x, y))
	}
	if yt == Dt {
		r = x0(y)
		return Key(r, Atx(x, r1(y)))
	}
	return trap(Type) // f@
}
func ati(x K, i int32) K { // x CT..LT
	r := K(0)
	t := tp(x)
	if t < 16 {
		return x
	}
	if t > Lt {
		return Atx(x, Ki(i))
	}
	if i < 0 || i >= nn(x) {
		dx(x)
		return missing(t - 16)
	}
	s := sz(t)
	p := int32(x) + i*s
	switch s >> 2 {
	case 0:
		r = K(uint32(I8(p)))
	case 1:
		r = K(uint32(I32(p)))
	case 2:
		r = K(uint64(I64(p)))
	default:
		dx(x)
		return Kz(F64(p), F64(p+8))
	}
	if t == Ft {
		r = Kf(F64reinterpret_i64(uint64(r)))
	} else if t == Lt {
		r = rx(r)
		dx(x)
		return r
	}
	dx(x)
	return r | K(t-16)<<59
}
func atv(x, y K) K { // x CT..LT
	t := tp(x)
	if t == Tt {
		return Atx(x, y)
	}
	yn := nn(y)
	if t < 16 {
		dx(y)
		return ntake(yn, x)
	}
	xn := nn(x)
	r := mk(t, yn)
	s := sz(t)
	rp := int32(r)
	xp := int32(x)
	yp := int32(y)

	na := missing(t - 16)
	switch s >> 2 {
	case 0:
		for i := int32(0); i < yn; i++ {
			xi := I32(yp)
			if uint32(xi) >= uint32(xn) {
				SetI8(rp, int32(na))
			} else {
				SetI8(rp, I8(xp+xi))
			}
			rp++
			yp += 4
		}
	case 1:
		for i := int32(0); i < yn; i++ {
			xi := I32(yp)
			if uint32(xi) >= uint32(xn) {
				SetI32(rp, int32(na))
			} else {
				SetI32(rp, I32(xp+4*xi))
			}
			rp += 4
			yp += 4
		}
	case 2:
		for i := int32(0); i < yn; i++ {
			xi := I32(yp)
			if uint32(xi) >= uint32(xn) {
				if t == Lt {
					SetI64(rp, int64(na))
				} else {
					SetI64(rp, I64(int32(na)))
				}
			} else {
				SetI64(rp, I64(xp+8*xi))
			}
			rp += 8
			yp += 4
		}
	default:
		for i := int32(0); i < yn; i++ {
			xi := I32(yp)
			if uint32(xi) >= uint32(xn) {
				SetI64(rp, I64(int32(na)))
				SetI64(rp+8, I64(int32(na)))
			} else {
				xi *= 16
				SetI64(rp, I64(xp+xi))
				SetI64(rp+8, I64(8+xp+xi))
			}
			rp += 16
			yp += 4
		}
	}
	if t == Lt {
		rl(r)
		r = uf(r)
	}
	dx(na)
	dx(x)
	dx(y)
	return r
}
func stv(x, i, y K) K {
	if It != tp(i) {
		trap(Type)
	}
	n := nn(i)
	if n == 0 {
		dx(y)
		dx(i)
		return x
	}
	if n != nn(y) {
		trap(Length)
	}
	x = use(x)
	xt := tp(x)
	xn := nn(x)
	s := sz(xt)
	xp := int32(x)
	yp := int32(y)
	ip := int32(i)
	for j := int32(0); j < n; j++ {
		xi := uint32(I32(ip + 4*j))
		if xi >= uint32(xn) {
			trap(Index)
		}
	}
	switch s >> 2 {
	case 0:
		for j := int32(0); j < n; j++ {
			SetI8(xp+I32(ip), I8(yp))
			ip += 4
			yp++
		}
	case 1:
		for j := int32(0); j < n; j++ {
			SetI32(xp+4*I32(ip), I32(yp))
			ip += 4
			yp += 4
		}
	case 2:
		if xt == Lt {
			rl(y)
			for j := int32(0); j < n; j++ {
				dx(K(I64(xp + 8*I32(ip))))
				ip += 4
			}
			ip = int32(i)
		}
		for j := int32(0); j < n; j++ {
			SetI64(xp+8*I32(ip), I64(yp))
			ip += 4
			yp += 8
		}
		if xt == Lt {
			x = uf(x)
		}
	default:
		for j := int32(0); j < n; j++ {
			xp = int32(x) + 16*I32(ip)
			SetI64(xp, I64(yp))
			SetI64(xp+8, I64(yp+8))
			ip += 4
			yp += 16
		}
	}
	dx(i)
	dx(y)
	return x
}
func sti(x K, i int32, y K) K {
	x = use(x)
	xt := tp(x)
	//if xt < Lt && yt != xt-16 {
	//	trap(Type)
	//}
	xn := nn(x)
	if i < 0 || i >= xn {
		trap(Index)
	}
	s := sz(xt)
	xp := int32(x)
	yp := int32(y)
	switch s >> 2 {
	case 0:
		SetI8(xp+i, yp)
	case 1:
		SetI32(xp+4*i, yp)
	case 2:
		xp += 8 * i
		if xt == Lt {
			dx(K(I64(xp)))
			SetI64(xp, int64(rx(y)))
			x = uf(x)
		} else {
			SetI64(xp, I64(yp))
		}
	default:
		xp += 16 * i
		SetI64(xp, I64(yp))
		SetI64(xp+8, I64(yp+8))
	}
	dx(y)
	return x
}

func atdepth(x, y K) K {
	xt := tp(x)
	if xt < 16 {
		trap(Type)
	}
	f := Fst(rx(y))
	if f == 0 {
		f = seq(nn(x))
	}
	x = Atx(x, f)
	if nn(y) == 1 {
		dx(y)
		return x
	}
	y = ndrop(1, y)
	if tp(f) > 16 {
		if nn(y) == 1 && xt == Tt {
			return Atx(x, Fst(y))
		}
		return Ecl(20, l2(x, y))
	}
	return atdepth(x, y)
}
package main

import (
	. "github.com/ktye/wg/module"
)

const nai int32 = -2147483648 // 0N
var loc, xyz K
var na, inf float64
var pp, pe, sp, ary, srcp, rand_ int32 //parse or execution position/end, stack position, src pointer

//   0....7  key
//   8...15  val
//  16...19
//  20..127  free list
// 128..131  memsize log2
// 132..227  char map (starts at 100)
// 228..253  verbs :+-*%!&|<>=~,^#_$?@.':/:\:
// 256..511  stack
// 512..519  wasi iovec
// 520..545  "vbcisfzldtcdpl000BCISFZLDT"
// 552..559  src (aligned)

func kinit() {
	minit(12, 16) //4k..64k
	sp = 256
	SetI64(552, int64(mk(Ct, 0))) //src
	loc = 0
	ary = 0
	na = F64reinterpret_i64(uint64(0x7FF8000000000001))
	inf = F64reinterpret_i64(uint64(0x7FF0000000000000))
	rand_ = 1592653589
	SetI64(0, int64(mk(Lt, 0)))
	SetI64(8, int64(mk(Lt, 0)))
	sc(Ku(0))        // `   0
	x := sc(Ku(120)) // `x  8
	y := sc(Ku(121)) // `y 16
	z := sc(Ku(122)) // `z 24
	xyz = cat1(Cat(x, y), z)

	RS = Wer(Ki(13)) //or maybe &5 or &13
	push(0)          //this used to be acc (now sp is 264)

	zk()
}

type K uint64
type T int32

// typeof(x K): t=x>>59
// isatom:      t<16
// isvector:    t>16
// isflat:      t<22
// basetype:    t&15  0..9
// istagged:    t<5
// haspointers: t>5   (recursive unref)
// elementsize: $[t<19;1;t<21;4;8]
const ( //base t&15          bytes  atom  vector
	ct T = 2 // char    1      2     18
	it T = 3 // int     4      3     19
	st T = 4 // symbol  4      4     20
	ft T = 5 // float   8      5     21
	zt T = 6 // complex(8)     6     22

	dt T = 8  // dict   (8)           24
	tt T = 9  // table  (8)           25
	cf T = 10 // comp   (8)    10
	df T = 11 // derived(8)    11
	pf T = 12 // proj   (8)    12
	lf T = 13 // lambda (8)    13
	xf T = 14 // native (8)    14
	Ct T = 18
	It T = 19
	St T = 20
	Ft T = 21
	Zt T = 22
	Lt T = 23 // list
	Dt T = 24 // dict
	Tt T = 25 // table
)

// func t=0
// basic x < 64 (triadic/tetradic)
// composition .. f2 f1 f0
// derived     func    symb
// projection  func    arglist  emptylist
// lambda      code    locals   string
// native      ptr(Ct) string

// ptr: int32(x)
//  p-12    p-4 p
// [length][rc][data]

func Kc(x int32) K { return K(uint32(x)) | K(ct)<<59 }
func Ki(x int32) K { return K(uint32(x)) | K(it)<<59 }
func Ks(x int32) K { return K(uint32(x)) | K(st)<<59 }
func Kf(x float64) K {
	r := mk(Ft, 1)
	SetF64(int32(r), x)
	return K(int32(r)) | K(ft)<<59
}
func Kz(x, y float64) K {
	r := mk(Zt, 1)
	rp := int32(r)
	SetF64(rp, x)
	SetF64(rp+8, y)
	return K(rp) | K(zt)<<59
}
func l1(x K) K {
	r := mk(Lt, 1)
	SetI64(int32(r), int64(x))
	return r
}
func l2t(x, y K, t T) K {
	r := mk(Lt, 2)
	SetI64(int32(r), int64(x))
	SetI64(8+int32(r), int64(y))
	return K(uint32(r)) | K(t)<<59
}
func l2(x, y K) K    { return l2t(x, y, Lt) }
func l3(x, y, z K) K { return cat1(l2(x, y), z) }
func r0(x K) K       { r := x0(x); dx(x); return r }
func r1(x K) K       { r := x1(x); dx(x); return r }
func r3(x K) K       { r := x3(x); dx(x); return r }
func x0(x K) K       { return rx(K(I64(int32(x)))) }
func x1(x K) K       { return x0(x + 8) }
func x2(x K) K       { return x0(x + 16) }
func x3(x K) K       { return x0(x + 24) }
func Ku(x uint64) K { // Ct
	r := mk(Ct, 0)
	p := int32(r)
	for x != 0 {
		SetI8(p, int32(x))
		x >>= uint64(8)
		p++
	}
	SetI32(int32(r)-12, p-int32(r))
	return r
}
func kx(u int32, x K) K     { return cal(Val(Ks(u)), l1(x)) }
func kxy(u int32, x, y K) K { return cal(Val(Ks(u)), l2(x, y)) }

/* encode bytes with: https://play.golang.org/p/4ethx6OEVCR
func enc(x []byte) uint64 {
	r := uint32(0)
	var o uint64 = 1
	for _, b := range x {
		r += o * uint64(b)
		o <<= 8
	}
	return r
}
*/

func sc(c K) K {
	s := K(I64(0))
	sp := int32(s)
	sn := nn(s)
	for i := int32(0); i < sn; i++ {
		if match(c, K(I64(sp))) != 0 {
			dx(c)
			return K(sp-int32(s)) | K(st)<<59
		}
		sp += 8
	}
	SetI64(0, int64(cat1(s, c)))
	SetI64(8, int64(cat1(K(I64(8)), 0)))
	return K(8*sn) | K(st)<<59
}
func cs(x K) K { return x0(K(I32(0)) + x) }
func td(x K) K { // table from dict
	r := x0(x)
	x = r1(x)
	if tp(r) != St || tp(x) != Lt {
		trap(Type)
	}
	m := maxcount(int32(x), nn(x))
	x = Ech(15, l2(Ki(m), x)) // (|/#'x)#'x
	r = l2(r, x)
	SetI32(int32(r)-12, m)
	return K(int32(r)) | K(Tt)<<59
}
func missing(t T) K {
	switch t - 2 {
	case 0: // ct
		return Kc(32)
	case 1: // it
		return Ki(nai)
	case 2: // st
		return Ks(0)
	case 3: // ft
		return Kf(na)
	case 4: // zt
		return Kz(na, na)
	default: // lt
		return mk(Ct, 0) //Kb(0)
	}
}
package main

import (
	. "github.com/ktye/wg/module"
)

// softfloat implementation of cosin_ atan2 log exp pow frexp is 2464 b

const pi float64 = 3.141592653589793
const maxfloat float64 = 1.797693134862315708145274237317043567981e+308

func hypot(p, q float64) float64 {
	p, q = F64abs(p), F64abs(q)
	if p < q {
		t := p
		p = q
		q = t
	}
	if p == 0.0 {
		return 0.0
	}
	q = q / p
	return p * F64sqrt(1+q*q)
}
func cosin(deg float64, rp int32) {
	c, s := 0.0, 0.0
	if deg == 0 {
		c = 1.0
	} else if deg == 90 {
		s = 1.0
	} else if deg == 180 {
		c = -1.0
	} else if deg == 270 {
		s = -1.0
	} else {
		cosin_(deg*0.017453292519943295, rp, 0)
		return
	}
	SetF64(rp, c)
	SetF64(rp+8, s)
}
func ang2(y, x float64) float64 {
	if y == 0 {
		if x < 0 {
			return 180.0
		}
		return 0.
	}
	if x == 0 {
		if y < 0 {
			return 270.0
		}
		return 90.0
	}
	deg := 57.29577951308232 * atan2(y, x)
	if deg < 0 {
		deg += 360.0
	}
	return deg
}
func cosin_(x float64, rp int32, csonly int32) {
	c, s, ss, cs := 0.0, 0.0, int32(0), int32(0)
	if x < 0 {
		x = -x
		ss = 1
	}
	j := int64(x * 1.2732395447351628) // *4/pi
	y := float64(j)
	if j&1 == 1 {
		j++
		y++
	}
	j &= 7
	z := ((x - y*7.85398125648498535156e-1) - y*3.77489470793079817668e-8) - y*2.69515142907905952645e-15
	if j > 3 {
		j -= 4
		//ss, cs = !ss, !cs
		ss, cs = 1-ss, 1-cs
	}
	if j > 1 {
		cs = 1 - cs
	}
	zz := z * z
	c = 1.0 - 0.5*zz + zz*zz*((((((-1.13585365213876817300e-11*zz)+2.08757008419747316778e-9)*zz+-2.75573141792967388112e-7)*zz+2.48015872888517045348e-5)*zz+-1.38888888888730564116e-3)*zz+4.16666666666665929218e-2)
	s = z + z*zz*((((((1.58962301576546568060e-10*zz)+-2.50507477628578072866e-8)*zz+2.75573136213857245213e-6)*zz+-1.98412698295895385996e-4)*zz+8.33333333332211858878e-3)*zz+-1.66666666666666307295e-1)
	if j == 1 || j == 2 {
		x = c
		c = s
		s = x
	}
	if cs != 0 {
		c = -c
	}
	if ss != 0 {
		s = -s
	}
	SetF64(rp, c)
	if csonly == 0 {
		SetF64(rp+8, s)
	} else if csonly == 1 {
		SetF64(rp, s)
	}
}
func atan2(y, x float64) float64 {
	// todo nan/inf
	q := atan(y / x)
	if x < 0 {
		if q <= 0 {
			return q + pi
		}
		return q - pi
	}
	return q
}
func atan(x float64) float64 {
	//if x == 0 {
	//	return x
	//}
	if x > 0 {
		return satan(x)
	} else {
		return -satan(-x)
	}
}
func satan(x float64) float64 {
	if x <= 0.66 {
		return xatan(x)
	}
	if x > 2.41421356237309504880 {
		return 1.5707963267948966 - xatan(1.0/x) + 6.123233995736765886130e-17
	}
	return 0.7853981633974483 + xatan((x-1)/(x+1)) + 0.5*6.123233995736765886130e-17
}
func xatan(x float64) float64 {
	z := x * x
	z = z * ((((-8.750608600031904122785e-01*z+-1.615753718733365076637e+01)*z+-7.500855792314704667340e+01)*z+-1.228866684490136173410e+02)*z + -6.485021904942025371773e+01) / (((((z+2.485846490142306297962e+01)*z+1.650270098316988542046e+02)*z+4.328810604912902668951e+02)*z+4.853903996359136964868e+02)*z + 1.945506571482613964425e+02)
	z = x*z + x
	return z
}
func exp(x float64) float64 {
	k := int64(0)
	if x != x {
		return x
	}
	if x > 7.09782712893383973096e+02 {
		return inf
	}
	if x < -7.45133219101941108420e+02 {
		return 0.0
	}
	if -3.725290298461914e-09 < x && x < 3.725290298461914e-09 {
		return 1.0 + x
	}
	if x < 0 {
		k = int64(1.44269504088896338700*x - 0.5)
	} else {
		k = int64(1.44269504088896338700*x + 0.5)
	}
	hi := x - float64(k)*6.93147180369123816490e-01
	lo := float64(k) * 1.90821492927058770002e-10
	return expmulti(hi, lo, k)
}
func expmulti(hi, lo float64, k int64) float64 {
	r := hi - lo
	t := r * r
	c := r - t*(1.66666666666666657415e-01+t*(-2.77777777770155933842e-03+t*(6.61375632143793436117e-05+t*(-1.65339022054652515390e-06+t*4.13813679705723846039e-08))))
	y := 1 - ((lo - (r*c)/(2-c)) - hi)
	return ldexp(y, k)
}
func ldexp(frac float64, exp int64) float64 {
	if frac == 0 || frac > maxfloat || frac < -maxfloat || (frac != frac) {
		return frac
	}
	nf := normalize(frac)
	if nf != frac {
		exp -= 52
		frac = nf
	}
	x := uint64(I64reinterpret_f64(frac))
	exp += int64(x>>52)&2047 - 1023
	if exp < int64(-1075) {
		return F64copysign(0, frac)
	}
	if exp > int64(1023) {
		if frac < 0 {
			return -inf
		}
		return inf
	}
	m := 1.0
	if exp < int64(-1022) {
		exp += 53
		m = 1.1102230246251565e-16
	}
	x &^= 9218868437227405312
	x |= uint64(exp+1023) << 52
	return m * F64reinterpret_i64(uint64(x))
}
func frexp1(f float64) int32 {
	if f == 0.0 {
		return 0
	}
	if f < -maxfloat || f > maxfloat || (f != f) {
		return 0
	}
	return 1
}
func frexp2(f float64) float64 {
	f = normalize(f)
	x := I64reinterpret_f64(f)
	x &^= 9218868437227405312
	x |= 4602678819172646912
	return F64reinterpret_i64(x)
}
func frexp3(f float64) int64 {
	exp := int64(0)
	nf := normalize(f)
	if nf != f {
		exp = int64(-52)
		f = nf
	}
	x := I64reinterpret_f64(f)
	return exp + int64((x>>52)&2047) - 1022
}

/*
	func frexp(f float64) (float64, int64) {
		var exp int64
		if f == 0.0 {
			return f, 0
		}
		if f < -maxfloat || f > maxfloat || (f != f) {
			return f, 0
		}
		nf := normalize(f)
		if nf != f {
			exp = -52
			f = nf
		}
		x := I64reinterpret_f64(f)
		exp += int64((x>>52)&2047) - 1022
		x &^= 9218868437227405312
		x |= 4602678819172646912
		return F64reinterpret_i64(x), exp
	}
*/
func normalize(x float64) float64 {
	if F64abs(x) < 2.2250738585072014e-308 {
		return x * 4.503599627370496e+15
	}
	return x
}
func log(x float64) float64 {
	if (x != x) || x > maxfloat {
		return x
	}
	if x < 0 {
		return na
	}
	if x == 0 {
		return -inf
	}
	f1 := x
	ki := int64(0)
	if frexp1(x) != 0 {
		f1 = frexp2(x)
		ki = frexp3(x)
	}
	if f1 < 0.7071067811865476 {
		f1 *= 2
		ki--
	}
	f := f1 - 1
	k := float64(ki)
	s := f / (2 + f)
	s2 := s * s
	s4 := s2 * s2
	t1 := s2 * (6.666666666666735130e-01 + s4*(2.857142874366239149e-01+s4*(1.818357216161805012e-01+s4*1.479819860511658591e-01)))
	t2 := s4 * (3.999999999940941908e-01 + s4*(2.222219843214978396e-01+s4*1.531383769920937332e-01))
	R := t1 + t2
	hfsq := 0.5 * f * f
	return k*6.93147180369123816490e-01 - ((hfsq - (s*(hfsq+R) + k*1.90821492927058770002e-10)) - f)
}
func modabsfi(f float64) float64 {
	if f < 1.0 {
		// simplified for f > 0
		return 0
	}
	x := I64reinterpret_f64(f)
	e := (x>>52)&2047 - 1023
	if e < 52 {
		x &^= uint64(1)<<(52-e) - uint64(1)
	}
	return F64reinterpret_i64(x)
}
func pow(x, y float64) float64 {
	if y == 0.0 || x == 1.0 {
		return 1.0
	}
	if y == 1.0 {
		return x
	}
	if (x != x) || (y != y) || y > maxfloat || y < -maxfloat { // simplified
		return na
	}
	if x == 0 { // simplified
		if y < 0 {
			return inf
		} else {
			return 0.0
		}
	}
	if y == 0.5 {
		return F64sqrt(x)
	}
	if y == -0.5 {
		return 1.0 / F64sqrt(x)
	}

	yf := F64abs(y)
	yi := modabsfi(yf)
	yf -= yi
	if yf != 0.0 && x < 0.0 {
		return na
	}
	if yi >= 9.223372036854776e+18 {
		if x == -1.0 {
			return 1.0
		} else if (F64abs(x) < 1.0) == (y > 0.0) {
			return 0.0
		} else {
			return inf
		}
	}
	a1 := 1.0
	ae := int64(0)
	if yf != 0 {
		if yf > 0.5 {
			yf -= 1.0
			yi += 1.0
		}
		a1 = exp(yf * log(x))
	}
	x1 := x
	xe := int64(0)
	if frexp1(x) != 0 {
		x1 = frexp2(x)
		xe = frexp3(x)
	}
	for i := int64(yi); i != 0; i >>= int64(1) {
		if xe < int64(-4096) || 4096 < xe {
			ae += xe
			break
		}
		if i&1 == 1 {
			a1 *= x1
			ae += xe
		}
		x1 *= x1
		xe <<= int64(1)
		if x1 < 0.5 {
			x1 += x1
			xe--
		}
	}
	if y < 0.0 {
		a1 = 1.0 / a1
		ae = -ae
	}
	return ldexp(a1, ae)
}
func ipow(x K, y int32) K {
	if tp(x) == It {
		n := nn(x)
		r := mk(It, n)
		rp := int32(r)
		xp := int32(x)
		e := rp + 4*n
		for rp < e {
			SetI32(rp, iipow(I32(xp), y))
			xp += 4
			rp += 4
		}
		dx(x)
		return r
	} else {
		return Ki(iipow(int32(x), y))
	}
}
func iipow(x, y int32) int32 {
	r := int32(1)
	for {
		if y&1 == 1 {
			r *= x
		}
		y >>= 1
		if y == 0 {
			break
		}
		x *= x
	}
	return r
}
package main

import (
	. "github.com/ktye/wg/module"
)

var ps int32

func Prs(x K) K { return parse(Tok(x)) } // `p"src"  `p(token list)
func parse(x K) K {
	if tp(x) != Lt {
		trap(Type)
	}
	pp = int32(x)
	pe = pp + 8*nn(x)
	r := es()
	if pp != pe {
		trap(Parse)
	}
	lfree(x)
	return cat1(r, 320)
}
func es() K {
	r := mk(Lt, 0)
	for {
		n := next()
		if n == 0 {
			break
		}
		if n == 59 {
			continue
		}
		pp -= 8
		x := e(t()) &^ 1
		if x == 0 {
			break
		}
		if nn(r) != 0 {
			r = cat1(r, 256) // drop
		}
		r = Cat(r, x)
	}
	return r
}
func e(x K) K { // Lt
	r := K(0)
	xv := x & 1
	x &^= 1
	if x == 0 {
		return 0
	}
	xs := ps
	y := t()
	yv := y & 1
	y &^= 1
	if y == 0 {
		return x + xv
	}
	if yv != 0 && xv == 0 {
		r = e(t())
		ev := r & 1
		r &^= 1
		a := pasn(x, y, r)
		if a != 0 {
			return a
		}
		if r == 0 || ev == 1 { // 1+ (projection)
			x = cat1(ucat(cat1(cat1(ucat(l1(0), x), Ki(2)), 27), y), 92)
			if ev == 1 { // 1+-
				return cat1(ucat(r, x), 91) + 1
			}
			return x + 1
		}
		return dyadic(ucat(r, x), y) // dyadic
	}
	r = e(rx(y) + yv)
	ev := r & 1
	r &^= 1
	dx(y)
	if xv == 0 {
		return cat1(ucat(r, x), 83|K(xs)<<32) // juxtaposition
	} else if (r == y && xv+yv == 2) || ev == 1 {
		return cat1(ucat(r, x), 91) + 1 // composition
	}
	return idiom(monadic(ucat(r, x))) // monadic
}
func t() K { // Lt
	r := next()
	if r == 0 {
		return 0
	}
	if tp(r) == 0 && int32(r) < 127 {
		if is(int32(r), 32) != 0 {
			pp -= 8
			return 0
		}
	}
	verb := K(0)
	if r == K('(') {
		r = plist(41)
		r = rlist(r&^1, 0)
	} else if r == K('{') {
		r = plam(ps)
	} else if r == K('[') {
		r = es()
		if next() != K(']') {
			trap(Parse)
		}
		return r
	} else if tp(r) == st {
		s := int32(r) >> 3
		if s < 4 {
			ary = maxi(ary, s)
		}
		r = l2(r, 20|(K(ps)<<32)) // .`x (lookup)
	} else {
		rt := tp(r)
		if rt == 0 {
			r, verb = quote(r)|K(ps)<<32, 1
		} else if rt == St {
			if nn(r) == 1 {
				r = Fst(r)
			}
		}
		r = l1(r)
	}
f:
	for {
		n := next()
		if n == 0 {
			break f
		}
		a := int32(n)
		tn := tp(n)
		ks := K(ps) << 32
		if tn == 0 && a > 20 && a < 27 { // +/
			r, verb = cat1(r, n), 1
		} else if n == 91 { // [
			verb = 0
			n = plist(93)
			p := K(84) + 8*(n&1) // 92(project) or call(84)
			n &^= 1
			s := pspec(r, n)
			if s != 0 {
				return s
			}
			if nn(n) == 1 {
				r = cat1(ucat(Fst(n), r), 83|ks)
			} else {
				n = rlist(n, 2)
				r = cat1(Cat(n, r), p|ks)
			}
		} else {
			pp -= 8
			break f // within else-if
		}
	}
	return r + verb
}
func pasn(x, y, r K) K {
	l := K(I64(int32(y)))
	v := int32(l)
	sp := 0xffffff & int32(l>>32)
	if nn(y) == 1 && tp(l) == 0 && v == 449 || (v > 544 && v < 565) {
		dx(y)
		xn := nn(x)
		if xn > 2 { // indexed amd/dmd
			if v > 544 { // indexed-modified
				l -= 96
			}
			s := ati(rx(x), xn-3)
			lp := 0xff000000ffffffff & lastp(x)
			// (+;.i.;`x;.;@) -> x:@[x;.i.;+;rhs] which is (+;.i.;`x;.;211 or 212)
			// lp+128 is @[amd..] or .[dmd..]
			if lp == 92 {
				lp = 84 // x[i;]:.. no projection
			}
			x = cat1(cat1(ucat(l1(l), ldrop(-2, x)), 20), (K(sp)<<32)|(lp+128))
			y = l2(s, 448) // s:..
		} else if v == 449 || v == 545 {
			s := Fst(x) // (`x;.)
			if loc != 0 && v == 449 {
				loc = Cat(loc, rx(s))
			}
			x = l1(s)
			y = l1(448) // asn
		} else { // modified
			y = cat1(l2(unquote(l-32), Fst(rx(x))), 448)
		}
		return dyadic(ucat(r, x), y)
	}
	return 0
}
func plam(s0 int32) K {
	r := K(0)
	slo := loc
	loc = 0
	yra := ary
	ary = 0
	ar := int32(-1)
	n := next()
	if n == 91 { // argnames
		n := plist(93) &^ 1
		ln := nn(n)
		loc = Ech(4, l1(n)) // [a]->,(`a;.)  [a;b]->((`a;.);(`b;.))
		if ln > 0 && tp(loc) != St {
			trap(Parse)
		}
		ar = nn(loc)
		if ar == 0 {
			dx(loc)
			loc = mk(St, 0)
		}
	} else {
		pp -= 8
		loc = mk(St, 0)
	}
	c := cat1(es(), 320)
	n = next()
	if n != 125 {
		trap(Parse)
	}
	if ar < 0 {
		ar = ary
		loc = Cat(ntake(ar, rx(xyz)), loc)
	}
	i := Add(seq(1+ps-s0), Ki(s0-1))
	s := atv(rx(src()), i)
	r = l3(c, Unq(loc), s)
	loc = slo
	ary = yra
	return l1(slam(r, ar, s0))
}
func slam(r K, ar, s0 int32) K {
	rp := int32(r)
	SetI32(rp-12, ar)
	return K(rp) | (K(s0) << 32) | K(lf)<<59
}
func pspec(r, n K) K {
	ln := nn(n)
	v := K(I64(int32(r)))
	if nn(r) == 1 && ln > 2 { // $[..] cond
		if tp(v) == 0 && int32(v) == 465 {
			dx(r)
			return l2(Ecl(13, l2(n, 320)), 257) // Cnd   (n,\`320;`257)
		}
	}
	if nn(r) == 2 && ln > 1 && int32(v) == 64 { // while[..]
		dx(r)
		r = cat1(Fst(rx(n)), 320)
		return cat1(cat1(Enl(cat1(join(256, ndrop(1, n)), 320)), r), 86) //Whl
	}
	return 0
}
func plist(c K) K {
	p := K(0)
	r := mk(Lt, 0)
	n := int32(0)
	for {
		b := next()
		if b == 0 || b == c {
			break
		}
		if n == 0 {
			pp -= 8
		}
		if n != 0 && b != 59 {
			trap(Parse)
		}
		n++
		x := e(t()) &^ 1
		if x == 0 {
			p = 1
		}
		r = cat1(r, x)
	}
	return r + p
}
func rlist(x, p K) K {
	n := nn(x)
	if n == 0 {
		return l1(x)
	}
	if n == 1 {
		return Fst(x)
	}
	if p != 2 {
		p = clist(x, n)
		if p != 0 {
			return l1(p)
		}
	}
	return cat1(cat1(flat(Rev(x)), Ki(n)), 27)
}
func clist(x K, n int32) K {
	p := int32(x)
	for i := int32(0); i < n; i++ {
		xi := K(I64(p))
		t := tp(xi)
		if t != Lt {
			return 0
		}
		if nn(xi) != 1 {
			return 0
		}
		if tp(K(I64(int32(xi)))) == 0 {
			return 0
		}
		p += 8
	}
	return uf(flat(x))
}

func next() K {
	if pp == pe {
		return 0
	}
	r := K(I64(pp))
	ps = 0xffffff & int32(r>>32)
	r = r &^ (K(0xffffff) << 32)
	pp += 8
	return r
}
func lastp(x K) K { return K(I64(int32(x) + 8*(nn(x)-1))) }
func dyadic(x, y K) K {
	l := lastp(y)
	if quoted(l) != 0 {
		return cat1(ucat(x, ldrop(-1, y)), 64+unquote(l))
	}
	return cat1(ucat(x, y), 128)
}
func monadic(x K) K {
	l := lastp(x)
	if quoted(l) != 0 {
		r := cat1(ldrop(-1, x), unquote(l))
		if int32(l) == 449 { // :x (return: identity+jump)
			return cat1(cat1(r, Ki(1048576)), 320)
		} else {
			return r
		}
	}
	return cat1(x, 83) // dyadic-@
}
func ldrop(n int32, x K) K { return explode(ndrop(n, x)) }
func svrb(p int32) int32 {
	x := K(I64(p))
	return I32B(int32(x) < 64 && tp(x) == 0) * int32(x)
}
func idiom(x K) K {
	l := int32(x) + 8*(nn(x)-2)
	i := svrb(l) + svrb(l+8)<<6
	if i == 262 || i == 263 { // *& 6 4 -> 40
		i = 34 // 6->40(Fwh) 7->41(Las)
	} else if i == 1166 { // ?^ 14 18
		i = 23 // 14->37(Uqs)
	} else {
		return x
	}
	SetI64(l, I64(l)+int64(i))
	return ndrop(-1, x)
}
package main

import (
	. "github.com/ktye/wg/module"
)

func rnd() int32 {
	r := rand_
	r ^= (r << 13)
	r ^= (r >> 17)
	r ^= (r << 5)
	rand_ = r
	return r
}
func roll(x K) K { // ?x (atom) ?n(uniform 0..1) ?-n(normal) ?z(binormal)
	xt := tp(x)
	xp := int32(x)
	if xt == it {
		if xp > 0 {
			return kx(72, x) // .rf uniform
		} else {
			r := kx(80, Ki((1+-xp)/2))
			SetI32(int32(r)-12, -xp)
			return K(int32(r)) | K(Ft)<<59 // normal
		}
	}
	if xt == zt {
		dx(x)
		return kx(80, Ki(int32(F64floor(F64(xp))))) //.rz binormal
	}
	return trap(Type)
}
func deal(x, y K) K { // x?y (x atom) n?n(with replacement) -n?n(without) n?L (-#L)?L shuffle
	yt := tp(y)
	if yt > 16 {
		return In(x, y)

		/*
			yn := nn(y)
			if xp < 0 {
				xp = -xp
				if xp >= yn {
					return atv(y, shuffle(seq(xp), yn)) //(-#L)?L
				} else {
					return atv(y, deal(x, Ki(yn))) // -n?L
				}
			} else {
				return atv(y, randI(nn(y), xp)) // n?L
			}
		*/
	}

	if tp(x) != it {
		trap(Type)
	}
	xp := int32(x)

	if yt == ct {
		return Add(Kc(97), Flr(deal(x, Ki(int32(y)-96))))
	}
	if yt == st {
		return Ech(17, l2(Ks(0), deal(x, Fst(cs(y))))) // `$'x?*$y
	}
	if yt != it {
		trap(Type)
	}
	yp := int32(y)
	if xp > 0 {
		return randI(yp, xp) // n?m
	}
	// todo n<<m
	return ntake(-xp, shuffle(seq(yp), -xp)) //-n?m (no duplicates)
}
func randi(n int32) int32 {
	v := uint32(rnd())
	prod := uint64(v) * uint64(n)
	low := uint32(prod)
	if low < uint32(n) {
		thresh := uint32(-n) % uint32(n)
		for low < thresh {
			v = uint32(rnd())
			prod = uint64(v) * uint64(n)
			low = uint32(prod)
		}
	}
	return int32(prod >> 32)
}
func randI(i, n int32) K {
	r := mk(It, n)
	rp := int32(r)
	e := rp + 4*n
	if i == 0 {
		for rp < e {
			SetI32(rp, rnd())
			rp += 4
		}
	} else {
		for rp < e {
			SetI32(rp, randi(i))
			rp += 4
		}
	}
	return r
}
func shuffle(r K, m int32) K { // I, inplace
	rp := int32(r)
	n := nn(r)
	m = mini(n-1, m)
	for i := int32(0); i < m; i++ {
		ii := i + randi(n-i)
		j := rp + 4*(ii-i)
		t := I32(rp)
		SetI32(rp, I32(j))
		SetI32(j, t)
		rp += 4
	}
	return r
}
package main

import (
	. "github.com/ktye/wg/module"
)

func rd0(yp int32, t T, n int32) K { return 0 }
func min(yp int32, t T, n int32) K { // &/x
	xp := int32(0)
	switch t - 18 {
	case 0: // Ct
		xp = 127
		for i := int32(0); i < n; i++ {
			xp = mini(xp, I8(yp+i))
		}
		return Kc(xp)
	case 1: // It
		xp = 2147483647
		for i := int32(0); i < n; i++ {
			xp = mini(xp, I32(yp))
			yp += 4
		}
		return Ki(xp)
	case 2: // St
		xp = (nn(K(I64(8))) << 3) - 8
		for i := int32(0); i < n; i++ {
			xp = mini(xp, I32(yp))
			yp += 4
		}
		return Ks(xp)
	case 3: // Ft
		f := F64reinterpret_i64(uint64(0x7FF0000000000000))
		for i := int32(0); i < n; i++ {
			f = F64min(f, F64(yp))
			yp += 8
		}
		return Kf(f)
	default:
		return 0
	}
}
func max(yp int32, t T, n int32) K { // |/x
	xp := int32(0)
	switch t - 18 {
	case 0: // Ct
		xp = -128
		for i := int32(0); i < n; i++ {
			xp = maxi(xp, I8(yp+i))
		}
		return Kc(xp)
	case 1: // It
		xp = nai
		for i := int32(0); i < n; i++ {
			xp = maxi(xp, I32(yp))
			yp += 4
		}
		return Ki(xp)
	case 2: // St
		for i := int32(0); i < n; i++ {
			xp = maxi(xp, I32(yp))
			yp += 4
		}
		return Ks(xp)
	case 3: // Ft
		f := F64reinterpret_i64(uint64(0xFFF0000000000000))
		for i := int32(0); i < n; i++ {
			f = F64max(f, F64(yp))
			yp += 8
		}
		return Kf(f)
	default:
		return 0
	}
}
func sum(yp int32, t T, n int32) K { // +/x
	xp := int32(0)
	switch t - 18 {
	case 0: // Ct
		for i := int32(0); i < n; i++ {
			xp += I8(yp + i)
		}
		return Kc(xp)
	case 1: // It
		return Ki(xp + sumi(yp, n))
	case 2: // St
		return 0
	case 3: // Ft
		f := 0.0
		return Kf(f + sumf(yp, n, 8))
	case 4: // Zt
		re := 0.0
		im := 0.0
		return Kz(re+sumf(yp, n, 16), im+sumf(yp+8, n, 16))
	default:
		return 0
	}
}
func sumf(xp, n, s int32) float64 {
	r := 0.0
	if n < 128 {
		for i := int32(0); i < n; i++ {
			r += F64(xp)
			xp += s
		}
		return r
	}
	m := n / 2
	return sumf(xp, m, s) + sumf(xp+s*m, n-m, s)
}
func prd(yp int32, t T, n int32) K { // */x
	xp := int32(1)
	switch t - 18 {
	case 0: // Ct
		for i := int32(0); i < n; i++ {
			xp *= I8(yp + i)
		}
		return Kc(xp)
	case 1: // It
		for i := int32(0); i < n; i++ {
			xp *= I32(yp)
			yp += 4
		}
		return Ki(xp)
	case 2: // St
		return 0
	case 3: // Ft
		f := 1.0
		for i := int32(0); i < n; i++ {
			f *= F64(yp)
			yp += 8
		}
		return Kf(f)
	default:
		return 0
	}
}

func sums(yp int32, t T, n int32) K {
	if t != It {
		return 0
	}
	r := mk(It, n)
	rp := int32(r)
	s := int32(0)
	e := yp + 4*n
	for yp < e {
		s += I32(yp)
		SetI32(rp, s)
		rp += 4
		yp += 4
		continue
	}
	return r
}
func prds(yp int32, t T, n int32) K {
	if t != It {
		return 0
	}
	r := mk(It, n)
	rp := int32(r)
	s := int32(1)
	e := yp + 4*n
	for yp < e {
		s *= I32(yp)
		SetI32(rp, s)
		rp += 4
		yp += 4
		continue
	}
	return r
}
package main

import (
	. "github.com/ktye/wg/module"
)

type f1i = func(int32) int32
type f1f = func(float64) float64
type f1z = func(float64, float64) K
type f2i = func(int32, int32) int32
type f2f = func(float64, float64) float64
type f2c = func(float64, float64) int32
type f2z = func(float64, float64, float64, float64, int32)
type f2d = func(float64, float64, float64, float64) int32
type ff3i = func(float64, int32, int32, int32)
type fF3i = func(float64, float64, int32, int32, int32)
type f4i = func(int32, int32, int32, int32)
type f2Ff = func(int32, float64, int32, int32)
type f2Zz = func(int32, float64, float64, int32, int32)

func Neg(x K) K              { return nm(220, x) } //220
func negi(x int32) int32     { return -x }
func negf(x float64) float64 { return -x }
func negz(x, y float64) K    { return Kz(-x, -y) }

func Abs(x K) K {
	xt := tp(x)
	if xt > Zt {
		return Ech(32, l1(x))
	}
	if xt == zt {
		xp := int32(x)
		dx(x)
		return Kf(hypot(F64(xp), F64(xp+8)))
	} else if xt == Zt {
		return absZ(x)
	}
	return nm(223, x) //227
}
func absi(x int32) int32 {
	if x < 0 {
		return -x
	}
	return x
}
func absf(x float64) float64 { return F64abs(x) }
func absZ(x K) K {
	n := nn(x)
	r := mk(Ft, n)
	rp := int32(r)
	xp := int32(x)
	for i := int32(0); i < n; i++ {
		SetF64(rp, hypot(F64(xp), F64(xp+8)))
		xp += 16
		rp += 8
		continue
	}
	dx(x)
	return r
}

func Sqr(x K) K {
	if tp(x)&15 != ft {
		x = Add(Kf(0), x)
	}
	return nm(244, x) //300
}
func sqrf(x float64) float64 { return F64sqrt(x) }

func Hyp(x, y K) K { // e.g.  norm:0. abs/x
	xt := tp(x)
	yt := tp(y)
	if xt > Zt || yt > Zt {
		return Ech(32, l2(x, y))
	}
	if xt == zt {
		x, xt = Abs(x), ft
	}
	if xt == ft {
		xp := int32(x)
		yp := int32(y)
		dx(x)
		dx(y)
		if yt == ft {
			return Kf(hypot(F64(xp), F64(yp)))
		} else if yt == zt {
			return Kf(hypot(F64(xp), hypot(F64(yp), F64(yp+8))))
		}
	}
	return trap(Nyi)
}
func Img(x K) K { // imag x
	xt := tp(x)
	if xt > Zt {
		return Ech(33, l1(x))
	}
	if xt == Zt {
		xp := 8 + int32(x)
		n := nn(x)
		r := mk(Ft, n)
		rp := int32(r)
		e := rp + 8*n
		for rp < e {
			SetI64(rp, I64(xp))
			xp += 16
			rp += 8
		}
		dx(x)
		return r
	}
	dx(x)
	if xt == zt {
		return Kf(F64(int32(x) + 8))
	}
	if xt < zt {
		return Kf(0.0)
	} else {
		return ntake(nn(x), Kf(0.0))
	}
}
func Cpx(x, y K) K { return Add(x, Mul(Kz(0.0, 1.0), y)) } // x imag y
func Cnj(x K) K { // conj x
	xt := tp(x)
	if xt > Zt {
		return Ech(34, l1(x))
	}
	if xt&15 < zt {
		return x
	}
	xt = tp(x)
	xp := int32(x)
	if xt == zt {
		dx(x)
		return Kz(F64(xp), -F64(xp+8))
	}
	x = use(x)
	xp = 8 + int32(x)
	e := xp + 16*nn(x)
	for xp < e {
		SetF64(xp, -F64(xp))
		xp += 16
	}
	return x
}

func Add(x, y K) K                          { return nd(226, 2, x, y) } //234
func addi(x, y int32) int32                 { return x + y }
func addf(x, y float64) float64             { return x + y }
func addz(xr, xi, yr, yi float64, rp int32) { SetF64(rp, xr+yr); SetF64(rp+8, xi+yi) }
func Sub(x, y K) K                          { return nd(229, 3, x, y) } //245
func subi(x, y int32) int32                 { return x - y }
func subf(x, y float64) float64             { return x - y }
func subz(xr, xi, yr, yi float64, rp int32) { SetF64(rp, xr-yr); SetF64(rp+8, xi-yi) }

func Mul(x, y K) K                          { return nd(232, 4, x, y) } //256
func muli(x, y int32) int32                 { return x * y }
func mulf(x, y float64) float64             { return x * y }
func mulz(xr, xi, yr, yi float64, rp int32) { SetF64(rp, xr*yr-xi*yi); SetF64(rp+8, xr*yi+xi*yr) }

func Mod(x, y K) K          { return nd(244, 41, x, y) } //300
func modi(x, y int32) int32 { return x % y }
func idiv(x, y K, mod int32) K {
	if mod != 0 {
		return Mod(x, y)
	}
	return Div(x, y)
}
func Div(x, y K) K              { return nd(235, 5, x, y) } //267
func divi(x, y int32) int32     { return x / y }
func divf(x, y float64) float64 { return x / y }
func divz(xr, xi, yr, yi float64, rp int32) {
	r, d, e, f := 0.0, 0.0, 0.0, 0.0
	if F64abs(yr) >= F64abs(yi) {
		r = yi / yr
		d = yr + r*yi
		e = (xr + xi*r) / d
		f = (xi - xr*r) / d
	} else {
		r = yr / yi
		d = yi + r*yr
		e = (xr*r + xi) / d
		f = (xi*r - xr) / d
	}
	SetF64(rp, e)
	SetF64(rp+8, f)
}

func Min(x, y K) K { return nd(238, 6, x, y) } //278
func mini(x, y int32) int32 {
	if x < y {
		return x
	}
	return y
}
func minf(x, y float64) float64 { return F64min(x, y) }
func minz(xr, xi, yr, yi float64, rp int32) {
	if ltz(xr, xi, yr, yi) != 0 {
		SetF64(rp, xr)
		SetF64(rp+8, xi)
	} else {
		SetF64(rp, yr)
		SetF64(rp+8, yi)
	}
}

func Max(x, y K) K { return nd(241, 7, x, y) } //289
func maxi(x, y int32) int32 {
	if x > y {
		return x
	} else {
		return y
	}
}
func maxf(x, y float64) float64 { return F64max(x, y) }
func maxz(xr, xi, yr, yi float64, rp int32) {
	if gtz(xr, xi, yr, yi) != 0 {
		SetF64(rp, xr)
		SetF64(rp+8, xi)
	} else {
		SetF64(rp, yr)
		SetF64(rp+8, yi)
	}
}

func Eql(x, y K) K                     { return nc(247, 10, x, y) } //308
func eqi(x, y int32) int32             { return I32B(x == y) }
func eqf(x, y float64) int32           { return I32B((x != x) && (y != y) || x == y) }
func eqz(xr, xi, yr, yi float64) int32 { return eqf(xr, yr) & eqf(xi, yi) }
func eqC(xp, yp int32) int32           { return I32B(I8(xp) == I8(yp)) }
func eqI(xp, yp int32) int32           { return I32B(I32(xp) == I32(yp)) }
func eqF(xp, yp int32) int32           { return eqf(F64(xp), F64(yp)) }
func eqZ(xp, yp int32) int32           { return eqz(F64(xp), F64(xp+8), F64(yp), F64(yp+8)) }

func Les(x, y K) K { // x<y   `file<c
	if tp(x) == st && tp(y) == Ct {
		if int32(x) == 0 {
			write(rx(y))
			return y
		}
		return writefile(cs(x), y)
	}
	return nc(255, 8, x, y) //323
}
func lti(x, y int32) int32   { return I32B(x < y) }
func ltf(x, y float64) int32 { return I32B(x < y || x != x) }
func ltz(xr, xi, yr, yi float64) int32 {
	if eqf(xr, yr) != 0 {
		return ltf(xi, yi)
	}
	return ltf(xr, yr)
}

func Mor(x, y K) K           { return nc(263, 9, x, y) } //338
func gti(x, y int32) int32   { return I32B(x > y) }
func gtf(x, y float64) int32 { return I32B(x > y || y != y) }
func gtz(xr, xi, yr, yi float64) int32 {
	if eqf(xr, yr) != 0 {
		return gtf(xi, yi)
	}
	return gtf(xr, yr)
}

func Ang(x K) K { // angle x
	r := K(0)
	xt := tp(x)
	if xt > Zt {
		return Ech(35, l1(x))
	}
	if xt < zt {
		dx(x)
		return Kf(0)
	}
	xp := int32(x)
	if xt == zt {
		dx(x)
		return Kf(ang2(F64(xp+8), F64(xp)))
	}
	n := nn(x)
	if xt == Zt {
		r = mk(Ft, n)
		rp := int32(r)
		e := rp + 8*n
		for rp < e {
			SetF64(rp, ang2(F64(xp+8), F64(xp)))
			xp += 16
			rp += 8
		}
	} else {
		r = ntake(n, Kf(0))
	}
	dx(x)
	return r
}
func Rot(x, y K) K { // r@deg
	r := K(0)
	if tp(x) > Zt {
		return Ech(35, l2(x, y))
	}
	x = uptype(x, zt)
	if y == 0 {
		return x
	}
	if tp(y)&15 > ft {
		trap(Type)
	}
	y = uptype(y, ft)
	yt := tp(y)
	yp := int32(y)
	if yt == ft {
		r = Kz(0, 0)
		cosin(F64(yp), int32(r))
	} else {
		yn := nn(y)
		r = mk(Zt, yn)
		rp := int32(r)
		for i := int32(0); i < yn; i++ {
			cosin(F64(yp), rp)
			yp += 8
			rp += 16
		}
	}
	dx(y)
	return Mul(r, x)
}
func Sin(x K) K { return nf(44, x, 0) } // sin x
func Cos(x K) K { return nf(39, x, 0) } // cos x
func Exp(x K) K { return nf(42, x, 0) } // exp x
func Log(x K) K { return nf(43, x, 0) } // log x
func Pow(y, x K) K { // x^y
	if tp(x)&15 == it {
		if tp(y) == it {
			if int32(y) >= 0 {
				return ipow(x, int32(y))
			}
		}
	}
	return nf(106, x, y)
}
func Lgn(x, y K) K { // n log y
	xf := fk(x)
	if xf == 10.0 {
		xf = 0.4342944819032518
	} else if xf == 2.0 {
		xf = 1.4426950408889634
	} else {
		xf = 1.0 / log(xf)
	}
	return Mul(Kf(xf), Log(y))
}
func fk(x K) float64 {
	t := tp(x)
	if t == it {
		return float64(int32(x))
	}
	if t != ft {
		trap(Type)
	}
	dx(x)
	return F64(int32(x))
}
func nf(f int32, x, y K) K {
	r := K(0)
	yf := 0.0
	xt := tp(x)
	if xt >= Lt {
		if y == 0 {
			return Ech(K(f), l1(x))
		} else {
			return Ech(K(f-64), l2(y, x))
		}
	}
	if y != 0 {
		yf = fk(y)
	}
	if xt&15 < ft {
		x = uptype(x, ft)
		xt = tp(x)
	}
	xp := int32(x)
	if xt == ft {
		r = Kf(0)
		ff(f, int32(r), xp, 1, yf)
	} else {
		xn := nn(x)
		r = mk(Ft, xn)
		if xn > 0 {
			ff(f, int32(r), xp, xn, yf)
		}
	}
	dx(x)
	return r
}
func ff(f, rp, xp, n int32, yf float64) {
	e := xp + 8*n
	switch f - 42 {
	case 0:
		for xp < e {
			SetF64(rp, exp(F64(xp)))
			rp += 8
			xp += 8
			continue
		}
	case 1:
		for xp < e {
			SetF64(rp, log(F64(xp)))
			rp += 8
			xp += 8
			continue
		}
	default:
		if f == 106 { // pow 42+64
			for xp < e {
				SetF64(rp, pow(F64(xp), yf))
				rp += 8
				xp += 8
				continue
			}
		} else { // sin cos
			for xp < e {
				cosin_(F64(xp), rp, 1+I32B(f == 39))
				rp += 8
				xp += 8
				continue
			}
		}
	}
}

func nm(f int32, x K) K { //monadic
	r := K(0)
	xt := tp(x)
	if xt > Lt {
		r = x0(x)
		return key(r, nm(f, r1(x)), xt)
	}
	xp := int32(x)
	if xt == Lt {
		n := nn(x)
		r = mk(Lt, n)
		rp := int32(r)
		for i := int32(0); i < n; i++ {
			SetI64(rp, int64(nm(f, x0(K(xp)))))
			xp += 8
			rp += 8
		}
		dx(x)
		return uf(r)
	}
	if xt < 16 {
		switch xt - 2 {
		case 0:
			return Kc(Func[f].(f1i)(xp))
		case 1:
			return Ki(Func[f].(f1i)(xp))
		case 2:
			return trap(Type)
		case 3:
			r = Kf(Func[1+f].(f1f)(F64(xp)))
			dx(x)
			return r
		case 4:
			r = Func[2+f].(f1z)(F64(xp), F64(xp+8))
			dx(x)
			return r
		default:
			return trap(Type)
		}
	}
	r = use1(x)
	rp := int32(r)
	e := ep(r)
	if e == rp {
		dx(x)
		return r
	}
	switch xt - 18 {
	case 0:
		for rp < e {
			SetI8(rp, Func[f].(f1i)(I8(xp)))
			xp++
			rp++
			continue
		}
	case 1:
		for rp < e {
			SetI32(rp, Func[f].(f1i)(I32(xp)))
			xp += 4
			rp += 4
			continue
		}
	case 2:
		trap(Type)
	default: //F/Z (only called for neg)
		for rp < e {
			SetF64(rp, Func[1+f].(f1f)(F64(xp)))
			xp += 8
			rp += 8
			continue
		}
	}
	dx(x)
	return r
}
func nd(f, ff int32, x, y K) K { //dyadic
	r := K(0)
	t := dtypes(x, y)
	if t > Lt {
		r = dkeys(x, y)
		return key(r, Func[64+ff].(f2)(dvals(x), dvals(y)), t)
	}
	if t == Lt {
		return Ech(K(ff), l2(x, y))
	}
	t = maxtype(x, y)
	x = uptype(x, t)
	y = uptype(y, t)
	av := conform(x, y)
	xp, yp := int32(x), int32(y)

	if av == 0 { //atom-atom
		switch t - 2 {
		case 0: // ct
			return Kc(Func[f].(f2i)(xp, yp))
		case 1: // it
			return Ki(Func[f].(f2i)(xp, yp))
		case 2: // st
			return trap(Type)
		case 3:
			dx(x)
			dx(y)
			return Kf(Func[1+f].(f2f)(F64(xp), F64(yp)))
		default:
			r = Kz(0, 0)
			dx(x)
			dx(y)
			Func[2+f].(f2z)(F64(xp), F64(xp+8), F64(yp), F64(yp+8), int32(r))
			return r
		}
	}

	n := int32(0)
	ix := sz(t + 16)
	iy := ix
	if av == 1 { //av
		x = Enl(x)
		xp = int32(x)
		ix = 0
		n = nn(y)
		r = use1(y)
	} else if av == 2 { //va
		n = nn(x)
		y = Enl(y)
		yp = int32(y)
		iy = 0
		r = use1(x)
	} else {
		n = nn(x)
		r = use2(x, y)
	}
	if n == 0 {
		dx(x)
		dx(y)
		return r
	}

	rp := int32(r)
	e := ep(r)
	switch t - 2 {
	case 0: // ct
		for rp < e {
			SetI8(rp, Func[f].(f2i)(I8(xp), I8(yp)))
			xp += ix
			yp += iy
			rp++
			continue
		}
	case 1: // it
		for rp < e {
			SetI32(rp, Func[f].(f2i)(I32(xp), I32(yp)))
			xp += ix
			yp += iy
			rp += 4
			continue
		}
	case 2: // st
		trap(Type)
	case 3: // ft
		for rp < e {
			SetF64(rp, Func[1+f].(f2f)(F64(xp), F64(yp)))
			xp += ix
			yp += iy
			rp += 8
			continue
		}
	default: // zt
		for rp < e {
			Func[2+f].(f2z)(F64(xp), F64(xp+8), F64(yp), F64(yp+8), rp)
			xp += ix
			yp += iy
			rp += 16
		}
	}
	dx(x)
	dx(y)
	return r
}
func nc(f, ff int32, x, y K) K { //compare
	r := K(0)
	t := dtypes(x, y)
	if t > Lt {
		r = dkeys(x, y)
		return key(r, nc(f, ff, dvals(x), dvals(y)), t)
	}
	if t == Lt {
		return Ech(K(ff), l2(x, y))
	}
	t = maxtype(x, y)
	x = uptype(x, t)
	y = uptype(y, t)
	av := conform(x, y)
	xp, yp := int32(x), int32(y)
	if av == 0 { // atom-atom
		switch t - 2 {
		case 0: // ct
			return Ki(Func[f].(f2i)(xp, yp))
		case 1: // it
			return Ki(Func[f].(f2i)(xp, yp))
		case 2: // st
			return Ki(Func[f].(f2i)(xp, yp))
		case 3:
			dx(x)
			dx(y)
			return Ki(Func[1+f].(f2c)(F64(xp), F64(yp)))
		default:
			dx(x)
			dx(y)
			return Ki(Func[2+f].(f2d)(F64(xp), F64(xp+8), F64(yp), F64(yp+8)))
		}
	}
	n := int32(0)
	ix := sz(t + 16)
	iy := ix
	if av == 1 { //av
		x = Enl(x)
		xp = int32(x)
		ix = 0
		n = nn(y)
	} else if av == 2 { //va
		n = nn(x)
		y = Enl(y)
		yp = int32(y)
		iy = 0
	} else {
		n = nn(x)
	}
	r = mk(It, n)
	if n == 0 {
		dx(x)
		dx(y)
		return r
	}
	f += 1 + int32(t)
	rp := int32(r)
	e := ep(r)
	for rp < e {
		SetI32(rp, Func[f].(f2i)(xp, yp))
		xp += ix
		yp += iy
		rp += 4
		continue
	}
	dx(x)
	dx(y)
	return r
}
func conform(x, y K) int32 { // 0:atom-atom 1:atom-vector, 2:vector-atom, 3:vector-vector
	r := 2*I32B(tp(x) > 16) + I32B(tp(y) > 16)
	if r == 3 {
		if nn(x) != nn(y) {
			trap(Length)
		}
	}
	return r
}
func dtypes(x, y K) T {
	xt, yt := tp(x), tp(y)
	return T(maxi(int32(xt), int32(yt)))
}
func dkeys(x, y K) K {
	if tp(x) > Lt {
		return x0(x)
	}
	return x0(y)
}
func dvals(x K) K {
	if tp(x) > Lt {
		return r1(x)
	}
	return x
}
func maxtype(x, y K) T {
	xt, yt := tp(x)&15, tp(y)&15
	t := T(maxi(int32(xt), int32(yt)))
	if t == 0 {
		t = it
	}
	return t
}
func uptype(x K, dst T) K {
	xt := tp(x)
	xp := int32(x)
	if xt&15 == dst {
		return x
	}
	if xt < 16 {
		if dst == ct {
			return Kc(xp)
		} else if dst == it {
			return Ki(xp)
		} else if dst == ft {
			return Kf(float64(xp))
		} else if dst == zt {
			f := float64(xp)
			if xt == ft {
				f = F64(xp)
				dx(x)
			}
			return Kz(f, 0)
		} else {
			return trap(Type)
		}
	}
	if xt < It && dst == ft {
		x, xt = uptype(x, it), It
	}
	if xt < Ft && dst == zt {
		x, xt = uptype(x, ft), Ft
	}
	xn := nn(x)
	xp = int32(x)
	r := mk(dst+16, xn)
	rp := int32(r)
	if dst == it {
		for i := int32(0); i < xn; i++ {
			SetI32(rp, I8(xp))
			xp++
			rp += 4
		}
	} else if dst == ft {
		for i := int32(0); i < xn; i++ {
			SetF64(rp, float64(I32(xp)))
			xp += 4
			rp += 8
		}
	} else if dst == zt {
		for i := int32(0); i < xn; i++ {
			SetF64(rp, F64(xp))
			SetF64(rp+8, 0.0)
			xp += 8
			rp += 16
		}
	} else {
		trap(Type)
	}
	dx(x)
	return r
}
func use2(x, y K) K {
	if I32(int32(y)-4) == 1 {
		return rx(y)
	}
	return use1(x)
}
func use1(x K) K {
	if I32(int32(x)-4) == 1 {
		return rx(x)
	}
	return mk(tp(x), nn(x))
}
func use(x K) K {
	xt := tp(x)
	if xt < 16 || xt > Lt {
		trap(Type)
	}
	if I32(int32(x)-4) == 1 {
		return x
	}
	nx := nn(x)
	r := mk(xt, nx)
	Memorycopy(int32(r), int32(x), sz(xt)*nx)
	if xt == Lt {
		rl(r)
	}
	dx(x)
	return r
}
package main

import (
	. "github.com/ktye/wg/module"
)

func Srt(x K) K { // ^x
	r := K(0)
	xt := tp(x)
	if xt < 16 {
		trap(Type)
	}
	if xt == Dt {
		r = x0(x)
		x = r1(x)
		i := rx(Asc(rx(x)))
		return Key(atv(r, i), atv(x, i))
	}
	if nn(x) < 2 {
		return x
	}
	return atv(x, Asc(rx(x)))
}
func Asc(x K) K { // <x  <`file
	if tp(x) == st {
		return readfile(cs(x))
	}
	return grade(x, 261) //343
}
func Dsc(x K) K { return grade(x, 254) } //336 // >x
func grade(x K, f int32) K { // <x >x
	r := K(0)
	xt := tp(x)
	if xt < 16 {
		trap(Type)
	}
	if xt == Dt {
		r = x0(x)
		return Atx(r, grade(r1(x), f))
	}
	n := nn(x)
	if xt == Tt {
		return kxy(104, x, Ki(I32B(f == 254))) //336 //gdt ngn:{(!#x){x@<y x}/|.+x}
	}
	if n < 2 {
		dx(x)
		return seq(n)
	}
	r = seq(n)
	rp := int32(r)
	xp := int32(x)
	w := mk(It, n)
	wp := int32(w)
	Memorycopy(wp, rp, 4*n)
	msrt(wp, rp, 0, n, xp, sz(xt), f+int32(xt))
	dx(w)
	dx(x)
	return r
}

func msrt(x, r, a, b, p, s, f int32) {
	if b-a < 2 {
		return
	}
	c := (a + b) >> 1
	msrt(r, x, a, c, p, s, f)
	msrt(r, x, c, b, p, s, f)
	mrge(x, r, 4*a, 4*b, 4*c, p, s, f)
}
func mrge(x, r, a, b, c, p, s, f int32) {
	q := int32(0)
	i, j := a, c
	for k := a; k < b; k += 4 {
		if i < c && j < b {
			q = Func[f].(f2i)(p+s*I32(x+i), p+s*I32(x+j))
		} else {
			q = 0
		}
		if i >= c || q != 0 {
			SetI32(r+k, I32(x+j))
			j += 4
		} else {
			SetI32(r+k, I32(x+i))
			i += 4
		}
	}
}

func guC(xp, yp int32) int32 { return I32B(I8(xp) < I8(yp)) }
func guI(xp, yp int32) int32 { return I32B(I32(xp) < I32(yp)) }
func guF(xp, yp int32) int32 { return ltf(F64(xp), F64(yp)) }
func guZ(xp, yp int32) int32 { return ltz(F64(xp), F64(xp+8), F64(yp), F64(yp+8)) }
func guL(xp, yp int32) int32 { return ltL(K(I64(xp)), K(I64(yp))) }

func gdC(xp, yp int32) int32 { return I32B(I8(xp) > I8(yp)) }
func gdI(xp, yp int32) int32 { return I32B(I32(xp) > I32(yp)) }
func gdF(xp, yp int32) int32 { return guF(yp, xp) }
func gdZ(xp, yp int32) int32 { return guZ(yp, xp) }
func gdL(xp, yp int32) int32 { return guL(yp, xp) }

func ltL(x, y K) int32 { // sort lists lexically
	r := int32(0)
	xt := tp(x)
	if xt != tp(y) {
		return I32B(xt < tp(y))
	}
	if xt < 16 {
		return int32(Les(rx(x), rx(y)))
	}
	xp, yp := int32(x), int32(y)
	if xt > Lt {
		a, b := K(I64(xp)), K(I64(yp))
		if match(a, b) == 0 {
			return ltL(a, b)
		}
		return ltL(K(I64(xp+8)), K(I64(yp+8)))
	}
	xn, yn := nn(x), nn(y)
	n := mini(xn, yn)
	switch sz(xt) >> 2 {
	case 0:
		r = taoC(xp, yp, n)
	case 1:
		r = taoI(xp, yp, n)
	case 2:
		if xt == Lt {
			r = taoL(xp, yp, n)
		} else {
			r = taoF(xp, yp, n)
		}
	default:
		r = taoZ(xp, yp, n)
	}
	if r == 2 {
		return I32B(xn < yn)
	} else {
		return r
	}
}
func taoC(xp, yp, n int32) int32 {
	e := xp + n
	for xp < e {
		if I8(xp) != I8(yp) {
			return I32B(I8(xp) < I8(yp))
		}
		yp++
		xp++
	}
	return 2
}
func taoI(xp, yp, n int32) int32 {
	e := xp + 4*n
	for xp < e {
		if I32(xp) != I32(yp) {
			return I32B(I32(xp) < I32(yp))
		}
		yp += 4
		xp += 4
	}
	return 2
}
func taoL(xp, yp, n int32) int32 {
	e := xp + 8*n
	for xp < e {
		x, y := K(I64(xp)), K(I64(yp))
		if match(x, y) == 0 {
			return ltL(x, y)
		}
		yp += 8
		xp += 8
	}
	return 2
}
func taoF(xp, yp, n int32) int32 {
	e := xp + 8*n
	for xp < e {
		x, y := F64(xp), F64(yp)
		if eqf(x, y) == 0 {
			return ltf(x, y)
		}
		yp += 8
		xp += 8
	}
	return 2
}
func taoZ(xp, yp, n int32) int32 {
	e := xp + 16*n
	for xp < e {
		xr, xi, yr, yi := F64(xp), F64(xp+8), F64(yp), F64(yp+8)
		if eqz(xr, xi, yr, yi) == 0 {
			return ltz(xr, xi, yr, yi)
		}
		yp += 16
		xp += 16
	}
	return 2
}
package main

import (
	. "github.com/ktye/wg/module"
)

func Kst(x K) K { return Atx(Ks(32), x) } // `k@
/*
func Kst(x K) K {
	b := []byte(sK(x))
	dx(x)
	r := mk(Ct, int32(len(b)))
	copy(Bytes[int32(r):], b)
	return r
}
*/
func Lst(x K) K { return Atx(Ks(40), x) } // `l@
func Str(x K) K {
	r := K(0)
	xt := tp(x)
	if xt > 16 {
		return Ech(17, l1(x))
	}
	xp := int32(x)
	if xt > dt {
		switch xt - cf {
		case 0: // cf
			rx(x)
			r = ucats(Rev(Str(K(xp) | K(Lt)<<59)))
		case 1: // df
			r = Str(x0(x))
			p := x1(x)
			if int32(p)%2 != 0 {
				p = cat1(Str(20+p), Kc(':'))
			} else {
				p = Str(21 + p)
			}
			r = ucat(r, p)
		case 2: //pf
			f := x0(x)
			l := x1(x)
			i := x2(x)
			ft := tp(f)
			f = Str(f)
			dx(i)
			if nn(i) == 1 && I32(int32(i)) == 1 && (ft == 0 || ft == df) {
				r = ucat(Kst(Fst(l)), f)
			} else {
				r = ucat(f, emb('[', ']', ndrop(-1, ndrop(1, Kst(l)))))
			}
		case 3: //lf
			r = x2(x)
		default: // native
			r = x1(x)
		}
		dx(x)
		return r
	} else {
		switch xt {
		case 0:
			if xp > 448 {
				return Str(K(xp) - 448)
			}
			ip := xp
			switch xp >> 6 {
			case 0: //  0..63  monadic
				if xp == 0 {
					return mk(Ct, 0)
				}
			case 1: // 64..127 dyadic
				ip -= 64
			case 2: // 128     dyadic indirect
				ip -= 128
			case 3: // 192     tetradic
				ip -= 192
				//default:
				//	return ucat(Ku('`'), si(xp))
			}
			if ip > 25 || ip == 0 {
				return ucat(Ku('`'), si(xp))
			}
			r = Ku(uint64(I8(227 + ip)))
		case 1: //not reached
			r = 0
		case ct:
			r = Ku(uint64(xp))
		case it:
			r = si(xp)
		case st:
			r = cs(x)
		case ft:
			r = sf(F64(xp))
		default:
			r = sfz(F64(xp), F64(xp+8))
		}
	}
	dx(x)
	return r
}
func emb(a, b int32, x K) K { return cat1(Cat(Kc(a), x), Kc(b)) }
func si(x int32) K {
	if x == 0 {
		return Ku(uint64('0'))
	} else if x == nai {
		return Ku(20016) // 0N
	} else if x < 0 {
		return ucat(Ku(uint64('-')), si(-x))
	}
	r := mk(Ct, 0)
	for x != 0 {
		r = cat1(r, Kc('0'+x%10))
		x /= 10
	}
	return Rev(r)
}
func sf(x float64) K {
	c := int32(0)
	if x != x {
		return Ku(28208) // 0n
	}
	u := uint64(I64reinterpret_f64(x))
	if u == uint64(0x7FF0000000000000) {
		return Ku(30512) // 0w
	} else if u == uint64(0xFFF0000000000000) {
		return Ku(7811117) // -0w
	}
	if x < 0 {
		return ucat(Ku(uint64('-')), sf(-x))
	}
	if x > 0 && (x >= 1e6 || x <= 1e-6) {
		return se(x)
	}
	r := mk(Ct, 0)
	i := int64(x)
	if i == 0 {
		r = cat1(r, Kc('0'))
	}
	for i != 0 {
		r = cat1(r, Kc(int32('0'+i%10)))
		i /= 10
	}

	r = Rev(r)
	r = cat1(r, Kc('.'))
	x -= F64floor(x)
	for i := int32(0); i < 6; i++ {
		x *= 10
		r = cat1(r, Kc('0'+(int32(x)%10)))
		continue
	}
	n := nn(r)
	rp := int32(r)
	for i := int32(0); i < n; i++ {
		if I8(rp) == '0' {
			c++
		} else {
			c = 0
		}
		rp++
	}
	return ndrop(-c, r)
}
func se(x float64) K {
	f := x
	e := int64(0)
	if frexp1(x) != 0 {
		f = frexp2(x)
		e = frexp3(x)
	}
	x = 0.3010299956639812 * float64(e) // log10(2)*
	ei := int32(F64floor(x))
	x = x - float64(ei)
	return ucat(cat1(sf(f*pow(10.0, x)), Kc('e')), si(ei))
}
func sfz(re, im float64) K {
	if (re != re) || (im != im) {
		return Ku(6385200) // 0na
	}
	z := hypot(re, im)
	a := ang2(im, re)
	r := cat1(trdot(sf(z)), Kc('a'))
	if a != 0.0 {
		r = ucat(r, trdot(sf(a)))
	}
	return r
}
func trdot(x K) K {
	n := nn(x)
	if I8(int32(x)+n-1) == '.' {
		return ndrop(-1, x)
	}
	return x
}

func Cst(x, y K) K { // x$y
	yt := tp(y)
	if yt > Zt {
		return Ecr(17, l2(x, y))
	}
	if yt == ct {
		y, yt = Enl(y), Ct
	}
	if tp(x) != st || yt != Ct {
		trap(Type)
	}
	if int32(x) == 0 { // `$"sym"
		return sc(y)
	}
	return prs(ts(x), y)
}
func prs(t T, y K) K { // s$C
	r := K(0)
	yp, yn := int32(y), nn(y)
	p, e := pp, pe
	pp = yp
	pe = yp + yn
	tt := t & 15
	if tt == 2 {
		if t == Ct {
			return y // `C$
		} else {
			return Fst(y) // `c$"x"
		}
	}
	if t == 4 {
		r = Fst(tsym()) // `s$"`a"
	} else if t > 2 && t <= 6 {
		r = tnum()
		if tp(r) < t && r != 0 {
			r = uptype(r, t) // `f$"1"
		}
	}
	if t > Ct && t < Lt {
		if pp == pe {
			r = mk(t, 0) // `I$"" -> !0
		} else {
			if t == 20 {
				r = tsym() // `S$"`a`b"
			} else {
				r = tnms()
				if tp(r)&15 < t&15 && r != 0 {
					r = uptype(r, t&15) // `F$"1 2"
				}
			}
			if tp(r) == t-16 {
				r = Enl(r) // `I$"1" -> ,1
			}
		}
	}
	if tp(r) != t || pp < pe {
		dx(r)
		r = 0
	}
	pp, pe = p, e
	dx(y)
	return r //0(parse error)
}
func ts(x K) T {
	c := int32(Fst(cs(x)))
	for i := int32(521); i < 546; i++ {
		if I8(i) == c {
			return T(i - 520)
		}
		continue
	}
	trap(Value)
	return 0
}

func Rtp(y K, x K) K { // `c@ `i@ `s@ `f@ `z@ (reinterpret data)
	t := ts(y)
	xt := tp(x)
	t += T(16 * I32B(t < 16))
	if xt < 16 || t < 17 || t > Zt {
		trap(Type)
	}
	n := nn(x) * sz(xt)
	s := sz(t)
	if n%s != 0 {
		trap(Length)
	}
	x = use(x)
	SetI32(int32(x)-12, n/s)
	x = K(t)<<59 | K(int32(x))
	return x
}

/* from k_test.go
func sK(x K) string { //native Kst
	xp := int32(x)
	switch tp(x) {
	case 0:
		if x == 0 {
			return ""
		}
		s := []byte("0:+-*%&|<>=~!,^#_$?@.':/:\\:")
		var r string
		itoa := func(x int32) string { return strconv.Itoa(int(x)) }
		switch {
		case xp < 64:
			if xp < 23 {
				r = string(s[xp])
			} else {
				r = "`" + itoa(xp)
			}
			return r
		case xp < 128:
			if xp-64 < 23 {
				r = string(s[xp-64])
			} else {
				r = "`" + itoa(xp)
			}
			return r
		case xp == 211:
			return "@"
		case xp == 212:
			return "."
		case xp >= 448 && xp-448 < 23:
			return string(s[xp-448])
		default:
			return "`" + itoa(xp)
		}
	case ct:
		return strconv.Quote(string([]byte{byte(xp)}))
	case it:
		return strconv.Itoa(int(xp))
	case st:
		n := nn(K(I64(0)))
		if 8*n <= xp {
			panic("illegal symbol")
		}
		x = cs(x)
		dx(x)
		xp = int32(x)
		if nn(x) == 0 {
			return "`"
		}
		return "`" + string(Bytes[xp:xp+nn(x)])
	case ft:
		return sflt(F64(xp))
	case zt:
		return sflz(F64(xp), F64(xp+8))
	case cf:
		xn := nn(x)
		xp = int32(x) + 8*xn
		s := ""
		for i := int32(0); i < xn; i++ {
			xp -= 8
			s += sK(K(I64(xp)))
		}
		return s
	case df:
		a := []string{"'", "':", "/", "/:", "\\", "\\:"}
		r := sK(K(I64(xp)))
		p := I64(xp + 8)
		return r + a[int(p)]
	case pf:
		f := K(I64(xp))
		l := K(I64(xp + 8))
		i := K(I64(xp + 16))
		// if tp(f) == 0 && nn(i) == 1 && I32(int32(i)) == 1 {
		if nn(i) == 1 && I32(int32(i)) == 1 {
			return sK(K(I64(int32(l)))) + sK(f) // 1+
		}
		return "<prj>"
	case lf:
		x = K(I64(xp + 16))
		xp = int32(x)
		return string(Bytes[xp : xp+nn(x)])
	case Ct:
		return comma(1 == nn(x)) + strconv.Quote(string(Bytes[xp:xp+nn(x)]))
	case It:
		if nn(x) == 0 {
			return "!0"
		}
		r := make([]string, nn(x))
		for i := range r {
			r[i] = strconv.Itoa(int(I32(xp + 4*int32(i))))
		}
		return comma(1 == nn(x)) + strings.Join(r, " ")
	case St:
		r := make([]string, nn(x))
		for i := range r {
			r[i] = sK(K(I32(xp)) | K(st)<<59)
			xp += 4
		}
		if nn(x) == 0 {
			return "0#`"
		}
		return comma(1 == nn(x)) + strings.Join(r, "")
	case Ft:
		r := make([]string, nn(x))
		for i := range r {
			r[i] = sflt(F64(xp + 8*int32(i)))
		}
		return comma(1 == nn(x)) + strings.Join(r, " ")
	case Zt:
		r := make([]string, nn(x))
		for i := range r {
			r[i] = sflz(F64(xp), F64(xp+8))
			xp += 16
		}
		return comma(1 == nn(x)) + strings.Join(r, " ")
	case Lt:
		r := make([]string, nn(x))
		for i := range r {
			r[i] = sK(K(I64(xp)))
			xp += 8
		}
		if len(r) == 1 {
			return "," + r[0]
		} else {
			return "(" + strings.Join(r, ";") + ")"
		}
	case Dt:
		return sK(K(I64(xp))) + "!" + sK(K(I64(xp+8)))
	case Tt:
		return "+" + sK(K(I64(xp))) + "!" + sK(K(I64(xp+8)))
	default:
		fmt.Println("type ", tp(x))
		panic("type")
	}
}
func sflt(x float64) string {
	s := strconv.FormatFloat(x, 'g', -1, 64)
	if strings.Index(s, ".") < 0 {
		s += "."
	}
	switch {
	case math.IsInf(x, 1):
		return "0w"
	case math.IsInf(x, -1):
		return "-0w"
	case math.IsNaN(x):
		return "0n"
	default:
		return s
	}
}
func sflz(x, y float64) (s string) {
	phi := 180.0 / math.Pi * math.Atan2(y, x)
	r := math.Hypot(x, y)
	s = strconv.FormatFloat(r, 'g', -1, 64) + "a"
	if phi != 0 {
		s += sflt(phi)
	}
	return s
}
func comma(x bool) string {
	if x {
		return ","
	} else {
		return ""
	}
}
*/
package main

import (
	. "github.com/ktye/wg/module"
)

func main() { // _start
	kinit()
	doargs()
	write(Ku(2932601077199979)) // "ktye/k\n"
	store()
	for {
		write(Ku(32))
		x := read()
		try(x)
	}
}
func store() {
	g := (1 << (I32(128) - 16)) - Memorysize2()
	if g > 0 {
		Memorygrow2(g)
	}
	Memorycopy2(0, 0, int32(1)<<I32(128))
}
func catch() {
	Memorycopy3(0, 0, int32(65536)*Memorysize2())
}
func try(x K) {
	defer Catch(catch)
	repl(x)
	store()
}
func repl(x K) {
	n := nn(x)
	xp := int32(x)
	s := int32(0)
	if n > 0 {
		s = I8(xp)
		if I8(xp) == 92 && n > 1 { // \
			c := I8(1 + xp)
			if I8(1+xp) == '\\' {
				Exit(0)
			} else if c == 'm' {
				dx(x)
				dx(Out(Ki(I32(128))))
			}
			return
		}
	}
	x = val(x)
	if x != 0 {
		if s == 32 {
			dx(Out(x))
		} else {
			write(cat1(join(Kc(10), Lst(x)), Kc(10)))
		}
	}
}
func doargs() {
	a := ndrop(1, getargv())
	an := nn(a)
	ee := Ku(25901) // -e
	for i := int32(0); i < an; i++ {
		x := x0(a)
		if match(x, ee) != 0 { // -e (exit)
			if i < an-1 {
				dx(x)
				x = x1(a)
				dx(ee)
				repl(x)
			}
			Exit(0)
		}
		dofile(x, readfile(rx(x)))
		a += 8
	}
	dx(ee)
}
func dofile(x K, c K) {
	kk := Ku(27438) // .k
	tt := Ku(29742) // .t
	xe := ntake(-2, rx(x))
	if match(xe, kk) != 0 { // file.k (execute)
		dx(val(c))
	} else if match(xe, tt) != 0 { // file.t (test)
		test(c)
	} else { // file (assign file:bytes..)
		dx(Asn(sc(rx(x)), c))
	}
	dx(xe)
	dx(x)
	dx(tt)
	dx(kk)
}

func Out(x K) K {
	write(cat1(Kst(rx(x)), Kc(10)))
	return x
}
func Otu(x, y K) K {
	write(cat1(Kst(x), Kc(':')))
	return Out(y)
}
func read() K {
	r := mk(Ct, 504)
	return ntake(ReadIn(int32(r), 504), r)
}
func write(x K) {
	Write(0, 0, int32(x), nn(x))
	dx(x)
}
func getargv() K {
	n := Args()
	r := mk(Lt, n)
	rp := int32(r)
	for i := int32(0); i < n; i++ {
		s := mk(Ct, Arg(i, 0))
		Arg(i, int32(s))
		SetI64(rp, int64(s))
		rp += 8
	}
	return r
}
func readfile(x K) K { // x C
	r := K(0)
	if nn(x) == 0 {
		r = mk(Ct, 496)
		r = ntake(ReadIn(int32(r), 496), r)
		return r
	}
	n := Read(int32(x), nn(x), 0)
	if n < 0 {
		dx(x)
		return mk(Ct, 0)
	}
	r = mk(Ct, n)
	Read(int32(x), nn(x), int32(r))
	dx(x)
	return r
}
func writefile(x, y K) K { // x, y C
	r := Write(int32(x), nn(x), int32(y), nn(y))
	if r != 0 {
		trap(Io)
	}
	dx(x)
	return y
}
package main

func test(x K) {
	if tp(x) != Ct {
		trap(Type)
	}
	l := ndrop(-1, split(Kc(10), rx(x)))
	n := nn(l)
	dx(l)
	for i := int32(0); i < n; i++ {
		testi(rx(x), i)
	}
	dx(x)
}
func testi(l K, i int32) {
	x := split(Ku(12064), ati(split(Kc(10), l), i))
	if nn(x) != 2 {
		trap(Length)
	}
	y := x1(x)
	x = r0(x)
	dx(Out(ucat(ucat(rx(x), Ku(12064)), rx(y))))
	x = Kst(val(x))
	if match(x, y) == 0 {
		x = Out(x)
		trap(Err)
	}
	dx(x)
	dx(y)
}
package main

import (
	. "github.com/ktye/wg/module"
)

type ftok = func() K

func tok(x K) K {
	s := cat1(src(), Kc(10))
	pp = nn(s)
	s = Cat(s, x)  // src contains all src
	pp += int32(s) // pp is the parser position within src
	pe = pp + nn(x)
	r := mk(Lt, 0)
	for {
		ws()
		if pp == pe {
			break
		}
		for i := int32(193); i < 199; i++ { // tchr, tnms, tvrb, tpct, tvar, tsym
			y := Func[i].(ftok)()
			if y != 0 {
				y |= K(int64(pp-int32(s)) << 32)
				r = cat1(r, y)
				break
			}
			if i == 198 { // last-1
				trap(Parse)
			}
		}
	}
	SetI64(552, int64(s))
	return r
}
func src() K { return K(I64(552)) }
func tchr() K {
	if I8(pp) == '0' && pp < pe { // 0x01ab (lower case only)
		if I8(1+pp) == 'x' {
			pp += 2
			return thex()
		}
	}
	if I8(pp) != 34 {
		return 0
	}
	pp++
	r := mk(Ct, 0)
	q := uint32(0)
	for {
		if pp == pe {
			trap(Parse)
		}
		c := I8(pp)
		pp++
		if c == 34 && q == 0 {
			break
		}
		if c == '\\' && q == 0 {
			q = 1
			continue
		}
		if q != 0 {
			c = cq(c)
			q = 0
		}
		r = cat1(r, Kc(c))
	}
	if nn(r) == 1 {
		return Fst(r)
	}
	return r
}
func cq(c int32) int32 { // \t \n \r \" \\   -> 9 10 13 34 92
	if c == 116 {
		return 9
	}
	if c == 110 {
		return 10
	}
	if c == 114 {
		return 13
	}
	return c
}
func thex() K {
	r := mk(Ct, 0)
	for pp < pe-1 {
		c := I8(pp)
		if is(c, 128) == 0 {
			break
		}
		r = cat1(r, Kc((hx(c)<<4)+hx(I8(1+pp))))
		pp += 2
	}
	if nn(r) == 1 {
		return Fst(r)
	}
	return r
}
func hx(c int32) int32 {
	if is(c, 4) != 0 {
		return c - '0'
	} else {
		return c - 'W'
	}
}
func tnms() K {
	r := tnum()
	for pp < pe-1 && I8(pp) == ' ' {
		pp++
		x := tnum()
		if x == 0 {
			break
		}
		r = ncat(r, x)
	}
	return r
}
func tnum() K {
	c := I8(pp)
	if c == '-' || c == '.' {
		if is(I8(pp-1), 64) != 0 {
			return 0 // e.g. x-1 is (x - 1) not (x -1)
		}
	}
	if c == '-' && pp < 1+pe {
		pp++
		r := tunm()
		if r == 0 {
			pp--
			return 0
		}
		return Neg(r)
	}
	return tunm()
}
func tunm() K {
	p := pp
	r := pu()
	if r == 0 && p == pp {
		if I8(p) == '.' {
			if is(I8(1+p), 4) != 0 {
				return pflt(r)
			}
		}
		return 0
	}
	if pp < pe {
		c := I8(pp)
		if c == '.' {
			return pflt(r)
		}
		if c == 'p' {
			return ppi(float64(r))
		}
		if c == 'a' {
			return pflz(float64(r))
		}
		if c == 'e' || c == 'E' {
			return Kf(pexp(float64(r)))
		}
		if r == 0 {
			if c == 'N' {
				pp++
				return missing(it)
			}
			if c == 'n' || c == 'w' {
				q := Kf(0)
				SetI64(int32(q), int64(0x7FF8000000000001)) // 0n
				if c == 'w' {
					SetF64(int32(q), inf) // 0w
				}
				pp++
				if pp < pe && I8(pp) == 'a' {
					dx(q)
					return pflz(F64(int32(q)))
				}
				return q
			}
		}
	}
	return Ki(int32(r))
}
func pu() int64 {
	r := int64(0)
	for pp < pe {
		c := I8(pp)
		if is(c, 4) == 0 {
			break
		}
		r = 10*r + int64(c-'0')
		pp++
	}
	return r
}
func pexp(f float64) float64 {
	pp++
	e := int64(1)
	if pp < pe {
		c := I8(pp)
		if c == '-' || c == '+' {
			if c == '-' {
				e = int64(-1)
			}
			pp++
		}
	}
	e *= pu()
	return f * pow(10.0, float64(e))
}
func pflt(i int64) K {
	c := int32(0)
	d := 1.0
	f := float64(i)
	pp++ // .
	for pp < pe {
		c = I8(pp)
		if is(c, 4) == 0 {
			break
		}
		d /= 10.0
		f += d * float64(c-'0')
		pp++
	}
	if pp < pe {
		c = I8(pp)
		if c == 'e' || c == 'E' {
			f = pexp(f)
		}
	}
	if pp < pe {
		c = I8(pp)
		if c == 'a' {
			return pflz(f)
		}
		if c == 'p' {
			return ppi(f)
		}
	}
	return Kf(f)
}
func pflz(f float64) K {
	r := K(0)
	pp++
	if pp < pe {
		r = tunm()
	}
	return Rot(Kf(f), r)
}
func ppi(f float64) K {
	pp++
	return Kf(pi * f)
}

func tvrb() K {
	c := I8(pp)
	if is(c, 1) == 0 {
		return 0
	}
	pp++
	if c == 92 && I8(pp-2) == 32 { // \out
		return K(29)
	}
	o := int32(1)
	if pp < pe {
		if I8(pp) == 58 { // :
			pp++
			if is(c, 8) != 0 {
				trap(Parse)
			}
			o = 97
			/*
				if is(c, 8) != 0 {
					o = 2 // ':
				} else {
					o = 97 // +:
				}
			*/
		}
	}
	return K(o + idx(c, 228, 253))
}
func tpct() K {
	c := I8(pp)
	if is(c, 48) != 0 { // ([{}]); \n
		pp++
		return K(c)
	}
	if c == 10 {
		pp++
		return K(';')
	}
	return 0
}
func tvar() K {
	c := I8(pp)
	if is(c, 2) == 0 {
		return 0
	}
	pp++
	r := Ku(uint64(c))
	for pp < pe {
		c = I8(pp)
		if is(c, 6) == 0 {
			break
		}
		r = cat1(r, K(c)|K(ct)<<59)
		pp++
	}
	return sc(r)
}
func tsym() K {
	r := K(0)
	for I8(pp) == 96 {
		pp++
		if r == 0 {
			r = mk(St, 0)
		}
		s := K(0)
		if pp < pe {
			s = tchr()
			if tp(s) == ct {
				s = sc(Enl(s))
			} else if s != 0 {
				s = sc(s)
			} else {
				s = tvar()
			}
		}
		if s == 0 {
			s = K(st) << 59
		}
		r = cat1(r, s)
		if pp == pe {
			break
		}
	}
	return r
}
func ws() {
	c := int32(0)
	for pp < pe {
		c = I8(pp)
		if c == 10 || c > 32 {
			break
		}
		pp++
	}
	for pp < pe {
		c = I8(pp)
		if c == 47 && I8(pp-1) < 33 {
			pp++
			for pp < pe {
				c = I8(pp)
				if c == 10 {
					break
				}
				pp++
			}
		} else {
			return
		}
	}
}
func is(x, m int32) int32 { return m & I8(100+x) }
package main

import (
	. "github.com/ktye/wg/module"
)

func nyi(x K) K { return trap(Nyi) }
func Idy(x K) K { return x } // :x
func Dex(x, y K) K { // x:y
	dx(x)
	return y
}
func Flp(x K) K { // +x
	xt := tp(x)
	switch xt - Lt {
	case 0: // Lt   n:#x;  m:|/#x (,/m#/:x)[(!m)+\:m*!n]
		n := nn(x)
		xp := int32(x)
		m := Ki(maxcount(xp, n))
		x = Atx(Rdc(13, l1(Ecr(15, l2(m, x)))), Ecl(2, l2(Til(m), Mul(m, Til(Ki(n))))))
		return x
	case 1: // Dt
		return td(x)
	case 2: // Tt
		t := x0(x)
		return Key(t, r1(x))
	default:
		return x
	}
}
func maxcount(xp int32, n int32) int32 { // |/#l
	r := int32(0)
	for i := int32(0); i < n; i++ {
		x := K(I64(xp))
		xp += 8
		if tp(x) < 16 {
			r = maxi(1, r)
		} else {
			r = maxi(nn(x), r)
		}
	}
	return r
}
func Fst(x K) K { // *x
	t := tp(x)
	if t < 16 {
		return x
	}
	if t == Dt {
		return Fst(Val(x))
	}
	return ati(x, 0)
}
func Las(x K) K { // *|x
	t := tp(x)
	if t < 16 {
		return x
	}
	if t == Dt {
		x = Val(x)
	}
	n := nn(x)
	if n == 0 {
		return Fst(x)
	}
	return ati(x, n-1)
}

func Cnt(x K) K { // #x
	t := tp(x)
	dx(x)
	if t < 16 {
		return Ki(1)
	}
	return Ki(nn(x))
}
func Not(x K) K { // ~x
	if tp(x)&15 == st {
		x = Eql(Ks(0), x)
	} else {
		x = Eql(Ki(0), x)
	}
	return x
}
func Til(x K) K {
	xt := tp(x)
	if xt > Lt {
		t := x0(x)
		dx(x)
		return t
	}
	if xt == it {
		return seq(int32(x))
	}
	if xt == It {
		return kx(120, x) // odo
	}
	return trap(Type)
}
func seq(n int32) K {
	n = maxi(n, 0)
	r := mk(It, n)
	if n == 0 {
		return r
	}
	seqi(int32(r), ep(r))
	return r
}
func seqi(p, e int32) {
	i := int32(0)
	for p < e {
		SetI32(p, i)
		i++
		p += 4
		continue
	}
}
func Unq(x K) K { // ?x
	r := K(0)
	xt := tp(x)
	if xt < 16 {
		return roll(x)
	}
	if xt >= Lt {
		if xt == Dt {
			trap(Type)
		}
		if xt == Tt {
			r = x0(x)
			x = r1(x)
			return key(r, Flp(Unq(Flp(x))), xt)
		}
		return kx(96, x) // .uqf
	}
	xn := nn(x)
	r = mk(xt, 0)
	for i := int32(0); i < xn; i++ {
		xi := ati(rx(x), i)
		if int32(In(rx(xi), rx(r))) == 0 {
			r = cat1(r, xi)
		} else {
			dx(xi)
		}
	}
	dx(x)
	return r
}
func Uqs(x K) K { // ?^x
	xt := tp(x)
	if xt < 16 {
		trap(Type)
	}
	return kx(88, x) // .uqs
}
func Grp(x K) K { return kx(128, x) } // =x grp.
func grp(x, y K) K { // s?T
	x = rx(x)
	y = rx(y)
	return Atx(Drp(x, y), Grp(Atx(y, x)))
}
func Key(x, y K) K { return key(x, y, Dt) } // x!y
func key(x, y K, t T) K { // Dt or Tt
	xt := tp(x)
	yt := tp(y)
	if xt < 16 {
		if xt == it {
			return Mod(y, x)
		}
		if xt == st {
			if yt == Tt {
				return keyt(x, y) // s!t
			}
		}
		x = Enl(x) //allow `a!,1 2 3 short for (`a)!,1 2 3
	}
	xn := nn(x)
	if t == Tt {
		if xn > 0 {
			xn = nn(K(I64(int32(y))))
		}
	} else if xn != nn(y) {
		trap(Length)
	} else if yt < 16 {
		trap(Type)
	}
	x = l2(x, y)
	SetI32(int32(x)-12, xn)
	return K(int32(x)) | K(t)<<59
}
func keyt(x, y K) K { // `s!t (key table: (`s#t)!`s_t)
	x = rx(x)
	y = rx(y)
	return Key(Tak(x, y), Drp(x, y))
}

func Tak(x, y K) K { // x#y
	xt := tp(x)
	yt := tp(y)
	if yt == Dt {
		x = rx(x)
		if xt == it {
			r := x0(y)
			y = r1(y)
			r = Tak(x, r)
			y = Tak(x, y)
			return Key(r, y)
		} else {
			return Key(x, Atx(y, x))
		}
	} else if yt == Tt {
		if xt&15 == st {
			if xt == st {
				x = Enl(x)
			}
			x = rx(x)
			return key(x, Atx(y, x), yt)
		} else {
			return Ecr(15, l2(x, y))
		}
	}
	if xt == it {
		return ntake(int32(x), y)
	}
	y = rx(y)
	if xt > 16 && xt == yt {
		return atv(y, Wer(In(y, x))) // set take
	}
	return Atx(y, Wer(Cal(x, l1(y)))) // f#
}
func ntake(n int32, y K) K {
	r := K(0)
	t := tp(y)
	if n == nai {
		if t < 16 {
			n = 1
		} else {
			n = nn(y)
		}
	}
	if n < 0 {
		if tp(y) < 16 {
			return ntake(-n, y)
		}
		n += nn(y)
		if n < 0 {
			return ucat(ntake(-n, missing(t-16)), y)
		}
		return ndrop(n, y)
	}
	yp := int32(y)
	if t < 5 {
		t += 16
		r = mk(t, n)
		s := sz(t)
		rp := int32(r)
		if s == 1 {
			Memoryfill(rp, yp, n)
		} else {
			for i := int32(0); i < n; i++ {
				SetI32(rp, yp)
				rp += 4
			}
		}
		return r
	} else if t == ft {
		r = mk(Ft, n)
		rp := int32(r)
		f := F64(yp)
		for i := int32(0); i < n; i++ {
			SetF64(rp, f)
			rp += 8
		}
		dx(y)
		return r
	} else if t == zt {
		r = mk(Zt, n)
		rp := int32(r)
		re, im := F64(yp), F64(yp+8)
		for i := int32(0); i < n; i++ {
			SetF64(rp, re)
			SetF64(rp+8, im)
			rp += 16
		}
		dx(y)
		return r
	} else if t < 16 {
		r = mk(Lt, n)
		rp := int32(r)
		for i := int32(0); i < n; i++ {
			SetI64(rp, int64(rx(y)))
			rp += 8
		}
		dx(y)
		return r
	}
	yn := nn(y)

	s := sz(t)
	if I32(yp-4) == 1 && bucket(s*yn) == bucket(s*n) && n <= yn && t < Lt {
		SetI32(yp-12, n)
		return y
	}

	r = seq(n)
	if n > yn && yn > 0 {
		r = idiv(r, Ki(yn), 1)
	}
	return atv(y, r)
}
func Drp(x, y K) K { // x_y
	xt := tp(x)
	yt := tp(y)
	if yt > Lt {
		if yt == Dt || (yt == Tt && xt&15 == st) {
			r := x0(y)
			y = r1(y)
			if xt < 16 {
				x = Enl(x)
			}
			x = rx(Wer(Not(In(rx(r), x))))
			return key(Atx(r, x), Atx(y, x), yt)
		} else {
			return Ecr(16, l2(x, y))
		}
	}
	if xt == it {
		return ndrop(int32(x), y)
	}
	if xt > 16 && xt == yt {
		return atv(y, Wer(Not(In(rx(y), x)))) // set drop
	}
	if yt == it {
		return atv(x, Wer(Not(Eql(y, seq(nn(x))))))
	}
	return Atx(y, Wer(Not(Cal(x, l1(rx(y)))))) // f#
}
func ndrop(n int32, y K) K {
	r := K(0)
	yt := tp(y)
	if yt < 16 || yt > Lt {
		trap(Type)
	}
	yn := nn(y)
	if n < 0 {
		return ntake(maxi(0, yn+n), y)
	}
	rn := yn - n
	if rn < 0 {
		dx(y)
		return mk(yt, 0)
	}
	s := sz(yt)
	yp := int32(y)
	if I32(yp-4) == 1 && bucket(s*yn) == bucket(s*rn) && yt < Lt {
		r = rx(y)
		SetI32(yp-12, rn)
	} else {
		r = mk(yt, rn)
	}
	rp := int32(r)
	Memorycopy(rp, yp+s*n, s*rn)
	if yt == Lt {
		rl(r)
		r = uf(r)
	}
	dx(y)
	return r
}

func Cut(x, y K) K { // x^y
	yt := tp(y)
	if yt == it || yt == ft {
		return Pow(y, x)
	}
	xt := tp(x)
	if xt == It {
		return cuts(x, y)
	}
	if xt == Ct && yt == Ct { // "set"^"abc"
		x = rx(Wer(In(rx(y), x)))
		return rcut(y, Cat(Ki(0), Add(Ki(1), x)), Cat(x, Ki(nn(y))))
	}
	if xt != it || yt < 16 {
		trap(Type)
	}
	xp := int32(x)
	if xp <= 0 {
		xp = nn(y) / -xp
	}
	r := mk(Lt, xp)
	rp := int32(r)
	e := ep(r)
	n := nn(y) / xp
	x = seq(n)
	for rp < e {
		SetI64(rp, int64(atv(rx(y), rx(x))))
		x = Add(Ki(n), x)
		rp += 8
		continue
	}
	dx(x)
	dx(y)
	return r
}
func cuts(x, y K) K { return rcut(y, x, cat1(ndrop(1, rx(x)), Ki(nn(y)))) }
func rcut(x, a, b K) K { // a, b start-stop ranges
	n := nn(a)
	ap, bp := int32(a), int32(b)
	r := mk(Lt, n)
	rp := int32(r)
	for i := int32(0); i < n; i++ {
		o := I32(ap)
		n := I32(bp) - o
		if n < 0 {
			trap(Value)
		}
		SetI64(rp, int64(atv(rx(x), Add(Ki(o), seq(n)))))
		rp += 8
		ap += 4
		bp += 4
	}
	dx(a)
	dx(b)
	dx(x)
	return r
}
func split(x, y K) K {
	xt, yt := tp(x), tp(y)
	xn := int32(1)
	if yt == xt+16 {
		x = Wer(Eql(x, rx(y)))
	} else {
		if xt == yt && xt == Ct {
			xn = nn(x)
			x = Find(x, rx(y))
		} else {
			trap(Type)
		}
	}
	x = rx(x)
	return rcut(y, Cat(Ki(0), Add(Ki(xn), x)), cat1(x, Ki(nn(y))))
}
func join(x, y K) K {
	xt := tp(x)
	if xt < 16 {
		x = Enl(x)
		xt = tp(x)
	}
	yt := tp(y)
	if yt != Lt {
		trap(Type)
	}
	yp := int32(y)
	yn := nn(y)
	r := mk(xt, 0)
	for i := int32(0); i < yn; i++ {
		v := x0(K(yp))
		if tp(v) != xt {
			trap(Type)
		}
		if i > 0 {
			r = ucat(r, rx(x))
		}
		r = ucat(r, v)
		yp += 8
	}
	dx(x)
	dx(y)
	return r
}
func lin(x, y, z K) K { return cal(Val(Ks(112)), l3(x, y, z)) } // x y'z  (z.k: `".lin")
func Bin(x, y K) K { // x'y
	r := K(0)
	xt := tp(x)
	yt := tp(y)
	if xt < 16 || xt > Ft { // n' win?
		if xt == it && yt > 16 {
			return win(int32(x), y)
		} else {
			return trap(Type)
		}
	}
	if xt == yt || yt == Lt {
		return Ecr(40, l2(x, y))
	} else if xt == yt+16 {
		r = Ki(ibin(x, y, xt))
	} else {
		trap(Type)
	}
	dx(x)
	dx(y)
	return r
}
func ibin(x, y K, t T) int32 {
	h := int32(0)
	k := int32(0)
	n := nn(x)
	xp := int32(x)
	yp := int32(y)
	j := n - 1
	s := sz(t)
	switch s >> 2 {
	case 0:
		for {
			if k > j {
				return k - 1
			}
			h = (k + j) >> 1
			if I8(xp+h) > yp {
				j = h - 1
			} else {
				k = h + 1
			}
		}
	case 1:
		for {
			if k > j {
				return k - 1
			}
			h = (k + j) >> 1
			if I32(xp+4*h) > yp {
				j = h - 1
			} else {
				k = h + 1
			}
		}
	default:
		f := F64(yp)
		for {
			if k > j {
				return k - 1
			}
			h = (k + j) >> 1
			if F64(xp+8*h) > f {
				j = h - 1
			} else {
				k = h + 1
			}
		}
	}
	return 0 // not reached
}
func win(n int32, x K) K {
	y := seq(n)
	r := mk(Lt, 0)
	m := 1 + nn(x) - n
	for i := int32(0); i < m; i++ {
		r = ucat(r, l1(atv(rx(x), rx(y))))
		y = Add(Ki(1), y)
	}
	dx(x)
	dx(y)
	return r
}

func Flr(x K) K { // _x
	r := K(0)
	rp := int32(0)
	xt := tp(x)
	xp := int32(x)
	if xt < 16 {
		switch xt - 2 {
		case 0: // c
			return Kc(lc(xp))
		case 1: // i
			return Kc(xp)
		case 2: // s
			return Ki(int32(xp))
		case 3: // f
			dx(x)
			return Ki(int32(F64floor(F64(xp))))
		case 4: // z
			dx(x)
			return Kf(F64(xp))
		default:
			return x
		}
	}
	xn := nn(x)
	switch xt - 18 {
	case 0: //C
		return lower(x)
	case 1: //I
		r = mk(Ct, xn)
		rp = int32(r)
		e := rp + xn
		for rp < e {
			SetI8(rp, I32(xp))
			xp += 4
			rp++
		}
	case 2: //S
		x = use(x)
		return K(int32(x)) | K(It)<<59
		//return Ech(16, l1(x))
	case 3: //F
		r = mk(It, xn)
		rp = int32(r)
		for i := int32(0); i < xn; i++ {
			SetI32(rp, int32(F64floor(F64(xp))))
			xp += 8
			rp += 4
		}
	case 4: // Z
		r = mk(Ft, xn)
		rp = int32(r)
		for i := int32(0); i < xn; i++ {
			SetI64(rp, I64(xp))
			xp += 16
			rp += 8
		}
	default: // L/D/T
		return Ech(16, l1(x))
	}
	dx(x)
	return r
}
func lower(x K) K {
	x = use(x)
	p := int32(x)
	e := p + nn(x)
	for p < e {
		SetI8(p, lc(I8(p)))
		p++
	}
	return x
}
func lc(x int32) int32 {
	if x >= 'A' && x <= 'Z' {
		return x + 32
	} else {
		return x
	}
}

func Rev(x K) K { // |x
	r := K(0)
	t := tp(x)
	if t < 16 {
		return x
	}
	if t == Dt {
		r = x0(x)
		return Key(Rev(r), Rev(r1(x)))
	}
	xn := nn(x)
	if xn < 2 {
		return x
	}
	r = mk(It, xn)
	rp := int32(r) + 4*xn
	for i := int32(0); i < xn; i++ {
		rp -= 4
		SetI32(rp, i)
	}
	return atv(x, r)
}

func Wer(x K) K { // &x
	r := K(0)
	t := tp(x)
	if t < 16 {
		x = Enl(x)
		t = tp(x)
	}
	if t == Dt {
		r = x0(x)
		return Atx(r, Wer(r1(x)))
	}
	xn := nn(x)
	xp := int32(x)
	if t == It {
		n := sumi(xp, xn)
		r = mk(It, n)
		rp := int32(r)
		for i := int32(0); i < xn; i++ {
			j := I32(xp)
			for k := int32(0); k < j; k++ {
				SetI32(rp, i)
				rp += 4
			}
			xp += 4
		}
	} else if xn == 0 {
		r = mk(It, 0)
	} else {
		r = trap(Type)
	}
	dx(x)
	return r
}
func Fwh(x K) K { // *&x
	t := tp(x)
	if t == It {
		dx(x)
		return Ki(fwh(int32(x), nn(x)))
	}
	return Fst(Wer(x))
}
func fwh(xp, n int32) int32 { // *&I
	p := xp
	e := xp + 4*n
	for p < e {
		if I8(p) != 0 {
			return (p - xp) >> 2
		}
		p += 4
	}
	return nai
}

func Typ(x K) K { // @x
	dx(x)
	return sc(Enl(Kc(I8(520 + int32(tp(x))))))
}
func Tok(x K) K { // `t@"src"
	if tp(x) == Ct {
		return tok(x)
	} else {
		return x
	}
}
func Val(x K) K {
	r := K(0)
	xt := tp(x)
	if xt == st {
		return lup(x)
	}
	if xt == Ct {
		return val(x)
	}
	if xt == lf || xt == xf { // lambda: (code;locals;string;arity)
		//xp := int32(x)  // native: (ptr;string;arity)
		r = l2(x0(x), x1(x))
		if xt == lf {
			r = cat1(r, x2(x))
		}
		r = cat1(r, Ki(nn(x)))
		dx(x)
		return r
	}
	if xt == Lt {
		if I64(ep(x)-8) != 320 {
			x = cat1(x, 320)
		}
		return exec(x) // .L e.g. 1+2 is (1;2;`66)
	}
	if xt > Lt {
		r = x1(x)
		dx(x)
		return r
	} else {
		return trap(Type)
	}
}
func val(x K) K {
	x = parse(tok(x))
	xn := nn(x)
	xp := int32(x) + 8*(xn-2) //8*(xn-1)
	a := int32(0)
	if xn > 2 && I64(xp) == 64 {
		a = 1
	}
	x = exec(x)
	if a != 0 {
		dx(x)
		return 0
	}
	return x
}
func Enc(x, y K) K { // x\\y
	xt := tp(x)
	n := int32(0)
	if xt == It {
		n = nn(x)
	}
	r := mk(It, 0)
	yn := int32(Cnt(rx(y)))
l:
	for {
		n--
		xi := ati(rx(x), n)
		r = Cat(r, Enl(idiv(rx(y), xi, 1)))
		y = idiv(y, xi, 0)
		if n == 0 || (n < 0 && int32(y) == 0) {
			break
		}
		if tp(y) > 16 && n < 0 {
			if sumi(int32(y), yn) == 0 {
				break l
			}
		}
	}
	dx(x)
	dx(y)
	return Rev(r)
}
func Dec(x, y K) K { // x//y   {z+x*y}/[0;x;y]
	if tp(y) < 16 {
		trap(Type)
	}
	r := Fst(rx(y))
	n := nn(y)
	for i := int32(1); i < n; i++ {
		r = Add(ati(rx(y), i), Mul(ati(rx(x), i), r))
	}
	dx(x)
	dx(y)
	return r
}
func sumi(xp, xn int32) int32 {
	r := int32(0)
	e := xp + 4*xn
	for xp < e {
		r += I32(xp)
		xp += 4
	}
	return r
}
package main

import . "github.com/ktye/wg/module"

func zk() {
	Data(600, "``x`y`z`k`l`a`b`while`\"rf.\"`\"rz.\"`\"uqs.\"`\"uqf.\"`\"gdt.\"`\"lin.\"`\"odo.\"`\"grp.\"\n`\"x.\":{,/+\"0123456789abcdef\"@(x%16;16!x:256!256+x)}\n`\"t.\":`45\n`\"p.\":`46\n`\"c.\":(`46)[`c;]\n`\"i.\":(`46)[`i;]\n`\"s.\":(`46)[`s;]\n`\"f.\":(`46)[`f;]\n`\"z.\":(`46)[`z;]\n`\"uqs.\":{x@&1,1_~x~'x@-1+!#x:^x}\n`\"uqf.\":{x@&(!#x)=x?x}\n`\"gdt.\":{[t;g]($[g;{x@>y x};{x@<y x}])/(,!#t),|.t}\n`\"odo.\":{{y@(#y)!!x}/[*/x;&'x#'|*\\-1_1,|x]}\n`\"grp.\":{(x@*'g)!g:(&~a~'a@-1+!#a:x i)^i:<x}\nabs:`32;sin:`44;cos:`39;find:`31;imag:`33;conj:`34;angle:`35;exp:`42;log:`43\n`\"pad.\":{x@\\!|/#'x}\n`\"lxy.\":{\nkt:{[x;y;k;T]x:$[`T~@x;T[x;k];`pad(\"\";\"-\"),$x];(x,'\"|\"),'T[y;k]}\nd:{[x;k;kt;T]r:!x;x:.x;$[`T~@x;kt[r;x;k;T];,'[,'[`pad(k'r);\"|\"];k'x]]}\nT:{[x;k]$[`L?@'.x;,k x;(,*x),(,(#*x)#\"-\"),1_x:\" \"/'+`pad@'$(!x),'.x]}\nt:@y;k:`kxy@*x;h:*|x\ndd:(\"\";,\"..\")h<#y:$[(@y)?`L`D`T;y;y~*y;y;[t:`L;,y]]\ny:$[y~*y;y;(h&#y)#y]\n$[`D~t;d[y;k;kt;T];`T~t;T[y;k];y~*y;,k y;k'y],dd}\n`\"l.\":`lxy 70 20\n`\"str.\":{q:{c,(\"\\\\\"/(0,i)^@[x;i;(qs!\"tnr\\\"\\\\\")x i:&x?\\qs:\"\\t\\n\\r\\\"\\\\\"]),c:_34}\n$[|/x?\\\"\\t\\n\\r\"__!31;\"0x\",`x@x;q x]}\n`\"kxy.\":{\na:{t:@x;x:$x;$[`c~t;`str x;`s~t;\"`\",x;x]}\nd:{[x;k]r:\"!\",k@.x;n:#!x;x:k@!x;$[(n<2)|(@.x)?`D`T;\"(\",x,\")\";x],r}\nv:{[x;k;m]t:@x;x:(m&n:#x)#x\nx:$[`L~t;k'x;`C~t;x;$x]\nx:$[`C~t;`str x;`S~t;c,(c:\"`\")/x;`L~t;$[1~n;*x;\"(\",(\";\"/x),\")\"];\" \"/x]\n$[m<#x:((\"\";\",\")(1~n)),x;((m-2)#x),\"..\";x]}\nt:@y;k:`kxy x\n$[`T~t;\"+\",d[+y;k];`D~t;d[y;k];0~#y;(.`\".kst0\")@t;y~*y;a y;v[y;k;x]]}\n`\".kst0\":`C`I`S`F`Z`L!(c,c:_34;\"!0\";\"0#`\";\"0#0.\";\"0#0a\";\"()\")\n`\"k.\":`kxy 1000000\n`\"rf.\": {.5+(x?0)%4294967295.}\n`\"rf1.\":{.5+(1.+x?0)%4294967295.}        \n`\"rz.\": {(%-2*log `rf1 x)@360.*`rf x}\n`\"d.\":{x-(*x),-1_x}\n`\"lin.\":{$[`L~@z;(.`\"lin.\")[x;y]'z;[dx:0.+1_`d x;dy:0.+1_`d y;b:(-2+#x)&0|x'z;(y b)+(dy b)*(z-x b)%dx b]]}\n")
	zn := int32(1708) // should end before 4k
	x := mk(Ct, zn)
	Memorycopy(int32(x), 600, zn)
	dx(Val(x))
}
