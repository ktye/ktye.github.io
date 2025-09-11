      subroutine rsp(nm,n,nv,a,w,matz,z,fv1,fv2,ierr)
c
      integer i,j,n,nm,nv,ierr,matz
      double precision a(nv),w(n),z(nm,n),fv1(n),fv2(n)
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find the eigenvalues and eigenvectors (if desired)
c     of a real symmetric packed matrix.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrix  a.
c
c        nv  is an integer variable set equal to the
c        dimension of the array  a  as specified for
c        a  in the calling program.  nv  must not be
c        less than  n*(n+1)/2.
c
c        a  contains the lower triangle of the real symmetric
c        packed matrix stored row-wise.
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
    5 if (nv .ge. (n * (n + 1)) / 2) go to 10
      ierr = 20 * n
      go to 50
c
   10 call  tred3(n,nv,a,w,fv1,fv2)
      if (matz .ne. 0) go to 20
c     .......... find eigenvalues only ..........
      call  tqlrat(n,w,fv2,ierr)
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
      call  tql2(nm,n,w,fv1,z,ierr)
      if (ierr .ne. 0) go to 50
      call  trbak3(nm,n,nv,a,n,z)
   50 return
      end
