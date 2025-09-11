      subroutine rt(nm,n,a,w,matz,z,fv1,ierr)
c
      integer n,nm,ierr,matz
      double precision a(nm,3),w(n),z(nm,n),fv1(n)
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find the eigenvalues and eigenvectors (if desired)
c     of a special real tridiagonal matrix.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrix  a.
c
c        a  contains the special real tridiagonal matrix in its
c        first three columns.  the subdiagonal elements are stored
c        in the last  n-1  positions of the first column, the
c        diagonal elements in the second column, and the superdiagonal
c        elements in the first  n-1  positions of the third column.
c        elements  a(1,1)  and  a(n,3)  are arbitrary.
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
c        fv1  is a temporary storage array.
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
      call  figi(nm,n,a,w,fv1,fv1,ierr)
      if (ierr .gt. 0) go to 50
      call  imtql1(n,w,fv1,ierr)
      go to 50
c     .......... find both eigenvalues and eigenvectors ..........
   20 call  figi2(nm,n,a,w,fv1,z,ierr)
      if (ierr .ne. 0) go to 50
      call  imtql2(nm,n,w,fv1,z,ierr)
   50 return
      end
