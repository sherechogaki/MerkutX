// app/related/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RelatedPage() {
  const searchParams = useSearchParams();
  const summary = searchParams.get('summary');
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.post('/api/related-articles', { summary });
        setRelatedArticles(res.data);
      } catch (err) {
        console.error(err);
        setError('Benzer makaleler alınırken hata oluştu.');
      }
    };

    if (summary) fetchArticles();
  }, [summary]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Benzer Makaleler</h1>
      {error && <p className="text-red-600">{error}</p>}
      {relatedArticles.length > 0 ? (
        <ul className="space-y-2">
          {relatedArticles.map((article, idx) => (
            <li key={idx} className="border p-3 rounded shadow">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-700">{article.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Yükleniyor veya özet verisi bulunamadı.</p>
      )}
    </div>
  );
}
