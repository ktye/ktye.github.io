package lu

import (
	. "github.com/ktye/wg/module"
	"math"
	"math/rand"
	"testing"
)

func TestLu(t *testing.T) {
	n := int32(10)
	mk(n)
	for i := int32(0); i < 16*n*n; i += 16 {
		SetF64(i, rand.NormFloat64())
	}
	A := make([][]complex128, n)
	x := make([]complex128, n)
	for i := range A {
		A[i] = make([]complex128, n)
		for k := range A[i] {
			A[i][k] = complex(rand.NormFloat64(), rand.NormFloat64())
		}
		x[i] = complex(rand.NormFloat64(), rand.NormFloat64())
	}
	h := mul(A, x)
	j := int32(0)
	for i := range A {
		for k := range A[i] {
			SetF64(j, real(A[i][k]))
			j += 8
			SetF64(j, imag(A[i][k]))
			j += 8
		}
	}
	b := lu(n)
	j = b
	for i := range h {
		SetF64(j, real(h[i]))
		j += 8
		SetF64(j, imag(h[i]))
		j += 8
	}
	r := solve(n)
	j = r
	for i := range x {
		cmp(t, real(x[i]), F64(j))
		j += 8
		cmp(t, imag(x[i]), F64(j))
		j += 8
	}
}
func mul(A [][]complex128, b []complex128) (r []complex128) {
	r = make([]complex128, len(b))
	for i := range A {
		for k := range A[i] {
			r[k] += A[i][k] * b[k]
		}
	}
	return r
}
func cmp(t *testing.T, a, b float64) {
	if e := math.Abs(a - b); e > 1e-12 {
		t.Fatalf("differ %v %v: %v:", a, b, e)
	}
}
