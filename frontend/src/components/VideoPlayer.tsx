export default function VideoPlayer() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
      {/* Buraya video player kodu ya da embed video koyabilirsin */}
      <video
        style={{ width: '100%', height: '100%' }}
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      >
        Tarayıcınız video elementini desteklemiyor.
      </video>
    </div>
  );
}
