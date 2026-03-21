'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AnsweredQuestion } from '@/types'

interface ResultData {
  results: AnsweredQuestion[]
  score: number
  total: number
}

function getLevel(pct: number) {
  if (pct >= 90) return { label: 'ผ่านด้วยเกียรตินิยม', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', emoji: '🏆' }
  if (pct >= 75) return { label: 'ผ่าน', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-300', emoji: '✅' }
  if (pct >= 60) return { label: 'ผ่านปานกลาง', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-300', emoji: '📘' }
  return { label: 'ไม่ผ่าน — ควรทบทวนเนื้อหา', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-300', emoji: '📖' }
}

export default function ResultPage() {
  const router = useRouter()
  const [data, setData] = useState<ResultData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('examResults')
    if (!raw) { router.replace('/'); return }
    setData(JSON.parse(raw))
  }, [router])

  const newExam = async () => {
    const res = await fetch('/api/questions')
    const json = await res.json()
    sessionStorage.setItem('examQuestions', JSON.stringify(json.questions))
    sessionStorage.removeItem('examResults')
    router.push('/exam')
  }

  if (!data) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500">กำลังโหลด...</p>
    </main>
  )

  const pct = Math.round((data.score / data.total) * 100)
  const level = getLevel(pct)
  const wrong = data.results.filter((r) => !r.isCorrect)

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-xl space-y-5">

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center space-y-3">
          <p className="text-slate-500 font-medium">ผลการสอบพระราชบัญญัติลูกเสือ</p>
          <div className="text-6xl font-bold text-indigo-600">{data.score}<span className="text-3xl text-slate-400">/{data.total}</span></div>
          <p className="text-slate-500">{pct}%</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${level.bg} ${level.border} ${level.color} font-semibold`}>
            <span>{level.emoji}</span>
            <span>{level.label}</span>
          </div>
        </div>

        {/* Wrong answers */}
        {wrong.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <h2 className="font-bold text-slate-700">ข้อที่ตอบผิด ({wrong.length} ข้อ)</h2>
            {wrong.map((r, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-700">{r.question}</p>
                <p className="text-sm text-red-600">
                  คำตอบของคุณ: <span className="font-semibold">{r.userAnswer}. {r.choices[r.userAnswer]}</span>
                </p>
                <p className="text-sm text-green-700">
                  คำตอบที่ถูก: <span className="font-semibold">{r.answer}. {r.choices[r.answer]}</span>
                </p>
                <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2 leading-relaxed">{r.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {wrong.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center text-green-700 font-semibold">
            🎉 ตอบถูกทุกข้อ! ยอดเยี่ยมมาก
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={newExam}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            สร้างข้อสอบใหม่
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition-colors"
          >
            หน้าแรก
          </button>
        </div>
      </div>
    </main>
  )
}
