export default class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public Equals(point: Point): boolean {
    return point.x === this.x && point.y === this.y;
  }
}
