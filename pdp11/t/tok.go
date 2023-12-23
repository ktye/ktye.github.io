package main

func main() {
	tok(33) //43, 0
}

func tok(x uint64) uint64 {
	s := src()
	s = Cat(s, x)
	return s
}

func src() uint64 { return uint64(12) }
func Cat(x, y uint64) uint64 {
	return x + y
}
