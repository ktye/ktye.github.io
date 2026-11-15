#include <stddef.h>

void *memmove(void *dst, const void *src, size_t n)
{
    unsigned char *d = (unsigned char *)dst;
    const unsigned char *s = (const unsigned char *)src;

    if (d == s || n == 0)
        return dst;

    if (d < s) {
        for (size_t i = 0; i < n; ++i)
            d[i] = s[i];
    } else {
        for (size_t i = n; i > 0; --i)
            d[i - 1] = s[i - 1];
    }

    return dst;
}


