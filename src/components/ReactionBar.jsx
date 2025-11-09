import React from 'react';

const emojis = [
  { key: '🔥', label: 'Fire' },
  { key: '💃', label: 'Dance' },
  { key: '🫶', label: 'Love' },
  { key: '🤯', label: 'Wow' },
  { key: '✨', label: 'Shine' },
];

export default function ReactionBar({ counts, onReact }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 flex items-center justify-between">
      <div className="text-sm font-medium text-gray-700">Reactions</div>
      <div className="flex items-center gap-2">
        {emojis.map((e) => (
          <button
            key={e.key}
            onClick={() => onReact?.(e.key)}
            className="relative rounded-full bg-gray-900 text-white hover:bg-gray-800 px-3 py-1.5 text-sm"
            aria-label={e.label}
          >
            <span>{e.key}</span>
            <span className="absolute -right-2 -top-2 text-[10px] bg-fuchsia-500 text-white rounded-full px-1.5 py-0.5">
              {counts[e.key] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
