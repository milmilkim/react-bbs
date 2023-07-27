import { useAtom } from 'jotai';
import { isLoginAtom } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isLogin] = useAtom(isLoginAtom);
  const router = useRouter();
  const checkNeedLogin = () => {
    if (isLogin) {
      router.replace('/');
    }
  };

  const checkIsLogin = () => {
    if (!isLogin) {
      router.replace('/auth/login');
    }
  };

  return { checkNeedLogin, checkIsLogin };
};

export default useAuth;
