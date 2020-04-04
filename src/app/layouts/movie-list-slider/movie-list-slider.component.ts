import { fadeInAnimation } from './../../animations/fade-in-animation.animation';
import { trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { MovieService } from './../../services/movie/movie.service';
import { 
    Component, 
    OnInit,
    ViewChild,
    ChangeDetectorRef,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import {
  SwiperComponent,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieResult } from 'src/app/interfaces/movies-result.interface';

@Component({
  selector: 'app-movie-list-slider',
  templateUrl: './movie-list-slider.component.html',
  styleUrls: ['./movie-list-slider.component.scss'],
  animations: [
    trigger('fadeInAnimation', fadeInAnimation)
  ]
})
export class MovieListSliderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(SwiperComponent, { static: true }) componentRef: SwiperComponent;

  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
  };

  movieType: string = '';
  movies: MovieResult[] = []
  movieImageURL: string = ''

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  mobileView = true;

  isLoading = true;

  constructor(
    private movieSvc: MovieService,
    private activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
  ) { 
    this.movieImageURL = this.movieSvc.imageURL;

    this.mobileQuery = media.matchMedia("(min-width: 500px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
        console.log(this.mobileQuery.matches);
        this.mobileView = this.mobileQuery.matches
        this.mobileQuery.addEventListener("change", e => {
          console.log(e.matches);
          this.mobileView = e.matches;
        });

        this.activatedRoute.paramMap.pipe(
          switchMap((params: ParamMap) => 
            of(params.get('type'))
          )
        ).subscribe(type => {
          console.log(type);
          this.movieType =  type;
          this.movieSvc.storeMovieType(type);
          this.isLoading = true;
          this.fetchMovie(type);
        });
    }, 500);
  }


  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

  fetchMovie(movieType: string) {
    switch(movieType) {
      case 'upcoming':
        this.movieSvc.getUpcomingMovies(1).subscribe(res => {
          console.log(res, 'upcoming');
          this.movies = res.results.splice(0,5);
          this.isLoading = false;
        });
      break;
      
      case 'now_playing':
        this.movieSvc.getNowPlayingMovies(1).subscribe(res => {
          console.log(res, 'now playing');
          this.movies = res.results.splice(0,5);
          this.isLoading = false;
        });
      break;

      case 'popular':
        this.movieSvc.getPopularMovies(1).subscribe(res => {
          console.log(res, 'popular');
          this.movies = res.results.splice(0,5);
          this.isLoading = false;
        });
      break;

      default:
        this.isLoading = false;
      break;
    }
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
