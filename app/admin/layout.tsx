import { ReactNode } from 'react';
import AdminLayout from './components/layout/AdminLayout';
//  gfauto/githubVercel/GFauto/app/admin/layout.tsx
export const metadata = {
  title: 'GFauto - Painel Administrativo',
  description: 'Painel administrativo do GFauto',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}