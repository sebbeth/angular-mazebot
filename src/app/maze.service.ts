import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Maze from './models/maze';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
  constructor(private http: HttpClient) {}

  // public async getMaze(): Promise<Maze> {
  //   const minSize = 10;
  //   const maxSize = 30;
  //   const request = `https://api.noopschallenge.com/mazebot/random?minSize=${minSize}&maxSize=${maxSize}`;
  //   const data = await fetch(request);
  //   if (data) {
  //     const result = await data.json();
  //     const maze = new Maze(result);
  //     console.log(maze);

  //     return maze;
  //   }
  //   return null;
  // }

  public async getMaze(): Promise<Maze> {
    const minSize = 10;
    const maxSize = 30;
    const request = `https://api.noopschallenge.com/mazebot/random?minSize=${minSize}&maxSize=${maxSize}`;
    try {
      const data = await this.http.get<Maze>(request).toPromise();
      if (data) {
        const result = data;
        const maze = new Maze(result);
        console.log(maze);
        return maze;
      }
    } catch (error) {
      console.error('Could not get maze', error);
    }
  }

  public async postSolution(
    endpoint: string,
    directions: string
  ): Promise<string> {
    const url = `https://api.noopschallenge.com${endpoint}`;
    console.log('send it', directions);
    const body = { directions };
    try {
      const data = await this.http.post<any>(url, body).toPromise();
      if (data) {
        const result = await data;
        console.log(result);
        if (result.message) {
          return result.message;
        }
      }
    } catch (error) {
      console.error('Could not post solution', error);
    }
  }
}
