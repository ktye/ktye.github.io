#include<stdio.h>
#define BLAS_IMPL
#include"cblas.h"
#include<stdlib.h>
#include<math.h>
#include<float.h>
void gsl_test_rel(double result, double expected, double relative_error, const char *t);
void test_gemm (void) { const double flteps = 1e-4, dbleps = 1e-6;

  { int order = 102; int transA = 111; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha = 0; double beta = 0; double A[] = { 0.571, 0.081, 0.109, 0.988 }; int lda = 1;
   double B[] = { -0.048, -0.753, -0.8, -0.89, -0.535, -0.017, -0.018, -0.544 }; int ldb = 4; double C[] = { -0.876, -0.792 }; int ldc = 1; double C_expected[] = { 0.0, 0.0 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1475)"); } };
  };

  { int order = 102; int transA = 111; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha = -0.3; double beta = 1; double A[] = { -0.795, 0.81, 0.388, 0.09 }; int lda = 1;
   double B[] = { -0.847, 0.031, -0.938, 0.09, -0.286, -0.478, -0.981, 0.881 }; int ldb = 2; double C[] = { -0.242, -0.02 };
   int ldc = 1; double C_expected[] = { -0.1562981, -0.0026243 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1477)"); } };
  };

  { int order = 102; int transA = 112; int transB = 111; int M = 1; int N = 2; int K = 4; 
   double alpha = -1; double beta = 0; double A[] = { -0.358, 0.224, -0.941, 0.513 }; int lda = 4;
   double B[] = { -0.201, -0.159, -0.586, -0.016, -0.324, 0.411, 0.115, -0.229 }; int ldb = 4; double C[] = { 0.558, 0.596 }; int ldc = 1; double C_expected[] = { -0.57956, 0.017636 };
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1479)"); } };
  };

  { int order = 102; int transA = 112; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha = -0.3; double beta = 1; double A[] = { -0.164, 0.522, 0.948, -0.624 }; int lda = 4; double B[] = { -0.142, 0.778, 0.359, 0.622, -0.637, -0.757, -0.282, -0.805 }; int ldb = 2;
   double C[] = { -0.09, 0.183 }; int ldc = 1; double C_expected[] = { -0.0248334, 0.1884672 }; 
   cblas_dgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[i], C_expected[i], dbleps, "dgemm(case 1481)"); } };
  };

  { int order = 102; int transA = 111; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {1, 0}; double beta[2] = {-1, 0}; double A[] = { 0.726, -0.438, -0.23, -0.054, -0.019, 0.902, -0.883, -0.235 }; int lda = 1; double B[] = { 0.159, -0.18, 0.386, -0.167, 0.971, -0.072, 0.87, -0.839, 0.474, 0.956, -0.235, 0.332, 0.826, -0.056, -0.941, 0.01 }; int ldb = 4;
   double C[] = { -0.799, 0.973, -0.549, -0.177 }; int ldc = 1; double C_expected[] = { -0.181084, 0.257841, 2.251901, 1.558195 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1501) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1501) imag"); }; };
  };

  { int order = 102; int transA = 111; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0.1}; double beta[2] = {1, 0}; double A[] = { 0.334, 0.192, -0.992, -0.168, 0.154, -0.75, -0.797, -0.76 }; int lda = 1;
   double B[] = { -0.82, 0.147, -0.237, 0.68, 0.317, 0.257, -0.406, -0.802, 0.058, 0.012, -0.832, 0.949, -0.263, -0.085, -0.064, 0.492 }; int ldb = 2;
   double C[] = { 0.079, -0.602, -0.392, 0.316 }; int ldc = 1; double C_expected[] = { 0.0980569, -0.6430449, -0.539207, 0.4226848 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1503) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1503) imag"); }; };
  };

  { int order = 102; int transA = 111; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0}; double beta[2] = {-1, 0}; double A[] = { -0.306, -0.709, -0.196, 0.285, 0.873, -0.802, 0.715, -0.179 }; int lda = 1;
   double B[] = { 0.028, 0.109, 0.87, -0.446, 0.735, 0.731, 0.021, -0.186, 0.541, 0.97, -0.333, 0.002, -0.089, -0.01, 0.331, 0.851 }; int ldb = 2;
   double C[] = { 0.902, -0.584, -0.695, -0.607 }; int ldc = 1; double C_expected[] = { -0.902, 0.584, 0.695, 0.607 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1505) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1505) imag"); }; };
  };


  { int order = 102; int transA = 112; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-1, 0}; double beta[2] = {1, 0}; double A[] = { 0.064, 0.371, -0.01, -0.262, 0.143, -0.081, 0.1, -0.062 }; int lda = 4;
   double B[] = { -0.749, 0.289, -0.239, -0.226, 0.284, 0.668, 0.305, 0.075, -0.36, 0.166, -0.416, 0.234, -0.267, 0.525, 0.116, -0.561 }; int ldb = 4; double C[] = { 0.671, 0.763, 0.444, -0.246 }; int ldc = 1;
   double C_expected[] = { 0.753107, 0.896395, 0.481996, -0.263126 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1507) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1507) imag"); }; };
  };

  { int order = 102; int transA = 112; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {1, 0}; double beta[2] = {-0.3, 0.1}; double A[] = { -0.698, -0.062, 0.023, 0.704, 0.443, -0.46, 0.541, 0.296 }; int lda = 4;
   double B[] = { 0.787, -0.199, 0.835, -0.276, -0.515, 0.467, -0.76, -0.483, 0.015, -0.394, -0.748, 0.02, 0.573, 0.3, -0.088, -0.238 }; int ldb = 2; double C[] = { 0.935, -0.655, -0.797, 0.071 };
   int ldc = 1; double C_expected[] = { -1.070679, 0.178755, -0.344714, -0.308137 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1509) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1509) imag"); }; };
  };

  { int order = 102; int transA = 112; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0.1}; double beta[2] = {-0.3, 0.1}; double A[] = { -0.855, -0.173, -0.679, 0.824, 0.469, 0.786, 0.757, -0.109 }; int lda = 4;
   double B[] = { 0.483, -0.888, -0.757, 0.551, -0.81, 0.23, -0.078, 0.725, -0.592, 0.394, 0.884, 0.802, -0.813, -0.016, -0.853, 0.783 }; int ldb = 2; double C[] = { 0.181, -0.368, -0.864, -0.784 }; int ldc = 1;
   double C_expected[] = { 0.1728438, 0.1183508, 0.2526999, 0.3004174 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1511) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1511) imag"); }; };
  };

  { int order = 102; int transA = 113; int transB = 111; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-1, 0}; double beta[2] = {-0.3, 0.1}; double A[] = { 0.669, 0.046, -0.094, 0.666, 0.23, 0.448, -0.795, -0.142 }; int lda = 4;
   double B[] = { 0.037, -0.154, -0.739, 0.905, 0.793, -0.53, -0.34, 0.428, 0.072, -0.263, -0.603, -0.905, 0.681, -0.083, -0.511, -0.337 }; int ldb = 4; double C[] = { 0.247, 0.575, -0.836, -0.883 };
   int ldc = 1; double C_expected[] = { -0.975939, 0.415528, 0.275533, 0.002716 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1513) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1513) imag"); }; };
  };

  { int order = 102; int transA = 113; int transB = 112; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {0, 0}; double beta[2] = {-1, 0}; double A[] = { -0.141, 0.275, 0.717, 0.775, -0.701, -0.689, -0.883, -0.077 }; int lda = 4;
   double B[] = { -0.526, -0.437, 0.133, -0.209, -0.83, 0.328, 0.916, -0.337, 0.762, -0.664, -0.566, 0.955, 0.168, 0.488, -0.172, -0.535 }; int ldb = 2; double C[] = { -0.88, 0.945, 0.416, 0.99 }; int ldc = 1; double C_expected[] = { 0.88, -0.945, -0.416, -0.99 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1515) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1515) imag"); }; };
  };

  { int order = 102; int transA = 113; int transB = 113; int M = 1; int N = 2; int K = 4;
   double alpha[2] = {-0.3, 0.1}; double beta[2] = {0, 0.1}; double A[] = { 0.575, -0.128, -0.702, 0.758, 0.383, -0.914, 0.157, 0.368 }; int lda = 4;
   double B[] = { 0.572, -0.841, 0.223, -0.334, -0.823, -0.84, 0.671, -0.871, 0.241, 0.927, -0.344, 0.281, -0.034, -0.104, 0.587, -0.329 }; int ldb = 2; double C[] = { -0.612, 0.167, 0.647, 0.447 }; int ldc = 1;
   double C_expected[] = { -0.7876717, 0.0341179, -0.0800018, 0.5717566 };
   cblas_zgemm(order, transA, transB, M, N, K, alpha, A, lda, B, ldb, beta, C, ldc); { int i; for (i = 0; i < 2; i++) { gsl_test_rel(C[2*i], C_expected[2*i], dbleps, "zgemm(case 1517) real"); gsl_test_rel(C[2*i+1], C_expected[2*i+1], dbleps, "zgemm(case 1517) imag"); }; }; 
  };
}

void gsl_test_rel(double result, double expected, double relative_error, const char *t) {
 int status;
 if (isnan(result) || isnan(expected)) { status = isnan(result) != isnan(expected); }
 else if (isinf(result) || isinf(expected)) { status = isinf(result) != isinf(expected); }
 else if ((expected > 0 && expected < DBL_MIN) || (expected < 0 && expected > -(DBL_MIN))) { status = -1; }
 else if (expected != 0 ) { status = (fabs(result-expected)/fabs(expected) > relative_error) ; }
 else { status = (fabs(result) > relative_error) ; }
 if(status){printf("%s\n",t);exit(1);}}

int main(){ test_gemm(); printf("ok\n"); }
