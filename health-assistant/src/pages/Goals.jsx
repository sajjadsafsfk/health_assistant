import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader, ProgressBar } from '../components/ui'
import Sticker from '../components/Sticker'

export default function Goals() {
  const { state, t, addGoal, deleteGoal } = useApp()
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')

  function handleAdd() {
    if (!title.trim() || !target) return
    addGoal(title.trim(), target)
    setTitle('')
    setTarget('')
  }

  return (
    <div>
      <PageHeader emoji="🎯" title={t('goalsTitle')} />

      <Card className="max-w-xl flex flex-col md:flex-row gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('addGoalTitle')}
          className="flex-1 bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
        />
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder={t('addGoalTarget')}
          className="w-full md:w-56 bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
        />
        <button onClick={handleAdd} className="bg-crimson-700 hover:bg-crimson-600 text-white font-semibold px-5 py-2 rounded-lg">
          {t('addGoalBtn')}
        </button>
      </Card>

      <div className="max-w-xl mt-5 space-y-3">
        {state.goals.length === 0 && <p className="text-ink-400 text-sm">{t('noGoals')}</p>}
        {state.goals.map((g) => (
          <Card key={g.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sticker emoji={g.completed ? '🏆' : '🎯'} size="text-xl" anim={g.completed ? 'wiggle' : 'float'} />
                <span className="font-semibold text-white">{g.title}</span>
                {g.completed && <span className="text-xs text-green-400">{t('goalCompleted')}</span>}
              </div>
              <button
                onClick={() => deleteGoal(g.id)}
                className="text-xs bg-red-950 hover:bg-red-900 px-3 py-1 rounded-lg text-red-300"
              >
                {t('deleteBtn')}
              </button>
            </div>
            <ProgressBar value={g.progress} max={g.target} />
            <div className="text-xs text-ink-400 mt-1">
              {t('goalProgress')}: {g.progress} / {g.target}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
