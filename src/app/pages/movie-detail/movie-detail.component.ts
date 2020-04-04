import { fadeInAnimation } from './../../animations/fade-in-animation.animation';
import { trigger } from '@angular/animations';
import { Genre } from './../../interfaces/genres.interface';
import { MovieVideos } from './../../interfaces/movie-videos.interface';
import { MovieService } from './../../services/movie/movie.service';
import { 
    Component, 
    OnInit, 
    AfterViewInit, 
    OnDestroy 
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of, Observable, combineLatest } from 'rxjs';
import { MovieDetail } from 'src/app/interfaces/movie-detail.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  animations: [trigger('fadeInAnimation', fadeInAnimation)]
})
export class MovieDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  videoWidth: number = 0;
  videoID: string = '';

  showPlayer: boolean = false;

  movieDetail: MovieDetail;
  movieVideos: MovieVideos;
  movieGenre: Genre[];

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieSvc: MovieService
  ) { }

  ngOnInit() {
  
  }

  ngAfterViewInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => 
        of(params.get('movieID'))
      )
    ).subscribe(movieID => {
      console.log(movieID);
      
      this.initialLoadMovieDetail(movieID).subscribe(res => {
        console.log(res);
        this.movieDetail = res.movieDetail;
        this.movieVideos = res.movieVideos;
        
        if (!this.movieVideos.results.length) {
          this.showPlayer = false
          this.isLoading = false;
        } 
        
        else {
          this.videoID = this.movieVideos.results[0].key;
          /** Workaround for rendering issue */ 
          setTimeout(() => {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
            console.log(this.videoID + 'asdasd', this.isLoading);
            this.videoID !== undefined ? this.showPlayer = true : this.showPlayer = false;
            this.isLoading = false;
          }, 500);
        }

      });
    });
  
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  initialLoadMovieDetail(movieID: string): Observable<any> {
    return combineLatest(
      this.movieSvc.getMovieDetail(movieID),
      this.movieSvc.getMovieVideos(movieID),
    ).pipe(
      map(([movieDetail, movieVideos]) => {
        return { movieDetail, movieVideos }
      })
    );
  }

  onViewTrailer(videoKey: string, resultIndex: number) {
    this.videoID = videoKey;
  }

  selectedBtnTrailer(resultIndex: number): boolean {
    return this.movieVideos.results[resultIndex].key === this.videoID;
  }

  onResize = (): void => {
    innerWidth > 600 ? this.videoWidth = 580 : this.videoWidth = window.innerWidth;
    console.log(this.videoWidth);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

}
