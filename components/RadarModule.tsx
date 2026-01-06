
import React, { useEffect, useState } from 'react';

interface Entity {
  id: number;
  x: number;
  y: number;
  team: 'friendly' | 'hostile';
  name: string;
}

const RadarModule: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);

  useEffect(() => {
    const generateEntities = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        team: Math.random() > 0.3 ? 'hostile' : 'friendly' as any,
        name: `Entity_${i}`
      }));
    };

    setEntities(generateEntities());
    const interval = setInterval(() => {
      setEntities(prev => prev.map(e => ({
        ...e,
        x: e.x + (Math.random() - 0.5) * 2,
        y: e.y + (Math.random() - 0.5) * 2
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center p-8 animate-in zoom-in-95 duration-700">
      <div className="relative w-full max-w-2xl aspect-square bg-[#0d0d0e] rounded-full border-4 border-zinc-800/50 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Radar Grids */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-px bg-zinc-500" />
          <div className="h-full w-px bg-zinc-500" />
          <div className="absolute w-3/4 h-3/4 rounded-full border border-zinc-500" />
          <div className="absolute w-1/2 h-1/2 rounded-full border border-zinc-500" />
          <div className="absolute w-1/4 h-1/4 rounded-full border border-zinc-500" />
        </div>

        {/* Sweep Animation */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="w-1/2 h-1/2 bg-gradient-to-tr from-transparent to-blue-500/20 origin-bottom-right" />
        </div>

        {/* Local Player */}
        <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-white/20 z-10" />

        {/* Entities */}
        {entities.map(e => (
          <div
            key={e.id}
            className={`absolute w-3 h-3 rounded-sm transform transition-all duration-200 border border-white/20 ${
              e.team === 'friendly' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-red-500 shadow-red-500/50'
            }`}
            style={{
              left: `calc(50% + ${e.x}px)`,
              top: `calc(50% + ${e.y}px)`
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-400 whitespace-nowrap bg-zinc-900/80 px-1 rounded">
              {Math.abs(e.x).toFixed(0)}, {Math.abs(e.y).toFixed(0)}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-10 left-10 flex flex-col gap-2 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800/50 backdrop-blur">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-red-500 rounded-sm" />
            <span className="text-zinc-400">HOSTILE_TARGET</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-sm" />
            <span className="text-zinc-400">FRIENDLY_ASSET</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-2 border-t border-zinc-800 pt-2 font-mono text-[10px]">
            <span className="text-blue-500">ZOOM: 2.5X</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarModule;
