export default function StatusBadge({ level }) {

  let status = "Safe";
  let styles = {
    wrap: "bg-green-500/20 text-green-400 border-green-400/40 shadow-green-900/40",
    icon: "🟢",
    glow: "shadow-[0_0_25px_rgba(34,197,94,0.6)]"
  };

  if (level > 120) {
    status = "Danger";
    styles = {
      wrap: "bg-red-500/25 text-red-400 border-red-500/50 shadow-red-900/50",
      icon: "🚨",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.7)] animate-pulse"
    };
  }
  else if (level > 80) {
    status = "Warning";
    styles = {
      wrap: "bg-yellow-400/25 text-yellow-300 border-yellow-400/50 shadow-yellow-900/40",
      icon: "⚠️",
      glow: "shadow-[0_0_25px_rgba(250,204,21,0.6)]"
    };
  }

  return (
    <span
      className={`
        relative overflow-hidden
        px-5 py-1.5
        rounded-full
        border
        font-bold
        text-sm
        tracking-wider
        backdrop-blur-xl
        inline-flex
        items-center
        gap-2
        transition-all
        duration-300
        hover:scale-[1.06]
        hover:-translate-y-[1px]
        ${styles.wrap}
        ${styles.glow}
      `}
    >

      {/* Soft Aura Layer */}
      <span className="absolute inset-0 blur-xl opacity-30"></span>

      {/* Shimmer Line */}
      <span className="absolute -left-10 top-0 w-10 h-full bg-white/20 rotate-12 animate-slide" />

      <span className="text-lg">{styles.icon}</span>

      {status}
    </span>
  );
}
