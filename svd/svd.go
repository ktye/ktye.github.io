package main

import (
	"fmt"
	"math"
	"math/cmplx"
)

func main() {
	A := M{
		Z{1 + 2i, 3 - 5i, 2 + 8i, 3 + 1i},
		Z{8 + 3i, 9 - 5i, 1 + 3i, 2 - 2i},
		Z{1 + 3i, 6 - 2i, 7 + 6i, 6 - 1i},
		Z{2 + 1i, 3 - 7i, 3 + 2i, 2 + 4i},
	}
	U, V, a, b := bidi(A)
	fmt.Println("a", a)
	fmt.Println("b", b)
	pmat("U", U)
	fmt.Println("UU", unitary(U))
	fmt.Println("VV", unitary(V))
}

type M [][]complex128 // nxn
type R []float64
type Z []complex128

// golub-kahan-lanczos for nxn
// UH A V = [a0 b0 0..;0 a1 b1 0..;.. ai bi..] (bi-diagonal)
// A Vk = Uk Bk
// UH U = I, Vk V = I
func bidi(A M) (U, V M, a, b R) {
	n := len(A)
	a, b, U, V = make(R, n), make(R, n), mat(n), mat(n)
	H := trans(A)
	V[0][0] = 1
	for k := range A {
		U[k] = mvec(A, V[k])
		if k > 0 {
			U[k] = add(U[k], scale(-b[k-1], U[k-1]))
		}
		a[k] = norm(U[k])
		U[k] = scale(1/a[k], U[k])
		if k < len(A)-1 {
			v := add(mvec(H, U[k]), scale(-a[k], V[k]))
			b[k] = norm(v)
			V[1+k] = scale(1/b[k], v)
		}
	}
	return U, V, a, b[1:]
}
func add(x, y Z) (r Z) {
	r = make(Z, len(x))
	for i := range x {
		r[i] = x[i] + y[i]
	}
	return r
}
func dot(x, y Z) (r complex128) {
	for i := range x {
		r += x[i] * y[i]
	}
	return r
}
func hot(x, y Z) (r complex128) {
	for i := range x {
		r += cmplx.Conj(x[i]) * y[i]
	}
	return r
}
func mvec(A M, v Z) (r Z) {
	r = make(Z, len(A))
	for i, a := range A {
		r[i] = dot(a, v)
	}
	return r
}
func scale(s float64, x Z) (r Z) {
	r = make(Z, len(x))
	for i, z := range x {
		r[i] = complex(s*real(z), s*imag(z))
	}
	return r
}
func norm(x Z) (r float64) {
	for i := range x {
		r = math.Hypot(r, cmplx.Abs(x[i]))
	}
	return
}
func trans(A M) (H M) {
	H = mat(len(A))
	for i := range H {
		for k := range A {
			H[i][k] = cmplx.Conj(A[k][i])
		}
	}
	return H
}
func mat(n int) (r M) {
	r = make(M, n)
	for i := range r {
		r[i] = make(Z, n)
	}
	return r
}
func unitary(A M) (e float64) {
	for i := range A {
		for k := range A {
			q := hot(A[i], A[k])
			r := cmplx.Abs(q)
			if i == k {
				r = cmplx.Abs(q - complex(1, 0))
			}
			if r > e {
				e = r
			}
		}
	}
	return e
}
func pmat(s string, A M) {
	fmt.Printf("%s=[", s)
	for i := range A {
		for k := range A[i] {
			fmt.Printf("%v ", A[i][k])
		}
		if i == len(A) - 1 {
			fmt.Println("]")
		} else {
			fmt.Printf(";")
		}
	}
}
