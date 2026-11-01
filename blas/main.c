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
void test_trmm (void) { const double flteps = 1e-4, dbleps = 1e-6;
  { int order = 102; int side = 141; int uplo = 121; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.844, -0.832, 0.179, -0.775 }; int lda = 2; double B[] = { -0.415, -0.547, -0.023, 0.42, 0.917, 0.485 }; int ldb = 2; double B_expected[] = { 0.1344519, -0.1271775, -0.0167304, 0.09765, -0.2582289, 0.1127625 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1698)"); } }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.239, 0.34, 0.964, -0.575 }; int lda = 2; double B[] = { 0.762, -0.038, -0.8, 0.626, -0.701, 0.639 }; int ldb = 2; double B_expected[] = { -0.2176104, 0.0114, 0.0589608, -0.1878, 0.0255012, -0.1917 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1699)"); } }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.785, -0.0, -0.592, -0.661 }; int lda = 2; double B[] = { -0.215, 0.953, 0.527, -0.418, -0.675, 0.283 }; int ldb = 2; double B_expected[] = { 0.0506325, 0.1889799, -0.1241085, -0.0828894, 0.1589625, 0.0561189 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1700)"); } }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha = -0.3; double A[] = { -0.423, -0.807, -0.683, -0.225 }; int lda = 2; double B[] = { 0.149, -0.129, 0.149, -0.234, 0.275, 0.658 }; int ldb = 2; double B_expected[] = { -0.0447, 0.0747729, -0.0447, 0.1062729, -0.0825, -0.1308225 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1701)"); } }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.256, 0.554, 0.342, 0.318, -0.824, -0.119, -0.399, -0.653, -0.83 }; int lda = 3; double B[] = { -0.577, 0.861, -0.439, -0.916, 0.452, -0.168 }; int ldb = 2; double B_expected[] = { 0.0443136, -0.0661248, -0.053475, -0.3085746, -0.042519, -0.1182147 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1706)"); } }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.837, -0.03, 0.552, -0.43, 0.841, 0.035, 0.7, 0.637, 0.095 }; int lda = 3; double B[] = { -0.82, -0.362, -0.252, -0.062, -0.942, -0.299 }; int ldb = 2; double B_expected[] = { 0.246, 0.1086, -0.03018, -0.028098, 0.5029572, 0.1775682 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1707)"); } }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha = -0.3; double A[] = { -0.074, 0.49, 0.802, -0.454, 0.626, 0.123, -0.959, 0.971, 0.75 }; int lda = 3; double B[] = { -0.545, -0.107, 0.096, 0.183, 0.185, -0.218 }; int ldb = 2; double B_expected[] = { -0.070722, 0.0231744, -0.0248553, -0.0263232, -0.041625, 0.04905 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1708)"); } }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha = -0.3; double A[] = { 0.048, 0.148, 0.834, -0.98, -0.009, -0.727, 0.241, 0.276, 0.518 }; int lda = 3; double B[] = { -0.664, -0.136, -0.793, -0.742, 0.126, -0.131 }; int ldb = 2; double B_expected[] = { 0.202884, 0.106521, 0.2653806, 0.1940289, -0.0378, 0.0393 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1709)"); } }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha = 0.1; double A[] = { -0.603, -0.617, 0.402, -0.918 }; int lda = 2; double B[] = { 0.051, -0.096, 0.476, 0.377, 0.931, 0.291 }; int ldb = 2; double B_expected[] = { -0.0030753, 0.010863, -0.0287028, -0.0154734, -0.0561393, 0.0107124 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1714)"); } }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha = 0.1; double A[] = { 0.67, -0.475, 0.032, -0.036 }; int lda = 2; double B[] = { -0.19, 0.829, 0.942, 0.885, 0.087, 0.321 }; int ldb = 2; double B_expected[] = { -0.019, 0.082292, 0.0942, 0.0915144, 0.0087, 0.0323784 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1715)"); } }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha = 0.1; double A[] = { -0.64, 0.595, 0.642, -0.921 }; int lda = 2; double B[] = { -0.278, -0.83, 0.922, -0.701, -0.598, -0.232 }; int ldb = 2; double B_expected[] = { -0.031593, 0.076443, -0.1007175, 0.0645621, 0.024468, 0.0213672 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1716)"); } }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha = 0.1; double A[] = { 0.842, 0.625, 0.967, 0.341 }; int lda = 2; double B[] = { -0.679, -0.846, -0.921, 0.672, 0.292, 0.752 }; int ldb = 2; double B_expected[] = { -0.120775, -0.0846, -0.0501, 0.0672, 0.0762, 0.0752 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1717)"); } }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha = 0.1; double A[] = { -0.023, -0.872, -0.313, -0.698, 0.06, -0.838, -0.455, -0.715, -0.257 }; int lda = 3; double B[] = { -0.17, -0.184, -0.243, 0.907, -0.423, 0.665 }; int ldb = 2; double B_expected[] = { 0.0365989, -0.0931429, 0.0287865, -0.0421055, 0.0108711, -0.0170905 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1722)"); } }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha = 0.1; double A[] = { 0.792, 0.338, -0.155, 0.009, 0.485, -0.633, -0.08, -0.579, 0.223 }; int lda = 3; double B[] = { -0.19, 0.201, 0.685, 0.663, 0.302, -0.506 }; int ldb = 2; double B_expected[] = { -0.0207995, 0.0247447, 0.0510142, 0.0955974, 0.0302, -0.0506 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1723)"); } }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha = 0.1; double A[] = { -0.076, 0.103, -0.021, -0.866, 0.777, 0.723, 0.378, 0.98, -0.32 }; int lda = 3; double B[] = { 0.739, -0.996, 0.182, 0.626, 0.291, -0.267 }; int ldb = 2; double B_expected[] = { -0.0056164, 0.0075696, 0.0217531, 0.0383814, 0.0022947, 0.0558954 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1724)"); } }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha = 0.1; double A[] = { 0.469, 0.822, -0.619, 0.953, -0.706, 0.318, 0.559, -0.68, -0.208 }; int lda = 3; double B[] = { 0.362, 0.719, -0.661, -0.504, 0.595, -0.771 }; int ldb = 2; double B_expected[] = { 0.0362, 0.0719, -0.0363436, 0.0087018, 0.0160724, -0.1376333 };
   cblas_dtrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[i], B_expected[i], dbleps, "dtrmm(case 1725)"); } }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { 0.57, 0.987, 0.116, -0.691, -0.603, -0.778, 0.14, -0.073 }; int lda = 2; double B[] = { 0.421, -0.055, 0.92, 0.664, 0.835, 0.861, -0.392, -0.897, -0.346, 0.516, -0.068, -0.156 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1778) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1778) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { -0.754, 0.904, 0.089, 0.206, 0.974, -0.946, -0.55, -0.675 }; int lda = 2; double B[] = { -0.42, -0.372, 0.628, 0.148, 0.344, -0.924, -0.802, -0.307, 0.427, 0.116, 0.916, -0.384 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1779) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1779) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { 0.152, -0.898, -0.024, 0.719, 0.992, -0.841, 0.901, 0.202 }; int lda = 2; double B[] = { 0.243, -0.811, 0.68, 0.118, 0.946, -0.632, 0.729, -0.942, 0.308, 0.507, -0.838, 0.594 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1780) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1780) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { 0.119, -0.849, 0.425, -0.273, -0.918, 0.196, -0.871, -0.39 }; int lda = 2; double B[] = { 0.709, 0.33, -0.207, 0.012, -0.017, 0.787, -0.385, 0.739, -0.874, 0.188, -0.039, 0.692 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1781) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1781) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { 0.616, 0.669, 0.323, -0.238, 0.153, 0.891, -0.4, 0.996, 0.689, -0.736, -0.259, -0.707, 0.993, 0.13, -0.829, -0.564, -0.09, 0.118 }; int lda = 3; double B[] = { 0.113, 0.724, 0.148, -0.309, -0.833, -0.791, 0.354, -0.528, 0.313, 0.421, 0.28, 0.371 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1786) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1786) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { 0.957, -0.713, 0.976, 0.183, -0.145, -0.858, -0.497, -0.605, -0.742, 0.686, 0.272, 0.83, -0.606, -0.099, -0.807, 0.767, 0.254, 0.244 }; int lda = 3; double B[] = { -0.124, -0.19, 0.665, -0.74, 0.505, -0.194, 0.588, -0.421, -0.727, 0.308, -0.802, -0.278 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1787) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1787) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 111; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { -0.649, 0.856, 0.969, 0.382, 0.963, 0.567, 0.599, 0.018, -0.924, 0.578, -0.531, -0.091, -0.454, -0.834, 0.97, -0.126, -0.859, 0.879 }; int lda = 3; double B[] = { 0.35, 0.824, -0.084, 0.662, -0.752, 0.872, 0.129, 0.969, -0.539, 0.907, 0.316, -0.675 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1788) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1788) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 111; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0}; double A[] = { -0.315, -0.459, 0.327, -0.132, -0.283, 0.173, -0.356, -0.427, 0.508, 0.347, -0.804, -0.849, 0.779, 0.673, 0.019, -0.869, 0.999, -0.338 }; int lda = 3; double B[] = { 0.678, -0.171, 0.136, -0.268, -0.578, -0.431, 0.978, -0.749, 0.333, -0.757, 0.658, 0.456 }; int ldb = 2; double B_expected[] = { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1789) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1789) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { -0.57, -0.805, -0.66, -0.421, 0.643, -0.534, -0.988, -0.581 }; int lda = 2; double B[] = { -0.279, -0.253, 0.976, -0.051, 0.294, 0.451, 0.187, -0.177, 0.31, -0.714, -0.104, -0.177 }; int ldb = 2; double B_expected[] = { -0.0368805, -0.0044635, 0.0530361, -0.1308418, 0.049374, 0.0195475, -0.0199226, 0.0142283, -0.015743, -0.075147, 0.0389342, -0.0182031 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1794) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1794) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { -0.594, 0.273, 0.457, 0.295, 0.434, -0.227, -0.662, 0.623 }; int lda = 2; double B[] = { -0.582, -0.581, 0.259, -0.833, -0.864, -0.284, 0.965, -0.459, -0.539, -0.551, -0.969, 0.09 }; int ldb = 2; double B_expected[] = { 0.0581, -0.0582, 0.095304, -0.0125475, 0.0284, -0.0864, 0.0386128, 0.0525556, 0.0551, -0.0539, 0.0026781, -0.1328003 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1795) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1795) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { 0.398, 0.323, 0.31, 0.718, 0.181, 0.665, 0.402, 0.317 }; int lda = 2; double B[] = { 0.812, -0.244, -0.415, 0.602, 0.901, -0.017, 0.786, -0.119, 0.448, -0.75, 0.851, 0.172 }; int ldb = 2; double B_expected[] = { -0.0053814, -0.0158898, -0.0110449, -0.0357664, -0.0811715, 0.0693191, -0.0201324, 0.0353695, -0.0510542, 0.0560868, -0.0338911, 0.0287578 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1796) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1796) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { 0.265, -0.578, 0.218, -0.093, -0.172, 0.414, 0.448, 0.696 }; int lda = 2; double B[] = { 0.02, -0.254, 0.152, 0.304, 0.289, 0.247, 0.705, 0.419, -0.735, 0.788, -0.942, -0.71 }; int ldb = 2; double B_expected[] = { 0.0201864, 0.0081408, -0.0304, 0.0152, -0.0272777, 0.0481657, -0.0419, 0.0705, -0.0720826, -0.1006386, 0.071, -0.0942 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1797) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1797) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { 0.993, 0.709, 0.225, -0.704, -0.396, 0.656, -0.588, -0.085, -0.024, 0.264, -0.988, -0.67, 0.665, -0.165, -0.778, -0.43, 0.71, -0.35 }; int lda = 3; double B[] = { 0.321, 0.614, 0.058, 0.983, 0.153, -0.647, 0.342, -0.518, -0.071, -0.533, -0.424, 0.283 }; int ldb = 2; double B_expected[] = { -0.0861992, -0.0396692, -0.155091, -0.1119744, -0.0501124, -0.0006816, -0.0064866, 0.0580106, 0.035358, -0.023696, -0.034933, -0.020199 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1802) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1802) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { 0.034, -0.02, -0.401, -0.892, 0.329, -0.799, -0.018, 0.564, 0.095, 0.965, -0.105, 0.756, -0.583, -0.706, -0.436, -0.145, 0.921, 0.416 }; int lda = 3; double B[] = { 0.972, 0.157, -0.029, 0.674, 0.914, 0.434, 0.132, -0.116, -0.907, 0.316, -0.423, 0.321 }; int ldb = 2; double B_expected[] = { -0.1120798, 0.1462649, -0.0862031, 0.0507283, -0.0427739, 0.1355272, 0.0194621, 0.0362973, -0.0316, -0.0907, -0.0321, -0.0423 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1803) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1803) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 112; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { -0.195, -0.36, 0.834, -0.505, -0.87, -0.787, 0.997, 0.965, -0.046, -0.591, 0.082, 0.552, 0.414, -0.013, -0.048, -0.766, 0.728, 0.088 }; int lda = 3; double B[] = { -0.916, -0.162, -0.863, 0.67, -0.079, -0.27, -0.191, 0.995, 0.981, -0.25, -0.149, 0.248 }; int ldb = 2; double B_expected[] = { -0.036135, 0.01203, -0.018003, 0.0409485, -0.0386581, -0.100169, -0.1061706, 0.0215439, -0.0700412, 0.1548156, -0.0239871, 0.0582902 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1804) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1804) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 112; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 0.1}; double A[] = { 0.553, -0.63, -0.079, 0.351, 0.865, -0.062, 0.165, -0.634, -0.513, 0.216, -0.521, 0.349, 0.54, 0.545, -0.719, -0.306, 0.501, 0.757 }; int lda = 3; double B[] = { -0.311, 0.088, -0.328, 0.977, 0.659, -0.06, -0.276, 0.872, -0.734, -0.01, -0.668, -0.327 }; int ldb = 2; double B_expected[] = { -0.0088, -0.0311, -0.0977, -0.0328, 0.0176113, 0.0652681, -0.0679689, -0.0593015, -0.0346653, -0.1319958, 0.0012195, -0.1051678 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1805) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1805) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 113; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.881, 0.555, 0.774, 0.148, -0.915, 0.336, 0.103, 0.381 }; int lda = 2; double B[] = { 0.163, 0.963, -0.017, 0.921, 0.809, 0.846, 0.905, -0.43, 0.894, -0.371, -0.988, -0.487 }; int ldb = 2; double B_expected[] = { -0.757938, 0.678068, 0.834573, 0.523573, -0.296331, 1.182259, 1.435009, -0.526594, 0.823021, 0.581709, -0.365348, -1.229977 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1810) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1810) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 121; int trans = 113; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.719, -0.513, 0.169, -0.524, 0.352, 0.823, -0.741, -0.355 }; int lda = 2; double B[] = { 0.717, 0.052, -0.777, 0.277, -0.962, 0.894, 0.905, -0.216, -0.707, 0.016, 0.481, 0.935 }; int ldb = 2; double B_expected[] = { -0.052, 0.717, 0.294787, -0.48182, -0.894, -0.962, -0.890414, 1.302138, -0.016, -0.707, -1.522493, 0.245304 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1811) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1811) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 113; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.501, -0.136, -0.502, 0.669, -0.498, -0.4, -0.518, 0.833 }; int lda = 2; double B[] = { -0.385, 0.88, 0.726, 0.911, 0.839, 0.573, -0.881, -0.517, -0.861, -0.278, 0.941, 0.822 }; int ldb = 2; double B_expected[] = { 0.554496, -0.067558, 1.076656, 0.382795, -1.2501, 0.4388, -1.001679, 0.025697, 1.298547, -0.316017, 1.209649, 0.197288 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1812) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1812) imag"); }; }; };

  { int order = 102; int side = 141; int uplo = 122; int trans = 113; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.049, 0.641, -0.9, 0.246, -0.734, -0.686, 0.76, -0.869 }; int lda = 2; double B[] = { -0.37, 0.206, -0.731, -0.573, 0.638, -0.417, -0.29, -0.719, 0.107, -0.333, 0.556, 0.124 }; int ldb = 2; double B_expected[] = { -0.901526, 0.146942, 0.573, -0.731, -0.30144, 0.722126, 0.719, -0.29, 0.581376, -0.362896, -0.124, 0.556 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1813) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1813) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 113; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.501, -0.632, 0.663, 0.151, -0.523, -0.71, -0.811, 0.8, -0.06, 0.994, -0.962, 0.827, -0.543, 0.719, -0.264, -0.942, 0.365, 0.051 }; int lda = 3; double B[] = { -0.974, 0.094, -0.533, 0.633, -0.982, -0.383, -0.297, 0.734, -0.092, -0.15, 0.215, -0.232 }; int ldb = 2; double B_expected[] = { -0.675337, -0.115274, 0.406006, -0.122575, -0.952024, -0.156194, -0.514956, 0.9092, 0.050058, -0.04123, 0.095645, 0.066643 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1818) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1818) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 121; int trans = 113; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { 0.669, 0.332, -0.661, 0.611, 0.279, -0.133, -0.033, 0.06, 0.788, -0.407, -0.644, 0.958, 0.247, -0.161, 0.125, -0.184, 0.041, -0.045 }; int lda = 3; double B[] = { -0.603, 0.88, 0.668, -0.152, 0.082, 0.033, 0.733, -0.557, 0.722, 0.024, -0.754, 0.458 }; int ldb = 2; double B_expected[] = { -0.996161, -0.429256, 0.185867, 0.350415, -0.168848, 0.167834, 0.638486, 0.554478, -0.024, 0.722, -0.458, -0.754 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1819) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1819) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 113; int diag = 131; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { -0.91, 0.05, -0.944, 0.748, -0.712, 0.619, -0.28, -0.906, 0.314, 0.943, -0.719, -0.983, 0.474, -0.115, -0.859, 0.837, 0.364, -0.164 }; int lda = 3; double B[] = { -0.278, -0.34, 0.584, 0.43, -0.794, -0.465, -0.65, 0.461, 0.24, 0.003, 0.948, -0.778 }; int ldb = 2; double B_expected[] = { -0.3233, 0.23598, 0.4205, -0.50994, -1.131636, -0.679699, 0.085048, 0.000967, -0.008447, 1.102325, 1.765785, 0.337213 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1820) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1820) imag"); }; }; };

  { int order = 102; int side = 142; int uplo = 122; int trans = 113; int diag = 132; int M = 2; int N = 3; double alpha[2] = {0, 1}; double A[] = { -0.39, -0.916, 0.257, -0.082, -0.802, 0.215, -0.155, 0.911, -0.099, 0.41, 0.057, 0.105, 0.94, -0.17, -0.714, -0.861, 0.292, -0.231 }; int lda = 3; double B[] = { -0.453, -0.542, 0.135, 0.518, -0.199, 0.776, 0.784, -0.28, -0.499, -0.377, -0.795, -0.965 }; int ldb = 2; double B_expected[] = { 0.542, -0.453, -0.518, 0.135, -0.59956, -0.270977, 0.135804, 0.776219, -0.220206, -0.182087, 1.507741, -0.776612 };
   cblas_ztrmm(order, side, uplo, trans, diag, M, N, alpha, A, lda, B, ldb); { int i; for (i = 0; i < 6; i++) { gsl_test_rel(B[2*i], B_expected[2*i], dbleps, "ztrmm(case 1821) real"); gsl_test_rel(B[2*i+1], B_expected[2*i+1], dbleps, "ztrmm(case 1821) imag"); }; }; };
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
 test_ger();  test_trmv(); test_trmm();
 printf("ok\n"); }
