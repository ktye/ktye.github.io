(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32) (local i32) (local i32)
 local.get 0
 i32.const 2
 i32.mul
 local.set 1
 local.get 0
 local.tee 2
 local.get 1
 i32.sub))
