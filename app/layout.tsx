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
    // 暴力删除所有可能的水印
    const removeAllWatermarks = () => {
      // 方法1：通过 ID
      const el1 = document.getElementById('edgeone-watermark');
      if (el1) el1.remove();

      // 方法2：通过属性选择器
      const els = document.querySelectorAll([
        '[id*="edgeone"]',
        '[id*="watermark"]',
        '[class*="edgeone"]',
        '[class*="watermark"]',
        'div[style*="background-image: linear-gradient"]',
        'div[style*="rgba(0, 0, 0, 0.8)"]'
      ].join(','));
      
      els.forEach(el => {
        // 额外检查是否包含水印文本
        if (el.textContent?.includes('For demonstration') || 
            el.textContent?.includes('testing purposes')) {
          el.remove();
        }
      });
    };

    // 立即执行
    removeAllWatermarks();

    // 每 500ms 检查一次，持续清除
    const interval = setInterval(removeAllWatermarks, 500);

    // 用 MutationObserver 监听变化
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
