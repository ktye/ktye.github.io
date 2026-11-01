int lapack_get_geqr_mb(int m, int n) {
    if ((m * n <= 131072) || (m <= 8192)) {
        return m;
    }
    return 32768 / n;
}
int lapack_get_geqr_nb(int m, int n) {
    return 1;
}
