import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Document Processor Agent',
  description: 'AI Agent-powered document processing with EdgeOne sandbox',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen overflow-hidden antialiased">
        <I18nProvider>{children}</I18nProvider>
        <Script id="remove-watermark" strategy="afterInteractive">
          {`
            // 删除水印
            document.getElementById('edgeone-watermark')?.remove();

            // 添加底部文字
            const old = document.getElementById('custom-footer');
            if (old) old.remove();

            const footer = document.createElement('div');
            footer.id = 'custom-footer';
            footer.textContent = '一叶知秋 | 项目演示yztcf.de5.net';
            footer.style.cssText = \`
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
            \`;
            document.body.appendChild(footer);
          `}
        </Script>
      </body>
    </html>
  );
}
