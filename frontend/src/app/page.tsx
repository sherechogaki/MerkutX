'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';

interface Article {
  title: string;
  link: string;
  snippet: string;
}

export default function Home() {
  const [summaryText, setSummaryText] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingSummary(true);
      setError(null);
      try {
        const res = await axios.post('http://127.0.0.1:8000/demo-video-summary');
        setSummaryText(res.data.summary || '');
      } catch (err) {
        console.error('Özet alınırken hata:', err);
        setError('Özet alınırken bir hata oluştu.');
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      if (!summaryText) return;
      setLoadingArticles(true);
      setArticlesError(null);
      try {
        const res = await axios.post('http://127.0.0.1:8000/related-articles', {
          summary: summaryText,
        });
        setArticles(res.data.articles || []);
      } catch (err) {
        console.error('Benzer makaleler alınırken hata:', err);
        setArticlesError('Benzer makaleler alınırken hata oluştu.');
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchRelatedArticles();
  }, [summaryText]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sol Kısım - Video ve Makaleler */}
      <main style={{ flex: 7, padding: '20px', overflowY: 'auto' }}>
        {/* Video */}
        <section style={{ marginBottom: '30px' }}>
          <VideoPlayer />
        </section>

        {/* Özet */}
        <section style={{ marginBottom: '30px' }}>
          <h2>🎬 Video / İçerik Özeti</h2>
          {loadingSummary && <p>Özet yükleniyor...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loadingSummary && !error && summaryText && <p>{summaryText}</p>}
        </section>

        {/* Benzer Makaleler */}
        <section>
          <h3>📚 Benzer Makaleler</h3>
          {loadingArticles && <p>Benzer makaleler yükleniyor...</p>}
          {articlesError && <p style={{ color: 'red' }}>{articlesError}</p>}
          {!loadingArticles && articles.length === 0 && <p>Benzer makale bulunamadı.</p>}
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {articles.map((article, idx) => (
              <li key={idx} style={{ marginBottom: '0.75rem' }}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#0070f3' }}
                >
                  {article.title}
                </a>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>{article.snippet}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Sağ Kısım - Sidebar */}
      <aside
        style={{
          flex: 3,
          borderLeft: '1px solid #ddd',
          padding: '20px',
          backgroundColor: '#fafafa',
          overflowY: 'auto',
        }}
      >
        <Sidebar summaryText={summaryText} loadingSummary={loadingSummary} error={error} />
      </aside>
    </div>
  );
}
