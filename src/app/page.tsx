import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getToken } from 'next-auth/jwt';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">{session ? '로그인중' : '로그인안됨'}</main>;
}
