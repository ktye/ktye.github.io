package main

func main() {
	f(uint64(0x7FF8000123400001)) //591396865 2146959361
	//  1   9024  1  32760
	// 01 021500 01 077770
}
func f(x uint64) uint64 {
	return x
}
