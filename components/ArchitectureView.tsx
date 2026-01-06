
import React, { useState } from 'react';

const FILES = [
  {
    path: 'include/features.h',
    lang: 'cpp',
    content: `#pragma once
#include <vector>
#include <string>
#include "sdk/vector.h"

namespace Sentinel {
    class FeatureManager {
    public:
        // Combat Features
        void SilentAim(LocalPlayer* pLocal, Entity* pTarget);
        void NoRecoil(Weapon* pWeapon);
        void InfiniteAmmo(Weapon* pWeapon);

        // Movement Features
        void FlyHack(LocalPlayer* pLocal);
        void SpeedHack(float multiplier);
        void BunnyHop(LocalPlayer* pLocal);

        // Visual Logic
        void BoxESP(Entity* pTarget, ViewMatrix matrix);
        void Chams(Entity* pTarget);
        
        // Configuration
        void SaveConfig(const std::string& path);
        void LoadConfig(const std::string& path);
    };
}`
  },
  {
    path: 'src/features.cpp',
    lang: 'cpp',
    content: `#include "features.h"
#include "memory/scanner.h"

void Sentinel::FeatureManager::SilentAim(LocalPlayer* pLocal, Entity* pTarget) {
    if (!Config::Combat::bSilentAim) return;
    
    Vector3 targetPos = pTarget->GetBonePosition(BONE_HEAD);
    Vector3 viewAngles = CalculateAngles(pLocal->GetPos(), targetPos);
    
    // Memory-based angle manipulation
    // Pattern: 48 8B 05 ? ? ? ? 48 8D 4C 24 ? 48 89 44 24
    uintptr_t angleAddr = Scanner::FindPattern("client.dll", "48 8B 05 ? ? ? ?");
    Memory::Write<Vector3>(angleAddr, viewAngles);
}

void Sentinel::FeatureManager::FlyHack(LocalPlayer* pLocal) {
    if (!Config::Movement::bFlyHack) return;
    
    // Gravity override logic
    float gravity = 0.0f;
    pLocal->SetGravity(gravity);
    
    if (Input::IsKeyDown(VK_SPACE)) 
        pLocal->SetVelocityZ(500.0f);
}`
  },
  {
    path: 'config.json',
    lang: 'json',
    content: `{
  "sentinel_ver": "4.0.2",
  "combat": {
    "silent_aim": true,
    "silent_fov": 5.0,
    "no_recoil": true,
    "rapid_fire": false
  },
  "visuals": {
    "box_esp": true,
    "snaplines": false,
    "chams": true,
    "radar": true
  }
}`
  }
];

const ArchitectureView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(FILES[0]);

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#18181b] border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col flex-1 shadow-2xl">
        <div className="flex border-b border-zinc-800/50 bg-zinc-900/30">
          {FILES.map(file => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file)}
              className={`px-6 py-3 text-xs font-mono transition-colors border-r border-zinc-800/50 ${
                selectedFile.path === file.path 
                  ? 'bg-blue-600/10 text-blue-400 border-b border-b-blue-500' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {file.path}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto bg-[#0d0d0e] p-6 font-mono text-sm relative">
           <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
             <code>{selectedFile.content}</code>
           </pre>
           <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
             <svg width="100" height="100" viewBox="0 0 100 100" className="text-blue-500">
               <path d="M10 20 L90 20 M10 50 L90 50 M10 80 L90 80" stroke="currentColor" strokeWidth="2" />
             </svg>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg">
          <h5 className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Memory Engine</h5>
          <p className="text-xs text-zinc-300 leading-relaxed">Uses high-performance JIT-compiled signature scanning for 0ms address resolution.</p>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg">
          <h5 className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Thread Safety</h5>
          <p className="text-xs text-zinc-300 leading-relaxed">Mutex-guarded shared memory access ensuring stability across engine updates.</p>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg">
          <h5 className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">Hooking Method</h5>
          <p className="text-xs text-zinc-300 leading-relaxed">Advanced VMT swapping and Mid-Function Trampoline hooks for stealth execution.</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
