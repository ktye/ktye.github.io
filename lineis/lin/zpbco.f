      subroutine zpbco(abd,lda,n,m,rcond,z,info)
      integer lda,n,m,info
      complex*16 abd(lda,1),z(1)
      double precision rcond
c
c     zpbco factors a complex*16 hermitian positive definite matrix
c     stored in band form and estimates the condition of the matrix.
c
c     if  rcond  is not needed, zpbfa is slightly faster.
c     to solve  a*x = b , follow zpbco by zpbsl.
c     to compute  inverse(a)*c , follow zpbco by zpbsl.
c     to compute  determinant(a) , follow zpbco by zpbdi.
c
c     on entry
c
c        abd     complex*16(lda, n)
c                the matrix to be factored.  the columns of the upper
c                triangle are stored in the columns of abd and the
c                diagonals of the upper triangle are stored in the
c                rows of abd .  see the comments below for details.
c
c        lda     integer
c                the leading dimension of the array  abd .
c                lda must be .ge. m + 1 .
c
c        n       integer
c                the order of the matrix  a .
c
c        m       integer
c                the number of diagonals above the main diagonal.
c                0 .le. m .lt. n .
c
c     on return
c
c        abd     an upper triangular matrix  r , stored in band
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
c     band storage
c
c           if  a  is a hermitian positive definite band matrix,
c           the following program segment will set up the input.
c
c                   m = (band width above diagonal)
c                   do 20 j = 1, n
c                      i1 = max0(1, j-m)
c                      do 10 i = i1, j
c                         k = i-j+m+1
c                         abd(k,j) = a(i,j)
c                10    continue
c                20 continue
c
c           this uses  m + 1  rows of  a , except for the  m by m
c           upper left triangle, which is ignored.
c
c     example..  if the original matrix is
c
c           11 12 13  0  0  0
c           12 22 23 24  0  0
c           13 23 33 34 35  0
c            0 24 34 44 45 46
c            0  0 35 45 55 56
c            0  0  0 46 56 66
c
c     then  n = 6 , m = 2  and  abd  should contain
c
c            *  * 13 24 35 46
c            * 12 23 34 45 56
c           11 22 33 44 55 66
c
c     linpack.  this version dated 08/14/78 .
c     cleve moler, university of new mexico, argonne national lab.
c
c     subroutines and functions
c
c     linpack zpbfa
c     blas zaxpy,zdotc,zdscal,dzasum
c     fortran dabs,dmax1,dcmplx,dconjg,max0,min0
c
c     internal variables
c
      complex*16 zdotc,ek,t,wk,wkm
      double precision anorm,s,dzasum,sm,ynorm
      integer i,j,j2,k,kb,kp1,l,la,lb,lm,mu
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
      do 30 j = 1, n
         l = min0(j,m+1)
         mu = max0(m+2-j,1)
         z(j) = dcmplx(dzasum(l,abd(mu,j),1),0.0d0)
         k = j - l
         if (m .lt. mu) go to 20
         do 10 i = mu, m
            k = k + 1
            z(k) = dcmplx(dreal(z(k))+cabs1(abd(i,j)),0.0d0)
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
      call zpbfa(abd,lda,n,m,info)
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
         do 110 k = 1, n
            if (cabs1(z(k)) .ne. 0.0d0) ek = csign1(ek,-z(k))
            if (cabs1(ek-z(k)) .le. dreal(abd(m+1,k))) go to 60
               s = dreal(abd(m+1,k))/cabs1(ek-z(k))
               call zdscal(n,s,z,1)
               ek = dcmplx(s,0.0d0)*ek
   60       continue
            wk = ek - z(k)
            wkm = -ek - z(k)
            s = cabs1(wk)
            sm = cabs1(wkm)
            wk = wk/abd(m+1,k)
            wkm = wkm/abd(m+1,k)
            kp1 = k + 1
            j2 = min0(k+m,n)
            i = m + 1
            if (kp1 .gt. j2) go to 100
               do 70 j = kp1, j2
                  i = i - 1
                  sm = sm + cabs1(z(j)+wkm*dconjg(abd(i,j)))
                  z(j) = z(j) + wk*dconjg(abd(i,j))
                  s = s + cabs1(z(j))
   70          continue
               if (s .ge. sm) go to 90
                  t = wkm - wk
                  wk = wkm
                  i = m + 1
                  do 80 j = kp1, j2
                     i = i - 1
                     z(j) = z(j) + t*dconjg(abd(i,j))
   80             continue
   90          continue
  100       continue
            z(k) = wk
  110    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
c
c        solve  r*y = w
c
         do 130 kb = 1, n
            k = n + 1 - kb
            if (cabs1(z(k)) .le. dreal(abd(m+1,k))) go to 120
               s = dreal(abd(m+1,k))/cabs1(z(k))
               call zdscal(n,s,z,1)
  120       continue
            z(k) = z(k)/abd(m+1,k)
            lm = min0(k-1,m)
            la = m + 1 - lm
            lb = k - lm
            t = -z(k)
            call zaxpy(lm,t,abd(la,k),1,z(lb),1)
  130    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
c
         ynorm = 1.0d0
c
c        solve ctrans(r)*v = y
c
         do 150 k = 1, n
            lm = min0(k-1,m)
            la = m + 1 - lm
            lb = k - lm
            z(k) = z(k) - zdotc(lm,abd(la,k),1,z(lb),1)
            if (cabs1(z(k)) .le. dreal(abd(m+1,k))) go to 140
               s = dreal(abd(m+1,k))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ynorm = s*ynorm
  140       continue
            z(k) = z(k)/abd(m+1,k)
  150    continue
         s = 1.0d0/dzasum(n,z,1)
         call zdscal(n,s,z,1)
         ynorm = s*ynorm
c
c        solve  r*z = w
c
         do 170 kb = 1, n
            k = n + 1 - kb
            if (cabs1(z(k)) .le. dreal(abd(m+1,k))) go to 160
               s = dreal(abd(m+1,k))/cabs1(z(k))
               call zdscal(n,s,z,1)
               ynorm = s*ynorm
  160       continue
            z(k) = z(k)/abd(m+1,k)
            lm = min0(k-1,m)
            la = m + 1 - lm
            lb = k - lm
            t = -z(k)
            call zaxpy(lm,t,abd(la,k),1,z(lb),1)
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
