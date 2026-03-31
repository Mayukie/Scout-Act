interface Props {
  current: number
  total: number
  score: number
  timeLeft: number  // seconds remaining
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ProgressBar({ current, total, score, timeLeft }: Props) {
  const pct = Math.round((current / total) * 100)
  const timerColor =
    timeLeft <= 60
      ? 'text-red-600 dark:text-red-400'
      : timeLeft <= 300
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-slate-600 dark:text-slate-400'

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
        <span>ข้อที่ {current} / {total}</span>
        <span className={`font-mono font-bold ${timerColor}`}>{formatTime(timeLeft)}</span>
        <span>คะแนน: {score} ข้อ</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
