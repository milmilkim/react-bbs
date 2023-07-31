'use client';

import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { useAtom } from 'jotai';
import { isLoginAtom } from '@/store/authStore';
import { useCookies } from 'react-cookie';

const useLogin = () => {
  const [, setIsLogin] = useAtom(isLoginAtom);
  const [cookies, setCookie, deleteCookie] = useCookies();

  const login = async (user: User) => {
    deleteCookie('token');
    setCookie('token', await user.getIdToken());
    setIsLogin(true);
  };

  const logout = async () => {
    setCookie('token', '')
    await signOut(auth);
    setIsLogin(false);
  };

  return { login, logout };
};

export default useLogin;
