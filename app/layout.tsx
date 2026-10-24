import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VELNOR7 | Crafted for Cold',
  description: 'VELNOR7 winter knitwear and coats, made in Bangladesh. Cash on delivery across Bangladesh.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
