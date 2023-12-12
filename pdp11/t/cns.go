package main

const (
	a int32 = 3
	b       = 4
)

func main() {
	f(a) //7
}
func f(x int32) int32 {
	return x + b
}
