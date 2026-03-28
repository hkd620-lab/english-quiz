import React, { useState, useEffect } from "react";

const questions = [
  {
    question: "___ is your name?",
    answer: "What",
    options: ["What", "Who", "Where"],
  },
  {
    question: "___ are you from?",
    answer: "Where",
    options: ["What", "Where", "Why"],
  },
  {
    question: "___ is that man?",
    answer: "Who",
    options: ["Who", "What", "When"],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [wrongNotes, setWrongNotes] = useState([]);

  const current = questions[index];

  // 🔥 앱 시작 시 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("wrongNotes");
    if (saved) setWrongNotes(JSON.parse(saved));
  }, []);

  // 🔥 오답 저장
  useEffect(() => {
    localStorage.setItem("wrongNotes", JSON.stringify(wrongNotes));
  }, [wrongNotes]);

  const checkAnswer = () => {
    if (selected !== current.answer) {
      setWrongNotes((prev) => [...prev, current]);
    }
    next();
  };

  const next = () => {
    setSelected("");
    setIndex((prev) => (prev + 1) % questions.length);
  };

  const resetWrong = () => {
    setWrongNotes([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Wh Question Quiz</h2>

      <h3>{current.question}</h3>

      {current.options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          style={{
            margin: 5,
            background: selected === opt ? "lightblue" : "white",
          }}
        >
          {opt}
        </button>
      ))}

      <div style={{ marginTop: 10 }}>
        <button onClick={checkAnswer}>Check</button>
      </div>

      <hr />

      <h3>오답노트</h3>
      <button onClick={resetWrong}>초기화</button>

      {wrongNotes.length === 0 && <p>없음</p>}

      {wrongNotes.map((q, i) => (
        <div key={i}>
          <p>
            {q.question} → <b>{q.answer}</b>
          </p>
        </div>
      ))}
    </div>
  );
}