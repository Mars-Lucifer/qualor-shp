import '../styles/index.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/app/auth-provider';

export const metadata: Metadata = {
  title: 'Qualor shp',
  description: 'Qualor shp storefront',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
