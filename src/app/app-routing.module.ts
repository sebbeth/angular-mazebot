import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MazeComponent } from './maze/maze.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'maze', component: MazeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
