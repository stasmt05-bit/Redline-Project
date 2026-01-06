
import React, { useState, useEffect, useRef } from 'react';

const LOG_MESSAGES = [
  "[INFO] Redline V2.1.0 Initializing...",
  "[INFO] Kernel handle obtained: 0x000005F4",
  "[WARN] Scanning for restricted memory regions...",
  "[INFO] Hook detected at offset 0x7FF6B20",
  "[SUCCESS] Engine synchronization complete.",
  "[INFO] Client state: CONNECTED",
  "[ERROR] VMT shadow copy failed (Retrying...)",
  "[SUCCESS] Pointer chain resolved: [engine.dll + 0x48FA20]",
  "[INFO] Heartbeat sent to backend server...",
  "[INFO] Anti-cheat heartbeat spoofed successfully.",
  "[WARN] Thread stack inconsistency detected.",
  "[INFO] Injecting shellcode at 0x140000000",
  "[SUCCESS] Shellcode executed. Entry point: 0x140001020"
];

const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setLogs(prev => [...prev.slice(-40), `[${timestamp}] ${msg}`]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-40 bg-black border-t border-red-900/50 p-3 font-mono text-[10px] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-2 pb-1 border-b border-red-900/20">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span className="text-red-500 font-bold uppercase tracking-widest">Live Kernel Debug Logs</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto terminal-scrollbar space-y-1">
        {logs.map((log, i) => (
          <div key={i} className={`
            ${log.includes('[ERROR]') ? 'text-red-600' : 
              log.includes('[SUCCESS]') ? 'text-emerald-500' : 
              log.includes('[WARN]') ? 'text-yellow-500' : 'text-zinc-500'}
          `}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
