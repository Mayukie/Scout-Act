import { NextResponse, type NextRequest } from 'next/server'
import { generateExam, generateScopedExam } from '@/lib/questionBank'

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get('from')
  const to = request.nextUrl.searchParams.get('to')
  const excludeParam = request.nextUrl.searchParams.get('exclude')

  const exclude = excludeParam
    ? new Set(excludeParam.split(',').map(Number).filter(Boolean))
    : new Set<number>()

  if (from && to) {
    return NextResponse.json({ questions: generateScopedExam(parseInt(from), parseInt(to), exclude) })
  }

  return NextResponse.json({ questions: generateExam(exclude) })
}
