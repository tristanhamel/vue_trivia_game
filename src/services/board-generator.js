const settings = {
  x:0,
  y:250,
  spread: 70,
  radius: 50,
  baseAngle: 30
};

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

function describeTile(x, y, radius, spread, startAngle, endAngle, inverted, className){
  const tile = {
    x,
    y,
    startAngle,
    endAngle,
    innerStart: polarToCartesian(x, y, radius, endAngle),
    innerEnd: polarToCartesian(x, y, radius, startAngle),
    outerStart: polarToCartesian(x, y, radius + spread, endAngle),
    outerEnd: polarToCartesian(x, y, radius + spread, startAngle),
    largeArcFlag: endAngle - startAngle <= 180 ? '0' : '1',
    inverted,
    className
  };

  tile.d = [
    'M', tile.outerStart.x, tile.outerStart.y,
    'A', radius + spread, radius + spread, 0, tile.largeArcFlag, 0, tile.outerEnd.x, tile.outerEnd.y,
    'L', tile.innerEnd.x, tile.innerEnd.y,
    'A', radius, radius, 0, tile.largeArcFlag, 1, tile.innerStart.x, tile.innerStart.y,
    'L', tile.outerStart.x, tile.outerStart.y, 'Z'
  ].join(' ');

  return tile;
}

function generateTiles(n, settings) {
  const seed = describeTile(
    settings.x,
    settings.y,
    settings.radius,
    settings.spread,
    -settings.baseAngle,
    0,
    false,
    'fill1'
  );

  const paths = [];
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
      describeTile(
        previousTile.x,
        previousTile.y,
        settings.radius,
        settings.spread,
        previousTile.inverted ? previousTile.startAngle - settings.baseAngle : previousTile.endAngle,
        previousTile.inverted ? previousTile.startAngle : previousTile.endAngle + settings.baseAngle,
        previousTile.inverted,
        getRandomColorClass(previousTile.className, 4)
      ),
      describeTile(
        otherCenter.x,
        otherCenter.y,
        settings.radius,
        settings.spread,
        previousTile.startAngle + 180,
        previousTile.endAngle + 180,
        !previousTile.inverted,
        getRandomColorClass(previousTile.className, 4)
      )
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
    paths.push(tile);
    n--;
    n ? nextTile(tile) : null;
  }

  return paths;
}

function getViewBox(tiles) {
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
    minMax.xMin < 0 ? minMax.xMin : 0,
    minMax.yMin < 0 ? minMax.yMin : 0,
    Math.abs(minMax.xMin) + Math.abs(minMax.xMax),
    Math.abs(minMax.yMin) + Math.abs(minMax.yMax)
  ].join(' ');
}

export default function getBoard(n) {
  const tiles = generateTiles(n, settings);
  const viewBox = getViewBox(tiles);

  return {tiles, viewBox};
}
