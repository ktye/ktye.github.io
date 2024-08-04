package lu

import (
	. "github.com/ktye/wg/module"
	"math"
	"math/rand"
	"testing"
)

func TestLu(t *testing.T) {
	n := int32(10)
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

	l := LU(A)
	X := l.solve(h)
	for i := range X {
		cmp(t, real(x[i]), real(X[i]))
		cmp(t, imag(x[i]), imag(X[i]))
	}

	mk(n)
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
	cmpl(t, l)

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
			r[i] += A[i][k] * b[k]
		}
	}
	return r
}
func cmp(t *testing.T, a, b float64) {
	if e := math.Abs(a - b); e > 1e-12 {
		t.Fatalf("differ %v %v: %v:", a, b, e)
	}
}
func cmpl(t *testing.T, l L) {
	n := len(l.a)
	p := pp(int32(n))
	a := ap(int32(n))
	for i := 0; i<n; i++ {
		if I32(p+4*int32(i))>>4 != int32(l.p[i]) {
			t.Fatal("p mismatch")
		}
		ai := I32(a+int32(4*i))
		bi := l.a[i]
		for k := 0; k<n; k++ {
			j := ai + int32(16*k)
			cmp(t, F64(j), real(bi[k]))
			cmp(t, F64(j+8), imag(bi[k]))
		}
	}
}

type L struct {
	a [][]complex128
	p []int
}

func LU(A [][]complex128) L {
	n := len(A)
	a := make([][]complex128, n)
	p := make([]int, n)
	for i := range A {
		a[i] = make([]complex128, n)
		copy(a[i], A[i])
		p[i] = i
	}
	for i := range a {
		m := 0.0
		j := i
		for k := i; k < n; k++ {
			a := math.Abs(real(a[k][i])) + math.Abs(imag(a[k][i]))
			if a > m {
				m = a
				j = k
			}
		}
		if j != i {
			p[i], p[j] = p[j], p[i]
			a[i], a[j] = a[j], a[i]
		}
		c, d := real(a[i][i]), imag(a[i][i])
		s := complex(1.0/(c+d*d/c), -1.0/(d+c*c/d))
		for j := 1 + i; j < n; j++ {
			a[j][i] *= s //a[j][i] /= a[i][i]
			for k := 1 + i; k < n; k++ {
				a[j][k] -= a[j][i] * a[i][k]
			}
		}
	}
	return L{a, p}
}
func (l L) solve(b []complex128) []complex128 {
	x := make([]complex128, len(b))
	n := len(x)
	a, p := l.a, l.p
	for i := range b {
		x[i] = b[p[i]]
		for k := 0; k < i; k++ {
			x[i] -= a[i][k] * x[k]
		}
	}
	for i := n - 1; i >= 0; i-- {
		c, d := real(a[i][i]), imag(a[i][i])
		s := complex(1.0/(c+d*d/c), -1.0/(d+c*c/d))
		for k := 1 + i; k < n; k++ {
			x[i] -= a[i][k] * x[k]
		}
		x[i] *= s // x[i] /= a[i][i]
	}
	return x
}
