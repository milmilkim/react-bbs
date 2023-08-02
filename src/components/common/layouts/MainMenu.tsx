'use client';

import { publicCategoryRef } from '@/refs/boardRef';
import useDatabase from '@/hooks/useDatabase';
import { Board } from '@/types/board';
import { useEffect, useState } from 'react';

const MainMenu = () => {
  const [data, setData] = useState<Board>();
  const database = useDatabase(setData);

  useEffect(() => {
    database.loadRealtime(publicCategoryRef);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default MainMenu;