'use client'

import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';
import RelatedArticles from '@/components/RelatedArticles'; // Yeni ekleyeceğiz

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', overflowY: 'auto' }}>
        <div style={{ flex: '0 0 auto' }}>
          <VideoPlayer />
        </div>
        <div style={{ flex: '1 1 auto', marginTop: '20px', overflowY: 'auto' }}>
          <RelatedArticles />
        </div>
      </main>
      
      <aside
        style={{
          width: '350px',
          borderLeft: '1px solid #ddd',
          padding: '20px',
          overflowY: 'auto',
          backgroundColor: '#fafafa',
        }}
      >
        <Sidebar />
      </aside>
    </div>
  );
}
