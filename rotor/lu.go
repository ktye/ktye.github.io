package main

import (
	"fmt"
	"math"
	"math/rand"
)

func main() {
	m, n := 5, 10
	A, b := system(m, n)
	B := band(A, m)
	M("A", A)
	M("B", B)
	V("b", b)
	P := lu(A)
	M("LU", A)
	fmt.Println("P", P)
	lub(B)
	M("LUB",B)
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
	for i := range A {
		mx, mi := 0.0, 0
		for k := i; k < n; k++ { if a := math.Abs(A[k][i]); a > mx { mx, mi = a, k } }
		if mi != i { P[i], P[mi] = P[mi], P[i]; A[i], A[mi] = A[mi], A[i] }
		for j := 1 + i; j < n; j++ {
			A[j][i] /= A[i][i]
			for k := 1 + i; k < n; k++ {
				A[j][k] -= A[j][i] * A[i][k]
			}
		}
	}
	return P
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

