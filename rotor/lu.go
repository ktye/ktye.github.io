package main

import (
	"fmt"
	"math"
	"io"
	"os"
	"bytes"
	"math/rand"
)

func main() {
	var buf bytes.Buffer

	m, n := 5, 10
	A, b := system(m, n)
	AA := Copy(A)
	B := band(A, m)
	K("A", B, &buf)
	M("A", A)
	M("B", B)
	V("b", b)
	F("b", b, &buf)
	P := lu(A)
	M("LU", A)
	fmt.Println("P", P)
	x := lusolve(A, P, b)
	V("x", x)
	Ax := mul(AA, x)
	V("Ax", Ax)
	fmt.Println("Ax=b", cmp(Ax, b))
	lub(B)
	M("LUB",B)
	K("B", B, &buf)
	f := forward(B, b)
	F("f", f, &buf)
	y := lubsolve(B, b)
	F("y", y, &buf)
	V("y", y)
	fmt.Println("x=y", cmp(x, y))

	os.WriteFile("t.k", buf.Bytes(), 0644)
}
func band(A [][]float64, m int) [][]float64 {
	B := make([][]float64, m)
	n := len(A)
	h := (m-1)/2
	for i := range B {
		B[i] = make([]float64, n)
	}
	for j := range n {
		for i := range n {
			k := i - j + h
			if k >= 0 && k < m {
				B[k][j] = A[i][j]
			}
		}
	}
	return B
}

func V(s string, b []float64) {
	fmt.Println(s)
	for _, u := range b {
		fmt.Printf(" %6.3f", u)
	}
	fmt.Println()
}
func M(s string, A [][]float64) {
	fmt.Println(s)
	for i := range A {
		for _, a := range A[i] {
			fmt.Printf(" %6.3f", a)
		}
		fmt.Println()
	}
}
func F(s string, x []float64, w io.Writer) {
	fmt.Fprintf(w, "%s:", s)
	for _, v := range x {
		fmt.Fprintf(w, " %v", v)
	}
	fmt.Fprintln(w)
}
func K(s string, A [][]float64, w io.Writer) {
	fmt.Fprintf(w, "%s:(", s)
	for i := range A {
		for _, a := range A[i] {
			fmt.Fprintf(w, " %v", a)
		}
		if i == len(A) - 1 {
			fmt.Fprintf(w, ")\n")
		} else {
			fmt.Fprintln(w)
		}
	}
}
func system(m, n int) (A [][]float64, b []float64) {
	h := (m-1)/2
	A = make([][]float64, n)
	b = make([]float64, n)
	for i := range A {
		A[i] = make([]float64, n)
		b[i] = rnd()
		for j := i-h; j<=i+h; j++ {
			if j >= 0 && j < n {
				A[i][j] = rnd()
			}
		}
		A[i][i] *= 10
	}
	return A, b
}
func rnd() float64 { return rand.Float64() - 0.5 }

func lub(B [][]float64) {
	m, n := len(B), len(B[0])
	h := (m-1)/2
	for j := range n {
		p := B[h][j]
		for k := 1+h; k<m; k++ {
			q := B[k][j]/p
			for i := 1; i<m; i++ {
				if h-i >= 0 && i+j < n {
					B[k-i][j+i] -= q*B[h-i][j+i]
				}
			}
			B[k][j] = q
		}
	}
}
func lu(A [][]float64) (P []int) {
	n := len(A)
	P = make([]int, n)
	for i := range P {
		P[i] = i
	}
	for i := range A { //disable pivoting
//		mx, mi := 0.0, 0
//		for k := i; k < n; k++ { if a := math.Abs(A[k][i]); a > mx { mx, mi = a, k } }
//		if mi != i { P[i], P[mi] = P[mi], P[i]; A[i], A[mi] = A[mi], A[i] }
		for j := 1 + i; j < n; j++ {
			A[j][i] /= A[i][i]
			for k := 1 + i; k < n; k++ {
				A[j][k] -= A[j][i] * A[i][k]
			}
		}
	}
	return P
}
func forward(A [][]float64, rhs []float64) (x []float64) {
	n := len(A[0])
	m := len(A)
	h := (m-1)/2
	x = make([]float64, n)
	copy(x, rhs)
	for i := range n {
		for k := i-h; k<i; k++ {
			j := i-k+h
			if j >= 0 && j < m && k >= 0{
				x[i] -= A[j][k] * x[k]
			}
		}
	}
	return x
}
func lubsolve(A [][]float64, rhs []float64) (x []float64) {
	n := len(A[0])
	m := len(A)
	h := (m-1)/2
	x = make([]float64, n)
	copy(x, rhs)
	for i := range n {
		for k := i-h; k<i; k++ {
			j := i-k+h
			if j >= 0 && j < m && k >= 0{
				x[i] -= A[j][k] * x[k]
			}
		}
	}
	for i := n-1; i>= 0; i-- {
		for k := 1; k<=h; k++ {
			if h + k < m && i+k<n {
				x[i] -= A[h-k][i+k] * x[i+k]
			}
		}
		x[i] /= A[h][i]
	}
	return x
}
func lusolve(A [][]float64, P []int, rhs []float64) (x []float64) {
	n := len(A)
	x = make([]float64, n)
	for i := range A {
		x[i] = rhs[P[i]]
		for k := 0; k < i; k++ {
			x[i] -= A[i][k] * x[k]
		}
	}
	for i := n - 1; i >= 0; i-- {
		for k := 1 + i; k < n; k++ {
			x[i] -= A[i][k] * x[k]
		}
		x[i] /= A[i][i]
	}
	return x
}
func Copy(A [][]float64) (R [][]float64) {
	R = make([][]float64, len(A))
	for i := range R {
		R[i] = make([]float64, len(A[i]))
		copy(R[i], A[i])
	}
	return R
}
func mul(A [][]float64, x []float64) (r []float64) {
	r = make([]float64, len(x))
	for i := range A {
		for k := range A {
			r[i] += A[i][k] * x[k]
		}
	}
	return r
}
func cmp(x, y []float64) bool {
	if len(x) != len(y) {
		panic("len")
	}
	for i := range x {
		if e := math.Abs(x[i] - y[i]); e > 1e-12 {
			return false
		}
	}
	return true
}
