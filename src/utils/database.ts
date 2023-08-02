import { DatabaseReference, Query, get } from 'firebase/database';

const load = async (ref: Query | DatabaseReference) => {
  const snapshot = await get(ref);
  if (snapshot.exists()) {
    const val = snapshot.val();
    return val;
  } else {
    return null;
  }
};

export { load };
