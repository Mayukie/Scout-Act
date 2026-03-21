interface Props {
  current: number
  total: number
  score: number
}

export default function ProgressBar({ current, total, score }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>ข้อที่ {current} / {total}</span>
        <span>คะแนน: {score} ข้อ</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div
          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
