import { useApp } from '../context/AppContext'
import { Card, PageHeader, ProgressBar } from '../components/ui'
import Sticker from '../components/Sticker'
import { achievementDefs } from '../data/achievements'

export default function Achievements() {
  const { state, t, getAchievementProgress } = useApp()

  return (
    <div>
      <PageHeader emoji="🏅" title={t('achievementsTitle')} desc={t('achievementsDesc')} />

      <div className="grid md:grid-cols-2 gap-4">
        {achievementDefs.map((def) => {
          const unlockedAt = state.achievementsUnlocked[def.id]
          const isUnlocked = Boolean(unlockedAt)
          const progress = getAchievementProgress(def)
          const label = state.lang === 'fa' ? def.fa : def.en
          const desc = state.lang === 'fa' ? def.faDesc : def.enDesc

          return (
            <Card
              key={def.id}
              className={`flex items-start gap-4 ${isUnlocked ? 'border-crimson-600/70' : 'opacity-70'}`}
            >
              <Sticker
                emoji={def.icon}
                size="text-4xl"
                anim={isUnlocked ? 'wiggle' : 'float'}
                className={isUnlocked ? '' : 'grayscale opacity-50'}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isUnlocked ? 'bg-green-900 text-green-300' : 'bg-ink-800 text-ink-400'}`}>
                    {isUnlocked ? t('unlocked') : t('locked')}
                  </span>
                </div>
                <div className="text-xs text-ink-400 mt-1">{desc}</div>

                {isUnlocked ? (
                  <div className="text-xs text-crimson-300 mt-2">
                    {t('earnedOn')}: {new Date(unlockedAt).toLocaleDateString(state.lang === 'fa' ? 'fa-IR' : 'en-US')}
                  </div>
                ) : (
                  <div className="mt-2">
                    <ProgressBar value={progress} max={def.target} />
                    <div className="text-xs text-ink-400 mt-1">
                      {t('progressLabel')}: {Math.min(progress, def.target)} / {def.target}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
