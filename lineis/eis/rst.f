      subroutine rst(nm,n,w,e,matz,z,ierr)
c
      integer i,j,n,nm,ierr,matz
      double precision w(n),e(n),z(nm,n)
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find the eigenvalues and eigenvectors (if desired)
c     of a real symmetric tridiagonal matrix.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrix.
c
c        w  contains the diagonal elements of the real
c        symmetric tridiagonal matrix.
c
c        e  contains the subdiagonal elements of the matrix in
c        its last n-1 positions.  e(1) is arbitrary.
c
c        matz  is an integer variable set equal to zero if
c        only eigenvalues are desired.  otherwise it is set to
c        any non-zero integer for both eigenvalues and eigenvectors.
c
c     on output
c
c        w  contains the eigenvalues in ascending order.
c
c        z  contains the eigenvectors if matz is not zero.
c
c        ierr  is an integer output variable set equal to an error
c           completion code described in the documentation for imtql1
c           and imtql2.  the normal completion code is zero.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      if (n .le. nm) go to 10
      ierr = 10 * n
      go to 50
c
   10 if (matz .ne. 0) go to 20
c     .......... find eigenvalues only ..........
      call  imtql1(n,w,e,ierr)
      go to 50
c     .......... find both eigenvalues and eigenvectors ..........
   20 do 40 i = 1, n
c
         do 30 j = 1, n
            z(j,i) = 0.0d0
   30    continue
c
         z(i,i) = 1.0d0
   40 continue
c
      call  imtql2(nm,n,w,e,z,ierr)
   50 return
      end
