import { Injectable } from '@angular/core';
import Maze from './models/maze';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor() {}

  public fooBar(): void {
    console.log('heeyyoo');
  }

  public async getMaze(): Promise<Maze> {
    const minSize = 10;
    const maxSize = 10;
    const request = `https://api.noopschallenge.com/mazebot/random?minSize=${minSize}&maxSize=${maxSize}`;
    const data = await fetch(request);
    if (data) {
      const result = await data.json();
      const maze = new Maze(result);
      return maze;
    }
    return null;
  }
}
