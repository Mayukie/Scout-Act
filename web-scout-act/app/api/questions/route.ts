import { NextResponse, type NextRequest } from 'next/server'
import { generateExam, generateScopedExam } from '@/lib/questionBank'

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get('from')
  const to = request.nextUrl.searchParams.get('to')

  if (from && to) {
    const questions = generateScopedExam(parseInt(from), parseInt(to))
    return NextResponse.json({ questions })
  }

  return NextResponse.json({ questions: generateExam() })
}
