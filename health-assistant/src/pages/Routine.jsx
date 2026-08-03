import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'

export default function Routine() {
  const { state, t, computeBMI, saveRoutineEntry } = useApp()
  const [height, setHeight] = useState(state.profile.height || '')
  const [weight, setWeight] = useState('')
  const [exerciseMin, setExerciseMin] = useState('')
  const [water, setWater] = useState('')
  const [result, setResult] = useState(null)
  const [saved, setSaved] = useState(false)

  function analyze() {
    const bmi = computeBMI(height, weight)
    if (!bmi) return
    const lowWater = Number(water) < 8
    const lowExercise = Number(exerciseMin) < 20

    let suggestion = ''
    if (bmi.status === 'underweight') suggestion = t('muscle_arms') + ': ' + (state.lang === 'fa' ? 'حرکات قدرتی برای افزایش توده عضلانی' : 'strength exercises to build muscle mass')
    else if (bmi.status === 'normal') suggestion = state.lang === 'fa' ? 'ورزش‌های نگهدارنده برای حفظ تناسب اندام' : 'maintenance exercises to stay fit'
    else suggestion = state.lang === 'fa' ? 'ورزش‌های کاردیو مثل پیاده‌روی سریع و دوچرخه' : 'cardio like brisk walking and cycling'

    setResult({ bmi, lowWater, lowExercise, suggestion })
    setSaved(false)
  }

  function handleSave() {
    if (!result) return
    saveRoutineEntry({
      date: new Date().toISOString().slice(0, 10),
      height,
      weight,
      exerciseMin,
      water,
      bmi: result.bmi.value,
      status: result.bmi.status
    })
    setSaved(true)
  }

  const statusColor = {
    underweight: 'text-yellow-400',
    normal: 'text-green-400',
    overweight: 'text-orange-400',
    obese: 'text-red-400'
  }

  return (
    <div>
      <PageHeader emoji="📋" title={t('routineTitle')} desc={t('routineDesc')} />

      <Card className="max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <Field label={t('height')} value={height} onChange={setHeight} />
          <Field label={t('weight')} value={weight} onChange={setWeight} />
          <Field label={t('exerciseMin')} value={exerciseMin} onChange={setExerciseMin} />
          <Field label={t('waterCups')} value={water} onChange={setWater} />
        </div>
        <button
          onClick={analyze}
          className="mt-5 w-full bg-crimson-700 hover:bg-crimson-600 transition-colors text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Sticker emoji="⚡" size="text-xl" anim="pulse" />
          {t('analyzeBtn')}
        </button>
      </Card>

      {result && (
        <Card className="max-w-xl mt-5 space-y-4">
          <div>
            <div className="text-sm text-ink-400">{t('bmiResult')}</div>
            <div className={`text-3xl font-bold ${statusColor[result.bmi.status]}`}>
              {result.bmi.value} — {t(result.bmi.status)}
            </div>
          </div>

          <div className={`p-3 rounded-xl ${result.lowWater ? 'bg-red-950/50 border border-red-800' : 'bg-green-950/40 border border-green-800'}`}>
            {result.lowWater ? t('waterWarning') : t('waterGood')}
          </div>

          <div className={`p-3 rounded-xl ${result.lowExercise ? 'bg-red-950/50 border border-red-800' : 'bg-green-950/40 border border-green-800'}`}>
            {result.lowExercise ? t('exerciseWarning') : t('exerciseGood')}
          </div>

          <div className="p-3 rounded-xl bg-ink-800/70 border border-crimson-900/50">
            <div className="text-xs text-crimson-300 mb-1">{t('suggestionTitle')}</div>
            <div className="text-sm text-ink-200">{result.suggestion}</div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-ink-700 hover:bg-ink-600 transition-colors text-white font-semibold py-2.5 rounded-xl"
          >
            {saved ? t('savedMsg') : t('saveToday')}
          </button>
        </Card>
      )}
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-ink-400">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
      />
    </label>
  )
}
