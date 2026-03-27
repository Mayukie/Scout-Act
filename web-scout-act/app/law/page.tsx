import scoutActData from '@/lib/scout_act_2551.json'
import { keywordMap } from '@/lib/keywordSummary'
import { DIVIDERS_BEFORE } from '@/lib/lawStructure'
import BottomNav from '@/components/BottomNav'

function cleanLawText(raw: string): string {
  return raw
    .split('\n')
    .filter(line => {
      const t = line.trim()
      return (
        t !== '' &&
        t !== '---' &&
        !t.startsWith('##') &&
        !t.startsWith('###') &&
        !t.startsWith('####') &&
        !(t.startsWith('*') && t.endsWith('*'))
      )
    })
    .join('\n')
    .trim()
}

export default function LawPage() {
  const sections = scoutActData.sections.map(s => ({
    num: parseInt(s.section),
    text: cleanLawText(s.text),
    meta: keywordMap.get(parseInt(s.section)),
  }))

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 pt-12 pb-4">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">พระราชบัญญัติลูกเสือ พ.ศ. ๒๕๕๑</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ฉบับเต็ม ๗๔ มาตรา — คลิกมาตราเพื่อขยาย</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">

        {/* Sections grouped by chapter */}
        {sections.map(({ num, text, meta }) => (
          <div key={num}>
            {/* Chapter and sub-section dividers */}
            {DIVIDERS_BEFORE.get(num)?.map((d, di) =>
              d.kind === 'chapter' ? (
                /* หมวด header — indigo, prominent */
                <div key={di} className="mt-6 mb-2 flex items-center gap-3">
                  <div className="flex-1 h-px bg-indigo-200 dark:bg-indigo-800" />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide whitespace-nowrap">
                    {d.label}
                  </span>
                  <div className="flex-1 h-px bg-indigo-200 dark:bg-indigo-800" />
                </div>
              ) : (
                /* ส่วนที่ sub-header — slate, indented, subordinate */
                <div key={di} className="mt-2 mb-1 flex items-center gap-2 pl-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {d.label}
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                </div>
              )
            )}

            {/* Accordion item */}
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none list-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                {/* Section badge */}
                <span className="shrink-0 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full">
                  ม.{num}
                </span>
                {/* Title */}
                <span className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {meta?.title ?? `มาตรา ${num}`}
                </span>
                {/* Expand chevron */}
                <span className="text-slate-400 dark:text-slate-500 text-xs transition-transform group-open:rotate-90">▶</span>
              </summary>

              {/* Expanded content */}
              <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-700">

                {/* Law text */}
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{text}</p>

                {/* Keywords */}
                {meta && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mr-1">คำสำคัญ</span>
                      {meta.keywords.map((kw, i) => (
                        <span key={i} className="text-xs font-medium bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Mnemonic */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mr-1">💡 สูตรจำ:</span>
                      <span className="text-xs text-amber-800 dark:text-amber-300">{meta.mnemonic}</span>
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
        ))}

      </div>

      <BottomNav />
    </main>
  )
}
