import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Document Processor Agent',
  description: 'AI Agent-powered document processing with EdgeOne sandbox',
};

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 客户端注入CSS + 自动删除水印DOM
  useEffect(() => {
    // 注入隐藏水印的样式
    const injectStyle = document.createElement('style');
    injectStyle.textContent = `
      div#edgeone-watermark {
        all: unset !important;
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
      }
      body::after {
        content: "一叶知秋 | 项目演示yztcf.de5.net";
        position: fixed;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: #666;
        z-index: 99999;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(injectStyle);

    // 循环检测并删除水印DOM
    const removeMarkTimer = setInterval(() => {
      const watermarkDom = document.getElementById('edgeone-watermark');
      if (watermarkDom) {
        watermarkDom.remove();
        clearInterval(removeMarkTimer);
      }
    }, 100);

    // 组件卸载清理
    return () => {
      clearInterval(removeMarkTimer);
      injectStyle.remove();
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
