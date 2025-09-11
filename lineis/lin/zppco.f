      subroutine zppco(ap,n,rcond,z,info)
      integer n,info
      complex*16 ap(1),z(1)
      double precision rcond
c
c     zppco factors a complex*16 hermitian positive definite matrix
c     stored in packed form
c     and estimates the condition of the matrix.
c
c     if  rcond  is not needed, zppfa is slightly faster.
c     to solve  a*x = b , follow zppco by zppsl.
c     to compute  inverse(a)*c , follow zppco by zppsl.
c     to compute  determinant(a) , follow zppco by zppdi.
c     to compute  inverse(a) , follow zppco by zppdi.
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
c                if  info .ne. 0 , the factorization is not complete.
c
c        rcond   double precision
c                an estimate of the reciprocal condition of  a .
c                for the system  a*x = b , relative perturbations
c                in  a  and  b  of size  epsilon  may cause
c                relative perturbations in  x  of size  epsilon/rcond .
c                if  rcond  is so small that the logical expression
c                           1.0 + rcond .eq. 1.0
c                is true, then  a  may be singular to working
c                precision.  in particular,  rcond  is zero  if
c                exact singularity is detected or the estimate
c                underflows.  if info .ne. 0 , rcond is unchanged.
c
c        z       complex*16(n)
c                a work vector whose contents are usually unimportant.
c                if  a  is singular to working precision, then  z  is
c                an approximate null vector in the sense that
c                norm(a*z) = rcond*norm(a)*norm(z) .
c                if  info .ne. 0 , z  is unchanged.
c
c        info    integer
c                = 0  for normal return.
c                = k  signals an error condition.  the leading minor
c                     of order  k  is not positive definite.
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
c     linpack zppfa
c     blas zaxpy,zdotc,zdscal,dzasum
c     fortran dabs,dmax1,dcmplx,dconjg
c
c     internal variables
c
      complex*16 zdotc,ek,t,wk,wkm
      double precision anorm,s,dzasum,sm,ynorm
      integer i,ij,j,jm1,j1,k,kb,kj,kk,kp1
c
      complex*16 zdum,zdum2,csign1
      double precision cabs1
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
      cabs1(zdum) = dabs(dreal(zdum)) + dabs(dimag(zdum))
      csign1(zdum,zdum2) = cabs1(zdum)*(zdum2/cabs1(zdum2))
c
c     find norm of a
c
      j1 = 1
      do 30 j = 1, n
         z(j) = dcmplx(dzasum(j,ap(j1),1),0.0d0)
         ij = j1
         j1 = j1 + j
         jm1 = j - 1
         if (jm1 .lt. 1) go to 20
         do 10 i = 1, jm1
            z(i) = dcmplx(dreal(z(i))+cabs1(ap(ij)),0.0d0)
            ij = ij + 1
   10    continue
   20    continue
   30 continue
      anorm = 0.0d0
      do 40 j = 1, n
         anorm = dmax1(anorm,dreal(z(j)))
   40 continue
c
c     factor
c
      call zppfa(ap,n,info)
      if (info .ne. 0) go to 180
c
c        rcond = 1/(norm(a)*(estimate of norm(inverse(a)))) .
c        estimate = norm(z)/norm(y) where  a*z = y  and  a*y = e .
c        the components of  e  are chosen to cause maximum local
c        growth in the elements of w  where  ctrans(r)*w = e .
c        the vectors are frequently rescaled to avoid overflow.
c
c        solve ctrans(r)*w = e
c
         ek = (1.0d0,0.0d0)
         do 50 j = 1, n
            z(j) = (0.0d0,0.0d0)
   50    continue
         kk = 0
         do 110 k = 1, n
            kk = kk + k
            if (cabs1(z(k)) .ne. 0.0d0) ek = csign1(ek,-z(k))
            if (cabs1(ek-z(k)) .le. dreal(ap(kk))) go to 60
               s = dreal(ap(kk))/cabs1(ek-z(k))
               call zdscal(n,s,z,1)
               ek = dcmplx(s,0.0d0)*ek
   60       continue
            wk = ek - z(k)
            wkm = -ek - z(k)
            s = cabs1(wk)
            sm = cabs1(wkm)
            wk = wk/ap(kk)
            wkm = wkm/ap(kk)
            kp1 = k + 1
            kj = kk + k
            if (kp1 .gt. n) go to 100
               do 70 j = kp1, n
                  sm = sm + cabs1(z(j)+wkm*dconjg(ap(kj)))
                  z(j) = z(j) + wk*dconjg(ap(kj))
                  s = s + cabs1(z(j))
                  kj = kj + j
   70          continue
               if (s .ge. sm) go to 90
                  t = wkm - wk
                  wk = wkm
                  kj = kk + k
                  do 80 j = kp1, n
                     z(j) = z(j) + t*dconjg(ap(kj))
                     kj = kj + j
   80             continue
   90          continue
  100       continue
            z(k) = wk
  110    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
c
c        solve r*y = w
c
         do 130 kb = 1, n
            k = n + 1 - kb
            if (cabs1(z(k)) .le. dreal(ap(kk))) go to 120
               s = dreal(ap(kk))/cabs1(z(k))
               call zdscal(n,s,z,1)
  120       continue
            z(k) = z(k)/ap(kk)
            kk = kk - k
            t = -z(k)
            call zaxpy(k-1,t,ap(kk+1),1,z(1),1)
  130    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
c
         ynorm = 1.0d0
c
c        solve ctrans(r)*v = y
c
         do 150 k = 1, n
            z(k) = z(k) - zdotc(k-1,ap(kk+1),1,z(1),1)
            kk = kk + k
            if (cabs1(z(k)) .le. dreal(ap(kk))) go to 140
               s = dreal(ap(kk))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ynorm = s*ynorm
  140       continue
            z(k) = z(k)/ap(kk)
  150    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
         ynorm = s*ynorm
c
c        solve r*z = v
c
         do 170 kb = 1, n
            k = n + 1 - kb
            if (cabs1(z(k)) .le. dreal(ap(kk))) go to 160
               s = dreal(ap(kk))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ynorm = s*ynorm
  160       continue
            z(k) = z(k)/ap(kk)
            kk = kk - k
            t = -z(k)
            call zaxpy(k-1,t,ap(kk+1),1,z(1),1)
  170    continue
c        make znorm = 1.0
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
         ynorm = s*ynorm
c
         if (anorm .ne. 0.0d0) rcond = ynorm/anorm
         if (anorm .eq. 0.0d0) rcond = 0.0d0
  180 continue
      return
      end
