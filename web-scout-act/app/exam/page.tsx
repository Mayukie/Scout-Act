'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Question, ChoiceKey, AnsweredQuestion } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import ChoiceButton from '@/components/ChoiceButton'
import ExplanationPanel from '@/components/ExplanationPanel'

const CHOICES: ChoiceKey[] = ['ก', 'ข', 'ค', 'ง']

export default function ExamPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<ChoiceKey | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<AnsweredQuestion[]>([])
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('examQuestions')
    if (!raw) { router.replace('/'); return }
    setQuestions(JSON.parse(raw))
  }, [router])

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">กำลังโหลด...</p>
      </main>
    )
  }

  const q = questions[index]
  const isLast = index === questions.length - 1

  const handleSelect = (key: ChoiceKey) => {
    if (answered) return
    const correct = key === q.answer
    setSelected(key)
    setAnswered(true)
    if (correct) setScore((s) => s + 1)
    setResults((r) => [...r, { ...q, userAnswer: key, isCorrect: correct }])
  }

  const handleNext = () => {
    if (isLast) {
      const finalResults = [...results]
      const finalScore = finalResults.filter((r) => r.isCorrect).length
      sessionStorage.setItem('examResults', JSON.stringify({
        results: finalResults,
        score: finalScore,
        total: questions.length,
      }))
      router.push('/exam/result')
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
      setShowHint(false)
    }
  }

  const getChoiceState = (key: ChoiceKey) => {
    if (!answered) return 'idle'
    if (key === q.answer && key === selected) return 'correct'
    if (key === selected && key !== q.answer) return 'wrong'
    if (key === q.answer) return 'reveal'
    return 'dimmed'
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Progress */}
        <ProgressBar current={index + 1} total={questions.length} score={score} />

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          {/* Question + hint toggle */}
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-semibold text-slate-800 leading-relaxed flex-1">{q.question}</p>
            <button
              onClick={() => setShowHint((h) => !h)}
              title="ดูคำใบ้ (หมวด / มาตรา)"
              className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ?
            </button>
          </div>
          {showHint && (
            <div className="flex items-center gap-2 -mt-2">
              <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{q.chapter}</span>
              <span className="text-xs text-slate-400">{q.section}</span>
            </div>
          )}

          {/* Choices */}
          <div className="space-y-3">
            {CHOICES.map((key) => (
              <ChoiceButton
                key={key}
                choiceKey={key}
                text={q.choices[key]}
                state={getChoiceState(key)}
                onClick={() => handleSelect(key)}
                disabled={answered}
              />
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <ExplanationPanel
              isCorrect={selected === q.answer}
              correctChoiceKey={q.answer}
              correctChoiceText={q.choices[q.answer]}
              explanation={q.explanation}
              section={q.section}
              chapter={q.chapter}
              reference={q.reference}
            />
          )}

          {/* Next button */}
          {answered && (
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {isLast ? 'ดูผลการสอบ' : 'ข้อถัดไป →'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
