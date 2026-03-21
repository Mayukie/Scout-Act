import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const ExamSchema = z.object({
  questions: z.array(z.object({
    chapter: z.string(),
    section: z.string(),
    question: z.string(),
    choices: z.object({
      ก: z.string(),
      ข: z.string(),
      ค: z.string(),
      ง: z.string(),
    }),
    answer: z.enum(['ก', 'ข', 'ค', 'ง']),
    explanation: z.string(),
  })),
})

const client = new Anthropic()

let cachedContext: string | null = null
function getContext(): string {
  if (!cachedContext) {
    const contextPath = path.join(process.cwd(), '..', 'context', 'scout_act_2551.md')
    cachedContext = fs.readFileSync(contextPath, 'utf-8')
  }
  return cachedContext
}

export async function GET() {
  try {
    const context = getContext()

    const response = await client.messages.parse({
      model: 'claude-opus-4-6',
      max_tokens: 8000,
      system: 'You are an expert on Thai law, specifically the Scout Act B.E. 2551 (พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑). Generate exam questions strictly based on the provided law text.',
      messages: [{
        role: 'user',
        content: `Generate exactly 15 multiple choice exam questions in Thai based on this Scout Act.

Distribution:
- หมวด ๑ บททั่วไป: 2 questions
- หมวด ๒ การปกครอง: 5 questions
- หมวด ๓ การจัดกลุ่ม ประเภท และชั้นลูกเสือ: 2 questions
- หมวด ๔ เครื่องแบบและเครื่องหมายลูกเสือ: 1 question
- หมวด ๕ เครื่องราชอิสริยาภรณ์และการตอบแทนความดีความชอบ: 2 questions
- หมวด ๖ เครื่องหมายลูกเสือโลก: 1 question
- หมวด ๗ บทกำหนดโทษ: 1 question
- บทเฉพาะกาล: 1 question

Rules:
- All question text, choices, and explanations must be in Thai
- Each question has exactly 4 choices: ก, ข, ค, ง
- Questions must be factual and directly supported by the law text
- "section" field: specific มาตรา reference (e.g., "มาตรา ๑๒")
- "chapter" field: หมวด name (e.g., "หมวด ๒")
- "explanation" field: cite the relevant มาตรา to explain the correct answer
- Mix question types: definitions, numbers/quotas, procedures, penalties, membership rules
- Generate DIFFERENT questions each time — randomly vary which มาตรา and which facts you test

Scout Act text:
${context}`,
      }],
      output_config: {
        format: zodOutputFormat(ExamSchema),
      },
    })

    if (!response.parsed_output) {
      return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อสอบ' }, { status: 500 })
    }

    const questions = response.parsed_output.questions
      .slice(0, 15)
      .map((q, i) => ({ ...q, id: i + 1 }))

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Question generation error:', error)
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อสอบ กรุณาลองใหม่' }, { status: 500 })
  }
}
