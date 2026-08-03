// Each achievement is evaluated live from app state in AppContext (getAchievementProgress)
export const achievementDefs = [
  {
    id: 'streak_3',
    icon: '🔥',
    fa: 'شروع قوی',
    en: 'Strong Start',
    faDesc: '۳ روز متوالی همه‌ی کارهای امروزت رو انجام بده',
    enDesc: 'Complete all of a day\'s tasks 3 days in a row',
    type: 'streak',
    target: 3
  },
  {
    id: 'streak_10',
    icon: '🏅',
    fa: 'مصمم',
    en: 'Determined',
    faDesc: '۱۰ روز متوالی همه‌ی کارهات رو کامل انجام بده',
    enDesc: 'Complete all daily tasks 10 days in a row',
    type: 'streak',
    target: 10
  },
  {
    id: 'streak_30',
    icon: '🏆',
    fa: 'قهرمان ماه',
    en: 'Monthly Champion',
    faDesc: '۳۰ روز متوالی همه‌ی کارهات رو کامل انجام بده',
    enDesc: 'Complete all daily tasks 30 days in a row',
    type: 'streak',
    target: 30
  },
  {
    id: 'water_7',
    icon: '💧',
    fa: 'دوست آب',
    en: 'Water Friend',
    faDesc: '۷ روز متوالی به هدف آب روزانه برس',
    enDesc: 'Hit your daily water target 7 days in a row',
    type: 'water_streak',
    target: 7
  },
  {
    id: 'gym_20',
    icon: '💪',
    fa: 'عضله‌ساز',
    en: 'Muscle Builder',
    faDesc: '۲۰ حرکت باشگاهی رو انجام‌شده بزن',
    enDesc: 'Mark 20 gym exercises as done',
    type: 'gym_count',
    target: 20
  },
  {
    id: 'goal_1',
    icon: '🎯',
    fa: 'هدف‌گذار',
    en: 'Goal Setter',
    faDesc: 'اولین هدف شخصیت رو تکمیل کن',
    enDesc: 'Complete your first personal goal',
    type: 'goal_count',
    target: 1
  },
  {
    id: 'food_7',
    icon: '🍽️',
    fa: 'رژیم‌دار',
    en: 'Diet Tracker',
    faDesc: '۷ روز متوالی غذا ثبت کن',
    enDesc: 'Log food 7 days in a row',
    type: 'food_streak',
    target: 7
  }
]
