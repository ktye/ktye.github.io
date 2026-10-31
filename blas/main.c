#include<stdio.h>
#define BLAS_IMPL
#include"cblas.h"
#include<stdlib.h>
#include<math.h>
#include<float.h>
void gsl_test_rel(double result, double expected, double relative_error, const char *t);
void test_copy(void) { const double flteps = 1e-4, dbleps = 1e-6;
  { int N = 1; double X[] = { 0.002 }; int incX = 1; double Y[] = { -0.921 }; int incY = -1; double expected[] = { 0.002 };
   cblas_dcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[i], expected[i], dbleps, "dcopy(case 77)"); } }; };

  { int N = 1; double X[] = { 0.315, -0.324 }; int incX = 1; double Y[] = { -0.312, -0.748 }; int incY = -1; double expected[] = { 0.315, -0.324 };
   cblas_zcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], expected[2*i], dbleps, "zcopy(case 79) real"); gsl_test_rel(Y[2*i+1], expected[2*i+1], dbleps, "zcopy(case 79) imag"); }; }; };

  { int N = 1; double X[] = { 0.021 }; int incX = -1; double Y[] = { 0.898 }; int incY = 1; double expected[] = { 0.021 };
   cblas_dcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[i], expected[i], dbleps, "dcopy(case 81)"); } }; };

  { int N = 1; double X[] = { -0.265, -0.84 }; int incX = -1; double Y[] = { -0.156, 0.939 }; int incY = 1; double expected[] = { -0.265, -0.84 };
   cblas_zcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], expected[2*i], dbleps, "zcopy(case 83) real"); gsl_test_rel(Y[2*i+1], expected[2*i+1], dbleps, "zcopy(case 83) imag"); }; }; };

  { int N = 1; double X[] = { -0.374 }; int incX = -1; double Y[] = { -0.161 }; int incY = -1; double expected[] = { -0.374 };
   cblas_dcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[i], expected[i], dbleps, "dcopy(case 85)"); } }; };

  { int N = 1; double X[] = { 0.831, -0.282 }; int incX = -1; double Y[] = { -0.62, 0.32 }; int incY = -1; double expected[] = { 0.831, -0.282 };
   cblas_zcopy(N, X, incX, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], expected[2*i], dbleps, "zcopy(case 87) real"); gsl_test_rel(Y[2*i+1], expected[2*i+1], dbleps, "zcopy(case 87) imag"); }; }; };
}
void test_scal(void) { const double flteps = 1e-4, dbleps = 1e-6;

  { int N = 1; double alpha = 0; double X[] = { 0.686 }; int incX = -1; double expected[] = { 0.686 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 115)"); } }; };

  { int N = 1; double alpha = 0.1; double X[] = { 0.686 }; int incX = -1; double expected[] = { 0.686 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 116)"); } }; };


  { int N = 1; double alpha = 1; double X[] = { 0.686 }; int incX = -1; double expected[] = { 0.686 }; 
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 117)"); } }; };

  { int N = 1; double alpha[2] = {0, 0}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 124) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 124) imag"); }; }; };

  { int N = 1; double alpha[2] = {0.1, 0}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 125) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 125) imag"); }; }; };

  { int N = 1; double alpha[2] = {1, 0}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 126) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 126) imag"); }; }; };

  { int N = 1; double alpha[2] = {0, 0.1}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 127) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 127) imag"); }; }; };

  { int N = 1; double alpha[2] = {0.1, 0.2}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 128) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 128) imag"); }; }; };

  { int N = 1; double alpha[2] = {1, 0.3}; double X[] = { 0.454, -0.478 }; int incX = -1; double expected[] = { 0.454, -0.478 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 129) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 129) imag"); }; }; };

  { int N = 2; double alpha = 0; double X[] = { -0.429, -0.183 }; int incX = 1; double expected[] = { -0.0, -0.0 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 133)"); } }; };

  { int N = 2; double alpha = 0.1; double X[] = { -0.429, -0.183 }; int incX = 1; double expected[] = { -0.0429, -0.0183 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 134)"); } }; };

  { int N = 2; double alpha = 1; double X[] = { -0.429, -0.183 }; int incX = 1; double expected[] = { -0.429, -0.183 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 135)"); } }; };

  { int N = 2; double alpha[2] = {0, 0}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -0.0, 0.0, 0.0, 0.0 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 142) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 142) imag"); }; }; };

  { int N = 2; double alpha[2] = {0.1, 0}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -0.0956, 0.0613, 0.0443, 0.0503 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 143) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 143) imag"); }; }; };

  { int N = 2; double alpha[2] = {1, 0}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -0.956, 0.613, 0.443, 0.503 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 144) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 144) imag"); }; }; };

  { int N = 2; double alpha[2] = {0, 0.1}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -0.0613, -0.0956, -0.0503, 0.0443 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 145) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 145) imag"); }; }; };

  { int N = 2; double alpha[2] = {0.1, 0.2}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -0.2182, -0.1299, -0.0563, 0.1389 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 146) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 146) imag"); }; }; };

  { int N = 2; double alpha[2] = {1, 0.3}; double X[] = { -0.956, 0.613, 0.443, 0.503 }; int incX = 1; double expected[] = { -1.1399, 0.3262, 0.2921, 0.6359 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 147) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 147) imag"); }; }; };

  { int N = 2; double alpha = 0; double X[] = { 0.398, -0.656 }; int incX = -1; double expected[] = { 0.398, -0.656 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 151)"); } }; };

  { int N = 2; double alpha = 0.1; double X[] = { 0.398, -0.656 }; int incX = -1; double expected[] = { 0.398, -0.656 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 152)"); } }; };

  { int N = 2; double alpha = 1; double X[] = { 0.398, -0.656 }; int incX = -1; double expected[] = { 0.398, -0.656 };
   cblas_dscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[i], expected[i], dbleps, "dscal(case 153)"); } }; };

  { int N = 2; double alpha[2] = {0, 0}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 160) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 160) imag"); }; }; };

  { int N = 2; double alpha[2] = {0.1, 0}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 161) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 161) imag"); }; }; };

  { int N = 2; double alpha[2] = {1, 0}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 162) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 162) imag"); }; }; };

  { int N = 2; double alpha[2] = {0, 0.1}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 163) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 163) imag"); }; }; };

  { int N = 2; double alpha[2] = {0.1, 0.2}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 164) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 164) imag"); }; }; };

  { int N = 2; double alpha[2] = {1, 0.3}; double X[] = { 0.521, -0.811, 0.556, -0.147 }; int incX = -1; double expected[] = { 0.521, -0.811, 0.556, -0.147 };
   cblas_zscal(N, alpha, X, incX); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(X[2*i], expected[2*i], dbleps, "zscal(case 165) real"); gsl_test_rel(X[2*i+1], expected[2*i+1], dbleps, "zscal(case 165) imag"); }; }; };
}
void test_gemv (void) { const double flteps = 1e-4, dbleps = 1e-6;
  { int order = 102; int trans = 111; int M = 1; int N = 1; int lda = 1; double alpha = -0.3; double beta = -1; double A[] = { -0.047 }; double X[] = { 0.672 }; int incX = -1; double Y[] = { 0.554 }; int incY = -1; double y_expected[] = { -0.5445248 };
   cblas_dgemv(order, trans, M, N, alpha, A, lda, X, incX, beta, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[i], y_expected[i], dbleps, "dgemv(case 779)"); } }; };

  { int order = 102; int trans = 112; int M = 1; int N = 1; int lda = 1; double alpha = -1; double beta = 1; double A[] = { -0.047 }; double X[] = { 0.672 }; int incX = -1; double Y[] = { 0.554 }; int incY = -1; double y_expected[] = { 0.585584 };
   cblas_dgemv(order, trans, M, N, alpha, A, lda, X, incX, beta, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[i], y_expected[i], dbleps, "dgemv(case 781)"); } }; };

  { int order = 102; int trans = 111; int M = 1; int N = 1; int lda = 1; double alpha[2] = {0, 0.1}; double beta[2] = {1, 0}; double A[] = { 0.932, -0.724 }; double X[] = { 0.334, -0.317 }; int incX = -1; double Y[] = { 0.348, 0.07 }; int incY = -1; double y_expected[] = { 0.401726, 0.078178 };
   cblas_zgemv(order, trans, M, N, alpha, A, lda, X, incX, beta, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], y_expected[2*i], dbleps, "zgemv(case 789) real"); gsl_test_rel(Y[2*i+1], y_expected[2*i+1], dbleps, "zgemv(case 789) imag"); }; }; };

  { int order = 102; int trans = 112; int M = 1; int N = 1; int lda = 1; double alpha[2] = {-0.3, 0.1}; double beta[2] = {0, 1}; double A[] = { 0.932, -0.724 }; double X[] = { 0.334, -0.317 }; int incX = -1; double Y[] = { 0.348, 0.07 }; int incY = -1; double y_expected[] = { -0.040808, 0.517356 };
   cblas_zgemv(order, trans, M, N, alpha, A, lda, X, incX, beta, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], y_expected[2*i], dbleps, "zgemv(case 791) real"); gsl_test_rel(Y[2*i+1], y_expected[2*i+1], dbleps, "zgemv(case 791) imag"); }; }; };

  { int order = 102; int trans = 113; int M = 1; int N = 1; int lda = 1; double alpha[2] = {1, 0}; double beta[2] = {0, 0}; double A[] = { 0.932, -0.724 }; double X[] = { 0.334, -0.317 }; int incX = -1; double Y[] = { 0.348, 0.07 }; int incY = -1; double y_expected[] = { 0.540796, -0.053628 }; 
   cblas_zgemv(order, trans, M, N, alpha, A, lda, X, incX, beta, Y, incY); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(Y[2*i], y_expected[2*i], dbleps, "zgemv(case 793) real"); gsl_test_rel(Y[2*i+1], y_expected[2*i+1], dbleps, "zgemv(case 793) imag"); }; }; };
}
void test_gemm(void) { const double flteps = 1e-4, dbleps = 1e-6;
  { int order = 102; int transA = 111; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha = 0; double beta = 0; double A[] = { 0.571, 0.081, 0.109, 0.988 }; int lda = 1;
   double B[] = { -0.048, -0.753, -0.8, -0.89, -0.535, -0.017, -0.018, -0.544 }; int ldb = 4; double C[] = { -0.876, -0.792 }; int ldc = 1; double C_expected[] = { 0.0, 0.0 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1475)"); } }; };

  { int order = 102; int transA = 111; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha = -0.3; double beta = 1; double A[] = { -0.795, 0.81, 0.388, 0.09 }; int lda = 1;
   double B[] = { -0.847, 0.031, -0.938, 0.09, -0.286, -0.478, -0.981, 0.881 }; int ldb = 2; double C[] = { -0.242, -0.02 };
   int ldc = 1; double C_expected[] = { -0.1562981, -0.0026243 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1477)"); } }; };

  { int order = 102; int transA = 112; int transB = 111; int M = 1; int N = 2; int K = 4; 
   double alpha = -1; double beta = 0; double A[] = { -0.358, 0.224, -0.941, 0.513 }; int lda = 4;
   double B[] = { -0.201, -0.159, -0.586, -0.016, -0.324, 0.411, 0.115, -0.229 }; int ldb = 4; double C[] = { 0.558, 0.596 }; int ldc = 1; double C_expected[] = { -0.57956, 0.017636 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1479)"); } }; };

  { int order = 102; int transA = 112; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha = -0.3; double beta = 1; double A[] = { -0.164, 0.522, 0.948, -0.624 }; int lda = 4; double B[] = { -0.142, 0.778, 0.359, 0.622, -0.637, -0.757, -0.282, -0.805 }; int ldb = 2;
   double C[] = { -0.09, 0.183 }; int ldc = 1; double C_expected[] = { -0.0248334, 0.1884672 }; 
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1481)"); } }; };

  { int order = 102; int transA = 111; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {1, 0}; double beta[2] = {-1, 0}; double A[] = { 0.726, -0.438, -0.23, -0.054, -0.019, 0.902, -0.883, -0.235 }; int lda = 1; double B[] = { 0.159, -0.18, 0.386, -0.167, 0.971, -0.072, 0.87, -0.839, 0.474, 0.956, -0.235, 0.332, 0.826, -0.056, -0.941, 0.01 }; int ldb = 4;
   double C[] = { -0.799, 0.973, -0.549, -0.177 }; int ldc = 1; double C_expected[] = { -0.181084, 0.257841, 2.251901, 1.558195 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1501) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1501) imag"); }; }; };

  { int order = 102; int transA = 111; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0.1}; double beta[2] = {1, 0}; double A[] = { 0.334, 0.192, -0.992, -0.168, 0.154, -0.75, -0.797, -0.76 }; int lda = 1;
   double B[] = { -0.82, 0.147, -0.237, 0.68, 0.317, 0.257, -0.406, -0.802, 0.058, 0.012, -0.832, 0.949, -0.263, -0.085, -0.064, 0.492 }; int ldb = 2;
   double C[] = { 0.079, -0.602, -0.392, 0.316 }; int ldc = 1; double C_expected[] = { 0.0980569, -0.6430449, -0.539207, 0.4226848 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1503) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1503) imag"); }; }; };

  { int order = 102; int transA = 111; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0}; double beta[2] = {-1, 0}; double A[] = { -0.306, -0.709, -0.196, 0.285, 0.873, -0.802, 0.715, -0.179 }; int lda = 1;
   double B[] = { 0.028, 0.109, 0.87, -0.446, 0.735, 0.731, 0.021, -0.186, 0.541, 0.97, -0.333, 0.002, -0.089, -0.01, 0.331, 0.851 }; int ldb = 2;
   double C[] = { 0.902, -0.584, -0.695, -0.607 }; int ldc = 1; double C_expected[] = { -0.902, 0.584, 0.695, 0.607 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1505) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1505) imag"); }; }; };


  { int order = 102; int transA = 112; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-1, 0}; double beta[2] = {1, 0}; double A[] = { 0.064, 0.371, -0.01, -0.262, 0.143, -0.081, 0.1, -0.062 }; int lda = 4;
   double B[] = { -0.749, 0.289, -0.239, -0.226, 0.284, 0.668, 0.305, 0.075, -0.36, 0.166, -0.416, 0.234, -0.267, 0.525, 0.116, -0.561 }; int ldb = 4; double C[] = { 0.671, 0.763, 0.444, -0.246 }; int ldc = 1;
   double C_expected[] = { 0.753107, 0.896395, 0.481996, -0.263126 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1507) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1507) imag"); }; }; };

  { int order = 102; int transA = 112; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {1, 0}; double beta[2] = {-0.3, 0.1}; double A[] = { -0.698, -0.062, 0.023, 0.704, 0.443, -0.46, 0.541, 0.296 }; int lda = 4;
   double B[] = { 0.787, -0.199, 0.835, -0.276, -0.515, 0.467, -0.76, -0.483, 0.015, -0.394, -0.748, 0.02, 0.573, 0.3, -0.088, -0.238 }; int ldb = 2; double C[] = { 0.935, -0.655, -0.797, 0.071 };
   int ldc = 1; double C_expected[] = { -1.070679, 0.178755, -0.344714, -0.308137 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1509) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1509) imag"); }; }; };

  { int order = 102; int transA = 112; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0.1}; double beta[2] = {-0.3, 0.1}; double A[] = { -0.855, -0.173, -0.679, 0.824, 0.469, 0.786, 0.757, -0.109 }; int lda = 4;
   double B[] = { 0.483, -0.888, -0.757, 0.551, -0.81, 0.23, -0.078, 0.725, -0.592, 0.394, 0.884, 0.802, -0.813, -0.016, -0.853, 0.783 }; int ldb = 2; double C[] = { 0.181, -0.368, -0.864, -0.784 }; int ldc = 1;
   double C_expected[] = { 0.1728438, 0.1183508, 0.2526999, 0.3004174 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1511) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1511) imag"); }; }; };

  { int order = 102; int transA = 113; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-1, 0}; double beta[2] = {-0.3, 0.1}; double A[] = { 0.669, 0.046, -0.094, 0.666, 0.23, 0.448, -0.795, -0.142 }; int lda = 4;
   double B[] = { 0.037, -0.154, -0.739, 0.905, 0.793, -0.53, -0.34, 0.428, 0.072, -0.263, -0.603, -0.905, 0.681, -0.083, -0.511, -0.337 }; int ldb = 4; double C[] = { 0.247, 0.575, -0.836, -0.883 };
   int ldc = 1; double C_expected[] = { -0.975939, 0.415528, 0.275533, 0.002716 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1513) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1513) imag"); }; }; };

  { int order = 102; int transA = 113; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0}; double beta[2] = {-1, 0}; double A[] = { -0.141, 0.275, 0.717, 0.775, -0.701, -0.689, -0.883, -0.077 }; int lda = 4;
   double B[] = { -0.526, -0.437, 0.133, -0.209, -0.83, 0.328, 0.916, -0.337, 0.762, -0.664, -0.566, 0.955, 0.168, 0.488, -0.172, -0.535 }; int ldb = 2; double C[] = { -0.88, 0.945, 0.416, 0.99 }; int ldc = 1; double C_expected[] = { 0.88, -0.945, -0.416, -0.99 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1515) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1515) imag"); }; }; };

  { int order = 102; int transA = 113; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-0.3, 0.1}; double beta[2] = {0, 0.1}; double A[] = { 0.575, -0.128, -0.702, 0.758, 0.383, -0.914, 0.157, 0.368 }; int lda = 4;
   double B[] = { 0.572, -0.841, 0.223, -0.334, -0.823, -0.84, 0.671, -0.871, 0.241, 0.927, -0.344, 0.281, -0.034, -0.104, 0.587, -0.329 }; int ldb = 2; double C[] = { -0.612, 0.167, 0.647, 0.447 }; int ldc = 1;
   double C_expected[] = { -0.7876717, 0.0341179, -0.0800018, 0.5717566 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1517) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1517) imag"); }; }; };
}
void test_ger (void) { const double flteps = 1e-4, dbleps = 1e-6;
  { int order = 102; int M = 1; int N = 1; int lda = 1; double alpha = 1; double A[] = { -0.809 }; double X[] = { -0.652 }; int incX = -1; double Y[] = { 0.712 }; int incY = -1; double A_expected[] = { -1.273224 };
   cblas_dger(order, M, N, alpha, X, incX, Y, incY, A, lda); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(A[i], A_expected[i], dbleps, "dger(case 1393)"); } }; };

  { int order = 102; int M = 1; int N = 1; int lda = 1; double alpha[2] = {-1, 0}; double A[] = { -0.426, 0.757 }; double X[] = { -0.579, -0.155 }; int incX = -1; double Y[] = { 0.831, 0.035 }; int incY = -1; double A_expected[] = { 0.049724, 0.90607 };
   cblas_zgeru(order, M, N, alpha, X, incX, Y, incY, A, lda); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(A[2*i], A_expected[2*i], dbleps, "zgeru(case 1400) real"); gsl_test_rel(A[2*i+1], A_expected[2*i+1], dbleps, "zgeru(case 1400) imag"); }; }; };

  { int order = 102; int M = 1; int N = 1; int lda = 1; double alpha[2] = {-1, 0}; double A[] = { -0.426, 0.757 }; double X[] = { -0.579, -0.155 }; int incX = -1; double Y[] = { 0.831, 0.035 }; int incY = -1; double A_expected[] = { 0.060574, 0.86554 };
   cblas_zgerc(order, M, N, alpha, X, incX, Y, incY, A, lda); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(A[2*i], A_expected[2*i], dbleps, "zgerc(case 1401) real"); gsl_test_rel(A[2*i+1], A_expected[2*i+1], dbleps, "zgerc(case 1401) imag"); }; }; };
}
void test_trmv (void) {const double flteps = 1e-4, dbleps = 1e-6;
  { int order = 102; int trans = 111; int uplo = 121; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.429 }; double X[] = { -0.899 }; int incX = -1; double x_expected[] = { 0.385671 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 834)"); } }; };

  { int order = 102; int trans = 111; int uplo = 121; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.429 }; double X[] = { -0.899 }; int incX = -1; double x_expected[] = { -0.899 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 835)"); } }; };

  { int order = 102; int trans = 111; int uplo = 122; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.429 }; double X[] = { -0.899 }; int incX = -1; double x_expected[] = { 0.385671 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 836)"); } }; };

  { int order = 102; int trans = 111; int uplo = 122; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.429 }; double X[] = { -0.899 }; int incX = -1; double x_expected[] = { -0.899 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 837)"); } }; };

  { int order = 102; int trans = 112; int uplo = 121; int diag = 131; int N = 1; int lda = 1; double A[] = { 0.842 }; double X[] = { 0.192 }; int incX = -1; double x_expected[] = { 0.161664 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 842)"); } }; };

  { int order = 102; int trans = 112; int uplo = 121; int diag = 132; int N = 1; int lda = 1; double A[] = { 0.842 }; double X[] = { 0.192 }; int incX = -1; double x_expected[] = { 0.192 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 843)"); } }; };

  { int order = 102; int trans = 112; int uplo = 122; int diag = 131; int N = 1; int lda = 1; double A[] = { 0.842 }; double X[] = { 0.192 }; int incX = -1; double x_expected[] = { 0.161664 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 844)"); } }; };

  { int order = 102; int trans = 112; int uplo = 122; int diag = 132; int N = 1; int lda = 1; double A[] = { 0.842 }; double X[] = { 0.192 }; int incX = -1; double x_expected[] = { 0.192 };
   cblas_dtrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[i], x_expected[i], dbleps, "dtrmv(case 845)"); } }; };

  { int order = 102; int trans = 111; int uplo = 121; int diag = 131; int N = 1; int lda = 1; double A[] = { 0.693, -0.22 }; double X[] = { -0.101, 0.889 }; int incX = -1; double x_expected[] = { 0.125587, 0.638297 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 874) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 874) imag"); }; }; };

  { int order = 102; int trans = 111; int uplo = 121; int diag = 132; int N = 1; int lda = 1; double A[] = { 0.693, -0.22 }; double X[] = { -0.101, 0.889 }; int incX = -1; double x_expected[] = { -0.101, 0.889 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 875) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 875) imag"); }; }; };

  { int order = 102; int trans = 111; int uplo = 122; int diag = 131; int N = 1; int lda = 1; double A[] = { 0.693, -0.22 }; double X[] = { -0.101, 0.889 }; int incX = -1; double x_expected[] = { 0.125587, 0.638297 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 876) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 876) imag"); }; }; };

  { int order = 102; int trans = 111; int uplo = 122; int diag = 132; int N = 1; int lda = 1; double A[] = { 0.693, -0.22 }; double X[] = { -0.101, 0.889 }; int incX = -1; double x_expected[] = { -0.101, 0.889 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 877) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 877) imag"); }; }; };

  { int order = 102; int trans = 112; int uplo = 121; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.216, -0.623 }; double X[] = { 0.048, 0.293 }; int incX = -1; double x_expected[] = { 0.172171, -0.093192 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 882) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 882) imag"); }; }; };

  { int order = 102; int trans = 112; int uplo = 121; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.216, -0.623 }; double X[] = { 0.048, 0.293 }; int incX = -1; double x_expected[] = { 0.048, 0.293 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 883) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 883) imag"); }; }; };

  { int order = 102; int trans = 112; int uplo = 122; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.216, -0.623 }; double X[] = { 0.048, 0.293 }; int incX = -1; double x_expected[] = { 0.172171, -0.093192 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 884) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 884) imag"); }; }; };

  { int order = 102; int trans = 112; int uplo = 122; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.216, -0.623 }; double X[] = { 0.048, 0.293 }; int incX = -1; double x_expected[] = { 0.048, 0.293 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 885) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 885) imag"); }; }; };

  { int order = 102; int trans = 113; int uplo = 121; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.345, -0.851 }; double X[] = { -0.708, 0.298 }; int incX = -1; double x_expected[] = { -0.009338, -0.705318 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 890) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 890) imag"); }; }; };

  { int order = 102; int trans = 113; int uplo = 121; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.345, -0.851 }; double X[] = { -0.708, 0.298 }; int incX = -1; double x_expected[] = { -0.708, 0.298 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 891) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 891) imag"); }; }; };

  { int order = 102; int trans = 113; int uplo = 122; int diag = 131; int N = 1; int lda = 1; double A[] = { -0.345, -0.851 }; double X[] = { -0.708, 0.298 }; int incX = -1; double x_expected[] = { -0.009338, -0.705318 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 892) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 892) imag"); }; }; };

  { int order = 102; int trans = 113; int uplo = 122; int diag = 132; int N = 1; int lda = 1; double A[] = { -0.345, -0.851 }; double X[] = { -0.708, 0.298 }; int incX = -1; double x_expected[] = { -0.708, 0.298 };
   cblas_ztrmv(order, uplo, trans, diag, N, A, lda, X, incX); { int i; for (i = 0; i < 1; i++) { gsl_test_rel(X[2*i], x_expected[2*i], dbleps, "ztrmv(case 893) real"); gsl_test_rel(X[2*i+1], x_expected[2*i+1], dbleps, "ztrmv(case 893) imag"); }; }; };
}

void gsl_test_rel(double result, double expected, double relative_error, const char *t) {
 int status;
 if (isnan(result) || isnan(expected)) { status = isnan(result) != isnan(expected); }
 else if (isinf(result) || isinf(expected)) { status = isinf(result) != isinf(expected); }
 else if ((expected > 0 && expected < DBL_MIN) || (expected < 0 && expected > -(DBL_MIN))) { status = -1; }
 else if (expected != 0 ) { status = (fabs(result-expected)/fabs(expected) > relative_error) ; }
 else { status = (fabs(result) > relative_error) ; }
 if(status){printf("%s\n",t);exit(1);}}

int main(){ 
 test_copy(); test_scal(); test_gemv(); test_gemm(); 
 test_ger(); test_trmv(); 
 printf("ok\n"); }
