      subroutine zpofa(a,lda,n,info)
      integer lda,n,info
      complex*16 a(lda,1)
c
c     zpofa factors a complex*16 hermitian positive definite matrix.
c
c     zpofa is usually called by zpoco, but it can be called
c     directly with a saving in time if  rcond  is not needed.
c     (time for zpoco) = (1 + 18/n)*(time for zpofa) .
c
c     on entry
c
c        a       complex*16(lda, n)
c                the hermitian matrix to be factored.  only the
c                diagonal and upper triangle are used.
c
c        lda     integer
c                the leading dimension of the array  a .
c
c        n       integer
c                the order of the matrix  a .
c
c     on return
c
c        a       an upper triangular matrix  r  so that  a =
c                ctrans(r)*r where  ctrans(r)  is the conjugate
c                transpose.  the strict lower triangle is unaltered.
c                if  info .ne. 0 , the factorization is not complete.
c
c        info    integer
c                = 0  for normal return.
c                = k  signals an error condition.  the leading minor
c                     of order  k  is not positive definite.
c
c     linpack.  this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     blas zdotc
c     fortran dcmplx,dconjg,dsqrt
c
c     internal variables
c
      complex*16 zdotc,t
      double precision s
      integer j,jm1,k
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
c     begin block with ...exits to 40
c
c
         do 30 j = 1, n
            info = j
            s = 0.0d0
            jm1 = j - 1
            if (jm1 .lt. 1) go to 20
            do 10 k = 1, jm1
               t = a(k,j) - zdotc(k-1,a(1,k),1,a(1,j),1)
               t = t/a(k,k)
               a(k,j) = t
               s = s + dreal(t*dconjg(t))
   10       continue
   20       continue
            s = dreal(a(j,j)) - s
c     ......exit
            if (s .le. 0.0d0 .or. dimag(a(j,j)) .ne. 0.0d0) go to 40
            a(j,j) = dcmplx(dsqrt(s),0.0d0)
   30    continue
         info = 0
   40 continue
      return
      end
