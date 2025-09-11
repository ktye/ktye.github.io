      subroutine zppsl(ap,n,b)
      integer n
      complex*16 ap(1),b(1)
c
c     zppsl solves the complex*16 hermitian positive definite system
c     a * x = b
c     using the factors computed by zppco or zppfa.
c
c     on entry
c
c        ap      complex*16 (n*(n+1)/2)
c                the output from zppco or zppfa.
c
c        n       integer
c                the order of the matrix  a .
c
c        b       complex*16(n)
c                the right hand side vector.
c
c     on return
c
c        b       the solution vector  x .
c
c     error condition
c
c        a division by zero will occur if the input factor contains
c        a zero on the diagonal.  technically this indicates
c        singularity but it is usually caused by improper subroutine
c        arguments.  it will not occur if the subroutines are called
c        correctly and  info .eq. 0 .
c
c     to compute  inverse(a) * c  where  c  is a matrix
c     with  p  columns
c           call zppco(ap,n,rcond,z,info)
c           if (rcond is too small .or. info .ne. 0) go to ...
c           do 10 j = 1, p
c              call zppsl(ap,n,c(1,j))
c        10 continue
c
c     linpack.  this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     blas zaxpy,zdotc
c
c     internal variables
c
      complex*16 zdotc,t
      integer k,kb,kk
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
c
      kk = 0
      do 10 k = 1, n
         t = zdotc(k-1,ap(kk+1),1,b(1),1)
         kk = kk + k
         b(k) = (b(k) - t)/ap(kk)
   10 continue
      do 20 kb = 1, n
         k = n + 1 - kb
         b(k) = b(k)/ap(kk)
         kk = kk - k
         t = -b(k)
         call zaxpy(k-1,t,ap(kk+1),1,b(1),1)
   20 continue
      return
      end
