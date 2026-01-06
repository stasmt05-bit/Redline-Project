
import React from 'react';
import { Icons } from '../constants';

const WEAPONS = [
  { id: 'ak47', name: 'AK-47', type: 'Rifle', skins: ['Bloodsport', 'Asiimov', 'Vulcan', 'Fuel Injector'] },
  { id: 'awp', name: 'AWP', type: 'Sniper', skins: ['Dragon Lore', 'Gungnir', 'Medusa', 'Hyper Beast'] },
  { id: 'karambit', name: 'Karambit', type: 'Knife', skins: ['Doppler (Ruby)', 'Marble Fade', 'Gamma Doppler', 'Tiger Tooth'] },
  { id: 'm4a1', name: 'M4A1-S', type: 'Rifle', skins: ['Welcome to the Jungle', 'Printstream', 'Blue Phosphor', 'Mecha Industries'] },
  { id: 'deagle', name: 'Desert Eagle', type: 'Pistol', skins: ['Blaze', 'Printstream', 'Emerald Jörmungandr', 'Code Red'] },
  { id: 'glock', name: 'Glock-18', type: 'Pistol', skins: ['Fade', 'Water Elemental', 'Gamma Doppler', 'Neo-Noir'] }
];

const SkinChanger: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEAPONS.map(weapon => (
          <div key={weapon.id} className="bg-[#0c0c0e] border border-red-900/30 rounded-xl p-5 hover:border-red-600/50 transition-all red-glow-border group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-950/30 rounded text-red-500">
                  <Icons.Shield />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-200 group-hover:text-red-400 transition-colors">{weapon.name}</h4>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">{weapon.type}</p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video bg-black/40 rounded-lg mb-4 flex items-center justify-center border border-zinc-800/50 overflow-hidden">
               {/* Placeholder for actual weapon renders */}
               <div className="absolute inset-0 bg-gradient-to-tr from-red-950/10 to-transparent" />
               <Icons.Zap />
               <div className="absolute bottom-2 right-2 text-[10px] text-red-900 font-mono">MDL_CACHE::LOCKED</div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-zinc-500 uppercase font-bold">Override Texture</label>
              <select className="w-full bg-[#151518] border border-red-900/20 rounded px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-red-600/50 transition-colors">
                {weapon.skins.map(skin => (
                  <option key={skin}>{skin}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                 <button className="flex-1 py-2 bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-bold rounded uppercase hover:bg-red-600 hover:text-white transition-all">Apply Skin</button>
                 <button className="px-3 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-bold rounded uppercase hover:text-zinc-300">Reset</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinChanger;
