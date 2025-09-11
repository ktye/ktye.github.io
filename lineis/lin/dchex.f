      subroutine dchex(r,ldr,p,k,l,z,ldz,nz,c,s,job)
      integer ldr,p,k,l,ldz,nz,job
      double precision r(ldr,1),z(ldz,1),s(1)
      double precision c(1)
c
c     dchex updates the cholesky factorization
c
c                   a = trans(r)*r
c
c     of a positive definite matrix a of order p under diagonal
c     permutations of the form
c
c                   trans(e)*a*e
c
c     where e is a permutation matrix.  specifically, given
c     an upper triangular matrix r and a permutation matrix
c     e (which is specified by k, l, and job), dchex determines
c     a orthogonal matrix u such that
c
c                           u*r*e = rr,
c
c     where rr is upper triangular.  at the users option, the
c     transformation u will be multiplied into the array z.
c     if a = trans(x)*x, so that r is the triangular part of the
c     qr factorization of x, then rr is the triangular part of the
c     qr factorization of x*e, i.e. x with its columns permuted.
c     for a less terse description of what dchex does and how
c     it may be applied, see the linpack guide.
c
c     the matrix q is determined as the product u(l-k)*...*u(1)
c     of plane rotations of the form
c
c                           (    c(i)       s(i) )
c                           (                    ) ,
c                           (    -s(i)      c(i) )
c
c     where c(i) is double precision, the rows these rotations operate
c     on are described below.
c
c     there are two types of permutations, which are determined
c     by the value of job.
c
c     1. right circular shift (job = 1).
c
c         the columns are rearranged in the following order.
c
c                1,...,k-1,l,k,k+1,...,l-1,l+1,...,p.
c
c         u is the product of l-k rotations u(i), where u(i)
c         acts in the (l-i,l-i+1)-plane.
c
c     2. left circular shift (job = 2).
c         the columns are rearranged in the following order
c
c                1,...,k-1,k+1,k+2,...,l,k,l+1,...,p.
c
c         u is the product of l-k rotations u(i), where u(i)
c         acts in the (k+i-1,k+i)-plane.
c
c     on entry
c
c         r      double precision(ldr,p), where ldr.ge.p.
c                r contains the upper triangular factor
c                that is to be updated.  elements of r
c                below the diagonal are not referenced.
c
c         ldr    integer.
c                ldr is the leading dimension of the array r.
c
c         p      integer.
c                p is the order of the matrix r.
c
c         k      integer.
c                k is the first column to be permuted.
c
c         l      integer.
c                l is the last column to be permuted.
c                l must be strictly greater than k.
c
c         z      double precision(ldz,nz), where ldz.ge.p.
c                z is an array of nz p-vectors into which the
c                transformation u is multiplied.  z is
c                not referenced if nz = 0.
c
c         ldz    integer.
c                ldz is the leading dimension of the array z.
c
c         nz     integer.
c                nz is the number of columns of the matrix z.
c
c         job    integer.
c                job determines the type of permutation.
c                       job = 1  right circular shift.
c                       job = 2  left circular shift.
c
c     on return
c
c         r      contains the updated factor.
c
c         z      contains the updated matrix z.
c
c         c      double precision(p).
c                c contains the cosines of the transforming rotations.
c
c         s      double precision(p).
c                s contains the sines of the transforming rotations.
c
c     linpack. this version dated 08/14/78 .
c     g.w. stewart, university of maryland, argonne national lab.
c
c     dchex uses the following functions and subroutines.
c
c     blas drotg
c     fortran min0
c
      integer i,ii,il,iu,j,jj,km1,kp1,lmk,lm1
      double precision rjp1j,t
c
c     initialize
c
      km1 = k - 1
      kp1 = k + 1
      lmk = l - k
      lm1 = l - 1
c
c     perform the appropriate task.
c
      go to (10,130), job
c
c     right circular shift.
c
   10 continue
c
c        reorder the columns.
c
         do 20 i = 1, l
            ii = l - i + 1
            s(i) = r(ii,l)
   20    continue
         do 40 jj = k, lm1
            j = lm1 - jj + k
            do 30 i = 1, j
               r(i,j+1) = r(i,j)
   30       continue
            r(j+1,j+1) = 0.0d0
   40    continue
         if (k .eq. 1) go to 60
            do 50 i = 1, km1
               ii = l - i + 1
               r(i,k) = s(ii)
   50       continue
   60    continue
c
c        calculate the rotations.
c
         t = s(1)
         do 70 i = 1, lmk
            call drotg(s(i+1),t,c(i),s(i))
            t = s(i+1)
   70    continue
         r(k,k) = t
         do 90 j = kp1, p
            il = max0(1,l-j+1)
            do 80 ii = il, lmk
               i = l - ii
               t = c(ii)*r(i,j) + s(ii)*r(i+1,j)
               r(i+1,j) = c(ii)*r(i+1,j) - s(ii)*r(i,j)
               r(i,j) = t
   80       continue
   90    continue
c
c        if required, apply the transformations to z.
c
         if (nz .lt. 1) go to 120
         do 110 j = 1, nz
            do 100 ii = 1, lmk
               i = l - ii
               t = c(ii)*z(i,j) + s(ii)*z(i+1,j)
               z(i+1,j) = c(ii)*z(i+1,j) - s(ii)*z(i,j)
               z(i,j) = t
  100       continue
  110    continue
  120    continue
      go to 260
c
c     left circular shift
c
  130 continue
c
c        reorder the columns
c
         do 140 i = 1, k
            ii = lmk + i
            s(ii) = r(i,k)
  140    continue
         do 160 j = k, lm1
            do 150 i = 1, j
               r(i,j) = r(i,j+1)
  150       continue
            jj = j - km1
            s(jj) = r(j+1,j+1)
  160    continue
         do 170 i = 1, k
            ii = lmk + i
            r(i,l) = s(ii)
  170    continue
         do 180 i = kp1, l
            r(i,l) = 0.0d0
  180    continue
c
c        reduction loop.
c
         do 220 j = k, p
            if (j .eq. k) go to 200
c
c              apply the rotations.
c
               iu = min0(j-1,l-1)
               do 190 i = k, iu
                  ii = i - k + 1
                  t = c(ii)*r(i,j) + s(ii)*r(i+1,j)
                  r(i+1,j) = c(ii)*r(i+1,j) - s(ii)*r(i,j)
                  r(i,j) = t
  190          continue
  200       continue
            if (j .ge. l) go to 210
               jj = j - k + 1
               t = s(jj)
               call drotg(r(j,j),t,c(jj),s(jj))
  210       continue
  220    continue
c
c        apply the rotations to z.
c
         if (nz .lt. 1) go to 250
         do 240 j = 1, nz
            do 230 i = k, lm1
               ii = i - km1
               t = c(ii)*z(i,j) + s(ii)*z(i+1,j)
               z(i+1,j) = c(ii)*z(i+1,j) - s(ii)*z(i,j)
               z(i,j) = t
  230       continue
  240    continue
  250    continue
  260 continue
      return
      end
