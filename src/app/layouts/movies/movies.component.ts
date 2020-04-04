import { fadeInAnimation } from './../../animations/fade-in-animation.animation';
import { trigger } from '@angular/animations';
import { MovieService } from '../../services/movie/movie.service';
import { MovieResult } from '../../interfaces/movies-result.interface';
import { 
    Component, 
    OnInit, 
    HostListener,
    Input
} from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations:[trigger('fadeInAnimtion', fadeInAnimation)]
})
export class MoviesComponent implements OnInit {
  @Input() movieList: MovieResult;
  @Input() movieType: string = '';
  @Input() isLoading: boolean = true;

  movieImageURL: string | '';
  // Grid Columns
  colsValue = 1;


  constructor(
    private movieSvc: MovieService
  ) {
    this.movieImageURL = this.movieSvc.imageURL;
  }

  ngOnInit() {
    this.resizerGrid(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window.innerWidth);
    this.resizerGrid(window.innerWidth);
  }

  resizerGrid(innerWidth: number) {
    if (innerWidth < 500) {
      this.colsValue = 1;
    } 
    else if ((innerWidth > 501) && (innerWidth < 800)){
      this.colsValue = 2;
    } 
    else {
      this.colsValue = 3;
    } 
  }
}
