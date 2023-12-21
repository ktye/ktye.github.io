package main

import . "github.com/ktye/wg/module"

func main() {
	f(17) //18446744073709551604: 2 0
}
func f(x uint64) uint64 {
	y := uint64(15)
	if isfunc(tp(x)) != 0 {
		return cal(x, y)
	}
	return x
}
func cal(x, y uint64) uint64 { return x - y }
func tp(x uint64) int32      { return int32(uint64(x) >> 59) }
func isfunc(t int32) int32   { return I32B(t == 0 || uint32(t-10) < 5) }
