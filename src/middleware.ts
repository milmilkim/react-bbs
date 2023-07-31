import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    // const session = await getSession();
    // if (session) {
    //   console.log('dd');
    // }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
