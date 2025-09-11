      subroutine figi2(nm,n,t,d,e,z,ierr)
c
      integer i,j,n,nm,ierr
      double precision t(nm,3),d(n),e(n),z(nm,n)
      double precision h
c
c     given a nonsymmetric tridiagonal matrix such that the products
c     of corresponding pairs of off-diagonal elements are all
c     non-negative, and zero only when both factors are zero, this
c     subroutine reduces it to a symmetric tridiagonal matrix
c     using and accumulating diagonal similarity transformations.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        t contains the input matrix.  its subdiagonal is
c          stored in the last n-1 positions of the first column,
c          its diagonal in the n positions of the second column,
c          and its superdiagonal in the first n-1 positions of
c          the third column.  t(1,1) and t(n,3) are arbitrary.
c
c     on output
c
c        t is unaltered.
c
c        d contains the diagonal elements of the symmetric matrix.
c
c        e contains the subdiagonal elements of the symmetric
c          matrix in its last n-1 positions.  e(1) is not set.
c
c        z contains the transformation matrix produced in
c          the reduction.
c
c        ierr is set to
c          zero       for normal return,
c          n+i        if t(i,1)*t(i-1,3) is negative,
c          2*n+i      if t(i,1)*t(i-1,3) is zero with
c                     one factor non-zero.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 0
c
      do 100 i = 1, n
c
         do 50 j = 1, n
   50    z(i,j) = 0.0d0
c
         if (i .eq. 1) go to 70
         h = t(i,1) * t(i-1,3)
         if (h) 900, 60, 80
   60    if (t(i,1) .ne. 0.0d0 .or. t(i-1,3) .ne. 0.0d0) go to 1000
         e(i) = 0.0d0
   70    z(i,i) = 1.0d0
         go to 90
   80    e(i) = dsqrt(h)
         z(i,i) = z(i-1,i-1) * e(i) / t(i-1,3)
   90    d(i) = t(i,2)
  100 continue
c
      go to 1001
c     .......... set error -- product of some pair of off-diagonal
c                elements is negative ..........
  900 ierr = n + i
      go to 1001
c     .......... set error -- product of some pair of off-diagonal
c                elements is zero with one member non-zero ..........
 1000 ierr = 2 * n + i
 1001 return
      end
