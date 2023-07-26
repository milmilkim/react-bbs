import type { Metadata } from 'next';
import Login from '@/components/common/Login';
import { database } from '@/utils/firebase';
import { onValue, ref } from 'firebase/database';
import NoAdmin from '@/components/common/NoAdmin';
import 'src/app/globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

const getData = () => {
  return new Promise((resolve, reject) => {
    const adminRef = ref(database, 'admins/');

    onValue(adminRef, (snapshot) => {
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
      <body>
        <Login />
        {(await getData()) ? <>{children}</> : <NoAdmin />}
      </body>
    </html>
  );
}
