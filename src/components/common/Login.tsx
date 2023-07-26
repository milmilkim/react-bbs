'use client';

import { isLoginAtom } from '@/atoms/authAtom';
import useLogin from '@/hooks/auth/useLogin';
import { useAtom } from 'jotai';

export default function Login() {
  const { checkLoginStatus } = useLogin();
  const [isLogin] = useAtom(isLoginAtom);
  checkLoginStatus();

  return null;
}
