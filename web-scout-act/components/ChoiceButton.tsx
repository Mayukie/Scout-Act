import type { ChoiceKey } from '@/types'

interface Props {
  choiceKey: ChoiceKey
  text: string
  state: 'idle' | 'correct' | 'wrong' | 'reveal' | 'dimmed'
  onClick: () => void
  disabled: boolean
}

const stateClasses: Record<Props['state'], string> = {
  idle: 'bg-white border-slate-300 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer',
  correct: 'bg-green-100 border-green-500 text-green-800 font-semibold',
  wrong: 'bg-red-100 border-red-500 text-red-800 font-semibold',
  reveal: 'bg-green-50 border-green-400 text-green-700',
  dimmed: 'bg-slate-50 border-slate-200 text-slate-400',
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
