import q5 from './q5'
import scoutAct from './scout_act_2551.json'
import type { ChoiceKey } from '@/types'

function cleanLawText(raw: string): string {
  return raw
    .replace(/^##\s+มาตรา\s+[๐-๙\d]+\s*\n+/, '')   // strip ## มาตรา N header
    .split('\n')
    .filter(line => {
      const t = line.trim()
      return t !== '' && !t.startsWith('*') && t !== '---' && !t.startsWith('###') && !t.startsWith('####')
    })
    .join('\n')
    .trim()
}

const lawTextMap: Record<number, string> = {}
for (const s of scoutAct.sections) {
  lawTextMap[parseInt(s.section)] = cleanLawText(s.text)
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

export const questionBank: Question[] = [...q5].map((q, i) => ({
  ...q,
  id: i + 1,
  originalId: i + 1,
  reference: lawTextMap[sectionToInt(q.section)] || q.reference,
}))

export const EXAM_QUOTA: Record<string, number> = {
  'หมวด ๑': 2,
  'หมวด ๒': 4,
  'หมวด ๓': 2,
  'หมวด ๔': 1,
  'หมวด ๕': 3,
  'บทกำหนดโทษ': 1,
  'บทเฉพาะกาล': 2,
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

export function generateExam(exclude: Set<number> = new Set()): Question[] {
  const result: Question[] = []
  let nextId = 1

  for (const [chapter, count] of Object.entries(EXAM_QUOTA)) {
    const all = questionBank.filter(q => q.chapter === chapter)
    const fresh = all.filter(q => !exclude.has(q.originalId))
    const pool = fresh.length >= count ? fresh : all
    const picked = shuffle(pool).slice(0, count)
    for (const q of picked) {
      result.push({ ...q, id: nextId++ })
    }
  }

  return result
}

export function generateScopedExam(from: number, to: number, exclude: Set<number> = new Set()): Question[] {
  const all = questionBank.filter(q => {
    const n = sectionToInt(q.section)
    return n >= from && n <= to
  })
  const fresh = all.filter(q => !exclude.has(q.originalId))
  const pool = fresh.length >= 15 ? fresh : all
  return shuffle(pool).slice(0, 15).map((q, i) => ({ ...q, id: i + 1 }))
}
