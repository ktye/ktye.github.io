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
	/*
		U, V, s := jaco(A)
		pmat("A", U)
		pmat("U", U)
		pmat("V", U)
		fmt.Println(s)
		fmt.Println("UU", unitary(U))
		fmt.Println("VV", unitary(V))
	*/
}

type M [][]complex128 // nxn
type R []float64
type Z []complex128

/*
func jaco(u, v Z) (cs, sn float64) {
	a := (hot(v, v) - hot(u, u)) / (2*hot(u, v))
	t := math.Sign(a) / (math.Abs(a) + math.Sqrt(1+a*a))
	cs := 1.0 / math.Sqrt(1+t*t)
	sn := t*cs
	return cs, sn
}
*/

func jaco_test(u, v Z) {
	//	for i := range u {
	//u[i] = complex(real(u[i]), 0)
	//v[i] = complex(real(v[i]), 0)
	//	}
	cs, sn := jaco(u, v)
	fmt.Println("cs/sn", cs, sn)
	//sm := -cmplx.Conj(sn)

	A := real(hot(u, u))
	B := hot(u, v)
	C := real(hot(v, v))
	// [cs sn';-sn cs]*[A B;B' C]*[cs -sn';sn cs] = [l1 0;0 l2]

	z := func(r float64) complex128 { return complex(r, 0) }
	x := M{Z{z(A), B}, Z{cmplx.Conj(B), z(C)}}
	xx := mul2(x, M{Z{z(cs), -cmplx.Conj(sn)}, Z{sn, z(cs)}})
	xxx := mul2(M{Z{z(cs), cmplx.Conj(sn)}, Z{-sn, z(cs)}}, xx)

	fmt.Println("M", x)
	fmt.Println("MMM", xxx)

	/*
	   x := add(scale(cs, u), zcale(sm, v))
	   y := add(zcale(sn, u), scale(cs, v))
	   fmt.Println("u", u)
	   fmt.Println("v", v)
	   fmt.Println("x", x)
	   fmt.Println("y", y)
	   fmt.Println("x'y", hot(x, y))
	*/
}
func mul2(A, B M) (M M) { // cik=aij*bjk
	M = mat(len(A))
	M[0][0] = A[0][0]*B[0][0] + A[0][1]*B[1][0]
	M[0][1] = A[0][0]*B[0][1] + A[0][1]*B[1][1]
	M[1][0] = A[1][0]*B[0][0] + A[1][1]*B[1][0]
	M[1][1] = A[1][0]*B[0][1] + A[1][1]*B[1][1]
	return M
}

// eigenvectors of 2x2 hermitian from columns u and v
// [A  B;B' C]           B': conj(B)
// A:u'*u, C:v'*v, B:u'*v
// [cs sn';-sn cs]*[A B;B' C]*[cs -sn';sn cs] = [l1 0;0 l2]
func jaco(u, v Z) (cs float64, sn complex128) {
	A := real(hot(u, u))
	B := hot(u, v)
	C := real(hot(v, v))
	b := cmplx.Abs(B)
	w := complex(real(B)/b, -imag(B)/b) //cmplx.Conj(B) / b
	q := (C - A) / (2 * b)
	t := sign(q) / (math.Abs(q) + math.Sqrt(1+q*q))
	cs = 1.0 / math.Sqrt(1+t*t)
	return cs, complex(cs*t, 0) * w
}

/*
func jaco(A M) (U, V M, sigma R) { //A:list of columns (A[i]: column i)
	n, e := len(A), 1.0
	V, U, x := mat(n), mat(n), make(Z, n)
	for i := range V {
		V[i][i] = 1
	}
	for e > 1e-12 {
		e = 0
		for i := range A {
			for k := 1 + i; k < n; k++ {
				ii := hot(A[i], A[i])
				kk := hot(A[k], A[k])
				ik := hot(A[k], A[i])
				if ee := cmplx.Abs(ik) / math.Sqrt(ii*kk); ee > e {
					e = ee
				}
				q := (kk - ii) / (2 * ik)
				t := math.Sign(q) / (math.Abs(q) + math.Sqrt(1+q*q))
				cs := 1.0 / math.Sqrt(1+t*t)
				sn := cs * t

				copy(x, A[i])
				A[i] = add(scale(cs, x), scale(sn, A[k]))
				A[k] = add(scale(sn, x), scale(-cs, A[k]))

				copy(x, V[i])
				V[i] = add(scale(cs, x), scale(sn, V[k]))
				V[k] = add(scale(sn, x), scale(-cs, V[k]))
			}
		}
	}
	for i := range A {
		sigma[i] = norm(A[i])
		U[i] = scale(1.0/sigma[i], A[i])
	}
	return U, V, sigma
}
*/

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
