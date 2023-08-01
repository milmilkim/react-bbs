import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getToken } from 'next-auth/jwt';
import { onValue, ref, get } from 'firebase/database';
import { database } from '@/lib/firebase';

export default async function Home() {
  const homeRef = ref(database, 'home/html');

  const snapshot = await get(homeRef);
  let data;
  if (snapshot.exists()) {
    const val = snapshot.val();
    data = val
  } else {
    console.log('No data available.');
    data = ''
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
    	<div dangerouslySetInnerHTML={{__html: data}}></div>
    </main>
  );
}
