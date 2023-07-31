'use client';

import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {FaHome, FaHammer} from 'react-icons/fa'
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/admin/home">홈화면 설정</Link>, '1', <FaHome />),
  getItem(<Link href="/admin/setting">환경 설정</Link>, '2', <FaHammer />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem(<Link href="/">메인으로</Link>, '9', <LogoutOutlined />),
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div className="m-5 text-white">
          milmilboard admin
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
      
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
