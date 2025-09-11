
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
!  ==================
!
!
!  =====================
!
!  =====================================================================

subroutine drotg( a, b, c, s )
   integer, parameter :: wp = kind(1.d0)
!
!  -- Reference BLAS level1 routine --
!  -- Reference BLAS is a software package provided by Univ. of Tennessee,    --
!  -- Univ. of California Berkeley, Univ. of Colorado Denver and NAG Ltd..--
!
!  .. Constants ..
   real(wp), parameter :: zero = 0.0_wp
   real(wp), parameter :: one  = 1.0_wp
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
!  ..
!  .. Scalar Arguments ..
   real(wp) :: a, b, c, s
!  ..
!  .. Local Scalars ..
   real(wp) :: anorm, bnorm, scl, sigma, r, z
!  ..
   anorm = abs(a)
   bnorm = abs(b)
   if( bnorm == zero ) then
      c = one
      s = zero
      b = zero
   else if( anorm == zero ) then
      c = zero
      s = one
      a = b
      b = one
   else
      scl = min( safmax, max( safmin, anorm, bnorm ) )
      if( anorm > bnorm ) then
         sigma = sign(one,a)
      else
         sigma = sign(one,b)
      end if
      r = sigma*( scl*sqrt((a/scl)**2 + (b/scl)**2) )
      c = a/r
      s = b/r
      if( anorm > bnorm ) then
         z = s
      else if( c /= zero ) then
         z = one/c
      else
         z = one
      end if
      a = r
      b = z
   end if
   return

end subroutine
