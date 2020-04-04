import { MovieResult } from './../../interfaces/movies-result.interface';
import { MovieService } from './../../services/movie/movie.service';
import { 
  Component, 
  ElementRef,
  ViewChild, 
  AfterViewInit, 
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchMovieInput', {static: false}) searchMovieInput: ElementRef
  movies: MovieResult[] = [];
  moviePlaceholders: MovieResult[] = [];
  initialLoad = true;
  page: number = 1;
  searchValue: string = '';
  movieImageURL: string = '';
  windowHeight: number = 0;
  totalPages: number;
  noResultsFound = false;
  isLoading = true;

  constructor(private movieSvc: MovieService) { 
    this.movieImageURL = this.movieSvc.imageURL;
  }

  ngAfterViewInit() {
    this.windowHeight = window.innerHeight;
    this.loadPopularMovies(1);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    fromEvent(this.searchMovieInput.nativeElement, 'keyup').pipe(
        map((event: any) => {
          return event.target.value
        })
        ,filter(res => res.length > 2)
        ,debounceTime(1000)
        ,distinctUntilChanged()
      ).subscribe(searchValue => {
        console.log(searchValue);
        this.page = 1;
        this.movies = [];
        this.searchValue = searchValue;
        this.loadMovies(this.page, searchValue);
    });
  }

  loadPopularMovies(page: number) {
    this.movieSvc.getPopularMovies(page).subscribe(res => {
      console.log(res);
      this.moviePlaceholders = res.results.splice(0, 4);
      console.log(this.moviePlaceholders);
    }, error => {
        console.log(error);
    });
  }

  loadMovies(page: number, searchValue: string) {
    this.initialLoad = false;
    this.isLoading = true;
    this.movieSvc.getSearchMovies(this.page, searchValue).subscribe(res => {
      console.log(res);
      this.totalPages = res.total_pages;
      res.results.forEach(value => {
        this.movies.push(value);
      });
      if (!this.movies.length) {
        this.noResultsFound = true;
      }
      this.isLoading = false;
    });
  }

  @HostListener('window:resize', ['$event'])
  onGetWindowSize(event) {
    this.windowHeight = window.innerHeight;
  }

  onLoadMore() {
    this.page += 1;
    this.loadMovies(this.page, this.searchValue);
  }
}
