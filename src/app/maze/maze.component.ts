import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
})
export class MazeComponent implements OnInit {
  loading = false;
  moves = 0;
  constructor() {}

  ngOnInit(): void {
    console.log('Maze Init!');
  }
}
