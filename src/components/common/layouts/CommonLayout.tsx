'use client';

import Link from 'next/link';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { isLoginAtom } from '@/store/authStore';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const isShowSpinner = useAtomValue(isShowSpinnerAtom);
  const isLogin = useAtomValue(isLoginAtom);

  return (
    <div>
      {isShowSpinner ? <LoadingSpinner /> : null}
      <ul>
        <li>{isLogin ? <Link href="/admin">어드민</Link> : <Link href='/auth/login'>로그인</Link>}</li>
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default CommonLayout;
