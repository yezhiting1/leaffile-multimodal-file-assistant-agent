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
    const removeAllWatermarks = () => {
      const el1 = document.getElementById('edgeone-watermark');
      if (el1) el1.remove();

      const els = document.querySelectorAll([
        '[id*="edgeone"]',
        '[id*="watermark"]',
        '[class*="edgeone"]',
        '[class*="watermark"]',
        'div[style*="background-image: linear-gradient"]',
        'div[style*="rgba(0, 0, 0, 0.8)"]'
      ].join(','));
      
      els.forEach(el => {
        if (el.textContent?.includes('For demonstration') || 
            el.textContent?.includes('testing purposes')) {
          el.remove();
        }
      });
    };

    // 添加自定义底部文字
    const addFooter = () => {
      // 检查是否已存在，避免重复添加
      if (document.getElementById('custom-footer')) return;
      
      const footer = document.createElement('div');
      footer.id = 'custom-footer';
      footer.textContent = '一叶知秋 | 项目演示yztcf.de5.net';
      Object.assign(footer.style, {
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '13px',
        color: '#666',
        zIndex: '99999',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      });
      document.body.appendChild(footer);
    };

    // 执行
    removeAllWatermarks();
    addFooter();

    // 持续监控
    const interval = setInterval(() => {
      removeAllWatermarks();
      // 如果底部文字被删了，重新添加
      if (!document.getElementById('custom-footer')) {
        addFooter();
      }
    }, 500);

    const observer = new MutationObserver(() => {
      removeAllWatermarks();
    });
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true 
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <html lang="zh-CN" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
