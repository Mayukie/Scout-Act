import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'

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
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body className={`${sarabun.variable} font-sans antialiased bg-slate-50 dark:bg-slate-900 transition-colors`}>
        <ThemeProvider>
          {children}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
