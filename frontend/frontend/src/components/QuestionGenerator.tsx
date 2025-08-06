'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"; // Shadcn Button

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
      setError('❌ Sorular alınırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-xl border shadow-md bg-white">
      <h2 className="text-xl font-semibold">❓ Soru Üret</h2>

      <Button 
        variant="default"  // veya "outline", "secondary", "ghost", vs.
        size="default"     // veya "sm", "lg", "icon"
        onClick={generateQuestions} 
        disabled={loading}
      >
        {loading ? 'Sorular Üretiliyor...' : 'Soruları Üret'}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="list-disc list-inside space-y-2">
        {questions.map((q, idx) => (
          <li key={idx} className="text-gray-700">{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionGenerator;
