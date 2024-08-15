package x

func init() {
	Memory(1)
	Export(lu)
}

func lu(x uint64) uint64 {
	if tp(x) != 23 {
		trap()
	}
	var xi uint64
	n := nn(x)
	n2 := n * n
	xp := int32(x)
	e := xp + 8*n
	r := mk(22, n2)
	rp := int32(r)
	for xp < e {
		xi = uint64(I64(xp))
		if tp(xi) != 22 {
			trap()
		}
		if nn(xi) != n {
			trap()
		}
		Memorycopy(rp, int32(xi), 16*n)
		xp += 8
		rp += 16 * n
	}
	//...
	return r
}

//k imports
func mk(t, n int32) uint64 { return 0 }
func nn(x uint64) int32    { return 0 }
func tp(x uint64) int32    { return 0 }
func trap()                {}

//runtime
func Memory(blocks int)                   {}
func Export(funcs ...interface{})         {}
func I32(x int32) int32                   { return 0 }
func I64(x int32) int64                   { return 0 }
func F64(x int32) float64                 { return 0 }
func SetI32(x int32, y int32)             {}
func SetI64(x int32, y int64)             {}
func SetF64(x int32, y float64)           {}
func Memorycopy(dst, src, n int32)        {}
func Memoryfill(dst, val, n int32)        {}
func I32B(b bool) int32                   { return 0 }
func I32clz(x int32) int32                { return 0 }
func I64clz(x uint64) int64               { return 0 }
func I32ctz(x uint32) int32               { return 0 }
func I64ctz(x uint64) int64               { return 0 }
func I32popcnt(x uint32) int32            { return 0 }
func I64popcnt(x uint64) int64            { return 0 }
func F64abs(x float64) float64            { return 0 }
func F64sqrt(x float64) float64           { return 0 }
func F64ceil(x float64) float64           { return 0 }
func F64floor(x float64) float64          { return 0 }
func F64nearest(x float64) float64        { return 0 }
func F64min(x, y float64) float64         { return 0 }
func F64max(x, y float64) float64         { return 0 }
func F64copysign(x, y float64) float64    { return 0 }
func F32reinterpret_i32(x uint32) float32 { return 0 }
func F64reinterpret_i64(x uint64) float64 { return 0 }
func I32reinterpret_f32(x float32) uint32 { return 0 }
func I64reinterpret_f64(x float64) uint64 { return 0 }
