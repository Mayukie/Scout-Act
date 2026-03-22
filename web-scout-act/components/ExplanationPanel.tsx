interface Props {
  isCorrect: boolean
  correctChoiceKey: string
  correctChoiceText: string
  explanation: string
  section: string
  chapter: string
}

export default function ExplanationPanel({ isCorrect, correctChoiceKey, correctChoiceText, explanation, section, chapter }: Props) {
  return (
    <div className={`rounded-xl p-4 space-y-3 border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
      <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
        {isCorrect ? '✓ ถูกต้อง!' : `✗ ผิด — คำตอบที่ถูกต้องคือ ${correctChoiceKey}. ${correctChoiceText}`}
      </p>

      {!isCorrect && (
        <div className="bg-red-100 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{chapter}</span>
          <span className="text-xs font-semibold text-slate-600">{section}</span>
        </div>
      )}

      <div className="bg-white rounded-lg p-3 space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">📖 {isCorrect ? 'คำอธิบาย' : 'ข้อความอ้างอิงในกฎหมาย'}</p>
        <p className="text-slate-700 leading-relaxed">{explanation}</p>
        {isCorrect && (
          <p className="text-xs text-indigo-600 font-medium mt-1">อ้างอิง: {section}</p>
        )}
      </div>
    </div>
  )
}
