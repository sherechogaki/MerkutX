'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SummarySection({ summary, onSummarize }) {
  const router = useRouter();

  const handleRelatedArticles = () => {
    if (summary) {
      router.push(`/related?summary=${encodeURIComponent(summary)}`);
    } else {
      alert('Lütfen önce makaleyi özetleyin.');
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {!summary && (
        <button
          onClick={onSummarize}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Makaleyi Özetle
        </button>
      )}

      <button
        onClick={handleRelatedArticles}
        disabled={!summary}
        className={`px-4 py-2 rounded text-white ${
          summary ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Benzer Makaleleri Göster
      </button>
    </div>
  );
}
