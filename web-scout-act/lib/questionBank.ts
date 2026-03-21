import q1 from './q1'
import q2 from './q2'
import q3 from './q3'
import type { ChoiceKey } from '@/types'

export type Question = {
  id: number
  chapter: string
  section: string
  question: string
  choices: Record<ChoiceKey, string>
  answer: ChoiceKey
  explanation: string
}

export const questionBank: Question[] = [...q1, ...q2, ...q3].map((q, i) => ({ ...q, id: i + 1 }))

export const EXAM_QUOTA: Record<string, number> = {
  'หมวด ๑': 2,
  'หมวด ๒': 5,
  'หมวด ๓': 2,
  'หมวด ๔': 1,
  'หมวด ๕': 2,
  'หมวด ๖': 1,
  'หมวด ๗': 1,
  'บทเฉพาะกาล': 1,
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateExam(): Question[] {
  const result: Question[] = []
  let nextId = 1

  for (const [chapter, count] of Object.entries(EXAM_QUOTA)) {
    const pool = questionBank.filter(q => q.chapter === chapter)
    const picked = shuffle(pool).slice(0, count)
    for (const q of picked) {
      result.push({ ...q, id: nextId++ })
    }
  }

  return result
}
