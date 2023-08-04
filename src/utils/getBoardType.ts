import { BoardType } from '@/types/board';
import dynamic from 'next/dynamic';

const getComponent = (type: BoardType) => {
  switch (type) {
    case 'GALLERY':
      return dynamic(() => import('@/components/board/GalleryBoard'));

    default:
      return dynamic(() => import('@/components/board/DefaultBoard'));
  }
};

export default getComponent;
