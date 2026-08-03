import { useState } from 'react'
import { useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Tasks from './pages/Tasks'
import Goals from './pages/Goals'
import Gym from './pages/Gym'
import Food from './pages/Food'
import Achievements from './pages/Achievements'
import Journal from './pages/Journal'

const pages = {
  dashboard: Dashboard,
  routine: Routine,
  tasks: Tasks,
  goals: Goals,
  gym: Gym,
  food: Food,
  achievements: Achievements,
  journal: Journal
}

export default function App() {
  const { state, t } = useApp()
  const [page, setPage] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

  const PageComponent = pages[page]

  return (
    <div className="flex min-h-screen font-body" style={{ backgroundColor: state.bgColor }}>
      <Sidebar page={page} setPage={setPage} open={menuOpen} setOpen={setMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-crimson-900/50">
          <span className="font-bold text-crimson-400">{t('appName')}</span>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white bg-ink-800 px-3 py-1.5 rounded-lg"
          >
            ☰
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}
