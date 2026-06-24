"use client";

/**
 * Full-page space background: deep-space tint, a deterministic twinkling
 * starfield, occasional shooting stars, and a space shuttle that flies across
 * the screen trailing smoke. Sits behind all content, ignores pointer events,
 * and dials itself down on the light theme so text stays readable.
 */

// Deterministic PRNG so server-rendered and client markup match (no hydration
// mismatch) — same stars every render.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240701);
const STARS = Array.from({ length: 140 }, () => {
  const r = rand();
  return {
    x: rand() * 100,
    y: rand() * 100,
    size: r < 0.85 ? 1 + rand() * 1.4 : 2.2 + rand() * 1.6, // a few bigger
    delay: rand() * 6,
    dur: 2.4 + rand() * 4,
    op: 0.35 + rand() * 0.65,
  };
});

export default function SpaceBackground() {
  return (
    <div className="space-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* deep-space tint (strong on dark, faint on light) */}
      <div className="space-tint absolute inset-0" />

      {/* stars */}
      <div className="space-stars absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              ["--op" as string]: s.op,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* planets — distant worlds drifting in deep space */}
      <div className="planets absolute inset-0">
        {/* ringed gas giant, top-right */}
        <div className="planet planet-saturn">
          <span className="planet-ring" />
          <span className="planet-body" />
        </div>
        {/* warm ember world, bottom-left */}
        <div className="planet planet-ember">
          <span className="planet-body" />
        </div>
        {/* small blue world, mid-right */}
        <div className="planet planet-blue">
          <span className="planet-body" />
        </div>
        {/* tiny far moon */}
        <div className="planet planet-moon">
          <span className="planet-body" />
        </div>
      </div>

      {/* shooting stars */}
      <span className="shooting s1" />
      <span className="shooting s2" />
      <span className="shooting s3" />

      {/* space shuttle with smoke trail */}
      <div className="shuttle">
        <div className="plume" />
        <span className="puff puff1" />
        <span className="puff puff2" />
        <span className="puff puff3" />
        <span className="puff puff4" />
        <div className="flame" />
        <svg className="rocket" viewBox="0 0 60 96" xmlns="http://www.w3.org/2000/svg">
          {/* fins */}
          <path d="M18 60 L8 78 L18 72 Z" fill="#c0392b" />
          <path d="M42 60 L52 78 L42 72 Z" fill="#c0392b" />
          {/* body */}
          <path
            d="M30 4 C42 16 44 34 44 50 L44 66 C44 70 40 73 30 73 C20 73 16 70 16 66 L16 50 C16 34 18 16 30 4 Z"
            fill="#e9edf5"
          />
          {/* nose */}
          <path d="M30 4 C36 11 40 20 41 28 L19 28 C20 20 24 11 30 4 Z" fill="#e0473a" />
          {/* window */}
          <circle cx="30" cy="38" r="7" fill="#2b86d6" stroke="#1b5fa6" strokeWidth="2.5" />
          {/* fuselage shade */}
          <path d="M44 50 L44 66 C44 70 40 73 30 73 L30 28 C36 32 41 40 44 50 Z" fill="#000" opacity="0.06" />
          {/* engine ring */}
          <rect x="18" y="69" width="24" height="6" rx="3" fill="#9aa3b2" />
        </svg>
      </div>

      <style jsx>{`
        .space-tint {
          background: radial-gradient(
              130% 110% at 50% -10%,
              rgba(36, 24, 92, 0.55) 0%,
              rgba(8, 6, 24, 0.7) 45%,
              rgba(2, 2, 10, 0.92) 100%
            );
          opacity: 0.9;
        }
        :global([data-theme="light"]) .space-tint {
          background: radial-gradient(
            130% 110% at 50% -10%,
            rgba(120, 110, 200, 0.1) 0%,
            rgba(180, 180, 220, 0.06) 60%,
            transparent 100%
          );
          opacity: 1;
        }

        .star {
          position: absolute;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          opacity: var(--op);
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: opacity, transform;
        }
        :global([data-theme="light"]) .space-stars {
          opacity: 0.35;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: calc(var(--op) * 0.25);
            transform: scale(0.8);
          }
          50% {
            opacity: var(--op);
            transform: scale(1.15);
          }
        }

        /* planets */
        .planet {
          position: absolute;
          will-change: transform;
        }
        .planet-body {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;
          z-index: 2;
        }
        :global([data-theme="light"]) .planets {
          opacity: 0.5;
        }

        /* ringed gas giant — top-right */
        .planet-saturn {
          width: 210px;
          height: 210px;
          top: -3%;
          right: -3%;
          animation: planet-float 22s ease-in-out infinite;
        }
        .planet-saturn .planet-body {
          background: radial-gradient(
            circle at 34% 30%,
            #cabdff 0%,
            #8b6ef5 38%,
            #4727b8 72%,
            #1d1350 100%
          );
          box-shadow: inset -22px -16px 48px rgba(0, 0, 0, 0.55),
            inset 8px 6px 26px rgba(202, 189, 255, 0.35),
            0 0 70px rgba(124, 92, 252, 0.45);
        }
        .planet-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 360px;
          height: 132px;
          transform: translate(-50%, -50%) rotate(-24deg);
          border-radius: 50%;
          border: 14px solid rgba(199, 187, 255, 0.45);
          box-shadow: 0 0 24px rgba(124, 92, 252, 0.3);
          z-index: 1;
        }

        /* warm ember world — bottom-left */
        .planet-ember {
          width: 120px;
          height: 120px;
          bottom: 6%;
          left: -3%;
          animation: planet-float 18s ease-in-out infinite;
          animation-delay: -5s;
        }
        .planet-ember .planet-body {
          background: radial-gradient(
            circle at 34% 30%,
            #ffe3cc 0%,
            #ff8f33 42%,
            #b34e05 76%,
            #4a1f02 100%
          );
          box-shadow: inset -14px -10px 30px rgba(0, 0, 0, 0.5),
            inset 6px 4px 18px rgba(255, 227, 204, 0.35),
            0 0 56px rgba(255, 122, 26, 0.4);
        }

        /* small blue world — mid-right */
        .planet-blue {
          width: 76px;
          height: 76px;
          top: 46%;
          right: 5%;
          animation: planet-float 26s ease-in-out infinite;
          animation-delay: -11s;
        }
        .planet-blue .planet-body {
          background: radial-gradient(
            circle at 34% 30%,
            #dbe9ff 0%,
            #6fa0e0 44%,
            #2f568f 80%,
            #122747 100%
          );
          box-shadow: inset -10px -7px 22px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(90, 140, 210, 0.35);
        }

        /* tiny far moon */
        .planet-moon {
          width: 30px;
          height: 30px;
          top: 22%;
          left: 16%;
          opacity: 0.7;
          animation: planet-float 20s ease-in-out infinite;
          animation-delay: -8s;
        }
        .planet-moon .planet-body {
          background: radial-gradient(
            circle at 36% 32%,
            #f2f2fa 0%,
            #b9b9cf 50%,
            #6b6b86 100%
          );
          box-shadow: inset -5px -4px 12px rgba(0, 0, 0, 0.5),
            0 0 18px rgba(220, 220, 240, 0.3);
        }

        @keyframes planet-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-22px);
          }
        }

        /* keep planets clear of text on small screens */
        @media (max-width: 640px) {
          .planets {
            opacity: 0.55;
          }
          .planet-saturn {
            width: 150px;
            height: 150px;
          }
          .planet-ring {
            width: 250px;
            height: 92px;
            border-width: 10px;
          }
          .planet-ember {
            width: 84px;
            height: 84px;
          }
          .planet-blue {
            width: 54px;
            height: 54px;
          }
        }

        /* shooting stars */
        .shooting {
          position: absolute;
          width: 120px;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0)
          );
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(183, 164, 255, 0.9));
          opacity: 0;
          transform: rotate(18deg);
          animation: shoot 7s linear infinite;
        }
        .s1 {
          top: 12%;
          left: -10%;
          animation-delay: 1.5s;
        }
        .s2 {
          top: 32%;
          left: -10%;
          animation-delay: 4.5s;
          animation-duration: 9s;
        }
        .s3 {
          top: 6%;
          left: -10%;
          animation-delay: 8s;
          animation-duration: 11s;
        }
        :global([data-theme="light"]) .shooting {
          opacity: 0;
          filter: drop-shadow(0 0 6px rgba(109, 77, 242, 0.5));
        }
        @keyframes shoot {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(18deg);
          }
          6% {
            opacity: 1;
          }
          18% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: translate(120vw, 40vh) rotate(18deg);
          }
        }

        /* shuttle */
        .shuttle {
          position: absolute;
          left: 0;
          top: 0;
          width: 60px;
          height: 240px;
          transform-origin: 50% 30%;
          animation: fly 19s linear infinite;
          animation-delay: -3s;
        }
        .rocket {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 96px;
          filter: drop-shadow(0 0 14px rgba(183, 164, 255, 0.45));
        }
        .flame {
          position: absolute;
          top: 86px;
          left: 50%;
          width: 16px;
          height: 30px;
          transform: translateX(-50%);
          background: radial-gradient(
            50% 60% at 50% 25%,
            #fff 0%,
            #ffd56b 35%,
            #ff7a1a 70%,
            transparent 100%
          );
          border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
          filter: blur(0.5px);
          animation: flicker 0.18s ease-in-out infinite alternate;
        }
        @keyframes flicker {
          from {
            transform: translateX(-50%) scaleY(0.85);
            opacity: 0.85;
          }
          to {
            transform: translateX(-50%) scaleY(1.15);
            opacity: 1;
          }
        }
        .plume {
          position: absolute;
          top: 96px;
          left: 50%;
          width: 34px;
          height: 150px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            rgba(208, 205, 230, 0.22) 35%,
            rgba(180, 180, 210, 0.08) 65%,
            transparent 100%
          );
          border-radius: 50%;
          filter: blur(9px);
        }
        .puff {
          position: absolute;
          left: 50%;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.55),
            rgba(210, 210, 230, 0)
          );
          filter: blur(2px);
          transform: translateX(-50%);
          animation: puff 1.8s ease-out infinite;
        }
        .puff1 {
          top: 104px;
          animation-delay: 0s;
        }
        .puff2 {
          top: 128px;
          animation-delay: 0.45s;
        }
        .puff3 {
          top: 156px;
          animation-delay: 0.9s;
        }
        .puff4 {
          top: 188px;
          animation-delay: 1.35s;
        }
        @keyframes puff {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          30% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(1.7);
          }
        }
        :global([data-theme="light"]) .plume,
        :global([data-theme="light"]) .puff {
          opacity: 0.5;
        }

        @keyframes fly {
          0% {
            transform: translate(-14vw, 110vh) rotate(45deg) scale(0.8);
            opacity: 0;
          }
          7% {
            opacity: 1;
          }
          93% {
            opacity: 1;
          }
          100% {
            transform: translate(112vw, -22vh) rotate(45deg) scale(1.08);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .star,
          .flame,
          .puff,
          .planet {
            animation: none;
          }
          .shuttle,
          .shooting {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
