'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ThemeRegistry from '../theme/ThemeRegistry';
import '@fontsource/karla/500.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>
          @import url(&#39;https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap&#39;);
        </style>
      </head>
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
