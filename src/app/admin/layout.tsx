import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayout>
      {children}
	  </AdminLayout>
    </>
  );
}
