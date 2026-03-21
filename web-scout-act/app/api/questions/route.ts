import { NextResponse } from 'next/server'
import { generateExam } from '@/lib/questionBank'

export async function GET() {
  const questions = generateExam()
  return NextResponse.json({ questions })
}
