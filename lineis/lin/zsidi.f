      subroutine zsidi(a,lda,n,kpvt,det,work,job)
      integer lda,n,job
      complex*16 a(lda,1),det(2),work(1)
      integer kpvt(1)
c
c     zsidi computes the determinant and inverse
c     of a complex*16 symmetric matrix using the factors from zsifa.
c
c     on entry
c
c        a       complex*16(lda,n)
c                the output from zsifa.
c
c        lda     integer
c                the leading dimension of the array a.
c
c        n       integer
c                the order of the matrix a.
c
c        kpvt    integer(n)
c                the pivot vector from zsifa.
c
c        work    complex*16(n)
c                work vector.  contents destroyed.
c
c        job     integer
c                job has the decimal expansion  ab  where
c                   if  b .ne. 0, the inverse is computed,
c                   if  a .ne. 0, the determinant is computed,
c
c                for example, job = 11  gives both.
c
c     on return
c
c        variables not requested by job are not used.
c
c        a      contains the upper triangle of the inverse of
c               the original matrix.  the strict lower triangle
c               is never referenced.
c
c        det    complex*16(2)
c               determinant of original matrix.
c               determinant = det(1) * 10.0**det(2)
c               with 1.0 .le. dabs(det(1)) .lt. 10.0
c               or det(1) = 0.0.
c
c     error condition
c
c        a division by zero may occur if the inverse is requested
c        and  zsico  has set rcond .eq. 0.0
c        or  zsifa  has set  info .ne. 0 .
c
c     linpack. this version dated 08/14/78 .
c     james bunch, univ. calif. san diego, argonne nat. lab
c
c     subroutines and functions
c
c     blas zaxpy,zcopy,zdotu,zswap
c     fortran dabs,dcmplx,iabs,mod
c
c     internal variables.
c
      complex*16 ak,akp1,akkp1,zdotu,d,t,temp
      double precision ten
      integer j,jb,k,km1,ks,kstep
      logical noinv,nodet
c
      complex*16 zdum
      double precision cabs1
      double precision dreal,dimag
      complex*16 zdumr,zdumi
      dreal(zdumr) = zdumr
      dimag(zdumi) = (0.0d0,-1.0d0)*zdumi
      cabs1(zdum) = dabs(dreal(zdum)) + dabs(dimag(zdum))
c
      noinv = mod(job,10) .eq. 0
      nodet = mod(job,100)/10 .eq. 0
c
      if (nodet) go to 100
         det(1) = (1.0d0,0.0d0)
         det(2) = (0.0d0,0.0d0)
         ten = 10.0d0
         t = (0.0d0,0.0d0)
         do 90 k = 1, n
            d = a(k,k)
c
c           check if 1 by 1
c
            if (kpvt(k) .gt. 0) go to 30
c
c              2 by 2 block
c              use det (d  t)  =  (d/t * c - t) * t
c                      (t  c)
c              to avoid underflow/overflow troubles.
c              take two passes through scaling.  use  t  for flag.
c
               if (cabs1(t) .ne. 0.0d0) go to 10
                  t = a(k,k+1)
                  d = (d/t)*a(k+1,k+1) - t
               go to 20
   10          continue
                  d = t
                  t = (0.0d0,0.0d0)
   20          continue
   30       continue
c
            det(1) = d*det(1)
            if (cabs1(det(1)) .eq. 0.0d0) go to 80
   40          if (cabs1(det(1)) .ge. 1.0d0) go to 50
                  det(1) = dcmplx(ten,0.0d0)*det(1)
                  det(2) = det(2) - (1.0d0,0.0d0)
               go to 40
   50          continue
   60          if (cabs1(det(1)) .lt. ten) go to 70
                  det(1) = det(1)/dcmplx(ten,0.0d0)
                  det(2) = det(2) + (1.0d0,0.0d0)
               go to 60
   70          continue
   80       continue
   90    continue
  100 continue
c
c     compute inverse(a)
c
      if (noinv) go to 230
         k = 1
  110    if (k .gt. n) go to 220
            km1 = k - 1
            if (kpvt(k) .lt. 0) go to 140
c
c              1 by 1
c
               a(k,k) = (1.0d0,0.0d0)/a(k,k)
               if (km1 .lt. 1) go to 130
                  call zcopy(km1,a(1,k),1,work,1)
                  do 120 j = 1, km1
                     a(j,k) = zdotu(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k),1)
  120             continue
                  a(k,k) = a(k,k) + zdotu(km1,work,1,a(1,k),1)
  130          continue
               kstep = 1
            go to 180
  140       continue
c
c              2 by 2
c
               t = a(k,k+1)
               ak = a(k,k)/t
               akp1 = a(k+1,k+1)/t
               akkp1 = a(k,k+1)/t
               d = t*(ak*akp1 - (1.0d0,0.0d0))
               a(k,k) = akp1/d
               a(k+1,k+1) = ak/d
               a(k,k+1) = -akkp1/d
               if (km1 .lt. 1) go to 170
                  call zcopy(km1,a(1,k+1),1,work,1)
                  do 150 j = 1, km1
                     a(j,k+1) = zdotu(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k+1),1)
  150             continue
                  a(k+1,k+1) = a(k+1,k+1)
     *                         + zdotu(km1,work,1,a(1,k+1),1)
                  a(k,k+1) = a(k,k+1) + zdotu(km1,a(1,k),1,a(1,k+1),1)
                  call zcopy(km1,a(1,k),1,work,1)
                  do 160 j = 1, km1
                     a(j,k) = zdotu(j,a(1,j),1,work,1)
                     call zaxpy(j-1,work(j),a(1,j),1,a(1,k),1)
  160             continue
                  a(k,k) = a(k,k) + zdotu(km1,work,1,a(1,k),1)
  170          continue
               kstep = 2
  180       continue
c
c           swap
c
            ks = iabs(kpvt(k))
            if (ks .eq. k) go to 210
               call zswap(ks,a(1,ks),1,a(1,k),1)
               do 190 jb = ks, k
                  j = k + ks - jb
                  temp = a(j,k)
                  a(j,k) = a(ks,j)
                  a(ks,j) = temp
  190          continue
               if (kstep .eq. 1) go to 200
                  temp = a(ks,k+1)
                  a(ks,k+1) = a(k,k+1)
                  a(k,k+1) = temp
  200          continue
  210       continue
            k = k + kstep
         go to 110
  220    continue
  230 continue
      return
      end
