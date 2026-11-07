import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VELNOR7 | Crafted for Cold',
  description: 'VELNOR7 winter knitwear and coats, made in Bangladesh. Cash on delivery across Bangladesh.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'VELNOR7 | Crafted for Cold',
    description: 'VELNOR7 winter knitwear and coats, made in Bangladesh. Cash on delivery across Bangladesh.',
    images: [
      {
        url: 'https://www.velnor7.com/img/plain-belted-coat/camel/studio.webp?v=20261021',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELNOR7 | Crafted for Cold',
    description: 'VELNOR7 winter knitwear and coats, made in Bangladesh. Cash on delivery across Bangladesh.',
    images: [
      {
        url: 'https://www.velnor7.com/img/plain-belted-coat/camel/studio.webp?v=20261021',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
