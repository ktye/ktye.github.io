      subroutine rsm(nm,n,a,w,m,z,fwork,iwork,ierr)
c 
      integer n,nm,m,iwork(n),ierr
      integer k1,k2,k3,k4,k5,k6,k7
      double precision a(nm,n),w(n),z(nm,m),fwork(1)
c
c     this subroutine calls the recommended sequence of
c     subroutines from the eigensystem subroutine package (eispack)
c     to find all of the eigenvalues and some of the eigenvectors
c     of a real symmetric matrix.
c
c     on input
c
c        nm  must be set to the row dimension of the two-dimensional
c        array parameters as declared in the calling program
c        dimension statement.
c
c        n  is the order of the matrix  a.
c
c        a  contains the real symmetric matrix.
c
c        m  the eigenvectors corresponding to the first m eigenvalues
c           are to be computed.
c           if m = 0 then no eigenvectors are computed.
c           if m = n then all of the eigenvectors are computed.
c
c     on output
c
c        w  contains all n eigenvalues in ascending order.
c
c        z  contains the orthonormal eigenvectors associated with
c           the first m eigenvalues.
c
c        ierr  is an integer output variable set equal to an error
c           completion code described in the documentation for tqlrat,
c           imtqlv and tinvit.  the normal completion code is zero.
c
c        fwork  is a temporary storage array of dimension 8*n.
c
c        iwork  is an integer temporary storage array of dimension n.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 10 * n
      if (n .gt. nm .or. m .gt. nm) go to 50
      k1 = 1
      k2 = k1 + n
      k3 = k2 + n
      k4 = k3 + n
      k5 = k4 + n
      k6 = k5 + n
      k7 = k6 + n
      k8 = k7 + n
      if (m .gt. 0) go to 10
c     .......... find eigenvalues only ..........
      call  tred1(nm,n,a,w,fwork(k1),fwork(k2))
      call  tqlrat(n,w,fwork(k2),ierr)
      go to 50
c     .......... find all eigenvalues and m eigenvectors ..........
   10 call  tred1(nm,n,a,fwork(k1),fwork(k2),fwork(k3))
      call  imtqlv(n,fwork(k1),fwork(k2),fwork(k3),w,iwork,
     x             ierr,fwork(k4))
      call  tinvit(nm,n,fwork(k1),fwork(k2),fwork(k3),m,w,iwork,z,ierr,
     x             fwork(k4),fwork(k5),fwork(k6),fwork(k7),fwork(k8))
      call  trbak1(nm,n,a,fwork(k2),m,z)
   50 return
      end
