// 兼容低版本环境缺失 crypto.randomUUID，Next.js专用判断
if (typeof window !== 'undefined' && !window.crypto?.randomUUID) {
  window.crypto.randomUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Document Processor Agent',
  description: 'AI Agent-powered document processing with EdgeOne sandbox',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
