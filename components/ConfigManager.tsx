
import React, { useState } from 'react';
import { Feature } from '../types';
import { Icons } from '../constants';

interface ConfigManagerProps {
  features: Feature[];
}

const ConfigManager: React.FC<ConfigManagerProps> = ({ features }) => {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSaveStatus('Exporting...');
    setTimeout(() => {
      setSaveStatus('Config Saved: sentinel_v4.json');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const configJson = JSON.stringify({
    metadata: {
      client: "SENTINEL-AIO",
      build: "ULTIMATE_EDITION_2024",
      timestamp: new Date().toISOString()
    },
    active_modules: features.filter(f => f.enabled).map(f => ({
      id: f.id,
      val: f.value || 1.0
    }))
  }, null, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="bg-[#18181b] border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-zinc-200">System Configuration</h3>
            <p className="text-xs text-zinc-500 mt-1">Manage local and cloud-synced settings profiles.</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <Icons.Save />
            Save Profile
          </button>
        </div>
        <div className="p-6">
          <div className="bg-[#0d0d0e] p-4 rounded-lg border border-zinc-800/50 font-mono text-xs overflow-auto max-h-[400px]">
            <pre className="text-zinc-400">
              <code>{configJson}</code>
            </pre>
          </div>
          {saveStatus && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-400 animate-in slide-in-from-top-2">
              {saveStatus}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['Default Legitimate', 'Rage Framework', 'Visual Only', 'HVH Optimal'].map(profile => (
          <button key={profile} className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl hover:border-blue-500/50 transition-all text-left group">
            <h4 className="text-sm font-semibold text-zinc-300 group-hover:text-blue-400">{profile}</h4>
            <p className="text-[10px] text-zinc-600 mt-1 uppercase">Local Storage Profile</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigManager;
