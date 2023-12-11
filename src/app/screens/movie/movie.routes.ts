import { Routes } from '@angular/router';
import { MovieComponent } from './movie.component';

export const routes: Routes = [
  {
    path: 'movie/:encoded-movie',
    component: MovieComponent
  }
];
