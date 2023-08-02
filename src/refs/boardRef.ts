import { equalTo, orderByChild, query, ref } from 'firebase/database';
import { database as db } from '@/lib/firebase';

enum BoardPath {
  CATEGORIES = '/board/categories',
}

// 카테고리를 조회
export const categoryRef = ref(db, 'board/categories');
export const publicCategoryRef = query(
  query(categoryRef, orderByChild('isPublic')),
  equalTo(true)
);

export { BoardPath };
