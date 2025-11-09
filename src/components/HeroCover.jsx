import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Users } from 'lucide-react';

export default function HeroCover({ onCreateRoom, onJoinRoom, inRoom, roomInfo }) {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden bg-black text-white rounded-b-2xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Non-blocking gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
          VibeSync
        </h1>
        <p className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-white/80">
          Host immersive, synced listening rooms with an AI DJ—create a room, invite friends, and ride the vibe together.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCreateRoom}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-[0.99] transition text-white px-5 py-2.5 shadow-lg shadow-fuchsia-500/30"
          >
            <Rocket className="w-4 h-4" />
            Create Room
          </button>
          <button
            onClick={onJoinRoom}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-[0.99] transition text-white px-5 py-2.5 border border-white/20 backdrop-blur"
          >
            <Users className="w-4 h-4" />
            Join Room
          </button>
        </div>

        {inRoom && roomInfo && (
          <div className="mt-5 rounded-full bg-white/10 text-white/90 px-4 py-2 text-xs md:text-sm border border-white/20 backdrop-blur">
            <span className="font-medium">Room:</span> {roomInfo.name} • <span className="font-medium">Code:</span> {roomInfo.code} • <span className="font-medium">You:</span> {roomInfo.username}
          </div>
        )}
      </div>
    </section>
  );
}
