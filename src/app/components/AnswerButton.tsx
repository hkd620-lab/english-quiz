import { motion } from 'motion/react';

interface Props {
  label: string;
  state: 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal';
  onClick: () => void;
  disabled?: boolean;
}

const stateStyles: Record<string, string> = {
  idle: 'bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:bg-blue-50',
  selected: 'bg-blue-50 border-blue-400 text-blue-700',
  correct: 'bg-green-50 border-green-400 text-green-700',
  wrong: 'bg-red-50 border-red-400 text-red-700',
  reveal: 'bg-green-50 border-green-300 text-green-600',
};

export default function AnswerButton({ label, state, onClick, disabled }: Props) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-base transition-colors duration-150 text-left cursor-pointer disabled:cursor-default ${stateStyles[state]}`}
    >
      {label}
    </motion.button>
  );
}
