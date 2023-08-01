import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // 로그인 중일 땐 로그인 페이지 접근 안 됨
  if (req.nextUrl.pathname.startsWith('/auth')) {
    const token = await getToken({ req, secret: process.env.SECRET, raw: false });
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 어드민 권한 체크
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret: process.env.SECRET, raw: false });

    if(!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
