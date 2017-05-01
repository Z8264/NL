/* eslint-disable*/

function draw(id, data) {
  const w = 300;
  const h = 150;
  const R = 140;
  const r = 130;
  const origin = [w / 2, h];
  let sAngel = 3 / 2 * Math.PI;
  let eAngel = sAngel;

  function evaluateXY(r, angel, origin) {
    return [origin[0] + Math.sin(angel) * r, origin[0] - Math.cos(angel) * r];
  }

  function createTag(tagName, attributes) {
    const tag = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    for (const attr in attributes) {
      tag.setAttribute(attr, attributes[attr]);
    }
    return tag;
  }

  const svg = createTag('svg', {
    viewBox: `0 0 ${w} ${h}`,
  });
  const element = document.getElementById(`#${id}`);
  (element && element.appendChild) ? element.appendChild(svg) : document.body.appendChild(svg);

  const total = data.reduce((v, item) => v + item.value, 0);

  if (total === 0) {
    eAngel = 1 / 2 * Math.PI;

    const P = [
      evaluateXY(r, sAngel, origin),
      evaluateXY(R, sAngel, origin),
      evaluateXY(R, eAngel, origin),
      evaluateXY(r, eAngel, origin),
    ];

    const flag = '1';

    const path = createTag('path', {
      fill: '#f2f2f2',
      stroke: 'black',
      'stroke-width': '0',
      d: `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} z`,
    });

    svg.appendChild(path);
    return;
  }

  for (const item of data) {
    eAngel = sAngel + item.value / total * Math.PI;

    const P = [
      evaluateXY(r, sAngel, origin),
      evaluateXY(R, sAngel, origin),
      evaluateXY(R, eAngel, origin),
      evaluateXY(r, eAngel, origin),
    ];

    const flag = (eAngel - sAngel) > Math.PI ? '1' : '0';

    const path = createTag('path', {
      fill: item.color,
      stroke: 'black',
      'stroke-width': '1',
      d: `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${R} ${R} 0 ${flag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${r} ${r}  0 ${flag} 0 ${P[0][0]} ${P[0][1]} z`,
    });

    svg.appendChild(path);

    sAngel = eAngel;
  }
}

export default draw;



// const data = [
//   {
//     value: 20,
//     color: '#ff0',
//   },
//   {
//     value: 100,
//     color: '#08c',
//   },
//   {
//     value: 100,
//     color: '#f60',
//   },
//   {
//     value: 70,
//     color: '#d00',
//   },
// ];
// const a = _.get(data, '[1]', {});
// console.log(a);
// draw('wrapper', data);