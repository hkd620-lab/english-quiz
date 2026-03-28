import { useState, useEffect, useRef } from 'react';

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      const preferred =
        voices.find((v) => v.name === 'Google US English') ||
        voices.find((v) => v.name === 'Samantha') ||
        voices.find((v) => v.lang === 'en-US') ||
        voices.find((v) => v.lang.startsWith('en')) ||
        null;

      voiceRef.current = preferred;
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.lang = 'en-US';

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return { speak, speaking };
}
