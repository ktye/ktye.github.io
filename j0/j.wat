(module
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func (param i32 i32) (result i32)))
  (type (;2;) (func (param i32 i32 i32) (result i32)))
  (type (;3;) (func (result i32)))
  (import "env" "malloc" (func $malloc (type 0)))
  (import "env" "printf" (func $printf (type 1)))
  (import "env" "strlen" (func $strlen (type 0)))
  (func $ma (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 3
    i32.load offset=12
    local.set 4
    i32.const 2
    local.set 5
    local.get 4
    local.get 5
    i32.shl
    local.set 6
    local.get 6
    call $malloc
    local.set 7
    i32.const 16
    local.set 8
    local.get 3
    local.get 8
    i32.add
    local.set 9
    local.get 9
    global.set 0
    local.get 7
    return)
  (func $mv (type 2) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 3
    i32.const 32
    local.set 4
    local.get 3
    local.get 4
    i32.sub
    local.set 5
    i32.const 0
    local.set 6
    local.get 5
    local.get 0
    i32.store offset=24
    local.get 5
    local.get 1
    i32.store offset=20
    local.get 5
    local.get 2
    i32.store offset=16
    local.get 5
    local.get 6
    i32.store offset=12
    local.get 5
    i32.load offset=16
    local.set 7
    local.get 5
    local.get 7
    i32.store offset=8
    block  ;; label = @1
      loop  ;; label = @2
        local.get 5
        i32.load offset=12
        local.set 8
        local.get 5
        i32.load offset=8
        local.set 9
        local.get 8
        local.set 10
        local.get 9
        local.set 11
        local.get 10
        local.get 11
        i32.lt_s
        local.set 12
        i32.const 1
        local.set 13
        local.get 12
        local.get 13
        i32.and
        local.set 14
        local.get 14
        i32.eqz
        br_if 1 (;@1;)
        local.get 5
        i32.load offset=20
        local.set 15
        local.get 5
        i32.load offset=12
        local.set 16
        i32.const 2
        local.set 17
        local.get 16
        local.get 17
        i32.shl
        local.set 18
        local.get 15
        local.get 18
        i32.add
        local.set 19
        local.get 19
        i32.load
        local.set 20
        local.get 5
        i32.load offset=24
        local.set 21
        local.get 5
        i32.load offset=12
        local.set 22
        i32.const 2
        local.set 23
        local.get 22
        local.get 23
        i32.shl
        local.set 24
        local.get 21
        local.get 24
        i32.add
        local.set 25
        local.get 25
        local.get 20
        i32.store
        local.get 5
        i32.load offset=12
        local.set 26
        i32.const 1
        local.set 27
        local.get 26
        local.get 27
        i32.add
        local.set 28
        local.get 5
        local.get 28
        i32.store offset=12
        br 0 (;@2;)
      end
    end
    local.get 5
    i32.load offset=28
    local.set 29
    local.get 29
    return)
  (func $tr (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 32
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    i32.const 0
    local.set 5
    i32.const 1
    local.set 6
    local.get 4
    local.get 0
    i32.store offset=28
    local.get 4
    local.get 1
    i32.store offset=24
    local.get 4
    local.get 6
    i32.store offset=20
    local.get 4
    local.get 5
    i32.store offset=16
    local.get 4
    i32.load offset=28
    local.set 7
    local.get 4
    local.get 7
    i32.store offset=12
    block  ;; label = @1
      loop  ;; label = @2
        local.get 4
        i32.load offset=16
        local.set 8
        local.get 4
        i32.load offset=12
        local.set 9
        local.get 8
        local.set 10
        local.get 9
        local.set 11
        local.get 10
        local.get 11
        i32.lt_s
        local.set 12
        i32.const 1
        local.set 13
        local.get 12
        local.get 13
        i32.and
        local.set 14
        local.get 14
        i32.eqz
        br_if 1 (;@1;)
        local.get 4
        i32.load offset=20
        local.set 15
        local.get 4
        i32.load offset=24
        local.set 16
        local.get 4
        i32.load offset=16
        local.set 17
        i32.const 2
        local.set 18
        local.get 17
        local.get 18
        i32.shl
        local.set 19
        local.get 16
        local.get 19
        i32.add
        local.set 20
        local.get 20
        i32.load
        local.set 21
        local.get 15
        local.get 21
        i32.mul
        local.set 22
        local.get 4
        local.get 22
        i32.store offset=20
        local.get 4
        i32.load offset=16
        local.set 23
        i32.const 1
        local.set 24
        local.get 23
        local.get 24
        i32.add
        local.set 25
        local.get 4
        local.get 25
        i32.store offset=16
        br 0 (;@2;)
      end
    end
    local.get 4
    i32.load offset=20
    local.set 26
    local.get 26
    return)
  (func $ga (type 2) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 3
    i32.const 16
    local.set 4
    local.get 3
    local.get 4
    i32.sub
    local.set 5
    local.get 5
    global.set 0
    local.get 5
    local.get 0
    i32.store offset=12
    local.get 5
    local.get 1
    i32.store offset=8
    local.get 5
    local.get 2
    i32.store offset=4
    local.get 5
    i32.load offset=8
    local.set 6
    local.get 5
    i32.load offset=4
    local.set 7
    local.get 6
    local.get 7
    call $tr
    local.set 8
    i32.const 5
    local.set 9
    local.get 8
    local.get 9
    i32.add
    local.set 10
    local.get 10
    call $ma
    local.set 11
    local.get 5
    local.get 11
    i32.store
    local.get 5
    i32.load offset=12
    local.set 12
    local.get 5
    i32.load
    local.set 13
    local.get 13
    local.get 12
    i32.store
    local.get 5
    i32.load offset=8
    local.set 14
    local.get 5
    i32.load
    local.set 15
    local.get 15
    local.get 14
    i32.store offset=4
    local.get 5
    i32.load
    local.set 16
    i32.const 8
    local.set 17
    local.get 16
    local.get 17
    i32.add
    local.set 18
    local.get 5
    i32.load offset=4
    local.set 19
    local.get 5
    i32.load offset=8
    local.set 20
    local.get 18
    local.get 19
    local.get 20
    call $mv
    drop
    local.get 5
    i32.load
    local.set 21
    i32.const 16
    local.set 22
    local.get 5
    local.get 22
    i32.add
    local.set 23
    local.get 23
    global.set 0
    local.get 21
    return)
  (func $iota (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 32
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 0
    local.set 4
    i32.const 1
    local.set 5
    i32.const 24
    local.set 6
    local.get 3
    local.get 6
    i32.add
    local.set 7
    local.get 7
    local.set 8
    local.get 3
    local.get 0
    i32.store offset=28
    local.get 3
    i32.load offset=28
    local.set 9
    local.get 9
    i32.load offset=20
    local.set 10
    local.get 3
    local.get 10
    i32.store offset=24
    local.get 4
    local.get 5
    local.get 8
    call $ga
    local.set 11
    local.get 3
    local.get 11
    i32.store offset=20
    local.get 3
    local.get 4
    i32.store offset=16
    local.get 3
    i32.load offset=24
    local.set 12
    local.get 3
    local.get 12
    i32.store offset=12
    block  ;; label = @1
      loop  ;; label = @2
        local.get 3
        i32.load offset=16
        local.set 13
        local.get 3
        i32.load offset=12
        local.set 14
        local.get 13
        local.set 15
        local.get 14
        local.set 16
        local.get 15
        local.get 16
        i32.lt_s
        local.set 17
        i32.const 1
        local.set 18
        local.get 17
        local.get 18
        i32.and
        local.set 19
        local.get 19
        i32.eqz
        br_if 1 (;@1;)
        local.get 3
        i32.load offset=16
        local.set 20
        local.get 3
        i32.load offset=20
        local.set 21
        i32.const 20
        local.set 22
        local.get 21
        local.get 22
        i32.add
        local.set 23
        local.get 3
        i32.load offset=16
        local.set 24
        i32.const 2
        local.set 25
        local.get 24
        local.get 25
        i32.shl
        local.set 26
        local.get 23
        local.get 26
        i32.add
        local.set 27
        local.get 27
        local.get 20
        i32.store
        local.get 3
        i32.load offset=16
        local.set 28
        i32.const 1
        local.set 29
        local.get 28
        local.get 29
        i32.add
        local.set 30
        local.get 3
        local.get 30
        i32.store offset=16
        br 0 (;@2;)
      end
    end
    local.get 3
    i32.load offset=20
    local.set 31
    i32.const 32
    local.set 32
    local.get 3
    local.get 32
    i32.add
    local.set 33
    local.get 33
    global.set 0
    local.get 31
    return)
  (func $plus (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 32
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    global.set 0
    i32.const 0
    local.set 5
    local.get 4
    local.get 0
    i32.store offset=28
    local.get 4
    local.get 1
    i32.store offset=24
    local.get 4
    i32.load offset=24
    local.set 6
    local.get 6
    i32.load offset=4
    local.set 7
    local.get 4
    local.get 7
    i32.store offset=20
    local.get 4
    i32.load offset=24
    local.set 8
    i32.const 8
    local.set 9
    local.get 8
    local.get 9
    i32.add
    local.set 10
    local.get 4
    local.get 10
    i32.store offset=16
    local.get 4
    i32.load offset=20
    local.set 11
    local.get 4
    i32.load offset=16
    local.set 12
    local.get 11
    local.get 12
    call $tr
    local.set 13
    local.get 4
    local.get 13
    i32.store offset=12
    local.get 4
    i32.load offset=20
    local.set 14
    local.get 4
    i32.load offset=16
    local.set 15
    local.get 5
    local.get 14
    local.get 15
    call $ga
    local.set 16
    local.get 4
    local.get 16
    i32.store offset=8
    local.get 4
    local.get 5
    i32.store offset=4
    local.get 4
    i32.load offset=12
    local.set 17
    local.get 4
    local.get 17
    i32.store
    block  ;; label = @1
      loop  ;; label = @2
        local.get 4
        i32.load offset=4
        local.set 18
        local.get 4
        i32.load
        local.set 19
        local.get 18
        local.set 20
        local.get 19
        local.set 21
        local.get 20
        local.get 21
        i32.lt_s
        local.set 22
        i32.const 1
        local.set 23
        local.get 22
        local.get 23
        i32.and
        local.set 24
        local.get 24
        i32.eqz
        br_if 1 (;@1;)
        local.get 4
        i32.load offset=28
        local.set 25
        i32.const 20
        local.set 26
        local.get 25
        local.get 26
        i32.add
        local.set 27
        local.get 4
        i32.load offset=4
        local.set 28
        i32.const 2
        local.set 29
        local.get 28
        local.get 29
        i32.shl
        local.set 30
        local.get 27
        local.get 30
        i32.add
        local.set 31
        local.get 31
        i32.load
        local.set 32
        local.get 4
        i32.load offset=24
        local.set 33
        i32.const 20
        local.set 34
        local.get 33
        local.get 34
        i32.add
        local.set 35
        local.get 4
        i32.load offset=4
        local.set 36
        i32.const 2
        local.set 37
        local.get 36
        local.get 37
        i32.shl
        local.set 38
        local.get 35
        local.get 38
        i32.add
        local.set 39
        local.get 39
        i32.load
        local.set 40
        local.get 32
        local.get 40
        i32.add
        local.set 41
        local.get 4
        i32.load offset=8
        local.set 42
        i32.const 20
        local.set 43
        local.get 42
        local.get 43
        i32.add
        local.set 44
        local.get 4
        i32.load offset=4
        local.set 45
        i32.const 2
        local.set 46
        local.get 45
        local.get 46
        i32.shl
        local.set 47
        local.get 44
        local.get 47
        i32.add
        local.set 48
        local.get 48
        local.get 41
        i32.store
        local.get 4
        i32.load offset=4
        local.set 49
        i32.const 1
        local.set 50
        local.get 49
        local.get 50
        i32.add
        local.set 51
        local.get 4
        local.get 51
        i32.store offset=4
        br 0 (;@2;)
      end
    end
    local.get 4
    i32.load offset=8
    local.set 52
    i32.const 32
    local.set 53
    local.get 4
    local.get 53
    i32.add
    local.set 54
    local.get 54
    global.set 0
    local.get 52
    return)
  (func $from (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 32
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    global.set 0
    local.get 4
    local.get 0
    i32.store offset=28
    local.get 4
    local.get 1
    i32.store offset=24
    local.get 4
    i32.load offset=24
    local.set 5
    local.get 5
    i32.load offset=4
    local.set 6
    i32.const 1
    local.set 7
    local.get 6
    local.get 7
    i32.sub
    local.set 8
    local.get 4
    local.get 8
    i32.store offset=20
    local.get 4
    i32.load offset=24
    local.set 9
    i32.const 8
    local.set 10
    local.get 9
    local.get 10
    i32.add
    local.set 11
    i32.const 4
    local.set 12
    local.get 11
    local.get 12
    i32.add
    local.set 13
    local.get 4
    local.get 13
    i32.store offset=16
    local.get 4
    i32.load offset=20
    local.set 14
    local.get 4
    i32.load offset=16
    local.set 15
    local.get 14
    local.get 15
    call $tr
    local.set 16
    local.get 4
    local.get 16
    i32.store offset=12
    local.get 4
    i32.load offset=24
    local.set 17
    local.get 17
    i32.load
    local.set 18
    local.get 4
    i32.load offset=20
    local.set 19
    local.get 4
    i32.load offset=16
    local.set 20
    local.get 18
    local.get 19
    local.get 20
    call $ga
    local.set 21
    local.get 4
    local.get 21
    i32.store offset=8
    local.get 4
    i32.load offset=8
    local.set 22
    i32.const 20
    local.set 23
    local.get 22
    local.get 23
    i32.add
    local.set 24
    local.get 4
    i32.load offset=24
    local.set 25
    i32.const 20
    local.set 26
    local.get 25
    local.get 26
    i32.add
    local.set 27
    local.get 4
    i32.load offset=12
    local.set 28
    local.get 4
    i32.load offset=28
    local.set 29
    local.get 29
    i32.load offset=20
    local.set 30
    local.get 28
    local.get 30
    i32.mul
    local.set 31
    i32.const 2
    local.set 32
    local.get 31
    local.get 32
    i32.shl
    local.set 33
    local.get 27
    local.get 33
    i32.add
    local.set 34
    local.get 4
    i32.load offset=12
    local.set 35
    local.get 24
    local.get 34
    local.get 35
    call $mv
    drop
    local.get 4
    i32.load offset=8
    local.set 36
    i32.const 32
    local.set 37
    local.get 4
    local.get 37
    i32.add
    local.set 38
    local.get 38
    global.set 0
    local.get 36
    return)
  (func $box (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 1
    local.set 4
    i32.const 0
    local.set 5
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 4
    local.get 5
    local.get 5
    call $ga
    local.set 6
    local.get 3
    local.get 6
    i32.store offset=8
    local.get 3
    i32.load offset=12
    local.set 7
    local.get 3
    i32.load offset=8
    local.set 8
    local.get 8
    local.get 7
    i32.store offset=20
    local.get 3
    i32.load offset=8
    local.set 9
    i32.const 16
    local.set 10
    local.get 3
    local.get 10
    i32.add
    local.set 11
    local.get 11
    global.set 0
    local.get 9
    return)
  (func $cat (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 32
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    global.set 0
    i32.const 1
    local.set 5
    i32.const 12
    local.set 6
    local.get 4
    local.get 6
    i32.add
    local.set 7
    local.get 7
    local.set 8
    local.get 4
    local.get 0
    i32.store offset=28
    local.get 4
    local.get 1
    i32.store offset=24
    local.get 4
    i32.load offset=28
    local.set 9
    local.get 9
    i32.load offset=4
    local.set 10
    local.get 4
    i32.load offset=28
    local.set 11
    i32.const 8
    local.set 12
    local.get 11
    local.get 12
    i32.add
    local.set 13
    local.get 10
    local.get 13
    call $tr
    local.set 14
    local.get 4
    local.get 14
    i32.store offset=20
    local.get 4
    i32.load offset=24
    local.set 15
    local.get 15
    i32.load offset=4
    local.set 16
    local.get 4
    i32.load offset=24
    local.set 17
    i32.const 8
    local.set 18
    local.get 17
    local.get 18
    i32.add
    local.set 19
    local.get 16
    local.get 19
    call $tr
    local.set 20
    local.get 4
    local.get 20
    i32.store offset=16
    local.get 4
    i32.load offset=20
    local.set 21
    local.get 4
    i32.load offset=16
    local.set 22
    local.get 21
    local.get 22
    i32.add
    local.set 23
    local.get 4
    local.get 23
    i32.store offset=12
    local.get 4
    i32.load offset=24
    local.set 24
    local.get 24
    i32.load
    local.set 25
    local.get 25
    local.get 5
    local.get 8
    call $ga
    local.set 26
    local.get 4
    local.get 26
    i32.store offset=8
    local.get 4
    i32.load offset=8
    local.set 27
    i32.const 20
    local.set 28
    local.get 27
    local.get 28
    i32.add
    local.set 29
    local.get 4
    i32.load offset=28
    local.set 30
    i32.const 20
    local.set 31
    local.get 30
    local.get 31
    i32.add
    local.set 32
    local.get 4
    i32.load offset=20
    local.set 33
    local.get 29
    local.get 32
    local.get 33
    call $mv
    drop
    local.get 4
    i32.load offset=8
    local.set 34
    i32.const 20
    local.set 35
    local.get 34
    local.get 35
    i32.add
    local.set 36
    local.get 4
    i32.load offset=20
    local.set 37
    i32.const 2
    local.set 38
    local.get 37
    local.get 38
    i32.shl
    local.set 39
    local.get 36
    local.get 39
    i32.add
    local.set 40
    local.get 4
    i32.load offset=24
    local.set 41
    i32.const 20
    local.set 42
    local.get 41
    local.get 42
    i32.add
    local.set 43
    local.get 4
    i32.load offset=16
    local.set 44
    local.get 40
    local.get 43
    local.get 44
    call $mv
    drop
    local.get 4
    i32.load offset=8
    local.set 45
    i32.const 32
    local.set 46
    local.get 4
    local.get 46
    i32.add
    local.set 47
    local.get 47
    global.set 0
    local.get 45
    return)
  (func $find (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 16
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    local.get 0
    i32.store offset=8
    local.get 4
    local.get 1
    i32.store offset=4
    local.get 4
    i32.load offset=12
    local.set 5
    local.get 5
    return)
  (func $rsh (type 1) (param i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 32
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    global.set 0
    local.get 4
    local.get 0
    i32.store offset=28
    local.get 4
    local.get 1
    i32.store offset=24
    local.get 4
    i32.load offset=28
    local.set 5
    local.get 5
    i32.load offset=4
    local.set 6
    block  ;; label = @1
      block  ;; label = @2
        local.get 6
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        i32.load offset=28
        local.set 7
        local.get 7
        i32.load offset=8
        local.set 8
        local.get 8
        local.set 9
        br 1 (;@1;)
      end
      i32.const 1
      local.set 10
      local.get 10
      local.set 9
    end
    local.get 9
    local.set 11
    local.get 4
    local.get 11
    i32.store offset=20
    local.get 4
    i32.load offset=20
    local.set 12
    local.get 4
    i32.load offset=28
    local.set 13
    i32.const 20
    local.set 14
    local.get 13
    local.get 14
    i32.add
    local.set 15
    local.get 12
    local.get 15
    call $tr
    local.set 16
    local.get 4
    local.get 16
    i32.store offset=16
    local.get 4
    i32.load offset=24
    local.set 17
    local.get 17
    i32.load offset=4
    local.set 18
    local.get 4
    i32.load offset=24
    local.set 19
    i32.const 8
    local.set 20
    local.get 19
    local.get 20
    i32.add
    local.set 21
    local.get 18
    local.get 21
    call $tr
    local.set 22
    local.get 4
    local.get 22
    i32.store offset=12
    local.get 4
    i32.load offset=24
    local.set 23
    local.get 23
    i32.load
    local.set 24
    local.get 4
    i32.load offset=20
    local.set 25
    local.get 4
    i32.load offset=28
    local.set 26
    i32.const 20
    local.set 27
    local.get 26
    local.get 27
    i32.add
    local.set 28
    local.get 24
    local.get 25
    local.get 28
    call $ga
    local.set 29
    local.get 4
    local.get 29
    i32.store offset=8
    local.get 4
    i32.load offset=8
    local.set 30
    i32.const 20
    local.set 31
    local.get 30
    local.get 31
    i32.add
    local.set 32
    local.get 4
    i32.load offset=24
    local.set 33
    i32.const 20
    local.set 34
    local.get 33
    local.get 34
    i32.add
    local.set 35
    local.get 4
    i32.load offset=16
    local.set 36
    local.get 4
    i32.load offset=12
    local.set 37
    local.get 36
    local.set 38
    local.get 37
    local.set 39
    local.get 38
    local.get 39
    i32.gt_s
    local.set 40
    i32.const 1
    local.set 41
    local.get 40
    local.get 41
    i32.and
    local.set 42
    block  ;; label = @1
      block  ;; label = @2
        local.get 42
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        i32.load offset=12
        local.set 43
        local.get 43
        local.set 44
        br 1 (;@1;)
      end
      local.get 4
      i32.load offset=16
      local.set 45
      local.get 45
      local.set 44
    end
    local.get 44
    local.set 46
    local.get 4
    local.get 46
    i32.store offset=12
    local.get 32
    local.get 35
    local.get 46
    call $mv
    drop
    local.get 4
    i32.load offset=12
    local.set 47
    local.get 4
    i32.load offset=16
    local.set 48
    local.get 48
    local.get 47
    i32.sub
    local.set 49
    local.get 4
    local.get 49
    i32.store offset=16
    block  ;; label = @1
      local.get 49
      i32.eqz
      br_if 0 (;@1;)
      local.get 4
      i32.load offset=8
      local.set 50
      i32.const 20
      local.set 51
      local.get 50
      local.get 51
      i32.add
      local.set 52
      local.get 4
      i32.load offset=12
      local.set 53
      i32.const 2
      local.set 54
      local.get 53
      local.get 54
      i32.shl
      local.set 55
      local.get 52
      local.get 55
      i32.add
      local.set 56
      local.get 4
      i32.load offset=8
      local.set 57
      i32.const 20
      local.set 58
      local.get 57
      local.get 58
      i32.add
      local.set 59
      local.get 4
      i32.load offset=16
      local.set 60
      local.get 56
      local.get 59
      local.get 60
      call $mv
      drop
    end
    local.get 4
    i32.load offset=8
    local.set 61
    i32.const 32
    local.set 62
    local.get 4
    local.get 62
    i32.add
    local.set 63
    local.get 63
    global.set 0
    local.get 61
    return)
  (func $sha (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 0
    local.set 4
    i32.const 1
    local.set 5
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 3
    i32.load offset=12
    local.set 6
    i32.const 4
    local.set 7
    local.get 6
    local.get 7
    i32.add
    local.set 8
    local.get 4
    local.get 5
    local.get 8
    call $ga
    local.set 9
    local.get 3
    local.get 9
    i32.store offset=8
    local.get 3
    i32.load offset=8
    local.set 10
    i32.const 20
    local.set 11
    local.get 10
    local.get 11
    i32.add
    local.set 12
    local.get 3
    i32.load offset=12
    local.set 13
    i32.const 8
    local.set 14
    local.get 13
    local.get 14
    i32.add
    local.set 15
    local.get 3
    i32.load offset=12
    local.set 16
    local.get 16
    i32.load offset=4
    local.set 17
    local.get 12
    local.get 15
    local.get 17
    call $mv
    drop
    local.get 3
    i32.load offset=8
    local.set 18
    i32.const 16
    local.set 19
    local.get 3
    local.get 19
    i32.add
    local.set 20
    local.get 20
    global.set 0
    local.get 18
    return)
  (func $id (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 3
    i32.load offset=12
    local.set 4
    local.get 4
    return)
  (func $size (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 0
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 4
    local.get 4
    local.get 4
    call $ga
    local.set 5
    local.get 3
    local.get 5
    i32.store offset=8
    local.get 3
    i32.load offset=12
    local.set 6
    local.get 6
    i32.load offset=4
    local.set 7
    block  ;; label = @1
      block  ;; label = @2
        local.get 7
        i32.eqz
        br_if 0 (;@2;)
        local.get 3
        i32.load offset=12
        local.set 8
        local.get 8
        i32.load offset=8
        local.set 9
        local.get 9
        local.set 10
        br 1 (;@1;)
      end
      i32.const 1
      local.set 11
      local.get 11
      local.set 10
    end
    local.get 10
    local.set 12
    local.get 3
    i32.load offset=8
    local.set 13
    local.get 13
    local.get 12
    i32.store offset=20
    local.get 3
    i32.load offset=8
    local.set 14
    i32.const 16
    local.set 15
    local.get 3
    local.get 15
    i32.add
    local.set 16
    local.get 16
    global.set 0
    local.get 14
    return)
  (func $pi (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    local.get 3
    local.get 0
    i32.store offset=8
    local.get 3
    i32.load offset=8
    local.set 4
    local.get 3
    local.get 4
    i32.store
    i32.const 1024
    local.set 5
    local.get 5
    local.get 3
    call $printf
    drop
    local.get 3
    i32.load offset=12
    local.set 6
    i32.const 16
    local.set 7
    local.get 3
    local.get 7
    i32.add
    local.set 8
    local.get 8
    global.set 0
    local.get 6
    return)
  (func $nl (type 3) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 0
    i32.const 16
    local.set 1
    local.get 0
    local.get 1
    i32.sub
    local.set 2
    local.get 2
    global.set 0
    i32.const 1028
    local.set 3
    i32.const 0
    local.set 4
    local.get 3
    local.get 4
    call $printf
    drop
    local.get 2
    i32.load offset=12
    local.set 5
    i32.const 16
    local.set 6
    local.get 2
    local.get 6
    i32.add
    local.set 7
    local.get 7
    global.set 0
    local.get 5
    return)
  (func $pr (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 48
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 0
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=40
    local.get 3
    i32.load offset=40
    local.set 5
    local.get 5
    i32.load offset=4
    local.set 6
    local.get 3
    local.get 6
    i32.store offset=36
    local.get 3
    i32.load offset=40
    local.set 7
    i32.const 8
    local.set 8
    local.get 7
    local.get 8
    i32.add
    local.set 9
    local.get 3
    local.get 9
    i32.store offset=32
    local.get 3
    i32.load offset=36
    local.set 10
    local.get 3
    i32.load offset=32
    local.set 11
    local.get 10
    local.get 11
    call $tr
    local.set 12
    local.get 3
    local.get 12
    i32.store offset=28
    local.get 3
    local.get 4
    i32.store offset=24
    local.get 3
    i32.load offset=36
    local.set 13
    local.get 3
    local.get 13
    i32.store offset=20
    block  ;; label = @1
      loop  ;; label = @2
        local.get 3
        i32.load offset=24
        local.set 14
        local.get 3
        i32.load offset=20
        local.set 15
        local.get 14
        local.set 16
        local.get 15
        local.set 17
        local.get 16
        local.get 17
        i32.lt_s
        local.set 18
        i32.const 1
        local.set 19
        local.get 18
        local.get 19
        i32.and
        local.set 20
        local.get 20
        i32.eqz
        br_if 1 (;@1;)
        local.get 3
        i32.load offset=32
        local.set 21
        local.get 3
        i32.load offset=24
        local.set 22
        i32.const 2
        local.set 23
        local.get 22
        local.get 23
        i32.shl
        local.set 24
        local.get 21
        local.get 24
        i32.add
        local.set 25
        local.get 25
        i32.load
        local.set 26
        local.get 26
        call $pi
        drop
        local.get 3
        i32.load offset=24
        local.set 27
        i32.const 1
        local.set 28
        local.get 27
        local.get 28
        i32.add
        local.set 29
        local.get 3
        local.get 29
        i32.store offset=24
        br 0 (;@2;)
      end
    end
    call $nl
    drop
    local.get 3
    i32.load offset=40
    local.set 30
    local.get 30
    i32.load
    local.set 31
    block  ;; label = @1
      block  ;; label = @2
        local.get 31
        i32.eqz
        br_if 0 (;@2;)
        i32.const 0
        local.set 32
        local.get 3
        local.get 32
        i32.store offset=16
        local.get 3
        i32.load offset=28
        local.set 33
        local.get 3
        local.get 33
        i32.store offset=12
        block  ;; label = @3
          loop  ;; label = @4
            local.get 3
            i32.load offset=16
            local.set 34
            local.get 3
            i32.load offset=12
            local.set 35
            local.get 34
            local.set 36
            local.get 35
            local.set 37
            local.get 36
            local.get 37
            i32.lt_s
            local.set 38
            i32.const 1
            local.set 39
            local.get 38
            local.get 39
            i32.and
            local.set 40
            local.get 40
            i32.eqz
            br_if 1 (;@3;)
            i32.const 1030
            local.set 41
            i32.const 0
            local.set 42
            local.get 41
            local.get 42
            call $printf
            drop
            local.get 3
            i32.load offset=40
            local.set 43
            i32.const 20
            local.set 44
            local.get 43
            local.get 44
            i32.add
            local.set 45
            local.get 3
            i32.load offset=16
            local.set 46
            i32.const 2
            local.set 47
            local.get 46
            local.get 47
            i32.shl
            local.set 48
            local.get 45
            local.get 48
            i32.add
            local.set 49
            local.get 49
            i32.load
            local.set 50
            local.get 50
            call $pr
            drop
            local.get 3
            i32.load offset=16
            local.set 51
            i32.const 1
            local.set 52
            local.get 51
            local.get 52
            i32.add
            local.set 53
            local.get 3
            local.get 53
            i32.store offset=16
            br 0 (;@4;)
          end
        end
        br 1 (;@1;)
      end
      i32.const 0
      local.set 54
      local.get 3
      local.get 54
      i32.store offset=8
      local.get 3
      i32.load offset=28
      local.set 55
      local.get 3
      local.get 55
      i32.store offset=4
      block  ;; label = @2
        loop  ;; label = @3
          local.get 3
          i32.load offset=8
          local.set 56
          local.get 3
          i32.load offset=4
          local.set 57
          local.get 56
          local.set 58
          local.get 57
          local.set 59
          local.get 58
          local.get 59
          i32.lt_s
          local.set 60
          i32.const 1
          local.set 61
          local.get 60
          local.get 61
          i32.and
          local.set 62
          local.get 62
          i32.eqz
          br_if 1 (;@2;)
          local.get 3
          i32.load offset=40
          local.set 63
          i32.const 20
          local.set 64
          local.get 63
          local.get 64
          i32.add
          local.set 65
          local.get 3
          i32.load offset=8
          local.set 66
          i32.const 2
          local.set 67
          local.get 66
          local.get 67
          i32.shl
          local.set 68
          local.get 65
          local.get 68
          i32.add
          local.set 69
          local.get 69
          i32.load
          local.set 70
          local.get 70
          call $pi
          drop
          local.get 3
          i32.load offset=8
          local.set 71
          i32.const 1
          local.set 72
          local.get 71
          local.get 72
          i32.add
          local.set 73
          local.get 3
          local.get 73
          i32.store offset=8
          br 0 (;@3;)
        end
      end
    end
    call $nl
    drop
    local.get 3
    i32.load offset=44
    local.set 74
    i32.const 48
    local.set 75
    local.get 3
    local.get 75
    i32.add
    local.set 76
    local.get 76
    global.set 0
    local.get 74
    return)
  (func $qp (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    i32.const 0
    local.set 4
    i32.const 97
    local.set 5
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 3
    i32.load offset=12
    local.set 6
    local.get 6
    local.set 7
    local.get 5
    local.set 8
    local.get 7
    local.get 8
    i32.ge_s
    local.set 9
    i32.const 1
    local.set 10
    local.get 9
    local.get 10
    i32.and
    local.set 11
    local.get 4
    local.set 12
    block  ;; label = @1
      local.get 11
      i32.eqz
      br_if 0 (;@1;)
      i32.const 122
      local.set 13
      local.get 3
      i32.load offset=12
      local.set 14
      local.get 14
      local.set 15
      local.get 13
      local.set 16
      local.get 15
      local.get 16
      i32.le_s
      local.set 17
      local.get 17
      local.set 12
    end
    local.get 12
    local.set 18
    i32.const 1
    local.set 19
    local.get 18
    local.get 19
    i32.and
    local.set 20
    local.get 20
    return)
  (func $qv (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    i32.const 97
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=12
    local.get 3
    i32.load offset=12
    local.set 5
    local.get 5
    local.set 6
    local.get 4
    local.set 7
    local.get 6
    local.get 7
    i32.lt_s
    local.set 8
    i32.const 1
    local.set 9
    local.get 8
    local.get 9
    i32.and
    local.set 10
    local.get 10
    return)
  (func $ex (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    local.get 3
    local.get 0
    i32.store offset=8
    local.get 3
    i32.load offset=8
    local.set 4
    local.get 4
    i32.load
    local.set 5
    local.get 3
    local.get 5
    i32.store offset=4
    local.get 3
    i32.load offset=4
    local.set 6
    local.get 6
    call $qp
    local.set 7
    block  ;; label = @1
      block  ;; label = @2
        local.get 7
        i32.eqz
        br_if 0 (;@2;)
        i32.const 61
        local.set 8
        local.get 3
        i32.load offset=8
        local.set 9
        local.get 9
        i32.load offset=4
        local.set 10
        local.get 10
        local.set 11
        local.get 8
        local.set 12
        local.get 11
        local.get 12
        i32.eq
        local.set 13
        i32.const 1
        local.set 14
        local.get 13
        local.get 14
        i32.and
        local.set 15
        block  ;; label = @3
          local.get 15
          i32.eqz
          br_if 0 (;@3;)
          i32.const 1120
          local.set 16
          local.get 3
          i32.load offset=8
          local.set 17
          i32.const 8
          local.set 18
          local.get 17
          local.get 18
          i32.add
          local.set 19
          local.get 19
          call $ex
          local.set 20
          local.get 3
          i32.load offset=4
          local.set 21
          i32.const 97
          local.set 22
          local.get 21
          local.get 22
          i32.sub
          local.set 23
          i32.const 2
          local.set 24
          local.get 23
          local.get 24
          i32.shl
          local.set 25
          local.get 16
          local.get 25
          i32.add
          local.set 26
          local.get 26
          local.get 20
          i32.store
          local.get 3
          local.get 20
          i32.store offset=12
          br 2 (;@1;)
        end
        i32.const 1120
        local.set 27
        local.get 3
        i32.load offset=4
        local.set 28
        i32.const 97
        local.set 29
        local.get 28
        local.get 29
        i32.sub
        local.set 30
        i32.const 2
        local.set 31
        local.get 30
        local.get 31
        i32.shl
        local.set 32
        local.get 27
        local.get 32
        i32.add
        local.set 33
        local.get 33
        i32.load
        local.set 34
        local.get 3
        local.get 34
        i32.store offset=4
      end
      local.get 3
      i32.load offset=4
      local.set 35
      local.get 35
      call $qv
      local.set 36
      block  ;; label = @2
        block  ;; label = @3
          local.get 36
          i32.eqz
          br_if 0 (;@3;)
          i32.const 1088
          local.set 37
          local.get 3
          i32.load offset=4
          local.set 38
          i32.const 2
          local.set 39
          local.get 38
          local.get 39
          i32.shl
          local.set 40
          local.get 37
          local.get 40
          i32.add
          local.set 41
          local.get 41
          i32.load
          local.set 42
          local.get 3
          i32.load offset=8
          local.set 43
          i32.const 4
          local.set 44
          local.get 43
          local.get 44
          i32.add
          local.set 45
          local.get 45
          call $ex
          local.set 46
          local.get 46
          local.get 42
          call_indirect (type 0)
          local.set 47
          local.get 47
          local.set 48
          br 1 (;@2;)
        end
        local.get 3
        i32.load offset=8
        local.set 49
        local.get 49
        i32.load offset=4
        local.set 50
        block  ;; label = @3
          block  ;; label = @4
            local.get 50
            i32.eqz
            br_if 0 (;@4;)
            i32.const 1056
            local.set 51
            local.get 3
            i32.load offset=8
            local.set 52
            local.get 52
            i32.load offset=4
            local.set 53
            i32.const 2
            local.set 54
            local.get 53
            local.get 54
            i32.shl
            local.set 55
            local.get 51
            local.get 55
            i32.add
            local.set 56
            local.get 56
            i32.load
            local.set 57
            local.get 3
            i32.load offset=4
            local.set 58
            local.get 3
            i32.load offset=8
            local.set 59
            i32.const 8
            local.set 60
            local.get 59
            local.get 60
            i32.add
            local.set 61
            local.get 61
            call $ex
            local.set 62
            local.get 58
            local.get 62
            local.get 57
            call_indirect (type 1)
            local.set 63
            local.get 63
            local.set 64
            br 1 (;@3;)
          end
          local.get 3
          i32.load offset=4
          local.set 65
          local.get 65
          local.set 64
        end
        local.get 64
        local.set 66
        local.get 66
        local.set 48
      end
      local.get 48
      local.set 67
      local.get 3
      local.get 67
      i32.store offset=12
    end
    local.get 3
    i32.load offset=12
    local.set 68
    i32.const 16
    local.set 69
    local.get 3
    local.get 69
    i32.add
    local.set 70
    local.get 70
    global.set 0
    local.get 68
    return)
  (func $noun (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 48
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=8
    local.get 3
    i32.load offset=8
    local.set 5
    local.get 5
    local.set 6
    local.get 4
    local.set 7
    local.get 6
    local.get 7
    i32.lt_s
    local.set 8
    i32.const 1
    local.set 9
    local.get 8
    local.get 9
    i32.and
    local.set 10
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          local.get 10
          br_if 0 (;@3;)
          i32.const 57
          local.set 11
          local.get 3
          i32.load offset=8
          local.set 12
          local.get 12
          local.set 13
          local.get 11
          local.set 14
          local.get 13
          local.get 14
          i32.gt_s
          local.set 15
          i32.const 1
          local.set 16
          local.get 15
          local.get 16
          i32.and
          local.set 17
          local.get 17
          i32.eqz
          br_if 1 (;@2;)
        end
        i32.const 0
        local.set 18
        local.get 3
        local.get 18
        i32.store offset=12
        br 1 (;@1;)
      end
      i32.const 0
      local.set 19
      local.get 19
      local.get 19
      local.get 19
      call $ga
      local.set 20
      local.get 3
      local.get 20
      i32.store offset=4
      local.get 3
      i32.load offset=8
      local.set 21
      i32.const 48
      local.set 22
      local.get 21
      local.get 22
      i32.sub
      local.set 23
      local.get 3
      i32.load offset=4
      local.set 24
      local.get 24
      local.get 23
      i32.store offset=20
      local.get 3
      i32.load offset=4
      local.set 25
      local.get 3
      local.get 25
      i32.store offset=12
    end
    local.get 3
    i32.load offset=12
    local.set 26
    i32.const 16
    local.set 27
    local.get 3
    local.get 27
    i32.add
    local.set 28
    local.get 28
    global.set 0
    local.get 26
    return)
  (func $verb (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    i32.const 0
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=8
    local.get 3
    local.get 4
    i32.store offset=4
    block  ;; label = @1
      block  ;; label = @2
        loop  ;; label = @3
          i32.const 0
          local.set 5
          local.get 3
          i32.load offset=4
          local.set 6
          local.get 6
          i32.load8_u offset=1040
          local.set 7
          i32.const 255
          local.set 8
          local.get 7
          local.get 8
          i32.and
          local.set 9
          i32.const 255
          local.set 10
          local.get 5
          local.get 10
          i32.and
          local.set 11
          local.get 9
          local.get 11
          i32.ne
          local.set 12
          i32.const 1
          local.set 13
          local.get 12
          local.get 13
          i32.and
          local.set 14
          local.get 14
          i32.eqz
          br_if 1 (;@2;)
          local.get 3
          i32.load offset=4
          local.set 15
          i32.const 1
          local.set 16
          local.get 15
          local.get 16
          i32.add
          local.set 17
          local.get 3
          local.get 17
          i32.store offset=4
          local.get 15
          i32.load8_u offset=1040
          local.set 18
          i32.const 24
          local.set 19
          local.get 18
          local.get 19
          i32.shl
          local.set 20
          local.get 20
          local.get 19
          i32.shr_s
          local.set 21
          local.get 3
          i32.load offset=8
          local.set 22
          local.get 21
          local.set 23
          local.get 22
          local.set 24
          local.get 23
          local.get 24
          i32.eq
          local.set 25
          i32.const 1
          local.set 26
          local.get 25
          local.get 26
          i32.and
          local.set 27
          block  ;; label = @4
            local.get 27
            i32.eqz
            br_if 0 (;@4;)
            local.get 3
            i32.load offset=4
            local.set 28
            local.get 3
            local.get 28
            i32.store offset=12
            br 3 (;@1;)
          end
          br 0 (;@3;)
        end
      end
      i32.const 0
      local.set 29
      local.get 3
      local.get 29
      i32.store offset=12
    end
    local.get 3
    i32.load offset=12
    local.set 30
    local.get 30
    return)
  (func $wd (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 32
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    i32.const 0
    local.set 4
    local.get 3
    local.get 0
    i32.store offset=28
    local.get 3
    i32.load offset=28
    local.set 5
    local.get 5
    call $strlen
    local.set 6
    local.get 3
    local.get 6
    i32.store offset=20
    local.get 3
    i32.load offset=20
    local.set 7
    i32.const 1
    local.set 8
    local.get 7
    local.get 8
    i32.add
    local.set 9
    local.get 9
    call $ma
    local.set 10
    local.get 3
    local.get 10
    i32.store offset=16
    local.get 3
    local.get 4
    i32.store offset=8
    local.get 3
    i32.load offset=20
    local.set 11
    local.get 3
    local.get 11
    i32.store offset=4
    block  ;; label = @1
      loop  ;; label = @2
        local.get 3
        i32.load offset=8
        local.set 12
        local.get 3
        i32.load offset=4
        local.set 13
        local.get 12
        local.set 14
        local.get 13
        local.set 15
        local.get 14
        local.get 15
        i32.lt_s
        local.set 16
        i32.const 1
        local.set 17
        local.get 16
        local.get 17
        i32.and
        local.set 18
        local.get 18
        i32.eqz
        br_if 1 (;@1;)
        local.get 3
        i32.load offset=28
        local.set 19
        local.get 3
        i32.load offset=8
        local.set 20
        local.get 19
        local.get 20
        i32.add
        local.set 21
        local.get 21
        i32.load8_u
        local.set 22
        local.get 3
        local.get 22
        i32.store8 offset=15
        i32.const 24
        local.set 23
        local.get 22
        local.get 23
        i32.shl
        local.set 24
        local.get 24
        local.get 23
        i32.shr_s
        local.set 25
        local.get 25
        call $noun
        local.set 26
        local.get 3
        local.get 26
        i32.store offset=24
        block  ;; label = @3
          block  ;; label = @4
            local.get 26
            i32.eqz
            br_if 0 (;@4;)
            local.get 3
            i32.load offset=24
            local.set 27
            local.get 27
            local.set 28
            br 1 (;@3;)
          end
          local.get 3
          i32.load8_u offset=15
          local.set 29
          i32.const 24
          local.set 30
          local.get 29
          local.get 30
          i32.shl
          local.set 31
          local.get 31
          local.get 30
          i32.shr_s
          local.set 32
          local.get 32
          call $verb
          local.set 33
          local.get 3
          local.get 33
          i32.store offset=24
          block  ;; label = @4
            block  ;; label = @5
              local.get 33
              i32.eqz
              br_if 0 (;@5;)
              local.get 3
              i32.load offset=24
              local.set 34
              local.get 34
              local.set 35
              br 1 (;@4;)
            end
            local.get 3
            i32.load8_u offset=15
            local.set 36
            i32.const 24
            local.set 37
            local.get 36
            local.get 37
            i32.shl
            local.set 38
            local.get 38
            local.get 37
            i32.shr_s
            local.set 39
            local.get 39
            local.set 35
          end
          local.get 35
          local.set 40
          local.get 40
          local.set 28
        end
        local.get 28
        local.set 41
        local.get 3
        i32.load offset=16
        local.set 42
        local.get 3
        i32.load offset=8
        local.set 43
        i32.const 2
        local.set 44
        local.get 43
        local.get 44
        i32.shl
        local.set 45
        local.get 42
        local.get 45
        i32.add
        local.set 46
        local.get 46
        local.get 41
        i32.store
        local.get 3
        i32.load offset=8
        local.set 47
        i32.const 1
        local.set 48
        local.get 47
        local.get 48
        i32.add
        local.set 49
        local.get 3
        local.get 49
        i32.store offset=8
        br 0 (;@2;)
      end
    end
    i32.const 0
    local.set 50
    local.get 3
    i32.load offset=16
    local.set 51
    local.get 3
    i32.load offset=20
    local.set 52
    i32.const 2
    local.set 53
    local.get 52
    local.get 53
    i32.shl
    local.set 54
    local.get 51
    local.get 54
    i32.add
    local.set 55
    local.get 55
    local.get 50
    i32.store
    local.get 3
    i32.load offset=16
    local.set 56
    i32.const 32
    local.set 57
    local.get 3
    local.get 57
    i32.add
    local.set 58
    local.get 58
    global.set 0
    local.get 56
    return)
  (func $j (type 0) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 1
    i32.const 16
    local.set 2
    local.get 1
    local.get 2
    i32.sub
    local.set 3
    local.get 3
    global.set 0
    local.get 3
    local.get 0
    i32.store offset=8
    local.get 3
    i32.load offset=8
    local.set 4
    local.get 4
    call $wd
    local.set 5
    local.get 5
    call $ex
    local.set 6
    local.get 6
    call $pr
    drop
    local.get 3
    i32.load offset=12
    local.set 7
    i32.const 16
    local.set 8
    local.get 3
    local.get 8
    i32.add
    local.set 9
    local.get 9
    global.set 0
    local.get 7
    return)
  (table (;0;) 11 11 funcref)
  (memory (;0;) 2)
  (global (;0;) (mut i32) (i32.const 66768))
  (export "memory" (memory 0))
  (export "j" (func $j))
  (elem (;0;) (i32.const 1) func $plus $from $find $rsh $cat $id $size $iota $box $sha)
  (data (;0;) (i32.const 1024) "%d \00\0a\00< \00")
  (data (;1;) (i32.const 1040) "+{~<#,\00\00\00\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00\03\00\00\00\00\00\00\00\04\00\00\00\05\00\00\00\00\00\00\00\00\00\00\00\06\00\00\00\07\00\00\00\08\00\00\00\09\00\00\00\0a\00\00\00\00\00\00\00")
  (data (;2;) (i32.const 1120) "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"))
