
!
!  =========== DOCUMENTATION ===========
!
! Online html documentation available at
!            http://www.netlib.org/lapack/explore-html/
!
!  =============
!
!  Arguments:
!  ==========
!
!
!  Authors:
!  ========
!
!
!
!
!  =====================
!
!  =====================================================================

subroutine zrotg( a, b, c, s )
   integer, parameter :: wp = kind(1.d0)
!
!  -- Reference BLAS level1 routine --
!  -- Reference BLAS is a software package provided by Univ. of Tennessee,    --
!  -- Univ. of California Berkeley, Univ. of Colorado Denver and NAG Ltd..--
!
!  .. Constants ..
   real(wp), parameter :: zero = 0.0_wp
   real(wp), parameter :: one  = 1.0_wp
   complex(wp), parameter :: czero  = 0.0_wp
!  ..
!  .. Scaling constants ..
   real(wp), parameter :: safmin = real(radix(0._wp),wp)**max( &
      minexponent(0._wp)-1, &
      1-maxexponent(0._wp) &
   )
   real(wp), parameter :: safmax = real(radix(0._wp),wp)**max( &
      1-minexponent(0._wp), &
      maxexponent(0._wp)-1 &
   )
   real(wp), parameter :: rtmin = sqrt( safmin )
!  ..
!  .. Scalar Arguments ..
   real(wp) :: c
   complex(wp) :: a, b, s
!  ..
!  .. Local Scalars ..
   real(wp) :: d, f1, f2, g1, g2, h2, u, v, w, rtmax
   complex(wp) :: f, fs, g, gs, r, t
!  ..
!  .. Intrinsic Functions ..
   intrinsic :: abs, aimag, conjg, max, min, real, sqrt
!  ..
!  .. Statement Functions ..
   real(wp) :: ABSSQ
!  ..
!  .. Statement Function definitions ..
   abssq( t ) = real( t )**2 + aimag( t )**2
!  ..
!  .. Executable Statements ..
!
   f = a
   g = b
   if( g == czero ) then
      c = one
      s = czero
      r = f
   else if( f == czero ) then
      c = zero
      if( real(g) == zero ) then
         r = abs(aimag(g))
         s = conjg( g ) / r
      elseif( aimag(g) == zero ) then
         r = abs(real(g))
         s = conjg( g ) / r
      else
         g1 = max( abs(real(g)), abs(aimag(g)) )
         rtmax = sqrt( safmax/2 )
         if( g1 > rtmin .and. g1 < rtmax ) then
!
!        Use unscaled algorithm
!
!           The following two lines can be replaced by `d = abs( g )`.
!           This algorithm do not use the intrinsic complex abs.
            g2 = abssq( g )
            d = sqrt( g2 )
            s = conjg( g ) / d
            r = d
         else
!
!        Use scaled algorithm
!
            u = min( safmax, max( safmin, g1 ) )
            gs = g / u
!           The following two lines can be replaced by `d = abs( gs )`.
!           This algorithm do not use the intrinsic complex abs.
            g2 = abssq( gs )
            d = sqrt( g2 )
            s = conjg( gs ) / d
            r = d*u
         end if
      end if
   else
      f1 = max( abs(real(f)), abs(aimag(f)) )
      g1 = max( abs(real(g)), abs(aimag(g)) )
      rtmax = sqrt( safmax/4 )
      if( f1 > rtmin .and. f1 < rtmax .and. &
          g1 > rtmin .and. g1 < rtmax ) then
!
!        Use unscaled algorithm
!
         f2 = abssq( f )
         g2 = abssq( g )
         h2 = f2 + g2
         ! safmin <= f2 <= h2 <= safmax
         if( f2 >= h2 * safmin ) then
            ! safmin <= f2/h2 <= 1, and h2/f2 is finite
            c = sqrt( f2 / h2 )
            r = f / c
            rtmax = rtmax * 2
            if( f2 > rtmin .and. h2 < rtmax ) then
               ! safmin <= sqrt( f2*h2 ) <= safmax
               s = conjg( g ) * ( f / sqrt( f2*h2 ) )
            else
               s = conjg( g ) * ( r / h2 )
            end if
         else
            ! f2/h2 <= safmin may be subnormal, and h2/f2 may overflow.
            ! Moreover,
            !  safmin <= f2*f2 * safmax < f2 * h2 < h2*h2 * safmin <= safmax,
            !  sqrt(safmin) <= sqrt(f2 * h2) <= sqrt(safmax).
            ! Also,
            !  g2 >> f2, which means that h2 = g2.
            d = sqrt( f2 * h2 )
            c = f2 / d
            if( c >= safmin ) then
               r = f / c
            else
               ! f2 / sqrt(f2 * h2) < safmin, then
               !  sqrt(safmin) <= f2 * sqrt(safmax) <= h2 / sqrt(f2 * h2) <= h2 * (safmin / f2) <= h2 <= safmax
               r = f * ( h2 / d )
            end if
            s = conjg( g ) * ( f / d )
         end if
      else
!
!        Use scaled algorithm
!
         u = min( safmax, max( safmin, f1, g1 ) )
         gs = g / u
         g2 = abssq( gs )
         if( f1 / u < rtmin ) then
!
!           f is not well-scaled when scaled by g1.
!           Use a different scaling for f.
!
            v = min( safmax, max( safmin, f1 ) )
            w = v / u
            fs = f / v
            f2 = abssq( fs )
            h2 = f2*w**2 + g2
         else
!
!           Otherwise use the same scaling for f and g.
!
            w = one
            fs = f / u
            f2 = abssq( fs )
            h2 = f2 + g2
         end if
         ! safmin <= f2 <= h2 <= safmax
         if( f2 >= h2 * safmin ) then
            ! safmin <= f2/h2 <= 1, and h2/f2 is finite
            c = sqrt( f2 / h2 )
            r = fs / c
            rtmax = rtmax * 2
            if( f2 > rtmin .and. h2 < rtmax ) then
               ! safmin <= sqrt( f2*h2 ) <= safmax
               s = conjg( gs ) * ( fs / sqrt( f2*h2 ) )
            else
               s = conjg( gs ) * ( r / h2 )
            end if
         else
            ! f2/h2 <= safmin may be subnormal, and h2/f2 may overflow.
            ! Moreover,
            !  safmin <= f2*f2 * safmax < f2 * h2 < h2*h2 * safmin <= safmax,
            !  sqrt(safmin) <= sqrt(f2 * h2) <= sqrt(safmax).
            ! Also,
            !  g2 >> f2, which means that h2 = g2.
            d = sqrt( f2 * h2 )
            c = f2 / d
            if( c >= safmin ) then
               r = fs / c
            else
               ! f2 / sqrt(f2 * h2) < safmin, then
               !  sqrt(safmin) <= f2 * sqrt(safmax) <= h2 / sqrt(f2 * h2) <= h2 * (safmin / f2) <= h2 <= safmax
               r = fs * ( h2 / d )
            end if
            s = conjg( gs ) * ( fs / d )
         end if
         ! Rescale c and r
         c = c * w
         r = r * u
      end if
   end if
   a = r
   return

end subroutine
