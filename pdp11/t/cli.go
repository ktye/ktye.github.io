package main

import . "github.com/ktye/wg/module"

func main() {
	ind(1, 2) //4
}
func init() {
	Functions(0, ic1, ic2)
}

type f1 func(int32) int32

func ind(x, y int32) int32 {
	return Func[x].(f1)(y)
}
func ic1(x int32) int32 { return 1 + x }
func ic2(x int32) int32 { return 2 + x }
