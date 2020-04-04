import { fadeInAnimation } from './../../animations/fade-in-animation.animation';
import { MovieResult } from './../../interfaces/movies-result.interface';
import { Genre } from '../../interfaces/genres.interface';
import { MovieService } from './../../services/movie/movie.service';
import {
  Component,
  OnInit,
  ViewChild,
  HostListener
} from '@angular/core';
import {
  SwiperComponent,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { 
  combineLatest, 
  Observable 
} from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInAnimation', fadeInAnimation),
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: true }) componentRef: SwiperComponent;

  isLoadingSliderMovies = true;
  isLoadingInitFetcher = true;

  movieImageURL: string = '';
  imageWidth = 1280;
  
  nowPlayingGridHeight = '690px';
  nowPlayingGridCols = 1;

  popularGridHeight = '2:1';
  popularGridCols = 1;
  popularGridTile = [];

  upComingGridCols = 1;
  upComingGridHeight = '1:2.1';

  show: boolean = true;
  disabled: boolean = false;
  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
  };


  movies: MovieResult[];
  movieGenres: Genre[];
  nowPlayingList: MovieResult[];
  popularList: MovieResult[];
  upComingList: MovieResult[];

  constructor(
    private movieSvc: MovieService
  ) {
    this.movieImageURL = this.movieSvc.imageURL;
  }

  ngOnInit() {
    // Initially gets browser width
    this.onResizeImage(window.innerWidth);
    this.onResizeNowPlayingGridList(window.innerWidth);
    this.onResizePopularGridList(window.innerWidth);
    this.onResizeUpcomingGridList(window.innerWidth);
    // Loads top 5 movies
    setTimeout(() => {
      this.loadMovieSliders();
      // Loads Now Playing Movies
      this.initialLoadMovies().subscribe(res => {
        let nowPlaying = res.nowPlaying;
        let popular = res.popular;
        let genre = res.genre;
        let upComing = res.upComing;

        this.nowPlayingList = nowPlaying.results.slice(0, 18);
        
        this.popularList = popular.results.slice(0, 3); // Get popular top 3
        console.log(this.popularList);

        this.upComingList = upComing.results.slice(0,3); // Get upcoming top 3
        console.log(this.upComingList);

        this.movieGenres = genre.genres;
        console.log(this.movieGenres);

        this.isLoadingInitFetcher = false;

      }, error => {
        console.log(error);
        this.isLoadingInitFetcher = false;
      });
    }, 800);
    
  }

  loadMovieSliders() {
    this.movieSvc.getNowPlayingMovies(1).subscribe(res => {
      console.log(res);
      
      this.movies = res.results.slice(0, 5);
     
      this.isLoadingSliderMovies = false;
    }, error => {
      console.log(error);
      this.isLoadingSliderMovies = false;
    });
  }

  initialLoadMovies(): Observable<any> {
    return combineLatest(
      this.movieSvc.getNowPlayingMovies(1),
      this.movieSvc.getPopularMovies(1),
      this.movieSvc.getUpcomingMovies(1),
      this.movieSvc.getMovieGenre(),
    ).pipe(
      map(([nowPlaying, popular, upComing, genre]) => {
        return { nowPlaying, popular, upComing, genre }
      })
    );
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }



// Resize Grids & Images
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event);
    this.onResizeImage(window.innerWidth);
    this.onResizeNowPlayingGridList(window.innerWidth);
    this.onResizePopularGridList(window.innerWidth);
    this.onResizeUpcomingGridList(window.innerWidth);
  }

  onResizeImage(innerWidth: number) {
    // console.log(innerWidth);
    if (innerWidth > 200 && innerWidth < 300) {
      this.imageWidth = 300;
    } 
    else if (innerWidth > 300 && innerWidth <= 500) {
      this.imageWidth = 500;
    } 
    else if (innerWidth > 500 && innerWidth <= 780) {
      this.imageWidth = 780;
    } 
    else if (innerWidth > 780) {
      this.imageWidth = 1280;
    }
  }

  onResizeNowPlayingGridList(innerWidth: number) {
    this.nowPlayingGridCols = 1;
    if (innerWidth < 351) {
      this.nowPlayingGridHeight = '1:2.3';
    }
    else if (innerWidth < 401) {
      this.nowPlayingGridHeight = '1:2.2';
    } 
    else if (innerWidth < 451) {
      this.nowPlayingGridHeight = '1:2.1';
    } 
    else if (innerWidth < 551) {
      this.nowPlayingGridHeight = '1:2';
    } 
    else if (innerWidth < 701) {
      this.nowPlayingGridCols = 2;
      this.nowPlayingGridHeight = '1:2.3';
    } 
    else if (innerWidth < 751) {
      this.nowPlayingGridCols = 2;
      this.nowPlayingGridHeight = '1:2.2';
    } 
    else if (innerWidth < 801) {
      this.nowPlayingGridCols = 3;
      this.nowPlayingGridHeight = '1:2.4';
    } 
    else {
      this.nowPlayingGridCols = 3;
      this.nowPlayingGridHeight = '1:2.2';
    }
  }

  onResizePopularGridList(innerWidth: number) {
    this.popularGridCols = 1;
    this.popularGridTile = [
      {rowSpan: 1, colSpan: 1, imageWidth: 'w500', imageFlag: 1},
      {rowSpan: 1, colSpan: 1, imageWidth: 'w500', imageFlag: 1},
      {rowSpan: 1, colSpan: 1, imageWidth: 'w500', imageFlag: 1},
    ];

    if (innerWidth > 500 && innerWidth < 800) {
      this.popularGridCols = 3;
      this.popularGridTile[1].colSpan = 2;
      this.popularGridTile[1].rowSpan = 2;

    } 
    else if (innerWidth >= 800) {
      this.popularGridCols = 3;
      this.popularGridTile[0].colSpan = 1;
      this.popularGridTile[0].rowSpan = 4;
      this.popularGridTile[0].imageFlag = 0;
      this.popularGridTile[0].imageWidth = 'w780'; 
      
      this.popularGridTile[1].colSpan = 2;
      this.popularGridTile[1].rowSpan = 2;
      this.popularGridTile[1].imageWidth = 'w1280'; 
      
      this.popularGridTile[2].colSpan = 2;
      this.popularGridTile[2].rowSpan = 2;
      this.popularGridTile[2].imageWidth = 'w1280'; 
    }
  }

  determinImageType(imageFlag: number, movie: any): string {
    let imagePath = movie.poster_path;
    if (imageFlag === 1) {
      imagePath = movie.backdrop_path;
    }
    return imagePath
  }

  onResizeUpcomingGridList(innerWidth: number) {
    if (innerWidth  < 500) {
      this.upComingGridCols = 1;
      this.upComingGridHeight = '1:2.1';
    } else if (innerWidth > 500) {
      this.upComingGridCols = 3;
    }
  }

}
