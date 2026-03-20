import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { role: "User" };

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className="
      flex justify-between items-center 
      px-8 py-5
      relative z-[1000]

      /* Futuristic Background */
      bg-gradient-to-r from-blue-900/60 via-slate-900/40 to-purple-900/60
      backdrop-blur-2xl

      /* Glass + Neon Border */
      border border-white/20
      rounded-3xl

      /* Glow */
      shadow-[0_0_35px_rgba(0,150,255,0.4)]
      "
    >

      {/* LEFT TITLE */}
      <h2 className="text-2xl font-extrabold tracking-widest text-white">
        GOV • RIVER AI MONITORING PANEL
      </h2>

      {/* RIGHT PROFILE PANEL */}
      <div className="relative">

        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
          px-6 py-2.5
          rounded-2xl
          border border-blue-500/40
          text-white
          font-semibold
          tracking-wide
          flex items-center gap-2

          bg-gradient-to-r from-slate-900 to-slate-800
          hover:from-blue-800 hover:to-purple-800
          transition-all duration-300

          shadow-[0_0_25px_rgba(0,100,255,0.4)]
          hover:shadow-[0_0_45px_rgba(0,150,255,0.8)]
        "
        >
          <span className="text-cyan-300">
            {user.role === "admin" ? "ADMIN PANEL" : "USER PANEL"}
          </span>

          <span className="text-blue-400 animate-pulse">
            ⧫
          </span>
        </button>

        {/* DROPDOWN MENU */}
        {open && (
          <div
            className="
            absolute right-0 mt-4 w-64

            /* Hyper Glass */
            bg-slate-900/95
            backdrop-blur-3xl
            border border-blue-500/30
            rounded-3xl

            /* Neon Glow */
            shadow-[0_0_40px_rgba(0,120,255,0.6)]

            p-3
            z-[9999]

            animate-[fadeIn_0.3s_ease-in-out]
          "
          >

            <div className="px-3 py-2 text-sm text-blue-300 border-b border-slate-700 mb-2">
              Logged in as:
              <span className="text-white font-bold"> {user.role}</span>
            </div>

            <button
              onClick={() => alert(`Profile of ${user.role}`)}
              className="
              block w-full text-left
              px-3 py-2
              text-gray-300
              hover:bg-blue-800/40
              hover:text-white
              rounded-xl
              transition
            "
            >
              View Profile ⚡
            </button>

            <button
              onClick={() => alert('Settings Coming Soon')}
              className="
              block w-full text-left
              px-3 py-2
              text-gray-300
              hover:bg-purple-800/40
              hover:text-white
              rounded-xl
              transition
            "
            >
              System Settings ⚙️
            </button>

            <button
              onClick={logout}
              className="
              block w-full text-left
              px-3 py-2
              text-red-400
              hover:bg-red-700/40
              hover:text-white
              rounded-xl
              transition
            "
            >
              Logout 🚪
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
