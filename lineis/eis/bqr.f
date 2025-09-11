      subroutine bqr(nm,n,mb,a,t,r,ierr,nv,rv)
c
      integer i,j,k,l,m,n,ii,ik,jk,jm,kj,kk,km,ll,mb,mk,mn,mz,
     x        m1,m2,m3,m4,ni,nm,nv,its,kj1,m21,m31,ierr,imult
      double precision a(nm,mb),rv(nv)
      double precision f,g,q,r,s,t,tst1,tst2,scale,pythag
c
c     this subroutine is a translation of the algol procedure bqr,
c     num. math. 16, 85-92(1970) by martin, reinsch, and wilkinson.
c     handbook for auto. comp., vol ii-linear algebra, 266-272(1971).
c
c     this subroutine finds the eigenvalue of smallest (usually)
c     magnitude of a real symmetric band matrix using the
c     qr algorithm with shifts of origin.  consecutive calls
c     can be made to find further eigenvalues.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        mb is the (half) band width of the matrix, defined as the
c          number of adjacent diagonals, including the principal
c          diagonal, required to specify the non-zero portion of the
c          lower triangle of the matrix.
c
c        a contains the lower triangle of the symmetric band input
c          matrix stored as an n by mb array.  its lowest subdiagonal
c          is stored in the last n+1-mb positions of the first column,
c          its next subdiagonal in the last n+2-mb positions of the
c          second column, further subdiagonals similarly, and finally
c          its principal diagonal in the n positions of the last column.
c          contents of storages not part of the matrix are arbitrary.
c          on a subsequent call, its output contents from the previous
c          call should be passed.
c
c        t specifies the shift (of eigenvalues) applied to the diagonal
c          of a in forming the input matrix. what is actually determined
c          is the eigenvalue of a+ti (i is the identity matrix) nearest
c          to t.  on a subsequent call, the output value of t from the
c          previous call should be passed if the next nearest eigenvalue
c          is sought.
c
c        r should be specified as zero on the first call, and as its
c          output value from the previous call on a subsequent call.
c          it is used to determine when the last row and column of
c          the transformed band matrix can be regarded as negligible.
c
c        nv must be set to the dimension of the array parameter rv
c          as declared in the calling program dimension statement.
c
c     on output
c
c        a contains the transformed band matrix.  the matrix a+ti
c          derived from the output parameters is similar to the
c          input a+ti to within rounding errors.  its last row and
c          column are null (if ierr is zero).
c
c        t contains the computed eigenvalue of a+ti (if ierr is zero).
c
c        r contains the maximum of its input value and the norm of the
c          last column of the input matrix a.
c
c        ierr is set to
c          zero       for normal return,
c          n          if the eigenvalue has not been
c                     determined after 30 iterations.
c
c        rv is a temporary storage array of dimension at least
c          (2*mb**2+4*mb-3).  the first (3*mb-2) locations correspond
c          to the algol array b, the next (2*mb-1) locations correspond
c          to the algol array h, and the final (2*mb**2-mb) locations
c          correspond to the mb by (2*mb-1) algol array u.
c
c     note. for a subsequent call, n should be replaced by n-1, but
c     mb should not be altered even when it exceeds the current n.
c
c     calls pythag for  dsqrt(a*a + b*b) .
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      ierr = 0
      m1 = min0(mb,n)
      m = m1 - 1
      m2 = m + m
      m21 = m2 + 1
      m3 = m21 + m
      m31 = m3 + 1
      m4 = m31 + m2
      mn = m + n
      mz = mb - m1
      its = 0
c     .......... test for convergence ..........
   40 g = a(n,mb)
      if (m .eq. 0) go to 360
      f = 0.0d0
c
      do 50 k = 1, m
         mk = k + mz
         f = f + dabs(a(n,mk))
   50 continue
c
      if (its .eq. 0 .and. f .gt. r) r = f
      tst1 = r
      tst2 = tst1 + f
      if (tst2 .le. tst1) go to 360
      if (its .eq. 30) go to 1000
      its = its + 1
c     .......... form shift from bottom 2 by 2 minor ..........
      if (f .gt. 0.25d0 * r .and. its .lt. 5) go to 90
      f = a(n,mb-1)
      if (f .eq. 0.0d0) go to 70
      q = (a(n-1,mb) - g) / (2.0d0 * f)
      s = pythag(q,1.0d0)
      g = g - f / (q + dsign(s,q))
   70 t = t + g
c
      do 80 i = 1, n
   80 a(i,mb) = a(i,mb) - g
c
   90 do 100 k = m31, m4
  100 rv(k) = 0.0d0
c
      do 350 ii = 1, mn
         i = ii - m
         ni = n - ii
         if (ni .lt. 0) go to 230
c     .......... form column of shifted matrix a-g*i ..........
         l = max0(1,2-i)
c
         do 110 k = 1, m3
  110    rv(k) = 0.0d0
c
         do 120 k = l, m1
            km = k + m
            mk = k + mz
            rv(km) = a(ii,mk)
  120    continue
c
         ll = min0(m,ni)
         if (ll .eq. 0) go to 135
c
         do 130 k = 1, ll
            km = k + m21
            ik = ii + k
            mk = mb - k
            rv(km) = a(ik,mk)
  130    continue
c     .......... pre-multiply with householder reflections ..........
  135    ll = m2
         imult = 0
c     .......... multiplication procedure ..........
  140    kj = m4 - m1
c
         do 170 j = 1, ll
            kj = kj + m1
            jm = j + m3
            if (rv(jm) .eq. 0.0d0) go to 170
            f = 0.0d0
c
            do 150 k = 1, m1
               kj = kj + 1
               jk = j + k - 1
               f = f + rv(kj) * rv(jk)
  150       continue
c
            f = f / rv(jm)
            kj = kj - m1
c
            do 160 k = 1, m1
               kj = kj + 1
               jk = j + k - 1
               rv(jk) = rv(jk) - rv(kj) * f
  160       continue
c
            kj = kj - m1
  170    continue
c
         if (imult .ne. 0) go to 280
c     .......... householder reflection ..........
         f = rv(m21)
         s = 0.0d0
         rv(m4) = 0.0d0
         scale = 0.0d0
c
         do 180 k = m21, m3
  180    scale = scale + dabs(rv(k))
c
         if (scale .eq. 0.0d0) go to 210
c
         do 190 k = m21, m3
  190    s = s + (rv(k)/scale)**2
c
         s = scale * scale * s
         g = -dsign(dsqrt(s),f)
         rv(m21) = g
         rv(m4) = s - f * g
         kj = m4 + m2 * m1 + 1
         rv(kj) = f - g
c
         do 200 k = 2, m1
            kj = kj + 1
            km = k + m2
            rv(kj) = rv(km)
  200    continue
c     .......... save column of triangular factor r ..........
  210    do 220 k = l, m1
            km = k + m
            mk = k + mz
            a(ii,mk) = rv(km)
  220    continue
c
  230    l = max0(1,m1+1-i)
         if (i .le. 0) go to 300
c     .......... perform additional steps ..........
         do 240 k = 1, m21
  240    rv(k) = 0.0d0
c
         ll = min0(m1,ni+m1)
c     .......... get row of triangular factor r ..........
         do 250 kk = 1, ll
            k = kk - 1
            km = k + m1
            ik = i + k
            mk = mb - k
            rv(km) = a(ik,mk)
  250    continue
c     .......... post-multiply with householder reflections ..........
         ll = m1
         imult = 1
         go to 140
c     .......... store column of new a matrix ..........
  280    do 290 k = l, m1
            mk = k + mz
            a(i,mk) = rv(k)
  290    continue
c     .......... update householder reflections ..........
  300    if (l .gt. 1) l = l - 1
         kj1 = m4 + l * m1
c
         do 320 j = l, m2
            jm = j + m3
            rv(jm) = rv(jm+1)
c
            do 320 k = 1, m1
               kj1 = kj1 + 1
               kj = kj1 - m1
               rv(kj) = rv(kj1)
  320    continue
c
  350 continue
c
      go to 40
c     .......... convergence ..........
  360 t = t + g
c
      do 380 i = 1, n
  380 a(i,mb) = a(i,mb) - g
c
      do 400 k = 1, m1
         mk = k + mz
         a(n,mk) = 0.0d0
  400 continue
c
      go to 1001
c     .......... set error -- no convergence to
c                eigenvalue after 30 iterations ..........
 1000 ierr = n
 1001 return
      end
