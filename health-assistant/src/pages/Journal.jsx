import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'
import Sticker from '../components/Sticker'

export default function Journal() {
  const { state, t, addJournalEntry, getOneYearAgoEntry } = useApp()
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  const oneYearAgo = getOneYearAgoEntry()

  function handleSave() {
    if (!text.trim()) return
    addJournalEntry(text.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader emoji="📔" title={t('journalTitle')} desc={t('journalDesc')} />

      {oneYearAgo && (
        <Card className="max-w-xl mb-5 border-crimson-600/60">
          <div className="flex items-center gap-2 mb-2">
            <Sticker emoji="🕰️" size="text-2xl" anim="wiggle" />
            <span className="text-sm font-semibold text-crimson-300">{t('oneYearAgo')}</span>
          </div>
          <p className="text-ink-200 text-sm whitespace-pre-wrap">{oneYearAgo.text}</p>
        </Card>
      )}

      <Card className="max-w-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('journalPlaceholder')}
          rows={5}
          className="w-full bg-ink-800 border border-ink-700 focus:border-crimson-600 outline-none rounded-lg px-3 py-2 text-white resize-none"
        />
        <button
          onClick={handleSave}
          className="mt-3 w-full bg-crimson-700 hover:bg-crimson-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Sticker emoji="📝" size="text-lg" anim="pulse" />
          {saved ? t('savedMsg') : t('saveEntry')}
        </button>
      </Card>

      <div className="max-w-xl mt-6">
        <div className="font-semibold text-white mb-3">{t('pastEntries')}</div>
        {state.journal.length === 0 && <p className="text-ink-400 text-sm">{t('noEntries')}</p>}
        <div className="space-y-3">
          {state.journal.map((j) => (
            <Card key={j.id}>
              <div className="text-xs text-crimson-400 mb-1">
                {new Date(j.date).toLocaleDateString(state.lang === 'fa' ? 'fa-IR' : 'en-US')}
              </div>
              <p className="text-sm text-ink-200 whitespace-pre-wrap">{j.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
