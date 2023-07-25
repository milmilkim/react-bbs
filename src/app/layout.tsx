import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Login from '@/components/common/Login';
import { database } from '@/utils/firebase';
import {
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import config from '../../firebase.config'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

const getData = () => {
  return new Promise((resolve, reject) => {
    const userRef = ref(database, 'users/');
    const adminUserRef = query(userRef, orderByChild('role'), equalTo('user'));

    onValue(adminUserRef, (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        resolve(false);
      }
    });
  });
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Login />
        <div>전역 레이아웃</div>
        {(await getData()) ? (
          <>{children}</>
        ) : (
          <main className='flex min-h-screen flex-col items-center justify-between p-24'>
           <div>
            <p>관리자 계정이 존재하지 않습니다. 관리자 계정을 추가하세요.</p>
            <p>{JSON.stringify(config)}</p>
            </div>
          </main>
        )}
      </body>
    </html>
  );
}
