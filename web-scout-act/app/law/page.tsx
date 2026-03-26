import Link from 'next/link'
import scoutActData from '@/lib/scout_act_2551.json'

function renderSection(text: string) {
  return text.split('\n').map((line, i) => {
    const t = line.trim()
    if (t === '' || t === '---') return null
    if (t.startsWith('*') && t.endsWith('*')) return null
    if (t.startsWith('#### ')) return (
      <p key={i} className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-4">{t.slice(5)}</p>
    )
    if (t.startsWith('### ')) return (
      <div key={i} className="mt-8 mb-2 pb-1 border-b border-indigo-100 dark:border-indigo-900">
        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">{t.slice(4)}</span>
      </div>
    )
    if (t.startsWith('## ')) return (
      <h2 key={i} className="text-base font-bold text-slate-800 dark:text-slate-100 mt-6 mb-1">{t.slice(3)}</h2>
    )
    return <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">{t}</p>
  })
}

export default function LawPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">← กลับ</Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">ฉบับเต็ม ๖๐ มาตรา</p>
          </div>
          <Link href="/" className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-colors">สอบ</Link>
        </div>

        {/* Law content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="space-y-1">
            {scoutActData.sections.map(s => (
              <div key={s.section} id={`s${s.section}`}>
                {renderSection(s.text)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
