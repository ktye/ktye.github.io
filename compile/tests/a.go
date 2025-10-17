package main

import . "github.com/ktye/wg/module"

func f(a, b int32) int32 { return a + b }

func main() {
 	var x int32 = 5
	Exit(f(x,3))
}
