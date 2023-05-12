package main

import (
	"fmt"
	"math"
)

func main() {
	A := [][]float64{
		[]float64{0, 5, 22 / 3.},
		[]float64{4, 2, 1},
		[]float64{2, 7, 9},
	}
	fmt.Println("A", A)
	LU, P := lu(A)
	fmt.Println("LU", LU)
	fmt.Println("P", P)
}

/*
func lu(A [][]float64) ([][]float64, []int) {
	P := til(len(A))
	for i := 0; i < len(A)-1; i++ {
		j := i + maxcol(A[i:], i)
		P[i], P[j] = P[j], P[i]
		A[i], A[j] = A[j], A[i]
		aii := A[i][i]
		for j := 1 + i; j < len(A); j++ {
			A[j][i] /= aii
			t := A[j][i]
			for k := 1 + i; k < len(A); k++ {
				A[j][k] -= t * A[i][k]
			}
		}
	}
	return A, P
}
*/
func lu(A [][]float64) ([][]float64, []int) {
	P := til(len(A))
	for i := 0; i < len(A)-1; i++ {
		j := i + maxcol(A[i:], i)
		P[i], P[j] = P[j], P[i]
		A[i], A[j] = A[j], A[i]
		R := A[i]
		q := R[i]
		for j := 1 + i; j < len(A); j++ {
			Q := A[j]
			Q[i] /= q
			f := Q[i]
			for k := 1 + i; k < len(A); k++ {
				Q[k] -= f * R[k]
			}
		}
	}
	return A, P
}
func til(n int) []int {
	r := make([]int, n)
	for i := range r {
		r[i] = i
	}
	return r
}
func maxcol(A [][]float64, i int) (r int) {
	m := -1.0
	for k := range A {
		println(A[k][i], ">", m)
		if a := math.Abs(A[k][i]); a > m {
			m = a
			r = k
		}
	}
	println("m", m)
	return r
}
