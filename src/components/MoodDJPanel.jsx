import React, { useState } from 'react';

export default function MoodDJPanel({ settings, onChange }) {
  const [local, setLocal] = useState(settings);

  const update = (key, value) => {
    const next = { ...local, [key]: value };
    setLocal(next);
    onChange?.(next);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">AI DJ</h3>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={local.autoAdapt}
            onChange={(e) => update('autoAdapt', e.target.checked)}
            className="accent-fuchsia-500"
          />
          Auto-adapt
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500">Energy: {local.energy}</label>
          <input
            type="range"
            min={0}
            max={10}
            value={local.energy}
            onChange={(e) => update('energy', parseInt(e.target.value))}
            className="w-full accent-fuchsia-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Tempo: {local.tempo} BPM</label>
          <input
            type="range"
            min={60}
            max={180}
            value={local.tempo}
            onChange={(e) => update('tempo', parseInt(e.target.value))}
            className="w-full accent-fuchsia-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-gray-500">Vibe tags</label>
          <input
            type="text"
            value={local.tags}
            onChange={(e) => update('tags', e.target.value)}
            placeholder="e.g., chill, synthwave, night drive"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">These settings guide the AI DJ in picking and ordering tracks for the room.</p>
    </div>
  );
}
