package main

import . "github.com/ktye/wg/module"

func main() {
 	x := int32(7);
	switch Args() {
	case 0:
		x *= 2
	case 1:
		x += 5
	default:
		x = -3
	}
	Exit(x)
}
