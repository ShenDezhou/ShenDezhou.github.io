---
layout: blog_detail
title: standard header
excerpt_separator: <!--more-->
---
# assert.h #
    assert
    Evaluate assertion (macro )
# ctype.h #
    isalnum
    Check if character is alphanumeric (function )
    isalpha
    Check if character is alphabetic (function )
    isblank 
    Check if character is blank (function )
    iscntrl
    Check if character is a control character (function )
    isdigit
    Check if character is decimal digit (function )
    isgraph
    Check if character has graphical representation (function )
    islower
    Check if character is lowercase letter (function )
    isprint
    Check if character is printable (function )
    ispunct
    Check if character is a punctuation character (function )
    isspace
    Check if character is a white-space (function )
    isupper
    Check if character is uppercase letter (function )
    isxdigit
    Check if character is hexadecimal digit (function )
    
    tolower
    Convert uppercase letter to lowercase (function )
    toupper
    Convert lowercase letter to uppercase (function )
# errno.h #
	errno
	Last error number (macro )
# inttyp.h #
	imaxabs	equivalent to abs for intmax_t:
	intmax_t imaxabs (intmax_t n);
	imaxdiv	equivalent to div for intmax_t:
	imaxdiv_t imaxdiv (intmax_t numer, intmax_t denom);
	strtoimax	equivalent to strtol for intmax_t:
	intmax_t strtoimax (const char* str, char** endptr, int base);
	strtoumax	equivalent to strtoul for uintmax_t:
	uintmax_t strtoumax (const char* str, char** endptr, int base);
	wcstoimax	equivalent to wcstol for intmax_t:
	intmax_t wcstoimax (const wchar_t* wcs, wchar_t** endptr, int base);
	wcstoumax	equivalent to wcstoul for uintmax_t:
	uintmax_t wcstoumax (const wchar_t* wcs, wchar_t** endptr, int base);
# inttypes.h #
	PRIxMAX	printf specifier for intmax_t	PRIiMAX is the equivalent of i (in "%i") for intmax_t values
	PRIxN	printf specifier for intN_t	PRId16 is the equivalent of d (in "%d") for int16_t values
	PRIxLEASTN	printf specifier for int_leastN_t	PRIuLEAST32 is the equivalent of u (in "%u") for uint32_t values
	PRIxFASTN	printf specifier for int_fastN_t	PRIxFAST8 is the equivalent of x (in "%x") for uint8_t values
	PRIxPTR	printf specifier for intptr_t	PRIuPTR is the equivalent of u (in "%u") for uintptr_t values
	SCNxMAX	scanf specifier for intmax_t	SCNiMAX is the equivalent of i (in "%i") for intmax_t values
	SCNxN	scanf specifier for intN_t	SCNd16 is the equivalent of d (in "%d") for int16_t values
	SCNxLEASTN	scanf specifier for int_leastN_t	SCNuLEAST32 is the equivalent of u (in "%u") for uint32_t values
	SCNxFASTN	scanf specifier for int_fastN_t	SCNxFAST8 is the equivalent of x (in "%x") for uint8_t values
	SCNxPTR	scanf specifier for intptr_t	SCNuPTR is the equivalent of u (in "%u") for uintptr_t values
	
	imaxabs	equivalent to abs for intmax_t:
	intmax_t imaxabs (intmax_t n);
	imaxdiv	equivalent to div for intmax_t:
	imaxdiv_t imaxdiv (intmax_t numer, intmax_t denom);
	strtoimax	equivalent to strtol for intmax_t:
	intmax_t strtoimax (const char* str, char** endptr, int base);
	strtoumax	equivalent to strtoul for uintmax_t:
	uintmax_t strtoumax (const char* str, char** endptr, int base);
	wcstoimax	equivalent to wcstol for intmax_t:
	intmax_t wcstoimax (const wchar_t* wcs, wchar_t** endptr, int base);
	wcstoumax	equivalent to wcstoul for uintmax_t:
	uintmax_t wcstoumax (const wchar_t* wcs, wchar_t** endptr, int base);
# iso646.h #
	and	&&
	and_eq	&=
	bitand	&
	bitor	|
	compl	~
	not	!
	not_eq	!=
	or	||
	or_eq	|=
	xor	^
	xor_eq	^=
# limits.h #
	CHAR_BIT	Number of bits in a char object (byte)	8 or greater*
	SCHAR_MIN	Minimum value for an object of type signed char	-127 (-27+1) or less*
	SCHAR_MAX	Maximum value for an object of type signed char	127 (27-1) or greater*
	UCHAR_MAX	Maximum value for an object of type unsigned char	255 (28-1) or greater*
	CHAR_MIN	Minimum value for an object of type char	either SCHAR_MIN or 0
	CHAR_MAX	Maximum value for an object of type char	either SCHAR_MAX or UCHAR_MAX
	MB_LEN_MAX	Maximum number of bytes in a multibyte character, for any locale	1 or greater*
	SHRT_MIN	Minimum value for an object of type short int	-32767 (-215+1) or less*
	SHRT_MAX	Maximum value for an object of type short int	32767 (215-1) or greater*
	USHRT_MAX	Maximum value for an object of type unsigned short int	65535 (216-1) or greater*
	INT_MIN	Minimum value for an object of type int	-32767 (-215+1) or less*
	INT_MAX	Maximum value for an object of type int	32767 (215-1) or greater*
	UINT_MAX	Maximum value for an object of type unsigned int	65535 (216-1) or greater*
	LONG_MIN	Minimum value for an object of type long int	-2147483647 (-231+1) or less*
	LONG_MAX	Maximum value for an object of type long int	2147483647 (231-1) or greater*
	ULONG_MAX	Maximum value for an object of type unsigned long int	4294967295 (232-1) or greater*
	LLONG_MIN	Minimum value for an object of type long long int	-9223372036854775807 (-263+1) or less*
	LLONG_MAX	Maximum value for an object of type long long int	9223372036854775807 (263-1) or greater*
	ULLONG_MAX	Maximum value for an object of type unsigned long long int	18446744073709551615 (264-1) or greater*
# locale.h #
	setlocale
	Set or retrieve locale (function )
	localeconv
	Get locale formatting parameters for quantities (function )
# math.h #
	cos
	Compute cosine (function )
	sin
	Compute sine (function )
	tan
	Compute tangent (function )
	acos
	Compute arc cosine (function )
	asin
	Compute arc sine (function )
	atan
	Compute arc tangent (function )
	atan2
	Compute arc tangent with two parameters (function )
	cosh
	Compute hyperbolic cosine (function )
	sinh
	Compute hyperbolic sine (function )
	tanh
	Compute hyperbolic tangent (function )
	acosh 
	Compute area hyperbolic cosine (function )
	asinh 
	Compute area hyperbolic sine (function )
	atanh 
	Compute area hyperbolic tangent (function )
	exp
	Compute exponential function (function )
	frexp
	Get significand and exponent (function )
	ldexp
	Generate value from significand and exponent (function )
	log
	Compute natural logarithm (function )
	log10
	Compute common logarithm (function )
	modf
	Break into fractional and integral parts (function )
	exp2 
	Compute binary exponential function (function )
	expm1 
	Compute exponential minus one (function )
	ilogb 
	Integer binary logarithm (function )
	log1p 
	Compute logarithm plus one (function )
	log2 
	Compute binary logarithm (function )
	logb 
	Compute floating-point base logarithm (function )
	scalbn 
	Scale significand using floating-point base exponent (function )
	scalbln 
	Scale significand using floating-point base exponent (long) (function )
	pow
	Raise to power (function )
	sqrt
	Compute square root (function )
	cbrt 
	Compute cubic root (function )
	hypot 
	Compute hypotenuse (function )
	erf 
	Compute error function (function )
	erfc 
	Compute complementary error function (function )
	tgamma 
	Compute gamma function (function )
	lgamma 
	Compute log-gamma function (function )
	ceil
	Round up value (function )
	floor
	Round down value (function )
	fmod
	Compute remainder of division (function )
	trunc 
	Truncate value (function )
	round 
	Round to nearest (function )
	lround 
	Round to nearest and cast to long integer (function )
	llround 
	Round to nearest and cast to long long integer (function )
	rint 
	Round to integral value (function )
	lrint 
	Round and cast to long integer (function )
	llrint 
	Round and cast to long long integer (function )
	nearbyint 
	Round to nearby integral value (function )
	remainder 
	Compute remainder (IEC 60559) (function )
	remquo 
	Compute remainder and quotient (function )
	copysign 
	Copy sign (function )
	nan 
	Generate quiet NaN (function )
	nextafter 
	Next representable value (function )
	nexttoward 
	Next representable value toward precise value (function )
	fdim 
	Positive difference (function )
	fmax 
	Maximum value (function )
	fmin 
	Minimum value (function )
	fabs
	Compute absolute value (function )
	abs
	Compute absolute value (function )
	fma 
	Multiply-add (function )
	fpclassify 
	Classify floating-point value (macro/function )
	isfinite 
	Is finite value (macro )
	isinf 
	Is infinity (macro/function )
	isnan 
	Is Not-A-Number (macro/function )
	isnormal 
	Is normal (macro/function )
	signbit 
	Sign bit (macro/function )
	isgreater 
	Is greater (macro )
	isgreaterequal 
	Is greater or equal (macro )
	isless 
	Is less (macro )
	islessequal 
	Is less or equal (macro )
	islessgreater 
	Is less or greater (macro )
	isunordered 
	Is unordered (macro )
	math_errhandling 
	Error handling (macro )
	INFINITY 
	Infinity (constant )
	NAN
	Not-A-Number (constant )
	HUGE_VAL
	Huge value (constant )
	HUGE_VALF 
	Huge float value
	HUGE_VALL 
	Huge long double value (constant )
	MATH_ERRNO 
	MATH_ERREXCEPT	int	Bitmask value with the possible values math_errhandling can take.
	FP_FAST_FMA 
	FP_FAST_FMAF 
	FP_FAST_FMAL	int	Each, if defined, identifies for which type fma is at least as efficient as x*y+z.
	FP_INFINITE 
	FP_NAN 
	FP_NORMAL 
	FP_SUBNORMAL 
	FP_ZERO	int	The possible values returned by fpclassify.
	FP_ILOGB0 
	FP_ILOGBNAN	int	Special values the ilogb function may return.
	double_t 
	Floating-point type (type )
	float_t
	Floating-point type (type )
# setjmp.h #
	longjmp
	Long jump (function )
# signal.h #
	signal
	Set function to handle signal (function )
	raise
	Generates a signal (function )
	sig_atomic_t
	Integral type (type )
	int (signals)	SIGABRT	(Signal Abort) Abnormal termination, such as is initiated by the abort function.
	SIGFPE	(Signal Floating-Point Exception) Erroneous arithmetic operation, such as zero divide or an operation resulting in overflow (not necessarily with a floating-point operation).
	SIGILL	(Signal Illegal Instruction) Invalid function image, such as an illegal instruction. This is generally due to a corruption in the code or to an attempt to execute data.
	SIGINT	(Signal Interrupt) Interactive attention signal. Generally generated by the application user.
	SIGSEGV	(Signal Segmentation Violation) Invalid access to storage: When a program tries to read or write outside the memory it has allocated.
	SIGTERM	(Signal Terminate) Termination request sent to program.
	functions (handlers)	SIG_DFL	Default handling: The signal is handled by the default action for that particular signal.
	SIG_IGN	Ignore Signal: The signal is ignored.
	SIG_ERR	Special return value indicating failure.
# stdarg.h #
	va_list
	Type to hold information about variable arguments (type )
	va_start
	Initialize a variable argument list (macro )
	va_arg
	Retrieve next argument (macro )
	va_end
	End using variable argument list (macro )
	va_copy 
	Copy variable argument list (macro )
# stdbool.h #
	__bool_true_false_are_defined	Specifies whether bool, true and false are defined	1
# stddef.h #
	ptrdiff_t
	Result of pointer subtraction (type )
	size_t
	Unsigned integral type (type )
	max_align_t 
	Type with widest scalar alignment (type )
	nullptr_t 
	Null pointer type (C++) (type )
	offsetof
	Return member offset (macro )
	NULL
	Null pointer (macro )
# stdint.h #
	intmax_t	uintmax_t	Integer type with the maximum width supported.
	int8_t	uint8_t	Integer type with a width of exactly 8, 16, 32, or 64 bits.
	For signed types, negative values are represented using 2's complement.
	No padding bits.
	Optional: These typedefs are not defined if no types with such characteristics exist.*
	int16_t	uint16_t
	int32_t	uint32_t
	int64_t	uint64_t
	int_least8_t	uint_least8_t	Integer type with a minimum of 8, 16, 32, or 64 bits.
	No other integer type exists with lesser size and at least the specified width.
	int_least16_t	uint_least16_t
	int_least32_t	uint_least32_t
	int_least64_t	uint_least64_t
	int_fast8_t	uint_fast8_t	Integer type with a minimum of 8, 16, 32, or 64 bits.
	At least as fast as any other integer type with at least the specified width.
	int_fast16_t	uint_fast16_t
	int_fast32_t	uint_fast32_t
	int_fast64_t	uint_fast64_t
	intptr_t	uintptr_t	Integer type capable of holding a value converted from a void pointer and then be converted back to that type with a value that compares equal to the original pointer.
	Optional: These typedefs may not be defined in some library implementations.*
	INTMAX_MIN	Minimum value of intmax_t	-(263-1), or lower
	INTMAX_MAX	Maximum value of intmax_t	263-1, or higher
	UINTMAX_MAX	Maximum value of uintmax_t	264-1, or higher
	INTN_MIN	Minimum value of exact-width signed type	Exactly -2(N-1)
	INTN_MAX	Maximum value of exact-width signed type	Exactly 2(N-1)-1
	UINTN_MAX	Maximum value of exact-width unsigned type	Exactly 2N-1
	INT_LEASTN_MIN	Minimum value of minimum-width signed type	-(2(N-1)-1), or lower
	INT_LEASTN_MAX	Maximum value of minimum-width signed type	2(N-1)-1, or higher
	UINT_LEASTN_MAX	Maximum value of minimum-width unsigned type	2N-1, or higher
	INT_FASTN_MIN	Minimum value of fastest minimum-width signed type	-(2(N-1)-1), or lower
	INT_FASTN_MAX	Maximum value of fastest minimum-width signed type	2(N-1)-1, or higher
	UINT_FASTN_MAX	Maximum value of fastest minimum-width unsigned type	2N-1, or higher
	INTPTR_MIN	Minimum value of intptr_t	-(215-1), or lower
	INTPTR_MAX	Maximum value of intptr_t	215-1, or higher
	UINTPTR_MAX	Maximum value of uintptr_t	216-1, or higher
	SIZE_MAX	Maximum value of size_t	264-1, or higher
	PTRDIFF_MIN	Minimum value of ptrdiff_t	-(216-1), or lower
	PTRDIFF_MAX	Maximum value of ptrdiff_t	216-1, or higher
	SIG_ATOMIC_MIN	Minimum value of sig_atomic_t	if sig_atomic_t is signed: -127, or lower
	if sig_atomic_t is unsigned: 0
	SIG_ATOMIC_MAX	Maximum value of sig_atomic_t	if sig_atomic_t is signed: 127, or higher
	if sig_atomic_t is unsigned: 255, or higher
	WCHAR_MIN	Minimum value of wchar_t	if wchar_t is signed: -127, or lower
	if wchar_t is unsigned: 0
	WCHAR_MAX	Maximum value of wchar_t	if wchar_t is signed: 127, or higher
	if wchar_t is unsigned: 255, or higher
	WINT_MIN	Minimum value of wint_t	if wint_t is signed: -32767, or lower
	if wint_t is unsigned: 0
	WINT_MAX	Maximum value of wint_t	if wint_t is signed: 32767, or higher
	if wint_t is unsigned: 65535, or higher
	INTMAX_C	expands to a value of type intmax_t
	UINTMAX_C	expands to a value of type uintmax_t
	INTN_C	expands to a value of type int_leastN_t
	UINTN_C	expands to a value of type uint_leastN_t
# tgmath.h #

# time.h #
	clock
	Clock program (function )
	difftime
	Return difference between two times (function )
	mktime
	Convert tm structure to time_t (function )
	time
	Get current time (function )
	
	Conversion
	asctime
	Convert tm structure to string (function )
	ctime
	Convert time_t value to string (function )
	gmtime
	Convert time_t to tm as UTC time (function )
	localtime
	Convert time_t to tm as local time (function )
	strftime
	Format time as string (function )
	
	Macro constants
	CLOCKS_PER_SEC
	Clock ticks per second (macro )
	NULL
	Null pointer (macro )
	
	types
	clock_t
	Clock type (type )
	size_t
	Unsigned integral type (type )
	time_t
	Time type (type )
	struct tm
	Time structure (type )
# uchar.h #
	__STD_UTF_16__	If defined, values of type char16_t have UTF-16 encoding.
	Otherwise, the encoding of char16_t is unspecified.
	(In C11, the macro expands to 1 when defined)
	__STD_UTF_32__	If defined, values of type char32_t have UTF-32 encoding.
	Otherwise, the encoding of char32_t is unspecified.
	(In C11, the macro expands to 1 when defined)
	c16rtomb
	Convert 16-bit character to multibyte sequence (function )
	c32rtomb
	Convert 32-bit character to multibyte sequence (function )
	mbrtoc16
	Convert multibyte sequence to 16-bit character (function )
	mbrtoc32
	Convert multibyte sequence to 32-bit character (function )
# wchar.h #
	fgetwc
	Get wide character from stream (function )
	fgetws
	Get wide string from stream (function )
	fputwc
	Write wide character to stream (function )
	fputws
	Write wide string to stream (function )
	fwide
	Stream orientation (function )
	fwprintf
	Write formatted data to stream (function )
	fwscanf
	Read formatted data from stream (function )
	getwc
	Get wide character from stream (function )
	getwchar
	Get wide character from stdin (function )
	putwc
	Write wide character to stream (function )
	putwchar
	Write wide character to stdout (function )
	swprintf
	Write formatted data to wide string (function )
	swscanf
	Read formatted data from string (function )
	ungetwc
	Unget wide character from stream (function )
	vfwprintf
	Write formatted data from variable argument list to stream (function )
	vfwscanf 
	Read formatted data from stream into variable argument list (function )
	vswprintf 
	Write formatted data from variable argument list to sized buffer (function )
	vswscanf 
	Read formatted data from wide string into variable argument list (function )
	vwprintf
	Print formatted data from variable argument list to stdout (function )
	vwscanf 
	Read formatted data into variable argument list (function )
	wprintf
	Print formatted data to stdout (function )
	wscanf
	Read formatted data from stdin (function )
	
	General utilities: (wide versions of <cstdlib> functions)
	wcstod
	Convert wide string to double (function )
	wcstof 
	Convert wide string to float (function )
	wcstol
	Convert wide string to long integer (function )
	wcstold 
	Convert wide string to long double (function )
	wcstoll 
	Convert wide string to long long integer (function )
	wcstoul
	Convert wide string to unsigned long integer (function )
	wcstoull 
	Convert wide string to unsigned long long integer (function )
	
	Character/string conversion: (mostly extended versions of <cstdlib> functions)
	btowc
	Convert single byte character to wide character (function )
	mbrlen
	Get length of multibyte character (function )
	mbrtowc
	Convert multibyte sequence to wide character (function )
	mbsinit
	Check if initial conversion state (function )
	mbsrtowcs
	Convert multibyte string to wide-character string (function )
	wcrtomb
	Convert wide character to multibyte sequence (function )
	wctob
	Convert wide character to single byte (function )
	wcsrtombs
	Convert wide-character string to multibyte string (function )
	
	Strings: (wide versions of <cstring> functions)
	wcscat
	Concatenate wide strings (function )
	wcschr
	Locate first occurrence of character in wide string (function )
	wcscmp
	Compare two strings (function )
	wcscoll
	Compare two wide strings using locale (function )
	wcscpy
	Copy wide string (function )
	wcscspn
	Get span until character in wide string (function )
	wcslen
	Get wide string length (function )
	wcsncat
	Append characters from wide string (function )
	wcsncmp
	Compare characters of two wide strings (function )
	wcsncpy
	Copy characters from wide string (function )
	wcspbrk
	Locate characters in wide string (function )
	wcsrchr
	Locate last occurrence of character in wide string (function )
	wcsspn
	Get span of character set in wide string (function )
	wcsstr
	Locate substring of wide string (function )
	wcstok
	Split wide string into tokens (function )
	wcsxfrm
	Transform wide string using locale (function )
	wmemchr
	Locate character in block of wide characters (function )
	wmemcmp
	Compare two blocks of wide characters (function )
	wmemcpy
	Copy block of wide characters (function )
	wmemmove
	Move block of wide characters (function )
	wmemset
	Fill array of wide characters (function )
	
	Time: (a wide version of a <ctime> function)
	wcsftime
	Format time as wide string (function )
	
	Types
	mbstate_t
	Multibyte conversion state (type )
	size_t
	Unsigned integral type (type )
	struct tm
	Time structure (type )
	wchar_t
	Wide character (type )
	wint_t
	Wide int type (type )
	
	Macro constants
	NULL
	Null pointer (macro )
	WCHAR_MAX
	Maximum value of wchar_t (constant )
	WCHAR_MIN
	Minimum value of wchar_t (constant )
	WEOF
	Wide end-of-file (constant )
# wctype.h #
	iswalnum
	Check if wide character is alphanumeric (function )
	iswalpha
	Check if wide character is alphabetic (function )
	iswblank 
	Check if wide character is blank (function )
	iswcntrl
	Check if wide character is a control character (function )
	iswdigit
	Check if wide character is decimal digit (function )
	iswgraph
	Check if wide character has graphical representation (function )
	iswlower
	Check if wide character is lowercase letter (function )
	iswprint
	Check if wide character is printable (function )
	iswpunct
	Check if wide character is punctuation character (function )
	iswspace
	Check if wide character is a white-space (function )
	iswupper
	Check if wide character is uppercase letter (function )
	iswxdigit
	Check if wide character is hexadecimal digit (function )
	
	Character conversion functions
	Two functions that convert between letter cases:
	towlower
	Convert uppercase wide character to lowercase (function )
	towupper
	Convert lowercase wide character to uppercase (function )
	
	Extensible classification/conversion functions
	iswctype
	Check if wide character has property (function )
	towctrans
	Convert using transformation (function )
	wctrans
	Return character transformation (function )
	wctype
	Return character property (function )
	
	Types
	wctrans_t
	Wide character transformation (type )
	wctype_t
	Wide character type (type )
	wint_t
	Wide character integral type (type )
	
	Constants
	WEOF
	Wide End-of-File (constant )



----------

<array>
<deque>
<forward_list>
<list>
<map>
<queue>
<set>
<stack>
<unordered_map>
<unordered_set>
<vector>


----------



<fstream>
<iomanip>
<ios>
<iosfwd>
<iostream>
<istream>
<ostream>
<sstream>
<streambuf>



----------



<atomic>
<condition_variable>
<future>
<mutex>
<thread>



----------

<algorithm>
<bitset>
<chrono>
<codecvt>
<complex>
<exception>
<functional>
<initializer_list>
<iterator>
<limits>
<locale>
<memory>
<new>
<numeric>
<random>
<ratio>
<regex>
<stdexcept>
<string>
<system_error>
<tuple>
<typeindex>
<typeinfo>
<type_traits>
<utility>
<valarray>


----------

# algorithm #
	Non-modifying sequence operations:
	all_of 
	Test condition on all elements in range (function template )
	any_of 
	Test if any element in range fulfills condition (function template )
	none_of 
	Test if no elements fulfill condition (function template )
	for_each
	Apply function to range (function template )
	find
	Find value in range (function template )
	find_if
	Find element in range (function template )
	find_if_not 
	Find element in range (negative condition) (function template )
	find_end
	Find last subsequence in range (function template )
	find_first_of
	Find element from set in range (function template )
	adjacent_find
	Find equal adjacent elements in range (function template )
	count
	Count appearances of value in range (function template )
	count_if
	Return number of elements in range satisfying condition (function template )
	mismatch
	Return first position where two ranges differ (function template )
	equal
	Test whether the elements in two ranges are equal (function template )
	is_permutation 
	Test whether range is permutation of another (function template )
	search
	Search range for subsequence (function template )
	search_n
	Search range for elements (function template )
	
	Modifying sequence operations:
	copy
	Copy range of elements (function template )
	copy_n 
	Copy elements (function template )
	copy_if 
	Copy certain elements of range (function template )
	copy_backward
	Copy range of elements backward (function template )
	move 
	Move range of elements (function template )
	move_backward 
	Move range of elements backward (function template )
	swap
	Exchange values of two objects (function template )
	swap_ranges
	Exchange values of two ranges (function template )
	iter_swap
	Exchange values of objects pointed to by two iterators (function template )
	transform
	Transform range (function template )
	replace
	Replace value in range (function template )
	replace_if
	Replace values in range (function template )
	replace_copy
	Copy range replacing value (function template )
	replace_copy_if
	Copy range replacing value (function template )
	fill
	Fill range with value (function template )
	fill_n
	Fill sequence with value (function template )
	generate
	Generate values for range with function (function template )
	generate_n
	Generate values for sequence with function (function template )
	remove
	Remove value from range (function template )
	remove_if
	Remove elements from range (function template )
	remove_copy
	Copy range removing value (function template )
	remove_copy_if
	Copy range removing values (function template )
	unique
	Remove consecutive duplicates in range (function template )
	unique_copy
	Copy range removing duplicates (function template )
	reverse
	Reverse range (function template )
	reverse_copy
	Copy range reversed (function template )
	rotate
	Rotate left the elements in range (function template )
	rotate_copy
	Copy range rotated left (function template )
	random_shuffle
	Randomly rearrange elements in range (function template )
	shuffle 
	Randomly rearrange elements in range using generator (function template )
	
	Partitions:
	is_partitioned 
	Test whether range is partitioned (function template )
	partition
	Partition range in two (function template )
	stable_partition
	Partition range in two - stable ordering (function template )
	partition_copy 
	Partition range into two (function template )
	partition_point 
	Get partition point (function template )
	
	Sorting:
	sort
	Sort elements in range (function template )
	stable_sort
	Sort elements preserving order of equivalents (function template )
	partial_sort
	Partially sort elements in range (function template )
	partial_sort_copy
	Copy and partially sort range (function template )
	is_sorted 
	Check whether range is sorted (function template )
	is_sorted_until 
	Find first unsorted element in range (function template )
	nth_element
	Sort element in range (function template )
	
	Binary search (operating on partitioned/sorted ranges):
	lower_bound
	Return iterator to lower bound (function template )
	upper_bound
	Return iterator to upper bound (function template )
	equal_range
	Get subrange of equal elements (function template )
	binary_search
	Test if value exists in sorted sequence (function template )
	
	Merge (operating on sorted ranges):
	merge
	Merge sorted ranges (function template )
	inplace_merge
	Merge consecutive sorted ranges (function template )
	includes
	Test whether sorted range includes another sorted range (function template )
	set_union
	Union of two sorted ranges (function template )
	set_intersection
	Intersection of two sorted ranges (function template )
	set_difference
	Difference of two sorted ranges (function template )
	set_symmetric_difference
	Symmetric difference of two sorted ranges (function template )
	
	Heap:
	push_heap
	Push element into heap range (function template )
	pop_heap
	Pop element from heap range (function template )
	make_heap
	Make heap from range (function template )
	sort_heap
	Sort elements of heap (function template )
	is_heap 
	Test if range is heap (function template )
	is_heap_until 
	Find first element not in heap order (function template )
	
	Min/max:
	min
	Return the smallest (function template )
	max
	Return the largest (function template )
	minmax 
	Return smallest and largest elements (function template )
	min_element
	Return smallest element in range (function template )
	max_element
	Return largest element in range (function template )
	minmax_element 
	Return smallest and largest elements in range (function template )
	
	Other:
	lexicographical_compare
	Lexicographical less-than comparison (function template )
	next_permutation
	Transform range to next permutation (function template )
	prev_permutation
	Transform range to previous permutation (function template )

# iterator #
	advance
	Advance iterator (function template )
	distance
	Return distance between iterators (function template )
	begin 
	Iterator to beginning (function template )
	end 
	Iterator to end (function template )
	prev 
	Get iterator to previous element (function template )
	next 
	Get iterator to next element (function template )
	
	Iterator generators:
	back_inserter
	Construct back insert iterator (function template )
	front_inserter
	Constructs front insert iterator (function template )
	inserter
	Construct insert iterator (function template )
	make_move_iterator 
	Construct move iterator (function template )
	
	Classes
	iterator
	Iterator base class (class template )
	iterator_traits
	Iterator traits (class template )
	
	Predefined iterators
	reverse_iterator
	Reverse iterator (class template )
	move_iterator 
	Move iterator (class template )
	back_insert_iterator
	Back insert iterator (class template )
	front_insert_iterator
	Front insert iterator (class template )
	insert_iterator
	Insert iterator (class template )
	istream_iterator
	Istream iterator (class template )
	ostream_iterator
	Ostream iterator (class template )
	istreambuf_iterator
	Input stream buffer iterator (class template )
	ostreambuf_iterator
	Output stream buffer iterator (class template )
	
	Category tags
	input_iterator_tag
	Input iterator category (class )
	output_iterator_tag
	Output iterator category (class )
	forward_iterator_tag
	Forward iterator category (class )
	bidirectional_iterator_tag
	Bidirectional iterator category (class )
	random_access_iterator_tag
	Random-access iterator category (class )

# momory #
	allocator
	Default allocator (class template )
	allocator_arg 
	Allocator arg (object )
	allocator_arg_t 
	Allocator arg type (class )
	allocator_traits 
	Allocator traits (class template )
	
	Managed pointers
	auto_ptr
	Automatic Pointer [deprecated] (class template )
	auto_ptr_ref
	Reference to automatic pointer (class template )
	shared_ptr 
	Shared pointer (class template )
	weak_ptr 
	Weak shared pointer (class template )
	unique_ptr 
	Unique pointer (class template )
	default_delete 
	Default deleter (class template )
	
	Functions and classes related to shared_ptr:
	make_shared 
	Make shared_ptr (function template )
	allocate_shared 
	Allocate shared_ptr (function template )
	static_pointer_cast 
	Static cast of shared_ptr (function template )
	dynamic_pointer_cast 
	Dynamic cast of shared_ptr (function template )
	const_pointer_cast 
	Const cast of shared_ptr (function template )
	get_deleter 
	Get deleter from shared_ptr (function template )
	owner_less 
	Owner-based less-than operation (class template )
	enable_shared_from_this 
	Enable shared_from_this (class template )
	
	Uninitialized memory
	Raw storage iterator:
	raw_storage_iterator
	Raw storage iterator (class template )
	
	Temporary buffers:
	get_temporary_buffer
	Get block of temporary memory (function template )
	return_temporary_buffer
	Return block of temporary memory (function template )
	
	Specialized algorithms:
	uninitialized_copy
	Copy block of memory (function template )
	uninitialized_copy_n 
	Copy block of memory (function template )
	uninitialized_fill
	Fill block of memory (function template )
	uninitialized_fill_n
	Fill block of memory (function template )
	
	Memory model
	pointer_traits 
	Pointer traits (class template )
	pointer_safety 
	Pointer safety enum (enum class )
	declare_reachable 
	Declare pointer as reachable (function )
	undeclare_reachable 
	Undeclare pointer as reachable (function template )
	declare_no_pointers 
	Declare memory block as containing no pointers (function )
	undeclare_no_pointers 
	Undeclare memory block as containing no pointers (function )
	get_pointer_safety 
	Get pointer safety (function )
	align 
	Align in range (function )
	addressof 
	Address of object or function (function template )

# new #
	operator new
	Allocate storage space (function )
	operator new[]
	Allocate storage space for array (function )
	operator delete
	Deallocate storage space (function )
	operator delete[]
	Deallocate storage space of array (function )
	set_new_handler
	Set new handler function (function )
	get_new_handler 
	Get new handler function (function )
	
	Types
	nothrow_t
	Nothrow type (type )
	new_handler
	Type of new handler function (type )
	bad_alloc
	Exception thrown on failure allocating memory (class )
	bad_array_new_length 
	Exception on bad array length (class )

# numeric #
	accumulate
	Accumulate values in range (function template )
	adjacent_difference
	Compute adjacent difference of range (function template )
	inner_product
	Compute cumulative inner product of range (function template )
	partial_sum
	Compute partial sums of range (function template )
	iota 
	Store increasing sequence (function template )

# typeinfo #
	type_info
	Type information type (class )
	bad_cast
	Exception thrown on failure to dynamic cast (class )
	bad_typeid
	Exception thrown on typeid of null pointer (class )

# random #
# tuple #
	tuple
	Tuple (class template )
	
	Helper classes
	tuple_size
	Tuple size traits (class template )
	tuple_element
	Tuple element type (class template )
	
	Functions
	Object creation
	make_tuple
	Construct tuple (function template )
	forward_as_tuple
	Forward as tuple (function template )
	tie
	Tie arguments to tuple elements (function template )
	tuple_cat
	Concatenate tuples (function template )
	
	Element access
	get
	Get element (function template )
	
	Objects
	ignore
	Ignore assignment (object )
# typeindex #
	type_index
	Type index (class )
	
	Class specializations
	hash<type_index>
	Hash for type_index (class template specialization )
# utility #
	swap
	Exchange values of two objects (function template )
	make_pair
	Construct pair object (function template )
	forward 
	Forward argument (function template )
	move 
	Move as rvalue (function template )
	move_if_noexcept 
	Move if noexcept (function template )
	declval 
	Declaration value (function template )
	
	Types
	pair
	Pair of values (class template )
	piecewise_construct_t 
	Piecewise construct type (type )
	
	Constants
	piecewise_construct 
	Piecewise construct constant (constant )
	
	Namespaces
	rel_ops
	Relational Operators (namespace )

# string #
	basic_string
	Generic string class (class template )
	char_traits
	Character traits (class template )
	
	Class instantiations
	string
	String class (class )
	u16string 
	String of 16-bit characters (class )
	u32string 
	String of 32-bit characters (class )
	wstring
	Wide string (class )
	
	Functions
	Convert from strings
	stoi 
	Convert string to integer (function template )
	stol 
	Convert string to long int (function template )
	stoul 
	Convert string to unsigned integer (function template )
	stoll 
	Convert string to long long (function template )
	stoull 
	Convert string to unsigned long long (function template )
	stof 
	Convert string to float (function template )
	stod 
	Convert string to double (function template )
	stold 
	Convert string to long double (function template )
	
	Convert to strings
	to_string 
	Convert numerical value to string (function )
	to_wstring 
	Convert numerical value to wide string (function )
	
	Range access
	begin 
	Iterator to beginning (function template )
	end 
	Iterator to end (function template )