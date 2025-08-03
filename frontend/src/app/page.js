export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-w-6xl mx-auto">
      {/* Video Bölümü */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ysz5S6PUM-U"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* LLM Paneli */}
      <div className="space-y-4">
        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-2">📘 Ders Özeti</h2>
          <p className="text-sm text-gray-600">Buraya LLM tarafından oluşturulan özet gelecek.</p>
        </div>

        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-2">💬 Chat</h2>
          <input
            type="text"
            placeholder="Soru sor..."
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
          <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Gönder
          </button>
        </div>

        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-2">📄 Makaleler</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Yapay Zekâ ve Eğitim</li>
            <li>Flipped Classroom Modeli</li>
            <li>Öğrenci Etkileşimi Ölçümü</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
