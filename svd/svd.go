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
	jaco_test(A[1], A[2])

	U, V, s := svd(A) //U,V,A: list of columns
	pmat("A", U)
	pmat("U", U)
	pmat("V", V)
	fmt.Println("s", s)
	fmt.Println("UU", unitary(U))
	fmt.Println("VV", unitary(V))
}

type M [][]complex128 // nxn
type R []float64
type Z []complex128

func jaco_test(u, v Z) {
	cs, SN := jaco(u, v)
	fmt.Println("cs/sn", cs, SN)

	A := hot(u, u)
	B := hot(u, v)
	C := hot(v, v)
	CS := complex(cs, 0)

	// T=[cs -sn;sn' c] digonalizes B=[A B;B' C] with T*B*T'
	T := M{Z{CS, -SN}, Z{cmplx.Conj(SN), CS}}
	TT := trans(T)

	x := M{Z{A, B}, Z{cmplx.Conj(B), C}}
	x = mul2(x, TT)
	x = mul2(T, x)
	fmt.Println("x", x)

	U, V := rot(u, v, cs, SN)
	fmt.Println("U'V", hot(U, V))
}
func mul2(A, B M) (M M) { // cik=aij*bjk
	M = mat(len(A))
	M[0][0] = A[0][0]*B[0][0] + A[0][1]*B[1][0]
	M[0][1] = A[0][0]*B[0][1] + A[0][1]*B[1][1]
	M[1][0] = A[1][0]*B[0][0] + A[1][1]*B[1][0]
	M[1][1] = A[1][0]*B[0][1] + A[1][1]*B[1][1]
	return M
}

// T=[cs -sn;sn' c] digonalizes B=[A B;B' C] with T*B*T'
func jaco(u, v Z) (cs float64, sn complex128) {
	A := real(hot(u, u))
	B := hot(u, v)
	C := real(hot(v, v))
	q := (C - A) / (2 * cmplx.Abs(B))
	t := sign(q) / (math.Abs(q) + math.Sqrt(1+q*q))
	cs = 1.0 / math.Sqrt(1+t*t)
	sn = B * complex(t*cs/cmplx.Abs(B), 0)
	return cs, sn // d:+/conj*;A:_d[u;u];B:d[u;v];C:_d[v;v];s:(B%abs B)*t*c:1%%1+t*t:((q>0)-q<0)%(abs q)+%1+q*q:(C-A)%2*abs B
}
func rot(u, v Z, cs float64, SN complex128) (U, V Z) {
	U = add(scale(cs, u), zcale(-cmplx.Conj(SN), v))
	V = add(zcale(SN, u), scale(cs, v))
	return U, V
}

func svd(A M) (U, V M, sigma R) { //A:list of columns (A[i]: column i)
	n, e := len(A), 1.0
	V, U = mat(n), mat(n)
	for i := range V {
		V[i][i] = 1
	}
	for e > 1e-12 {
		e = 0
		for i := range A {
			for k := 1 + i; k < n; k++ {
				u, v := A[i], A[k]

				a := real(hot(u, u))
				b := hot(u, v)
				c := real(hot(v, v))
				if ee := cmplx.Abs(b) / math.Sqrt(a*c); ee > e {
					e = ee
				}

				cs, sn := jaco(u, v)
				A[i], A[k] = rot(u, v, cs, sn)
				V[i], V[k] = rot(V[i], V[k], cs, sn)
			}
		}
	}
	sigma = make(R, n)
	for i := range A {
		sigma[i] = norm(A[i])
		U[i] = scale(1.0/sigma[i], A[i])
	}
	return U, V, sigma
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
func zcale(s complex128, x Z) (r Z) {
	r = make(Z, len(x))
	for i, z := range x {
		r[i] = s * z
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
		if i == len(A)-1 {
			fmt.Println("]")
		} else {
			fmt.Printf(";")
		}
	}
}
func sign(x float64) float64 {
	if x < 0 {
		return -1
	}
	return 1
}
