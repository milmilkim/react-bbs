'use client';

import { isLoginAtom } from '@/store/authStore';
import { useAtom } from 'jotai';
import useLogin from '@/hooks/auth/useLogin';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export default function Login() {
  const [isLogin] = useAtom(isLoginAtom);
  const { login, logout } = useLogin();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        login(user);
      } else {
        logout();
      }
    });
  }, []);

  return <>{isLogin ? <button onClick={logout}>로그아웃</button> : null}</>;
}
