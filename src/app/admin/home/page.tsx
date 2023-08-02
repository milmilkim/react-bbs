'use client';

import Editor from '@/components/common/form/Editor';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { ref } from 'firebase/database';
import { database as db } from '@/lib/firebase';
import useDatabase from '@/hooks/useDatabase';
import useMessage from '@/hooks/admin/useMessage';

const Home = () => {
  const [value, setValue] = useState('');
  const {contextHolder, success} = useMessage();

  const save = async () => {
    await writeData('home/html', value);
    success();
  };

  const { load, writeData } = useDatabase(setValue);

  useEffect(() => {
    const homeRef = ref(db, 'home/html');
    load(homeRef);
  }, []);

  return (
    <div>
      <>{contextHolder}</>
      <Editor value={value} setValue={setValue} />
      <Button type='primary' className='my-5' onClick={save}>
        저장
      </Button>
    </div>
  );
};

export default Home;
