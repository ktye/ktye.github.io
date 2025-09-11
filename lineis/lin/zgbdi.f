      subroutine zgbdi(abd,lda,n,ml,mu,ipvt,det)
      integer lda,n,ml,mu,ipvt(1)
      complex*16 abd(lda,1),det(2)
c
c     zgbdi computes the determinant of a band matrix
c     using the factors computed by zgbco or zgbfa.
c     if the inverse is needed, use zgbsl  n  times.
c
c     on entry
c
c        abd     complex*16(lda, n)
c                the output from zgbco or zgbfa.
c
c        lda     integer
c                the leading dimension of the array  abd .
c
c        n       integer
c                the order of the original matrix.
c
c        ml      integer
c                number of diagonals below the main diagonal.
c
c        mu      integer
c                number of diagonals above the main diagonal.
c
c        ipvt    integer(n)
c                the pivot vector from zgbco or zgbfa.
c
c     on return
c
c        det     complex*16(2)
c                determinant of original matrix.
c                determinant = det(1) * 10.0**det(2)
c                with  1.0 .le. cabs1(det(1)) .lt. 10.0
c                or  det(1) = 0.0 .
c
c     linpack. this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     fortran dabs,dcmplx
c
c     internal variables
c
      double precision ten
      integer i,m
c
      complex*16 zdum
      double precision cabs1
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
      cabs1(zdum) = dabs(dreal(zdum)) + dabs(dimag(zdum))
c
      m = ml + mu + 1
      det(1) = (1.0d0,0.0d0)
      det(2) = (0.0d0,0.0d0)
      ten = 10.0d0
      do 50 i = 1, n
         if (ipvt(i) .ne. i) det(1) = -det(1)
         det(1) = abd(m,i)*det(1)
c     ...exit
         if (cabs1(det(1)) .eq. 0.0d0) go to 60
   10    if (cabs1(det(1)) .ge. 1.0d0) go to 20
            det(1) = dcmplx(ten,0.0d0)*det(1)
            det(2) = det(2) - (1.0d0,0.0d0)
         go to 10
   20    continue
   30    if (cabs1(det(1)) .lt. ten) go to 40
            det(1) = det(1)/dcmplx(ten,0.0d0)
            det(2) = det(2) + (1.0d0,0.0d0)
         go to 30
   40    continue
   50 continue
   60 continue
      return
      end
