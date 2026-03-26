'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/', label: 'สอบ', icon: '📝' },
  { href: '/law', label: 'กฎหมาย', icon: '📖' },
  { href: '/map', label: 'แผนผัง', icon: '🗺️' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex z-40">
      {TABS.map(({ href, label, icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center gap-0.5 py-3 pb-6 text-xs font-semibold transition-colors ${
              active
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <span className="text-2xl leading-none">{icon}</span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
