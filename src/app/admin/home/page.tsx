'use client';

import Editor from '@/components/common/form/Editor';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { get, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { isShowSpinnerAtom } from '@/store/LayoutStore';
import { useSetAtom } from 'jotai';
import { database } from '@/lib/firebase';

const Home = () => {
  const setIsShowSpinner = useSetAtom(isShowSpinnerAtom);

  const [value, setValue] = useState('');
  const [messageApi, contextHolder] = message.useMessage();


  const success = () => {
    console.log('message')
    messageApi.open({
      type: 'success',
      content: '저장되었습니다.',
    });
  };

  const save = async () => {
    setIsShowSpinner(true);
    await set(ref(database, 'home/' + 'html'), value);
    setIsShowSpinner(false);
    success();
  };

  const load = async () => {
    setIsShowSpinner(true);
    const homeRef = ref(database, 'home/html');
    const snapshot = await get(homeRef);
    let data;
    if (snapshot.exists()) {
      const val = snapshot.val();
      setValue(val);
    } else {
      console.log('No data available.');
    }
    setIsShowSpinner(false);

    return data;
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
            {contextHolder}

      <Editor value={value} setValue={setValue} />
      <Button type='primary' className='my-5' onClick={save}>
        저장
      </Button>
    </div>
  );
};

export default Home;
