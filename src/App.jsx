import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, CheckCircle, XCircle, Info, ArrowRight, RotateCcw, Award, Settings, Check, Lightbulb, Search } from 'lucide-react';

const USAGES = [
  {
    id: 'who_whom',
    title: 'Who / Whom (사람)',
    description: '사람에 대해 물을 때 사용합니다. Who는 주격, Whom은 목적격으로 쓰이지만 구어체에서는 Who를 주로 사용합니다.',
    examples: [
      { en: "Who is your best friend?", ko: "당신의 가장 친한 친구는 누구입니까?" },
      { en: "Who called you last night?", ko: "어젯밤에 누가 전화했니?" },
      { en: "Whom did you meet there?", ko: "거기서 누구를 만났나요?" },
      { en: "Who broke this window?", ko: "누가 이 창문을 깼나요?" },
      { en: "Who is at the door?", ko: "문에 누가 있나요?" }
    ],
    distractors: ['whose', 'which']
  },
  {
    id: 'whose',
    title: 'Whose (소유)',
    description: '어떤 물건의 소유주가 누구인지 물을 때 사용하며, "누구의 것"이라는 의미를 가집니다.',
    examples: [
      { en: "Whose umbrella is this?", ko: "이것은 누구의 우산인가요?" },
      { en: "Whose turn is it now?", ko: "이제 누구 차례인가요?" },
      { en: "Whose idea was it?", ko: "그것은 누구의 아이디어였나요?" },
      { en: "Whose phone are you using?", ko: "누구의 전화를 사용하고 있니?" },
      { en: "Whose car is parked outside?", ko: "밖에 주차된 차는 누구의 것인가요?" }
    ],
    distractors: ['who', 'whom']
  },
  {
    id: 'what',
    title: 'What (정보/사물)',
    description: '사물의 이름, 성격, 직업 등 구체적인 정보를 물을 때 사용합니다.',
    examples: [
      { en: "What is your father's job?", ko: "당신의 아버지의 직업은 무엇입니까?" },
      { en: "What are you thinking about?", ko: "무슨 생각을 하고 있나요?" },
      { en: "What time does it start?", ko: "몇 시에 시작하나요?" },
      { en: "What size do you wear?", ko: "사이즈를 무엇으로 입으시나요?" },
      { en: "What is the matter with you?", ko: "당신에게 무슨 문제가 있나요?" }
    ],
    distractors: ['how', 'which']
  },
  {
    id: 'which',
    title: 'Which (선택)',
    description: '제한된 범위 내에서 하나를 선택해야 할 때 "어느 것"이라는 의미로 사용합니다.',
    examples: [
      { en: "Which color do you prefer?", ko: "어떤 색을 더 선호하시나요?" },
      { en: "Which way is the station?", ko: "역으로 가는 길은 어느 쪽인가요?" },
      { en: "Which do you like better?", ko: "어느 쪽을 더 좋아하시나요?" },
      { en: "Which movie did you watch?", ko: "어느 영화를 보셨나요?" },
      { en: "Which season is the best?", ko: "어느 계절이 최고인가요?" }
    ],
    distractors: ['what', 'where']
  },
  {
    id: 'where',
    title: 'Where (장소)',
    description: '위치나 장소를 물을 때 사용합니다.',
    examples: [
      { en: "Where do you live?", ko: "당신은 어디에 사시나요?" },
      { en: "Where is the nearest bank?", ko: "가장 가까운 은행은 어디인가요?" },
      { en: "Where are my keys?", ko: "내 열쇠가 어디에 있지?" },
      { en: "Where did you go yesterday?", ko: "어제 어디에 갔었나요?" },
      { en: "Where is she from?", ko: "그녀는 어디 출신인가요?" }
    ],
    distractors: ['when', 'there']
  },
  {
    id: 'when',
    title: 'When (시간)',
    description: '시간, 날짜, 시기 등을 물을 때 사용합니다.',
    examples: [
      { en: "When is your birthday?", ko: "당신의 생일은 언제입니까?" },
      { en: "When did you arrive?", ko: "언제 도착하셨나요?" },
      { en: "When is the deadline?", ko: "마감 기한이 언제인가요?" },
      { en: "When can we meet again?", ko: "우리 언제 다시 만날 수 있을까요?" },
      { en: "When does the store close?", ko: "가게가 언제 문을 닫나요?" }
    ],
    distractors: ['where', 'then']
  },
  {
    id: 'why',
    title: 'Why (이유)',
    description: '원인이나 이유를 물을 때 사용하며, 대답할 때 주로 Because를 사용합니다.',
    examples: [
      { en: "Why are you so late?", ko: "왜 이렇게 늦었나요?" },
      { en: "Why did you say that?", ko: "왜 그렇게 말했나요?" },
      { en: "Why is he crying?", ko: "그는 왜 울고 있나요?" },
      { en: "Why do we need this?", ko: "우리는 이것이 왜 필요한가요?" },
      { en: "Why is the sky blue?", ko: "하늘은 왜 파란색인가요?" }
    ],
    distractors: ['how', 'what']
  },
  {
    id: 'how',
    title: 'How (방법/상태)',
    description: '방법, 수단, 정도, 혹은 안부나 상태를 물을 때 사용합니다.',
    examples: [
      { en: "How do you spell it?", ko: "그것의 철자가 어떻게 되나요?" },
      { en: "How far is the airport?", ko: "공항까지 얼마나 먼가요?" },
      { en: "How was your weekend?", ko: "주말은 어떻게 보내셨나요?" },
      { en: "How can I help you?", ko: "어떻게 도와드릴까요?" },
      { en: "How often do you exercise?", ko: "얼마나 자주 운동하시나요?" }
    ],
    distractors: ['why', 'way']
  }
];

const App = () => {
  const [currentStep, setCurrentStep] = useState('landing');
  const [currentUsageIdx, setCurrentUsageIdx] = useState(0);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0); 
  const [quizSentence, setQuizSentence] = useState(null);
  const [userSelection, setUserSelection] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [nativeVoice, setNativeVoice] = useState(null);

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered');
        }).catch(error => {
          console.log('SW registration failed');
        });
      });
    }
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = 
        voices.find(v => v.name.includes('Google') && v.lang.includes('en-US')) ||
        voices.find(v => v.name.includes('Samantha')) ||
        voices.find(v => v.lang.includes('en-US'));
      setNativeVoice(bestVoice);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (nativeVoice) utterance.voice = nativeVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }, [nativeVoice]);

  const setupQuiz = useCallback((qIdx) => {
    const usage = USAGES[currentUsageIdx];
    const sentence = usage.examples[qIdx];
    const words = sentence.en.replace(/[.!?,]/g, "").split(" ");
    const distractors = usage.distractors;
    
    const allCards = [...words, ...distractors]
      .map((text, id) => ({ id: `card-${id}-${Math.random()}`, text }))
      .sort(() => Math.random() - 0.5);

    setQuizSentence(sentence);
    setShuffledCards(allCards);
    setUserSelection([]);
    setFeedback(null);
    setCurrentStep('quiz');
  }, [currentUsageIdx]);

  const handleCardClick = (card, fromBank) => {
    if (fromBank) {
      setShuffledCards(prev => prev.filter(c => c.id !== card.id));
      setUserSelection(prev => [...prev, card]);
    } else {
      setUserSelection(prev => prev.filter(c => c.id !== card.id));
      setShuffledCards(prev => [...prev, card]);
    }
  };

  const checkAnswer = () => {
    const userString = userSelection.map(c => c.text).join(" ").toLowerCase();
    const correctString = quizSentence.en.replace(/[.!?,]/g, "").toLowerCase();

    if (userString === correctString) {
      setFeedback({ type: 'correct', message: '정답입니다! 완벽한 의문문이에요.' });
      speak(quizSentence.en);
    } else {
      setFeedback({ type: 'wrong', message: '단어 순서가 맞지 않거나 방해 단어가 포함되었습니다.' });
    }
  };

  const nextQuizOrStep = () => {
    if (currentQuizIdx < 4) {
      const nextIdx = currentQuizIdx + 1;
      setCurrentQuizIdx(nextIdx);
      setupQuiz(nextIdx);
    } else {
      if (currentUsageIdx < USAGES.length - 1) {
        setCurrentUsageIdx(prev => prev + 1);
        setCurrentQuizIdx(0);
        setCurrentStep('learn');
      } else {
        setCurrentStep('final_result');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Interrogative Pro</h1>
              <p className="text-slate-400 text-xs uppercase tracking-widest">허교장 선생님의 의문사 정복</p>
            </div>
          </div>
          {currentStep !== 'landing' && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[10px] font-mono bg-slate-800 px-3 py-1 rounded-full text-indigo-400">
                의문사 {currentUsageIdx + 1} / {USAGES.length}
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          {currentStep === 'landing' && (
            <div className="text-center space-y-8 py-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                   <Volume2 size={48} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">8대 의문사 완벽 정복</h2>
                <p className="text-slate-500 mt-3 leading-relaxed">
                  Who부터 How까지, 영어 질문의 모든 것을 마스터하세요.<br/>
                  각 의문사마다 5개의 집중 훈련이 기다리고 있습니다.
                </p>
              </div>
              <button 
                onClick={() => { setCurrentUsageIdx(0); setCurrentQuizIdx(0); setCurrentStep('learn'); }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl"
              >
                의문사 학습 시작
              </button>
            </div>
          )}

          {currentStep === 'learn' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold text-slate-900">{USAGES[currentUsageIdx].title}</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase tracking-tighter">Phase 1: Learn</span>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed font-medium">{USAGES[currentUsageIdx].description}</p>
              </div>
              <div className="space-y-3">
                {USAGES[currentUsageIdx].examples.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-lg">{ex.en}</p>
                      <p className="text-sm text-slate-500 font-medium">{ex.ko}</p>
                    </div>
                    <button onClick={() => speak(ex.en)} className="p-3 bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-full transition-all">
                      <Volume2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setupQuiz(0)} className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                실전 퀴즈 시작 (5문제) <ArrowRight size={18} />
              </button>
            </div>
          )}

          {currentStep === 'quiz' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Question {currentQuizIdx + 1} of 5</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-1.5 rounded-full transition-colors ${i < currentQuizIdx ? 'bg-indigo-600' : i === currentQuizIdx ? 'bg-indigo-300' : 'bg-slate-200'}`}></div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-black text-slate-900 leading-tight">"{quizSentence.ko}"</h3>
                <button onClick={() => speak(quizSentence.en)} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-bold hover:bg-amber-100 border border-amber-200">
                  <Lightbulb size={14} /> 힌트: 정답 발음 듣기
                </button>
              </div>

              <div className="min-h-[120px] p-5 bg-indigo-50/30 border-2 border-dashed border-indigo-200 rounded-3xl flex flex-wrap gap-2 content-start">
                {userSelection.map((card) => (
                  <button key={card.id} onClick={() => handleCardClick(card, false)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg">
                    {card.text}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                {shuffledCards.map((card) => (
                  <button key={card.id} onClick={() => handleCardClick(card, true)} className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold shadow-sm hover:border-indigo-400 transition-all">
                    {card.text}
                  </button>
                ))}
              </div>

              {feedback && (
                <div className={`p-5 rounded-2xl flex items-center gap-4 ${feedback.type === 'correct' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                  {feedback.type === 'correct' ? <CheckCircle className="shrink-0" /> : <XCircle className="shrink-0" />}
                  <span className="font-bold flex-1">{feedback.message}</span>
                  {feedback.type === 'correct' && (
                    <button onClick={() => speak(quizSentence.en)} className="bg-green-600 text-white p-2 rounded-lg"><Volume2 size={18} /></button>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => { setShuffledCards([...shuffledCards, ...userSelection].sort(() => Math.random() - 0.5)); setUserSelection([]); setFeedback(null); }} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold">
                  <RotateCcw size={18} className="inline mr-2" /> 초기화
                </button>
                <button onClick={feedback?.type === 'correct' ? nextQuizOrStep : checkAnswer} className={`flex-[2] py-4 rounded-2xl font-bold text-white shadow-xl ${feedback?.type === 'correct' ? 'bg-green-600' : 'bg-indigo-600'}`}>
                  {feedback?.type === 'correct' ? (currentQuizIdx < 4 ? '다음 문제로' : '의문사 마스터!') : '정답 확인'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 'final_result' && (
            <div className="text-center space-y-8 py-6">
              <Award size={80} className="text-yellow-500 mx-auto animate-bounce" />
              <div>
                <h2 className="text-4xl font-black text-slate-900">의문사 완전 정복!</h2>
                <p className="text-slate-500 mt-4 leading-relaxed font-medium text-lg">허교장 선생님, 총 40개의 의문사 퀴즈를 모두 해결하셨습니다.</p>
              </div>
              <button onClick={() => setCurrentStep('landing')} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl hover:bg-indigo-700 transition-all text-xl">과정 다시 시작</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;