import { load } from '@/utils/database';
import { getCategoryMetaRef } from '@/refs/boardRef';

const Board = async ({ params }: { params: { category: string } }) => {
  const metaRaf = getCategoryMetaRef(params.category[0]);
  const meta = await load(metaRaf);

  return (
    <>
      <h1>board</h1>
    </>
  );
};

export default Board;
