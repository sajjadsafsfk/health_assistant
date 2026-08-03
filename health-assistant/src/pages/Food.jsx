import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'
import { foods } from '../data/foods'

export default function Food() {
  const { state, t, addFoodEntry } = useApp()
  const [query, setQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState(null)
  const [grams, setGrams] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return foods.filter((f) => f.fa.includes(query.trim()) || f.en.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  const todayISO = new Date().toISOString().slice(0, 10)
  const todayEntry = state.foodLog.find((f) => f.date === todayISO)

  function handleAdd() {
    if (!selectedFood || !grams) return
    const cal = Math.round((selectedFood.cal100 * Number(grams)) / 100)
    const label = state.lang === 'fa' ? selectedFood.fa : selectedFood.en
    addFoodEntry([{ name: label, grams: Number(grams), cal }], cal)
    setSelectedFood(null)
    setQuery('')
    setGrams('')
  }

  return (
    <div>
      <PageHeader emoji="🍎" title={t('foodTitle')} desc={t('foodDesc')} />

      <Card className="max-w-xl">
        <div className="relative">
          <input
            value={selectedFood ? (state.lang === 'fa' ? selectedFood.fa : selectedFood.en) : query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedFood(null)
            }}
            placeholder={t('searchFood')}
            className="w-full bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
          />
          {results.length > 0 && !selectedFood && (
            <div className="absolute z-10 mt-1 w-full bg-ink-800 border border-crimson-900/50 rounded-lg overflow-hidden shadow-xl">
              {results.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFood(f)
                    setQuery('')
                  }}
                  className="w-full text-right px-3 py-2 hover:bg-crimson-800/60 text-sm text-white flex justify-between"
                >
                  <span>{state.lang === 'fa' ? f.fa : f.en}</span>
                  <span className="text-ink-400">{f.cal100} kcal/100g</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-3">
          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder={t('amountGrams')}
            className="flex-1 bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white"
          />
          <button
            onClick={handleAdd}
            disabled={!selectedFood || !grams}
            className="bg-crimson-700 hover:bg-crimson-600 disabled:opacity-40 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Sticker emoji="🍇" size="text-lg" anim="pulse" />
            {t('addFoodBtn')}
          </button>
        </div>
      </Card>

      <Card className="max-w-xl mt-5">
        <div className="font-semibold text-white mb-3">{t('todayMeal')}</div>
        {!todayEntry || todayEntry.items.length === 0 ? (
          <p className="text-ink-400 text-sm">{t('noFoodItems')}</p>
        ) : (
          <div className="space-y-2">
            {todayEntry.items.map((it, i) => (
              <div key={i} className="flex justify-between text-sm text-ink-200">
                <span>
                  {it.name} ({it.grams}g)
                </span>
                <span className="text-crimson-300">{it.cal} kcal</span>
              </div>
            ))}
            <div className="border-t border-ink-700 pt-2 flex justify-between font-bold text-white">
              <span>{t('totalCalories')}</span>
              <span>{todayEntry.totalCal} kcal</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
