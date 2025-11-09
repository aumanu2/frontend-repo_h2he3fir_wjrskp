import React, { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import RoomControls from './components/RoomControls';
import MoodDJPanel from './components/MoodDJPanel';
import ReactionBar from './components/ReactionBar';

function App() {
  // Local demo state (can be wired to backend later)
  const [inRoom, setInRoom] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);

  const [queue, setQueue] = useState([
    {
      id: 1,
      title: 'Sample — Dreamy Synthwave.mp3',
      url: 'https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav',
    },
  ]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [dj, setDj] = useState({ energy: 6, tempo: 120, tags: 'chill, synthwave', autoAdapt: true });
  const [reactions, setReactions] = useState({});

  const onCreateRoom = () => {
    const code = Math.random().toString(36).slice(2, 7).toUpperCase();
    const username = 'You';
    setRoomInfo({ name: 'New Room', code, username });
    setInRoom(true);
  };

  const onJoinRoom = () => {
    const code = prompt('Enter room code');
    if (!code) return;
    setRoomInfo({ name: 'Joined Room', code: code.trim().toUpperCase(), username: 'You' });
    setInRoom(true);
  };

  const onReact = (emoji) => {
    setReactions((r) => ({ ...r, [emoji]: (r[emoji] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-900">
      <HeroCover
        onCreateRoom={onCreateRoom}
        onJoinRoom={onJoinRoom}
        inRoom={inRoom}
        roomInfo={roomInfo}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-14 relative z-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RoomControls
              queue={queue}
              setQueue={setQueue}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              nowPlaying={nowPlaying}
              setNowPlaying={setNowPlaying}
            />

            <ReactionBar counts={reactions} onReact={onReact} />
          </div>
          <div>
            <MoodDJPanel settings={dj} onChange={setDj} />
          </div>
        </div>

        {!inRoom && (
          <div className="text-center text-white/70 text-sm">
            Create or join a room to start a synced session. You can add any direct MP3/stream URL to the queue for a quick demo.
          </div>
        )}
      </main>

      <footer className="mt-12 py-8 text-center text-white/50 text-xs">
        Built for immersive, social listening. AI DJ and real-time sync coming next.
      </footer>
    </div>
  );
}

export default App;
