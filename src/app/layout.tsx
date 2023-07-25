import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Login from '@/components/common/Login';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Login />
        <div>전역 레이아웃</div>
        {children}
      </body>
    </html>
  );
}
