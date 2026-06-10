import React from 'react';
import { useCurrentFrame, interpolate, Easing, spring } from 'remotion';

// Appears at frame 80, lives until ~130
const FPS = 30;

export const StarEffect: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();

  const localFrame = frame - 80;
  if (localFrame < 0 || localFrame > 50) return null;

  const scale = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 7, stiffness: 200, mass: 0.6 },
  });

  const opacity = interpolate(localFrame, [0, 5, 38, 50], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rise = interpolate(localFrame, [0, 50], [0, -60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const rotate = interpolate(localFrame, [0, 50], [0, 30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Burst particles
  const particles = [0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
    const dist = interpolate(localFrame, [0, 30], [0, 55], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    });
    const pOpacity = interpolate(localFrame, [0, 10, 30], [0, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const px = x + Math.cos(angle * Math.PI / 180) * dist;
    const py = y + Math.sin(angle * Math.PI / 180) * dist;
    return { px, py, pOpacity, angle };
  });

  return (
    <g opacity={opacity}>
      {/* Burst particles */}
      {particles.map(({ px, py, pOpacity, angle }) => (
        <circle key={angle} cx={px} cy={py} r={6}
          fill={['#FFD700','#FF6B9D','#00E5FF','#76FF03'][Math.floor(angle / 90)]}
          opacity={pOpacity}/>
      ))}

      {/* Main star */}
      <g transform={`translate(${x}, ${y + rise}) scale(${scale}) rotate(${rotate})`}>
        {/* Glow */}
        <circle cx={0} cy={0} r={55} fill="#FFD700" opacity={0.22}/>
        {/* Star shape */}
        <polygon
          points={Array.from({ length: 10 }, (_, i) => {
            const angle = (i * 36 - 90) * Math.PI / 180;
            const r = i % 2 === 0 ? 44 : 20;
            return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
          }).join(' ')}
          fill="#FFD700"
          stroke="#FF8C00"
          strokeWidth="3"
        />
        {/* Shine */}
        <circle cx={-10} cy={-14} r={8} fill="white" opacity={0.5}/>

        {/* "★" text inside */}
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="22"
          fontWeight="900"
          fill="#FF6600"
          fontFamily="Arial Rounded MT Bold, sans-serif"
        >★</text>
      </g>

      {/* Sparkle lines */}
      {[30, 80, 130, 190, 250, 310].map((angle, i) => {
        const len = interpolate(localFrame, [0, 15, 35], [0, 28, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <line
            key={i}
            x1={x + Math.cos(angle * Math.PI/180) * 50}
            y1={y + rise + Math.sin(angle * Math.PI/180) * 50}
            x2={x + Math.cos(angle * Math.PI/180) * (50 + len)}
            y2={y + rise + Math.sin(angle * Math.PI/180) * (50 + len)}
            stroke="#FFD700" strokeWidth="4" strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};
