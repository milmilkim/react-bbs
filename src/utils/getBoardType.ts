import { BoardType } from '@/types/board';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const getComponent : (type: BoardType) => ComponentType<{id: string}> = (type) => {
  switch (type) {
    case 'GALLERY':
      return dynamic(() => import('@/components/board/GalleryBoard'));

    default:
      return dynamic(() => import('@/components/board/DefaultBoard'));
  }
};

export default getComponent;
