---
layout: blog_detail
title: Blogging Like a Hacker
excerpt_separator: <!--more-->
---
VECTOR

http://www.cplusplus.com/reference/vector/vector/

<!--more-->
C++11 vector's new features
**emplace,emplace_back,shrink\_to\_fit,cbegin,cend,crbegin,crend,data**

******************************************************
http://pubs.opengroup.org/onlinepubs/009695399/nfindex.html

#include <fcntl.h>

int posix\_fadvise(int fd, off\_t offset, off\_t len, int advice);

		Programs can use posix_fadvise() to announce an intention to access
		file data in a specific pattern in the future, thus allowing the
		kernel to perform appropriate optimizations.
		
		The advice applies to a (not necessarily existent) region starting at
		offset and extending for len bytes (or until the end of the file if
		len is 0) within the file referred to by fd.  The advice is not
		binding; it merely constitutes an expectation on behalf of the
		application.
		
Permissible values for advice include:

	POSIX_FADV_NORMAL
	
	      Indicates that the application has no advice to give about its
	      access pattern for the specified data.  If no advice is given
	      for an open file, this is the default assumption.
	
	POSIX_FADV_SEQUENTIAL
	
	      The application expects to access the specified data
	      sequentially (with lower offsets read before higher ones).

******************************************************

也可以使用mallopt来直接调整malloc的行为：
int mallopt (int PARAM, int VALUE)
     When calling `mallopt', the PARAM argument specifies the parameter
     to be set, and VALUE the new value to be set.  Possible choices
     for PARAM, as defined in `malloc.h', are:

    `M_TRIM_THRESHOLD'
          This is the minimum size (in bytes) of the top-most,
          releasable chunk that will cause `sbrk' to be called with a
          negative argument in order to return memory to the system.

    `M_TOP_PAD'
          This parameter determines the amount of extra memory to
          obtain from the system when a call to `sbrk' is required.  It
          also specifies the number of bytes to retain when shrinking
          the heap by calling `sbrk' with a negative argument.  This
          provides the necessary hysteresis in heap size such that
          excessive amounts of system calls can be avoided.

    `M_MMAP_THRESHOLD'
          All chunks larger than this value are allocated outside the
          normal heap, using the `mmap' system call.  This way it is
          guaranteed that the memory for these chunks can be returned
          to the system on `free'.  Note that requests smaller than
          this threshold might still be allocated via `mmap'.

    `M_MMAP_MAX'
          The maximum number of chunks to allocate with `mmap'.
          Setting this to zero disables all use of `mmap'.
值得注意的是mallopt是malloc底层的函数，需要使用info mallopt来查看相关帮助信息。