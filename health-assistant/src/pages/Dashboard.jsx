import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'

export default function Dashboard() {
  const { state, t, currentStreak } = useApp()

  const todayISO = new Date().toISOString().slice(0, 10)
  const todayRoutine = state.routineHistory.find((r) => r.date === todayISO)
  const todayFood = state.foodLog.find((f) => f.date === todayISO)
  const activeGoals = state.goals.filter((g) => !g.completed)

  const last7 = [...state.routineHistory]
    .filter((r) => {
      const d = new Date(r.date)
      const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)
      return diff <= 7
    })
  const avg = (arr, key) =>
    arr.length ? Math.round((arr.reduce((sum, x) => sum + Number(x[key] || 0), 0) / arr.length) * 10) / 10 : '—'

  const weeklyTasksDone = state.tasks.filter((tsk) => {
    if (!tsk.done || !tsk.doneAt) return false
    const diff = (Date.now() - new Date(tsk.doneAt).getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  const stats = [
    { emoji: '⚖️', label: t('currentBMI'), value: todayRoutine ? `${todayRoutine.bmi} (${t(todayRoutine.status)})` : '—' },
    { emoji: '🍽️', label: t('todayCalories'), value: todayFood ? `${todayFood.totalCal} kcal` : '—' },
    { emoji: '🔥', label: t('activeStreak'), value: `${currentStreak} ${t('days')}` },
    { emoji: '🎯', label: t('openGoals'), value: activeGoals.length }
  ]

  return (
    <div>
      <PageHeader emoji="🏠" title={t('todaySummary')} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="text-center">
            <Sticker emoji={s.emoji} size="text-3xl" />
            <div className="mt-2 text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-ink-400 mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      <PageHeader emoji="📊" title={t('weeklySummary')} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-lg font-bold text-crimson-300">{avg(last7, 'weight')}</div>
          <div className="text-xs text-ink-400 mt-1">{t('avgWeight')}</div>
        </Card>
        <Card className="text-center">
          <div className="text-lg font-bold text-crimson-300">{avg(last7, 'exerciseMin')}</div>
          <div className="text-xs text-ink-400 mt-1">{t('avgExercise')}</div>
        </Card>
        <Card className="text-center">
          <div className="text-lg font-bold text-crimson-300">{avg(last7, 'water')}</div>
          <div className="text-xs text-ink-400 mt-1">{t('avgWater')}</div>
        </Card>
        <Card className="text-center">
          <div className="text-lg font-bold text-crimson-300">{weeklyTasksDone}</div>
          <div className="text-xs text-ink-400 mt-1">{t('tasksDone')}</div>
        </Card>
      </div>
    </div>
  )
}
