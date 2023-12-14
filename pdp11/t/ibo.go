package main

import . "github.com/ktye/wg/module"

func main() {
	ibo(3, 4) //8
}
func ibo(x, y int32) int32 { return I32B(x > y) << 3 }
