import type { CyclePhase, Mood, TemperamentGroup } from "@/types";
import type { LocaleContent, PhaseDialogues } from "@/lib/i18n/types";
import { mergeDialogues } from "@/lib/i18n/utils";
import { MBTI_TYPE_TITLES_EN } from "@/lib/mbtiTitles";

type MoodKey = Mood | "default";

const guides: Record<CyclePhase, PhaseDialogues> = {
  menstrual: {
    great: {
      guide:
        "If you still feel good during your period, try light stretching or a short walk. It is best to skip intense workouts.",
      speech:
        "{name}, you seem to have good energy today. Let us still care for your body gently. Give yourself one kind compliment.",
    },
    good: {
      guide:
        "Warm meals and enough water can really help. Keeping your lower belly warm may make you feel more comfortable.",
      speech:
        "{name}, you are doing so well today. If things feel hard, leaning on support is okay. I am cheering for you.",
    },
    okay: {
      guide:
        "Listen closely to your body's signals. If you feel tired, it is okay to reduce your schedule a little.",
      speech:
        "{name}, it is okay. Even an ordinary day means you are doing enough. You can move slowly.",
    },
    low: {
      guide:
        "If you have pain or fatigue, make rest your top priority. A warm compress can be helpful.",
      speech:
        "{name}, today sounds really heavy. It is okay to do nothing. You can just rest comfortably.",
    },
    bad: {
      guide:
        "If severe pain or discomfort continues, get plenty of rest and consider talking with a medical professional.",
      speech:
        "{name}, you worked so hard today. Your body is going through a lot, so please be extra gentle with yourself.",
    },
    default: {
      guide:
        "During your period, your body can become more sensitive. Please focus on rest and warmth.",
      speech:
        "{name}, you are in your menstrual phase. Let us skip pressure today and start with what feels comfortable.",
    },
  },
  follicular: {
    great: {
      guide:
        "Your energy is rising now. This is a great time to make a new plan or start light exercise.",
      speech:
        "{name}, your eyes are sparkling these days. Let us carry this bright feeling into today.",
    },
    good: {
      guide:
        "Focus and vitality are coming back. Try starting one task you have been postponing.",
      speech:
        "{name}, this is a lovely day. If you start with one small thing, you will feel even prouder.",
    },
    okay: {
      guide:
        "Your condition is recovering. Keeping regular sleep and meals can help you feel even better.",
      speech:
        "{name}, it is okay. You are getting better little by little. We can go slowly together.",
    },
    low: {
      guide:
        "You may not be fully recharged yet. Avoid pushing too hard and move with your own rhythm.",
      speech:
        "{name}, you might still feel tired. It is okay, your energy will come back soon. No need to rush.",
    },
    bad: {
      guide:
        "Some days your mood may dip. Enough sleep and a gentle walk can be supportive.",
      speech:
        "{name}, your heart feels heavy today. That is okay, days like this happen. I am right here with you.",
    },
    default: {
      guide:
        "This is the follicular phase, when energy gradually rises. It is a good time for a fresh start.",
      speech:
        "{name}, your body is regaining strength little by little. Let us begin gently at your pace.",
    },
  },
  ovulation: {
    great: {
      guide:
        "This can be your peak condition. It is a good time for important plans or meeting people.",
      speech:
        "{name}, you are truly glowing today. This confidence is yours, so let it shine.",
    },
    good: {
      guide:
        "Vitality and social energy are high. Conversations and collaboration often go smoothly now.",
      speech:
        "{name}, you look in a great mood. Sharing your positive energy may make your day even better.",
    },
    okay: {
      guide:
        "Overall this phase is favorable, but try not to overload your schedule. Keep things balanced.",
      speech:
        "{name}, this is a steady day. You are moving at a great pace. I am cheering for you.",
    },
    low: {
      guide:
        "Even during ovulation, energy can fluctuate. Keep hydrated and make space for rest.",
      speech:
        "{name}, you seem a little drained today. That is okay, a short pause still counts as progress.",
    },
    bad: {
      guide:
        "If your condition drops, reduce your schedule and care for your body and mind first.",
      speech:
        "{name}, this sounds like a hard day. It is okay to make today a day just for your recovery.",
    },
    default: {
      guide:
        "This is your ovulation phase, often the highest-energy phase. Great for active plans.",
      speech:
        "{name}, this is your most energetic phase. Want to choose one thing you would love to do today?",
    },
  },
  luteal: {
    great: {
      guide:
        "Even if you feel great, later luteal days may bring fatigue. Leave extra room in your schedule.",
      speech:
        "{name}, you look bright today. Let us hold onto this good feeling with care.",
    },
    good: {
      guide:
        "Your body may feel calmer in this phase. Focusing on tidying up and rest can help.",
      speech:
        "{name}, you are doing well. Start with what makes you feel comfortable today.",
    },
    okay: {
      guide:
        "PMS symptoms may appear in this phase. Try reducing caffeine and salty foods a bit.",
      speech:
        "{name}, it is okay. Your body can be more sensitive now, so please treat yourself more kindly.",
    },
    low: {
      guide:
        "Mood shifts and fatigue can show up. Comforting meals and enough sleep may help.",
      speech:
        "{name}, today was emotionally heavy, right? It is okay to simply rest on days like this.",
    },
    bad: {
      guide:
        "Emotional ups and downs can feel stronger now. Do not carry it alone, and share your feelings with someone you trust.",
      speech:
        "{name}, that must have felt so hard. Today, you deserve the most gentle care in the world.",
    },
    default: {
      guide:
        "In the luteal phase, both emotions and body sensations can shift. Please prioritize self-care.",
      speech:
        "{name}, this is your luteal phase, so your body may feel more sensitive. Let us start with what brings you ease.",
    },
  },
};

const speeches: Record<
  TemperamentGroup,
  Record<CyclePhase, Record<MoodKey, string>>
> = {
  NF: {
    menstrual: {
      great:
        "{name}, you seem to have good energy today. Let us still care for your body gently. Give yourself one kind compliment.",
      good:
        "{name}, you are doing so well today. If things feel hard, leaning on support is okay. I am cheering for you.",
      okay:
        "{name}, it is okay. Even an ordinary day means you are doing enough. You can move slowly.",
      low:
        "{name}, today sounds really heavy. It is okay to do nothing. You can just rest comfortably.",
      bad:
        "{name}, you worked so hard today. Your body is going through a lot, so please be extra gentle with yourself.",
      default:
        "{name}, you are in your menstrual phase. Let us skip pressure today and start with what feels comfortable.",
    },
    follicular: {
      great:
        "{name}, your eyes are sparkling these days. Let us carry this bright feeling into today.",
      good:
        "{name}, this is a lovely day. If you start with one small thing, you will feel even prouder.",
      okay:
        "{name}, it is okay. You are getting better little by little. We can go slowly together.",
      low:
        "{name}, you might still feel tired. It is okay, your energy will come back soon. No need to rush.",
      bad:
        "{name}, your heart feels heavy today. That is okay, days like this happen. I am right here with you.",
      default:
        "{name}, your body is regaining strength little by little. Let us begin gently at your pace.",
    },
    ovulation: {
      great:
        "{name}, you are truly glowing today. This confidence is yours, so let it shine.",
      good:
        "{name}, you look in a great mood. Sharing your positive energy may make your day even better.",
      okay:
        "{name}, this is a steady day. You are moving at a great pace. I am cheering for you.",
      low:
        "{name}, you seem a little drained today. That is okay, a short pause still counts as progress.",
      bad:
        "{name}, this sounds like a hard day. It is okay to make today a day just for your recovery.",
      default:
        "{name}, this is your most energetic phase. Want to choose one thing you would love to do today?",
    },
    luteal: {
      great:
        "{name}, you look bright today. Let us hold onto this good feeling with care.",
      good:
        "{name}, you are doing well. Start with what makes you feel comfortable today.",
      okay:
        "{name}, it is okay. Your body can be more sensitive now, so please treat yourself more kindly.",
      low:
        "{name}, today was emotionally heavy, right? It is okay to simply rest on days like this.",
      bad:
        "{name}, that must have felt so hard. Today, you deserve the most gentle care in the world.",
      default:
        "{name}, this is your luteal phase, so your body may feel more sensitive. Let us start with what brings you ease.",
    },
  },
  NT: {
    menstrual: {
      great:
        "{name}, your condition looks stable. During this phase, lower-intensity activity fits best. Please keep hydration in check.",
      good:
        "{name}, your status is steady today. Warmth and hydration should be enough for comfortable management.",
      okay:
        "{name}, this is within a typical range. If fatigue appears, reducing your schedule by around twenty percent is reasonable.",
      low:
        "{name}, your fatigue level seems high. Prioritizing recovery is the best strategy today. Minimal activity is fine.",
      bad:
        "{name}, your condition is low. Rest should come first, and if symptoms continue, a professional consultation is recommended.",
      default:
        "{name}, you are in the menstrual phase. Switching to recovery mode today is a sound choice.",
    },
    follicular: {
      great:
        "{name}, this is an upward energy window. It is an efficient time to begin a new project or exercise routine.",
      good:
        "{name}, focus is recovering well. Choosing one postponed task and completing it today would work nicely.",
      okay:
        "{name}, recovery is in progress. Seven hours of sleep and regular meals are enough to support steady improvement.",
      low:
        "{name}, some fatigue may still remain. Rather than forcing momentum, increase activity gradually.",
      bad:
        "{name}, mood index seems low today. Start with sleep quality and a short walk before trying to optimize anything else.",
      default:
        "{name}, you are entering the follicular phase. Energy usually rises here, so a light goal is a good option.",
    },
    ovulation: {
      great:
        "{name}, this is likely a peak-condition window. It is ideal for important meetings and key tasks.",
      good:
        "{name}, social and collaborative energy is high today. Communication-heavy work should flow efficiently.",
      okay:
        "{name}, overall status is good. Avoiding an overloaded schedule should keep things stable.",
      low:
        "{name}, you are in a high-energy phase but feeling fatigued. Please hydrate and take a thirty-minute recovery break.",
      bad:
        "{name}, your condition is lower today. Reprioritize your schedule and focus on restoration first.",
      default:
        "{name}, this is your ovulation phase. High vitality makes this a good time for core priorities.",
    },
    luteal: {
      great:
        "{name}, current status is good, but late-luteal fatigue can appear. Preserving schedule margin is wise.",
      good:
        "{name}, this is a calmer phase. Increasing time for organization and rest is usually effective.",
      okay:
        "{name}, this is a potential PMS window. Reducing caffeine and sodium while protecting sleep can help.",
      low:
        "{name}, mood and energy variability may be present. A recovery-focused routine is the most practical plan today.",
      bad:
        "{name}, emotional fluctuation can be stronger now. You do not need to handle this alone, and asking for support is valid.",
      default:
        "{name}, you are in the luteal phase. Hormonal shifts are expected, so please place self-care at higher priority.",
    },
  },
  SJ: {
    menstrual: {
      great:
        "{name}, your condition looks good. Let us keep today simple: 10 minutes of stretching and one warm cup of tea.",
      good:
        "{name}, here is today’s checklist: warm meal, enough water, and belly warmth. That is all you need.",
      okay:
        "{name}, it is okay to remove one task from your plan today. Body care comes first.",
      low:
        "{name}, today’s top task is rest. Prepare a warm compress and keep your pace very gentle.",
      bad:
        "{name}, it is okay to schedule full rest today. If needed, we can also plan a clinic visit.",
      default:
        "{name}, you are in your period phase. Let us follow this order: rest, warmth, and hydration.",
    },
    follicular: {
      great:
        "{name}, your energy is rising. Let us set one weekly goal and place it on your plan.",
      good:
        "{name}, choose one postponed task and add it to today’s action list.",
      okay:
        "{name}, you are recovering. Basic routine is enough: sleep, meals, and water.",
      low:
        "{name}, you may still feel tired. Let us keep only light tasks on your schedule today.",
      bad:
        "{name}, this is a low-mood day. Try just two steps: a 15-minute walk and earlier sleep.",
      default:
        "{name}, this is the start of your follicular phase. Shall we set one small goal for this week?",
    },
    ovulation: {
      great:
        "{name}, peak condition day. It is a good time to place your important tasks today or tomorrow.",
      good:
        "{name}, communication and teamwork are efficient today. Great timing for meetings and collaboration.",
      okay:
        "{name}, overall condition is stable. Adding a 30-minute buffer to your schedule can keep it smooth.",
      low:
        "{name}, even in this peak phase you can feel tired. Please include a 30-minute rest block.",
      bad:
        "{name}, let us adjust your plan today. Caring for your body is the first priority.",
      default:
        "{name}, this is your ovulation phase. A perfect time to organize your core task list.",
    },
    luteal: {
      great:
        "{name}, you feel good now, but later fatigue can come. Let us secure extra margin in your schedule.",
      good:
        "{name}, this is a great phase for gentle organization and rest. A calm routine will help.",
      okay:
        "{name}, PMS support routine for today: less caffeine, less salty food, and at least seven hours of sleep.",
      low:
        "{name}, let us keep it simple today: comforting food and early bedtime.",
      bad:
        "{name}, this is a difficult day. You do not need to endure it alone. Reaching out to someone you trust is a good step.",
      default:
        "{name}, this is your luteal phase. Let us move self-care routines to top priority today.",
    },
  },
  SP: {
    menstrual: {
      great:
        "{name}, your energy is up today. Nice. Let us still keep things light and easy, no heavy pushing.",
      good:
        "{name}, warm food and a cozy break sound perfect today. You are doing great already.",
      okay:
        "{name}, just a normal day, and that is totally fine. Slow and steady is great.",
      low:
        "{name}, today feels rough, huh? Blanket mode is allowed. Doing nothing is still valid.",
      bad:
        "{name}, that was really hard today. Please rest deeply, and if needed, it is okay to visit a doctor.",
      default:
        "{name}, period phase today. Comfy clothes, warm food, and soft rest sounds like the plan.",
    },
    follicular: {
      great:
        "{name}, energy boost is here. Perfect timing to try something new and fun.",
      good:
        "{name}, good mood day. Pick one thing you wanted to do and start it right now.",
      okay:
        "{name}, you are getting better little by little. No rush, your pace is perfect.",
      low:
        "{name}, still a bit tired? That is okay. Your energy will bounce back soon.",
      bad:
        "{name}, your heart feels heavy today. Maybe a short walk and fresh air could help a little.",
      default:
        "{name}, your body is waking up again. Want to choose one fun thing for today?",
    },
    ovulation: {
      great:
        "{name}, you are shining today. You can absolutely go for what you want.",
      good:
        "{name}, great vibe today. Perfect for reaching out, meeting people, or going out a little.",
      okay:
        "{name}, nice steady day. Just do not overpack your schedule and you are good.",
      low:
        "{name}, feeling tired today? Drink some water and take a short break. You are still doing great.",
      bad:
        "{name}, tough day, huh? Let today be a gentle day just for you.",
      default:
        "{name}, this is your most active phase. Want to pick one exciting thing to do today?",
    },
    luteal: {
      great:
        "{name}, you feel good now, nice. Just keep some schedule space because fatigue can sneak in later.",
      good:
        "{name}, this phase can feel calmer. Soft music and a cozy rest break would be lovely.",
      okay:
        "{name}, your body might feel more sensitive now. Let us be extra kind to you today.",
      low:
        "{name}, today feels emotionally heavy, right? Warm comfort food and early sleep are totally okay.",
      bad:
        "{name}, that sounds really hard. You are not alone. I am right here with you.",
      default:
        "{name}, luteal phase can feel sensitive. Today, comfort and ease come first.",
    },
  },
};

const cycleInsights = {
  menstrual: {
    status:
      "Both estrogen and progesterone are at lower levels in this phase. The uterine lining sheds, and prostaglandins can cause cramps or fatigue. Your body is naturally resetting, so lower energy is completely normal.",
    adviceItems: [
      {
        icon: "🍲",
        label: "Recommended food",
        text: "Try warm soup, ginger tea, and iron-rich foods like spinach or lean red meat.",
      },
      {
        icon: "🧘",
        label: "Exercise intensity",
        text: "Light yoga, a 10-minute stretch, or an easy indoor walk is enough. Heavy strength training can wait.",
      },
      {
        icon: "🌙",
        label: "Sleep guide",
        text: "Going to bed 30 to 60 minutes earlier than usual can help recovery. A warm shower before bed may also help.",
      },
    ],
  },
  follicular: {
    status:
      "Estrogen gradually rises in the follicular phase, so energy and mood often recover. Serotonin activity may also improve, making focus and positive feelings easier. This is often a light, fresh-start period for both body and mind.",
    adviceItems: [
      {
        icon: "🥗",
        label: "Recommended food",
        text: "Choose fresh vegetables, berries, and nuts for light but nourishing meals. Stay well hydrated too.",
      },
      {
        icon: "🏃",
        label: "Exercise intensity",
        text: "Great time for active movement like jogging, cycling, or dance. You can also try a new routine.",
      },
      {
        icon: "🌙",
        label: "Sleep guide",
        text: "Keeping a regular bedtime helps your energy last longer. Ten minutes of morning sunlight can support your rhythm.",
      },
    ],
  },
  ovulation: {
    status:
      "Estrogen is near its peak and luteinizing hormone rises sharply around ovulation. Body temperature can increase slightly, and energy, confidence, and sociability are often high. Feeling more vibrant now is a natural body response.",
    adviceItems: [
      {
        icon: "🥑",
        label: "Recommended food",
        text: "Fuel with protein and healthy fats like avocado, eggs, and fish. Limiting caffeine after 2 PM may help.",
      },
      {
        icon: "💪",
        label: "Exercise intensity",
        text: "Higher-intensity workouts like intervals, running, or swimming can fit well now. Still listen to your body's signals.",
      },
      {
        icon: "🌙",
        label: "Sleep guide",
        text: "Higher energy may shorten sleep. Aim to sleep before 11 PM and reduce screen time before bed.",
      },
    ],
  },
  luteal: {
    status:
      "After ovulation, progesterone rises and body temperature increases. Later in this phase, both major hormones drop, and PMS symptoms like mood swings, bloating, appetite changes, or fatigue may appear. This sensitivity is a natural hormonal response, not a personal failure.",
    adviceItems: [
      {
        icon: "🍫",
        label: "Recommended food",
        text: "Complex carbs like sweet potato or brown rice, plus magnesium-rich foods like banana or a little dark chocolate, may support emotional balance.",
      },
      {
        icon: "🚶",
        label: "Exercise intensity",
        text: "Gentle movement such as walking, Pilates, or 15 minutes of stretching works well. If your body feels heavy, less movement is okay.",
      },
      {
        icon: "🌙",
        label: "Sleep guide",
        text: "Aim for 7 to 8 hours of sleep. Reducing caffeine and alcohol, plus calm music or reading before bed, can help.",
      },
    ],
  },
};

export const enLocale: LocaleContent = {
  language: "EN",
  ui: {
    slogan: "A companion that grows with your emotions and rhythms",
    loading: "Loading Moon Buddy...",
    languageLabel: "Language",
    setupTitle: "Get Started",
    setupDesc: "Share your name and MBTI — your companion will find you.",
    myName: "My Name",
    myNamePlaceholder: "Please enter your name",
    vocativePreview: "Name preview",
    buddyNameLabel: "Name your buddy",
    buddyNamePlaceholder: "e.g., Moon Buddy",
    buddyNameHint: "Leave blank to use the default name.",
    buddyPreviewLabel: "Buddy name preview",
    mbtiLabel: "MBTI",
    profileSave: "Save Profile",
    profileSaved: "Saved ✓",
    withBuddy: "With",
    buddyPersona: "Warm, Unconditional Empath",
    shareCopiedToast: "Link copied!",
    shareSheetTitle: "Share",
    shareSheetClose: "Close",
    shareApp: "Share",
    shareCopyLink: "Copy link",
    shareFailed: "Sharing failed. Please try again.",
    shareCopyFailed: "Failed to copy the link.",
    fortuneCookieLabel: "Today's Note",
    fortuneCookieOpenedLabel: "Opened Note",
    fortuneCookieTitle: "Moonlight Fortune Cookie",
    fortuneCookieSubtitle: "Today's lucky encouragement",
    fortuneCookieOpenedHint: "You already opened today's note. See you tomorrow!",
    fortuneCookieClose: "Close",
    insightFabLabel: "View my status in detail",
    insightSheetTitle: "My Insights",
    insightSheetClose: "Close",
    analysisReportTitle: "Analysis Report",
    customAdviceTitle: "{name}'s Personalized Advice",
    buddyAdviceFallback: "Moon Buddy's Personalized Advice",
    todayStatus: "Today's rhythm",
    todayRhythm: "Today's rhythm",
    dayUnit: "day",
    daysCountUnit: " days",
    daysUntilPeriod: "Next period expected in about",
    moonAdvice: "Moon's Personalized Advice",
    conditionGuide: "Today's Condition Guide",
    moodTag: "Mood",
    todayMood: "Today's Mood",
    todayMoodDesc: "Log your mood to earn EXP and help your buddy grow!",
    periodRecord: "Period Record",
    periodRecordDesc:
      "Enter your period start and end dates to track your cycle phases.",
    periodStart: "Start Date",
    periodEnd: "End Date",
    periodSave: "Save",
    periodError:
      "Please enter valid dates. End date must be after start date.",
    periodDelete: "Delete",
    cycleSettings: "Cycle Settings",
    cycleSettingsDesc:
      "Set your average cycle length for more accurate phase predictions.",
    cycleLength: "Average Cycle Length (days)",
    defaultPeriodLength: "Default Period Length (days)",
    defaultPeriodHint:
      "Used as a fallback when there are no period records yet.",
    settingsSave: "Save Settings",
    settingsSaved: "Saved ✓",
    cycleErrorLength: "Cycle length must be between 21 and 40 days.",
    cycleErrorPeriod: "Default period length must be between 2 and 10 days.",
    cycleErrorCompare: "Period length must be shorter than cycle length.",
    recentPeriods: "Recent Period Records",
    defaultFriend: "friend",
    noCycleInsightClosing:
      "Your little moon friend will grow to resemble you with every record.",
    lunaPointsLabel: "Moonlight Shards",
    lunaPointsCount: "{count}",
    gachaButton: "Destiny Moon Card Draw",
    gachaCost: "Cost: 10",
    gachaInsufficient:
      "Not enough shards. Log your mood daily to collect moonlight shards!",
    cardRevealTitle: "Card Obtained!",
    cardClose: "Close",
    cardCollectionTitle: "Moon Card Codex",
    cardCollectionEmpty:
      "No cards yet. Try a draw to collect your first card!",
    cardCollected: "Owned",
    cardRarityCommon: "Common",
    cardRarityRare: "Rare",
    cardRaritySuperRare: "Super Rare",
    cardSecretLabel: "Secret Whisper",
    cardRevealFlipping: "Flipping your destiny card...",
    calendarTitle: "Monthly timeline",
    calendarPrev: "Previous month",
    calendarNext: "Next month",
    recordEditTitle: "Edit Record",
    recordEditMood: "Mood",
    recordEditPeriod: "Period",
    recordEditPeriodOn: "Mark as period day",
    recordEditSave: "Save Changes",
    recordEditDelete: "Delete Record",
    weekdayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    liveMoodTimelineTitle: "Today's Live Moods",
    liveMoodTimelineEmpty: "Tap a button to log how you feel!",
    tabHome: "Home",
    tabCondition: "Condition",
    conditionTabDesc: "Explore your rhythm and how you're feeling today.",
    conditionRhythmTitle: "My rhythm",
    conditionTodayTitle: "Today's condition",
    conditionGuideSectionTitle: "Condition guide",
    conditionScoreLabel: "Condition score",
    conditionScoreHint:
      "A reference based on your mood logs from the last 7 days. Not a medical diagnosis.",
    conditionMoodTrend: "Recent emotional patterns",
    conditionWellnessDisclaimer:
      "All guidance is general wellness support. Please consult a professional if you feel unwell.",
    tabJourney: "Journey",
    journeyTabDesc: "Reflect on this month's emotions and your personal rhythm.",
    journeyEmotionTitle: "This month's emotions",
    journeyRhythmTitle: "My rhythm",
    journeyTimelineTitle: "Monthly timeline",
    moodFeedTitle: "How are you feeling today?",
    moodCompleteButton: "Save mood log",
    starFragmentToast: "You found today's sparkling star fragment!",
    starFragmentCountLabel: "Fragments {count}/7",
    rhythmCardTitle: "Today's rhythm",
    rhythmLogHint: "Log only when you need to",
    insightsTabDesc: "Explore your emotional flow and personal rhythm.",
    insightMoodLogs: "Mood logs",
    insightMoodDays: "Days logged",
    insightTopMood: "Top mood",
    conditionGuideTip: "Today's quick guide",
    tabGacha: "Gacha",
    tabProfile: "Profile",
    profileEditTitle: "Edit Profile",
    profileEditDesc: "Update your name, MBTI, and buddy name.",
    livePeriodSwitchTitle: "Live Status Switch",
    livePeriodOn: "On period",
    livePeriodOff: "Not on period",
    livePeriodDayUnit: " day",
    rhythmCycleLabel: "Rhythm cycle",
    livePeriodStartButton: "Log period start",
    livePeriodEndButton: "Log period end",
    periodDaySheetTitle: "Period Log",
    periodToggleLabel: "Mark as period day",
    periodStartOnDay: "🩸 Period started on this day",
    periodEndOnDay: "✨ Period ended on this day",
    periodActualLegend: "Logged",
    periodPredictedLegend: "Predicted",
    periodOngoing: "Ongoing",
    periodOngoingHint: "Leave end date empty to log an ongoing period from today.",
    periodDayCount: "Day {day}",
    averageCycleLabel: "Average cycle: {days} days",
    speechTapHint: "Tap for another message",
    mascotTapHint: "Tap the character for another message",
    close: "Close",
    tabStars: "Stars",
    companionGrowthLabel: "Companion growth",
    companionGrowthNextProgress: "{percent}% to next stage",
    companionStages: {
      seed: "Seed",
      sprout: "Sprout",
      young: "Young sprout",
      blooming: "Blooming companion",
      star_spirit: "Star Spirit",
    },
    evolutionVisualStages: {
      1: "Sprout companion",
      2: "Budding companion",
      3: "Blooming companion",
      4: "Pre-ascension companion",
    },
    ascendButton: "Ascend with star memories",
    weeklyConstellationBadge: "Weekly reward",
    weeklyConstellationTitle: "This week's mood constellation",
    weeklyConstellationDesc:
      "The colors of your last 7 days have connected into one constellation.",
    weeklyConstellationClose: "Close",
    weeklyConstellationWeekStart: "7 days ago",
    weeklyConstellationWeekEnd: "Today",
    ascensionReadyHint: "This journey is complete. Ascension awaits ✨",
    ascensionTitle: "Ascension",
    ascensionDialogues: [
      "Thank you for sharing this journey with me.",
      "We made it through this month together.",
      "Now I will become a star in the night sky.",
    ],
    ascensionBecomingStar: "Becoming a star…",
    ascensionComplete: "A new star has been saved.",
    ascensionContinue: "Continue",
    ascensionMeetNewSeed: "Meet the new seed",
    starCollectionTitle: "Star Memories",
    starCollectionDesc: "Permanent memories of companions you raised.",
    starGalleryTab: "Gallery",
    starConstellationTab: "Constellation",
    starCollectionEmptyTitle: "No stars yet",
    starCollectionEmptyDesc:
      "When your companion becomes a Star Spirit and the cycle ends, they stay here forever.",
    starMoodBreakdown: "Mood breakdown",
    starDominantEmotion: "Dominant emotion",
    starTypes: {
      golden: "Golden Star",
      emerald: "Emerald Star",
      silver_moon: "Silver Moon Star",
      deep_blue: "Deep Blue Star",
      aurora: "Aurora Star",
    },
    emotionScales: {
      great: "Great",
      good: "Good",
      okay: "Okay",
      low: "Low",
      bad: "Hard",
    },
    constellationComingSoonTitle: "Constellation view coming soon",
    constellationComingSoonDesc:
      "Your personal night sky, connected through time, is on the way.",
  },
  phaseLabels: {
    menstrual: "Menstrual phase",
    follicular: "Follicular phase",
    ovulation: "Ovulation",
    luteal: "Luteal phase",
  },
  rhythmPhaseBrief: {
    default: "Start recording your rhythm. {companionName} will be right here.",
    menstrual: "A time to slowly restore energy. {companionName} is here with you.",
    follicular: "Fresh energy is returning. Share how you feel today.",
    ovulation: "Your energy sparkles brightly today.",
    luteal: "Your heart may feel a little sensitive. {companionName} is here with you.",
  },
  moodLabels: {
    great: "Great",
    good: "Good",
    okay: "Okay",
    low: "Low",
    bad: "Bad",
  },
  moodEmojis: { great: "😄", good: "🙂", okay: "😐", low: "😔", bad: "😢" },
  liveMoodLabels: {
    calm: "Calm",
    motivated: "Motivated",
    drained: "Drained",
    foggy: "Foggy",
    irritable: "Irritable",
    bittersweet: "Bittersweet",
    craving: "Craving",
    heavy: "Heavy",
  },
  liveMoodEmojis: {
    calm: "🌿",
    motivated: "🔥",
    drained: "🔋",
    foggy: "🌀",
    irritable: "🌋",
    bittersweet: "💧",
    craving: "🍫",
    heavy: "🖤",
  },
  liveMoodDescriptions: {
    calm: "My mind feels peaceful and just right.",
    motivated: "So much energy—I feel like I can do anything!",
    drained: "Battery at 0%. I don't even want to move a finger...",
    foggy: "Like fog in my head—hard to focus on anything.",
    irritable: "One touch and I might spark. Sensitivity at max!",
    bittersweet: "Feelings overflowing—suddenly sentimental, tears might come.",
    craving: "I need chocolate or spicy soup right now!",
    heavy: "My heart feels heavy, sinking into a deep stillness.",
  },
  mbtiTypeTitles: MBTI_TYPE_TITLES_EN,
  epithets: {
    1: "A tiny moon buddy just hatched",
    2: "A listener of your feelings",
    3: "A little wiser than before",
    4: "One who embraces your hormone rhythms",
    5: "A soul companion fully synced with you",
  },
  welcomeGuide:
    "If you record your period start and end dates, you can get condition guides matched to each cycle phase.",
  welcomeSpeech: {
    NF: [
      "{name}, so happy to meet you! I am your moon friend, Moon Buddy. Shall we begin together?",
      "{name}, welcome! I will stay close to your heart from today on.",
      "{name}, nice to meet you! Let us start gently, one step at a time.",
    ],
    NT: [
      "{name}, hello. I am Luna. I will help you manage your condition based on cycle data.",
      "{name}, hello. More records mean better analysis over time.",
      "{name}, let us begin. Start with cycle logs and build from there.",
    ],
    SJ: [
      "{name}, hi! I am Dali. Let us start step by step with your cycle records.",
      "{name}, welcome! One log today is already a great start.",
      "{name}, hi! Let us begin calmly with your first record.",
    ],
    SP: [
      "{name}, hey there! I am Moongi. Let us make tracking fun together!",
      "{name}, yo! Great to meet you! Let us hang out and log today!",
      "{name}, you made it! Try tapping a mood button first!",
    ],
  },
  thankSpeech: {
    NF: [
      "{name}, thank you. I will treasure your feelings from today too. 💜",
      "{name}, thanks for sharing. I will keep today's mood safe with me.",
      "{name}, thank you! I am here with you today too.",
    ],
    NT: [
      "{name}, record confirmed. You are managing your condition well.",
      "{name}, data updated. Consistent logging is the key.",
      "{name}, today's log received. It helps pattern analysis.",
    ],
    SJ: [
      "{name}, thank you for logging today. Let us keep it steady together.",
      "{name}, log complete! You did well today.",
      "{name}, thanks. One step at a time tomorrow too.",
    ],
    SP: [
      "{name}, thanks! Let us hang out again today. ✨",
      "{name}, log received, thank you! Let us have fun today!",
      "{name}, thanks! I got your mood loud and clear!",
    ],
  },
  dialogues: mergeDialogues(guides, speeches),
  cycleInsights,
  cycleClosing: {
    menstrual: [
      "{name}, today your body comes first. No pressure, keep warm and rest gently. I will stay by your side.",
      "{name}, today is a rest day. It is okay to lean into warmth and comfort.",
      "{name}, trust what your body tells you. Go at your own pace today.",
    ],
    follicular: [
      "{name}, your energy is returning. Pick just one tip above and try it lightly today. I am cheering for you.",
      "{name}, your mood is lifting. One small start is enough today!",
      "{name}, let us make a light day like a fresh sprout. Pick just one!",
    ],
    ovulation: [
      "{name}, this is your brightest phase. Choose one thing you want to do and enjoy it fully today.",
      "{name}, energy is peaking! Shall we set one goal for today?",
      "{name}, you are shining today. Do one thing you truly want!",
    ],
    luteal: [
      "{name}, on sensitive days, you can be extra kind to yourself. Pick one comfortable tip above and take it slowly.",
      "{name}, your heart may feel tender today. Choose one gentle tip and go slowly.",
      "{name}, a sensitive day for body and mind. Care for yourself first, no rush.",
    ],
  },
  defaultInsight: {
    status:
      "There is no cycle record yet, so I cannot analyze your current condition. If you log period start and end dates, you can receive personalized guidance based on hormonal changes.",
    adviceItems: [
      {
        icon: "📝",
        label: "First step",
        text: "Record your period start and end dates. Moon Buddy will begin analyzing your cycle.",
      },
      {
        icon: "😊",
        label: "Mood logging",
        text: "If you log your mood today, Moon Buddy will grow to resemble you and become even more thoughtful.",
      },
      {
        icon: "🌙",
        label: "Sleep guide",
        text: "For today, start with one simple goal: sleep at least seven hours.",
      },
    ],
    adviceClosing:
      "Your little moon friend will grow to resemble you with every record.",
  },
};
