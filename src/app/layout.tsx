import 'modern-normalize/modern-normalize.css';
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Provider from 'src/store/Provider';
import Navbar from 'components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce Dashboard',
  description: 'A dashboard for E-Commerce',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
