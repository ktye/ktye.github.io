package main

import . "github.com/ktye/wg/module"

func main() {
	ind(1, 3, 4, 5) //-8
}
func init() {
	Functions(0, ic1, ic2)
}

type f3 func(int32, int32, int32) int32

func ind(x, a, b, c int32) int32 {
	return Func[x].(f3)(a, b, c)
}
func ic1(x int32) int32 { return x }
func ic2(x, y, z int32) int32 { return y * (x - z) }
