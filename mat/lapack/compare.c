#define int32_t int
#define int64_t long long int
int32_t _FortranACharacterCompareScalar1(
    const char *lhs,
    const char *rhs,
    int64_t lhs_len,
    int64_t rhs_len)
{
    int64_t n = lhs_len < rhs_len ? lhs_len : rhs_len;

    for (int64_t i = 0; i < n; ++i) {
        unsigned char a = (unsigned char)lhs[i];
        unsigned char b = (unsigned char)rhs[i];
        if (a != b)
            return a < b ? -1 : 1;
    }

    if (lhs_len > rhs_len) {
        for (int64_t i = n; i < lhs_len; ++i) {
            unsigned char a = (unsigned char)lhs[i];
            if (a != (unsigned char)' ')
                return a < (unsigned char)' ' ? -1 : 1;
        }
    } else if (rhs_len > lhs_len) {
        for (int64_t i = n; i < rhs_len; ++i) {
            unsigned char b = (unsigned char)rhs[i];
            if ((unsigned char)' ' != b)
                return (unsigned char)' ' < b ? -1 : 1;
        }
    }

    return 0;
}

