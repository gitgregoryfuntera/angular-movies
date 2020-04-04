import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MovieService } from './../../services/movie/movie.service';
import { MovieResult } from 'src/app/interfaces/movies-result.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list-value',
  templateUrl: './movie-list-value.component.html',
  styleUrls: ['./movie-list-value.component.scss']
})
export class MovieListValueComponent implements OnInit {
  routerEvent = new Subscription();
  type: string = '';
  movieList: MovieResult[] = []
  moviePage = 1;
  movieType: string = '';
  isLoading = true;

  constructor(
    private router: Router,
    private movieSvc: MovieService
  ) { 
    this.routerEvent = this.router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {
          this.movieList = [];
          this.movieType = this.getMovieType();
          this.loadMovie(this.movieType, 1);
        }
    });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  loadMovie(type: string, pageNumber: number) {
    this.moviePage = pageNumber;
    if (this.movieType === 'now_playing') {
      this.movieSvc.getNowPlayingMovies(this.moviePage).subscribe(res => {
          console.log(res);
          res.results.forEach(movie => {
            this.movieList.push(movie);
          });
          console.log(`${type}`);
          console.log(this.movieList);
          this.isLoading = false;
      });
    }
    else if (this.movieType === 'popular') {
      this.movieSvc.getPopularMovies(this.moviePage).subscribe(res => {
          console.log(res);
          res.results.forEach(movie => {
            this.movieList.push(movie);
          });
          console.log(`${type}`);
          console.log(this.movieList);
          this.isLoading = false;
      });
    }
    else if (this.movieType === 'upcoming') {
      this.movieSvc.getUpcomingMovies(this.moviePage).subscribe(res => {
        res.results.forEach(movie => {
          this.movieList.push(movie);
        });
        console.log(`${type}`);
        console.log(this.movieList);
        this.isLoading = false;
      });
    }
  }

  getMovieType(): string {
    let movieType = this.router.url;
    return movieType.split('/')[2];
  }

  onLoadMore() {
    this.moviePage++;
    this.loadMovie(this.movieType, this.moviePage);
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routerEvent.unsubscribe();
    this.movieList = [];
  }


}
