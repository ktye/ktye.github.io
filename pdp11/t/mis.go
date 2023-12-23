package main

func main() {
	mis(4) //-30
}
func mis(x int32) int32 {
	switch x - 2 {
	case 0:
		return -10
	case 1:
		return -20
	case 2:
		return -30
	default:
		return -100
	}
}

