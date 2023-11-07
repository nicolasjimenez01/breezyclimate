import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/common/layout'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BreezyClimate',
  description: 'Aplications for university',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Layout>
        {children}
        </Layout>
        <Toaster />
        
      </body>
    </html>
  )
}
