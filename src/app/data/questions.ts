import { USAGES } from './usages';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  usageId: string;
  usageTitle: string;
  usageEmoji: string;
  usageColor: string;
  fullSentence: string;
  translation: string;
}

export interface WrongAnswer {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  usageTitle: string;
  timestamp: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const QUESTIONS: Question[] = USAGES.flatMap((usage) =>
  usage.examples.map((example, idx) => {
    const words = example.en.split(' ');
    const firstWord = words[0].replace(/[^a-zA-Z]/g, '');
    const rest = words.slice(1).join(' ');
    const question = `___ ${rest}`;
    const options = shuffle([firstWord, ...usage.distractors]);
    return {
      id: `${usage.id}_${idx}`,
      question,
      options,
      correctAnswer: firstWord,
      explanation: `"${example.en}" — ${usage.description}`,
      usageId: usage.id,
      usageTitle: usage.title,
      usageEmoji: usage.emoji,
      usageColor: usage.color,
      fullSentence: example.en,
      translation: example.ko,
    };
  })
);
