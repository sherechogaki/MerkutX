'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

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
    return <p className="text-gray-600">Benzer makaleleri görmek için önce özet oluşturun.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">📚 Benzer Makaleler</h2>

      {loading && <p>Benzer makaleler yükleniyor...</p>}
      {!loading && articles.length === 0 && <p>Benzer makale bulunamadı.</p>}

      {articles.map((article, idx) => (
        <div
          key={idx}
          className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2"
        >
          <h3 className="text-lg font-medium">{article.title}</h3>
          <p className="text-sm text-gray-700">{article.snippet}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Makaleyi Oku</Button>
            </a>
            <Button
              variant="default"
              onClick={() => fetchSummary(idx)}
              disabled={summaryLoadingIndex === idx}
            >
              {summaryLoadingIndex === idx
                ? "Özet Yükleniyor..."
                : selectedIndex === idx && article.summary
                ? "Özet Gizle"
                : "Özetini Göster"}
            </Button>
          </div>

          {selectedIndex === idx && article.summary && (
            <div className="mt-3 p-3 bg-white rounded border text-sm italic">
              <strong>📄 Özet:</strong>
              <p>{article.summary}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
