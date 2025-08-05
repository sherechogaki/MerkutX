// src/components/RelatedArticles.tsx

'use client'

import React from 'react';

const sampleArticles = [
  {
    title: 'Yapay Zekâ Eğitimin Geleceğini Nasıl Şekillendiriyor?',
    summary: 'Bu makalede yapay zekânın eğitimdeki rolü ve etkileri ele alınıyor.',
  },
  {
    title: 'Etkili Öğrenme Teknikleri',
    summary: 'Aktif öğrenme ve tekrarın öğrenmeye etkileri üzerine kısa bir inceleme.',
  },
];

export default function RelatedArticles() {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📚 Benzer Makaleler</h2>
      {sampleArticles.map((article, idx) => (
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
          <p style={{ fontSize: '0.95rem', color: '#555' }}>{article.summary}</p>
          <div style={{ marginTop: '0.5rem' }}>
            <button style={{ marginRight: '10px' }}>Oku</button>
            <button>Özet Çıkar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
