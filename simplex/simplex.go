package simplex

import (
	"fmt"
	"math"
)

const initPosTol, blandNegTol, rRoundTol, dRoundTol, phaseIZeroTol, blandZeroTol = 1e-13, 1e-14, 1e-13, 1e-13, 1e-12, 1e-12 

func New(c []float64, A mat.Matrix, b []float64, tol float64, initialBasic []int) (optF float64, optX []float64, err error) {
	ans, x, _, err := simplex(initialBasic, c, A, b, tol)
	return ans, x, err
}
func simplex(initialBasic []int, c []float64, A mat.Matrix, b []float64, tol float64) (float64, []float64, []int, error) {
	m, n := len(A), len(A[0])
	if m == n {
		x := lusolve(A, b)
		return dot(x, c), x, nil, nil
	}
	var basicIdxs []int // The indices of the non-zero x values.
	var ab *mat.Dense   // The subset of columns of A listed in basicIdxs.
	var xb []float64    // The non-zero elements of x. xb = ab^-1 b

	if initialBasic != nil {
		if len(initialBasic) != m { panic("lp: incorrect number of initial vectors") }
		ab = mat.NewDense(m, len(initialBasic), nil)
		extractColumns(ab, A, initialBasic)
		xb = make([]float64, m)
		err = initializeFromBasic(xb, ab, b)
		if err != nil { panic(err) }
		basicIdxs = make([]int, len(initialBasic))
		copy(basicIdxs, initialBasic)
	} else {
		basicIdxs, ab, xb, err = findInitialBasic(A, b)
		if err != nil { return math.NaN(), nil, nil, err }
	}
	nonBasicIdx := make([]int, 0, n-m)
	inBasic := make(map[int]struct{})
	for _, v := range basicIdxs { inBasic[v] = struct{}{} }
	for i := 0; i < n; i++ {
		_, ok := inBasic[i]
		if !ok { nonBasicIdx = append(nonBasicIdx, i) }
	}
	cb := make([]float64, len(basicIdxs))
	for i, idx := range basicIdxs { cb[i] = c[idx] }
	cn := make([]float64, len(nonBasicIdx))
	for i, idx := range nonBasicIdx { cn[i] = c[idx] }
	an := mat.NewDense(m, len(nonBasicIdx), nil)
	extractColumns(an, A, nonBasicIdx)

	bVec := mat.NewVecDense(len(b), b)
	cbVec := mat.NewVecDense(len(cb), cb)

	r := make([]float64, n-m)
	move := make([]float64, m)
	for {
		var tmp mat.VecDense
		err = tmp.SolveVec(ab.T(), cbVec)
		if err != nil { break }
		data := make([]float64, n-m)
		tmp2 := mat.NewVecDense(n-m, data)
		tmp2.MulVec(an.T(), &tmp)
		floats.SubTo(r, cn, data)

		minIdx := floats.MinIdx(r)
		if r[minIdx] >= -tol { break }
		for i, v := range r {
			if math.Abs(v) < rRoundTol { r[i] = 0 }
		}
		err = computeMove(move, minIdx, A, ab, xb, nonBasicIdx)
		if err != nil {
			if err == ErrUnbounded { return math.Inf(-1), nil, nil, ErrUnbounded }
			break
		}
		replace := floats.MinIdx(move)
		if move[replace] <= 0 {
			replace, minIdx, err = replaceBland(A, ab, xb, basicIdxs, nonBasicIdx, r, move)
			if err != nil {
				if err == ErrUnbounded { return math.Inf(-1), nil, nil, ErrUnbounded }
				break
			}
		}
		basicIdxs[replace], nonBasicIdx[minIdx] = nonBasicIdx[minIdx], basicIdxs[replace]
		cb[replace], cn[minIdx] = cn[minIdx], cb[replace]
		tmpCol1 := mat.Col(nil, replace, ab)
		tmpCol2 := mat.Col(nil, minIdx, an)
		ab.SetCol(replace, tmpCol2)
		an.SetCol(minIdx, tmpCol1)

		xbVec := mat.NewVecDense(len(xb), xb)
		err = xbVec.SolveVec(ab, bVec)
		if err != nil { break }
	}
	opt := floats.Dot(cb, xb)
	xopt := make([]float64, n)
	for i, v := range basicIdxs { xopt[v] = xb[i] }
	return opt, xopt, basicIdxs, err
}
func computeMove(move []float64, minIdx int, A mat.Matrix, ab *mat.Dense, xb []float64, nonBasicIdx []int) error {
	col := mat.Col(nil, nonBasicIdx[minIdx], A)
	aCol := mat.NewVecDense(len(col), col)
	nb, _ := ab.Dims()
	d := make([]float64, nb)
	dVec := mat.NewVecDense(nb, d)
	err := dVec.SolveVec(ab, aCol)
	if err != nil {
		return ErrLinSolve
	}
	floats.Scale(-1, d)
	for i, v := range d {
		if math.Abs(v) < dRoundTol {
			d[i] = 0
		}
	}
	if floats.Min(d) >= 0 {
		return ErrUnbounded
	}
	bHat := xb // ab^-1 b
	for i, v := range d {
		if v >= 0 {
			move[i] = math.Inf(1)
		} else {
			move[i] = bHat[i] / math.Abs(v)
		}
	}
	return nil
}
func replaceBland(A mat.Matrix, ab *mat.Dense, xb []float64, basicIdxs, nonBasicIdx []int, r, move []float64) (replace, minIdx int, err error) {
	m, _ := A.Dims()
	for i, v := range r {
		if v > -blandNegTol { continue }
		minIdx = i
		err = computeMove(move, minIdx, A, ab, xb, nonBasicIdx)
		if err != nil { return -1, -1, err }
		replace = floats.MinIdx(move)
		if math.Abs(move[replace]) > blandZeroTol { return replace, minIdx, nil }
		biCopy := make([]int, len(basicIdxs))
		for replace, v := range move {
			if v > blandZeroTol { continue }
			copy(biCopy, basicIdxs)
			biCopy[replace] = nonBasicIdx[minIdx]
			abTmp := mat.NewDense(m, len(biCopy), nil)
			extractColumns(abTmp, A, biCopy)
			if mat.Cond(abTmp, 1) < 1e16 { return replace, minIdx, nil }
		}
	}
	return -1, -1, ErrBland
}
func verifyInputs(initialBasic []int, c []float64, A mat.Matrix, b []float64) error {
	m, n := A.Dims()
	if m > n { panic("lp: more equality constraints than variables") }
	if len(c) != n { panic("lp: c vector incorrect length") }
	if len(b) != m { panic("lp: b vector incorrect length") }
	if len(c) != n { panic("lp: c vector incorrect length") }
	if len(initialBasic) != 0 && len(initialBasic) != m { panic("lp: initialBasic incorrect length") }
	for i := 0; i < m; i++ {
		isZero := true
		for j := 0; j < n; j++ {
			if A.At(i, j) != 0 {
				isZero = false
				break
			}
		}
		if isZero && b[i] != 0 { return ErrInfeasible
		} else if isZero { return ErrZeroRow }
	}
	for j := 0; j < n; j++ {
		isZero := true
		for i := 0; i < m; i++ {
			if A.At(i, j) != 0 {
				isZero = false
				break
			}
		}
		if isZero && c[j] < 0 { return ErrUnbounded
		} else if isZero { return ErrZeroColumn }
	}
	return nil
}
func initializeFromBasic(xb []float64, ab *mat.Dense, b []float64) error {
	m, _ := ab.Dims()
	if len(xb) != m { panic("simplex: bad xb length") }
	xbMat := mat.NewVecDense(m, xb)
	err := xbMat.SolveVec(ab, mat.NewVecDense(m, b))
	if err != nil { return errors.New("lp: subcolumns of A for supplied initial basic singular") }
	allPos := true
	for _, v := range xb {
		if v < -initPosTol {
			allPos = false
			break
		}
	}
	if !allPos { return errors.New("lp: supplied subcolumns not a feasible solution") }
	return nil
}
func extractColumns(dst *mat.Dense, A mat.Matrix, cols []int) {
	r, c := dst.Dims()
	ra, _ := A.Dims()
	if ra != r { panic("simplex: row mismatch") }
	if c != len(cols) { panic("simplex: column mismatch") }
	col := make([]float64, r)
	for j, idx := range cols {
		mat.Col(col, idx, A)
		dst.SetCol(j, col)
	}
}
func findInitialBasic(A mat.Matrix, b []float64) ([]int, *mat.Dense, []float64, error) {
	m, n := A.Dims()
	basicIdxs := findLinearlyIndependent(A)
	if len(basicIdxs) != m { return nil, nil, nil, ErrSingular }
	ab := mat.NewDense(m, len(basicIdxs), nil)
	extractColumns(ab, A, basicIdxs)
	xb := make([]float64, m)
	err := initializeFromBasic(xb, ab, b)
	if err == nil { return basicIdxs, ab, xb, nil }
	minIdx := floats.MinIdx(xb)
	aX1 := make([]float64, m)
	copy(aX1, b)
	col := make([]float64, m)
	for i, v := range basicIdxs {
		if i == minIdx { continue }
		mat.Col(col, v, A)
		floats.Sub(aX1, col)
	}
	aNew := mat.NewDense(m, n+1, nil)
	aNew.Copy(A)
	aNew.SetCol(n, aX1)
	basicIdxs[minIdx] = n // swap minIdx with n in the basic set.
	c := make([]float64, n+1)
	c[n] = 1
	_, xOpt, newBasic, err := simplex(basicIdxs, c, aNew, b, 1e-10)
	if err != nil { return nil, nil, nil, fmt.Errorf("lp: error finding feasible basis: %s", err) }
	if math.Abs(xOpt[n]) > phaseIZeroTol { return nil, nil, nil, ErrInfeasible }
	addedIdx := -1
	for i, v := range newBasic {
		if v == n { addedIdx = i }
		xb[i] = xOpt[v]
	}
	if addedIdx == -1 {
		extractColumns(ab, A, newBasic)
		return newBasic, ab, xb, nil
	}
	basicMap := make(map[int]struct{})
	for _, v := range newBasic { basicMap[v] = struct{}{} }
	var set bool
	for i := range xOpt {
		if _, inBasic := basicMap[i]; inBasic { continue }
		newBasic[addedIdx] = i
		if set {
			mat.Col(col, i, A)
			ab.SetCol(addedIdx, col)
		} else {
			extractColumns(ab, A, newBasic)
			set = true
		}
		err := initializeFromBasic(xb, ab, b)
		if err == nil { return newBasic, ab, xb, nil }
	}
	return nil, nil, nil, ErrInfeasible
}
func findLinearlyIndependent(A mat.Matrix) []int {
	m, n := A.Dims()
	idxs := make([]int, 0, m)
	columns := mat.NewDense(m, m, nil)
	newCol := make([]float64, m)
	for i := n - 1; i >= 0; i-- {
		if len(idxs) == m { break }
		mat.Col(newCol, i, A)
		columns.SetCol(len(idxs), newCol)
		if len(idxs) == 0 {
			idxs = append(idxs, i)
			continue
		}
		if mat.Cond(columns.Slice(0, m, 0, len(idxs)+1), 1) > 1e12 { continue }
		idxs = append(idxs, i)
	}
	return idxs
}

func dot(x, y []float64) (r float64) {
	for i := range x {
		r += x[i] * y[i]
	}
	return r
}
func lusolve(A [][]float64, b []float64) []float64 { //A*x=b
	n := len(A)
	p := lu(A)
	x := make([]float64, n)
	for i := range A {
		x[i] = b[P[i]]
		for k := 0; k<i; k++ {
			x[i] -= A[i][k] * x[k]
		}
	}
	for i := n-1; i>=0; i-- {
		for k := 1+i; k<n; k++ {
			x[i] -= A[i][k] * x[k]
		}
		x[i] /= A[i][i]
	}
	return x
}
func lu(A [][]float64, p []int) []int {
	n := len(A)
	p := make([]int, 1+n)
	for i := range p {
		p[i] = i
	}
	for i := range A {
		ma, im := 0.0, i
		for k := i; k<n; k++ {
			if a := math.Abs(A[k][i]); a > ma {
				ma, im = a, k
			}
		}
		if im != i {
			P[i], P[im] = P[im], P[i]
			A[i], A[im] = A[im], A[i]
			P[n]++
		}
		for j := 1+i; j<n; j++ {
			A[j][i] /= A[i][i]
			for k := 1+i; k<n; k++ {
				A[j][k] -= A[j][i] * A[i][k]
			}
		}
	}
	return p
}
