const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.09),transparent_55%)]" />
      <div className="absolute -left-40 top-[18%] h-[30rem] w-[30rem] animate-pulse-slow rounded-full bg-violet/[0.09] blur-[130px]" />
      <div
        className="absolute -right-44 top-[48%] h-[34rem] w-[34rem] animate-pulse-slow rounded-full bg-cyan/[0.06] blur-[150px]"
        style={{ animationDelay: "2.4s" }}
      />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-soft-light"
        style={{ backgroundImage: noiseTexture }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />
    </div>
  );
}
