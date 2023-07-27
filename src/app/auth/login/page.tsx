'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { auth } from '@/utils/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import useLogin from '@/hooks/auth/useLogin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { isLoginAtom } from '@/store/authStore';

type Inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);
  const isLogin = useAtomValue(isLoginAtom)

  useEffect(() => {
    if(isLogin) {
      router.push('/')
    }
  }, [isLogin]);

  const login = useLogin();
  const logout = () => {
    login.logout();
  };


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsShowSpinner(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      login.login(user);

    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        console.log(err.message);
        alert(err.message);
      }
    } finally {
      setIsShowSpinner(false);
    }
  };

  return (
    <main className='min-h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='test' {...register('email')} />
        <input type='password' {...register('password', { required: true })} />

        <button type='submit'>로그인</button>
      </form>
      <button onClick={logout}>로그아웃!</button>
    </main>
  );
}
