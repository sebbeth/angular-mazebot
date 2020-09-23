import { MazeService } from './../maze.service';
import { Component, HostListener, OnInit } from '@angular/core';
import Maze from '../models/maze';
import Point from '../models/Point';
import { canEnterCell, MoveDirections, serializeMoves } from '../maze.helpers';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
})
export class MazeComponent implements OnInit {
  loading = false;
  moves: MoveDirections[] = [];
  currentLocation: Point;
  maze: Maze = null;
  isComplete: boolean;
  message: string = null;
  constructor(private mazeService: MazeService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.maze = await this.mazeService.getMaze();
    this.currentLocation = this.maze.startingPosition;
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.onMove(MoveDirections.UP);
        break;
      case 'ArrowRight':
        this.onMove(MoveDirections.RIGHT);
        break;
      case 'ArrowDown':
        this.onMove(MoveDirections.DOWN);
        break;
      case 'ArrowLeft':
        this.onMove(MoveDirections.LEFT);
        break;
      default:
        break;
    }
  }

  onMove(direction: MoveDirections): void {
    if (!this.isComplete) {
      console.log(this.moves);

      const availableMoves = this.getAvailableMoves();
      if (availableMoves.includes(direction)) {
        const nextLocation = new Point(
          this.currentLocation.x,
          this.currentLocation.y
        );
        switch (direction) {
          case MoveDirections.UP:
            nextLocation.y--;
            break;
          case MoveDirections.RIGHT:
            nextLocation.x++;
            break;
          case MoveDirections.DOWN:
            nextLocation.y++;
            break;
          case MoveDirections.LEFT:
            nextLocation.x--;
            break;
        }
        this.currentLocation = nextLocation;
        this.moves.push(direction);
        if (this.maze.map[nextLocation.y][nextLocation.x] === ' ') {
          this.maze.map[nextLocation.y][nextLocation.x] = '*';
        }
        if (this.currentLocation.Equals(this.maze.endingPosition)) {
          this.onMazeComplete();
        }
      }
    }
  }

  async onMazeComplete(): Promise<void> {
    this.isComplete = true;
    const directions = serializeMoves(this.moves);
    console.log(directions, this.moves);

    this.message = await this.mazeService.postSolution(
      this.maze.mazePath,
      directions
    );
  }

  isCurrentLocation(x: number, y: number): boolean {
    return x === this.currentLocation.x && y === this.currentLocation.y;
  }

  getAdjacentCells(map: string[][], position: Point): string[] {
    // Returns an array of four adjacent cells, ordered clockwise N,E,S,W,
    const output = [];
    output.push(map[position.y - 1][position.x]);
    output.push(map[position.y][position.x + 1]);
    output.push(map[position.y + 1][position.x]);
    output.push(map[position.y][position.x - 1]);
    return output;
  }

  getAvailableMoves(): MoveDirections[] {
    const adjacentCells = this.getAdjacentCells(
      this.maze.map,
      this.currentLocation
    );
    const options = adjacentCells.map((cell, index) =>
      canEnterCell(cell) ? index : null
    ) as MoveDirections[];
    return options;
  }
}
