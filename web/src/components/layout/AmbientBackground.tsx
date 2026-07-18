export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute left-[20%] top-[8%] h-[500px] w-[500px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(217,58,47,0.15), transparent 70%)" }}
      />
      <div
        className="absolute right-[10%] top-[35%] h-[400px] w-[400px] rounded-full opacity-20 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(217,58,47,0.1), transparent 70%)" }}
      />
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cream/20"
          style={{
            left: `${4 + ((i * 5.8) % 92)}%`,
            top: `${6 + ((i * 9.3) % 88)}%`,
            animation: `float ${5 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}
