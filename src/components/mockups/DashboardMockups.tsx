import { ReactNode } from "react";
import {
  Leaf, LogOut, ChevronDown, Settings, Sun, Droplets, Wind, Waves,
  Thermometer, Camera, Image as ImageIcon, Play, Download, Bell,
  AlertTriangle, CheckCircle2, Sparkles, FolderOpen, Trash2
} from "lucide-react";

/**
 * Mockup Phone Frame — wraps dashboard mockups with a phone bezel.
 * Responsive: scales to container width while keeping aspect ratio.
 */
type MockupPhoneProps = {
  children: ReactNode;
  badge?: string;
  badgeColor?: string;
  width?: number;
};

export const MockupPhone = ({ children, badge, badgeColor = "bg-green-500", width = 280 }: MockupPhoneProps) => (
  <div className="relative inline-block" style={{ width }}>
    <div className="rounded-[2rem] overflow-hidden border-[6px] border-gray-900 shadow-2xl bg-[#0a0f14]">
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "9/18",
          background: "linear-gradient(180deg, #0a0f14 0%, #0d1418 100%)",
        }}
      >
        {children}
      </div>
    </div>
    {badge && (
      <div className={`absolute -bottom-3 -right-3 ${badgeColor} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
        {badge}
      </div>
    )}
  </div>
);

/* ============================================================
   CULTIVEE HIDRO — Dashboard (4 relés)
   ============================================================ */
export const HidroDashboardMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    {/* Header */}
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Leaf className="w-3.5 h-3.5 text-green-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-green-400 leading-none">CULTIVEE</div>
          <div className="text-[7px] text-gray-500 leading-none mt-0.5">Hidro · Essencial</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] text-gray-400">mardoqueu</span>
        <LogOut className="w-3 h-3 text-gray-500" />
      </div>
    </div>

    {/* Module selector */}
    <div className="px-3 pt-2">
      <div className="bg-[#0f1923] border border-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
          <span className="text-[10px] font-semibold text-white">Hidro</span>
          <Sun className="w-2.5 h-2.5 text-yellow-400" />
          <span className="text-[9px] text-gray-400">Muda</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <span className="text-green-400 text-[10px] leading-none">+</span>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
      </div>
    </div>

    {/* Status grid 2x2 */}
    <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-2 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Ciclo</div>
        <div className="text-base font-bold text-green-400 leading-tight">Dia 2</div>
      </div>
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-2 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Fase</div>
        <div className="text-base font-bold text-green-400 leading-tight">Muda</div>
      </div>
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-1.5 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Início</div>
        <div className="text-[10px] font-bold text-green-400">27/03/2026</div>
      </div>
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-1.5 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Hoje</div>
        <div className="text-[10px] font-bold text-green-400">28/03/2026</div>
      </div>
    </div>

    {/* 4 Relay indicators */}
    <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
      <div className="bg-[#0f1923] border border-green-500/30 rounded-full px-2 py-1 flex items-center gap-1.5">
        <Sun className="w-2.5 h-2.5 text-yellow-400" />
        <span className="text-[8px] text-white">Luz ON</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-full px-2 py-1 flex items-center gap-1.5">
        <Droplets className="w-2.5 h-2.5 text-gray-500" />
        <span className="text-[8px] text-gray-400">Bomba OFF</span>
      </div>
      <div className="bg-[#0f1923] border border-cyan-500/30 rounded-full px-2 py-1 flex items-center gap-1.5">
        <Wind className="w-2.5 h-2.5 text-cyan-400" />
        <span className="text-[8px] text-white">Vent ON</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-full px-2 py-1 flex items-center gap-1.5">
        <Waves className="w-2.5 h-2.5 text-gray-500" />
        <span className="text-[8px] text-gray-400">Aer OFF</span>
      </div>
    </div>

    {/* Mode button */}
    <div className="px-3 pt-2">
      <div className="border border-green-500/40 rounded-lg py-1.5 text-center">
        <span className="text-[9px] font-semibold text-green-400">⚡ Modo Automático</span>
      </div>
    </div>

    {/* Phases card */}
    <div className="px-3 pt-2 flex-1">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1">
          <Settings className="w-2.5 h-2.5 text-gray-400" />
          <span className="text-[9px] font-semibold text-white">Fases Configuradas</span>
        </div>
        <div className="bg-[#0f1923] border border-white/5 rounded-full px-2 py-0.5">
          <span className="text-[8px] text-gray-400">Configurar</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="bg-green-500/10 border border-green-500/40 rounded-lg px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-semibold text-white">Muda</span>
              <span className="text-[7px] bg-green-500/30 text-green-300 px-1.5 py-0.5 rounded-full font-bold">ATIVA</span>
            </div>
            <Sun className="w-2.5 h-2.5 text-yellow-400" />
          </div>
          <div className="text-[7px] text-gray-400 mt-0.5">06:00 — 18:00 · Dia 15/15 · Noite 15/45</div>
        </div>
        <div className="bg-[#0f1923] border border-white/5 rounded-lg px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-gray-300">Vegetativo</span>
            <Sun className="w-2.5 h-2.5 text-gray-500" />
          </div>
          <div className="text-[7px] text-gray-500 mt-0.5">06:00 — 18:00 · Dia 15/15 · Noite 15/45</div>
        </div>
        <div className="bg-[#0f1923] border border-white/5 rounded-lg px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-gray-300">Floração</span>
            <Sun className="w-2.5 h-2.5 text-gray-500" />
          </div>
          <div className="text-[7px] text-gray-500 mt-0.5">12:00 — 00:00 · Dia 20/40 · Noite 0/0</div>
        </div>
      </div>
    </div>

    {/* Uptime banner (v4.1.31 — historico 90 dias) */}
    <div className="px-3 pt-2 pb-1">
      <div className="bg-green-500/5 border border-green-500/20 rounded px-2 py-1 flex items-center justify-between">
        <span className="text-[7px] text-green-400 font-semibold flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-green-400"></span>
          Uptime 7d 99.2% · 1 queda
        </span>
        <span className="text-[7px] text-blue-400">Histórico ›</span>
      </div>
    </div>

    {/* Status bar bottom */}
    <div className="px-3 py-1 border-t border-white/5 flex items-center justify-between">
      <span className="text-[7px] text-gray-500">📶 -62dBm</span>
      <span className="text-[7px] text-gray-500">v4.1.33</span>
    </div>
  </div>
);

/* ============================================================
   CULTIVEE HIDRO FARM — Dashboard (Premium)
   ============================================================ */
export const HidroFarmDashboardMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    {/* Header */}
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-emerald-400 leading-none">CULTIVEE</div>
          <div className="text-[7px] text-emerald-500/80 leading-none mt-0.5">Hidro Farm · Premium</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Bell className="w-3 h-3 text-emerald-400" />
        <span className="text-[8px] text-gray-400">mardoqueu</span>
        <LogOut className="w-3 h-3 text-gray-500" />
      </div>
    </div>

    {/* Status row */}
    <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-1.5 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Ciclo</div>
        <div className="text-sm font-bold text-emerald-400">Dia 12</div>
      </div>
      <div className="bg-[#0f1923] border border-white/5 rounded-lg py-1.5 text-center">
        <div className="text-[7px] text-gray-500 uppercase tracking-wide">Fase</div>
        <div className="text-sm font-bold text-emerald-400">Vegetativo</div>
      </div>
    </div>

    {/* 6 Relay grid */}
    <div className="px-3 pt-2 grid grid-cols-3 gap-1">
      <div className="bg-[#0f1923] border border-green-500/30 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Sun className="w-2.5 h-2.5 text-yellow-400" />
        <span className="text-[7px] text-white">Luz</span>
      </div>
      <div className="bg-[#0f1923] border border-blue-500/30 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Droplets className="w-2.5 h-2.5 text-blue-400" />
        <span className="text-[7px] text-white">Bomba</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Wind className="w-2.5 h-2.5 text-gray-500" />
        <span className="text-[7px] text-gray-400">Vent</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Waves className="w-2.5 h-2.5 text-gray-500" />
        <span className="text-[7px] text-gray-400">Aer</span>
      </div>
      <div className="bg-[#0f1923] border border-emerald-500/40 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Droplets className="w-2.5 h-2.5 text-emerald-400" />
        <span className="text-[7px] text-white">Válv</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-md px-1.5 py-1 flex flex-col items-center gap-0.5">
        <Waves className="w-2.5 h-2.5 text-gray-500" />
        <span className="text-[7px] text-gray-400">Homog</span>
      </div>
    </div>

    {/* Ambient card */}
    <div className="px-3 pt-2">
      <div className="bg-[#0f1923] border border-white/5 rounded-lg px-2.5 py-2">
        <div className="flex items-center gap-1 mb-1.5">
          <Thermometer className="w-2.5 h-2.5 text-red-400" />
          <span className="text-[8px] font-semibold text-white">Ambiente</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-white">24</span>
            <span className="text-[8px] text-gray-400">°C</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-white">67</span>
            <span className="text-[8px] text-gray-400">% UR</span>
          </div>
        </div>
      </div>
    </div>

    {/* Reservoir card with alert timer */}
    <div className="px-3 pt-2">
      <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <Droplets className="w-2.5 h-2.5 text-emerald-400" />
            <span className="text-[8px] font-semibold text-white">Reservatório</span>
          </div>
          <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">ENCHENDO</span>
        </div>

        {/* Tank visual */}
        <div className="relative bg-[#060a0e] border border-white/10 rounded-md h-8 overflow-hidden mb-1.5">
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500/60 to-emerald-400/30" style={{ height: "35%" }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-semibold text-white drop-shadow">35%</span>
          </div>
          {/* Float indicators */}
          <div className="absolute left-1 top-0.5 flex flex-col gap-[18px]">
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="w-1 h-1 rounded-full bg-emerald-400 ring-1 ring-emerald-400/30"></div>
          </div>
        </div>

        {/* Alert timer */}
        <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 rounded px-1.5 py-1">
          <AlertTriangle className="w-2.5 h-2.5 text-orange-400" />
          <span className="text-[7px] text-orange-300">Nível baixo há <b>4min 32s</b></span>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[7px] text-gray-500">Alerta após <b className="text-white">10</b>min</span>
          <div className="flex items-center gap-1">
            <span className="text-[7px] text-gray-500">Notificações</span>
            <div className="w-6 h-3 bg-emerald-500 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1"></div>

    {/* Uptime banner (v4.1.31) */}
    <div className="px-3 pb-1">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded px-2 py-1 flex items-center justify-between">
        <span className="text-[7px] text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
          Uptime 7d 99.8% · 0 quedas
        </span>
        <span className="text-[7px] text-blue-400">Histórico ›</span>
      </div>
    </div>

    {/* Bottom status */}
    <div className="px-3 py-1 border-t border-white/5 flex items-center justify-between">
      <span className="text-[7px] text-emerald-500">● Online</span>
      <span className="text-[7px] text-gray-500">v4.1.33</span>
    </div>
  </div>
);

/* ============================================================
   CULTIVEE CAM — Dashboard
   ============================================================ */
export const CamDashboardMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    {/* Header */}
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <Camera className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-blue-400 leading-none">CULTIVEE</div>
          <div className="text-[7px] text-gray-500 leading-none mt-0.5">Cam · Monitoramento</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] text-gray-400">mardoqueu</span>
        <LogOut className="w-3 h-3 text-gray-500" />
      </div>
    </div>

    {/* Module selector */}
    <div className="px-3 pt-2">
      <div className="bg-[#0f1923] border border-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          <span className="text-[10px] font-semibold text-white">Cam Estufa 01</span>
        </div>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </div>
    </div>

    {/* Last capture preview (faux plant photo with gradient) */}
    <div className="px-3 pt-2">
      <div className="relative rounded-lg overflow-hidden border border-white/5 aspect-[4/3]" style={{
        background: "radial-gradient(ellipse at center bottom, #1a3d1a 0%, #0f2410 35%, #081408 70%, #040a04 100%)"
      }}>
        {/* Faux plants silhouettes */}
        <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 50 150 Q 45 100 55 80 Q 60 70 62 60 Q 65 50 58 45 M 62 60 Q 70 55 75 48 M 55 80 Q 40 75 35 65" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <ellipse cx="58" cy="45" rx="6" ry="3" fill="#3d8b3d" />
          <ellipse cx="75" cy="48" rx="5" ry="2.5" fill="#3d8b3d" />
          <ellipse cx="35" cy="65" rx="5" ry="2.5" fill="#3d8b3d" />
          <path d="M 130 150 Q 125 95 135 75 Q 140 65 145 55 M 135 75 Q 150 70 155 62" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <ellipse cx="145" cy="55" rx="7" ry="3.5" fill="#3d8b3d" />
          <ellipse cx="155" cy="62" rx="5" ry="2.5" fill="#3d8b3d" />
          <path d="M 95 150 Q 92 105 100 85 Q 105 75 108 65" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <ellipse cx="108" cy="65" rx="6" ry="3" fill="#3d8b3d" />
        </svg>

        {/* Overlay badge */}
        <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur rounded px-1.5 py-0.5">
          <span className="text-[7px] text-white font-mono">28/03 · 14:32</span>
        </div>
        <div className="absolute top-1.5 right-1.5 bg-red-500 rounded-full px-1.5 py-0.5 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
          <span className="text-[7px] text-white font-bold">LIVE</span>
        </div>
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
          <span className="text-[7px] text-white/70 font-mono">SVGA · q8</span>
          <span className="text-[7px] text-white/70 font-mono">~10fps</span>
        </div>
      </div>
    </div>

    {/* Action buttons */}
    <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
      <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg py-2 flex items-center justify-center gap-1">
        <Camera className="w-3 h-3 text-blue-400" />
        <span className="text-[9px] font-semibold text-white">Capturar</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-lg py-2 flex items-center justify-center gap-1">
        <Play className="w-3 h-3 text-white" />
        <span className="text-[9px] font-semibold text-white">Ao Vivo</span>
      </div>
    </div>

    {/* Gallery preview */}
    <div className="px-3 pt-2 flex-1">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1">
          <ImageIcon className="w-2.5 h-2.5 text-gray-400" />
          <span className="text-[9px] font-semibold text-white">Últimas Capturas</span>
        </div>
        <span className="text-[7px] text-blue-400">Ver todas →</span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square rounded border border-white/5 relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center bottom, #1a3d1a 0%, #0f2410 50%, #081408 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-80">
              <div
                className="w-1 h-4 mx-auto mt-3 rounded-t-sm"
                style={{ background: "#2d6b2d" }}
              ></div>
              <div
                className="w-3 h-1.5 mx-auto rounded-full mt-0.5"
                style={{ background: "#3d8b3d" }}
              ></div>
            </div>
            {i === 1 && (
              <div className="absolute top-0.5 right-0.5 bg-blue-500 rounded-full w-2 h-2 flex items-center justify-center">
                <span className="text-[6px] text-white leading-none">●</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[7px] text-gray-500">📁 Cultivo atual · 42 fotos</span>
        <Download className="w-2.5 h-2.5 text-gray-500" />
      </div>
    </div>

    {/* Uptime banner (v4.1.31) */}
    <div className="px-3 pb-1">
      <div className="bg-blue-500/5 border border-blue-500/20 rounded px-2 py-1 flex items-center justify-between">
        <span className="text-[7px] text-blue-400 font-semibold flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-blue-400"></span>
          Uptime 7d 99.5% · 1 queda
        </span>
        <span className="text-[7px] text-blue-300">Histórico ›</span>
      </div>
    </div>

    {/* Status bar */}
    <div className="px-3 py-1 border-t border-white/5 flex items-center justify-between">
      <span className="text-[7px] text-blue-500">📶 -58dBm</span>
      <span className="text-[7px] text-gray-500">v4.1.33</span>
    </div>
  </div>
);

/* ============================================================
   CULTIVEE CAM — Captura sob demanda (foto em destaque)
   ============================================================ */
export const CamCaptureMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    {/* Header */}
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ChevronDown className="w-3 h-3 text-gray-400 rotate-90" />
        <span className="text-[10px] font-semibold text-white">Captura</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[7px] text-gray-500 font-mono">1 / 247</span>
      </div>
    </div>

    {/* Foto em destaque (grande, ocupa quase toda a area) */}
    <div className="px-3 pt-2 flex-1">
      <div
        className="relative rounded-lg overflow-hidden border border-white/10"
        style={{
          aspectRatio: "4/5",
          background:
            "radial-gradient(ellipse at 50% 70%, #2a5a2a 0%, #1a3d1a 25%, #0f2410 55%, #061206 100%)",
        }}
      >
        {/* Plantas mais elaboradas */}
        <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Halo de luz no topo */}
          <ellipse cx="100" cy="-20" rx="120" ry="80" fill="rgba(120, 200, 100, 0.15)" />
          {/* Planta principal central */}
          <path d="M 100 250 Q 95 180 102 140 Q 105 110 100 80 Q 98 60 105 50" stroke="#3a8b3a" strokeWidth="2" fill="none" />
          <path d="M 102 140 Q 75 130 60 115" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <path d="M 102 140 Q 130 130 145 118" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <path d="M 100 80 Q 80 75 70 65" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <path d="M 100 80 Q 122 73 132 62" stroke="#2d6b2d" strokeWidth="1.5" fill="none" />
          <ellipse cx="105" cy="50" rx="9" ry="4" fill="#5cb85c" />
          <ellipse cx="60" cy="115" rx="7" ry="3.5" fill="#4ca84c" />
          <ellipse cx="145" cy="118" rx="7" ry="3.5" fill="#4ca84c" />
          <ellipse cx="70" cy="65" rx="6" ry="3" fill="#4ca84c" />
          <ellipse cx="132" cy="62" rx="6" ry="3" fill="#4ca84c" />
          {/* Plantas laterais menores */}
          <path d="M 35 250 Q 32 210 38 185 Q 40 170 36 160" stroke="#2d6b2d" strokeWidth="1.2" fill="none" />
          <ellipse cx="36" cy="160" rx="4" ry="2" fill="#3a8b3a" />
          <path d="M 165 250 Q 168 200 162 175 Q 160 160 166 150" stroke="#2d6b2d" strokeWidth="1.2" fill="none" />
          <ellipse cx="166" cy="150" rx="4" ry="2" fill="#3a8b3a" />
        </svg>

        {/* Overlay topo */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur rounded px-2 py-1">
          <div className="text-[7px] text-white font-mono leading-tight">28 mar 2026</div>
          <div className="text-[7px] text-white/70 font-mono leading-tight">14:32:18</div>
        </div>
        <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur rounded px-1.5 py-0.5">
          <span className="text-[7px] text-white font-bold">UXGA</span>
        </div>

        {/* Setas navegacao */}
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
          <span className="text-white text-[9px] leading-none">‹</span>
        </div>
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
          <span className="text-white text-[9px] leading-none">›</span>
        </div>

        {/* Info bottom */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur rounded px-2 py-1 flex items-center justify-between">
          <span className="text-[7px] text-white/90 font-mono">1600×1200</span>
          <span className="text-[7px] text-white/70 font-mono">387 KB · q5</span>
        </div>
      </div>
    </div>

    {/* Acoes */}
    <div className="px-3 pt-2 grid grid-cols-4 gap-1">
      <div className="bg-[#0f1923] border border-white/10 rounded-lg py-1.5 flex flex-col items-center gap-0.5">
        <Download className="w-3 h-3 text-blue-400" />
        <span className="text-[7px] text-white">Baixar</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-lg py-1.5 flex flex-col items-center gap-0.5">
        <FolderOpen className="w-3 h-3 text-purple-400" />
        <span className="text-[7px] text-white">Mover</span>
      </div>
      <div className="bg-[#0f1923] border border-white/10 rounded-lg py-1.5 flex flex-col items-center gap-0.5">
        <Camera className="w-3 h-3 text-green-400" />
        <span className="text-[7px] text-white">Nova</span>
      </div>
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg py-1.5 flex flex-col items-center gap-0.5">
        <Trash2 className="w-3 h-3 text-red-400" />
        <span className="text-[7px] text-red-300">Excluir</span>
      </div>
    </div>

    {/* Pasta atual */}
    <div className="px-3 pt-2">
      <div className="bg-[#0f1923] border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
        <FolderOpen className="w-3 h-3 text-blue-400" />
        <div className="flex-1">
          <div className="text-[8px] font-semibold text-white leading-none">Cultivo atual</div>
          <div className="text-[7px] text-gray-500 leading-none mt-0.5">42 fotos · 18 MB</div>
        </div>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </div>
    </div>

    <div className="flex-1"></div>

    {/* Status bar */}
    <div className="px-3 py-1 border-t border-white/5 flex items-center justify-between">
      <span className="text-[7px] text-blue-500">📶 -58dBm</span>
      <span className="text-[7px] text-gray-500">Capturada agora</span>
    </div>
  </div>
);

/* ============================================================
   CULTIVEE CAM — Galeria com pastas e selecao multipla
   ============================================================ */
export const CamGalleryMockup = () => {
  // Variacoes pra cada thumbnail nao parecer copia
  const thumbs = [
    { x: 100, lean: 0, h: 30, leaves: [{ x: 100, y: 90, r: 6 }] },
    { x: 95, lean: -3, h: 35, leaves: [{ x: 95, y: 80, r: 7 }, { x: 75, y: 100, r: 4 }] },
    { x: 105, lean: 2, h: 28, leaves: [{ x: 105, y: 95, r: 6 }, { x: 125, y: 110, r: 4 }] },
    { x: 100, lean: 0, h: 40, leaves: [{ x: 100, y: 75, r: 8 }] },
    { x: 92, lean: -5, h: 32, leaves: [{ x: 92, y: 85, r: 6 }, { x: 75, y: 95, r: 5 }, { x: 110, y: 105, r: 4 }] },
    { x: 100, lean: 1, h: 36, leaves: [{ x: 100, y: 82, r: 7 }] },
    { x: 98, lean: -2, h: 33, leaves: [{ x: 98, y: 88, r: 6 }, { x: 80, y: 102, r: 4 }] },
    { x: 102, lean: 3, h: 38, leaves: [{ x: 102, y: 78, r: 7 }, { x: 122, y: 100, r: 5 }] },
    { x: 100, lean: 0, h: 30, leaves: [{ x: 100, y: 90, r: 6 }] },
  ];
  const selected = new Set([0, 2, 5]); // 3 fotos selecionadas

  return (
    <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ChevronDown className="w-3 h-3 text-gray-400 rotate-90" />
          <span className="text-[10px] font-semibold text-white">Galeria</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-gray-400">247 fotos</span>
        </div>
      </div>

      {/* Pastas (chips horizontais) */}
      <div className="px-3 pt-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-full px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
            <FolderOpen className="w-2.5 h-2.5 text-blue-400" />
            <span className="text-[7px] text-white font-semibold">Cultivo atual</span>
            <span className="text-[7px] text-blue-300">42</span>
          </div>
          <div className="bg-[#0f1923] border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
            <FolderOpen className="w-2.5 h-2.5 text-gray-500" />
            <span className="text-[7px] text-gray-300">Mudas Mar/26</span>
            <span className="text-[7px] text-gray-500">68</span>
          </div>
          <div className="bg-[#0f1923] border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
            <FolderOpen className="w-2.5 h-2.5 text-gray-500" />
            <span className="text-[7px] text-gray-300">Floração Fev</span>
            <span className="text-[7px] text-gray-500">94</span>
          </div>
          <div className="bg-[#0f1923] border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-1 flex-shrink-0">
            <FolderOpen className="w-2.5 h-2.5 text-gray-500" />
            <span className="text-[7px] text-gray-300">Arquivo</span>
          </div>
        </div>
      </div>

      {/* Toolbar de selecao */}
      <div className="px-3 pt-1.5">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-2 py-1.5 flex items-center justify-between">
          <span className="text-[8px] text-blue-300 font-semibold">3 selecionadas</span>
          <div className="flex items-center gap-2">
            <Download className="w-2.5 h-2.5 text-blue-300" />
            <FolderOpen className="w-2.5 h-2.5 text-blue-300" />
            <Trash2 className="w-2.5 h-2.5 text-red-400" />
          </div>
        </div>
      </div>

      {/* Grid 3 col */}
      <div className="px-3 pt-1.5 flex-1">
        <div className="grid grid-cols-3 gap-1">
          {thumbs.map((t, i) => {
            const isSelected = selected.has(i);
            return (
              <div
                key={i}
                className={`aspect-square rounded relative overflow-hidden border ${
                  isSelected ? "border-blue-400 ring-1 ring-blue-400" : "border-white/5"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 80%, #1a3d1a 0%, #0f2410 50%, #061206 100%)",
                }}
              >
                <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <line
                    x1={t.x}
                    y1="150"
                    x2={t.x + t.lean}
                    y2={150 - t.h - 50}
                    stroke="#2d6b2d"
                    strokeWidth="2"
                  />
                  {t.leaves.map((leaf, j) => (
                    <ellipse key={j} cx={leaf.x} cy={leaf.y} rx={leaf.r} ry={leaf.r * 0.5} fill="#3d8b3d" />
                  ))}
                </svg>
                {/* Timestamp pequeno */}
                <div className="absolute bottom-0.5 left-0.5 right-0.5 flex justify-between">
                  <span className="text-[5px] text-white/60 font-mono">{28 - (i % 5)}/03</span>
                  <span className="text-[5px] text-white/60 font-mono">14:{32 - i}</span>
                </div>
                {/* Checkbox de selecao */}
                <div
                  className={`absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded ${
                    isSelected ? "bg-blue-500" : "bg-black/40 border border-white/30"
                  } flex items-center justify-center`}
                >
                  {isSelected && <span className="text-[7px] text-white leading-none font-bold">✓</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 border-t border-white/5 flex items-center justify-between">
        <span className="text-[7px] text-gray-500">📁 9 de 42 visíveis</span>
        <span className="text-[7px] text-blue-400">Carregar mais ›</span>
      </div>
    </div>
  );
};

/* ============================================================
   CULTIVEE HIDRO — Phases list (detalhe das fases)
   ============================================================ */
export const HidroPhasesMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Settings className="w-3.5 h-3.5 text-green-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-white leading-none">Fases Configuradas</div>
          <div className="text-[7px] text-gray-500 leading-none mt-0.5">Hidro · 4 fases</div>
        </div>
      </div>
      <span className="text-[8px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">+ Nova</span>
    </div>

    <div className="px-3 pt-2 space-y-1.5 flex-1 overflow-hidden">
      {[
        { name: "Germinação", days: "3 dias", light: "18/6h", pump: "15/15 · 15/45", vent: "06-18", aer: "Ciclo", active: false, color: "gray" },
        { name: "Muda", days: "17 dias", light: "18/6h", pump: "15/15 · 15/45", vent: "06-18", aer: "Ciclo", active: true, color: "green" },
        { name: "Vegetativo", days: "21 dias", light: "18/6h", pump: "15/15 · 15/45", vent: "24h", aer: "Ciclo", active: false, color: "gray" },
        { name: "Floração", days: "∞", light: "12/12h", pump: "20/40 · 0/0", vent: "24h", aer: "Ciclo", active: false, color: "gray" },
      ].map((phase, i) => (
        <div
          key={phase.name}
          className={`rounded-lg px-2 py-1.5 border ${
            phase.active
              ? "bg-green-500/10 border-green-500/40"
              : "bg-[#0f1923] border-white/5"
          }`}
        >
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${phase.active ? "bg-green-500/30" : "bg-white/5"}`}>
                <span className={`text-[8px] font-bold ${phase.active ? "text-green-300" : "text-gray-500"}`}>{i + 1}</span>
              </div>
              <span className={`text-[9px] font-semibold ${phase.active ? "text-white" : "text-gray-400"}`}>{phase.name}</span>
              {phase.active && (
                <span className="text-[6px] bg-green-500/30 text-green-300 px-1 py-0.5 rounded-full font-bold">ATIVA</span>
              )}
            </div>
            <span className="text-[7px] text-gray-500">{phase.days}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 pl-5">
            <div className="flex items-center gap-1">
              <Sun className="w-2 h-2 text-yellow-400" />
              <span className="text-[7px] text-gray-400">Luz {phase.light}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-2 h-2 text-blue-400" />
              <span className="text-[7px] text-gray-400">{phase.pump}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-2 h-2 text-cyan-400" />
              <span className="text-[7px] text-gray-400">Vent {phase.vent}</span>
            </div>
            <div className="flex items-center gap-1">
              <Waves className="w-2 h-2 text-purple-400" />
              <span className="text-[7px] text-gray-400">Aer {phase.aer}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="px-3 py-1.5 border-t border-white/5">
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg py-1.5 text-center">
        <span className="text-[9px] font-semibold text-green-400">💾 Salvar Configuração</span>
      </div>
    </div>
  </div>
);

/* ============================================================
   CULTIVEE HIDRO FARM — Reservatório card (detalhe)
   ============================================================ */
export const HidroFarmAlertMockup = () => (
  <div className="h-full flex flex-col text-[10px] font-sans text-gray-200">
    <div className="px-3 py-2.5 border-b border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-red-400 leading-none">Alerta · Nível Baixo</div>
          <div className="text-[7px] text-gray-500 leading-none mt-0.5">Hidro Farm · Estufa 01</div>
        </div>
      </div>
      <Bell className="w-3.5 h-3.5 text-red-400 animate-pulse" />
    </div>

    {/* Big alert card */}
    <div className="px-3 pt-3">
      <div className="bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-3 text-center">
        <AlertTriangle className="w-7 h-7 text-red-400 mx-auto mb-1.5 animate-pulse" />
        <div className="text-[9px] font-bold text-red-300 mb-0.5">RESERVATÓRIO VAZIO</div>
        <div className="text-[7px] text-red-400/80">Há <span className="font-bold text-white">12min 48s</span> acima do limite</div>

        {/* Tank visual */}
        <div className="relative mt-2 bg-[#060a0e] border border-white/10 rounded-md h-10 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-500/40 to-red-400/10" style={{ height: "8%" }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-bold text-red-300">8%</span>
          </div>
          <div className="absolute left-1 top-0.5 flex flex-col gap-[26px]">
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Notification channels */}
    <div className="px-3 pt-2 space-y-1">
      <div className="bg-[#0f1923] border border-emerald-500/20 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-[8px] font-semibold text-white">Push enviado</div>
          <div className="text-[7px] text-gray-500">14:32:18 · iPhone de Mardoqueu</div>
        </div>
      </div>
      <div className="bg-[#0f1923] border border-emerald-500/20 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-[8px] font-semibold text-white">E-mail enviado</div>
          <div className="text-[7px] text-gray-500">14:32:22 · mardo.abc@gmail.com</div>
        </div>
      </div>
    </div>

    {/* Timeline */}
    <div className="px-3 pt-2 flex-1">
      <div className="text-[8px] font-semibold text-white mb-1.5">Histórico</div>
      <div className="space-y-1">
        {[
          { time: "14:19", event: "Nível caiu abaixo da boia", color: "yellow" },
          { time: "14:20", event: "Válvula aberta automaticamente", color: "blue" },
          { time: "14:32", event: "Alerta disparado (10min)", color: "red" },
        ].map((item) => (
          <div key={item.time} className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full bg-${item.color}-400 flex-shrink-0`}></div>
            <span className="text-[7px] text-gray-400 font-mono w-8">{item.time}</span>
            <span className="text-[7px] text-gray-300 flex-1">{item.event}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Action bar */}
    <div className="px-3 py-1.5 border-t border-white/5">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-[#0f1923] border border-white/10 rounded py-1 text-center">
          <span className="text-[8px] text-gray-300">Silenciar</span>
        </div>
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded py-1 text-center">
          <span className="text-[8px] font-semibold text-emerald-300">Ver módulo →</span>
        </div>
      </div>
    </div>
  </div>
);
