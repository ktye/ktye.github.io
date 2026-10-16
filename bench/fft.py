import sys, numpy, scipy

def rng():
    global state
    state = 0xffffffff & (1103515245 * state + 12345)
    return state >> 16

def nrng(n):
    global state
    state=n
    return [rng()for x in range(n)]

N=int((sys.argv+[16])[1])
input=[i/2**15-1 for i in nrng(N)]

# Parameters
sampling_rate = N # Hz (Number of samples per second)

# 2. Compute the FFT
# The raw FFT contains complex numbers and is symmetric (two-sided)
fft_raw = scipy.fft.fft(input)

# 3. Calculate the true physical frequencies
# fftfreq generates the correct frequency bins based on sample count and rate
frequencies = scipy.fft.fftfreq(N, 1 / sampling_rate)

# 4. Clean up the spectrum for real-world visualization
# Since a real signal's FFT is symmetrical, we only look at the positive half
half_N = N // 2
positive_frequencies = frequencies[:half_N]

# Take the absolute value to get the magnitude, and normalize by N
amplitude = numpy.abs(fft_raw[:half_N]) / N
# Multiply by 2 to account for the dropped negative frequencies
amplitude[1:] = amplitude[1:] * 2

a=amplitude.argsort()[::-1][:10]
[print(f'{x[0]}\t{x[1]:.9f}')for x in list(zip(positive_frequencies[a], amplitude[a]))]
