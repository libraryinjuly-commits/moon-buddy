import type { BuddySpeechLines, BuddySpeechPhase } from "@/lib/buddySpeechLines";
import type { Language, TemperamentGroup } from "@/types";

const KO_NF: BuddySpeechLines = {
  menstrual: [
    "주인님... 몸이 무겁죠? {characterName}가 포근한 찜질팩 바로 챙겨줄게. 오늘은 세상 어디에도 안 가도 돼요 🤍",
    "호르몬이 살짝 흔들리는 날이에요. 이불 속에서 천천히 숨만 쉬어도 {characterName}는 옆에 있을게.",
    "따뜻한 국물 한 모금, 생강차 한 잔만 같이 해볼까? 몸이 풀리면 내가 더 꼭 안아줄게.",
    "무거운 운동은 잠깐 쉬어도 괜찮아요. 가벼운 스트레칭 10분만 {characterName}랑 해볼까?",
    "평소보다 일찍 눕는 것도 좋은 날이에요. 따뜻한 샤워 후 푹 쉬면 내일이 조금 가벼워질 거예요.",
  ],
  follicular: [
    "에너지가 살짝살짝 돌아오는 시기예요! {characterName}도 같이 신나요 ✨",
    "신선한 채소랑 베리류 한 접시, 같이 챙겨볼까? 몸이 조금 더 상쾌해질 거예요.",
    "가벼운 산책, 딱 좋은 타이밍이에요. 무리하지 않는 선에서 천천히 가요.",
    "아침 햇빛 10분만 쬐면 리듬이 잡혀요. 새 출발 느낌으로 한 걸음만 내딛어봐요.",
    "집중이 잘 되는 날이 될 수도 있어요. 해보고 싶었던 작은 일 하나만 골라봐도 좋아요.",
  ],
  ovulation: [
    "오늘은 에너지가 제일 솟아오르는 날일 수 있어요! {characterName}도 기분이 좋아요!",
    "단백질이랑 좋은 지방으로 오늘 활력을 채워볼까? 달걀, 생선, 아보카도가 딱이에요.",
    "체력 쓰는 운동이 잘 맞는 날이에요. 몸이 보내는 신호는 언제나 제일 먼저 들어줘요.",
    "기분이 좋고 말이 많아지는 날일 수도 있어요. 그 마음, 그대로 받아들여도 괜찮아요.",
    "밤에 잠이 줄어들 수 있는 시기예요. 스크린 타임만 조금 줄여볼까?",
  ],
  luteal: [
    "몸과 마음이 예민해질 수 있는 시기예요. 감정이 올라와도 나를 탓하지 않아도 괜찮아요, 주인님.",
    "부종이나 무거움이 느껴지면 호르몬이 바뀌는 자연스러운 반응이에요. {characterName}가 옆에 있을게.",
    "고구마나 현미, 바나나 한 개만 챙겨도 기분이 조금 안정될 수 있어요.",
    "15분 산책이나 부드러운 스트레칭만으로도 충분해요. 몸이 무겁다면 움직임을 줄여도 괜찮아요.",
    "수면을 넉넉히 챙기는 날이에요. 조용한 음악과 함께 쉬어봐요.",
  ],
  onPeriod: [
    "지금은 휴식 단계니까, 오늘은 속도를 확 줄여도 괜찮아요. {characterName}가 계속 지켜볼게요.",
    "따뜻한 찜질팩이나 포근한 이불, 뭐든 좋아요. 지금 필요한 건 '쉼'이에요 🤍",
    "통증이 있어도 괜찮아요. 몸이 보내는 신호니까, 오늘은 무조건 편한 쪽으로만 가요.",
  ],
  default: [
    "리듬 기록을 시작하시면, {name}의 흐름에 맞는 이야기를 더 많이 들려드릴 수 있어요. {characterName}와 천천히 시작해 보세요.",
    "오늘 하루도 수고하셨어요. 기분 버튼을 눌러 지금 마음을 조금 들려주실래요?",
    "완벽하지 않아도 괜찮아요. 기록은 나를 이해하는 작은 발걸음일 뿐이에요.",
  ],
  comfort: [
    "오늘 힘드셨다면, 그만큼 힘든 하루였던 거예요. {characterName}가 옆에서 계속 응원할게요.",
    "잘하고 계세요, 정말로요. 몸이 보내는 신호를 들어주시는 것만으로도 대단한 일이에요.",
    "비교하지 않으셔도 돼요. {name}의 오늘은 {name}만의 속도로 가시면 돼요.",
    "물 한 잔 마시고 어깨 힘만 빼 보세요. 그것만으로도 오늘은 충분해요.",
    "내일이 걱정되시면, 오늘은 그 걱정을 잠깐 내려놓으셔도 괜찮아요. 제가 곁에 있을게요.",
  ],
};

const KO_NT: BuddySpeechLines = {
  menstrual: [
    "주인님, 현재 호르몬 변동 구간입니다. {characterName}가 우선순위를 '수면·휴식'으로 정리해 뒀어요.",
    "데이터상 오늘은 무리하지 않는 편이 효율적입니다. 가벼운 스트레칭 10분 정도면 충분해요.",
    "부종·무거움은 예상 가능한 반응입니다. 따뜻한 찜질과 수분 섭취를 권장합니다.",
    "일정을 줄이는 것도 합리적인 선택입니다. 오늘은 회복에 집중하세요.",
    "수면 시간을 30분 늘리면 다음 날 컨디션 회복 확률이 높아집니다.",
  ],
  follicular: [
    "에너지 지표가 상승하는 구간입니다. 가벼운 유산소 운동을 추천합니다.",
    "집중력이 회복되는 시기예요. 우선순위 높은 작업 하나를 배치해 보세요.",
    "단백질과 식이섬유를 균형 있게 섭취하면 컨디션 유지에 도움이 됩니다.",
    "아침 햇빛 10분은 생체 리듬 안정에 효과적입니다.",
    "{characterName} 분석 결과, 오늘은 새 루틴을 시험하기 좋은 날입니다.",
  ],
  ovulation: [
    "활력 지수가 최고점에 근접할 수 있습니다. 체력 소모가 큰 활동도 가능합니다.",
    "다만 과부하 신호가 오면 즉시 강도를 낮추는 것이 안전합니다.",
    "수면 시간이 줄어들 수 있는 구간입니다. 카페인 섭취를 조절해 보세요.",
    "단백질·건강한 지방 섭취로 에너지를 안정적으로 유지할 수 있어요.",
    "감정 기복이 있어도 자연스러운 변화입니다. 기록만 남겨두면 패턴 파악이 쉬워져요.",
  ],
  luteal: [
    "전황기로 민감도가 올라갈 수 있습니다. 일정 여유를 두는 것이 좋습니다.",
    "부종·무거움은 호르몬 변화의 정상 반응입니다. 자책할 필요 없습니다.",
    "복합 탄수화물과 마그네슘이 포함된 식단이 기분 안정에 도움이 될 수 있어요.",
    "15분 산책이나 가벼운 스트레칭으로 스트레스를 관리해 보세요.",
    "수면을 우선순위에 두면 다음 주기 진입이 더 수월해집니다.",
  ],
  onPeriod: [
    "휴식 단계로 분류됩니다. 오늘의 목표는 '최소 부담'으로 설정하세요.",
    "통증이 있으면 휴식이 최선의 대응입니다. {characterName}가 상태를 모니터링할게요.",
    "따뜻한 찜질과 수분 보충을 권장합니다.",
  ],
  default: [
    "주기 기록이 쌓이면 {characterName}가 더 정확한 분석을 제공할 수 있어요.",
    "{name}, 기분 버튼으로 오늘 상태를 알려 주시면 패턴 분석에 도움이 돼요.",
    "완벽한 기록보다 꾸준한 기록이 더 중요해요.",
  ],
  comfort: [
    "오늘 컨디션이 낮았다면, 그것도 유효한 데이터입니다.",
    "회복에 시간을 쓰는 것은 낭비가 아닙니다.",
    "비교 대신 오늘의 절대값만 보면 됩니다.",
    "짧은 휴식도 성과에 기여합니다.",
    "내일을 위해 오늘은 충분히 쉬어도 됩니다.",
  ],
};

const KO_SJ: BuddySpeechLines = {
  menstrual: [
    "주인님, 휴식 단계 확인됐습니다. 오늘 행동 지침: 수분 섭취, 가벼운 휴식, 과로 금지.",
    "{characterName} 보안관이 옆에서 지켜볼게요. 무리한 일정은 오늘 보류하세요.",
    "따뜻한 찜질팩과 충분한 수면을 체크리스트에 넣어 두세요.",
    "통증이 있으면 휴식 우선입니다. 몸의 신호를 최우선으로 따르세요.",
    "가벼운 스트레칭 10분만 허용 구간입니다. 그 이상은 내일로 미뤄요.",
  ],
  follicular: [
    "회복 구간 진입입니다. 규칙적인 식사와 가벼운 운동을 재개하기 좋은 날이에요.",
    "아침 햇빛 10분, 물 2잔 — 오늘의 기본 미션입니다.",
    "산책 15분이면 충분합니다. {characterName}가 함께 순찰할게요.",
    "집중이 필요한 일은 오전에 배치하는 것을 권장합니다.",
    "채소와 단백질을 골고루 챙기면 컨디션이 안정됩니다.",
  ],
  ovulation: [
    "활력 최고점 구간입니다. 계획했던 일정을 실행하기 적합합니다.",
    "체력 운동도 가능하지만, 과부하 경고 신호에 즉시 대응하세요.",
    "수면 시간이 줄어들 수 있으니 취침 루틴을 지켜 주세요.",
    "단백질 섭취를 늘리면 에너지 유지에 도움이 됩니다.",
    "오늘도 {characterName} 보안관이 주인님 곁을 지킵니다.",
  ],
  luteal: [
    "민감 구간입니다. 일정에 여유를 두고 감정 기복을 허용하세요.",
    "부종·무거움은 정상 반응입니다. 자책하지 마세요, 주인님.",
    "따뜻한 음식과 충분한 수면이 오늘의 보호 수칙입니다.",
    "카페인을 줄이고 저녁에는 화면 시간을 제한해 보세요.",
    "힘든 날에도 기록을 남기면 다음 주기 대비가 됩니다.",
  ],
  onPeriod: [
    "휴식 단계 — 오늘은 속도를 반드시 줄이세요. {characterName}가 경계합니다.",
    "찜질팩, 이불, 따뜻한 음료. 편안한 환경을 우선 확보하세요.",
    "통증이 있으면 휴식이 정답입니다. 제가 옆에 있을게요.",
  ],
  default: [
    "주기 기록을 시작하시면 {characterName}가 맞춤 안내를 드릴 수 있어요.",
    "{name}, 기분 버튼으로 오늘 상태를 알려 주세요. 기록이 곧 보호예요.",
    "완벽하지 않아도 괜찮아요. 꾸준함이 가장 중요해요.",
  ],
  comfort: [
    "오늘 힘들었다면, 그만큼 버틴 거예요. {characterName}가 인정합니다.",
    "쉬는 것도 지키는 일의 일부입니다.",
    "비교하지 마세요. 주인님만의 루틴이 맞습니다.",
    "물 한 잔, 어깨 힘 빼기 — 최소한의 회복 루틴입니다.",
    "내일을 위해 오늘은 충분히 쉬어도 됩니다. 제가 지켜볼게요.",
  ],
};

const KO_SP: BuddySpeechLines = {
  menstrual: [
    "으앗, 몸이 무거운 날이네! 괜찮아~ {characterName}랑 맛있는 거 먹으면서 기분만 확 바꿔보자! 🎉",
    "휴식 단계엔 속도 줄이는 게 대박 현명한 선택이야. 오늘은 느긋하게 가자!",
    "찜질팩+이불+좋아하는 음악 = 완벽 콤보! 같이 해볼래?",
    "통증 있어도 괜찮아, 몸이 신호 보내는 거니까. 오늘은 편한 것만 골라!",
    "10분 스트레칭만 해도 몸이 살짝 가벼워질 수 있어. {characterName}랑 가볍게!",
  ],
  follicular: [
    "에너지가 돌아오는 느낌! 오늘 뭐 재밌는 거 하나 해볼까? ✨",
    "산책이나 가벼운 조깅, 딱 좋은 타이밍이야! 신나게 가보자!",
    "베리랑 채소 한 접시 — 상쾌함 업그레이드 타임!",
    "햇빛 10분 쬐면 기분도 리듬도 업! 밖에 잠깐 나가볼래?",
    "{characterName} 예감인데, 오늘 뭔가 잘 될 것 같은데?",
  ],
  ovulation: [
    "와! 오늘 에너지 최고조일 수 있어! 하고 싶은 거 하나 골라봐!",
    "운동하기 딱 좋은 날! 단, 몸이 '그만' 하면 바로 쉬는 것도 스킬이야.",
    "기분 좋으면 그대로 즐겨도 돼! 오늘은 반짝이는 날이니까!",
    "단백질 챙기면 활력 유지 끝판왕! 달걀, 생선 어때?",
    "잠이 줄어들 수 있으니 밤엔 스크린 좀 줄이고 충전 타임!",
  ],
  luteal: [
    "감정 롤러코스터 탈 수 있는 시기야. 타도 괜찮아, 내려도 괜찮아!",
    "몸이 무겁게 느껴지면 그냥 호르몬 파티 중인 거야. 오늘은 나한테 잔뜩 기대!",
    "고구마, 바나나, 따뜻한 차 — 위로 간식 타임 어때?",
    "15분 산책이면 기분 전환 끝! {characterName}랑 바람 쐬러 가자!",
    "일찍 자면 내일이 훨씬 가벼워져. 오늘은 일찍 충전!",
  ],
  onPeriod: [
    "휴식 단계! 오늘은 슬로우 모드 ON! {characterName}랑 편하게 쉬자 🤍",
    "찜질팩+포근한 이불=필수템. 지금 필요한 건 휴식이야!",
    "아프면 더 쉬어도 돼. 오늘은 주인님이 주인공!",
  ],
  default: [
    "기록을 시작하시면 {characterName}가 더 많은 이야기를 들려드릴 수 있어요. 천천히 함께해 보실래요?",
    "{name}, 기분 버튼을 눌러 지금 마음을 들려주시면 정말 기뻐요.",
    "완벽하지 않아도 괜찮아요. 조금씩만 함께 가요.",
  ],
  comfort: [
    "오늘 힘드셨다면 그만큼 대단하신 거예요. {characterName}가 응원하고 있어요.",
    "쉬는 것도 실력이에요. 오늘은 휴식이 정답이에요.",
    "남과 비교하지 않으셔도 돼요. {name}의 속도가 가장 좋은 속도예요.",
    "물 한 잔 마시고 쉬어 보세요. 이것만으로도 충분해요.",
    "내일 걱정은 내일로 미뤄도 괜찮아요. 오늘은 제가 곁에서 함께 쉬어요.",
  ],
};

const EN_NF: BuddySpeechLines = {
  menstrual: [
    "Your body feels heavy, right? {characterName} will grab a cozy heat pack—stay in bed today 🤍",
    "Hormones are shifting gently. Just breathing under a blanket is enough; I'll stay right here.",
    "Warm soup or ginger tea together? Once you unwind, I'll hug you even tighter.",
    "Skip heavy workouts. Even 10 minutes of light stretch with {characterName} is plenty.",
    "An early night helps. A warm shower and deep rest can make tomorrow lighter.",
  ],
  follicular: [
    "Energy is quietly returning! {characterName} is excited with you ✨",
    "Fresh veggies and berries—shall we plate some? Your body might feel brighter.",
    "A light walk fits today perfectly. Let's go slowly, without pushing.",
    "Ten minutes of morning sun resets your rhythm. One small step is enough.",
    "Focus might come easier. Pick one tiny thing you've been wanting to try.",
  ],
  ovulation: [
    "Today your energy might peak! {characterName} feels bubbly too!",
    "Fuel up with protein and healthy fats—eggs, fish, avocado sound perfect.",
    "Harder workouts can feel great—still, your body's signals come first.",
    "You might feel chatty or upbeat—that's okay. Let the feeling be what it is.",
    "Sleep might shorten a bit. Maybe trim screen time tonight?",
  ],
  luteal: [
    "Sensitivity can show up now—that's hormonal, not your fault, dear.",
    "Bloating or heaviness? Natural response. {characterName} stays beside you.",
    "Sweet potato, brown rice, or a banana might steady your mood a little.",
    "A 15-minute walk or soft stretch is enough. Moving less is fine too.",
    "Prioritize sleep tonight. Quiet music and rest can help a lot.",
  ],
  onPeriod: [
    "You're on your period—slow way down. {characterName} keeps watch beside you.",
    "Heat pack, cozy blanket—whatever helps. What you need now is rest 🤍",
    "Pain is a signal, not a failure. Today we choose comfort only.",
  ],
  default: [
    "Log your cycle and {characterName} can share more tailored stories. Let's start gently!",
    "You did well today. Tap a mood button and show me how your heart feels?",
    "You don't have to be perfect. Logging is a small step toward understanding you.",
  ],
  comfort: [
    "If today was hard, it was hard enough. {characterName} cheers for you always.",
    "You're doing enough—really. Listening to your body is already big.",
    "No comparing needed. Your today moves at your pace only.",
    "Sip water and drop your shoulders. That's enough for today.",
    "If tomorrow worries you, set that down tonight. I'm here.",
  ],
};

const EN_NT: BuddySpeechLines = {
  menstrual: [
    "Hormone fluctuation detected. {characterName} has set priority to sleep and rest.",
    "Data suggests avoiding strain today. Ten minutes of light stretching is sufficient.",
    "Bloating and heaviness are expected responses. Warm compress and hydration recommended.",
    "Reducing your schedule is a rational choice. Focus on recovery.",
    "Adding 30 minutes of sleep improves next-day recovery probability.",
  ],
  follicular: [
    "Energy indicators are rising. Light cardio is recommended.",
    "Focus is recovering—schedule one high-priority task.",
    "Balanced protein and fiber help maintain condition.",
    "Ten minutes of morning sun stabilizes circadian rhythm.",
    "{characterName} analysis: good day to trial a new routine.",
  ],
  ovulation: [
    "Vitality index may peak. Higher-intensity activity is viable.",
    "If overload signals appear, reduce intensity immediately.",
    "Sleep duration may decrease—moderate caffeine intake.",
    "Protein and healthy fats stabilize energy output.",
    "Mood swings are natural variation—logging helps pattern detection.",
  ],
  luteal: [
    "Transition phase—sensitivity may increase. Allow schedule buffer.",
    "Bloating is a normal hormonal response. No self-blame needed.",
    "Complex carbs and magnesium may support mood stability.",
    "Fifteen-minute walks manage stress efficiently.",
    "Prioritize sleep before the next cycle phase.",
  ],
  onPeriod: [
    "Period status active. Set today's goal to minimum load.",
    "If pain present, rest is optimal response. {characterName} monitors status.",
    "Warm compress and hydration advised.",
  ],
  default: [
    "More cycle logs enable sharper analysis from {characterName}.",
    "Tap mood button—inputs improve pattern analysis.",
    "Consistency matters more than perfect logs.",
  ],
  comfort: [
    "Low condition today is still valid data.",
    "Recovery time is not wasted time.",
    "Compare today to today only—not others.",
    "Short breaks contribute to outcomes.",
    "Rest tonight is permitted for tomorrow's performance.",
  ],
};

const EN_SJ: BuddySpeechLines = {
  menstrual: [
    "Period phase confirmed. Today's protocol: hydration, light rest, no overwork.",
    "{characterName} Guard is on duty. Postpone demanding schedules.",
    "Checklist: heat pack, adequate sleep, warm fluids.",
    "If pain present, rest takes priority. Body signals lead.",
    "Light stretch up to 10 minutes only—defer the rest to tomorrow.",
  ],
  follicular: [
    "Recovery phase entered. Resume regular meals and light exercise.",
    "Morning sun 10 min, water 2 glasses—today's base mission.",
    "Fifteen-minute patrol walk with {characterName} is sufficient.",
    "Schedule focus tasks in the morning window.",
    "Vegetables and protein together stabilize condition.",
  ],
  ovulation: [
    "Peak vitality window. Suitable for planned tasks.",
    "Strenuous exercise allowed—respond immediately to overload warnings.",
    "Sleep may shorten—maintain bedtime routine.",
    "Increase protein for sustained energy.",
    "{characterName} Guard remains at your side today.",
  ],
  luteal: [
    "Sensitive phase—allow emotional variance and schedule slack.",
    "Bloating is normal. No self-blame, dear.",
    "Warm foods and full sleep are today's protection rules.",
    "Reduce caffeine; limit screens in the evening.",
    "Logging on hard days prepares the next cycle.",
  ],
  onPeriod: [
    "On period—mandatory slow mode. {characterName} Guard on watch.",
    "Heat pack, blanket, warm drink—secure comfort first.",
    "If pain exists, rest is the correct answer. I'm here.",
  ],
  default: [
    "Start logging and {characterName} delivers tailored guidance.",
    "Mood button updates today's status—records protect you.",
    "Imperfect but steady logs are best.",
  ],
  comfort: [
    "If today was hard, you endured enough. {characterName} acknowledges it.",
    "Rest is part of the duty.",
    "No comparisons—your routine is correct.",
    "Water and shoulder drop—minimum recovery routine.",
    "Rest tonight; I'll keep watch.",
  ],
};

const EN_SP: BuddySpeechLines = {
  menstrual: [
    "Whoa, heavy-body day! No worries—{characterName} says snack break and vibe switch! 🎉",
    "Period time = slow mode. Smart move to take it easy today!",
    "Heat pack + blanket + fave music = perfect combo. Try it?",
    "Pain means your body's talking—pick only comfy options today!",
    "Ten-minute stretch might lighten things up. Let's go easy with {characterName}!",
  ],
  follicular: [
    "Energy's bouncing back! Wanna try something fun today? ✨",
    "Walk or light jog—perfect timing! Let's go!",
    "Berries and veggies plate = refresh upgrade!",
    "Ten minutes of sun boosts mood and rhythm. Step outside?",
    "{characterName} has a hunch today might sparkle!",
  ],
  ovulation: [
    "Energy might max out today! Pick one thing you've wanted to do!",
    "Great workout day—if your body says stop, stopping is a skill too.",
    "Feeling good? Enjoy it—today's a shiny day!",
    "Protein keeps the buzz going—eggs or fish?",
    "Sleep might dip—trim screens and recharge tonight!",
  ],
  luteal: [
    "Emotional roller coaster possible—ride or step off, both fine!",
    "Heavy feeling? Hormone party in progress. Lean on me today!",
    "Sweet potato, banana, warm tea—comfort snack time?",
    "Fifteen-minute walk = instant mood flip. {characterName} joins!",
    "Early sleep makes tomorrow lighter. Charge up tonight!",
  ],
  onPeriod: [
    "Period mode ON—slow down with {characterName} today 🤍",
    "Heat pack + cozy blanket = must-haves. Rest is the mission!",
    "Hurting? Rest more. You're the star today!",
  ],
  default: [
    "Start logging—{characterName} has cooler stories waiting!",
    "Tap mood button—I wanna know your heart right now!",
    "No perfection needed. Small steps together!",
  ],
  comfort: [
    "Hard day means you were awesome! {characterName} cheers loud!",
    "Resting is a skill too. Today rest wins!",
    "No compare game—your pace is top speed!",
    "Sip water and chill. That's enough!",
    "Tomorrow worries wait—today we rest together!",
  ],
};

const JA_NF: BuddySpeechLines = {
  menstrual: [
    "ご主人様、体が重いよね？{characterName}がふわふわ温熱パック用意するね。今日はどこにも行かなくていいよ 🤍",
    "ホルモンがゆらゆらする時期。布団の中で呼吸するだけでいい。ずっとそばにいるから。",
    "温かいスープや生姜茶、一緒にどう？体がほぐれたらもっとぎゅっとするね。",
    "激しい運動はお休み。{characterName}と10分ストレッチだけしよう。",
    "いつもより早く寝るのもいい日。温かいシャワーのあとゆっくり休もう。",
  ],
  follicular: [
    "エネルギーが少しずつ戻ってくる時期！{characterName}もわくわく ✨",
    "新鮮な野菜やベリー、一緒に食べてみない？体がすっきりするかも。",
    "軽い散歩がぴったり。無理せずゆっくりね。",
    "朝の日光10分でリズムが整うよ。小さな一歩だけ踏み出してみよう。",
    "集中しやすい日かも。やりたかった小さなことを一つ選んでみて。",
  ],
  ovulation: [
    "今日はエネルギー最高潮かも！{characterName}もご機嫌！",
    "タンパク質と良い脂質で元気チャージ。卵、魚、アボカドがぴったり。",
    "体力運動も合う日。でも体のサインが最優先だよ。",
    "気分が高くなる日もある。そのまま受け入れていいよ。",
    "眠りが浅くなる時期かも。今夜はスクリーン少し減らそう。",
  ],
  luteal: [
    "心と体が敏感になりやすい時期。感情が揺れても自分を責めなくていいよ。",
    "むくみや重さは自然な反応。{characterName}がそばにいるから。",
    "さつまいもや玄米、バナナが気分の安定に役立つかも。",
    "15分の散歩ややわらかいストレッチで十分。動かない日でも大丈夫。",
    "睡眠をたっぷりとる日。静かな音楽と一緒に休もう。",
  ],
  onPeriod: [
    "生理中だから、今日はペースをぐっと落として大丈夫。{characterName}が見守るよ。",
    "温熱パックやふわふわの毛布、何でもいいよ。今必要なのは休息 🤍",
    "痛みがあるのも体のサイン。今日は楽な方だけを選ぼう。",
  ],
  default: [
    "周期記録を始めると、{characterName}がもっと寄り添った話ができるよ。",
    "気分ボタンを押して、今の気持ちを見せてくれる？",
    "完璧じゃなくていい。記録は自分を知る小さな一歩だよ。",
  ],
  comfort: [
    "今日がつらかったなら、それだけつらい日だったんだよ。{characterName}が応援してる。",
    "十分やってるよ、本当に。体の声に耳を傾けるだけで立派だよ。",
    "比べなくていい。あなたの今日はあなたのペースでいい。",
    "水を一口飲んで、肩の力を抜いて。それだけで今日は十分。",
    "明日が心配なら、今夜は少し置いておいてもいい。そばにいるから。",
  ],
};

const JA_NT: BuddySpeechLines = {
  menstrual: [
    "ご主人様、現在ホルモン変動区間です。{characterName}が優先順位を睡眠・休息に設定しました。",
    "データ上、今日は無理しない方が効率的です。軽いストレッチ10分で十分です。",
    "むくみ・重さは予測可能な反応です。温熱と水分補給を推奨します。",
    "予定を減らすのも合理的な選択です。今日は回復に集中してください。",
    "睡眠30分延長で翌日の回復確率が上がります。",
  ],
  follicular: [
    "エネルギー指標が上昇中です。軽い有酸素運動を推奨します。",
    "集中力が回復する時期。優先度の高い作業を一つ配置しましょう。",
    "タンパク質と食物繊維のバランスがコンディション維持に有効です。",
    "朝の日光10分は生体リズムの安定に効果的です。",
    "{characterName}の分析では、新ルーティンを試すのに良い日です。",
  ],
  ovulation: [
    "活力指数が最高点に近づく可能性があります。体力を使う活動も可能です。",
    "過負荷のサインがあれば、すぐに強度を下げてください。",
    "睡眠時間が短くなる区間です。カフェイン摂取を調整しましょう。",
    "タンパク質と良い脂質でエネルギーを安定維持できます。",
    "感情の揺れも自然な変化です。記録がパターン把握に役立ちます。",
  ],
  luteal: [
    "移行期で敏感度が上がる可能性があります。予定に余裕を持ちましょう。",
    "むくみ・重さはホルモン変化の正常反応です。自分を責めないでください。",
    "複合炭水化物とマグネシウムが気分安定に役立つことがあります。",
    "15分の散歩や軽いストレッチでストレス管理を。",
    "睡眠を優先すると次の周期への移行がスムーズになります。",
  ],
  onPeriod: [
    "生理中と分類されます。今日の目標は最小負担に設定してください。",
    "痛みがあれば休息が最善の対応です。{characterName}が状態をモニタリングします。",
    "温熱と水分補給を推奨します。",
  ],
  default: [
    "周期記録が増えると、{characterName}がより正確な分析を提供できます。",
    "気分ボタンで今日の状態を入力してください。パターン分析に活用します。",
    "完璧な記録より継続的な記録が重要です。",
  ],
  comfort: [
    "今日のコンディションが低くても、それも有効なデータです。",
    "回復に時間を使うことは無駄ではありません。",
    "比較ではなく、今日の絶対値だけを見ましょう。",
    "短い休息も成果に貢献します。",
    "明日のために、今日は十分休んで大丈夫です。",
  ],
};

const JA_SJ: BuddySpeechLines = {
  menstrual: [
    "ご主人様、生理期間を確認しました。本日の行動指針：水分補給、軽い休息、過労禁止。",
    "{characterName}保安官がそばで見守ります。無理な予定は今日は保留を。",
    "温熱パックと十分な睡眠をチェックリストに入れてください。",
    "痛みがあれば休息優先です。体のサインを最優先に。",
    "軽いストレッチ10分まで。それ以上は明日に回しましょう。",
  ],
  follicular: [
    "回復区間に入りました。規則正しい食事と軽い運動を再開するのに良い日です。",
    "朝の日光10分、水2杯—今日の基本ミッションです。",
    "15分の散歩で十分です。{characterName}が一緒に巡回します。",
    "集中が必要な作業は午前中に配置することを推奨します。",
    "野菜とタンパク質をバランスよく摂るとコンディションが安定します。",
  ],
  ovulation: [
    "活力最高潮の区間です。計画していた予定の実行に適しています。",
    "体力運動も可能ですが、過負荷警告には即座に対応してください。",
    "睡眠時間が短くなる可能性があるので、就寝ルーティンを守ってください。",
    "タンパク質摂取を増やすとエネルギー維持に役立ちます。",
    "今日も{characterName}保安官がご主人様のそばを守ります。",
  ],
  luteal: [
    "敏感な区間です。予定に余裕を持ち、感情の揺れを許容してください。",
    "むくみ・重さは正常反応です。自分を責めないでください、ご主人様。",
    "温かい食事と十分な睡眠が本日の保護ルールです。",
    "カフェインを控え、夜は画面時間を制限しましょう。",
    "つらい日も記録を残せば、次の周期の備えになります。",
  ],
  onPeriod: [
    "生理中—今日は必ずペースを落としてください。{characterName}が警戒します。",
    "温熱パック、毛布、温かい飲み物。快適な環境を最優先で。",
    "痛みがあれば休息が正解です。そばにいます。",
  ],
  default: [
    "周期記録を始めると、{characterName}が合わせた案内ができます。",
    "気分ボタンで今日の状態を教えてください。記録が守りになります。",
    "完璧でなくても大丈夫。継続がいちばん大切です。",
  ],
  comfort: [
    "今日つらかったなら、それだけ耐えたということです。{characterName}が認めます。",
    "休むことも守る仕事の一部です。",
    "比較しないで。ご主人様のルーティンが正解です。",
    "水を一口、肩の力を抜く—最小限の回復ルーティンです。",
    "明日のために、今日は十分休んで大丈夫。見守っています。",
  ],
};

const JA_SP: BuddySpeechLines = {
  menstrual: [
    "わっ、体が重い日だね！大丈夫—{characterName}とおいしいもの食べて気分チェンジ！🎉",
    "生理期間はスローモードが正解！今日はのんびりいこう！",
    "温熱パック＋毛布＋好きな音楽＝最強コンボ！やってみる？",
    "痛みも体のサイン。今日は楽なことだけ選ぼう！",
    "10分ストレッチで少し軽くなるかも。{characterName}と軽くやろう！",
  ],
  follicular: [
    "エネルギーが戻ってくる感じ！今日なにか楽しいことしない？✨",
    "散歩や軽いジョギング、ぴったりのタイミング！いこう！",
    "ベリーと野菜のプレート＝リフレッシュアップ！",
    "日光10分で気分もリズムもアップ！外に出てみる？",
    "{characterName}の予感、今日キラキラしそう！",
  ],
  ovulation: [
    "今日エネルギー最大級かも！やりたいこと一つ選んで！",
    "運動にぴったりの日—でも体がストップと言ったら休むのもスキル！",
    "気分いいならそのまま楽しんで！今日はキラキラの日！",
    "タンパク質でテンション維持！卵や魚どう？",
    "眠りが浅くなるかも—今夜はスクリーン控えて充電！",
  ],
  luteal: [
    "感情のジェットコースターあり—乗っても降りてもOK！",
    "重い感じ？ホルモンパーティー中だよ。今日はたくさん頼って！",
    "さつまいも、バナナ、温かいお茶—慰めスナックタイム？",
    "15分散歩で気分転換！{characterName}も参加！",
    "早く寝れば明日が軽くなる。今夜は充電！",
  ],
  onPeriod: [
    "生理期間モードON—{characterName}とゆっくり休もう 🤍",
    "温熱パック＋ふわふわ毛布＝必須。今必要なのは休息！",
    "痛いならもっと休んで。今日の主役はご主人様！",
  ],
  default: [
    "記録始めると{characterName}がもっと面白い話できるよ！一緒にやろう！",
    "気分ボタン押して！今の気持ち知りたい！",
    "完璧じゃなくていい。少しずつ一緒にいこう！",
  ],
  comfort: [
    "今日つらかったならそれだけすごい！{characterName}が応援中！",
    "休むのも実力だよ。今日は休息が正解！",
    "比較ゲーム禁止—ご主人様のペースが最速！",
    "水を飲んでチル。それで十分！",
    "明日の心配は明日—今日は一緒に休もう！",
  ],
};

const PERSONA_SPEECH_KO: Record<TemperamentGroup, BuddySpeechLines> = {
  NF: KO_NF,
  NT: KO_NT,
  SJ: KO_SJ,
  SP: KO_SP,
};

const PERSONA_SPEECH_EN: Record<TemperamentGroup, BuddySpeechLines> = {
  NF: EN_NF,
  NT: EN_NT,
  SJ: EN_SJ,
  SP: EN_SP,
};

const PERSONA_SPEECH_JA: Record<TemperamentGroup, BuddySpeechLines> = {
  NF: JA_NF,
  NT: JA_NT,
  SJ: JA_SJ,
  SP: JA_SP,
};

const PERSONA_SPEECH: Record<Language, Record<TemperamentGroup, BuddySpeechLines>> =
  {
    KO: PERSONA_SPEECH_KO,
    EN: PERSONA_SPEECH_EN,
    JA: PERSONA_SPEECH_JA,
  };

export function getPersonaSpeechLines(
  language: Language,
  temperament: TemperamentGroup,
): BuddySpeechLines {
  return PERSONA_SPEECH[language]?.[temperament] ?? PERSONA_SPEECH_KO[temperament];
}

export function getPersonaSpeechPhaseLines(
  language: Language,
  temperament: TemperamentGroup,
  phase: BuddySpeechPhase,
): string[] {
  return getPersonaSpeechLines(language, temperament)[phase];
}
