function MathBackground() {
  return (
    <div className="math-background" aria-hidden="true">
      <svg
        className="math-grid"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="coordinate-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>

        <rect width="1440" height="900" fill="url(#coordinate-grid)" />

        <g className="math-curves" fill="none" stroke="currentColor">
          <path d="M 0 580 Q 360 -80 720 580 T 1440 580" strokeWidth="2" />
          <path
            d="M 0 180 C 300 950 600 -600 900 180 S 1300 950 1440 300"
            strokeWidth="1.5"
          />
          <path d="M 0 700 Q 720 -500 1440 700" strokeWidth="1.5" />
        </g>
      </svg>

      <span className="math-symbol symbol-one">f(x) = ax² + bx + c</span>
      <span className="math-symbol symbol-two">∫ f(x) dx</span>
      <span className="math-symbol symbol-three">y = eˣ</span>
      <span className="math-symbol symbol-four">∑ xᵢ</span>
      <span className="math-symbol symbol-five">Δy / Δx</span>
      <span className="math-symbol symbol-six">x³ − 3x</span>
      <span className="math-symbol symbol-seven">lim x → ∞</span>
    </div>
  );
}
export default MathBackground;
