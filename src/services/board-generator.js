const settings = {
  x:0,
  y:250,
  spread: 70,
  radius: 50,
  baseAngle: 30,
  viewBoxOffset: 40
};

function rotatePoints(collection, angle) {
  const rotationFunction = {
    270: p => ({x: -p.y, y: p.x}), // -90
    90: p => ({x: p.y, y: -p.x}),
    180: p => ({x: -p.x, y: -p.y}),
    sym90: p => ({x: p.y, y: p.x}) // 90 rotation + symmetry on x axis
  }[angle];

  return collection
    .map(tile =>
      Object.assign({}, tile, {
        innerStart: rotationFunction(tile.innerStart),
        innerEnd: rotationFunction(tile.innerEnd),
        outerStart: rotationFunction(tile.outerStart),
        outerEnd: rotationFunction(tile.outerEnd),
      })
    );
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: Math.round(centerX + (radius * Math.cos(angleInRadians))),
    y: Math.round(centerY + (radius * Math.sin(angleInRadians)))
  };
}

function getRandomColorClass (previous, max) {
  const current = 'fill' + Math.round(Math.random() * max);
  return current !== previous ? current : getRandomColorClass(previous, max);
}

function tileCoordinates(tile){
  return Object.assign({}, tile, {
    innerStart: polarToCartesian(tile.x, tile.y, settings.radius, tile.endAngle),
    innerEnd: polarToCartesian(tile.x, tile.y, settings.radius, tile.startAngle),
    outerStart: polarToCartesian(tile.x, tile.y, settings.radius + settings.spread, tile.endAngle),
    outerEnd: polarToCartesian(tile.x, tile.y, settings.radius + settings.spread, tile.startAngle)
  });
}

function generateTiles(n, settings) {
  const seed = tileCoordinates({
    x: settings.x,
    y: settings.y,
    startAngle: -settings.baseAngle,
    endAngle: 0,
    inverted: false,
    className: 'fill1'
  });

  let paths = [];
  nextTile(seed);

  function nextTile(previousTile) {
    const otherCenter = polarToCartesian(
      previousTile.x,
      previousTile.y,
      2 * settings.radius + settings.spread,
      previousTile.inverted ? previousTile.startAngle : previousTile.endAngle
    );

    // generate the 2 options
    const options = [
      tileCoordinates({
        x: previousTile.x,
        y: previousTile.y,
        startAngle: previousTile.inverted ? previousTile.startAngle - settings.baseAngle : previousTile.endAngle,
        endAngle: previousTile.inverted ? previousTile.startAngle : previousTile.endAngle + settings.baseAngle,
        inverted: previousTile.inverted
      }),
      tileCoordinates({
        x: otherCenter.x,
        y: otherCenter.y,
        startAngle: previousTile.startAngle + 180,
        endAngle: previousTile.endAngle + 180,
        inverted: !previousTile.inverted
      })
    ];

    // remove an option if it's gonna lead to making more than 180 turn on path
    if(paths.length >= 5) {
      const pathInverted = paths
        .slice(paths.length - 5)
        .map(p => p.inverted)
        .some((p, i, ar) => p !== ar[0]);

      if(!pathInverted) {
        options.shift();
      }
    }

    // pick on of 2 options
    const tile = options[Math.floor(Math.random() * options.length)];

    tile.className = getRandomColorClass(previousTile.className, 4);

    paths.push(tile);
    n--;
    n ? nextTile(tile) : null;
  }

  // rotate the whole board if the general direction is not top-left --> bottom-right
  const pStart = paths[0];
  const pEnd = paths[paths.length - 1];

  const start = {
    x: pStart.outerEnd.x,
    y: pStart.outerEnd.y
  };

  const end = {
    x: pEnd.outerEnd.x,
    y: pEnd.outerEnd.y
  };

  const startCorner = (start.y < end.y ? 't' : 'b') + (start.x > end.x ? 'r' : 'l');
  switch (startCorner) {
    case 'tr':
      paths = rotatePoints(paths, 90);
      break;

    case 'br':
      paths = rotatePoints(paths, 180);
      break;

    case 'bl':
      paths = rotatePoints(paths, 270);
      break;
  }

  // check aspect ratio and rotate again if it's too vertical
  const ar = getViewBox(paths)[2] / getViewBox(paths)[3];

  if(ar < 0.5) {
    paths = rotatePoints(paths, 'sym90').map(p => ({...p, sweepFlag: '1'}));
  }

  // generate svg markup and add color class
  paths
    .forEach(tile => {
      tile.sweepFlag = tile.sweepFlag || '0';
      const sweepFlag2 = tile.sweepFlag === '1' ? '0' : '1';

      tile.d = [
        'M', tile.outerStart.x, tile.outerStart.y,
        'A', settings.radius + settings.spread, settings.radius + settings.spread, 0, 0, tile.sweepFlag, tile.outerEnd.x, tile.outerEnd.y,
        'L', tile.innerEnd.x, tile.innerEnd.y,
        'A', settings.radius, settings.radius, 0, 0, sweepFlag2, tile.innerStart.x, tile.innerStart.y,
        'L', tile.outerStart.x, tile.outerStart.y, 'Z'
      ].join(' ');
    });


  return paths;
}

function getViewBox(tiles, offset = 0) {
  const minMax = tiles
    .reduce((bundle, p) => {
      return {
        xMin: Math.min(bundle.xMin || Infinity, p.innerEnd.x, p.innerStart.x, p.outerEnd.x, p.outerStart.x),
        xMax: Math.max(bundle.xMax || -Infinity, p.innerEnd.x, p.innerStart.x, p.outerEnd.x, p.outerStart.x),
        yMin: Math.min(bundle.yMin || Infinity, p.innerEnd.y, p.innerStart.y, p.outerEnd.y, p.outerStart.y),
        yMax: Math.max(bundle.yMax || -Infinity, p.innerEnd.y, p.innerStart.y, p.outerEnd.y, p.outerStart.y)
      };
    });

  return [
    minMax.xMin - offset,
    minMax.yMin - offset,
    minMax.xMax - minMax.xMin + 2*offset,
    minMax.yMax - minMax.yMin + 2*offset
  ];
}

export default function getBoard(n) {
  const tiles = generateTiles(n, settings);
  const viewBox = getViewBox(tiles, settings.viewBoxOffset).join(' ');

  return {tiles, viewBox};
}
