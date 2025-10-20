package main

import . "github.com/ktye/wg/module"

func f(a, b int32) int32 { return a + b }

func main() {
 	var x int32 = 5
	if x > 3 {
	 	if x < 10 {
			x = f(3, x)
		} else {
			x = 4 + x
		}
	}
	Exit(x)
}
