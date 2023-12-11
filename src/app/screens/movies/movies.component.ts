import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../core/models/movie/movie.model';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms';
import { WatchlistService } from '../../core/services/watchlist.service';
import { MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule, MatSlideToggleModule, FormsModule, MatIconModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  public movies: Movie[] = [];

  constructor(
    private router: Router,
    private watchlistService: WatchlistService
  ) {
  this.init();
  }

  public init()
  {
    let movie: Movie;
    movie = new Movie();
    movie.title = "Tenet";
    movie.description = "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.";
    movie.rating = 7.8;
    movie.duration = "2h 30min";
    movie.genre.push("Action");
    movie.genre.push("Sci-Fi");
    movie.releasedDate = "3 September 2020";
    movie.trailerLink = "https://www.youtube.com/watch?v=LdOM0x0XDMo";
    movie.imageLink = "./assets/Tenet.png";
    this.movies.push(movie);

    movie = new Movie();
    movie.title = "Spider-Man: Into the Spider-Verse";
    movie.description = "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.";
    movie.rating = 8.4;
    movie.duration = "1h 57min";
    movie.genre.push("Animation");
    movie.genre.push("Adventure");
    movie.releasedDate = "14 December 2018";
    movie.trailerLink =  "https://www.youtube.com/watch?v=tg52up16eq0";
    movie.imageLink = "./assets/Spider Man.png";
    this.movies.push(movie);

    movie = new Movie();
    movie.title = "Knives Out";
    movie.description = "A detective investigates the death of a patriarch of an eccentric, combative family.";
    movie.rating = 7.9;
    movie.duration = "2h 10min";
    movie.genre.push("Comedy");
    movie.genre.push("Crime");
    movie.genre.push("Drama");
    movie.releasedDate = "27 November 2019";
    movie.trailerLink =  "https://www.youtube.com/watch?v=qGqiHJTsRkQ";
    movie.imageLink = "./assets/Knives Out.png";
    this.movies.push(movie);

    movie = new Movie();
    movie.title = "Guardians of the Galaxy";
    movie.description = "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.";
    movie.rating = 8.0;
    movie.duration = "2h 1min";
    movie.genre.push("Action");
    movie.genre.push("Adventure");
    movie.genre.push("Comedy");
    movie.releasedDate = "1 August 2014";
    movie.trailerLink =  "https://www.youtube.com/watch?v=d96cjJhvlMA";
    movie.imageLink = "./assets/Guardians of The Galaxy.png";
    this.movies.push(movie);

    movie = new Movie();
    movie.title = "Age of Ultron";
    movie.description = "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.";
    movie.rating = 7.3;
    movie.duration = "2h 21min";
    movie.genre.push("Action");
    movie.genre.push("Adventure");
    movie.genre.push("Sci-Fi");
    movie.releasedDate = "1 May 2015";
    movie.trailerLink =  "https://www.youtube.com/watch?v=tmeOjFno6Do";
    movie.imageLink = "./assets/Avengers.png";
    this.movies.push(movie);
  
    this.initMoviesWithWatchlistState();
  }

  public sortByTitle() {
    this.movies.sort((a, b) => a.title.localeCompare(b.title));
  }

  public sortByReleaseDate() {
    this.movies.sort((a, b) => new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime());
  }

  public onToggleWatchlist(movie: Movie) {
    this.watchlistService.toggleWatchlist(movie);
  }

  private initMoviesWithWatchlistState(): void {
    const watchlist = this.watchlistService.getWatchlist();
    this.movies.forEach((movie) => {
      const watchlistMovie = watchlist.find((item) => item.title === movie.title);
      movie.inWatchlist = !!watchlistMovie;
    });
  }

  public onImageClick(movie: Movie)
  {
    this.router.navigate(['movie/' + movie.encode()]);
  }
}
