// import type { Metadata } from 'next';
// import './globals.css';
// import { I18nProvider } from '@/lib/i18n';

// export const metadata: Metadata = {
//   title: 'Document Processor Agent',
//   description: 'AI Agent-powered document processing with EdgeOne sandbox',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className="dark">
//       <body className="h-screen overflow-hidden antialiased">
//         <I18nProvider>{children}</I18nProvider>
//       </body>
//     </html>
//   );
// }
// 'use client';


'use client';

import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 移除 EdgeOne 水印
    const removeWatermark = () => {
      const watermark = document.getElementById('edgeone-watermark');
      if (watermark) {
        watermark.remove();
        console.log('✅ EdgeOne 水印已移除');
        return true;
      }
      return false;
    };

    // 立即执行
    removeWatermark();

    // 监听 DOM 变化，如果水印被重新插入则再次移除
    const observer = new MutationObserver(() => {
      removeWatermark();
    });
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="zh-CN" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
