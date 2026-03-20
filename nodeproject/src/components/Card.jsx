export default function Card({ title, value, color }) {

  const colorClasses = {
    blue: {
      box: "from-blue-800/30 to-blue-500/10 border-blue-500/40 shadow-blue-900/40",
      text: "text-blue-400",
      glow: "bg-blue-500/30",
    },
    red: {
      box: "from-red-800/30 to-red-500/10 border-red-500/40 shadow-red-900/40",
      text: "text-red-400",
      glow: "bg-red-500/30",
    },
    green: {
      box: "from-green-800/30 to-green-500/10 border-green-500/40 shadow-green-900/40",
      text: "text-green-400",
      glow: "bg-green-500/30",
    }
  };

  const theme = colorClasses[color] || colorClasses.blue;

  const icon =
    color === "red"
      ? "🚨"
      : color === "green"
      ? "🌿"
      : "🌊";


  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br
        ${theme.box}
        rounded-2xl
        p-7
        border
        backdrop-blur-2xl
        shadow-xl
        
        hover:shadow-2xl
        hover:scale-[1.05]
        hover:-rotate-[0.3deg]

        transition-all duration-500 ease-out
      `}
    >

      {/* Aura Glow Animation */}
      <div className={`absolute inset-0 blur-2xl opacity-40 ${theme.glow} animate-pulse`} />

      {/* Light Scan Line */}
      <div className="absolute -top-10 left-0 w-full h-10 bg-white/10 blur-xl animate-[scan_5s_linear_infinite]" />

      {/* Shine Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shine_6s_infinite]" />

      
      <div className="flex justify-between items-center relative z-10">
        
        <div>
          <p className="text-gray-300 text-sm tracking-wider uppercase">
            {title}
          </p>

          <h2
            className={`mt-2 text-5xl font-extrabold drop-shadow-lg tracking-wide ${theme.text}`}
          >
            {value}
          </h2>
        </div>

        <div className="text-6xl opacity-90 drop-shadow-xl">
          {icon}
        </div>

      </div>
    </div>
  );
}
