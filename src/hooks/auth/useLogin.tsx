'use client';

import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';

import { useAtom } from 'jotai';
import { isLoginAtom } from '@/store/authStore';
import { useCookies } from 'react-cookie';

const useLogin = () => {
  const [, setIsLogin] = useAtom(isLoginAtom);
  const [cookies, setCookie, deleteCookie] = useCookies();

  const login = (user: User) => {
    setCookie('uid', user.uid);
    setIsLogin(true);
  };

  const logout = async () => {
    await signOut(auth);
    deleteCookie('uid');
    setIsLogin(false);
    console.log('logout');
  };

  return { login, logout };
};

export default useLogin;
