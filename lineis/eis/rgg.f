      subroutine rgg(nm,n,a,b,alfr,alfi,beta,matz,z,ierr)
c
      integer n,nm,ierr,matz
      double precision a(nm,n),b(nm,n),alfr(n),alfi(n),beta(n),z(nm,n)
      logical tf
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find the eigenvalues and eigenvectors (if desired)
c     for the real general generalized eigenproblem  ax = (lambda)bx.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrices  a  and  b.
c
c        a  contains a real general matrix.
c
c        b  contains a real general matrix.
c
c        matz  is an integer variable set equal to zero if
c        only eigenvalues are desired.  otherwise it is set to
c        any non-zero integer for both eigenvalues and eigenvectors.
c
c     on output
c
c        alfr  and  alfi  contain the real and imaginary parts,
c        respectively, of the numerators of the eigenvalues.
c
c        beta  contains the denominators of the eigenvalues,
c        which are thus given by the ratios  (alfr+i*alfi)/beta.
c        complex conjugate pairs of eigenvalues appear consecutively
c        with the eigenvalue having the positive imaginary part first.
c
c        z  contains the real and imaginary parts of the eigenvectors
c        if matz is not zero.  if the j-th eigenvalue is real, the
c        j-th column of  z  contains its eigenvector.  if the j-th
c        eigenvalue is complex with positive imaginary part, the
c        j-th and (j+1)-th columns of  z  contain the real and
c        imaginary parts of its eigenvector.  the conjugate of this
c        vector is the eigenvector for the conjugate eigenvalue.
c
c        ierr  is an integer output variable set equal to an error
c           completion code described in the documentation for qzit.
c           the normal completion code is zero.
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
      tf = .false.
      call  qzhes(nm,n,a,b,tf,z)
      call  qzit(nm,n,a,b,0.0d0,tf,z,ierr)
      call  qzval(nm,n,a,b,alfr,alfi,beta,tf,z)
      go to 50
c     .......... find both eigenvalues and eigenvectors ..........
   20 tf = .true.
      call  qzhes(nm,n,a,b,tf,z)
      call  qzit(nm,n,a,b,0.0d0,tf,z,ierr)
      call  qzval(nm,n,a,b,alfr,alfi,beta,tf,z)
      if (ierr .ne. 0) go to 50
      call  qzvec(nm,n,a,b,alfr,alfi,beta,z)
   50 return
      end
