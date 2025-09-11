      subroutine zhpco(ap,n,kpvt,rcond,z)
      integer n,kpvt(1)
      complex*16 ap(1),z(1)
      double precision rcond
c
c     zhpco factors a complex*16 hermitian matrix stored in packed
c     form by elimination with symmetric pivoting and estimates
c     the condition of the matrix.
c
c     if  rcond  is not needed, zhpfa is slightly faster.
c     to solve  a*x = b , follow zhpco by zhpsl.
c     to compute  inverse(a)*c , follow zhpco by zhpsl.
c     to compute  inverse(a) , follow zhpco by zhpdi.
c     to compute  determinant(a) , follow zhpco by zhpdi.
c     to compute  inertia(a), follow zhpco by zhpdi.
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
c     output
c
c        ap      a block diagonal matrix and the multipliers which
c                were used to obtain it stored in packed form.
c                the factorization can be written  a = u*d*ctrans(u)
c                where  u  is a product of permutation and unit
c                upper triangular matrices , ctrans(u) is the
c                conjugate transpose of  u , and  d  is block diagonal
c                with 1 by 1 and 2 by 2 blocks.
c
c        kpvt    integer(n)
c                an integer vector of pivot indices.
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
c                underflows.
c
c        z       complex*16(n)
c                a work vector whose contents are usually unimportant.
c                if  a  is close to a singular matrix, then  z  is
c                an approximate null vector in the sense that
c                norm(a*z) = rcond*norm(a)*norm(z) .
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
c     linpack. this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     linpack zhpfa
c     blas zaxpy,zdotc,zdscal,dzasum
c     fortran dabs,dmax1,dcmplx,dconjg,iabs
c
c     internal variables
c
      complex*16 ak,akm1,bk,bkm1,zdotc,denom,ek,t
      double precision anorm,s,dzasum,ynorm
      integer i,ij,ik,ikm1,ikp1,info,j,jm1,j1
      integer k,kk,km1k,km1km1,kp,kps,ks
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
c     find norm of a using only upper half
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
      call zhpfa(ap,n,kpvt,info)
c
c     rcond = 1/(norm(a)*(estimate of norm(inverse(a)))) .
c     estimate = norm(z)/norm(y) where  a*z = y  and  a*y = e .
c     the components of  e  are chosen to cause maximum local
c     growth in the elements of w  where  u*d*w = e .
c     the vectors are frequently rescaled to avoid overflow.
c
c     solve u*d*w = e
c
      ek = (1.0d0,0.0d0)
      do 50 j = 1, n
         z(j) = (0.0d0,0.0d0)
   50 continue
      k = n
      ik = (n*(n - 1))/2
   60 if (k .eq. 0) go to 120
         kk = ik + k
         ikm1 = ik - (k - 1)
         ks = 1
         if (kpvt(k) .lt. 0) ks = 2
         kp = iabs(kpvt(k))
         kps = k + 1 - ks
         if (kp .eq. kps) go to 70
            t = z(kps)
            z(kps) = z(kp)
            z(kp) = t
   70    continue
         if (cabs1(z(k)) .ne. 0.0d0) ek = csign1(ek,z(k))
         z(k) = z(k) + ek
         call zaxpy(k-ks,z(k),ap(ik+1),1,z(1),1)
         if (ks .eq. 1) go to 80
            if (cabs1(z(k-1)) .ne. 0.0d0) ek = csign1(ek,z(k-1))
            z(k-1) = z(k-1) + ek
            call zaxpy(k-ks,z(k-1),ap(ikm1+1),1,z(1),1)
   80    continue
         if (ks .eq. 2) go to 100
            if (cabs1(z(k)) .le. cabs1(ap(kk))) go to 90
               s = cabs1(ap(kk))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ek = dcmplx(s,0.0d0)*ek
   90       continue
            if (cabs1(ap(kk)) .ne. 0.0d0) z(k) = z(k)/ap(kk)
            if (cabs1(ap(kk)) .eq. 0.0d0) z(k) = (1.0d0,0.0d0)
         go to 110
  100    continue
            km1k = ik + k - 1
            km1km1 = ikm1 + k - 1
            ak = ap(kk)/dconjg(ap(km1k))
            akm1 = ap(km1km1)/ap(km1k)
            bk = z(k)/dconjg(ap(km1k))
            bkm1 = z(k-1)/ap(km1k)
            denom = ak*akm1 - 1.0d0
            z(k) = (akm1*bk - bkm1)/denom
            z(k-1) = (ak*bkm1 - bk)/denom
  110    continue
         k = k - ks
         ik = ik - k
         if (ks .eq. 2) ik = ik - (k + 1)
      go to 60
  120 continue
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
c
c     solve ctrans(u)*y = w
c
      k = 1
      ik = 0
  130 if (k .gt. n) go to 160
         ks = 1
         if (kpvt(k) .lt. 0) ks = 2
         if (k .eq. 1) go to 150
            z(k) = z(k) + zdotc(k-1,ap(ik+1),1,z(1),1)
            ikp1 = ik + k
            if (ks .eq. 2)
     *         z(k+1) = z(k+1) + zdotc(k-1,ap(ikp1+1),1,z(1),1)
            kp = iabs(kpvt(k))
            if (kp .eq. k) go to 140
               t = z(k)
               z(k) = z(kp)
               z(kp) = t
  140       continue
  150    continue
         ik = ik + k
         if (ks .eq. 2) ik = ik + (k + 1)
         k = k + ks
      go to 130
  160 continue
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
c
      ynorm = 1.0d0
c
c     solve u*d*v = y
c
      k = n
      ik = n*(n - 1)/2
  170 if (k .eq. 0) go to 230
         kk = ik + k
         ikm1 = ik - (k - 1)
         ks = 1
         if (kpvt(k) .lt. 0) ks = 2
         if (k .eq. ks) go to 190
            kp = iabs(kpvt(k))
            kps = k + 1 - ks
            if (kp .eq. kps) go to 180
               t = z(kps)
               z(kps) = z(kp)
               z(kp) = t
  180       continue
            call zaxpy(k-ks,z(k),ap(ik+1),1,z(1),1)
            if (ks .eq. 2) call zaxpy(k-ks,z(k-1),ap(ikm1+1),1,z(1),1)
  190    continue
         if (ks .eq. 2) go to 210
            if (cabs1(z(k)) .le. cabs1(ap(kk))) go to 200
               s = cabs1(ap(kk))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ynorm = s*ynorm
  200       continue
            if (cabs1(ap(kk)) .ne. 0.0d0) z(k) = z(k)/ap(kk)
            if (cabs1(ap(kk)) .eq. 0.0d0) z(k) = (1.0d0,0.0d0)
         go to 220
  210    continue
            km1k = ik + k - 1
            km1km1 = ikm1 + k - 1
            ak = ap(kk)/dconjg(ap(km1k))
            akm1 = ap(km1km1)/ap(km1k)
            bk = z(k)/dconjg(ap(km1k))
            bkm1 = z(k-1)/ap(km1k)
            denom = ak*akm1 - 1.0d0
            z(k) = (akm1*bk - bkm1)/denom
            z(k-1) = (ak*bkm1 - bk)/denom
  220    continue
         k = k - ks
         ik = ik - k
         if (ks .eq. 2) ik = ik - (k + 1)
      go to 170
  230 continue
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
      ynorm = s*ynorm
c
c     solve ctrans(u)*z = v
c
      k = 1
      ik = 0
  240 if (k .gt. n) go to 270
         ks = 1
         if (kpvt(k) .lt. 0) ks = 2
         if (k .eq. 1) go to 260
            z(k) = z(k) + zdotc(k-1,ap(ik+1),1,z(1),1)
            ikp1 = ik + k
            if (ks .eq. 2)
     *         z(k+1) = z(k+1) + zdotc(k-1,ap(ikp1+1),1,z(1),1)
            kp = iabs(kpvt(k))
            if (kp .eq. k) go to 250
               t = z(k)
               z(k) = z(kp)
               z(kp) = t
  250       continue
  260    continue
         ik = ik + k
         if (ks .eq. 2) ik = ik + (k + 1)
         k = k + ks
      go to 240
  270 continue
c     make znorm = 1.0
      s = 1.0d0/dzasum(n,z,1)
      call zdscal(n,s,z,1)
      ynorm = s*ynorm
c
      if (anorm .ne. 0.0d0) rcond = ynorm/anorm
      if (anorm .eq. 0.0d0) rcond = 0.0d0
      return
      end
