(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 loop (result i32)
  local.get 0
  i32.const 1
  i32.add
  local.tee 0
  local.get 0
  i32.const 3
  i32.lt_s
  br_if 0
 end))
