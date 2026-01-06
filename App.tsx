
import React, { useState, useCallback } from 'react';
import { Category, Feature } from './types';
import { Icons } from './constants';
import FeatureGrid from './components/FeatureGrid';
import ArchitectureView from './components/ArchitectureView';
import ConfigManager from './components/ConfigManager';
import RadarModule from './components/RadarModule';
import SkinChanger from './components/SkinChanger';
import Terminal from './components/Terminal';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const INITIAL_FEATURES: Feature[] = [
  { id: 'silent_aim', name: 'Silent Aim', description: 'Manipulate view angles to target nearest bone within FOV silently.', enabled: false, category: Category.COMBAT, value: 3, min: 1, max: 10 },
  { id: 'no_recoil', name: 'No Recoil', description: 'Compensate weapon kickback vectors in memory.', enabled: false, category: Category.COMBAT },
  { id: 'fly_hack', name: 'FlyHack', description: 'Override gravity and vertical velocity checks.', enabled: false, category: Category.MOVEMENT },
  { id: 'esp_box', name: 'Box ESP', description: 'Render bounding boxes using W2S matrix conversion.', enabled: true, category: Category.VISUALS },
  { id: 'fov_changer', name: 'FOV Changer', description: 'Modify camera field-of-view memory addresses.', enabled: true, category: Category.MISC, value: 90, min: 60, max: 140 },
];

const MOCK_METRICS = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  cpu: Math.random() * 10 + 2,
}));

export default function App() {
  const [activeTab, setActiveTab] = useState<'features' | 'skinchanger' | 'radar' | 'architecture' | 'config'>('features');
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [status, setStatus] = useState('Idle');

  const toggleFeature = useCallback((id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  }, []);

  const updateFeatureValue = useCallback((id: string, value: number) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, value } : f));
  }, []);

  const handleInject = () => {
    setStatus('Linking Kernel...');
    setTimeout(() => setStatus('Stable'), 2000);
  };

  const navItems = [
    { id: 'features', label: 'Feature Matrix', icon: <Icons.Zap /> },
    { id: 'skinchanger', label: 'Skin Changer', icon: <Icons.Dagger /> },
    { id: 'radar', label: 'Tactical Radar', icon: <Icons.Radar /> },
    { id: 'architecture', label: 'Internal Build', icon: <Icons.Code /> },
    { id: 'config', label: 'Profiles', icon: <Icons.Settings /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#e4e4e7] overflow-hidden selection:bg-red-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-red-950/30 flex flex-col bg-[#08080a]">
        <div className="p-6 border-b border-red-950/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
              <Icons.Shield />
            </div>
            <h1 className="font-bold text-lg tracking-tight red-glow-text">REDLINE <span className="text-red-500">SYS</span></h1>
          </div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Architect V2.1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-red-600/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                  : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/30'
              }`}
            >
              <span className={`${activeTab === item.id ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-500'}`}>
                {item.icon}
              </span>
              <span className="text-sm font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-red-950/30 bg-black/40">
          <button
            onClick={handleInject}
            className={`w-full py-3 rounded font-bold text-xs transition-all shadow-lg border ${
              status === 'Stable'
                ? 'bg-red-600/10 text-red-500 border-red-500/30 cursor-default'
                : 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-red-900/20 active:scale-95'
            }`}
          >
            {status === 'Idle' ? 'INITIALIZE KERNEL' : status.toUpperCase()}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.03),transparent)]">
        {/* Top Header */}
        <header className="h-16 border-b border-red-950/30 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-600 shadow-[0_0_5px_red]" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">System Status:</span>
                <span className="text-xs font-bold text-red-500">OPTIMIZED</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-zinc-600 uppercase tracking-tighter font-bold">C++ Backend Version</span>
                <span className="text-xs font-mono text-zinc-300">2.1.0-STABLE</span>
             </div>
             <div className="w-px h-8 bg-red-950/30" />
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-zinc-600 uppercase tracking-tighter font-bold">Kernel Link</span>
                <span className={`text-xs font-mono ${status === 'Stable' ? 'text-emerald-500' : 'text-red-600'}`}>
                  {status === 'Stable' ? 'STABLE_LOCKED' : 'UNLINKED'}
                </span>
             </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="xl:col-span-2">
                 <FeatureGrid features={features} onToggle={toggleFeature} onValueChange={updateFeatureValue} />
               </div>
               <div className="space-y-6">
                  <div className="bg-[#0c0c0e] border border-red-900/20 p-6 rounded-xl shadow-xl red-glow-border">
                    <h3 className="text-[10px] font-black text-red-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Icons.Zap /> Memory Flow
                    </h3>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={MOCK_METRICS}>
                            <defs>
                              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="cpu" stroke="#ef4444" fillOpacity={1} fill="url(#colorRed)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-[#0c0c0e] border border-red-900/20 p-6 rounded-xl shadow-xl red-glow-border">
                    <h3 className="text-[10px] font-black text-zinc-500 mb-4 uppercase tracking-[0.2em]">Module Health</h3>
                    <div className="space-y-2">
                      {['User-Mode Hook', 'Thread Hijack', 'VMT Spoof'].map(m => (
                        <div key={m} className="flex justify-between items-center text-[10px] font-mono border-b border-red-900/10 pb-2">
                          <span className="text-zinc-500">{m}</span>
                          <span className="text-emerald-500">VERIFIED</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'skinchanger' && <SkinChanger />}
          {activeTab === 'radar' && <RadarModule />}
          {activeTab === 'architecture' && <ArchitectureView />}
          {activeTab === 'config' && <ConfigManager features={features} />}
        </div>

        {/* Bottom Terminal */}
        <Terminal />
      </main>
    </div>
  );
}
