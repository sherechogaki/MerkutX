"use client"

import { useState } from "react"

export default function GeminiChat() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      if (data.response) {
        setResponse(data.response)
      } else {
        setResponse("Hata: " + data.error)
      }
    } catch (error) {
      setResponse("Bağlantı hatası.")
    }
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gemini AI Asistan</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Bir şeyler yazın..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Yükleniyor..." : "Gönder"}
      </button>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  )
}
