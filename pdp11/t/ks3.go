package main

func main() {
	f(91234567890) //21 0
}
func f(x uint64) uint64 {
	return uint64(x) >> 32
}
