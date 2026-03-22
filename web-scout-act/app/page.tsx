'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 max-w-sm w-full text-center space-y-6">
        <div>
          <div className="text-5xl mb-3">⚜️</div>
          <h1 className="text-2xl font-bold text-slate-800">แบบทดสอบ</h1>
          <h2 className="text-base font-semibold text-indigo-600 mt-1 leading-snug">
            พระราชบัญญัติลูกเสือ<br />พ.ศ. ๒๕๕๑
          </h2>
        </div>

        {/* มาตรา range selector */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-left">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">ขอบเขตมาตรา (๑–๖๐)</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">ตั้งแต่มาตรา</label>
              <input
                type="number"
                min={1}
                max={60}
                value={fromSection}
                onChange={e => setFromSection(Math.min(60, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <span className="text-slate-400 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">ถึงมาตรา</label>
              <input
                type="number"
                min={1}
                max={60}
                value={toSection}
                onChange={e => setToSection(Math.min(60, Math.max(1, Number(e.target.value) || 60)))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
          {isScoped && (
            <p className="text-xs text-indigo-600 font-medium">
              สอบเฉพาะมาตรา {fromSection}–{toSection}
            </p>
          )}
          {!isScoped && (
            <p className="text-xs text-slate-400">ครอบคลุมทุกมาตรา (๑–๖๐)</p>
          )}
        </div>

        {/* Exam info */}
        <div className="bg-indigo-50 rounded-xl p-4 text-sm text-slate-600 space-y-2 text-left">
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
