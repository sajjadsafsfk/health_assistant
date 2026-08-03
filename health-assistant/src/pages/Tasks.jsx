import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'

export default function Tasks() {
  const { state, t, addTask, toggleTask, deleteTask } = useApp()
  const [text, setText] = useState('')
  const [goalId, setGoalId] = useState('')

  function handleAdd() {
    if (!text.trim()) return
    addTask(text.trim(), goalId || null)
    setText('')
    setGoalId('')
  }

  return (
    <div>
      <PageHeader emoji="✅" title={t('tasksTitle')} />

      <Card className="max-w-xl flex flex-col md:flex-row gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={t('addTaskPlaceholder')}
          className="flex-1 bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
        />
        <select
          value={goalId}
          onChange={(e) => setGoalId(e.target.value)}
          className="bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-white"
        >
          <option value="">{t('noGoalLink')}</option>
          {state.goals.filter((g) => !g.completed).map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-crimson-700 hover:bg-crimson-600 text-white font-semibold px-5 py-2 rounded-lg">
          {t('addBtn')}
        </button>
      </Card>

      <div className="max-w-xl mt-5 space-y-2">
        {state.tasks.length === 0 && <p className="text-ink-400 text-sm">{t('noTasks')}</p>}
        {[...state.tasks].reverse().map((tsk) => {
          const goal = state.goals.find((g) => g.id === tsk.goalId)
          return (
            <Card key={tsk.id} className="flex items-center justify-between !py-3">
              <div className="flex items-center gap-3">
                <Sticker emoji={tsk.done ? '✅' : '⬜'} size="text-xl" anim={tsk.done ? 'pulse' : 'float'} />
                <div>
                  <div className={`text-sm ${tsk.done ? 'line-through text-ink-500' : 'text-white'}`}>{tsk.text}</div>
                  {goal && <div className="text-xs text-crimson-400">🎯 {goal.title}</div>}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(tsk.id)}
                  className="text-xs bg-ink-700 hover:bg-ink-600 px-3 py-1.5 rounded-lg text-white"
                >
                  {tsk.done ? t('undoneBtn') : t('doneBtn')}
                </button>
                <button
                  onClick={() => deleteTask(tsk.id)}
                  className="text-xs bg-red-950 hover:bg-red-900 px-3 py-1.5 rounded-lg text-red-300"
                >
                  {t('deleteBtn')}
                </button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
