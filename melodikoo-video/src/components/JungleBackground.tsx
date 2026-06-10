import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

const Palm: React.FC<{ x: number; scale?: number; flip?: boolean }> = ({ x, scale = 1, flip = false }) => (
  <g transform={`translate(${x}, 0) scale(${flip ? -scale : scale}, ${scale})`}>
    {/* Trunk */}
    <path d="M0 540 Q-12 440 8 340 Q20 240 0 140" stroke="#7B4F2E" strokeWidth="28" fill="none" strokeLinecap="round"/>
    {/* Fronds */}
    {[[-30, -20], [20, -35], [-60, -10], [50, -15], [-10, -50], [35, -55], [-45, -45]].map(([rx, ry], i) => (
      <path
        key={i}
        d={`M0 140 Q${rx * 1.8} ${140 + ry * 1.5} ${rx * 3.2} ${140 + ry * 3}`}
        stroke="#2E8B57"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
    ))}
    {/* Coconuts */}
    <circle cx="-14" cy="148" r="12" fill="#8B6914"/>
    <circle cx="10"  cy="155" r="11" fill="#7B5F10"/>
  </g>
);

const Bush: React.FC<{ x: number; y: number; r?: number; color?: string }> = ({
  x, y, r = 55, color = '#228B22',
}) => (
  <g>
    <ellipse cx={x}      cy={y}      rx={r}      ry={r * 0.65} fill={color}/>
    <ellipse cx={x - 38} cy={y + 8}  rx={r * 0.7} ry={r * 0.5}  fill={color}/>
    <ellipse cx={x + 40} cy={y + 6}  rx={r * 0.75} ry={r * 0.52} fill={color}/>
    <ellipse cx={x}      cy={y - 18} rx={r * 0.55} ry={r * 0.4}  fill="#27AE60"/>
  </g>
);

const Flower: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g>
    {[0,60,120,180,240,300].map(a => (
      <ellipse
        key={a}
        cx={x + Math.cos(a * Math.PI / 180) * 9}
        cy={y + Math.sin(a * Math.PI / 180) * 9}
        rx={6} ry={4}
        fill={color}
        transform={`rotate(${a} ${x + Math.cos(a * Math.PI / 180) * 9} ${y + Math.sin(a * Math.PI / 180) * 9})`}
      />
    ))}
    <circle cx={x} cy={y} r={6} fill="#FFD700"/>
  </g>
);

export const JungleBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle sway on leaves
  const sway = Math.sin(frame * 0.04) * 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#87CEEB"/>
          <stop offset="100%" stopColor="#B5E8F7"/>
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4CAF50"/>
          <stop offset="100%" stopColor="#2E7D32"/>
        </linearGradient>
        <radialGradient id="sunGrad" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#FFF9C4"/>
          <stop offset="100%" stopColor="#FFD54F"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width={width} height={height} fill="url(#skyGrad)"/>

      {/* Sun */}
      <circle cx={width * 0.85} cy={110} r={70} fill="url(#sunGrad)" opacity={0.9}/>
      {/* Sun rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <line
          key={a}
          x1={width * 0.85 + Math.cos(a * Math.PI/180) * 76}
          y1={110         + Math.sin(a * Math.PI/180) * 76}
          x2={width * 0.85 + Math.cos(a * Math.PI/180) * (96 + Math.sin((frame * 0.05 + a) * 0.5) * 8)}
          y2={110         + Math.sin(a * Math.PI/180) * (96 + Math.sin((frame * 0.05 + a) * 0.5) * 8)}
          stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" opacity={0.7}
        />
      ))}

      {/* Clouds */}
      {[
        { cx: 200, cy: 80,  r: 45 },
        { cx: 260, cy: 65,  r: 55 },
        { cx: 320, cy: 80,  r: 40 },
        { cx: 700, cy: 100, r: 38 },
        { cx: 755, cy: 88,  r: 48 },
        { cx: 810, cy: 102, r: 35 },
      ].map((c, i) => (
        <ellipse key={i} cx={c.cx + sway * (i % 2 === 0 ? 1 : -1)} cy={c.cy} rx={c.r} ry={c.r * 0.6} fill="white" opacity={0.88}/>
      ))}

      {/* Ground */}
      <rect y={height * 0.62} width={width} height={height * 0.38} fill="url(#groundGrad)"/>
      {/* Ground highlight stripe */}
      <ellipse cx={width/2} cy={height * 0.62} rx={width * 0.6} ry={18} fill="#66BB6A" opacity={0.5}/>

      {/* Back palms */}
      <g transform={`rotate(${sway * 0.4}, 160, 540)`}>
        <Palm x={160} scale={0.75}/>
      </g>
      <g transform={`rotate(${-sway * 0.3}, 1010, 540)`}>
        <Palm x={1010} scale={0.8} flip/>
      </g>

      {/* Back bushes */}
      <Bush x={80}  y={height * 0.64} r={60} color="#1B5E20"/>
      <Bush x={300} y={height * 0.66} r={45} color="#2E7D32"/>
      <Bush x={900} y={height * 0.65} r={55} color="#1B5E20"/>
      <Bush x={1100} y={height * 0.64} r={50} color="#2E7D32"/>

      {/* Front palms */}
      <g transform={`rotate(${sway * 0.5}, 20, 720)`}>
        <Palm x={20}   scale={1.1}/>
      </g>
      <g transform={`rotate(${-sway * 0.5}, 1160, 720)`}>
        <Palm x={1160} scale={1.05} flip/>
      </g>

      {/* Front bushes */}
      <Bush x={0}    y={height * 0.75} r={80} color="#388E3C"/>
      <Bush x={200}  y={height * 0.78} r={65} color="#43A047"/>
      <Bush x={980}  y={height * 0.76} r={70} color="#388E3C"/>
      <Bush x={1160} y={height * 0.77} r={75} color="#43A047"/>

      {/* Flowers */}
      <Flower x={140} y={height * 0.76} color="#FF6B9D"/>
      <Flower x={230} y={height * 0.79} color="#FFD700"/>
      <Flower x={960} y={height * 0.77} color="#FF6B9D"/>
      <Flower x={1050} y={height * 0.78} color="#FF9800"/>

      {/* Grass blades at bottom */}
      {Array.from({ length: 28 }, (_, i) => {
        const gx = (width / 28) * i + 18;
        const tilt = Math.sin(frame * 0.06 + i * 0.7) * 6;
        return (
          <path
            key={i}
            d={`M${gx} ${height} Q${gx + tilt} ${height - 35} ${gx + tilt * 1.5} ${height - 55}`}
            stroke="#4CAF50" strokeWidth="4" fill="none" strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
