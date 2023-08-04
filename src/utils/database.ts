import { DatabaseReference, Query, get, onValue } from 'firebase/database';

const load = async (ref: Query | DatabaseReference) => {
  const snapshot = await get(ref);
  if (snapshot.exists()) {
    const val = snapshot.val();
    return val;
  } else {
    return null;
  }
};

const loadRealtime = <T = any>(ref: Query | DatabaseReference): Promise<T> => {
  return new Promise((resolve, reject) => {
    onValue(ref, (snapshot) => {
      if (snapshot.exists()) {
        const val : object = snapshot.val();
        const array = Object.values(val) as any;
        if(array.length === 1) {
          resolve(array[0])
        }
        resolve(array);
      } else {
        reject('No data available.');
      }
    });
  });
};
export { load, loadRealtime };
