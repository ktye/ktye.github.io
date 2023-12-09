package main

func main() {
	swc(2) //-6
}
func swc(x int32) int32 {
	switch x-1 {
	case 0:
		x = 2 * x
	case 1:
		x = 3 * x
	default:
		x = 4 * x
	}
	return -x
}
