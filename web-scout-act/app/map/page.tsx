import BraceMapDiagram from '@/components/BraceMapDiagram'
import BottomNav from '@/components/BottomNav'

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 pt-12 pb-4">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">แผนผังกฎหมาย</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">พ.ร.บ.ลูกเสือ พ.ศ. ๒๕๕๑ — แผนผังวงเล็บ</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <BraceMapDiagram />
      </div>

      <BottomNav />
    </main>
  )
}
