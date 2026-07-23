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
    // 删除水印
    const removeWatermark = () => {
      const el = document.getElementById('edgeone-watermark');
      if (el) el.remove();
    };

    // 添加自定义底部文字
    const addFooter = () => {
      // 避免重复添加
      if (document.getElementById('custom-footer')) return;
      
      const footer = document.createElement('div');
      footer.id = 'custom-footer';
      footer.textContent = '一叶知秋 | 项目演示yztcf.de5.net';
      footer.style.cssText = `
        position: fixed;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: #666;
        z-index: 99999;
        white-space: nowrap;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      `;
      document.body.appendChild(footer);
      console.log('✅ 底部文字已添加');
    };

    // 执行
    removeWatermark();
    addFooter();

    // 定时检查
    const interval = setInterval(() => {
      removeWatermark();
      if (!document.getElementById('custom-footer')) {
        addFooter();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="zh-CN" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
