'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const isShowSpinner = useAtomValue(isShowSpinnerAtom);
  const session = useSession();
  const isAdmin = session.data?.user.role === 'admin';

  const path = usePathname();
  const regex = /^\/(auth|admin)/;

  return (
    <div>
      {isShowSpinner ? <LoadingSpinner /> : null}
      {!regex.test(path) ? (
        <div>
          <nav>
            <ul>
              {isAdmin && <li> <Link href='/admin'>어드민</Link></li>}
              {session.data ? (
                <li onClick={() => signOut()}>로그아웃</li>
              ) : (
                <li>
                  <Link href='/auth/login'>로그인</Link>
                </li>
              )}
            </ul>
          </nav>
          <div>{children}</div>
        </div>
      ) : <div>{children}</div>}
    </div>
  );
};

export default CommonLayout;
