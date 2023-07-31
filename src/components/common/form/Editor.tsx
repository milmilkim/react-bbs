'use client';

import dynamic from 'next/dynamic';
import React, { useState, SetStateAction, Dispatch, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return <ReactQuill theme='snow' value={value} onChange={setValue} />;
};

export default Editor;
