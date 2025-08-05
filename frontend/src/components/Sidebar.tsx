'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [loading, setLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [summary, setSummary] = useState('')
  const [questions, setQuestions] = useState<string[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatResponse, setChatResponse] = useState('')

  const handleGetSummary = async () => {
    if (!selectedFile) return alert('Lütfen bir dosya seçin.')
    setLoading(true)
    setSummary('')
    setQuestions([])
    setChatResponse('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await fetch('http://127.0.0.1:8000/process-and-summarize', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.summary) {
        setSummary(data.summary)
      } else {
        setSummary(`Hata: ${data.detail || 'Özet alınamadı.'}`)
      }
    } catch {
      setSummary('Özet alınırken hata oluştu.')
    }
    setLoading(false)
  }

  const handleGenerateQuestions = async () => {
    if (!selectedFile) return alert('Lütfen bir dosya seçin.')
    setLoading(true)
    setQuestions([])

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await fetch('http://127.0.0.1:8000/generate-questions', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.questions) {
        const splitQuestions = data.questions.split('\n').filter(q => q.trim() !== '')
        setQuestions(splitQuestions)
      } else {
        setQuestions([`Hata: ${data.detail || 'Soru üretilemedi.'}`])
      }
    } catch {
      setQuestions(['Soru üretme isteği başarısız oldu.'])
    }
    setLoading(false)
  }

  const handleAskChatbot = async () => {
    if (!summary || !chatInput) return alert('Özet ve soru gerekli.');
    setLoading(true);
    setChatResponse('');

    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: summary, prompt: chatInput }),
      });
      const data = await res.json();
      if (data.response) {
        setChatResponse(data.response);
      } else {
        setChatResponse(`Hata: ${data.detail || 'Cevap alınamadı.'}`);
      }
    } catch {
      setChatResponse('Chatbot isteği başarısız oldu.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px' }}>
      <h2>📁 Dosya Yükle</h2>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
      {selectedFile && <p>Seçilen: {selectedFile.name}</p>}

      <hr style={{ margin: '1.5rem 0' }} />

      <h2>🎬 Video / İçerik Özeti</h2>
      <button onClick={handleGetSummary} disabled={loading || !selectedFile}>
        {loading ? 'Özetleniyor...' : 'Özet Al'}
      </button>
      {summary && <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{summary}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <h2>❓ Soru Üret</h2>
      <button onClick={handleGenerateQuestions} disabled={loading || !selectedFile}>
        {loading ? 'Üretiliyor...' : 'Soruları Üret'}
      </button>
      {questions.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {questions.map((q, index) => (
            <button
              key={index}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setChatInput(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>🤖 Chatbot</h2>
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Chatbot'a soru sor"
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={handleAskChatbot} disabled={loading || !chatInput || !selectedFile} style={{ marginLeft: '1rem' }}>
        {loading ? 'Gönderiliyor...' : 'Sor'}
      </button>
      {chatResponse && <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{chatResponse}</p>}
    </div>
  )
}
