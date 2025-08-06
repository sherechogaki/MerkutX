'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  title: string;
  link: string;
  snippet: string;
  summary?: string;
}

interface Props {
  summaryText: string;
}

export default function RelatedArticles({ summaryText }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [summaryLoadingIndex, setSummaryLoadingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      if (!summaryText) return;

      setLoading(true);
      try {
        const res = await axios.post('http://127.0.0.1:8000/related-articles', {
          summary: summaryText,
        });
        setArticles(res.data.articles);
        setSelectedIndex(null);
      } catch (error) {
        console.error('Benzer makaleler alınamadı:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [summaryText]);

  const fetchSummary = async (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    setSummaryLoadingIndex(index);
    try {
      const article = articles[index];

      if (article.summary) {
        setSelectedIndex(index);
        setSummaryLoadingIndex(null);
        return;
      }

      // ✅ GET yerine POST kullanılıyor ve body düzgün gönderiliyor
      const res = await axios.post('http://127.0.0.1:8000/related-article-summary', {
        url: article.link,
      });

      const newArticles = [...articles];
      newArticles[index].summary = res.data.summary;
      setArticles(newArticles);
      setSelectedIndex(index);
    } catch (error) {
      console.error('Makale özeti alınamadı:', error);
    } finally {
      setSummaryLoadingIndex(null);
    }
  };

  if (!summaryText) {
    return <p>Benzer makaleleri görmek için önce özet oluşturun.</p>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📚 Benzer Makaleler</h2>
      {loading && <p>Benzer makaleler yükleniyor...</p>}
      {!loading && articles.length === 0 && <p>Benzer makale bulunamadı.</p>}

      {articles.map((article, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem' }}>{article.title}</h3>
          <p style={{ fontSize: '0.95rem', color: '#555' }}>{article.snippet}</p>
          <div style={{ marginTop: '0.5rem' }}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <button style={{ marginRight: '10px' }}>Makaleyi Oku</button>
            </a>
            <button
              onClick={() => fetchSummary(idx)}
              disabled={summaryLoadingIndex === idx}
            >
              {summaryLoadingIndex === idx
                ? "Özet Yükleniyor..."
                : selectedIndex === idx && article.summary
                ? 'Özet Gizle'
                : 'Özetini Göster'}
            </button>
          </div>
          {selectedIndex === idx && article.summary && (
            <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
              <strong>📄 Özet:</strong>
              <p>{article.summary}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
