import type { Metadata } from 'next';
import Login from '@/components/common/Login';
import 'src/app/globals.css';
import CommonLayout from '@/components/common/layouts/CommonLayout';
import { NextAuthProvider } from '@/app/provider';
export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <>
          <NextAuthProvider>
            <CommonLayout>{children}</CommonLayout>
          </NextAuthProvider>
        </>
      </body>
    </html>
  );
}
