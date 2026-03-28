import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Volume2, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { QUESTIONS, type WrongAnswer } from '../data/questions';
import { useTTS } from '../hooks/useTTS';
import AnswerButton from '../components/AnswerButton';
import ProgressBar from '../components/ProgressBar';

type QuizMode = 'all' | 'group';

const colorStyles: Record<string, { badge: string; header: string }> = {
  blue:   { badge: 'bg-blue-100 text-blue-700',     header: 'bg-blue-600' },
  purple: { badge: 'bg-purple-100 text-purple-700', header: 'bg-purple-600' },
  orange: { badge: 'bg-orange-100 text-orange-700', header: 'bg-orange-500' },
  teal:   { badge: 'bg-teal-100 text-teal-700',     header: 'bg-teal-600' },
  green:  { badge: 'bg-green-100 text-green-700',   header: 'bg-green-600' },
  yellow: { badge: 'bg-yellow-100 text-yellow-700', header: 'bg-yellow-500' },
  red:    { badge: 'bg-red-100 text-red-700',       header: 'bg-red-600' },
  indigo: { badge: 'bg-indigo-100 text-indigo-700', header: 'bg-indigo-600' },
};

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startId = searchParams.get('start');
  const mode: QuizMode = startId ? 'group' : 'all';

  const questions = useMemo(() => {
    if (mode === 'group' && startId) {
      return QUESTIONS.filter((q) => q.usageId === startId);
    }
    return QUESTIONS;
  }, [mode, startId]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const { speak, speaking } = useTTS();

  const current = questions[index];

  // 정답 후 자동 TTS
  useEffect(() => {
    if (answered && selected === current?.correctAnswer) {
      speak(current.fullSentence);
    }
  }, [answered]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const isCorrect = option === current.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      saveWrong(option);
    }
  };

  const saveWrong = (userAnswer: string) => {
    const entry: WrongAnswer = {
      questionId: current.id,
      question: current.question,
      userAnswer,
      correctAnswer: current.correctAnswer,
      explanation: current.explanation,
      usageTitle: current.usageTitle,
      timestamp: Date.now(),
    };
    const saved = localStorage.getItem('wrongAnswers');
    const prev: WrongAnswer[] = saved ? JSON.parse(saved) : [];
    // 중복 제거 후 추가
    const updated = [...prev.filter((w) => w.questionId !== current.id), entry];
    localStorage.setItem('wrongAnswers', JSON.stringify(updated));
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  // 그룹 내 진행 계산
  const groupIndex = index + 1;
  const groupTotal = questions.length;

  const c = colorStyles[current?.usageColor ?? 'blue'] ?? colorStyles.blue;
  const isCorrect = answered && selected === current?.correctAnswer;

  // 완료 화면
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center"
        >
          <div className="text-5xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">퀴즈 완료!</h2>
          <p className="text-gray-500 mb-6">
            {questions.length}문항 중 <span className="text-blue-600 font-bold">{score}개</span> 정답
          </p>
          <div className="text-4xl font-bold text-blue-600 mb-6">{pct}%</div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              다시 풀기
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold"
            >
              홈으로
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <Home size={20} />
        </button>

        <span className={`${c.badge} text-sm font-semibold px-3 py-1 rounded-full`}>
          {current.usageEmoji} {current.usageTitle}
        </span>

        <span className="text-sm font-semibold text-gray-500">
          {score} / {index}
        </span>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">
        {/* 진행바 */}
        <ProgressBar current={index + 1} total={questions.length} />

        {/* 그룹 진행 */}
        <p className="text-xs text-center text-gray-400">
          {current.usageTitle} 그룹 · {groupIndex} / {groupTotal}
        </p>

        {/* 번역 카드 */}
        <motion.div
          key={`trans-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 text-center"
        >
          <p className="text-xl font-bold text-gray-800 leading-snug">{current.translation}</p>
        </motion.div>

        {/* 문제 카드 */}
        <motion.div
          key={`q-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-mono text-gray-700 flex-1">{current.question}</p>
            <button
              onClick={() => speak(current.fullSentence)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                speaking ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500'
              }`}
            >
              <Volume2 size={18} />
            </button>
          </div>
        </motion.div>

        {/* 보기 */}
        <div className="flex flex-col gap-2">
          {current.options.map((opt) => {
            let state: 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal' = 'idle';
            if (answered) {
              if (opt === current.correctAnswer) {
                state = selected === opt ? 'correct' : 'reveal';
              } else if (opt === selected) {
                state = 'wrong';
              }
            } else if (opt === selected) {
              state = 'selected';
            }
            return (
              <AnswerButton
                key={opt}
                label={opt}
                state={state}
                onClick={() => handleSelect(opt)}
                disabled={answered}
              />
            );
          })}
        </div>

        {/* 피드백 */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-2xl px-4 py-4 border-2 ${
                isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <XCircle size={18} className="text-red-500" />
                )}
                <span className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '정답!' : `오답 — 정답: ${current.correctAnswer}`}
                </span>
              </div>
              <p className="text-sm text-gray-600">{current.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next 버튼 */}
        {answered && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {index + 1 >= questions.length ? '결과 보기' : '다음 문제'}
            <ChevronRight size={18} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
