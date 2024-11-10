package main

import (
	"fmt"
	"math"
)

func stockham(x []complex128) []complex128 {
	n := len(x)
	n2 := n >> 1
	tmp := make([]complex128, n)
	y := make([]complex128, n)
	copy(y, x)
	for r, l := n2, 1; r >= 1; r >>= 1 {
		y, tmp = tmp, y
		wim, wre := math.Sincos(-math.Pi / float64(l))
		for j, wj := 0, complex(1, 0); j < l; j++ {
			jrs := j * (r << 1)
			for k, m := jrs, jrs>>1; k < jrs+r; k++ {
				t := wj * tmp[k+r]
				y[m] = tmp[k] + t
				y[m+n2] = tmp[k] - t
				m++
			}
			wj *= complex(wre, wim)
		}
		l <<= 1
	}
	return y
}
func fft(x []complex128) []complex128 {
	if 1 == len(x) {
		return x
	}
	odd := func(x []complex128) []complex128 {
		r := make([]complex128, (1+len(x))/2)
		for i := range r {
			r[i] = x[2*i]
		}
		return r
	}
	r := make([]complex128, len(x))
	p := fft(odd(x))
	q := fft(odd(x[1:]))
	n := len(x) / 2
	for k := 0; k<n; k++ {
		sn, cs := math.Sincos(-4.0*math.Pi*float64(k)/float64(n))
		a := p[k]
		b := q[k] * complex(cs, sn)
		r[k] = a + b
		r[n+k] = a - b
	}
	return r
}
func main() {
	re := []float64{0.382389,0.926566,0.403446,0.522265}
	im := []float64{0.752076,0.908716,0.696912,0.524592}
	a := make([]complex128, 4)
	x := make([]complex128, 4)
	y := make([]complex128, 4)
	for i := range x {
		a[i] = complex(re[i], im[i])
		x[i] = complex(re[i], im[i])
		y[i] = complex(re[i], im[i])
	}
	x = fft(x)
	y = stockham(y) //, 4, 1)
	for i := range x {
		fmt.Printf("%8.5f   %8.5f   %8.5f\n", a[i], x[i], y[i])
	}
}
