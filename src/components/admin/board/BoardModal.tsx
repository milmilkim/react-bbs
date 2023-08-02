'use client';

import React, { useState, SetStateAction } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { Board, BoardType } from '@/types/board';
import useDatabase from '@/hooks/useDatabase';
import useMessage from '@/hooks/admin/useMessage';
import { v4 } from 'uuid';
import { BoardPath } from '@/refs/boardRef';

interface BoardModalProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const BoardModal: React.FC<BoardModalProps> = ({ isOpen, setIsOpen }) => {
  const { writeData } = useDatabase();
  const { contextHolder, success, error } = useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = async (val: {
    title: string;
    url: string;
    type: BoardType;
    isPublic: boolean;
  }) => {
    try {
      setIsLoading(true);
      const id = v4();
      await writeData<Board>(BoardPath.CATEGORIES + '/' + id, {
        ...val,
        isPublic: val.isPublic || false,
        id,
        order: 0,
      });
      form.resetFields();
      success();
      setIsOpen(false);
    } catch (err) {
      error();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title='카테고리' open={isOpen} footer={null} onCancel={handleCancel}>
      <>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item
            label='게시판 이름'
            name='title'
            rules={[{ required: true, message: '게시판 이름은 필수값입니다' }]}>
            <Input placeholder='게시판' />
          </Form.Item>

          <Form.Item
            label='게시판 URL'
            name='url'
            rules={[{ required: true, message: 'url은 필수값입니다' }]}>
            <Input placeholder='my-board' />
          </Form.Item>

          <Form.Item
            label='게시판 공개 설정'
            name='isPublic'
            valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item label='게시판 타입' name='type'>
            <Select placeholder='타입 선택'>
              <Select.Option value='DEFAULT'>기본 게시판</Select.Option>
              <Select.Option value='GALLERY'>갤러리</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              저장
            </Button>
          </Form.Item>
        </Form>
      </>
      {contextHolder}
    </Modal>
  );
};

export default BoardModal;
