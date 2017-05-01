<template>
  <div id="wrapper"></div>
</template>

<script>

import annulus from './annulus';

function evaluateXY(r, angel, rx, ry) {
  return [
    (rx + Math.sin(angel) * r).toFixed(2),
    (ry - Math.cos(angel) * r).toFixed(2),
  ];
}
export default {
  mounted() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 300 300');
    const dom = document.getElementById('wrapper');
    dom.appendChild(svg);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', '#ddd');
    // path.setAttribute('stroke-width', '2');
    // path.setAttribute('stroke-linejoin', 'round');
    // path.setAttribute('stroke', '#333');
    svg.appendChild(path);

    const rx = 150;
    const ry = 150;

    const r = 100;
    const R = 120;
    const start = 0.35 * 2 * Math.PI;
    const end = 0.25 * 2 * Math.PI;

    const P = [
      evaluateXY(r, start, rx, ry),
      evaluateXY(R, start, rx, ry),
      evaluateXY(R, end, rx, ry),
      evaluateXY(r, end, rx, ry),
    ];
    const flag = end - start > Math.PI ? '1' : '0';
    path.setAttribute(
      'd',
      `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} z`,
    );

    path.setAttribute(
      'd',
      `M 50 50 A 25 25 0 1 1 100 50 A 25 25 1 1 1 50 50 
      M 60 50 A 15 15 0 1 1 90 50 A 15 15 1 1 1 60 50 Z`,
    );
    path.setAttribute(
      'd',
      annulus({
        rx, ry, R, r, start, end,
      }),
    );
    path.setAttribute('fill-rule', 'evenodd');
  },
};
</script>

<style>
svg{
  border:1px solid #ddd;
}
</style>
