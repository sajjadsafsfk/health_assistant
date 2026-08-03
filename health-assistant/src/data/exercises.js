export const muscleGroups = [
  { id: 'chest', icon: '🏋️', labelKey: 'muscle_chest' },
  { id: 'back', icon: '🔙', labelKey: 'muscle_back' },
  { id: 'legs', icon: '🦵', labelKey: 'muscle_legs' },
  { id: 'abs', icon: '🔥', labelKey: 'muscle_abs' },
  { id: 'arms', icon: '💪', labelKey: 'muscle_arms' },
  { id: 'shoulders', icon: '🤸', labelKey: 'muscle_shoulders' }
]

export const exercises = {
  chest: [
    { fa: 'پرس سینه هالتر', en: 'Barbell Bench Press', sets: '4x8', diff: 'diff_intermediate' },
    { fa: 'پرس بالا سینه دمبل', en: 'Incline Dumbbell Press', sets: '3x10', diff: 'diff_intermediate' },
    { fa: 'شنا سوئدی', en: 'Push-up', sets: '3x15', diff: 'diff_beginner' },
    { fa: 'قفسه سینه دمبل', en: 'Dumbbell Fly', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'کراس‌اور کابل', en: 'Cable Crossover', sets: '3x12', diff: 'diff_advanced' }
  ],
  back: [
    { fa: 'بارفیکس', en: 'Pull-up', sets: '3x8', diff: 'diff_advanced' },
    { fa: 'زیربغل هالتر خم', en: 'Bent-over Barbell Row', sets: '4x8', diff: 'diff_intermediate' },
    { fa: 'زیربغل سیم‌کش', en: 'Lat Pulldown', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'ددلیفت', en: 'Deadlift', sets: '4x6', diff: 'diff_advanced' },
    { fa: 'زیربغل تک‌دست دمبل', en: 'One-arm Dumbbell Row', sets: '3x10', diff: 'diff_beginner' }
  ],
  legs: [
    { fa: 'اسکوات هالتر', en: 'Barbell Squat', sets: '4x8', diff: 'diff_intermediate' },
    { fa: 'پرس پا (لگ پرس)', en: 'Leg Press', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'لانج', en: 'Lunges', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'ددلیفت رومانیایی', en: 'Romanian Deadlift', sets: '3x10', diff: 'diff_advanced' },
    { fa: 'جلو پا دستگاه', en: 'Leg Extension', sets: '3x15', diff: 'diff_beginner' }
  ],
  abs: [
    { fa: 'کرانچ', en: 'Crunch', sets: '3x20', diff: 'diff_beginner' },
    { fa: 'پلانک', en: 'Plank', sets: '3x40s', diff: 'diff_beginner' },
    { fa: 'بالا آوردن پا آویزان', en: 'Hanging Leg Raise', sets: '3x12', diff: 'diff_advanced' },
    { fa: 'کرانچ کابل', en: 'Cable Crunch', sets: '3x15', diff: 'diff_intermediate' },
    { fa: 'راشین توییست', en: 'Russian Twist', sets: '3x20', diff: 'diff_beginner' }
  ],
  arms: [
    { fa: 'جلو بازو هالتر', en: 'Barbell Curl', sets: '3x10', diff: 'diff_beginner' },
    { fa: 'پشت بازو سیم‌کش', en: 'Triceps Pushdown', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'جلو بازو دمبل چکشی', en: 'Hammer Curl', sets: '3x10', diff: 'diff_beginner' },
    { fa: 'پشت بازو دیپ', en: 'Triceps Dips', sets: '3x10', diff: 'diff_intermediate' },
    { fa: 'جلو بازو کانسنتریشن', en: 'Concentration Curl', sets: '3x12', diff: 'diff_intermediate' }
  ],
  shoulders: [
    { fa: 'پرس سرشانه هالتر', en: 'Overhead Barbell Press', sets: '4x8', diff: 'diff_intermediate' },
    { fa: 'نشر جانب دمبل', en: 'Lateral Raise', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'نشر خم', en: 'Bent-over Rear Delt Raise', sets: '3x12', diff: 'diff_beginner' },
    { fa: 'پرس آرنولد', en: 'Arnold Press', sets: '3x10', diff: 'diff_advanced' },
    { fa: 'شراگ دمبل', en: 'Dumbbell Shrug', sets: '3x15', diff: 'diff_beginner' }
  ]
}
