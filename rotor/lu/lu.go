// lu decomposition for wasm
//
// memory(bytes)
// 16*n*n   input matrix A(nxn), row-major-double-complex
// +4*n     row index vector
// +4*n     permutation vector
// +16*n    rhs
// +16*n    result
//
// use from js(lu is exports of wasm instance):
// lu.mk(n);F=new Float64Array(lu.memory);F.set(A);b=lu.lu(n);rhs.forEach(y=>{F.set(y,b);x=lu.solve(n);r=F.slice(x,x+2*n))}
package lu

import . "github.com/ktye/wg/module"

func init() {
	Memory(1)
	Export(mk, lu, solve)
}
func mk(n int32)       { Memorygrow((n * (40 + 16*n)) >> 12) }
func ap(n int32) int32 { return 16 * n * n }
func pp(n int32) int32 { return ap(n) + 4*n }
func sw(x, i, j int32) { t := I32(x + i); SetI32(x+i, I32(x+j)); SetI32(x+j, t) }
func lu(n int32) int32 {
	N, A, p, i, j := 4*n, ap(n), pp(n), int32(0), int32(0)
	for i < N {
		SetI32(p+i, i<<2)
		SetI32(A+i, i*N)
		i += 4
	}

	var t, aii, aki, aik, ajk int32
	var a, b, c, d, e, f float64
	i = 0
	for i < N {
		b, j = 0.0, i
		t = i
		for t < N {
			aki = I32(A+t) + 4*i
			a = F64abs(F64(aki)) + F64abs(F64(aki+8))
			if a > b {
				b, j = a, t
			}
			t += 4
		}
		if j != i {
			sw(p, i, j)
			sw(A, i, j)
		}

		aii = I32(A+i) + 4*i
		a, b = F64(aii), F64(aii+8)          // Aii
		c, d = 1.0/(a+b*b/a), -1.0/(b+a*a/b) // 1/Aii
		j = 4 + i
		for j < N { //j=1+i;j<n;j++
			ajk = I32(A+j) + 4*i //ajk=aji
			a, b = F64(ajk), F64(ajk+8)
			SetF64(ajk, a*c-b*d) // Aji /= Aii
			SetF64(ajk+8, a*d+b*c)
			a, b = F64(ajk), F64(ajk+8) // Aji
			ajk += 16
			aik = aii + 16
			t = aii + 4*(N-i)
			for aik < t { //k=1+i;k<n;k++
				e, f = F64(aik), F64(aik+8)
				SetF64(ajk, F64(ajk)-a*e+b*f) // Ajk-=Aji*Aik
				SetF64(ajk+8, F64(ajk+8)-a*f-b*e)
				ajk += 16
				aik += 16
			}
			j += 4
		}
		i += 4
	}
	return p + N //rhs
}
func solve(n int32) int32 {
	A, p, N, i, aii, aik, rk, t := ap(n), pp(n), 4*n, int32(0), int32(0), int32(0), int32(0), int32(0)
	h := p + N
	r := h + 4*N
	var x, y, a, b, c, d float64

	ri := r
	for i < N {
		t = h + I32(p+i)
		x, y = F64(t), F64(t+8)
		aik = I32(A + i)
		rk = r
		for rk < ri { //k=0;k<i;k++   xi-=Aik*xk
			a, b = F64(aik), F64(aik+8)
			c, d = F64(rk), F64(rk+8)
			x -= a*c - b*d
			y -= a*d + b*c
			aik += 16
			rk += 16
		}
		SetF64(ri, x)
		SetF64(ri+8, y)
		ri += 16
		i += 4
	}

	i = N - 4
	for i >= 0 { //for i=n-1;i>=0;i--
		ri = r + 4*i
		rk = 16 + ri
		x, y = F64(ri), F64(ri+8)
		aii = I32(A+i) + 4*i
		aik = aii + 16
		t = ri + 4*(N - i)
		for rk < t { //for k=1+i;k<n;k++  xi-=Aik*xk
			a, b = F64(aik), F64(aik+8)
			c, d = F64(rk), F64(rk+8)
			x -= a*c - b*d
			y -= a*d + b*c
			aik += 16
			rk += 16
		}
		a, b = F64(aii), F64(aii+8)
		c, d = 1.0/(a+b*b/a), -1.0/(b+a*a/b) // 1/Aii
		SetF64(ri, x*c-y*d)                  // xi/=Aii
		SetF64(ri+8, x*d+y*c)
		i -= 4
	}
	return r
}
