      subroutine zppfa(ap,n,info)
      integer n,info
      complex*16 ap(1)
c
c     zppfa factors a complex*16 hermitian positive definite matrix
c     stored in packed form.
c
c     zppfa is usually called by zppco, but it can be called
c     directly with a saving in time if  rcond  is not needed.
c     (time for zppco) = (1 + 18/n)*(time for zppfa) .
c
c     on entry
c
c        ap      complex*16 (n*(n+1)/2)
c                the packed form of a hermitian matrix  a .  the
c                columns of the upper triangle are stored sequentially
c                in a one-dimensional array of length  n*(n+1)/2 .
c                see comments below for details.
c
c        n       integer
c                the order of the matrix  a .
c
c     on return
c
c        ap      an upper triangular matrix  r , stored in packed
c                form, so that  a = ctrans(r)*r .
c
c        info    integer
c                = 0  for normal return.
c                = k  if the leading minor of order  k  is not
c                     positive definite.
c
c
c     packed storage
c
c          the following program segment will pack the upper
c          triangle of a hermitian matrix.
c
c                k = 0
c                do 20 j = 1, n
c                   do 10 i = 1, j
c                      k = k + 1
c                      ap(k) = a(i,j)
c             10    continue
c             20 continue
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
      integer j,jj,jm1,k,kj,kk
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
c     begin block with ...exits to 40
c
c
         jj = 0
         do 30 j = 1, n
            info = j
            s = 0.0d0
            jm1 = j - 1
            kj = jj
            kk = 0
            if (jm1 .lt. 1) go to 20
            do 10 k = 1, jm1
               kj = kj + 1
               t = ap(kj) - zdotc(k-1,ap(kk+1),1,ap(jj+1),1)
               kk = kk + k
               t = t/ap(kk)
               ap(kj) = t
               s = s + dreal(t*dconjg(t))
   10       continue
   20       continue
            jj = jj + j
            s = dreal(ap(jj)) - s
c     ......exit
            if (s .le. 0.0d0 .or. dimag(ap(jj)) .ne. 0.0d0) go to 40
            ap(jj) = dcmplx(dsqrt(s),0.0d0)
   30    continue
         info = 0
   40 continue
      return
      end
