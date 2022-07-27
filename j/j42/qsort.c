#ifdef WASM

#include "j.h"

extern void *memcpy(void*,const void*,size_t);

void _swap(void* v1, void* v2, int size){
    char buffer[size];
    memcpy(buffer, v1, size);
    memcpy(v1, v2, size);
    memcpy(v2, buffer, size);
}
void _qsort(void* v, int size, int left, int right, int (*comp)(void*, void*)) {
    void *vt, *v3;
    int i, last, mid = (left + right) / 2;
    if (left >= right)
        return;
    void* vl = (char*)(v + (left * size));
    void* vr = (char*)(v + (mid * size));
    _swap(vl, vr, size);
    last = left;
    for (i = left + 1; i <= right; i++) {
        vt = (char*)(v + (i * size));
        if ((*comp)(vl, vt) > 0) {
            ++last;
            v3 = (char*)(v + (last * size));
            _swap(vt, v3, size);
        }
    }
    v3 = (char*)(v + (last * size));
    _swap(vl, v3, size);
    _qsort(v, size, left, last - 1, comp);
    _qsort(v, size, last + 1, right, comp);
}

void qsort(void *a, size_t nel, size_t width, int (*comp)(void*, void*)){
 _qsort(a, width, 0, nel-1, comp);
}
#endif
