(module
(import "math" "cos" (func $cos (param f64) (result f64)))
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 f64.const 3.141592653589793
 call $cos
 i32.trunc_f64_s))
