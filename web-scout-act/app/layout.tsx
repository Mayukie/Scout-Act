import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'แบบทดสอบพระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑',
  description: 'ทดสอบความรู้พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${sarabun.variable} font-sans antialiased bg-slate-50`}>
        {children}
        <footer className="text-center text-xs text-slate-400 py-4">v1.0</footer>
      </body>
    </html>
  )
}
