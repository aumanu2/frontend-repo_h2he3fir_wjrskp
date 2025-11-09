import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Plus } from 'lucide-react';

export default function RoomControls({
  queue,
  setQueue,
  isPlaying,
  setIsPlaying,
  nowPlaying,
  setNowPlaying,
}) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.8);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!nowPlaying && queue.length > 0) {
      setNowPlaying(queue[0]);
    }
  }, [queue, nowPlaying, setNowPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying, nowPlaying]);

  const onAdd = () => {
    if (!url.trim()) return;
    const item = { id: Date.now(), title: url.split('/').pop() || 'Track', url };
    setQueue((q) => [...q, item]);
    if (!nowPlaying) setNowPlaying(item);
    setUrl('');
  };

  const onEnded = () => {
    // move to next in queue
    const idx = queue.findIndex((q) => q.id === nowPlaying?.id);
    const next = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : null;
    if (next) setNowPlaying(next);
    else setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-400">Now Playing</p>
          <h3 className="font-semibold text-gray-800 truncate max-w-[60vw]">
            {nowPlaying ? nowPlaying.title : 'No track selected'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-gray-800"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => {
              const idx = queue.findIndex((q) => q.id === nowPlaying?.id);
              const next = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : null;
              if (next) setNowPlaying(next);
            }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50"
            aria-label="Skip"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 ml-2">
            {volume === 0 ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-gray-700" />}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-28 accent-fuchsia-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste MP3/stream URL to add to queue"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-3 py-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {queue.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Queue</p>
          <ul className="space-y-1">
            {queue.map((item) => (
              <li key={item.id} className={`flex items-center justify-between rounded-md px-2 py-1 ${nowPlaying?.id === item.id ? 'bg-fuchsia-50' : 'bg-gray-50'}`}>
                <span className="text-sm text-gray-800 truncate mr-2">{item.title}</span>
                <button
                  onClick={() => setNowPlaying(item)}
                  className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-white"
                >Play</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <audio
        ref={audioRef}
        src={nowPlaying?.url}
        onEnded={onEnded}
        onCanPlay={() => {
          if (isPlaying) audioRef.current?.play().catch(() => {});
        }}
        className="hidden"
      />
    </div>
  );
}
