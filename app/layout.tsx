import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ForkForms - Beautiful Forms for Next.js',
  description: 'Beautiful, ready-to-use form components for Next.js. Just run one command and add stunning forms to your project instantly.',
  keywords: 'Next.js, React, Forms, Components, TypeScript',
  authors: [{ name: 'ForkForms Team' }],
  openGraph: {
    title: 'ForkForms - Beautiful Forms for Next.js',
    description: 'Beautiful, ready-to-use form components for Next.js. Just run one command and add stunning forms to your project instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ForkForms - Beautiful Forms for Next.js',
    description: 'Beautiful, ready-to-use form components for Next.js. Just run one command and add stunning forms to your project instantly.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
