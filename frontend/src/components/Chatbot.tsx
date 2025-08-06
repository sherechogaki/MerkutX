'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/ask', {
        context: "", // İstersen summaryText gibi bir değişken geçebilirsin
        prompt: input,
      });

      setMessages(prev => [
        ...prev,
        { role: 'bot', text: response.data.response },
      ]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Bir hata oluştu.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>🤖 Chatbot</h2>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ margin: '5px 0', color: msg.role === 'user' ? '#333' : '#0070f3' }}>
            <strong>{msg.role === 'user' ? 'Sen' : 'Bot'}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Bir soru yaz..."
        style={{ width: '100%', marginTop: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ marginTop: '5px' }}>
        Gönder
      </button>
    </div>
  );
};

export default Chatbot;
