
export function intToCoord(i) {
  let col = Math.floor(i / 8);
  let row = i % 8;

  row = String.fromCharCode(97 + row);
  col += 1;

  return row.toString() + col.toString();
}

export function getSource(piece) {
  const imgSources = [
    'https://img.icons8.com/ios/50/000000/pawn-filled.png',
    'https://img.icons8.com/ios/50/000000/pawn.png',
    'https://img.icons8.com/ios/50/000000/knight-filled.png',
    'https://img.icons8.com/ios/50/000000/knight.png',
    'https://img.icons8.com/ios/50/000000/rook-filled.png',
    'https://img.icons8.com/ios/50/000000/rook.png',
    'https://img.icons8.com/ios/50/000000/queen-filled.png',
    'https://img.icons8.com/ios/50/000000/queen.png',
    'https://img.icons8.com/ios/50/000000/bishop-filled.png',
    'https://img.icons8.com/ios/50/000000/bishop.png',
    'https://img.icons8.com/ios/50/000000/king-filled.png',
    'https://img.icons8.com/ios/50/000000/king.png',
  ];

  let i = 0;

  if (piece) {
    if (piece.color === 'b') {
      if (piece.type === 'p') {
        i = 0;
      }
      if (piece.type === 'n') {
        i = 2;
      }
      if (piece.type === 'r') {
        i = 4;
      }
      if (piece.type === 'q') {
        i = 6;
      }
      if (piece.type === 'b') {
        i = 8;
      }
      if (piece.type === 'k') {
        i = 10;
      }
    } else {
      if (piece.type === 'p') {
        i = 1;
      }
      if (piece.type === 'n') {
        i = 3;
      }
      if (piece.type === 'r') {
        i = 5;
      }
      if (piece.type === 'q') {
        i = 7;
      }
      if (piece.type === 'b') {
        i = 9;
      }
      if (piece.type === 'k') {
        i = 11;
      }
    }
  }

  return imgSources[i];
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

    tiles.push({ color: c, coordinate: intToCoord(i), imgsrc: getSource() });
  }

  return tiles;
}
