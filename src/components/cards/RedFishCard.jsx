import { useState, useRef } from 'react'

/* Red fish card — click to flip + swim away, then expand. */
export function RedFishCard({ onSelect, onSwimStart, disabled, style }) {
  const [swimming, setSwimming] = useState(false)
  const btnRef = useRef(null)

  const handleClick = () => {
    if (swimming || disabled) return
    setSwimming(true)
    onSwimStart?.()
    onSelect(btnRef.current?.getBoundingClientRect()) // ripple fires immediately
  }

  const cls = ['song-card red-fish-card', swimming ? 'is-swimming' : ''].filter(Boolean).join(' ')

  return (
    <button
      ref={btnRef}
      className={cls}
      style={{ ...style, ...(swimming ? { position: 'relative', zIndex: 600 } : {}) }}
      onClick={handleClick}
    >
      <div className="song-card-art" style={{ position: 'relative' }}>
        <img src="/story-cards/kirmizi-balik.svg" alt="Kırmızı Balık" className="song-card-img story-img story-img-bg" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="440 255 170 145"
        className="red-fish-svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, opacity: swimming ? 1 : 0 }}
      >
        <defs>
          <style>{`
            .rf-body   { fill: #ed1c24; }
            .rf-body-s { fill: #ed1c24; stroke: #ed1c24; stroke-width:.2px; stroke-miterlimit:10; }
            .rf-dark   { fill: #b51f32; }
            .rf-mid    { fill: #be1e2d; }
            .rf-white  { fill: #fff; }
            .rf-black  { fill: #231f20; }
            .rf-dp     { fill: #491318; }
            .rf-dk     { fill: #381317; }
            .rf-pink   { fill: #f3716d; }
            .rf-lt     { fill: #f05965; }
            .rf-stroke { stroke-miterlimit:10; }

            /* flip then swim away */
            .red-fish-svg {
              transform-origin: center;
              overflow: visible;
            }
            /* Hide label when swimming */
            .red-fish-card.is-swimming .song-card-label {
              opacity: 0;
            }

            /* Let the fish escape the card bounds when swimming */
            .red-fish-card.is-swimming {
              overflow: visible;
              z-index: 600;
              background: transparent !important;
              box-shadow: none !important;
              border: none !important;
            }
            .red-fish-card.is-swimming .song-card-art {
              overflow: visible;
            }

            /* Wink on front eye before the flip — origin anchored to eye centre */
            .is-swimming .fish-eye-front {
              transform-origin: 516px 321px;
              animation: rfWink 0.48s ease-in-out forwards;
            }
            @keyframes rfWink {
              0%   { transform: scaleY(1); }
              40%  { transform: scaleY(0); }
              80%  { transform: scaleY(1); }
              100% { transform: scaleY(1); }
            }

            .is-swimming .red-fish-svg {
              animation: rfSwimAway 3.2s linear forwards;
            }
            @keyframes rfSwimAway {
              0%   { transform: translateX(0%)   translateY(0px)   scaleX(1);  opacity: 1; }
              14%  { transform: translateX(0%)   translateY(0px)   scaleX(1);  opacity: 1; }
              15%  { transform: translateX(0%)   translateY(0px)   scaleX(-1); opacity: 1; }
              30%  { transform: translateX(90%)  translateY(-7px)  scaleX(-1); opacity: 1; }
              50%  { transform: translateX(240%) translateY(6px)   scaleX(-1); opacity: 1; }
              68%  { transform: translateX(390%) translateY(-5px)  scaleX(-1); opacity: 1; }
              85%  { transform: translateX(520%) translateY(3px)   scaleX(-1); opacity: 0.7; }
              100% { transform: translateX(620%) translateY(0px)   scaleX(-1); opacity: 0; }
            }

          `}</style>
        </defs>

        {/* ── entire fish body bounces ── */}
        <g className="fish-body">

          {/* tail fins */}
          <g className="fish-tail">
            <g>
              <path className="rf-body" d="M459.3,331.1s-8.9,3-8.2,13,2.2,6.4,5.3,7.6c2.8,1.1,6.9,1.3,12.4-2,0,0-8.4-7.6-9.5-18.6Z"/>
              <path className="rf-mid"  d="M460.7,337.4c-3.2,2.3-6.6,4-9.7,6.7,1.7-3.7,5.8-5.9,9.7-6.7h0Z"/>
              <path className="rf-mid"  d="M464.8,345c-1.7,3.3-5.5,7-9.6,6.1,3.8-1,6.4-3.9,9.6-6.1h0Z"/>
              <path className="rf-mid"  d="M462.2,340.8c-1.9,3.1-6.2,7.5-10.1,6.9,4-1.4,6.6-4.7,10.1-6.9h0Z"/>
            </g>
            <g>
              <path className="rf-body" d="M504.7,364.9s10.5,15.3,5.2,18.2c-5.9,3.2-20.4-6.7-19.1-19.2,0,0,6.2,2,13.9,1Z"/>
              <path className="rf-mid"  d="M509.2,376.2c-5.3-1.7-11.2-6-11.3-12,1.9,5.5,6.8,8.7,11.3,12h0Z"/>
              <path className="rf-mid"  d="M493,364.4c2.3,6.3,6.9,11.4,12.6,15,.8.5,1.7,1,2.5,1.5-.9-.3-1.9-.6-2.8-1-6.2-2.7-11.5-8.6-12.3-15.5h0Z"/>
            </g>
          </g>

          {/* back tail fin */}
          <g>
            <path className="rf-body rf-stroke" d="M558.5,349.1s0,12.3,3,18.6c.6,1.1-.2,2.5-1.5,2.5-4.8.2-14.3-.7-17.9-10.7,0,0,7.4-3.5,9.1-11.3,0,0,4,.7,7.2.9Z"/>
            <path className="rf-dark" d="M558.5,349.1c.4,5.6.9,11.2,2.7,16.5.3.9.9,1.8,1,2.8.1,1.2-.9,2.4-2.2,2.5-8,.5-15.7-3-18.4-11.1l.4-.2c4.4-2.3,8-6.3,9.2-11.2,2.4.5,4.9.9,7.3,1.2h0Z"/>
            <path className="rf-body rf-stroke" d="M558.2,367.4s-9.4-.7-14.1-9.6"/>
            <path className="rf-dark" d="M558.2,367.4c-5.9-.3-11.6-4.1-14.1-9.6,3.1,5,8.3,8.5,14.1,9.6h0Z"/>
            <path className="rf-body rf-stroke" d="M559.2,364.9s-10.5-3.6-13.2-7.9"/>
            <path className="rf-dark" d="M559.2,364.9c-4.8-1.5-10.4-3.6-13.2-7.9,3.5,3.9,8.6,5.7,13.2,7.9h0Z"/>
          </g>

          {/* top fin */}
          <g>
            <path className="rf-body" d="M560,322.5s13.4-29.7,38.7-27c0,0-4.6,4.7-5.1,12.3-.5,7.6,3.1,12.5-6.6,22.3,0,0-7.5,5.7-4.3,11.3s4.6,7.4,4.5,15.4c-.1,8,4.5,15.8,4.5,15.8,0,0-23.4,3.1-31.8-28.6v-21.6Z"/>
            <path className="rf-body rf-stroke" d="M588.1,299.1s-16.9,6-25.1,28.4"/>
            <path className="rf-dark" d="M588.1,299.1c-9.3,4.8-16.7,12.9-21.8,21.9-1.2,2-2.3,4.4-3.3,6.5,3.6-12.4,12.6-24.1,25.1-28.4h0Z"/>
            <path className="rf-body rf-stroke" d="M593.1,302.7s-10.6,3.9-27.6,26"/>
            <path className="rf-dark" d="M593.1,302.7c-10.8,6.5-19.2,16.9-27.6,26,6.7-9.8,16.5-21.4,27.6-26h0Z"/>
            <path className="rf-body rf-stroke" d="M592.2,309.9s-15.6,21-28.2,21.2"/>
            <path className="rf-dark" d="M592.2,309.9c-5.7,8.6-17.1,21.4-28.2,21.2,10.7-1.5,21-13.6,28.2-21.2h0Z"/>
            <path className="rf-body rf-stroke" d="M590.4,324s-11.6,14.8-27.4,10"/>
            <path className="rf-dark" d="M590.4,324c-5.8,8.5-17.4,14.1-27.4,10,1.3.1,2.5.5,3.8.5,9,.7,17.3-4.3,23.6-10.5h0Z"/>
            <path className="rf-body rf-stroke" d="M563,335.9s13.1,4.5,22.3,26.3"/>
            <path className="rf-dark" d="M563,335.9c9.9,3.6,16.6,12.9,20.8,22.2.5,1.4,1.1,2.8,1.6,4.1-.7-1.3-1.4-2.6-2.1-3.9-5-8.7-11.2-17.5-20.2-22.4h0Z"/>
            <path className="rf-body rf-stroke" d="M587.3,371s-15.3-9.8-24.9-34.1"/>
            <path className="rf-dark" d="M587.3,371c-12.1-7.8-20.3-20.7-24.9-34.1.8,1.6,1.6,3.2,2.4,4.8,5.7,11,12.9,21.4,22.5,29.3h0Z"/>
          </g>

          {/* head fin */}
          <g>
            <path className="rf-body" d="M499.9,279.3s9.5-18.8,28.4-22c0,0,5.9-1.6,8.8,8.8,2.3,8.4,12.5,16.2,16.3,18.9.7.5,1.5.9,2.2,1.4,3,1.6,12.7,8.6-.8,24.2l-55-31.2Z"/>
            <path className="rf-mid" d="M544.5,304.5c4.2-4.6,10.6-7.9,16.8-6.1-1.5-.3-3.1-.4-4.6-.2-4.5.7-8.4,3.6-11.2,7,0,0-1-.8-1-.8h0Z"/>
            <path className="rf-mid" d="M560,290.5c-8.6-1-17.3,3.4-22.1,10.5,0,0-1-.7-1-.7,5.3-7,14.3-11.2,23.1-9.7h0Z"/>
            <path className="rf-mid" d="M551.4,283.5c-8.7.3-16.9,5.5-20.4,13.5,0,0-1.1-.5-1.1-.5,3.9-8,12.6-13.1,21.5-13h0Z"/>
            <path className="rf-mid" d="M543.1,275.9c-9.2,1.2-17.7,7.1-21.7,15.6,0,0-1.1-.6-1.1-.6,4.4-8.4,13.3-14.2,22.8-15h0Z"/>
            <path className="rf-mid" d="M537.4,267.1c-9.4,1.7-17.2,8.4-22.3,16.3-.7,1.1-1.3,2.3-2,3.5l-1.1-.6c5.4-9.4,14.3-17.6,25.4-19.2h0Z"/>
            <path className="rf-mid" d="M532.3,258.1c-11.4,4.5-20.9,13.7-25.6,25,0,0-1.1-.5-1.1-.5,5.2-11.3,15-20.3,26.8-24.5h0Z"/>
          </g>

          {/* main body */}
          <path className="rf-body" d="M552.3,303.5s6.5,14.7,10.8,18.2c4.9,3.9,7.1,21.5-6,29.9,0,0-18.5,22.2-52.8,17.7-29.6-3.9-41-22.4-41-22.4,0,0-11.2-14.8-3.4-25.2,1.8-2.4,3-5.1,3.6-8,2.3-10.5,10.9-33.6,41.6-35.5,0,0,34.2-2.7,47.3,25.3Z"/>
          <path className="rf-white" d="M563,345.8c2,1.8-3.5,4.2-6.1,5.9,0,0-18.5,22.2-52.8,17.7-29.6-3.9-41-22.4-41-22.4,0,0-8.4-11.1-5.6-20.9,0,0,.9,2.3,9.3,1.9,8.4-.4,11.6,1.8,15.4,6.8,3.8,4.9,14.2,6.5,18.9-1.5,0,0,3.3-3.6,22.4-.4,19.2,3.2,34.1,8.2,39.5,13Z"/>

          {/* bottom fin */}
          <g>
            <path className="rf-body rf-stroke" d="M521.6,361.9c.8,0,1.6.4,2.2,1,.6.6,1.9,1.3,4.3,1.3,3.9,0,11,1.1,15.3,13.3,4.3,12.1-16.3,3.1-16.3,3.1,0,0-7.8-3.5-10.2-13.3-.7-2.9,1.6-5.7,4.6-5.4Z"/>
            <path className="rf-dark" d="M521.6,361.9c1.7,0,2.6,1.8,4.3,2,1.6.4,3.2,0,4.8.4,3.2.4,6.2,2.2,8.4,4.6,3.5,4,10.2,15.7.3,15.5-3.4-.1-6.5-1.1-9.5-2.2-3.1-1-5.9-2.9-8.1-5.3-2.2-2.4-3.7-5.3-4.6-8.4-.5-1.5-.6-3.3.3-4.6.9-1.3,2.6-2.1,4.2-1.9h0Z"/>
            <path className="rf-body rf-stroke" d="M540,374.5s-13.4-4.4-17.7-9.7"/>
            <path className="rf-dark" d="M540,374.5c-3.4-.6-6.6-1.8-9.7-3.3-3-1.6-6.1-3.4-8-6.3,5.3,4.3,11.7,6.5,17.7,9.7h0Z"/>
            <path className="rf-body rf-stroke" d="M519.8,364.9s4.7,11.5,20.7,16.6"/>
            <path className="rf-dark" d="M519.8,364.9c4.1,6.7,10.6,11.7,17.6,15.1,1,.5,2.1.9,3.1,1.5-8.9-1.9-17.4-7.9-20.7-16.6h0Z"/>
          </g>

          {/* mouth */}
          <path className="rf-dk"   d="M501.4,332.8s-3.7,3.5-8.7,1.4-1.3-.7-1.8-1.2-2.5-1.6-5.3-.7c-4,1.3-5.9.4-6.7-3.1,0,0-1.4,1.4,1.1,4.2,0,0,0,10.7,7.8,12.4s6.6-.5,8.9-2.8c1.6-1.7,3.4-4.3,4.8-8.5,0,0,1.1-.1,2.2,1.3,0,0,.2-2.8-2.9-4.3,0,0,.6.8.7,1.4Z"/>
          <path className="rf-dp"   d="M489.9,344.5c1.8,0,3.6-.7,4.9-2s3.1-3.4,4.5-6.8c-1,.4-2.1.6-3.4.6h0c-1.3,0-2.5-.3-3.8-.8-.9-.4-1.7-1-2.2-1.4-.4-.3-1.1-.7-2.2-.7s-1.1,0-1.7.3c-1.3.4-2.5.6-3.4.6s-.8,0-1.1,0c.2,2.6,1.5,10.3,8.5,10.3Z"/>
          <path className="rf-body-s" d="M484.7,342.5c1.2,1.2,2.9,2,5.2,2s0,0,0,0c1.8,0,3.6-.7,4.9-2s1.8-1.8,2.7-3.3c-4.6-1.1-8.9-.4-12.9,3.3Z"/>
          <path className="rf-body rf-stroke" d="M483.7,348.4s1.8,3.5,5.9,2.8"/>
          <path className="rf-dark" d="M483.7,348.4c1.9,1.5,3.5,2.3,5.9,2.8-2.2,1.5-5.6-.2-5.9-2.8h0Z"/>
          <path className="rf-mid"  d="M492.1,325.7c-3.4-1-6.5-2-9.8-.5,2.3-3.2,7.5-2.2,9.8.5h0Z"/>

          {/* cheeks */}
          <ellipse className="rf-pink" cx="522.3" cy="335.9" rx="5.6" ry="2.9"/>
          <ellipse className="rf-pink" cx="463.4" cy="330.3" rx="2.1" ry="4" transform="translate(84.2 754.7) rotate(-83.7)"/>

          {/* back eye */}
          <ellipse className="rf-body" cx="472.7" cy="316" rx="8.9" ry="10.8"/>
          <ellipse className="rf-black" cx="472.7" cy="316" rx="8.9" ry="10.8"/>
          <ellipse className="rf-white" cx="473"   cy="316.8" rx="8.2" ry="9.8"/>
          <ellipse className="rf-black" cx="474.4" cy="317.3" rx="6.8" ry="9"/>
          <circle  className="rf-white" cx="476.4" cy="313.8" r="2.3"/>
          <ellipse className="rf-mid"   cx="476.4" cy="298.8" rx="2.8" ry="1.4" transform="translate(-41.7 80.1) rotate(-9.2)"/>

          {/* ── front eye — animates wink ── */}
          <g className="fish-eye-front">
            <circle  className="rf-black" cx="516.1" cy="320.5" r="11.9"/>
            <ellipse className="rf-white" cx="515.5" cy="321.1" rx="10.9" ry="11.2"/>
            <ellipse className="rf-black" cx="517.3" cy="321.1" rx="9.2"  ry="10.6"/>
            <circle  className="rf-white" cx="519.8" cy="317.4" r="2.9"/>
            <ellipse className="rf-mid"   cx="519.7" cy="301.7" rx="1.7"  ry="3.5" transform="translate(59.9 688.7) rotate(-70.2)"/>
          </g>

          {/* scale dots */}
          <g>
            <ellipse className="rf-lt" cx="559.9" cy="328.2" rx="1.7" ry="2.4" transform="translate(-36.1 71.2) rotate(-7.1)"/>
            <ellipse className="rf-lt" cx="552.8" cy="330.3" rx="1.7" ry="2.4"/>
            <ellipse className="rf-lt" cx="555.9" cy="321.1" rx="1.7" ry="2.4" transform="translate(-78.2 221.1) rotate(-21)"/>
            <ellipse className="rf-lt" cx="546.7" cy="324"   rx="1.7" ry="2.4" transform="translate(-56.5 124.1) rotate(-12.3)"/>
            <ellipse className="rf-lt" cx="550"   cy="317.1" rx="1.7" ry="2.4" transform="translate(-77.2 218.7) rotate(-21)"/>
            <ellipse className="rf-lt" cx="543.9" cy="315.5" rx="1.7" ry="2.4" transform="translate(-77 216.4) rotate(-21)"/>
            <ellipse className="rf-lt" cx="551.7" cy="311"   rx="1.7" ry="2.4" transform="translate(-81.3 289.1) rotate(-27.4)"/>
            <ellipse className="rf-lt" cx="540.4" cy="304.4" rx="1.7" ry="2.4" transform="translate(-79.5 283.2) rotate(-27.4)"/>
            <ellipse className="rf-lt" cx="545.7" cy="302.4" rx="1.7" ry="2.4" transform="translate(-78 285.4) rotate(-27.4)"/>
            <ellipse className="rf-lt" cx="536.3" cy="294.5" rx="1.7" ry="2.8" transform="translate(-62.4 420.8) rotate(-40.7)"/>
            <ellipse className="rf-lt" cx="526.4" cy="289.3" rx="1.7" ry="3"   transform="translate(-6.9 565.6) rotate(-56.2)"/>
          </g>

          {/* side fin */}
          <g>
            <path className="rf-body" d="M542.1,337.3s15.5-5.9,24.6,6.5c9.1,12.4.6,14.2.6,14.2,0,0-22.3,10.8-29.2-11.7,0,0,2.4-2.3,4-9Z"/>
            <path className="rf-mid"  d="M542.7,340c7-1.2,15.7-.9,21.3,4-6.4-3.4-14.2-3.4-21.3-4h0Z"/>
            <path className="rf-mid"  d="M568.4,352c-8-4.1-16.3-7.2-24.9-9.7,8.9.8,17.8,4.1,24.9,9.7h0Z"/>
            <path className="rf-mid"  d="M542.7,344.8c7.6,4.6,15.5,8.7,24.3,10.6-9,0-17.7-4.6-24.3-10.6h0Z"/>
            <path className="rf-mid"  d="M540.5,346c3.6,5.3,8.4,9.5,14.3,11.9-6.5-.7-12.3-5.7-14.3-11.9h0Z"/>
          </g>

          <path className="rf-mid" d="M536.5,309.9s15.4,28.8-6,42.3c0,0,13.8-2.9,13.4-21.2,0,0,.5-13.1-7.4-21.2Z"/>
          <path className="rf-dp"  d="M492.4,338.1c-.8.5-1.7,1.2-1.9,2.2,0,.3,0,.7,0,1-.3-.6-.3-1.5,0-2.1.3-.7.8-1.3,1.4-1.8,0,0,.5.7.5.7h0Z"/>
        </g>
      </svg>
      </div>
      <span className="song-card-label">Kırmızı Balık</span>
    </button>
  )
}
