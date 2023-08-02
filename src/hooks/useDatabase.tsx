import {
  type Query,
  getDatabase,
  onValue,
  query,
  ref,
  set,
  type DatabaseReference,
  get,
} from 'firebase/database';
import { useSetAtom } from 'jotai';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { database } from '@/lib/firebase';

const useDatabase = <T = any>(
  setData?: React.Dispatch<React.SetStateAction<T>>
) => {
  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const writeData = async <U = any,>(path: string, value: U) => {
    setIsShowSpinner(true);
    try {
      await set(ref(database, path), value);
    } catch (err) {
      console.error(err);
    } finally {
      setIsShowSpinner(false);
    }
  };

  const loadRealtime = (ref: Query | DatabaseReference) => {
    if (!setData) {
      throw new Error('setter 함수가 없습니다');
    }
    setIsShowSpinner(true);
    onValue(ref, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const array = Object.values(val);
        setData(array as T);
      } else {
        console.error('No data available.');
      }
      setIsShowSpinner(false);
    });
  };

  const load = async (ref: Query | DatabaseReference) => {
    if (!setData) {
      throw new Error('setter 함수가 없습니다');
    }
    setIsShowSpinner(true);
    const snapshot = await get(ref);
    if (snapshot.exists()) {
      const val = snapshot.val();
      setData(val);
    } else {
      console.log('No data available.');
    }
    setIsShowSpinner(false);
  };

  return { writeData, loadRealtime, load };
};

export default useDatabase;
