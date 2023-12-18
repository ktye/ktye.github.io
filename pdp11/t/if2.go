package main

func main() {
	if2(3, 4) //5
}
func if2(x, y int32) int32 {
	if x > y {
		x = 6
	} else {
		x = 5
	}
	return x
}
