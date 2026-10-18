// gcc -O3 fft2.c -lm -o fft2
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define TOP_K 10

typedef struct {
    int bin;
    double amplitude;
} Peak;

static uint32_t state;

static uint32_t rng(void)
{
    state = UINT32_C(1103515245) * state + UINT32_C(12345);
    return state >> 16;
}

/* A min-heap: the smallest retained peak is at heap[0]. */
static int smaller(Peak a, Peak b)
{
    return a.amplitude < b.amplitude ||
           (a.amplitude == b.amplitude && a.bin > b.bin);
}

static void sift_up(Peak *heap, int i)
{
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (!smaller(heap[i], heap[parent]))
            break;

        Peak tmp = heap[i];
        heap[i] = heap[parent];
        heap[parent] = tmp;
        i = parent;
    }
}

static void sift_down(Peak *heap, int size, int i)
{
    for (;;) {
        int left = 2 * i + 1;
        int right = left + 1;
        int smallest = i;

        if (left < size && smaller(heap[left], heap[smallest]))
            smallest = left;
        if (right < size && smaller(heap[right], heap[smallest]))
            smallest = right;
        if (smallest == i)
            break;

        Peak tmp = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = tmp;
        i = smallest;
    }
}

static int larger(Peak a, Peak b)
{
    return a.amplitude > b.amplitude ||
           (a.amplitude == b.amplitude && a.bin < b.bin);
}

static void sort_descending(Peak *peaks, int count)
{
    /* Insertion sort is efficient for at most 10 items. */
    for (int i = 1; i < count; ++i) {
        Peak value = peaks[i];
        int j = i;
        while (j > 0 && larger(value, peaks[j - 1])) {
            peaks[j] = peaks[j - 1];
            --j;
        }
        peaks[j] = value;
    }
}

void fft(double *a, size_t n) {
    if (a == NULL || n == 0 || (n & (n - 1)) != 0) exit(1);
    if (n == 1) return;

    const double angle = -2.0 * M_PI / (double)n;

    double *even = calloc(8,n);
    double *odd  = calloc(8,n);

    /* Split input into even-indexed and odd-indexed complex values. */
    for (size_t k = 0; k < n / 2; ++k) {
        even[2 * k]     = a[4 * k];
        even[2 * k + 1] = a[4 * k + 1];
        odd[2 * k]      = a[4 * k + 2];
        odd[2 * k + 1]  = a[4 * k + 3];
    }

    fft(even, n / 2);
    fft(odd, n / 2);

    for (size_t k = 0; k < n / 2; ++k) {
     double theta = angle * (double)k;
     double wr = cos(theta);
     double wi = sin(theta);

     double or = odd[2 * k];
     double oi = odd[2 * k + 1];

     /* t = (wr + i*wi) * odd[k] */
     double tr = wr * or - wi * oi;
     double ti = wr * oi + wi * or;

     double er = even[2 * k];
     double ei = even[2 * k + 1];

     a[2 * k]         = er + tr;
     a[2 * k + 1]     = ei + ti;
     a[2 * (k + n/2)]     = er - tr;
     a[2 * (k + n/2) + 1] = ei - ti;
    }

    free(even);
    free(odd);
}


int main(int argc, char **argv) {
    char *end; long parsed_n = (argc > 1) ? strtol(argv[1], &end, 10) : 16;

    if (argc > 1 && (*end != '\0' || parsed_n <= 0 || parsed_n > 2147483647L)) { return 1; }

    int n = (int)parsed_n; int bins = n / 2;  /* Matches Python's fft_raw[:N // 2]. */

    //double *input = fftw_alloc_real((size_t)n);
    double *x=calloc(16,n);

    state = (uint32_t)n; for (int i = 0; i < n; ++i){x[2*i] = (double)rng() / 32768.0 - 1.0; x[2*i+1]=0.0;}

    fft(x,n);

    Peak heap[TOP_K];
    int count = 0;
    int limit = bins < TOP_K ? bins : TOP_K;

    for (int k = 0; k < bins; ++k) {
        double re = x[2*k];
        double im = x[2*k+1];
        double amplitude = (re * re + im * im) / ((double)n * n);
        if (k != 0) amplitude *= 4.0; /* Squaring the Python's factor-of-2 scale. */
        amplitude = sqrt(amplitude);

        Peak peak = { k, amplitude };
        if (count < limit) {
            heap[count] = peak;
            sift_up(heap, count);
            ++count;
        } else if (larger(peak, heap[0])) {
            heap[0] = peak;
            sift_down(heap, count, 0);
        }
    }

    sort_descending(heap, count);
    for (int i = 0; i < count; ++i) printf("%.1f\t%.9f\n", (double)heap[i].bin, heap[i].amplitude);

    return 0;
}

