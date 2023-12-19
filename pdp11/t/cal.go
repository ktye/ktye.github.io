package main

func main() {
	f(g())
}
func g() int32 {
	return 3*4
}
func f(x int32) int32 { return 1+x }
