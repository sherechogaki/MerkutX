
# Sanal Öğretmen Platformu

Sıradan bir üniversite günü düşünelim. Günümüzde üniversite eğitiminde her sene öğretim elemanları aynı konuları tekrar tekrar anlatmak zorunda kalmakta, öğrenciler ise sınav dönemleri online platformlardan konuları öğrenirim düşüncesiyle, teorik derslere isteksiz bir şekilde gelme eğiliminde olabilmektedir.

Verimsizliğe neden olan bu tarz sorunlarının çözülmesi için öğrencilere ilgili ders hakkındaki teorik bilgiyi belli bir internet platformundan ders öncesi çalışmaları amacıyla sunabiliriz.

Bu sayede öğrenciler derslere konuları önceden çalışmış olacak katılacaklardır ve uygulamalı dersler, ders içi çalışmalar, öğretim elemanlarının monoton teorik ders anlatım süreçlerinden kurtulmaları, öğretim elemanlarının araştırma için daha fazla vakte sahip olmaları ve öğrencilerine yeni bakış açıları kazandırmaya odaklanmaları gibi farklı ve yenilikçi aktivitelere zaman kalmış olacaktır.

Aslında bu tarz eğitim modeline tersyüz eğitim modeli denilmektedir ve dünya üzerinde örnekleri mevcuttur. 

Fakat, Sanal Öğretmen Platformumuz ders öncesi teorik bilginin öğrencilere sunulması aşamasında Gemini büyük dil modelinin (LLM) imkanlarından yararlanmaktadır. 

Videolu ders materyalleri Gemini tarafından özetlenebilmekte, ilgili ders materyali hakkında Gemini örnek sorular üretebilmekte, öğrenci takıldığı kısımları platform üzerinden Geminiye sorabilmekte ve ilgili ders materyaline benzer makaleler internet üzerinden aranıp öğrenciye sunulabilmektedir.

Bu sayede, öğretim elemanları ders videoları, pdf, slaytlar, makaleleri gibi ders materyallerini hazırlayıp bu platforma yükleyebileceği için teorik ders anlatma yükünden kurtulacaklardır. Öğrenciler LLM yardımıyla bu ders materyallerine ders öncesinde kapsamlı bir şekilde çalışabileceklerdir.

<img width="1885" height="878" alt="Sanal Öğretmen Platformu_1" src="https://github.com/user-attachments/assets/854d760f-0d5a-4122-bf5b-7adc8dde2602" />

<img width="1845" height="871" alt="Sanal Öğretmen Platformu_5" src="https://github.com/user-attachments/assets/0882a951-48f4-4d53-9bad-4d2b65f2fc35" />

<img width="1810" height="761" alt="Sanal Öğretmen Platformu_4" src="https://github.com/user-attachments/assets/2ff9a02b-88de-41ef-9247-d2539f201292" />

<img width="1846" height="866" alt="Sanal Öğretmen Platformu_3" src="https://github.com/user-attachments/assets/3177dcb9-c2e9-427b-a6d6-b0c08eaabf85" />

<img width="1861" height="874" alt="Sanal Öğretmen Platformu_2" src="https://github.com/user-attachments/assets/f01bf82a-bc8d-4cca-aebc-7bdf3025a62f" />

## Planlanan İyileştirmeler ve Yenilikler

- Materyal yükleme ekranı

- Materyal yükleme esnasında Whisper ile otomatik transkript çıkarımı

- Yüklenen materyaller için depolama sistemi

- Kullanıcı oturumları, login ekranı

###


## Kullanılan Teknolojiler

**Frontend:** Next.js, TailwindCSS

**Backend:** FastAPI

**External APIs:** Gemini API, Google Custom Search API


## Çalıştırma Adımları

Projeyi lokal makinenize klonlayın

```bash
  git clone https://github.com/sherechogaki/MerkutX.git
```
Frontend dizinine gidin

```bash
  cd MerkutX\frontend
```

Frontend için gerekli bağımlılıkları kurun

```bash
  npm install
```

Frontend sunucusunu başlatın

```bash
  npm run start
```

Backend dizinine gidin

```bash
  cd MerkutX\backend
```

Python virtual environment'i oluşturun ve aktive edin

```bash
  python -m venv venv
  .\venv\Scripts\activate
```

Gerekli bağımlılıkları kurun

```bash
  pip install -r requirements.txt
```

Environment dosyasını oluşturun

```bash
  copy env.example .env
```

.env dosyasının içeriğini kendi API anahtarlarınız ile doldurun (Gemini API, Google Custom Search API)

Backend sunucusunu başlatın

```bash
  uvicorn main:app --reload
```

Tarayıcınızda http://localhost:3000/ adresine gidin
