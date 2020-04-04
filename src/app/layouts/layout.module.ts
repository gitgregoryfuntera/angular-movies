import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppRoutingModule } from './../app-routing.module';
import { PipeModule } from './../pipes/pipe.module';
import { DirectiveModule } from './../directives/directive.module';
import { AppMaterialModule } from './../app-material/app-material.module';
import { MovieListSliderComponent } from './movie-list-slider/movie-list-slider.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    MovieListSliderComponent,
    MoviesComponent
  ],

  imports: [
    CommonModule,
    SwiperModule,
    AppMaterialModule,
    DirectiveModule,
    PipeModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule
  ],

  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [
    MovieListSliderComponent,
    MoviesComponent
  ]
})
export class LayoutModule { }
