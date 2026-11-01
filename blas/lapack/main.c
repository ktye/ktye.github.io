
#define BLAS_IMPL
#include"semicolon_cblas.h"

#include <complex.h>
#include <stdio.h>
#include <stdlib.h>

void zgeqr(const int m, const int n, void* restrict A, const int lda, void* restrict T, const int tsize, void* restrict work, const int lwork, int* info);
void printA(double*A){
	printf("A=\n");
	for(int i=0;i<2;i++){
		for(int j=0;j<3;j+=2)printf("(%g,%g)",A[6*i+j],A[6*i+j+1]);printf("\n");
	}
}
int main(void) {
    int m = 3, n = 2, lda = 3, info;

    /* Column-major matrix:
       [ 1+i   2   ]
       [ 3     4-i ]
       [ 5     6   ] */
    double complex A[6] = {
        1.0 + I, 3.0, 5.0,
        2.0,     4.0 - I, 6.0
    };

    /* Query required sizes. */
    double complex t_query[1], work_query[1];
    int tsize = -1, lwork = -1;

    zgeqr(m, n, A, lda, t_query, tsize, work_query, lwork, &info);

    if (info != 0) {
        fprintf(stderr, "ZGEQR workspace query failed: info=%d\n", info);
        return 1;
    }

    tsize = (int)creal(t_query[0]);
    lwork = (int)creal(work_query[0]);
    printf("tsize %d, lwork %d\n", tsize, lwork);

    double complex *T = malloc((size_t)tsize * sizeof(*T));
    double complex *work = malloc((size_t)lwork * sizeof(*work));
    if (!T || !work) {
        fprintf(stderr, "Could not allocate workspace\n");
        free(T);
        free(work);
        return 1;
    }

    zgeqr(m, n, A, lda, T, tsize, work, lwork, &info);
    if (info != 0) {
        fprintf(stderr, "ZGEQR failed: info=%d\n", info);
        free(T);
        free(work);
        return 1;
    }

    puts("R (upper trapezoid stored in A):");
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
//            if (i <= j)
                printf("(%g,%g) ", creal(A[i + j*lda]), cimag(A[i + j*lda]));
//            else
                printf("          ");
        }
        putchar('\n');
    }

    printf("tsize: %d\n",tsize);
    for(int i=0;i<tsize;i++)printf("T[%d]=%g\n",i,T[i]);

    free(T);
    free(work);
    return 0;
}



