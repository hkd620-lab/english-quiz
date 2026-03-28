import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, FileText } from 'lucide-react';
import { USAGES } from '../data/usages';

const colorStyles: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-600' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   text: 'text-teal-700',   badge: 'bg-teal-100 text-teal-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  badge: 'bg-green-100 text-green-600' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    badge: 'bg-red-100 text-red-600' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-600' },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🎯</div>
        <h1 className="text-2xl font-bold text-gray-800">Interrogative Mastery</h1>
        <p className="text-gray-500 text-sm mt-1">8대 의문사 완전 정복</p>
      </div>

      {/* 의문사 그리드 */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          그룹별 연습
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {USAGES.map((usage) => {
            const c = colorStyles[usage.color] ?? colorStyles.blue;
            return (
              <motion.button
                key={usage.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/quiz?start=${usage.id}`)}
                className={`${c.bg} ${c.border} border-2 rounded-2xl p-4 text-left cursor-pointer`}
              >
                <span className="text-2xl">{usage.emoji}</span>
                <p className={`font-bold mt-1 text-sm ${c.text}`}>{usage.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-snug">{usage.description}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 액션 버튼 */}
      <section className="flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/quiz')}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl text-base transition-colors cursor-pointer"
        >
          <BookOpen size={20} />
          전체 40문항 시작
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/wrong')}
          className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 rounded-2xl text-base transition-colors cursor-pointer"
        >
          <FileText size={20} />
          오답 노트
        </motion.button>
      </section>
    </div>
  );
}
