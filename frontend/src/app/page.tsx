'use client'

import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <main style={{ flex: 1, padding: '20px' }}>
        <VideoPlayer />
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
