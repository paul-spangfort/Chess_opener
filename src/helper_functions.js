export function intToCoord(i) {
  let row = Math.floor(i / 8);
  let col = i % 8;

  row = String.fromCharCode(97 + row);
  col += 1;

  return row.toString() + col.toString();
}

export function fillBoard(tiles) {
  let swap = true;
  for (let i = 0; i < 64; i += 1) {
    if (i % 8 === 0) { swap = !swap; }

    let c = '';

    if (swap) {
      c = (i % 2 === 0) ? 'black' : 'white';
    } else {
      c = (i % 2 === 1) ? 'black' : 'white';
    }

    tiles.push({ color: c, coordinate: intToCoord(i) });
  }

  return tiles;
}
