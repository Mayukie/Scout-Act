'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startExam = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/questions')
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

        <div className="bg-indigo-50 rounded-xl p-4 text-sm text-slate-600 space-y-2 text-left">
          <div className="flex items-center gap-2"><span>📋</span><span>จำนวน <strong>15 ข้อ</strong></span></div>
          <div className="flex items-center gap-2"><span>🔤</span><span>ปรนัย <strong>ก / ข / ค / ง</strong></span></div>
          <div className="flex items-center gap-2"><span>📚</span><span>ครอบคลุม<strong>ทุกหมวด</strong></span></div>
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
