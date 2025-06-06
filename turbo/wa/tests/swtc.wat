(module
(memory (export "memory") 1)
(func (export "test") (param i32) (result i32)
 local.get 0
 block (param i32)
  block (param i32)
   block (param i32)
    block (param i32)
     br_table 0 1 2
    end
    local.get 0
    i32.const 2
    i32.add
    local.set 0
    br 2
   end
   local.get 0
   i32.const 4
   i32.add
   local.set 0
   br 1
  end
  local.get 0
  call $g
  local.set 0
  br 0
 end
 local.get 0)
(func $g (param i32) (result i32)
 local.get 0
 block (param i32) (result i32)
  block (param i32)
   block (param i32)
    br_table 0 1
   end
   local.get 0
   i32.const 4
   i32.add
   br 1
  end
  local.get 0
  i32.const 4
  i32.sub
  br 0
 end))
