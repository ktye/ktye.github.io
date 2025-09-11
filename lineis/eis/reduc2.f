      subroutine reduc2(nm,n,a,b,dl,ierr)
c
      integer i,j,k,n,i1,j1,nm,nn,ierr
      double precision a(nm,n),b(nm,n),dl(n)
      double precision x,y
c
c     this subroutine is a translation of the algol procedure reduc2,
c     num. math. 11, 99-110(1968) by martin and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 303-314(1971).
c
c     this subroutine reduces the generalized symmetric eigenproblems
c     abx=(lambda)x or bay=(lambda)y, where b is positive definite,
c     to the standard symmetric eigenproblem using the cholesky
c     factorization of b.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrices a and b.  if the cholesky
c          factor l of b is already available, n should be prefixed
c          with a minus sign.
c
c        a and b contain the real symmetric input matrices.  only the
c          full upper triangles of the matrices need be supplied.  if
c          n is negative, the strict lower triangle of b contains,
c          instead, the strict lower triangle of its cholesky factor l.
c
c        dl contains, if n is negative, the diagonal elements of l.
c
c     on output
c
c        a contains in its full lower triangle the full lower triangle
c          of the symmetric matrix derived from the reduction to the
c          standard form.  the strict upper triangle of a is unaltered.
c
c        b contains in its strict lower triangle the strict lower
c          triangle of its cholesky factor l.  the full upper
c          triangle of b is unaltered.
c
c        dl contains the diagonal elements of l.
c
c        ierr is set to
c          zero       for normal return,
c          7*n+1      if b is not positive definite.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 0
      nn = iabs(n)
      if (n .lt. 0) go to 100
c     .......... form l in the arrays b and dl ..........
      do 80 i = 1, n
         i1 = i - 1
c
         do 80 j = i, n
            x = b(i,j)
            if (i .eq. 1) go to 40
c
            do 20 k = 1, i1
   20       x = x - b(i,k) * b(j,k)
c
   40       if (j .ne. i) go to 60
            if (x .le. 0.0d0) go to 1000
            y = dsqrt(x)
            dl(i) = y
            go to 80
   60       b(j,i) = x / y
   80 continue
c     .......... form the lower triangle of a*l
c                in the lower triangle of the array a ..........
  100 do 200 i = 1, nn
         i1 = i + 1
c
         do 200 j = 1, i
            x = a(j,i) * dl(j)
            if (j .eq. i) go to 140
            j1 = j + 1
c
            do 120 k = j1, i
  120       x = x + a(k,i) * b(k,j)
c
  140       if (i .eq. nn) go to 180
c
            do 160 k = i1, nn
  160       x = x + a(i,k) * b(k,j)
c
  180       a(i,j) = x
  200 continue
c     .......... pre-multiply by transpose(l) and overwrite ..........
      do 300 i = 1, nn
         i1 = i + 1
         y = dl(i)
c
         do 300 j = 1, i
            x = y * a(i,j)
            if (i .eq. nn) go to 280
c
            do 260 k = i1, nn
  260       x = x + a(k,j) * b(k,i)
c
  280       a(i,j) = x
  300 continue
c
      go to 1001
c     .......... set error -- b is not positive definite ..........
 1000 ierr = 7 * n + 1
 1001 return
      end
