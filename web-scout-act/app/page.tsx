'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fromSection, setFromSection] = useState(1)
  const [toSection, setToSection] = useState(60)

  const isScoped = fromSection !== 1 || toSection !== 60

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 max-w-sm w-full text-center space-y-6">
        {/* Nav menu */}
        <div className="flex gap-2 justify-center">
          <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-semibold">สอบ</span>
          <Link href="/law" className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-colors">อ่านกฎหมาย</Link>
        </div>

        <div>
          <div className="text-5xl mb-3">⚜️</div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">แบบทดสอบ</h1>
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1 leading-snug">
            พระราชบัญญัติลูกเสือ<br />พ.ศ. ๒๕๕๑
          </h2>
        </div>

        {/* มาตรา range selector */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-3 text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">ขอบเขตมาตรา (๑–๖๐)</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">ตั้งแต่มาตรา</label>
              <input
                type="number"
                min={1}
                max={60}
                value={fromSection}
                onChange={e => setFromSection(Math.min(60, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              />
            </div>
            <span className="text-slate-400 dark:text-slate-500 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">ถึงมาตรา</label>
              <input
                type="number"
                min={1}
                max={60}
                value={toSection}
                onChange={e => setToSection(Math.min(60, Math.max(1, Number(e.target.value) || 60)))}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              />
            </div>
          </div>
          {isScoped && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              สอบเฉพาะมาตรา {fromSection}–{toSection}
            </p>
          )}
          {!isScoped && (
            <p className="text-xs text-slate-400 dark:text-slate-500">ครอบคลุมทุกมาตรา (๑–๖๐)</p>
          )}
        </div>

        {/* Exam info */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-2 text-left">
          <div className="flex items-center gap-2"><span>📋</span><span>จำนวน <strong>15 ข้อ</strong></span></div>
          <div className="flex items-center gap-2"><span>🔤</span><span>ปรนัย <strong>ก / ข / ค / ง</strong></span></div>
          <div className="flex items-center gap-2"><span>💡</span><span>มีคำอธิบายทุกข้อ</span></div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-60 text-lg"
        >
          {loading ? 'กำลังโหลดข้อสอบ...' : 'เริ่มสอบ'}
        </button>
      </div>
    </main>
  )
}
