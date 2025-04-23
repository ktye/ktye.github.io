(module
(memory (export "memory") 1)
(global (mut i64) (i64.const 0))
(func (export "test") (param i32) (result i32)
 local.get 0
 i64.extend_i32_s
 i64.const 1
 i64.add
 global.set 0
 global.get 0
 i32.wrap_i64))
