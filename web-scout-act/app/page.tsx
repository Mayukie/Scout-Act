'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fromRaw, setFromRaw] = useState('1')
  const [toRaw, setToRaw] = useState('74')

  const fromSection = Math.min(74, Math.max(1, parseInt(fromRaw) || 1))
  const toSection = Math.min(74, Math.max(1, parseInt(toRaw) || 74))
  const isScoped = fromSection !== 1 || toSection !== 74

  const startExam = async () => {
    if (fromSection > toSection) {
      setError('มาตราเริ่มต้นต้องน้อยกว่าหรือเท่ากับมาตราสิ้นสุด')
      return
    }
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (isScoped) {
        params.set('from', String(fromSection))
        params.set('to', String(toSection))
      }
      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      sessionStorage.setItem('examQuestions', JSON.stringify(data.questions))
      router.push('/exam')
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col pb-24">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 pt-12 pb-8 text-center">
        <div className="text-5xl mb-3">⚜️</div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">แบบทดสอบ</h1>
        <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
          พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 space-y-4 max-w-lg mx-auto w-full">

        {/* มาตรา range selector */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-4">ขอบเขตมาตรา (๑–๗๔)</p>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">ตั้งแต่มาตรา</label>
              <input
                type="number"
                min={1}
                max={74}
                value={fromRaw}
                onChange={e => setFromRaw(e.target.value)}
                onBlur={() => setFromRaw(String(fromSection))}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-3 text-base text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              />
            </div>
            <span className="text-slate-300 dark:text-slate-600 pb-3 text-lg">—</span>
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">ถึงมาตรา</label>
              <input
                type="number"
                min={1}
                max={74}
                value={toRaw}
                onChange={e => setToRaw(e.target.value)}
                onBlur={() => setToRaw(String(toSection))}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-3 text-base text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              />
            </div>
          </div>
          <p className="text-xs mt-3 font-medium">
            {isScoped
              ? <span className="text-indigo-600 dark:text-indigo-400">สอบเฉพาะมาตรา {fromSection}–{toSection}</span>
              : <span className="text-slate-400 dark:text-slate-500">ครอบคลุมทุกมาตรา (๑–๗๔)</span>
            }
          </p>
        </div>

        {/* Exam info */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 p-5 space-y-2">
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="text-lg">📋</span><span>จำนวน <strong>15 ข้อ</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="text-lg">🔤</span><span>ปรนัย <strong>ก / ข / ค / ง</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="text-lg">💡</span><span>มีคำอธิบายทุกข้อ</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-4 rounded-2xl text-lg transition-colors disabled:opacity-60"
        >
          {loading ? 'กำลังโหลดข้อสอบ...' : 'เริ่มสอบ'}
        </button>

      </div>

      <BottomNav />
    </main>
  )
}
