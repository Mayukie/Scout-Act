'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AnsweredQuestion } from '@/types'
import { addMastered, getMastered, clearMastered } from '@/lib/masteredQuestions'

interface ResultData {
  results: AnsweredQuestion[]
  score: number
  total: number
}

function getLevel(pct: number) {
  if (pct >= 90) return { label: 'ผ่านด้วยเกียรตินิยม', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-300 dark:border-yellow-700', emoji: '🏆' }
  if (pct >= 75) return { label: 'ผ่าน', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-300 dark:border-green-700', emoji: '✅' }
  if (pct >= 60) return { label: 'ผ่านปานกลาง', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300 dark:border-blue-700', emoji: '📘' }
  return { label: 'ไม่ผ่าน — ควรทบทวนเนื้อหา', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300 dark:border-red-700', emoji: '📖' }
}

export default function ResultPage() {
  const router = useRouter()
  const [data, setData] = useState<ResultData | null>(null)
  const [totalMastered, setTotalMastered] = useState(0)

  useEffect(() => {
    const raw = sessionStorage.getItem('examResults')
    if (!raw) { router.replace('/'); return }
    const parsed: ResultData = JSON.parse(raw)
    setData(parsed)
    const correctIds = parsed.results
      .filter(r => r.isCorrect)
      .map(r => r.originalId)
    if (correctIds.length > 0) addMastered(correctIds)
    setTotalMastered(getMastered().size)
  }, [router])

  const newExam = async () => {
    const mastered = getMastered()
    const params = mastered.size > 0 ? `?exclude=${[...mastered].join(',')}` : ''
    const res = await fetch(`/api/questions${params}`)
    const json = await res.json()
    sessionStorage.setItem('examQuestions', JSON.stringify(json.questions))
    sessionStorage.removeItem('examResults')
    router.push('/exam')
  }

  if (!data) return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <p className="text-slate-500 dark:text-slate-400">กำลังโหลด...</p>
    </main>
  )

  const pct = Math.round((data.score / data.total) * 100)
  const level = getLevel(pct)
  const wrong = data.results.filter((r) => !r.isCorrect)

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <div className="w-full max-w-xl mx-auto px-4 pt-6 pb-10 space-y-5 flex-1">

        {/* Score card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 text-center space-y-3">
          <p className="text-slate-500 dark:text-slate-400 font-medium">ผลการสอบพระราชบัญญัติลูกเสือ</p>
          <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">{data.score}<span className="text-3xl text-slate-400 dark:text-slate-500">/{data.total}</span></div>
          <p className="text-slate-500 dark:text-slate-400">{pct}%</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${level.bg} ${level.border} ${level.color} font-semibold`}>
            <span>{level.emoji}</span>
            <span>{level.label}</span>
          </div>
          {totalMastered > 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
              ข้อที่ตอบถูกสะสม <span className="font-semibold text-indigo-500 dark:text-indigo-400">{totalMastered} ข้อ</span> — จะไม่ซ้ำในรอบถัดไป
            </p>
          )}
        </div>

        {/* Wrong answers */}
        {wrong.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 space-y-4">
            <h2 className="font-bold text-slate-700 dark:text-slate-200">ข้อที่ตอบผิด ({wrong.length} ข้อ)</h2>
            {wrong.map((r, i) => (
              <div key={i} className="border border-slate-100 dark:border-slate-700 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{r.question}</p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  คำตอบของคุณ: <span className="font-semibold">{r.userAnswer}. {r.choices[r.userAnswer]}</span>
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  คำตอบที่ถูก: <span className="font-semibold">{r.answer}. {r.choices[r.answer]}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 rounded-lg p-2 leading-relaxed">{r.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {wrong.length === 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 text-center text-green-700 dark:text-green-400 font-semibold">
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
            className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl transition-colors"
          >
            หน้าแรก
          </button>
        </div>

        {/* Reset mastered */}
        {totalMastered > 0 && (
          <button
            onClick={() => { clearMastered(); setTotalMastered(0) }}
            className="w-full border border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            รีเซ็ตข้อที่ตอบถูกทั้งหมด ({totalMastered} ข้อ)
          </button>
        )}
      </div>
    </main>
  )
}
