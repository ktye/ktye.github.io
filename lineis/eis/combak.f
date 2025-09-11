      subroutine combak(nm,low,igh,ar,ai,int,m,zr,zi)
c
      integer i,j,m,la,mm,mp,nm,igh,kp1,low,mp1
      double precision ar(nm,igh),ai(nm,igh),zr(nm,m),zi(nm,m)
      double precision xr,xi
      integer int(igh)
c
c     this subroutine is a translation of the algol procedure combak,
c     num. math. 12, 349-368(1968) by martin and wilkinson.
c     handbook for auto. comp., vol.ii-linear algebra, 339-358(1971).
c
c     this subroutine forms the eigenvectors of a complex general
c     matrix by back transforming those of the corresponding
c     upper hessenberg matrix determined by  comhes.
c
c     on input
c
c        nm must be set to the row dimension of two-dimensional
c          array parameters as declared in the calling program
c          dimension statement.
c
c        low and igh are integers determined by the balancing
c          subroutine  cbal.  if  cbal  has not been used,
c          set low=1 and igh equal to the order of the matrix.
c
c        ar and ai contain the multipliers which were used in the
c          reduction by  comhes  in their lower triangles
c          below the subdiagonal.
c
c        int contains information on the rows and columns
c          interchanged in the reduction by  comhes.
c          only elements low through igh are used.
c
c        m is the number of eigenvectors to be back transformed.
c
c        zr and zi contain the real and imaginary parts,
c          respectively, of the eigenvectors to be
c          back transformed in their first m columns.
c
c     on output
c
c        zr and zi contain the real and imaginary parts,
c          respectively, of the transformed eigenvectors
c          in their first m columns.
c
c     questions and comments should be directed to burton s. garbow,
c     mathematics and computer science div, argonne national laboratory
c
c     this version dated august 1983.
c
c     ------------------------------------------------------------------
c
      if (m .eq. 0) go to 200
      la = igh - 1
      kp1 = low + 1
      if (la .lt. kp1) go to 200
c     .......... for mp=igh-1 step -1 until low+1 do -- ..........
      do 140 mm = kp1, la
         mp = low + igh - mm
         mp1 = mp + 1
c
         do 110 i = mp1, igh
            xr = ar(i,mp-1)
            xi = ai(i,mp-1)
            if (xr .eq. 0.0d0 .and. xi .eq. 0.0d0) go to 110
c
            do 100 j = 1, m
               zr(i,j) = zr(i,j) + xr * zr(mp,j) - xi * zi(mp,j)
               zi(i,j) = zi(i,j) + xr * zi(mp,j) + xi * zr(mp,j)
  100       continue
c
  110    continue
c
         i = int(mp)
         if (i .eq. mp) go to 140
c
         do 130 j = 1, m
            xr = zr(i,j)
            zr(i,j) = zr(mp,j)
            zr(mp,j) = xr
            xi = zi(i,j)
            zi(i,j) = zi(mp,j)
            zi(mp,j) = xi
  130    continue
c
  140 continue
c
  200 return
      end
