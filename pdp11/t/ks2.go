package main

func main() {
	f(123456) //0 123456
}
func f(x int32) uint64 {
	return uint64(x) << 32
}
