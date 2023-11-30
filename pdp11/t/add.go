package main

func main() {
	f(3, 4)
}
func f(x, y int32) int32 {
	a := x + 3*y
	b := 4*x + y
	return a + b
}
