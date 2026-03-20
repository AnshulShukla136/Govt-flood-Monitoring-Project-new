import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Upload Reading", path: "/upload", icon: "📤" },
  { name: "Water Data", path: "/data", icon: "📋" },
  { name: "Analytics", path: "/analytics", icon: "📈" },
  { name: "Alerts", path: "/alerts", icon: "🚨" },
  { name: "Map", path: "/map", icon: "🗺️" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        group
        h-screen sticky top-0
        ${collapsed ? "w-24" : "w-72"}
        transition-all duration-300
        bg-slate-900/70
        backdrop-blur-2xl
        border-r border-slate-700/70
        shadow-[0_0_35px_rgba(0,150,255,0.35)]
        flex flex-col
      `}
    >

      {/* ========= LOGO + TOGGLE ========= */}
      <div className="flex justify-between items-center px-5 py-6">
        {!collapsed && (
          <h1 className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
            River Monitor 🌊
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            p-2 rounded-xl border border-slate-600
            bg-slate-800/80 hover:bg-slate-700
            text-gray-300 hover:text-white
            transition shadow-lg shadow-blue-900/40
          "
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>


      {/* ========= MENU ========= */}
      <nav className="px-3 space-y-3">
        {links.map(link => {
          const active = pathname === link.path;

          return (
            <Link key={link.name} to={link.path}>
              <div
                className={`
                  flex items-center gap-3
                  p-3 rounded-xl cursor-pointer
                  font-semibold tracking-wide
                  border transition-all duration-300
                  relative overflow-hidden

                  ${active
                    ? "bg-blue-600/80 text-white border-blue-400 shadow-[0_0_15px_rgba(0,150,255,0.7)] scale-[1.03]"
                    : "bg-slate-800/60 text-gray-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:scale-[1.02]"
                  }
                `}
              >
                <span className="text-2xl">{link.icon}</span>

                {!collapsed && (
                  <span>{link.name}</span>
                )}

                {/* Neon Glow Pulse */}
                {active && (
                  <span className="absolute inset-0 rounded-xl animate-pulse opacity-30 bg-gradient-to-r from-blue-400 to-cyan-300"></span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>


      {/* ========= FOOTER ========= */}
      <div className="mt-auto pb-6 text-center">
        {!collapsed && (
          <p className="text-gray-400 text-sm opacity-70">
            Government Flood Monitoring
            <br />
            <span className="text-blue-400">Secure Panel • 2025</span>
          </p>
        )}
      </div>
    </aside>
  );
}
