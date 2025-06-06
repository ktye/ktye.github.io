(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 block
  loop 
   local.get 0
   i32.const 10
   i32.lt_s
   i32.eqz
   br_if 1
   local.get 0
   i32.const 5
   i32.lt_s
   if
    br 2
   end
   local.get 0
   i32.const 6
   i32.gt_s
   if
    local.get 0
    i32.const 4
    i32.add
    local.set 0
    br 1
   end
   local.get 0
   i32.const 1
   i32.add
   local.set 0
   br 0
  end
 end
 local.get 0))