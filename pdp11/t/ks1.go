package main

func main() {
	f(13) //0 1744830464
}
func f(x int32) uint64 {
	return uint64(x) << 59
}
