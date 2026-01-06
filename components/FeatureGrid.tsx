
import React from 'react';
import { Category, Feature } from '../types';

interface FeatureGridProps {
  features: Feature[];
  onToggle: (id: string) => void;
  onValueChange: (id: string, value: number) => void;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ features, onToggle, onValueChange }) => {
  const categories = Object.values(Category).filter(c => c !== Category.SYSTEM);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map(cat => {
        const catFeatures = features.filter(f => f.category === cat);
        if (catFeatures.length === 0) return null;

        return (
          <div key={cat} className="bg-[#18181b] border border-zinc-800/50 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-zinc-800/50 bg-zinc-900/30 flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-400">{cat}</h3>
              <span className="text-[10px] font-mono text-zinc-500">{catFeatures.length} modules</span>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {catFeatures.map(feature => (
                <div key={feature.id} className="p-6 group hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-zinc-200 text-sm group-hover:text-blue-400 transition-colors">{feature.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                    <button
                      onClick={() => onToggle(feature.id)}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                        feature.enabled ? 'bg-blue-600' : 'bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                          feature.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {feature.value !== undefined && feature.enabled && (
                    <div className="mt-4 pt-4 border-t border-zinc-800/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-zinc-500 font-mono">ADJUST PARAMETER</span>
                        <span className="text-xs font-mono text-blue-400">{feature.value.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min={feature.min}
                        max={feature.max}
                        step={0.1}
                        value={feature.value}
                        onChange={(e) => onValueChange(feature.id, parseFloat(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureGrid;
