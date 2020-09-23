import Point from './models/Point';

export enum MoveDirections {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export function getCurrentLocation(moves: Point[]): Point {
  return moves[moves.length - 1];
}

export function canEnterCell(cell: string): boolean {
  switch (cell) {
    case ' ':
    case 'A':
    case 'B':
    case '*':
      return true;
    default:
      return false;
  }
}

export function serializeMoves(moves: MoveDirections[]): string {
  let output = '';
  moves.forEach((move) => {
    switch (move) {
      case MoveDirections.UP:
        output += 'N';
        break;
      case MoveDirections.DOWN:
        output += 'S';
        break;
      case MoveDirections.RIGHT:
        output += 'E';
        break;
      case MoveDirections.LEFT:
        output += 'W';
        break;
      default:
        break;
    }
  });
  return output;
}
