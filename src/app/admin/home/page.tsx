'use client';

import Editor from '@/components/common/form/Editor';
import { Button } from 'antd';
import { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import {v4 as uuidv4} from 'uuid';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useSetAtom } from 'jotai';
import {database} from '@/lib/firebase';

const Home = () => {
	const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const [value, setValue] = useState('');
  const save = async () => {
	 setIsShowSpinner(true);
	 await set(ref(database, 'home/' + 'html'), value);
	 setIsShowSpinner(false)
  };
  return (
    <div>
      <Editor value={value} setValue={setValue} />
      <Button type='primary' className='my-5' onClick={save}>
        저장
      </Button>
    </div>
  );
};

export default Home;
