'use client';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { auth } from '@/utils/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const logout = () => {
  signOut(auth);
};
export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        console.log(err.message);
        alert(err.message);
      }
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='test' {...register('email')} />
        <input type='password' {...register('password', { required: true })} />

        <button type='submit'>로그인</button>
      </form>
      <button onClick={logout}>로그아웃</button>
    </main>
  );
}
