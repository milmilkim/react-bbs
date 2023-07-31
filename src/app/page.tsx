import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getToken } from 'next-auth/jwt';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {session ? JSON.stringify(session) : <div>로그인안됨</div>}
     </main>;
}
