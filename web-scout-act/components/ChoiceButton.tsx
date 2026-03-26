import type { ChoiceKey } from '@/types'

interface Props {
  choiceKey: ChoiceKey
  text: string
  state: 'idle' | 'correct' | 'wrong' | 'reveal' | 'dimmed'
  onClick: () => void
  disabled: boolean
}

const stateClasses: Record<Props['state'], string> = {
  idle: 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/30 cursor-pointer',
  correct: 'bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300 font-semibold',
  wrong: 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-300 font-semibold',
  reveal: 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600 text-green-700 dark:text-green-400',
  dimmed: 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-400 dark:text-slate-500',
}

export default function ChoiceButton({ choiceKey, text, state, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${stateClasses[state]}`}
    >
      <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border-2 border-current text-sm font-bold">
        {choiceKey}
      </span>
      <span className="leading-relaxed">{text}</span>
    </button>
  )
}
