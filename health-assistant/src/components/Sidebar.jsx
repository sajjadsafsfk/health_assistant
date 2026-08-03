import { useApp } from '../context/AppContext'
import Sticker from './Sticker'

const navItems = [
  { id: 'dashboard', emoji: '🏠', key: 'nav_dashboard' },
  { id: 'routine', emoji: '📋', key: 'nav_routine' },
  { id: 'tasks', emoji: '✅', key: 'nav_tasks' },
  { id: 'goals', emoji: '🎯', key: 'nav_goals' },
  { id: 'gym', emoji: '🏋️', key: 'nav_gym' },
  { id: 'food', emoji: '🍎', key: 'nav_food' },
  { id: 'achievements', emoji: '🏅', key: 'nav_achievements' },
  { id: 'journal', emoji: '📔', key: 'nav_journal' }
]

const bgSwatches = ['#0a0a0b', '#1a0000', '#0d0d0d', '#12060a', '#050505', '#1c1c1c']

export default function Sidebar({ page, setPage, open, setOpen }) {
  const { state, t, setLang, setBgColor } = useApp()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed md:static z-40 top-0 h-full w-72 shrink-0 bg-ink-950 border-crimson-900 flex flex-col
        ${state.lang === 'fa' ? 'right-0 border-l' : 'left-0 border-r'}
        transition-transform duration-300
        ${open ? 'translate-x-0' : state.lang === 'fa' ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-5 border-b border-crimson-900/60 flex items-center gap-3">
          <Sticker emoji="❤️‍🔥" size="text-3xl" anim="pulse" />
          <div>
            <div className="font-bold text-lg text-crimson-400">{t('appName')}</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
                ${page === item.id
                  ? 'bg-crimson-700/90 text-white shadow-lg shadow-crimson-900/40'
                  : 'text-ink-200 hover:bg-ink-800/70 hover:text-crimson-300'}`}
            >
              <Sticker emoji={item.emoji} size="text-xl" anim={page === item.id ? 'wiggle' : 'float'} />
              <span className="font-medium">{t(item.key)}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-crimson-900/60 space-y-3">
          <div>
            <div className="text-xs text-ink-400 mb-1.5">{t('language')}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setLang('fa')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${state.lang === 'fa' ? 'bg-crimson-700 text-white' : 'bg-ink-800 text-ink-300'}`}
              >
                فارسی
              </button>
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-1.5 rounded-lg text-sm ${state.lang === 'en' ? 'bg-crimson-700 text-white' : 'bg-ink-800 text-ink-300'}`}
              >
                English
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs text-ink-400 mb-1.5">{t('bgColor')}</div>
            <div className="flex gap-2 flex-wrap items-center">
              {bgSwatches.map((c) => (
                <button
                  key={c}
                  onClick={() => setBgColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${state.bgColor === c ? 'border-crimson-400 scale-110' : 'border-ink-700'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={state.bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-6 h-6 rounded-full overflow-hidden border-2 border-ink-700 bg-transparent cursor-pointer"
                title={t('bgColor')}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
