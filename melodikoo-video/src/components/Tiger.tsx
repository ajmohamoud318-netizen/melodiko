import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from 'remotion';

// FPS is 30. Timeline:
//   0–50:  Tiger walks in from right
//  50–80:  Tiger settles + idle bob
//  80–110: Tap reaction (jump + star appears outside this component)
// 110–160: Idle + happy tail wag
// 160–210: Fade out / scene transition

const FPS = 30;

interface TigerProps {
  onTap?: boolean; // whether tap has happened (frame >= 80)
}

export const Tiger: React.FC<TigerProps> = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // ── Walk-in position ────────────────────────────────────────────────────────
  const walkProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const tigerX = interpolate(walkProgress, [0, 1], [width + 200, width / 2 - 80]);

  // ── Settle bounce when tiger stops ─────────────────────────────────────────
  const settleY = spring({
    frame: Math.max(0, frame - 48),
    fps: FPS,
    config: { damping: 8, stiffness: 120, mass: 0.8 },
  });
  const bounceOffset = frame >= 48 ? interpolate(settleY, [0, 1], [0, -18]) : 0;

  // ── Idle bob (continuous after walk) ───────────────────────────────────────
  const idleBob = frame >= 55 ? Math.sin((frame - 55) * 0.12) * 5 : 0;

  // ── Tap reaction ───────────────────────────────────────────────────────────
  const tapJump = frame >= 80 && frame <= 110
    ? interpolate(frame, [80, 88, 100, 110], [0, -45, -20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.quad),
      })
    : 0;

  // ── Tail wag ───────────────────────────────────────────────────────────────
  const tailWag = Math.sin(frame * 0.18) * 22;

  // ── Walking leg animation ──────────────────────────────────────────────────
  const isWalking = frame < 52;
  const walkCycle = (frame * 18) % 360;
  const legSwing = isWalking ? Math.sin(walkCycle * Math.PI / 180) * 20 : 0;

  // ── Body squash on landing ─────────────────────────────────────────────────
  const squashY = frame >= 48 && frame <= 60
    ? interpolate(frame, [48, 52, 58, 60], [1, 1.18, 0.92, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  const squashX = frame >= 48 && frame <= 60
    ? interpolate(frame, [48, 52, 58, 60], [1, 0.88, 1.04, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const totalY = height * 0.58 + bounceOffset + idleBob + tapJump;

  return (
    <g transform={`translate(${tigerX}, ${totalY})`}>

      {/* Shadow */}
      <ellipse cx={80} cy={210} rx={90 * squashX} ry={14} fill="rgba(0,0,0,0.18)"/>

      {/* Tail */}
      <path
        d={`M60 160 Q${100 + tailWag} ${120 + Math.sin(frame*0.18)*8} ${90 + tailWag * 0.6} 80`}
        stroke="#F4833D" strokeWidth="16" fill="none" strokeLinecap="round"
      />
      {/* Tail tip */}
      <circle cx={90 + tailWag * 0.6} cy={80} r={12} fill="#FF6B00"/>

      {/* Back legs */}
      <g transform={`translate(30, 150) rotate(${-legSwing * 0.6})`}>
        <rect x={-10} y={0} width={20} height={55} rx={10} fill="#E8701A"/>
        <ellipse cx={0} cy={58} rx={15} ry={9} fill="#CC5500"/>
      </g>
      <g transform={`translate(60, 150) rotate(${legSwing * 0.6})`}>
        <rect x={-10} y={0} width={20} height={55} rx={10} fill="#E8701A"/>
        <ellipse cx={0} cy={58} rx={15} ry={9} fill="#CC5500"/>
      </g>

      {/* Body */}
      <ellipse
        cx={80} cy={130}
        rx={85 * squashX} ry={70 * squashY}
        fill="#F4833D"
      />

      {/* Body stripes */}
      {[
        'M 30 90 Q 25 130 28 160',
        'M 55 78 Q 50 120 52 158',
        'M 110 80 Q 115 120 112 158',
        'M 130 90 Q 138 130 134 160',
      ].map((d, i) => (
        <path key={i} d={d} stroke="#2C1810" strokeWidth="9" fill="none" strokeLinecap="round" opacity={0.7}/>
      ))}

      {/* Belly */}
      <ellipse cx={80} cy={140} rx={48} ry={40} fill="#FDDBA6"/>

      {/* Front legs */}
      <g transform={`translate(30, 160) rotate(${legSwing})`}>
        <rect x={-11} y={0} width={22} height={52} rx={11} fill="#F4833D"/>
        <ellipse cx={0} cy={55} rx={16} ry={9} fill="#CC5500"/>
        {/* Claws */}
        {[-6, 0, 6].map(cx => (
          <line key={cx} x1={cx} y1={58} x2={cx - 2} y2={65} stroke="#1A0A00" strokeWidth="2.5" strokeLinecap="round"/>
        ))}
      </g>
      <g transform={`translate(118, 160) rotate(${-legSwing})`}>
        <rect x={-11} y={0} width={22} height={52} rx={11} fill="#F4833D"/>
        <ellipse cx={0} cy={55} rx={16} ry={9} fill="#CC5500"/>
        {[-6, 0, 6].map(cx => (
          <line key={cx} x1={cx} y1={58} x2={cx - 2} y2={65} stroke="#1A0A00" strokeWidth="2.5" strokeLinecap="round"/>
        ))}
      </g>

      {/* Neck */}
      <ellipse cx={80} cy={68} rx={36} ry={28} fill="#F4833D"/>

      {/* Head */}
      <ellipse cx={80} cy={28} rx={58} ry={52} fill="#F4833D"/>

      {/* Head stripes */}
      <path d="M 42 -10 Q 44 10 43 25" stroke="#2C1810" strokeWidth="7" fill="none" strokeLinecap="round" opacity={0.65}/>
      <path d="M 118 -10 Q 116 10 117 25" stroke="#2C1810" strokeWidth="7" fill="none" strokeLinecap="round" opacity={0.65}/>
      <path d="M 68 -20 Q 70 -5 70 10" stroke="#2C1810" strokeWidth="6" fill="none" strokeLinecap="round" opacity={0.6}/>
      <path d="M 92 -20 Q 90 -5 90 10" stroke="#2C1810" strokeWidth="6" fill="none" strokeLinecap="round" opacity={0.6}/>

      {/* Ears */}
      <polygon points="30,-18 10,-55 55,-30" fill="#F4833D"/>
      <polygon points="34,-20 18,-50 52,-30" fill="#FFAAAA"/>
      <polygon points="130,-18 150,-55 105,-30" fill="#F4833D"/>
      <polygon points="126,-20 142,-50 108,-30" fill="#FFAAAA"/>

      {/* Face — muzzle */}
      <ellipse cx={80} cy={45} rx={34} ry={26} fill="#FDDBA6"/>

      {/* Nose */}
      <ellipse cx={80} cy={36} rx={10} ry={7} fill="#E75480"/>
      <path d="M80 43 Q70 50 65 52" stroke="#2C1810" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M80 43 Q90 50 95 52" stroke="#2C1810" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Whiskers */}
      {[
        [28, 44, 58, 46], [24, 50, 56, 50], [28, 56, 58, 54],
        [132, 44, 102, 46], [136, 50, 104, 50], [132, 56, 102, 54],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#2C1810" strokeWidth="2" opacity={0.5}/>
      ))}

      {/* Eyes — large, expressive, blue */}
      <ellipse cx={58} cy={14} rx={18} ry={20} fill="white"/>
      <ellipse cx={102} cy={14} rx={18} ry={20} fill="white"/>
      {/* Irises */}
      <ellipse cx={60} cy={16} rx={13} ry={14} fill="#4FC3F7"/>
      <ellipse cx={100} cy={16} rx={13} ry={14} fill="#4FC3F7"/>
      {/* Pupils */}
      <ellipse cx={61} cy={17} rx={8}  ry={9}  fill="#1A237E"/>
      <ellipse cx={101} cy={17} rx={8} ry={9}  fill="#1A237E"/>
      {/* Eye shine */}
      <circle cx={66} cy={11} r={4} fill="white"/>
      <circle cx={106} cy={11} r={4} fill="white"/>
      <circle cx={57} cy={20} r={2} fill="white" opacity={0.6}/>
      <circle cx={97} cy={20} r={2} fill="white" opacity={0.6}/>

      {/* Happy mouth (bigger smile after tap) */}
      {frame >= 88 ? (
        <path d="M60 58 Q80 78 100 58" stroke="#2C1810" strokeWidth="4" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M62 58 Q80 70 98 58" stroke="#2C1810" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      )}

      {/* Blush cheeks */}
      <ellipse cx={36} cy={40} rx={14} ry={9} fill="#FF8FAB" opacity={0.45}/>
      <ellipse cx={124} cy={40} rx={14} ry={9} fill="#FF8FAB" opacity={0.45}/>

      {/* Brow wiggle when happy */}
      {frame >= 88 && (
        <>
          <path d="M44 -5 Q58 -15 68 -4" stroke="#2C1810" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M92 -5 Q102 -15 116 -4" stroke="#2C1810" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </>
      )}
    </g>
  );
};
