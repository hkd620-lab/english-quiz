export interface Usage {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  examples: { en: string; ko: string }[];
  distractors: string[];
}

export const USAGES: Usage[] = [
  {
    id: 'who_whom',
    title: 'Who / Whom',
    description: '사람에 대해 묻기',
    emoji: '🧑',
    color: 'blue',
    examples: [
      { en: 'Who is your best friend?', ko: '당신의 가장 친한 친구는 누구인가요?' },
      { en: 'Who called you last night?', ko: '어젯밤에 누가 당신에게 전화했나요?' },
      { en: 'Whom did you meet at the party?', ko: '파티에서 누구를 만났나요?' },
      { en: 'Who teaches your English class?', ko: '누가 당신의 영어 수업을 가르치나요?' },
      { en: 'Whom should I contact for help?', ko: '도움을 위해 누구에게 연락해야 하나요?' },
    ],
    distractors: ['Whose', 'Which', 'What'],
  },
  {
    id: 'whose',
    title: 'Whose',
    description: '소유자에 대해 묻기',
    emoji: '👜',
    color: 'purple',
    examples: [
      { en: 'Whose bag is this?', ko: '이것은 누구의 가방인가요?' },
      { en: 'Whose turn is it to cook?', ko: '요리할 차례는 누구인가요?' },
      { en: 'Whose idea was the project?', ko: '그 프로젝트는 누구의 아이디어였나요?' },
      { en: 'Whose phone keeps ringing?', ko: '누구의 전화기가 계속 울리고 있나요?' },
      { en: 'Whose car is parked outside?', ko: '밖에 주차된 차는 누구의 것인가요?' },
    ],
    distractors: ['Who', 'Whom', 'What'],
  },
  {
    id: 'what',
    title: 'What',
    description: '사물이나 정보에 대해 묻기',
    emoji: '🔍',
    color: 'orange',
    examples: [
      { en: 'What is your favorite color?', ko: '당신이 가장 좋아하는 색은 무엇인가요?' },
      { en: 'What did you eat for breakfast?', ko: '아침 식사로 무엇을 먹었나요?' },
      { en: 'What time does the store close?', ko: '가게는 몇 시에 문을 닫나요?' },
      { en: 'What are you studying at school?', ko: '학교에서 무엇을 공부하고 있나요?' },
      { en: 'What happened at the meeting?', ko: '회의에서 무슨 일이 있었나요?' },
    ],
    distractors: ['How', 'Which', 'Where'],
  },
  {
    id: 'which',
    title: 'Which',
    description: '정해진 범위에서 선택 묻기',
    emoji: '🔀',
    color: 'teal',
    examples: [
      { en: 'Which bus goes to the airport?', ko: '어느 버스가 공항으로 가나요?' },
      { en: 'Which do you prefer, tea or coffee?', ko: '차와 커피 중 어느 것을 더 좋아하나요?' },
      { en: 'Which team won the game?', ko: '어느 팀이 경기에서 이겼나요?' },
      { en: 'Which seat would you like?', ko: '어느 좌석을 원하시나요?' },
      { en: 'Which movie shall we watch tonight?', ko: '오늘 밤 어떤 영화를 볼까요?' },
    ],
    distractors: ['What', 'Where', 'Who'],
  },
  {
    id: 'where',
    title: 'Where',
    description: '장소나 위치에 대해 묻기',
    emoji: '📍',
    color: 'green',
    examples: [
      { en: 'Where is the nearest hospital?', ko: '가장 가까운 병원은 어디인가요?' },
      { en: 'Where did you grow up?', ko: '어디에서 자랐나요?' },
      { en: 'Where are my keys?', ko: '내 열쇠가 어디 있나요?' },
      { en: 'Where should we meet tomorrow?', ko: '내일 어디서 만나야 하나요?' },
      { en: 'Where does this road lead?', ko: '이 길은 어디로 이어지나요?' },
    ],
    distractors: ['When', 'What', 'Who'],
  },
  {
    id: 'when',
    title: 'When',
    description: '시간이나 시점에 대해 묻기',
    emoji: '⏰',
    color: 'yellow',
    examples: [
      { en: 'When is your birthday?', ko: '당신의 생일은 언제인가요?' },
      { en: 'When did you arrive in Seoul?', ko: '서울에 언제 도착했나요?' },
      { en: 'When does the next train leave?', ko: '다음 기차는 언제 출발하나요?' },
      { en: 'When will you finish the report?', ko: '언제 보고서를 완성할 건가요?' },
      { en: 'When can we schedule a meeting?', ko: '언제 미팅을 잡을 수 있나요?' },
    ],
    distractors: ['Where', 'Why', 'What'],
  },
  {
    id: 'why',
    title: 'Why',
    description: '이유나 원인에 대해 묻기',
    emoji: '💡',
    color: 'red',
    examples: [
      { en: 'Why are you so tired today?', ko: '오늘 왜 그렇게 피곤한가요?' },
      { en: 'Why did she leave early?', ko: '그녀는 왜 일찍 떠났나요?' },
      { en: 'Why is the sky blue?', ko: '하늘은 왜 파란색인가요?' },
      { en: 'Why do cats sleep so much?', ko: '고양이는 왜 그렇게 많이 자나요?' },
      { en: 'Why should we study English?', ko: '왜 영어를 공부해야 하나요?' },
    ],
    distractors: ['How', 'What', 'When'],
  },
  {
    id: 'how',
    title: 'How',
    description: '방법이나 상태에 대해 묻기',
    emoji: '⚙️',
    color: 'indigo',
    examples: [
      { en: 'How are you feeling today?', ko: '오늘 기분이 어떠세요?' },
      { en: 'How do you get to work?', ko: '직장에 어떻게 가나요?' },
      { en: 'How long does it take to cook?', ko: '요리하는 데 얼마나 걸리나요?' },
      { en: 'How many siblings do you have?', ko: '형제자매가 몇 명 있나요?' },
      { en: 'How often do you exercise?', ko: '얼마나 자주 운동하나요?' },
    ],
    distractors: ['Why', 'What', 'Which'],
  },
];
