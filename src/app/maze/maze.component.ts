import { MazeService } from './../maze.service';
import { Component, HostListener, OnInit } from '@angular/core';
import Maze from '../models/maze';
import Point from '../models/Point';
import { canEnterCell, getCurrentLocation } from '../maze.helpers';

export enum MoveDirections {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
})
export class MazeComponent implements OnInit {
  loading = false;
  moves: Point[] = [];
  maze: Maze = null;
  constructor(private mazeService: MazeService) {}

  ngOnInit(): void {
    console.log('Maze Init!');
    this.getData();
  }

  async getData(): Promise<void> {
    this.maze = await this.mazeService.getMaze();
    this.moves.push(this.maze.startingPosition);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    console.log(event.key);
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
    console.log(direction);
    const currentLocation = getCurrentLocation(this.moves);
    const availableMoves = this.getAvailableMoves();
    if (availableMoves.includes(direction)) {
      console.log('can move');
      // create move
      const nextMove = new Point(currentLocation.x, currentLocation.y);
      switch (direction) {
        case MoveDirections.UP:
          nextMove.y--;
          break;
        case MoveDirections.RIGHT:
          nextMove.x++;
          break;
        case MoveDirections.DOWN:
          nextMove.y++;
          break;
        case MoveDirections.LEFT:
          nextMove.x--;
          break;
      }
      this.addMove(nextMove);

      console.log('moves', this.moves);
    }
  }

  isComplete(): boolean {
    return getCurrentLocation(this.moves).Equals(this.maze.endingPosition);
  }

  isCurrentLocation(x: number, y: number): boolean {
    const currentLocation = getCurrentLocation(this.moves);
    return x === currentLocation.x && y === currentLocation.y;
  }
  addMove(move: Point): void {
    this.moves.push(move);
    if (this.maze.map[move.y][move.x] === ' ') {
      this.maze.map[move.y][move.x] = 'm';
    }
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
      getCurrentLocation(this.moves)
    );
    console.log(adjacentCells);
    const options = adjacentCells.map((cell, index) =>
      canEnterCell(cell) ? index : null
    ) as MoveDirections[];
    console.log(options);
    return options;
  }
}
