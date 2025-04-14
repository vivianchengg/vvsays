'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ThemeRegistry from '../theme/ThemeRegistry';
import '@fontsource/playfair-display/900-italic.css';
import '@fontsource/karla/500.css';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
