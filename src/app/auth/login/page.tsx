'use client';

import firebaseConfig from '../../../../firebase.config';
import { firebaseConfigKey } from '@/types/firebase';
import { orbit } from '@/utils/googleFonts';
import { FirebaseError } from 'firebase/app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaEnvelope, FaKey, FaExclamationCircle } from 'react-icons/fa';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';

const WarnIcon: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className="flex flex-row items-center text-red-800">
      <FaExclamationCircle className="mx-1" /> {message}
    </p>
  );
};
const NoAdmin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);



  const checkNull = () => {
    const keys: firebaseConfigKey[] = ['apiKey', 'appId', 'authDomain', 'databaseURL', 'messagingSenderId', 'projectId', 'storageBucket'];
    return keys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);
  };

  type Inputs = {
    email: string;
    password: string;
  };

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsShowSpinner(true);
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      });
      setIsShowSpinner(false);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err.code);
        console.error(err.message);
        alert(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen ${orbit.className} flex  flex-col w-screen`} >
      <h1 className={`text-5xl text-right pr-10 pt-10`}>milmilboard</h1>
      <div className="grid place-content-center">
        <div className="p-5 bg-white border rounded-md bg-opacity-80">
          {checkNull().length ? (
            <>
              <div>firebase.config.js 파일을 확인하세요. 아래의 값들이 존재하지 않습니다.</div>
              <ul className="list-disc ml-10">
                {checkNull().map((key) => (
                  <li>{key} ❌</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="my-4">로그인</p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="mb-4 flex items-center">
                  <FaEnvelope className="mx-3" />
                  <input
                    placeholder="이메일"
                    type="이메일"
                    {...register('email', {
                      required: '이메일을 입력하세요',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: '이메일 형식에 맞지 않습니다.',
                      },
                    })}
                    className="rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <FaKey className="mx-3" />
                  <input
                    className="rounded-lg p-2 w-full"
                    type="password"
                    placeholder="비밀번호"
                    {...register('password', {
                      required: '비밀번호를 입력하세요',
                    })}
                  />
                </div>
                {errors.email?.message && <WarnIcon message={errors.email.message} />}
                {errors.password?.message && <WarnIcon message={errors.password.message} />}
                <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-800 ease-in duration-100 my-5">
                  로그인
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : null}

      <footer className="w-full mt-auto flex justify-center items-center p-5">
        <p className="text-sm">
          milmil company <br /> v.1.0
        </p>
      </footer>
    </div>
  );
};

export default NoAdmin;
