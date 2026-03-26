import BottomNav from '@/components/BottomNav'
import { MAP_CHAPTERS, KEY_CONNECTIONS, type ContentItem } from '@/lib/mapData'

// ─── rendering components ────────────────────────────────────────────────────

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-2 py-1 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
      <span className="shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500 w-12 mt-0.5">{label}</span>
      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{text}</span>
    </div>
  )
}

function Group({ title, color, facts }: { title: string; color: string; facts: string[] }) {
  return (
    <div className={`rounded-lg border-l-2 ${color} pl-3 py-2 mb-2 space-y-1`}>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{title}</p>
      {facts.map((f, i) => (
        <div key={i} className="flex items-start gap-2 py-0.5">
          <span className="shrink-0 text-indigo-400 mt-0.5">→</span>
          <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f}</span>
        </div>
      ))}
    </div>
  )
}

function Content({ items }: { items: ContentItem[] }) {
  return (
    <>
      {items.map((item, i) =>
        item.type === 'row'
          ? <Row key={i} label={item.label} text={item.text} />
          : <Group key={i} title={item.title} color={item.color} facts={item.facts} />
      )}
    </>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 pt-12 pb-4">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">แผนผังกฎหมาย</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑ — คลิกหมวดเพื่อขยาย</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-2">

        {/* Root node */}
        <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl px-5 py-4 text-center shadow-sm mb-4">
          <div className="text-2xl mb-1">⚜️</div>
          <p className="text-white font-bold text-base">พ.ร.บ.ลูกเสือ พ.ศ. ๒๕๕๑</p>
          <p className="text-indigo-200 text-xs mt-0.5">๗๔ มาตรา · ๕ หมวด · บทกำหนดโทษ · บทเฉพาะกาล</p>
        </div>

        {/* Chapter cards */}
        {MAP_CHAPTERS.map((ch) => (
          <details key={ch.id} className={`group rounded-xl border-l-4 ${ch.border} bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden`}>
            <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none list-none">
              <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${ch.badge}`}>{ch.range}</span>
              <span className={`flex-1 text-sm font-bold ${ch.text}`}>{ch.title}</span>
              {ch.keyFact && (
                <span className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 truncate max-w-[120px]">{ch.keyFact}</span>
              )}
              <span className="text-slate-400 text-xs transition-transform duration-200 group-open:rotate-90">▶</span>
            </summary>
            <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-700 space-y-1">
              <Content items={ch.content} />
            </div>
          </details>
        ))}

        {/* Key connections */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl px-4 py-3 space-y-2">
          <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">🔗 จุดเชื่อมสำคัญที่มักออกสอบ</p>
          <div className="space-y-1">
            {KEY_CONNECTIONS.map((fact, i) => (
              <div key={i} className="flex items-start gap-2 py-0.5">
                <span className="shrink-0 text-indigo-400 mt-0.5">→</span>
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{fact}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
    </main>
  )
}
