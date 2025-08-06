'use client';

import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  summary: string;
};

const QuestionGenerator = ({ summary }: Props) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/demo-video-questions', {
        summary: summary,
      });
      setQuestions(response.data.questions || []);
    } catch (err) {
      setError('Sorular alınırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>❓ Soru Üret</h2>
      <button onClick={generateQuestions} disabled={loading}>
        {loading ? 'Sorular Üretiliyor...' : 'Soruları Üret'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {questions.map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionGenerator;
