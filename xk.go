package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"math"
	"math/cmplx"
	"os"
	"strings"
)

// [symtab]
// i32  symtab data size
// u8   symtab 0-joined-utf-8
// i32  nt:number of tables
// [table * nt]
// i32  table name (symtab index)
// i32  nc:column number
// i32  nr:row count
// S    table header
// [column * nc]
// u8   type "cifz"
// i32|f64 data
// [x.k]
// i32  ns:size
// u8*ns   text

var wc io.Writer

func main() {
	var d data
	a := os.Args[1:]
	if len(a) < 1 {
		fmt.Println("usage: xk file.xk [table]")
		os.Exit(1)
	}
	wc = io.Discard
	if len(a) > 1 && a[1] == "check" {
		wc = os.Stdout
	}
	b, e := os.ReadFile(a[0])
	fatal(e)
	d = decode(bytes.NewReader(b))
	if len(a) == 1 {
		list(d)
		return
	}
	if s := a[1]; s == "x.k" {
		fmt.Println(d.prog)
	} else if s == "test" { //roundtrip
		test(d, b)
	} else {
		for _, t := range d.t {
			if t.name == s {
				printab(t)
			}
		}
	}
}
func fatal(e error) {
	if e != nil {
		panic(e)
	}
}
func list(d data) {
	for _, t := range d.t {
		fmt.Println(t.name, t.n, len(t.h))
	}
	fmt.Println("x.k", len(d.prog))
}
func printab(t table) {
	fmt.Println(strings.Join(t.h, "\t"))
	for i, tp := range t.t {
		if i > 0 {
			fmt.Printf("\t")
		}
		if tp == 'z' {
			fmt.Printf("r\ta")
		} else {
			fmt.Printf("%c", tp)
		}
	}
	fmt.Println()
	for i := int32(0); i < t.n; i++ {
		for j, tp := range t.t {
			if i > 0 {
				fmt.Printf("\t")
			}
			if tp == 's' {
				v := t.d[j].([]string)
				fmt.Print(v[i])
			} else if tp == 'i' {
				v := t.d[j].([]int32)
				fmt.Print(v[i])
			} else if tp == 'f' {
				v := t.d[j].([]float64)
				fmt.Print(v[i])
			} else {
				v := t.d[j].([]complex128)
				r, p := cmplx.Polar(v[i])
				p *= 180.0 / math.Pi
				if p < 0 {
					p += 360
				}
				fmt.Printf("%v\t%v", r, p)
			}
		}
		fmt.Println()
	}
}
func test(d data, b []byte) {
	var u bytes.Buffer
	d.encode(&u)
	g := u.Bytes()
	if len(g) != len(b) {
		fmt.Printf("length differs: %d %d\n", len(b), len(g))
		os.Exit(1)
	}
	for i := range b {
		if b[i] != g[i] {
			fmt.Printf("byte %d differs: %d %d\n", i, b[i], g[i])
			os.Exit(1)
		}
	}
	fmt.Println("test encode ok")
}

func decode(r io.Reader) (d data) {
	b := make([]byte, n(r))
	fmt.Fprintf(wc, "symtab %d bytes ", len(b))
	r.Read(b)
	sym := bytes.Split(b, []byte{0})
	fmt.Fprintf(wc, "%d symbols\n", len(sym))
	tab := make(map[int32]string)
	for i, s := range sym {
		tab[int32(i)] = string(s)
	}
	d.t = make([]table, n(r))
	fmt.Fprintf(wc, "tables: %d\n", len(d.t))
	for i := range d.t {
		fmt.Fprintf(wc, "[table %d]\n", i)
		d.t[i] = decodeTable(r, tab)
	}
	b = make([]byte, n(r))
	fmt.Fprintf(wc, "src: %d\n", len(b))
	r.Read(b)
	d.prog = string(b)
	return d
}
func decodeTable(r io.Reader, tab map[int32]string) (t table) {
	t.name = tab[n(r)]
	fmt.Fprintf(wc, "name: %s\n", t.name)
	t.h = make([]string, n(r))
	fmt.Fprintf(wc, "columns: %d\n", len(t.h))
	t.n = n(r)
	fmt.Fprintf(wc, "rows: %d\n", t.n)
	for i := range t.h {
		t.h[i] = tab[n(r)]
	}
	fmt.Fprintf(wc, "header: %v\n", t.h)
	t.t = make([]byte, len(t.h))
	t.d = make([]interface{}, len(t.h))
	for i := range t.h {
		b := make([]byte, 1)
		r.Read(b)
		t.t[i] = b[0]
		fmt.Fprintf(wc, "col %d type %c\n", i, b[0])
		if tp := b[0]; tp == 's' || tp == 'i' {
			v := make([]int32, t.n)
			binary.Read(r, binary.LittleEndian, v)
			if tp == 's' {
				s := make([]string, len(v))
				for i, j := range v {
					s[i] = tab[j]
				}
				t.d[i] = s
			} else {
				t.d[i] = v
			}
		} else if tp == 'f' {
			f := make([]float64, t.n)
			binary.Read(r, binary.LittleEndian, f)
			t.d[i] = f
		} else if tp == 'z' {
			z := make([]complex128, t.n)
			binary.Read(r, binary.LittleEndian, z)
			t.d[i] = z
		} else {
			fatal(fmt.Errorf("column type is %d %c\n", tp, tp))
		}
	}
	return t
}
func n(r io.Reader) (s int32) {
	binary.Read(r, binary.LittleEndian, &s)
	return s
}

func (d data) encode(ww io.Writer) {
	w := func(x interface{}) { binary.Write(ww, binary.LittleEndian, x) }
	m := make(map[string]int32) //symtab
	p := func(s string) int32 {
		i, o := m[s]
		if !o {
			i = int32(len(m))
			m[s] = i
		}
		return i
	}
	for _, t := range d.t {
		p(t.name)
		for _, s := range t.h {
			p(s)
		}
		for j, tp := range t.t {
			if tp == 's' {
				v := t.d[j].([]string)
				for _, s := range v {
					p(s)
				}
			}
		}
	}
	mm := make(map[int32]string)
	for k, v := range m {
		mm[v] = k
	}
	v := make([][]byte, len(m))
	for i := int32(0); i < int32(len(m)); i++ {
		v[i] = []byte(mm[i])
	}
	syms := bytes.Join(v, []byte{0})
	w(int32(len(syms)))
	ww.Write(syms)
	w(int32(len(d.t)))
	sy := func(v []string) {
		for _, s := range v {
			w(m[s])
		}
	}
	for _, t := range d.t {
		w(int32(m[t.name]))
		w(int32(len(t.h)))
		w(t.n)
		sy(t.h)
		ln := func(n int) {
			if int(t.n) != n {
				panic(fmt.Errorf("wrong length for table %s: %d %d\n", t.name, t.n, n))
			}
		}
		for i, d := range t.d {
			ww.Write([]byte{t.t[i]})
			switch t.t[i] {
			case 's':
				sy(d.([]string))
				ln(len(d.([]string)))
			case 'i':
				w(d.([]int32))
				ln(len(d.([]int32)))
			case 'f':
				w(d.([]float64))
				ln(len(d.([]float64)))
			case 'z':
				w(d.([]complex128))
				ln(len(d.([]complex128)))
			default:
				panic(fmt.Errorf("unknown type: %c %d", t.t[i], t.t[i]))
			}
		}
	}
	w(int32(len(d.prog)))
	ww.Write([]byte(d.prog))
}

type data struct {
	t    []table
	prog string
}
type table struct {
	name string
	n    int32
	t    []byte
	h    []string
	d    []interface{}
}
