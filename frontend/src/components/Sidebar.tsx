'use client';

import React from 'react';
import QuestionGenerator from './QuestionGenerator';
import Chatbot from './Chatbot';

interface SidebarProps {
  summaryText: string;
  loadingSummary: boolean;
  error: string | null;
}

export default function Sidebar({ summaryText, loadingSummary, error }: SidebarProps) {
  return (
    <div style={{ padding: '1rem' }}>

      {/* Sorular */}
      <section style={{ marginBottom: '30px' }}>
        <QuestionGenerator summary={summaryText} />
      </section>

      {/* Chatbot */}
      <section style={{ marginBottom: '30px' }}>
        <Chatbot />
      </section>

      <hr style={{ margin: '2rem 0' }} />
    </div>
  );
}
