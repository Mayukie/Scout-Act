import q1 from './q1'
import q2 from './q2'
import q3 from './q3'
import scoutAct from './scout_act_2551.json'
import type { ChoiceKey } from '@/types'

const lawTextMap: Record<number, string> = {}
for (const s of scoutAct.sections) {
  const text = s.text.replace(/^##\s+มาตรา\s+[๐-๙\d]+\s*\n+/, '').trim()
  lawTextMap[parseInt(s.section)] = text
}

export type Question = {
  id: number
  chapter: string
  section: string
  question: string
  choices: Record<ChoiceKey, string>
  answer: ChoiceKey
  explanation: string
  reference: string
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

function thaiToInt(s: string): number {
  const map: Record<string, string> = {
    '๐':'0','๑':'1','๒':'2','๓':'3','๔':'4',
    '๕':'5','๖':'6','๗':'7','๘':'8','๙':'9',
  }
  return parseInt(s.split('').map(c => map[c] ?? c).join('')) || 0
}

export function sectionToInt(section: string): number {
  const m = section.match(/มาตรา\s*([๐-๙\d]+)/)
  return m ? thaiToInt(m[1]) : 0
}

export function generateExam(): Question[] {
  const result: Question[] = []
  let nextId = 1

  for (const [chapter, count] of Object.entries(EXAM_QUOTA)) {
    const pool = questionBank.filter(q => q.chapter === chapter)
    const picked = shuffle(pool).slice(0, count)
    for (const q of picked) {
      const fullText = lawTextMap[sectionToInt(q.section)]
      result.push({ ...q, id: nextId++, reference: fullText || q.reference })
    }
  }

  return result
}

export function generateScopedExam(from: number, to: number): Question[] {
  const pool = questionBank.filter(q => {
    const n = sectionToInt(q.section)
    return n >= from && n <= to
  })
  return shuffle(pool).slice(0, 15).map((q, i) => {
    const fullText = lawTextMap[sectionToInt(q.section)]
    return { ...q, id: i + 1, reference: fullText || q.reference }
  })
}
