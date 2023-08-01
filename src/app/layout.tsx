import type { Metadata } from 'next';
import CommonLayout from '@/components/common/layouts/CommonLayout';
import { NextAuthProvider } from '@/app/provider';
import Ant from '@/lib/AntReg';
import SC from '@/lib/StyledComponentsReg';
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

import 'src/app/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <>
          <NextAuthProvider>
            <SC>
              <Ant>
                <NextTopLoader />
                <CommonLayout>{children}</CommonLayout>
              </Ant>
            </SC>
          </NextAuthProvider>
        </>
      </body>
    </html>
  );
}
