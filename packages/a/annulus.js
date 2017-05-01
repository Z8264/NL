const point = (rx, ry, r, angel) => [
  (rx + Math.sin(angel) * r).toFixed(2),
  (ry - Math.cos(angel) * r).toFixed(2),
];

const full = (rx, ry, R, r) => {
  if (r === 0) {
    return `M ${rx - R} ${ry} A ${R} ${R} 0 1 1 ${rx + R} ${ry} A ${R} ${R} 1 1 1 ${rx - R} ${ry} Z`;
  }
  return `M ${rx - R} ${ry} A ${R} ${R} 0 1 1 ${rx + R} ${ry} A ${R} ${R} 1 1 1 ${rx - R} ${ry} 
  M ${rx - r} ${ry} A ${r} ${r} 0 1 1 ${rx + r} ${ry} A ${r} ${r} 1 1 1 ${rx - r} ${ry} Z`;
};

const part = (rx, ry, R, r, start, end) => {
  const P = [
    point(rx, ry, r, start),
    point(rx, ry, R, start),
    point(rx, ry, R, end),
    point(rx, ry, r, end),
  ];
  const flag = end - start > Math.PI ? '1' : '0';
  return `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} z`;
};

const annulus = (opts = {}) => {
  const rx = opts.rx || 0;
  const ry = opts.ry || rx;
  const r1 = opts.R || 0;
  const r2 = opts.r || 0;
  const [R, r] = [Math.max(r1, r2), Math.min(r1, r2)];
  let { start, end } = opts;

  if (R <= 0) return '';

  if (Number.isNaN(start) || Number.isNaN(end)) return full(rx, ry, R, r);

  if (start === end) return '';

  start = (start / (2 * Math.PI)) % 1;
  end = (end / (2 * Math.PI)) % 1;
  if (start - end < 0.000001) return '';
  if (start > end) end += 1;
  return part(rx, ry, R, r, start * 2 * Math.PI, end * 2 * Math.PI);
};

export default annulus;
