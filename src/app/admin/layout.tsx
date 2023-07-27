import type { Metadata } from 'next';
import 'src/app/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/app/api/firebase';

export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 어드민 권한 확인
  const cookieStore = cookies();
  const uid = cookieStore.get('uid')?.value;

  if (!uid) redirect('/');

  const user = await auth.getUser(uid);

  return (
    <>
      <div>admin</div>
      <div>{children}</div>
      <div>{JSON.stringify(user)}</div>
    </>
  );
}
