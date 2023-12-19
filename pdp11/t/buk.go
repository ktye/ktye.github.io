package main

import . "github.com/ktye/wg/module"

func main() {
	bucket(1000) //10
}
func bucket(size int32) int32 {
	return maxi(5, int32(32)-I32clz(15+size))
}
func maxi(x, y int32) int32 {
	if x > y {
		return x
	} else {
		return y
	}
}
