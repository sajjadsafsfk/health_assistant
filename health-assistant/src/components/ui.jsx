export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-ink-900/70 backdrop-blur border border-crimson-900/50 rounded-2xl p-5 shadow-lg shadow-black/30 ${className}`}
    >
      {children}
    </div>
  )
}

export function ProgressBar({ value, max, colorClass = 'bg-crimson-600' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="w-full h-3 bg-ink-800 rounded-full overflow-hidden">
      <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function PageHeader({ emoji, title, desc }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="text-3xl">{emoji}</span>
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {desc && <p className="text-ink-400 text-sm mt-1">{desc}</p>}
      </div>
    </div>
  )
}
