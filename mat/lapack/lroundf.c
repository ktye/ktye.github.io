long lroundf(float x)
{
    return x < 0.0f ? (long)__builtin_ceilf(x - 0.5f)
                   : (long)__builtin_floorf(x + 0.5f);
}

