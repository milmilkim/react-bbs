import { loadRealtime } from '@/utils/database';
import { getCategoryMetaRef } from '@/refs/boardRef';
import { Board } from '@/types/board';
import useBoardType from '@/utils/getBoardType';
import getComponent from '@/utils/getBoardType';

const Board = async ({ params }: { params: { category: string } }) => {
  const metaRef = getCategoryMetaRef(params.category[0]);
  const meta = await loadRealtime<Board>(metaRef);
  const title = meta.title;
  const type = meta.type;

  const BoardComponent = getComponent(type);

  return (
    <>
      <div>{title}</div>
      <div>{type}</div>
      <BoardComponent />
    </>
  );
};

export default Board;
