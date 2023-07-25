'use client';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';

import { useAtom } from 'jotai';
import { isLoginAtom } from '@/atoms/authAtom';

const useLogin = () => {
  const [, setIsLogin] = useAtom(isLoginAtom);

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    signOut(auth);
    setIsLogin(false);
  };

  const checkLoginStatus = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        login();
      } else {
        logout();
      }
    });
  };

  return { login, logout, checkLoginStatus };
};

export default useLogin;
