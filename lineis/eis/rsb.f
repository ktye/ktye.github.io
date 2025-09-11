      subroutine rsb(nm,n,mb,a,w,matz,z,fv1,fv2,ierr)
c
      integer n,mb,nm,ierr,matz
      double precision a(nm,mb),w(n),z(nm,n),fv1(n),fv2(n)
      logical tf
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find the eigenvalues and eigenvectors (if desired)
c     of a real symmetric band matrix.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrix  a.
c
c        mb  is the half band width of the matrix, defined as the
c        number of adjacent diagonals, including the principal
c        diagonal, required to specify the non-zero portion of the
c        lower triangle of the matrix.
c
c        a  contains the lower triangle of the real symmetric
c        band matrix.  its lowest subdiagonal is stored in the
c        last  n+1-mb  positions of the first column, its next
c        subdiagonal in the last  n+2-mb  positions of the
c        second column, further subdiagonals similarly, and
c        finally its principal diagonal in the  n  positions
c        of the last column.  contents of storages not part
c        of the matrix are arbitrary.
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
c           completion code described in the documentation for tqlrat
c           and tql2.  the normal completion code is zero.
c
c        fv1  and  fv2  are temporary storage arrays.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      if (n .le. nm) go to 5
      ierr = 10 * n
      go to 50
    5 if (mb .gt. 0) go to 10
      ierr = 12 * n
      go to 50
   10 if (mb .le. n) go to 15
      ierr = 12 * n
      go to 50
c
   15 if (matz .ne. 0) go to 20
c     .......... find eigenvalues only ..........
      tf = .false.
      call  bandr(nm,n,mb,a,w,fv1,fv2,tf,z)
      call  tqlrat(n,w,fv2,ierr)
      go to 50
c     .......... find both eigenvalues and eigenvectors ..........
   20 tf = .true.
      call  bandr(nm,n,mb,a,w,fv1,fv1,tf,z)
      call  tql2(nm,n,w,fv1,z,ierr)
   50 return
      end
