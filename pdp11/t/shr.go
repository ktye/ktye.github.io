package main

func main() {
	f(1234566, 3) //154320
}
func f(x, y int32) int32 {
	return x >> y
}
