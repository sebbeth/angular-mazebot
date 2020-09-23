import Point from './Point';

export default class Maze {
  public name: string;
  public mazePath: string;
  public startingPosition: Point;
  public endingPosition: Point;
  public message: string;
  public map: string[][];

  constructor(item?: any) {
    if (!item) {
      return this;
    }
    this.name = item.name;
    this.mazePath = item.mazePath;
    this.startingPosition = new Point(
      item.startingPosition[0],
      item.startingPosition[1]
    );
    this.endingPosition = new Point(
      item.endingPosition[0],
      item.endingPosition[1]
    );
    this.message = item.message;
    this.map = item.map;
    this.pad();
  }

  pad(): void {
    this.map.forEach((row) => {
      row.splice(0, 0, '🎹');
      row.splice(row.length, 0, '🎹');
    });
    const newRow = this.map[0].map(() => '🎹');
    this.map.splice(0, 0, [...newRow]); // Add a top row
    this.map.push([...newRow]); // Add a bottom row
    this.startingPosition.x++;
    this.startingPosition.y++;
    this.endingPosition.x++;
    this.endingPosition.y++;
  }
}
