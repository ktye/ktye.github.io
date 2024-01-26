// patch webassembly text files
//
// wasm2wat a.wasm | wapatch f1 f2 f3 | wat2wasm - -o b.wasm
//
// functions f1 f2 f3 must be present in a.wasm and exported.
// they are replaced with f1.wat f2.wat f3.wat.
//
// wapatch depends on the specific text format(whitespace,comments) of wasm2wat:
//
// find export index for function s0:`  (export "s0" (func 61))`
// find function range for index  61:`  (func (;61;)`
// find end range                   :`  (`
//
// compile: go build wapatch.go

package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	b, e := io.ReadAll(os.Stdin)
	x(e)
	v := S(bytes.Split(b, []byte{10}))
	for _, f := range os.Args[1:] {
		b, e = os.ReadFile(f + ".wat")
		x(e)
		q := S(bytes.Split(b, []byte{10}))
		s := `  (export "` + f + `" (func `
		a, b := fr(v, ifn(v, s))
		v = re(v, q, a, b)
	}
	for _, s := range v {
		fmt.Println(s)
	}
}
func re(v, q []string, a, b int) (r []string) { // replace range a..b in v with q
	r = append(r, v[:a]...)
	r = append(r, q...)
	return append(r, v[b:]...)
}
func fr(v []string, i int) (int, int) { //find function body range(lines): `  (func (;8;) (type 10) (param ..`
	p := "  (func (;" + strconv.Itoa(i) + ";)"
	c := "  ("
	a := 0
	for i := range v {
		if a != 0 && strings.HasPrefix(v[i], c) {
			return a, i
		}
		if strings.HasPrefix(v[i], p) {
			a = i
		}
	}
	panic("cannot find function body:" + p)
	return 0, 0
}
func ifn(v []string, s string) int { //find function index: `  (export "s0" (func 61))`
	for _, t := range v {
		if strings.HasPrefix(t, s) {
			i, e := strconv.Atoi(t[len(s) : len(t)-2])
			x(e)
			return i
		}
	}
	panic("cannot find export: " + s)
	return 0
}

func S(x [][]byte) (r []string) {
	for _, y := range x {
		r = append(r, string(y))
	}
	return r
}
func x(e error) {
	if e != nil {
		panic(e)
	}
}
