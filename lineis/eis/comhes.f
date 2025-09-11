      subroutine comhes(nm,n,low,igh,ar,ai,int)
c
      integer i,j,m,n,la,nm,igh,kp1,low,mm1,mp1
      double precision ar(nm,n),ai(nm,n)
      double precision xr,xi,yr,yi
      integer int(igh)
c
c     this subroutine is a translation of the algol procedure comhes,
c     num. math. 12, 349-368(1968) by martin and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 339-358(1971).
c
c     given a complex general matrix, this subroutine
c     reduces a submatrix situated in rows and columns
c     low through igh to upper hessenberg form by
c     stabilized elementary similarity transformations.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        n is the order of the matrix.
c
c        low and igh are integers determined by the balancing
c          subroutine  cbal.  if  cbal  has not been used,
c          set low=1, igh=n.
c
c        ar and ai contain the real and imaginary parts,
c          respectively, of the complex input matrix.
c
c     on output
c
c        ar and ai contain the real and imaginary parts,
c          respectively, of the hessenberg matrix.  the
c          multipliers which were used in the reduction
c          are stored in the remaining triangles under the
c          hessenberg matrix.
c
c        int contains information on the rows and columns
c          interchanged in the reduction.
c          only elements low through igh are used.
c
c     calls cdiv for complex division.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      la = igh - 1
      kp1 = low + 1
      if (la .lt. kp1) go to 200
c
      do 180 m = kp1, la
         mm1 = m - 1
         xr = 0.0d0
         xi = 0.0d0
         i = m
c
         do 100 j = m, igh
            if (dabs(ar(j,mm1)) + dabs(ai(j,mm1))
     x         .le. dabs(xr) + dabs(xi)) go to 100
            xr = ar(j,mm1)
            xi = ai(j,mm1)
            i = j
  100    continue
c
         int(m) = i
         if (i .eq. m) go to 130
c     .......... interchange rows and columns of ar and ai ..........
         do 110 j = mm1, n
            yr = ar(i,j)
            ar(i,j) = ar(m,j)
            ar(m,j) = yr
            yi = ai(i,j)
            ai(i,j) = ai(m,j)
            ai(m,j) = yi
  110    continue
c
         do 120 j = 1, igh
            yr = ar(j,i)
            ar(j,i) = ar(j,m)
            ar(j,m) = yr
            yi = ai(j,i)
            ai(j,i) = ai(j,m)
            ai(j,m) = yi
  120    continue
c     .......... end interchange ..........
  130    if (xr .eq. 0.0d0 .and. xi .eq. 0.0d0) go to 180
         mp1 = m + 1
c
         do 160 i = mp1, igh
            yr = ar(i,mm1)
            yi = ai(i,mm1)
            if (yr .eq. 0.0d0 .and. yi .eq. 0.0d0) go to 160
            call cdiv(yr,yi,xr,xi,yr,yi)
            ar(i,mm1) = yr
            ai(i,mm1) = yi
c
            do 140 j = m, n
               ar(i,j) = ar(i,j) - yr * ar(m,j) + yi * ai(m,j)
               ai(i,j) = ai(i,j) - yr * ai(m,j) - yi * ar(m,j)
  140       continue
c
            do 150 j = 1, igh
               ar(j,m) = ar(j,m) + yr * ar(j,i) - yi * ai(j,i)
               ai(j,m) = ai(j,m) + yr * ai(j,i) + yi * ar(j,i)
  150       continue
c
  160    continue
c
  180 continue
c
  200 return
      end
