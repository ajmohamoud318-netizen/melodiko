import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const FPS = 30;

export const TextOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // Logo drops in from top
  const logoScale = spring({ frame, fps: FPS, config: { damping: 9, stiffness: 130, mass: 0.7 } });
  const logoY = interpolate(logoScale, [0, 1], [-120, 0]);

  // Subtitle slides up from below, delayed
  const subScale = spring({ frame: Math.max(0, frame - 18), fps: FPS, config: { damping: 10, stiffness: 150 } });
  const subY = interpolate(subScale, [0, 1], [60, 0]);
  const subOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtle wobble after settling
  const wobble = frame > 40 ? Math.sin(frame * 0.09) * 2.5 : 0;

  // Fade out before scene transition
  const fadeOut = interpolate(frame, [150, 170], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <g opacity={fadeOut}>
      {/* Logo banner */}
      <g transform={`translate(${width / 2}, ${92 + logoY + wobble})`}>
        {/* Banner background */}
        <rect x={-330} y={-46} width={660} height={90} rx={22}
          fill="white" opacity={0.92}
          style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.22))' }}
        />

        {/* Melodikoo SVG logo (inline, simplified for video) */}
        <svg x={-320} y={-36} width={640} height={72} viewBox="0 0 1100 300">
          <defs>
            <linearGradient id="vBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#0094d2"/>
              <stop offset="100%" stopColor="#00a9db"/>
            </linearGradient>
            <linearGradient id="vGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#8bcf38"/>
              <stop offset="100%" stopColor="#66b62f"/>
            </linearGradient>
          </defs>
          <g fontFamily="Nunito, Arial Rounded MT Bold, sans-serif" fontWeight="900" fontSize="120">
            <text x="140" y="200" stroke="white" strokeWidth="20" paintOrder="stroke" fill="url(#vBlue)">Melodi</text>
            <text x="535" y="200" stroke="white" strokeWidth="20" paintOrder="stroke" fill="url(#vGreen)">ko</text>
            <circle cx="515" cy="95" r="16" fill="#f6c300"/>
          </g>
        </svg>

        {/* LEARNING APP badge */}
        <rect x={170} y={28} width={148} height={28} rx={8} fill="#f6c300"/>
        <text textAnchor="middle" x={244} y={47}
          fontFamily="Nunito, Arial Rounded MT Bold, sans-serif"
          fontWeight="900" fontSize="15" fill="#1a1a4e">
          LEARNING APP
        </text>
      </g>

      {/* Subtitle */}
      <g transform={`translate(${width / 2}, ${198 + subY})`} opacity={subOpacity}>
        <rect x={-280} y={-28} width={560} height={56} rx={16}
          fill="#FF6B9D" opacity={0.93}
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}
        />
        <text textAnchor="middle" y={10}
          fontFamily="Nunito, Arial Rounded MT Bold, sans-serif"
          fontWeight="900" fontSize="26" fill="white"
          letterSpacing="1.5"
        >
          🐯 LEARN &amp; PLAY WITH THE TIGER 🐯
        </text>
      </g>
    </g>
  );
};
