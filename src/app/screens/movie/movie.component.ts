import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WatchlistService } from '../../core/services/watchlist.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatButtonModule} from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { Movie } from '../../core/models/movie/movie.model';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatSlideToggleModule, FormsModule, MatButtonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  public movie: Movie = new Movie();
  public encodedMovie: string = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService,
    private sanitizer: DomSanitizer,
  ) {
  
    const param = this.activatedRoute.snapshot.paramMap.get('encoded-movie');
    if (param !== null) {
      this.encodedMovie = param;
      this.movie.decode(this.encodedMovie);
    }
  }

  public onToggleWatchlist() {
    this.watchlistService.toggleWatchlist(this.movie);
  }
  
  getEmbeddedVideoUrl(originalUrl: string): SafeResourceUrl | null {
    const url = new URL(originalUrl);

    if (url.hostname === 'www.youtube.com' && url.searchParams.has('v')) {
      const videoCode = url.searchParams.get('v');
      const embeddedUrl = `https://www.youtube.com/embed/${videoCode}`;
      
      // Marca la URL como segura antes de devolverla
      return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
    } else if (url.hostname === 'youtu.be') {
      const segments = url.pathname.split('/');
      if (segments.length > 1) {
        const videoCode = segments[1];
        const embeddedUrl = `https://www.youtube.com/embed/${videoCode}`;
        
        // Marca la URL como segura antes de devolverla
        return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
      }
    }

    return null;
  }

  public onReturn() {
    this.router.navigate(['movies']);
  }
}