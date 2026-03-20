import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div
      className="
        flex 
        min-h-screen 
        text-white
        
        /* Futuristic Galactic Background */
        bg-gradient-to-br
        from-[#020617]
        via-[#020617]
        to-black
        relative
        overflow-hidden
      "
    >

      {/* Futuristic Floating Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-700/10 blur-[120px] top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-700/10 blur-[140px] bottom-10 right-10"></div>
        <div className="absolute w-72 h-72 bg-cyan-600/10 blur-[120px] bottom-20 left-1/3"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Navbar */}
        <div className="p-4">
          <Navbar />
        </div>

        {/* Page Content Wrapper */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">

          <div
            className="
              bg-slate-900/70
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-6

              /* Neon Ring Shadow */
              shadow-[0_0_40px_rgba(0,204,255,0.2)]

              /* Smooth Entry Animation */
              animate-[fadeIn_0.6s_ease-out]

              relative
              overflow-hidden
            "
          >
            {/* Inner Hologram Glow Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
