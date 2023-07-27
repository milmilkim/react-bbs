import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/app/api/firebase';
import { auth as cAuth } from '@/utils/firebase';

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
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/auth/login');

  const user = await auth.verifyIdToken(token);

  if (!user.admin) redirect('/');

  return (
    <>
      <div>admin</div>
      <div>{children}</div>
      <div>{JSON.stringify(user)}</div>
    </>
  );
}
