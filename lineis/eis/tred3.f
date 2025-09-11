      subroutine tred3(n,nv,a,d,e,e2)
c
      integer i,j,k,l,n,ii,iz,jk,nv,jm1
      double precision a(nv),d(n),e(n),e2(n)
      double precision f,g,h,hh,scale
c
c     this subroutine is a translation of the algol procedure tred3,
c     num. math. 11, 181-195(1968) by martin, reinsch, and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 212-226(1971).
c
c     this subroutine reduces a real symmetric matrix, stored as
c     a one-dimensional array, to a symmetric tridiagonal matrix
c     using orthogonal similarity transformations.
c
c     on input
c
c        n is the order of the matrix.
c
c        nv must be set to the dimension of the array parameter a
c          as declared in the calling program dimension statement.
c
c        a contains the lower triangle of the real symmetric
c          input matrix, stored row-wise as a one-dimensional
c          array, in its first n*(n+1)/2 positions.
c
c     on output
c
c        a contains information about the orthogonal
c          transformations used in the reduction.
c
c        d contains the diagonal elements of the tridiagonal matrix.
c
c        e contains the subdiagonal elements of the tridiagonal
c          matrix in its last n-1 positions.  e(1) is set to zero.
c
c        e2 contains the squares of the corresponding elements of e.
c          e2 may coincide with e if the squares are not needed.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
c     .......... for i=n step -1 until 1 do -- ..........
      do 300 ii = 1, n
         i = n + 1 - ii
         l = i - 1
         iz = (i * l) / 2
         h = 0.0d0
         scale = 0.0d0
         if (l .lt. 1) go to 130
c     .......... scale row (algol tol then not needed) ..........
         do 120 k = 1, l
            iz = iz + 1
            d(k) = a(iz)
            scale = scale + dabs(d(k))
  120    continue
c
         if (scale .ne. 0.0d0) go to 140
  130    e(i) = 0.0d0
         e2(i) = 0.0d0
         go to 290
c
  140    do 150 k = 1, l
            d(k) = d(k) / scale
            h = h + d(k) * d(k)
  150    continue
c
         e2(i) = scale * scale * h
         f = d(l)
         g = -dsign(dsqrt(h),f)
         e(i) = scale * g
         h = h - f * g
         d(l) = f - g
         a(iz) = scale * d(l)
         if (l .eq. 1) go to 290
         jk = 1
c
         do 240 j = 1, l
            f = d(j)
            g = 0.0d0
            jm1 = j - 1
            if (jm1 .lt. 1) go to 220
c
            do 200 k = 1, jm1
               g = g + a(jk) * d(k)
               e(k) = e(k) + a(jk) * f
               jk = jk + 1
  200       continue
c     
  220       e(j) = g + a(jk) * f
            jk = jk + 1
  240    continue
c     .......... form p ..........
         f = 0.0d0
c
         do 245 j = 1, l
            e(j) = e(j) / h
            f = f + e(j) * d(j)
  245    continue
c
         hh = f / (h + h)
c     .......... form q ..........
         do 250 j = 1, l
  250    e(j) = e(j) - hh * d(j)
c
         jk = 1
c     .......... form reduced a ..........
         do 280 j = 1, l
            f = d(j)
            g = e(j)
c
            do 260 k = 1, j
               a(jk) = a(jk) - f * e(k) - g * d(k)
               jk = jk + 1
  260       continue
c
  280    continue
c
  290    d(i) = a(iz+1)
         a(iz+1) = scale * dsqrt(h)
  300 continue
c
      return
      end
