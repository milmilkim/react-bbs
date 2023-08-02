'use client';

import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Board } from '@/types/board';
import BoardModal from '@/components/admin/board/BoardModal';
import useDatabase from '@/hooks/useDatabase';
import { database as db } from '@/lib/firebase';
import { ref } from 'firebase/database';

const columns: ColumnsType<Board> = [
  {
    key: 'sort',
  },
  {
    title: '이름',
    dataIndex: 'title',
  },
  {
    title: '공개 설정',
    dataIndex: 'isPublic',
  },
  {
    title: '타입',
    dataIndex: 'type',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 10 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<Board[]>([]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const { loadRealtime } = useDatabase(setDataSource);

  useEffect(() => {
    const categoryRef = ref(db, 'board/categories');
    loadRealtime(categoryRef);
  }, []);

  return (
    <div>
      <div className='flex'>
        <div className='ml-auto'>
          <Button onClick={() => setIsOpen(true)}>게시판 추가</Button>
          <Button type='primary' className='ml-2 mb-5'>
            순서 저장
          </Button>
        </div>
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.id)}
          strategy={verticalListSortingStrategy}>
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey='id'
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </SortableContext>
      </DndContext>
      <BoardModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default App;
