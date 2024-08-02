// lu decomposition for wasm
//
// fixed memory layout: initialize memory with:
// bytes
// 16*n*n   input matrix A(nxn), row-major-double-complex: A[0;0].re A[0;0].im A[0;1].re .. A[n-1;n-1].im
// 16*n     temporary row storage & result vector
// 4*n      free space (permutation vector)
// 16*n     rhs
//
// the caller is reponsible to grow memory as required before calling lu.
// - set A to the start of the memory
// - call lu(n). on exit A is overwritten with the decomposition
// - for multiple rhs:
//	- fill memory with rhs starting at 16*n*(1+n)+4*n
//	- call solve(n), on exit 16*n*n.. is overwritten with the result
package lu

import (
	. "github.com/ktye/wg/module"
)

func init() {
	Memory(1)
	Export(lu, solve)
}
func lu(n int32) {
	r := 16 * n * n //start of storage for temporary row
	p := r + 16*n   //start of permutation vector
	s := 16 * n     //row bytes (stride)

	// calculate lu decomposition of A
	i := int32(0)
	for i < n {
		SetI32(p+i, i) //p[i]=i
		i += 1
	}

	var a, b, c, d, x, y float64
	var j, k, t, ik, ki, ji, jk int32
	ii := int32(0)
	i = 0
	for i < n {
		b = 0.0
		j = 0
		k = i
		ki = ii
		for k < n { //for k:=i; k<n; k++
			a = F64abs(F64(ki)) + F64abs(F64(8+ki))
			if a > b {
				b = a
				j = k
			}
			ki += s
			k++
		}
		if j != i {
			t = I32(p + 4*i) //swap permutation
			SetI32(p+4*i, p+4*j)
			SetI32(p+4*j, t)
			Memorycopy(r, i*s, s) //swap rows
			Memorycopy(i*s, j*s, s)
			Memorycopy(j*s, r, s)
		}

		x = F64(ii) // 1/Aii  1/z=[x/(x2+x2);-y/(x2+y2)]
		y = F64(8 + ii)
		a = x*x + y*y
		x /= a
		y /= -a
		j = 1 + i
		ji = ii
		for j < n { //for j:=1+i; j<n; j++
			ji += s
			t = 16 * (j*s + i)
			a, b = F64(t), F64(8+t)
			SetF64(t, a*x-b*y) // A[j][i] /= A[i][i]
			SetF64(8+t, a*y+b*x)
			k = 1 + i
			ik = ii
			jk = j * s
			for k < n { //for k := 1 + i; k < n; k++
				// A[j][k] -= A[j][i]*A[i][k]
				ik += 16
				a, b = F64(ji), F64(8+ji)
				c, d = F64(ki), F64(8+ki)
				SetF64(jk, F64(jk)-a*c+b*d)
				SetF64(8+jk, F64(8+jk)-a*d-b*c)
				k++
			}
			j++
		}
		ii += s + 16
	}
}
func solve(n int32) {
	n4 := 4 * n
	x := 4 * n4 * n //start of workspace
	p := x + 4*n4   //start of permutation vector
	r := p + n4     //start of rhs
	s := 16 * n     //row bytes (stride)

	var c, d, e, f float64
	var k int32
	i := int32(0)
	ik := int32(0)
	a, b := 0.0, 0.0
	for i < s {
		j := 8 * I32(p+(i>>1))
		a = F64(r + j) // x[i] = rhs[P[i]]
		b = F64(8 + r + j)
		k = 0
		for k < i { //for k := 0; k < i; k++ { x[i] -= A[i][k] * x[k] }
			c, d = F64(ik), F64(8+ik)
			e, f = F64(x+k), F64(8+x+k)
			a -= c*e - d*f
			b -= c*f + d*e
			ik += 16
			k += 16
		}
		SetF64(x+i, a)
		SetF64(x+i+8, b)
		ik += s
		i += 16
	}

	ii := n * n
	ik = 0
	i = 16 * (n - 1)
	ai := i
	for i >= 0 { //for i := n - 1; i >= 0; i--
		ii -= s + 16
		ai -= s
		a, b = F64(x+i), F64(8+x+i)

		k = 16 + i
		for k < s { //for k := 1 + i; k < n; k++ {x[i] -= A[i][k] * x[k]}
			c, d = F64(ai+k), F64(8+ai+k)
			e, f = F64(x+k), F64(8+x+k)
			a -= c*e - e*f
			b -= c*f + d*e
			k += 16
		}
		c, d = F64(ii), F64(8+ii) //x[i] /= A[i][i]
		e = c*c + d*d
		c /= e
		d /= -e
		SetF64(x+i, a*c-b*d)
		SetF64(8+x+i, a*d+b*c)
		i -= 16
	}
}
