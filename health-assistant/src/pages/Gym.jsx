import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'
import { muscleGroups, exercises } from '../data/exercises'

export default function Gym() {
  const { t, logExerciseDone, state } = useApp()
  const [selected, setSelected] = useState(null)
  const [doneMap, setDoneMap] = useState({})

  function handleDone(ex) {
    const key = ex.en
    logExerciseDone(selected, ex.en)
    setDoneMap((m) => ({ ...m, [key]: true }))
  }

  return (
    <div>
      <PageHeader emoji="🏋️" title={t('gymTitle')} desc={t('gymDesc')} />

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {muscleGroups.map((mg) => (
          <button
            key={mg.id}
            onClick={() => setSelected(mg.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-colors
              ${selected === mg.id ? 'bg-crimson-700/90 border-crimson-500' : 'bg-ink-900/70 border-crimson-900/40 hover:bg-ink-800'}`}
          >
            <Sticker emoji={mg.icon} size="text-3xl" anim={selected === mg.id ? 'wiggle' : 'float'} />
            <span className="text-xs text-white font-medium">{t(mg.labelKey)}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-3 max-w-2xl">
          {exercises[selected].map((ex) => {
            const key = ex.en
            const isDone = doneMap[key]
            return (
              <Card key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sticker emoji="🏋️‍♂️" size="text-2xl" />
                  <div>
                    <div className="text-white font-semibold">{ex.fa}</div>
                    <div className="text-xs text-ink-400">
                      {t('setsReps')}: {ex.sets} · {t('difficulty')}: {t(ex.diff)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDone(ex)}
                  disabled={isDone}
                  className={`text-xs px-4 py-2 rounded-lg font-semibold ${
                    isDone ? 'bg-green-900 text-green-300' : 'bg-crimson-700 hover:bg-crimson-600 text-white'
                  }`}
                >
                  {isDone ? '✅' : t('doneBtn')}
                </button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
