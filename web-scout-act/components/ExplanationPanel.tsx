interface Props {
  isCorrect: boolean
  correctChoiceKey: string
  correctChoiceText: string
  explanation: string
  section: string
  chapter: string
  reference: string
}

function HighlightedReference({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight || !text.includes(highlight)) {
    return <span>{text}</span>
  }
  const idx = text.indexOf(highlight)
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 font-bold rounded px-0.5">{highlight}</mark>
      {text.slice(idx + highlight.length)}
    </>
  )
}

export default function ExplanationPanel({ isCorrect, correctChoiceKey, correctChoiceText, explanation, section, chapter, reference }: Props) {
  return (
    <div className={`rounded-xl p-4 space-y-3 border-l-4 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
      <p className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
        {isCorrect ? '✓ ถูกต้อง!' : `✗ ผิด — คำตอบที่ถูกต้องคือ ${correctChoiceKey}. ${correctChoiceText}`}
      </p>

      {!isCorrect && (
        <div className="bg-red-100 dark:bg-red-900/30 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">{chapter}</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{section}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-700 rounded-lg p-3 space-y-1">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">📖 {isCorrect ? 'คำอธิบาย' : 'ข้อความอ้างอิงในกฎหมาย'}</p>
        {isCorrect ? (
          <>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{explanation}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">อ้างอิง: {section}</p>
          </>
        ) : (
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            <HighlightedReference text={reference} highlight={correctChoiceText} />
          </p>
        )}
      </div>
    </div>
  )
}
