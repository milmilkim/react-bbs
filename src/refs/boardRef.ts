import { equalTo, orderByChild, orderByKey, query, ref } from 'firebase/database';
import { database as db } from '@/lib/firebase';

enum BoardPath {
  CATEGORIES = 'board/categories',
}

// 카테고리 리스트 조회
export const categoryRef = ref(db, BoardPath.CATEGORIES);

// 공개 카테고리 조회
export const publicCategoryRef = query(
  query(categoryRef, orderByChild('isPublic')),
  equalTo(true)
);

// 카테고리 url로 카테고리 정보 조회
export const getCategoryMetaRef = (url: string) => {
  return query(categoryRef, orderByChild('url'));
};

export { BoardPath };
