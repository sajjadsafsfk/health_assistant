import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { t as translate } from '../i18n'
import { achievementDefs } from '../data/achievements'

const AppCtx = createContext(null)

const STORAGE_KEY = 'health-assistant-data-v1'

const defaultState = {
  lang: 'fa',
  bgColor: '#0a0a0b', // default black
  accentColor: '#dd1f1f', // default red
  profile: { height: '' },
  routineHistory: [], // { date, weight, exerciseMin, water, bmi, status }
  tasks: [], // { id, text, done, goalId, createdAt }
  goals: [], // { id, title, target, progress, completed }
  gymLog: [], // { id, muscle, exerciseName, date }
  foodLog: [], // { id, date, items: [{name, grams, cal}], totalCal }
  journal: [], // { id, date, text }
  achievementsUnlocked: {} // { achievementId: dateEarnedISO }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    document.documentElement.dir = state.lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = state.lang
  }, [state.lang])

  const t = (key) => translate(state.lang, key)

  // ---------- Language / theme ----------
  const setLang = (lang) => setState((s) => ({ ...s, lang }))
  const setBgColor = (bgColor) => setState((s) => ({ ...s, bgColor }))

  // ---------- Routine ----------
  function computeBMI(heightCm, weightKg) {
    const h = Number(heightCm) / 100
    const w = Number(weightKg)
    if (!h || !w) return null
    const bmi = w / (h * h)
    let status = 'normal'
    if (bmi < 18.5) status = 'underweight'
    else if (bmi < 25) status = 'normal'
    else if (bmi < 30) status = 'overweight'
    else status = 'obese'
    return { value: Math.round(bmi * 10) / 10, status }
  }

  function saveRoutineEntry(entry) {
    setState((s) => {
      const filtered = s.routineHistory.filter((r) => r.date !== entry.date)
      return {
        ...s,
        profile: { ...s.profile, height: entry.height || s.profile.height },
        routineHistory: [...filtered, entry].sort((a, b) => a.date.localeCompare(b.date))
      }
    })
  }

  // ---------- Tasks ----------
  function addTask(text, goalId) {
    setState((s) => ({
      ...s,
      tasks: [
        ...s.tasks,
        { id: crypto.randomUUID(), text, done: false, goalId: goalId || null, createdAt: todayISO() }
      ]
    }))
  }

  function toggleTask(id) {
    setState((s) => {
      const tasks = s.tasks.map((task) => {
        if (task.id !== id) return task
        return { ...task, done: !task.done, doneAt: !task.done ? new Date().toISOString() : null }
      })
      const toggled = tasks.find((x) => x.id === id)
      let goals = s.goals
      if (toggled?.goalId) {
        goals = s.goals.map((g) => {
          if (g.id !== toggled.goalId) return g
          const delta = toggled.done ? 1 : -1
          const progress = Math.max(0, Math.min(g.target, g.progress + delta))
          return { ...g, progress, completed: progress >= g.target }
        })
      }
      return { ...s, tasks, goals }
    })
  }

  function deleteTask(id) {
    setState((s) => ({ ...s, tasks: s.tasks.filter((tsk) => tsk.id !== id) }))
  }

  // ---------- Goals ----------
  function addGoal(title, target) {
    setState((s) => ({
      ...s,
      goals: [
        ...s.goals,
        { id: crypto.randomUUID(), title, target: Number(target) || 1, progress: 0, completed: false }
      ]
    }))
  }

  function deleteGoal(id) {
    setState((s) => ({
      ...s,
      goals: s.goals.filter((g) => g.id !== id),
      tasks: s.tasks.map((tsk) => (tsk.goalId === id ? { ...tsk, goalId: null } : tsk))
    }))
  }

  // ---------- Gym ----------
  function logExerciseDone(muscle, exerciseName) {
    setState((s) => ({
      ...s,
      gymLog: [
        ...s.gymLog,
        { id: crypto.randomUUID(), muscle, exerciseName, date: new Date().toISOString() }
      ]
    }))
  }

  // ---------- Food ----------
  function addFoodEntry(items, totalCal) {
    setState((s) => {
      const date = todayISO()
      const existing = s.foodLog.find((f) => f.date === date)
      let foodLog
      if (existing) {
        foodLog = s.foodLog.map((f) =>
          f.date === date
            ? { ...f, items: [...f.items, ...items], totalCal: f.totalCal + totalCal }
            : f
        )
      } else {
        foodLog = [...s.foodLog, { id: crypto.randomUUID(), date, items, totalCal }]
      }
      return { ...s, foodLog }
    })
  }

  // ---------- Journal ----------
  function addJournalEntry(text) {
    setState((s) => ({
      ...s,
      journal: [
        { id: crypto.randomUUID(), date: todayISO(), text },
        ...s.journal.filter((j) => j.date !== todayISO())
      ]
    }))
  }

  function getOneYearAgoEntry() {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)
    const iso = d.toISOString().slice(0, 10)
    return state.journal.find((j) => j.date === iso) || null
  }

  // ---------- Streak / achievements ----------
  // A "full day" = every task created on/before that day with due-that-day semantics is done.
  // Simplified: a day counts as complete if there's at least 1 task created that day and all tasks
  // created that day are marked done.
  function computeDailyCompletionMap() {
    const byDate = {}
    for (const tsk of state.tasks) {
      const d = tsk.createdAt
      if (!byDate[d]) byDate[d] = { total: 0, done: 0 }
      byDate[d].total += 1
      if (tsk.done) byDate[d].done += 1
    }
    const completedDates = new Set(
      Object.entries(byDate)
        .filter(([, v]) => v.total > 0 && v.done === v.total)
        .map(([d]) => d)
    )
    return completedDates
  }

  function computeCurrentStreak() {
    const completedDates = computeDailyCompletionMap()
    let streak = 0
    const cursor = new Date()
    for (;;) {
      const iso = cursor.toISOString().slice(0, 10)
      if (completedDates.has(iso)) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }

  function computeWaterStreak() {
    let streak = 0
    const sorted = [...state.routineHistory].sort((a, b) => b.date.localeCompare(a.date))
    const cursor = new Date()
    for (;;) {
      const iso = cursor.toISOString().slice(0, 10)
      const entry = sorted.find((r) => r.date === iso)
      if (entry && Number(entry.water) >= 8) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }

  function computeFoodStreak() {
    let streak = 0
    const cursor = new Date()
    for (;;) {
      const iso = cursor.toISOString().slice(0, 10)
      const entry = state.foodLog.find((f) => f.date === iso)
      if (entry && entry.items.length > 0) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }

  function getAchievementProgress(def) {
    switch (def.type) {
      case 'streak':
        return computeCurrentStreak()
      case 'water_streak':
        return computeWaterStreak()
      case 'food_streak':
        return computeFoodStreak()
      case 'gym_count':
        return state.gymLog.length
      case 'goal_count':
        return state.goals.filter((g) => g.completed).length
      default:
        return 0
    }
  }

  // Auto-unlock achievements whenever relevant state changes
  useEffect(() => {
    setState((s) => {
      let changed = false
      const unlocked = { ...s.achievementsUnlocked }
      for (const def of achievementDefs) {
        if (unlocked[def.id]) continue
        const progress = getAchievementProgress(def)
        if (progress >= def.target) {
          unlocked[def.id] = new Date().toISOString()
          changed = true
        }
      }
      return changed ? { ...s, achievementsUnlocked: unlocked } : s
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tasks, state.routineHistory, state.foodLog, state.gymLog, state.goals])

  const currentStreak = useMemo(() => computeCurrentStreak(), [state.tasks])

  const value = {
    state,
    t,
    setLang,
    setBgColor,
    computeBMI,
    saveRoutineEntry,
    addTask,
    toggleTask,
    deleteTask,
    addGoal,
    deleteGoal,
    logExerciseDone,
    addFoodEntry,
    addJournalEntry,
    getOneYearAgoEntry,
    getAchievementProgress,
    currentStreak,
    todayISO
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
