import { Injectable } from '@angular/core';
import Maze from './models/maze';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor() {}

  public async getMaze(): Promise<Maze> {
    const minSize = 10;
    const maxSize = 30;
    const request = `https://api.noopschallenge.com/mazebot/random?minSize=${minSize}&maxSize=${maxSize}`;
    const data = await fetch(request);
    if (data) {
      const result = await data.json();
      const maze = new Maze(result);
      console.log(maze);

      return maze;
    }
    return null;
  }

  public async postSolution(
    endpoint: string,
    directions: string
  ): Promise<string> {
    const request = `https://api.noopschallenge.com${endpoint}`;
    console.log('send it', directions);

    const data = await fetch(request, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ directions }),
    });
    if (data) {
      const result = await data.json();
      console.log(result);
      if (result.message) {
        return result.message;
      }
    }
  }
}
