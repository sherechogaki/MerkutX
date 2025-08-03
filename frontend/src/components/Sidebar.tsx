'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [loading, setLoading] = useState(false)

  // Video Özet
  const [summary, setSummary] = useState('')

  // Chatbot
  const [chatInput, setChatInput] = useState('')
  const [chatResponse, setChatResponse] = useState('')

  // Soru Üretme
  const [questions, setQuestions] = useState<string[]>([])

  // Video özetini alacak fonksiyon
  const handleGetSummary = async () => {
    setLoading(true)
    setSummary('')
    setChatResponse('')
    setQuestions([])
    try {
      const res = await fetch('http://127.0.0.1:8000/video-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: "" }), // Gerçek video ID'si burada olmalı
      })
      const data = await res.json()
      if (data.summary) {
        setSummary(data.summary)
      } else if (data.error) {
        setSummary(`Hata: ${data.error}`)
      }
    } catch {
      setSummary('Özet alınırken hata oluştu.')
    }
    setLoading(false)
  }

  // Chatbot’a soru soracak fonksiyon
  const handleAskChatbot = async () => {
    if (!chatInput) return
    setLoading(true)
    setChatResponse('')
    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: chatInput }),
      })
      const data = await res.json()
      if (data.response) {
        setChatResponse(data.response)
      } else if (data.error) {
        setChatResponse(`Hata: ${data.error}`)
      }
    } catch {
      setChatResponse('Chatbot isteği başarısız oldu.')
    }
    setLoading(false)
  }

  // Soru üretme fonksiyonu
  const handleGenerateQuestions = async () => {
    if (!summary) return
    setLoading(true)
    setQuestions([])
    try {
      const res = await fetch('http://127.0.0.1:8000/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: summary }),
      })
      const data = await res.json()
      if (data.questions) {
        // Satırlara ayırarak ayrı ayrı buton gibi göstereceğiz
        const splitQuestions = data.questions.split('\n').filter(q => q.trim() !== '')
        setQuestions(splitQuestions)
      } else if (data.error) {
        setQuestions([`Hata: ${data.error}`])
      }
    } catch {
      setQuestions(['Soru üretme isteği başarısız oldu.'])
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '600px' }}>
      <h2>🎬 Video Özet</h2>
      <button onClick={handleGetSummary} disabled={loading}>
        {loading ? 'Özet Alınıyor...' : 'Özet Al'}
      </button>
      {summary && <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{summary}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <h2>🤖 Chatbot</h2>
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Chatbot'a soru sor"
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={handleAskChatbot} disabled={loading || !chatInput} style={{ marginLeft: '1rem' }}>
        {loading ? 'Gönderiliyor...' : 'Sor'}
      </button>
      {chatResponse && <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{chatResponse}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <h2>❓ Soru Üretme</h2>
      <button onClick={handleGenerateQuestions} disabled={loading || !summary}>
        {loading ? 'Soru Üretiliyor...' : 'Soruları Üret'}
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
              onClick={() => alert(`Soru: ${q}`)}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
