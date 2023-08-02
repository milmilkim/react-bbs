'use client';

import { publicCategoryRef } from '@/refs/boardRef';
import useDatabase from '@/hooks/useDatabase';
import { Board } from '@/types/board';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MainMenu = () => {
  const [data, setData] = useState<Board[]>();
  const database = useDatabase(setData);

  useEffect(() => {
    database.loadRealtime(publicCategoryRef);
  }, []);

  return (
    <>
      <ul>
        {data
          ? data.map((cate) => (
              <li key={cate.id}>
                <Link href={`/board/${cate.url}`}>{cate.title}</Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export default MainMenu;
