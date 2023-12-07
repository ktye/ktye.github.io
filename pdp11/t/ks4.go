package main

func main() {
	f(uint64(0xff000000ffffffff)) //31 0
}
func f(x uint64) uint64 {
	return x >> 59
}
