export type ChoiceKey = 'ก' | 'ข' | 'ค' | 'ง'

export interface Question {
  id: number
  originalId: number
  chapter: string
  section: string
  question: string
  choices: Record<ChoiceKey, string>
  answer: ChoiceKey
  explanation: string
  reference: string
}

export interface AnsweredQuestion extends Question {
  userAnswer: ChoiceKey
  isCorrect: boolean
}
