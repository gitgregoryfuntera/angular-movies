import { MovieVideos } from './../../interfaces/movie-videos.interface';
import { Movies } from 'src/app/interfaces/movies.interface';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/interfaces/genres.interface';
import { MovieDetail } from 'src/app/interfaces/movie-detail.interface';


const apiKey = environment.apiKey;
const tmdbURL = 'https://api.themoviedb.org/3';
const urlHeaders = `api_key=${apiKey}&language=en-US`;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public imageURL: string = 'https://image.tmdb.org/t/p/';
  movieType: string = '';

  constructor(
    private http: HttpClient
  ) { }

  getNowPlayingMovies(page: number): Observable<Movies> {
    return this.http.get<Movies>(`${tmdbURL}/movie/now_playing?api_key=${apiKey}&${urlHeaders}&page=${page}`);
  }

  getPopularMovies(page: number): Observable<Movies> {
    return this.http.get<Movies>(`${tmdbURL}/movie/popular?api_key=${apiKey}&${urlHeaders}&page=${page}`);
  }

  getUpcomingMovies(page: number): Observable<Movies> {
    return this.http.get<Movies>(`${tmdbURL}/movie/upcoming?api_key=${apiKey}&${urlHeaders}&page=${page}`);
  }

  getMovieGenre(): Observable<Genre> {
    return this.http.get<Genre>(`${tmdbURL}/genre/movie/list?api_key=${apiKey}&${urlHeaders}`);
  }

  getMovieDetail(movieID: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${tmdbURL}/movie/${movieID}?api_key=${apiKey}&language=en-US`)
  }

  getMovieVideos(movieID: string): Observable<MovieVideos> {
    return this.http.get<MovieVideos>(`${tmdbURL}/movie/${movieID}/videos?api_key=${apiKey}&language=en-US`);
  }

  getSearchMovies(page: number, searchQuery: string): Observable<Movies> {
    return this.http.get<Movies>(`${tmdbURL}/search/movie?api_key=${apiKey}&language=en-US&page=${page}&include_adult=false&query=${searchQuery}`)
  }

  storeMovieType(movieType: string) {
    this.movieType = movieType;
  }
  
  loadMovieType(): string {
    return this.movieType;
  }

}
