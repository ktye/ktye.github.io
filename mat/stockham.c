#include<math.h>
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
void fft_stockham(double *a, size_t n);
int main(int n,char**a){
 double *x=malloc(2*8*8);
 for(int i=0;i<8;i++){x[2*i]=(double)(1+i);x[2*i+1]=0;}
 fft_stockham(x,8);
 for(int i=0;i<8;i++)printf("%g\n",hypot(x[2*i],x[2*i+1]));
}
void fft_stockham(double *a, size_t n) {
    double *scratch = malloc(2 * n * sizeof(*scratch));
    double *src = a;
    double *dst = scratch;
    size_t r = n / 2;
    size_t l = 1;
    const double pi = acos(-1.0);

    while (r != 0) {
        double angle = -pi / (double)l;
        double step_re = cos(angle);
        double step_im = sin(angle);

        /* Carry w_j across groups; keep it fixed within each k loop. */
        double w_re = 1.0;
        double w_im = 0.0;

        for (size_t j = 0; j < l; ++j) {
            size_t jrs = j * (2 * r);
            size_t m = jrs / 2;

            for (size_t k = jrs; k < jrs + r; ++k, ++m) {
                double ar = src[2 * k];
                double ai = src[2 * k + 1];
                double br = src[2 * (k + r)];
                double bi = src[2 * (k + r) + 1];

                double tr = w_re * br - w_im * bi;
                double ti = w_re * bi + w_im * br;

                dst[2 * m]              = ar + tr;
                dst[2 * m + 1]          = ai + ti;
                dst[2 * (m + n / 2)]    = ar - tr;
                dst[2 * (m + n / 2) + 1] = ai - ti;
            }

            /* Advance from w_j to w_(j+1), once per group. */
            double next_re = w_re * step_re - w_im * step_im;
            w_im = w_re * step_im + w_im * step_re;
            w_re = next_re;
        }
        double *swap = src;
        src = dst;
        dst = swap;

        r /= 2;
        l *= 2;
    }
    if (src != a) memcpy(a, src, 2 * n * sizeof(*a));
    free(scratch);
}

/*
void rfft(double *x, size_t n) {
    if (x == NULL || n == 0 || (n & (n - 1)) != 0) return;
    if (n == 1) return;
    if (n > SIZE_MAX / sizeof(double)) return;

    size_t m = n / 2;
    double *a = malloc(n * sizeof(*a));
    if (a == NULL) return;

    for (size_t j = 0; j < m; ++j) {
        a[2 * j]     = x[2 * j];
        a[2 * j + 1] = x[2 * j + 1];
    }

    fft_stockham(a, m);

    // DC and Nyquist bins come from the packed FFT's bin zero. 
    x[0] = a[0] + a[1];
    //x[1] = a[0] - a[1]; //nyquist
    x[1] = 0.0;


    for (size_t k = 1; k < m; ++k) {
        size_t km = m - k;

        double ar = a[2 * k];
        double ai = a[2 * k + 1];

        // B = conjugate(a[m-k]). 
        double br = a[2 * km];
        double bi = -a[2 * km + 1];

        double dr = ar - br;
        double di = ai - bi;

        double theta = -2.0 * M_PI * (double)k / (double)n;
        double wr = cos(theta);
        double wi = sin(theta);

        // t = W_n^k * (A - B). 
        double tr = wr * dr - wi * di;
        double ti = wr * di + wi * dr;

        x[2 * k]     = 0.5 * (ar + br + ti);
        x[2 * k + 1] = 0.5 * (ai + bi - tr);
    }
    free(a);
}
*/
