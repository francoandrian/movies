import { Injectable } from '@angular/core';
import { Movie } from '../models/movie/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlistKey = 'userWatchlist';
  constructor() {
    this.initializeWatchlistState();
  }

  toggleWatchlist(movie: any): void {
    let watchlist = this.getWatchlist();
    const index = watchlist.findIndex((item) => item.title === movie.title);
  
    if (index !== -1) {
      watchlist.splice(index, 1);
    } else {
      watchlist.push(movie);
    }
  
    this.saveWatchlist(watchlist);
  }

  private initializeWatchlistState(): void {
    const watchlist = this.getWatchlist();
    watchlist.forEach((movie) => (movie.isInWatchlist = true));
  }

  getWatchlist(): any[] {
    const watchlistData = localStorage.getItem(this.watchlistKey);
    return watchlistData ? JSON.parse(watchlistData) : [];
  }

  private saveWatchlist(watchlist: any[]): void {
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }
}