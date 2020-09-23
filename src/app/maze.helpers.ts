import Point from './models/Point';
export function getCurrentLocation(moves: Point[]): Point {
  return moves[moves.length - 1];
}

export function canEnterCell(cell: string): boolean {
  switch (cell) {
    case ' ':
    case 'A':
    case 'B':
    case 'm':
      return true;
    default:
      return false;
  }
}
