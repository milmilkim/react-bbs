'use client';

import { isLoginAtom } from '@/store/authStore';
import { useAtom } from 'jotai';
import useLogin from '@/hooks/auth/useLogin';
import { useEffect } from 'react';

export default function Login() {
  const [isLogin] = useAtom(isLoginAtom);
  const { logout } = useLogin();

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  return <>{isLogin ? <button onClick={logout}>로그아웃</button> : null}</>;
}
