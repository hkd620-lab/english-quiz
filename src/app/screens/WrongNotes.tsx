import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Trash2, Volume2 } from 'lucide-react';
import { type WrongAnswer } from '../data/questions';
import { useTTS } from '../hooks/useTTS';

export default function WrongNotes() {
  const navigate = useNavigate();
  const [wrongs, setWrongs] = useState<WrongAnswer[]>([]);
  const { speak } = useTTS();

  useEffect(() => {
    const saved = localStorage.getItem('wrongAnswers');
    if (saved) setWrongs(JSON.parse(saved));
  }, []);

  const handleClear = () => {
    localStorage.removeItem('wrongAnswers');
    setWrongs([]);
  };

  const handleDelete = (questionId: string) => {
    const updated = wrongs.filter((w) => w.questionId !== questionId);
    setWrongs(updated);
    localStorage.setItem('wrongAnswers', JSON.stringify(updated));
  };

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
        <h1 className="font-bold text-gray-800">오답 노트</h1>
        {wrongs.length > 0 ? (
          <button
            onClick={handleClear}
            className="p-2 rounded-xl hover:bg-red-50 text-red-400 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      <div className="flex-1 px-4 py-5">
        {wrongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-gray-500 font-semibold">오답이 없어요!</p>
            <p className="text-gray-400 text-sm mt-1">모든 문제를 정확히 맞혔습니다</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 text-center">
              총 <span className="font-semibold text-gray-600">{wrongs.length}</span>개의 오답
            </p>
            <AnimatePresence>
              {wrongs.map((w) => (
                <motion.div
                  key={w.questionId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                      {w.usageTitle}
                    </span>
                    <button
                      onClick={() => handleDelete(w.questionId)}
                      className="text-gray-300 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-gray-700 mb-2">{w.question}</p>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <span className="text-gray-400">내 답:</span>
                    <span className="text-red-500 font-semibold">{w.userAnswer}</span>
                    <span className="text-gray-300">→</span>
                    <span className="text-green-600 font-semibold">{w.correctAnswer}</span>
                    <button
                      onClick={() => speak(w.explanation.split('"')[1] || w.correctAnswer)}
                      className="ml-auto text-gray-400 hover:text-blue-500 cursor-pointer"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">{w.explanation}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
