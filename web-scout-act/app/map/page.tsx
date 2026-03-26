'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import { MAP_CHAPTERS, KEY_CONNECTIONS, type ChapterData, type ContentItem } from '@/lib/mapData'

// ─── detail sub-components ────────────────────────────────────────────────────

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-2 py-1 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      <span className="shrink-0 text-xs font-bold text-slate-400 dark:text-slate-500 w-14 mt-0.5">{label}</span>
      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{text}</span>
    </div>
  )
}

function Group({ title, color, facts }: { title: string; color: string; facts: string[] }) {
  return (
    <div className={`rounded-lg border-l-2 ${color} pl-3 py-2 mb-2`}>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{title}</p>
      <div className="space-y-1">
        {facts.map((f, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <span className="shrink-0 text-slate-400 mt-0.5 text-xs">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BranchDetail({ items }: { items: ContentItem[] }) {
  return (
    <div className="py-2 space-y-1">
      {items.map((item, i) =>
        item.type === 'row'
          ? <Row key={i} label={item.label} text={item.text} />
          : <Group key={i} title={item.title} color={item.color} facts={item.facts} />
      )}
    </div>
  )
}

// ─── one brace branch ─────────────────────────────────────────────────────────

function Branch({ ch }: { ch: ChapterData }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-2 rounded-xl border-l-4 ${ch.border} border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-left active:opacity-70`}
      >
        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ch.badge} whitespace-nowrap`}>{ch.range}</span>
        <span className={`flex-1 text-xs font-semibold ${ch.text} leading-snug`}>{ch.title}</span>
        <span className={`shrink-0 text-slate-400 text-xs transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>▶</span>
      </button>
      {open && (
        <div className="mt-1 ml-1 pl-3 border-l border-dashed border-slate-200 dark:border-slate-600">
          <BranchDetail items={ch.content} />
        </div>
      )}
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 pt-12 pb-4">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">แผนผังกฎหมาย</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">พ.ร.บ.ลูกเสือ พ.ศ. ๒๕๕๑ — แผนผังวงเล็บ</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── Brace Map ─────────────────────────────────────── */}
        <div className="flex items-stretch">

          {/* Whole node */}
          <div className="w-20 shrink-0 flex items-center justify-center pr-1">
            <div className="w-full bg-indigo-600 dark:bg-indigo-700 rounded-xl px-2 py-5 text-center shadow-sm">
              <div className="text-2xl">⚜️</div>
              <p className="text-white font-bold text-xs mt-1.5 leading-tight">พ.ร.บ.</p>
              <p className="text-white font-bold text-xs leading-tight">ลูกเสือ</p>
              <p className="text-indigo-200 text-[10px] mt-1.5">พ.ศ. ๒๕๕๑</p>
              <p className="text-indigo-300 text-[10px]">๗๔ มาตรา</p>
            </div>
          </div>

          {/* Brace — [ shape (vertical bar left, opening right) */}
          <div className="w-5 shrink-0 flex flex-col self-stretch mx-0.5">
            <div className="flex-1 border-l-2 border-t-2 rounded-tl-2xl border-indigo-300 dark:border-indigo-500"></div>
            <div className="flex-1 border-l-2 border-b-2 rounded-bl-2xl border-indigo-300 dark:border-indigo-500"></div>
          </div>

          {/* Branch list */}
          <div className="flex-1 flex flex-col gap-2">
            {MAP_CHAPTERS.map((ch) => (
              <div key={ch.id} className="flex items-start gap-1">
                {/* Horizontal tick line */}
                <div className="shrink-0 mt-4 h-0.5 w-3 bg-indigo-200 dark:bg-indigo-700"></div>
                <div className="flex-1">
                  <Branch ch={ch} />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Key connections ────────────────────────────────── */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">จุดเชื่อมสำคัญที่มักออกสอบ</p>
          <div className="space-y-1.5">
            {KEY_CONNECTIONS.map((fact, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="shrink-0 text-indigo-400 mt-0.5 text-xs">•</span>
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
