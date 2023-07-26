import type { Metadata } from 'next';
import 'src/app/globals.css';
import { onAuthStateChanged, } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export const metadata: Metadata = {
  title: 'My App',
  description: '넥스트예용',
};

onAuthStateChanged(auth, (currentUser) => {
	if (currentUser) {
	  // TODO: 로그인한 유저가 어드민 권한이 있는지 확인
	} else {
	  console.error('권한 없어요')
	}
  });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
