import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { JungleBackground } from './components/JungleBackground';
import { Tiger } from './components/Tiger';
import { TextOverlay } from './components/TextOverlay';
import { StarEffect } from './components/StarEffect';
import { LogoDrawEnding } from './components/LogoDrawEnding';

// Total: 210 frames @ 30fps = 7 seconds
// 0–50:   Tiger walks in
// 50–80:  Idle
// 80–130: Tap + star
// 130–160: Idle happy
// 160–210: White screen + logo draw

export const MelodikoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Tap cursor appears at frame 78
  const tapOpacity = interpolate(frame, [78, 82, 108, 115], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tapScale = interpolate(frame, [80, 85, 108, 115], [1.4, 0.85, 0.85, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tiger center position (approx)
  const tigerCX = width / 2 - 0;
  const tigerCY = height * 0.58 - 30;

  return (
    <AbsoluteFill style={{ backgroundColor: '#87CEEB' }}>
      {/* Scene as one big SVG */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', inset: 0 }}>

        {/* Jungle */}
        <JungleBackground />

        {/* Tiger */}
        <Tiger />

        {/* Star effect on tap */}
        <StarEffect x={tigerCX - 20} y={tigerCY - 140} />

        {/* Tap cursor ripple */}
        <g opacity={tapOpacity} transform={`translate(${tigerCX + 30}, ${tigerCY - 60})`}>
          <circle r={28 * tapScale} fill="rgba(255,255,255,0.35)" stroke="white" strokeWidth="3"/>
          <circle r={14 * tapScale} fill="rgba(255,255,255,0.55)"/>
          {/* Hand cursor emoji area */}
          <text textAnchor="middle" dominantBaseline="central"
            fontSize="32" y={2}>👆</text>
        </g>

        {/* Text overlay */}
        <TextOverlay />

      </svg>

      {/* White ending + letter-by-letter logo — HTML layer on top */}
      <LogoDrawEnding />
    </AbsoluteFill>
  );
};
