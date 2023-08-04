import { loadRealtime } from '@/utils/database';
import { getCategoryMetaRef } from '@/refs/boardRef';
import { Board } from '@/types/board';
import getComponent from '@/utils/getBoardType';

const Board = async ({ params }: { params: { category: string } }) => {
  const metaRef = getCategoryMetaRef(params.category[0]);
  const meta = await loadRealtime<Board>(metaRef);
  const {title, type, id} = meta;
  const BoardComponent = getComponent(type);
  // TODO: 게시글을 불러오는 로직

  return (
    <>
      <div>{title}</div>
      <div>{type}</div>
      <BoardComponent id={id} />
    </>
  );
};

export default Board;
