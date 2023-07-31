'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { auth } from '@/lib/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, set } from 'firebase/database';
import useAuth from '@/hooks/auth/useAuth';
import { useEffect } from 'react';
import { isLoginAtom } from '@/store/authStore';
import { useAtom } from 'jotai';

type Inputs = {
  email: string;
  password: string;
};

const writeUserData = (userId: string) => {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    role: 'user',
  });
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLogin] = useAtom(isLoginAtom);

  const { checkNeedLogin } = useAuth();

  useEffect(() => {
    console.log(isLogin);
    checkNeedLogin();
  }, [isLogin]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      writeUserData(user.uid);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        console.log(err.message);
        alert(err.message);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register('email')} />
        <input type="password" {...register('password', { required: true })} />

        <button type="submit">회원가입</button>
      </form>
    </main>
  );
}
