import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

// Plays from frame 160–210 (white screen, logo draws letter by letter)

const MELODI = ['M','e','l','o','d','i'];
const KO     = ['k','o'];

// Duration of each letter's entrance animation (frames)
const LETTER_DUR = 14;
// Stagger between letters (frames)
const STAGGER    = 4;
// Gap between "Melodi" and "ko" (frames)
const KO_OFFSET  = MELODI.length * STAGGER + 6;

// Smooth playful overshoot curve — consistent across every letter
const ENTER_EASE = Easing.bezier(0.34, 1.56, 0.64, 1);

function letterProgress(localFrame: number, index: number, groupOffset = 0): number {
  const start = groupOffset + index * STAGGER;
  return interpolate(localFrame, [start, start + LETTER_DUR], [0, 1], {
    easing: ENTER_EASE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export const LogoDrawEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // White overlay fades in starting at frame 150
  const whiteOpacity = interpolate(frame, [150, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < 148) return null;

  const localFrame = frame - 160;

  // Tagline fades in at end
  const taglineOpacity = interpolate(frame, [200, 208], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shared letter style factory — drives translateY, scale, opacity from a single 0→1 progress
  const letterStyle = (p: number, color: string): React.CSSProperties => ({
    display: 'inline-block',
    color,
    opacity: interpolate(p, [0, 0.25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    transform: `translateY(${interpolate(p, [0, 1], [55, 0])}px) scale(${interpolate(p, [0, 1], [0.4, 1])}) rotate(${interpolate(p, [0, 1], [-12, 0])}deg)`,
    transformOrigin: 'center bottom',
    WebkitTextStroke: '6px white',
    paintOrder: 'stroke fill',
  } as React.CSSProperties);

  // Badge & tagline
  const badgeP = interpolate(frame, [190, 202], [0, 1], {
    easing: ENTER_EASE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* White background */}
      <AbsoluteFill style={{ background: 'white', opacity: whiteOpacity }} />

      {localFrame >= 0 && (
        <AbsoluteFill style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}>
          {/* Logo row */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline' }}>

            {/* "Melodi" in blue */}
            {MELODI.map((ch, i) => (
              <span
                key={i}
                style={{
                  ...letterStyle(letterProgress(localFrame, i), '#0094d2'),
                  fontSize: 130,
                  fontFamily: 'Nunito, Arial Rounded MT Bold, sans-serif',
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {ch}
              </span>
            ))}

            {/* "ko" in green */}
            {KO.map((ch, i) => (
              <span
                key={i}
                style={{
                  ...letterStyle(letterProgress(localFrame, i, KO_OFFSET), '#66b62f'),
                  fontSize: 130,
                  fontFamily: 'Nunito, Arial Rounded MT Bold, sans-serif',
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {ch}
              </span>
            ))}

          </div>

          {/* LEARNING APP badge */}
          <div style={{
            background: '#f6c300',
            borderRadius: 12,
            padding: '6px 22px',
            opacity: interpolate(badgeP, [0, 0.4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(badgeP, [0, 1], [0.6, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          }}>
            <span style={{
              fontFamily: 'Nunito, Arial Rounded MT Bold, sans-serif',
              fontWeight: 900,
              fontSize: 22,
              color: '#1a1a4e',
              letterSpacing: 2,
            }}>LEARNING APP</span>
          </div>

          {/* Tagline */}
          <div style={{ opacity: taglineOpacity }}>
            <span style={{
              fontFamily: 'Nunito, Arial Rounded MT Bold, sans-serif',
              fontWeight: 900,
              fontSize: 26,
              color: '#2d1b69',
              letterSpacing: 1.5,
            }}>🎹 PLAY, SING &amp; GROW 🌱</span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
