package main

import . "github.com/ktye/wg/module"

func main() {
	SetI64(1000, int64(123456789123))
	mem(2001, 1000, 8) //31604938015488: -1726315776 7358
}
func mem(x, y, n int32) int64 {
	Memorycopy(x, y, n)
	return I64(2000)
}

/*
var B []byte
func init()                    { B = make([]byte, 2048) }
func Memorycopy(d, s, n int32) { copy(B[d:], B[s:s+n]) }
func I64(x int32) int64        { return int64(binary.LittleEndian.Uint64(B[x:])) }
func SetI64(x int32, y int64)  { binary.LittleEndian.PutUint64(B[x:], uint64(y)) }
*/
