# annulus



``` js
annulus({rx, ry, R, r, start, end});
```

```
```

参数：

| arguments | type   | default | description                     |
| --------- | ------ | ------- | ------------------------------- |
| rx        | Number | 0       | 圆心x轴坐标                     |
| ry        | Number | rx      | 圆心y轴坐标                   |
| R         | Number | 0       | 环外半径                        |
| r         | Number | 0       | 环内半径                        |
| start     | Number | -       | 环的起点角度，`0`～`2*Math.PI`  |
| end       | Number | -       | 环的终点角度， `0`～`2*Math.PI` |

起点和终点的角度: 12点钟方向只为 `0`，3点钟方向为 `0.5*Math.PI`，6点钟方向为`Math.PI`，9点钟方向为`1.5*Math.PI`。由于`2*Math.PI`是一个循环，所以， `3*Math.PI`、`5*Math.PI` 均代表6点钟方向。

