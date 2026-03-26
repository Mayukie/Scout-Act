'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-base"
      aria-label="toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
