'use client'

import { useState } from 'react'
import { MAP_CHAPTERS, KEY_CONNECTIONS, type ChapterData } from '@/lib/mapData'

// ── detail sub-components ─────────────────────────────────────────────────────

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

// ── brace { shape ─────────────────────────────────────────────────────────────
//
//  Built with CSS borders + a small center bump:
//
//    ╭──  upper arm (border-t + border-l + rounded-tl)
//    │
//  ◄ │    center bump (left-pointing triangle at 50%)
//    │
//    ╰──  lower arm (border-b + border-l + rounded-bl)

function BraceSymbol() {
  return (
    <div className="relative flex flex-col self-stretch w-5 shrink-0 mx-0.5">
      <div className="flex-1 border-l-2 border-t-2 rounded-tl-2xl border-indigo-300 dark:border-indigo-500" />
      {/* center bump */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[7px]
                      border-y-[5px] border-y-transparent
                      border-r-[6px] border-r-indigo-300 dark:border-r-indigo-500" />
      <div className="flex-1 border-l-2 border-b-2 rounded-bl-2xl border-indigo-300 dark:border-indigo-500" />
    </div>
  )
}

// ── single chapter branch ─────────────────────────────────────────────────────

function Branch({ ch }: { ch: ChapterData }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* tap target — min 44 px height for iOS */}
      <button
        onClick={() => setOpen(v => !v)}
        className={[
          'w-full flex items-center gap-2 rounded-xl border-l-4',
          ch.border,
          'border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-800',
          'px-3 py-3 text-left',
          'active:opacity-70 transition-opacity',
        ].join(' ')}
      >
        <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${ch.badge}`}>
          {ch.range}
        </span>
        <span className={`flex-1 text-xs font-semibold leading-snug ${ch.text}`}>
          {ch.title}
        </span>
        {ch.keyFact && (
          <span className="hidden sm:block text-[10px] text-slate-400 dark:text-slate-500 shrink-0 max-w-[80px] truncate">
            {ch.keyFact}
          </span>
        )}
        <span className={`shrink-0 text-slate-400 text-xs transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
          ▶
        </span>
      </button>

      {open && (
        <div className="mt-1 ml-1 pl-3 border-l border-dashed border-slate-200 dark:border-slate-600 pb-1">
          {ch.content.map((item, i) =>
            item.type === 'row'
              ? <Row key={i} label={item.label} text={item.text} />
              : <Group key={i} title={item.title} color={item.color} facts={item.facts} />
          )}
        </div>
      )}
    </div>
  )
}

// ── exported component ────────────────────────────────────────────────────────

export default function BraceMapDiagram() {
  return (
    <div className="space-y-6">

      {/* ── Brace Map ── */}
      <div className="flex items-stretch">

        {/* Whole node */}
        <div className="w-[72px] shrink-0 flex items-center justify-center pr-1">
          <div className="w-full bg-indigo-600 dark:bg-indigo-700 rounded-xl px-2 py-4 text-center shadow-sm">
            <div className="text-xl">⚜️</div>
            <p className="text-white font-bold text-[11px] mt-1.5 leading-tight">พ.ร.บ.</p>
            <p className="text-white font-bold text-[11px] leading-tight">ลูกเสือ</p>
            <p className="text-indigo-200 text-[9px] mt-1">พ.ศ. ๒๕๕๑</p>
            <p className="text-indigo-300 text-[9px]">๗๔ มาตรา</p>
          </div>
        </div>

        {/* Connector line from node to brace */}
        <div className="self-center h-0.5 w-2 bg-indigo-300 dark:bg-indigo-500 shrink-0" />

        {/* { brace */}
        <BraceSymbol />

        {/* Chapter branches */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {MAP_CHAPTERS.map((ch) => (
            <div key={ch.id} className="flex items-center gap-0">
              {/* Horizontal tick from brace to card */}
              <div className="shrink-0 h-0.5 w-3 bg-indigo-200 dark:bg-indigo-700" />
              <div className="flex-1 min-w-0">
                <Branch ch={ch} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Key connections ── */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl px-4 py-3">
        <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">
          จุดเชื่อมสำคัญที่มักออกสอบ
        </p>
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
  )
}
