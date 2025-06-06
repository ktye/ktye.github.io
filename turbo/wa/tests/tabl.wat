(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 local.get 0
 local.get 0
 i32.const 0
 call_indirect (param i32) (param i32) (result i32)
 i32.const 4
 i32.mul
 local.get 0
 i32.const 1
 call_indirect (param i32) (param i32) (result i32))
(func $add (param i32) (param i32) (result i32)
 local.get 0
 local.get 1
 i32.add)
(func $sub (param i32) (param i32) (result i32)
 local.get 0
 local.get 1
 i32.sub)
(table 2 funcref)
(elem (i32.const 0) func $add $sub))
