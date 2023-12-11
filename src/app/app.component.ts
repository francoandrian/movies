import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MoviesComponent } from './screens/movies/movies.component';
import { MovieComponent } from './screens/movie/movie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MoviesComponent, MovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router){
  this.router.navigate(['movies/']);
  }
}
