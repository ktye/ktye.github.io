      subroutine zpbdi(abd,lda,n,m,det)
      integer lda,n,m
      complex*16 abd(lda,1)
      double precision det(2)
c
c     zpbdi computes the determinant
c     of a complex*16 hermitian positive definite band matrix
c     using the factors computed by zpbco or zpbfa.
c     if the inverse is needed, use zpbsl  n  times.
c
c     on entry
c
c        abd     complex*16(lda, n)
c                the output from zpbco or zpbfa.
c
c        lda     integer
c                the leading dimension of the array  abd .
c
c        n       integer
c                the order of the matrix  a .
c
c        m       integer
c                the number of diagonals above the main diagonal.
c
c     on return
c
c        det     double precision(2)
c                determinant of original matrix in the form
c                determinant = det(1) * 10.0**det(2)
c                with  1.0 .le. det(1) .lt. 10.0
c                or  det(1) .eq. 0.0 .
c
c     linpack.  this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c
c     internal variables
c
      double precision s
      integer i
      double precision dreal
      complex*16 zdumr
      dreal(zdumr) = zdumr
c
c     compute determinant
c
      det(1) = 1.0d0
      det(2) = 0.0d0
      s = 10.0d0
      do 50 i = 1, n
         det(1) = dreal(abd(m+1,i))**2*det(1)
c     ...exit
         if (det(1) .eq. 0.0d0) go to 60
   10    if (det(1) .ge. 1.0d0) go to 20
            det(1) = s*det(1)
            det(2) = det(2) - 1.0d0
         go to 10
   20    continue
   30    if (det(1) .lt. s) go to 40
            det(1) = det(1)/s
            det(2) = det(2) + 1.0d0
         go to 30
   40    continue
   50 continue
   60 continue
      return
      end
