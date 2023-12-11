export interface IMovie {
  title: string;
  description: string;
  rating: number;
  duration: string;
  genre: string[];
  releasedDate: string;
  trailerLink: string;
  imageLink: string;
  inWatchlist: boolean;
}

export class Movie implements IMovie {
    title: string;
    description: string;
    rating: number;
    duration: string;
    genre: string[];
    releasedDate: string;
    trailerLink: string;
    imageLink: string;
    inWatchlist: boolean;
  constructor() {
    this.title = '';
    this.description = '';
    this.rating = -1;
    this.duration = '';
    this.genre = new Array<string>();
    this.releasedDate = '';
    this.trailerLink =  '';
    this.imageLink = '';
    this.inWatchlist = false;
  }
  public assign(it: IMovie) {
    this.title = it.title;
    this.description = it.description;
    this.rating = it.rating;
    this.duration = it.duration;
    this.genre.length = 0;
    if (it.genre !== undefined) {
      it.genre.forEach((element: string) => {
        this.genre.push(element);
      });
    }
    this.releasedDate = it.releasedDate;
    this.trailerLink =  it.trailerLink;
    this.imageLink = it.imageLink;
    this.inWatchlist = it.inWatchlist;
  }

  public encode() {
    const stringify = JSON.stringify(this);
    const base64 = btoa(stringify);
    const uriEncoded = encodeURIComponent(base64);
    return uriEncoded;
  }
  
  public decode(value: string) {
    const base64 = decodeURIComponent(value);
    const stringify = atob(base64);
    const movie: IMovie = JSON.parse(stringify);
    this.assign(movie);
  }
}
