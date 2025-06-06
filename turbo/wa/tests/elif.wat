(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 local.get 0
 i32.const 5
 i32.lt_s
 if (result i32)
  local.get 0
  call $g
 else
  local.get 0
  call $h
 end)
(func $g (param i32) (result i32)
 local.get 0
 i32.const 3
 i32.gt_s
 if
  local.get 0
  i32.const 5
  i32.mul
  return
 else
  local.get 0
  i32.const 4
  i32.add
  local.set 0
 end
 local.get 0)
(func $h (param i32) (result i32)
 local.get 0
 i32.const 10
 i32.lt_s
 if
  i32.const 33
  return
 end
 local.get 0))
