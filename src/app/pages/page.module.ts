import { PipeModule } from './../pipes/pipe.module';
import { DirectiveModule } from './../directives/directive.module';
import { LayoutModule } from './../layouts/layout.module';
import { AppRoutingModule } from './../app-routing.module';
import { AppMaterialModule } from './../app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }  from '@angular/common/http';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FlexLayoutModule, LayoutAlignStyleBuilder } from '@angular/flex-layout';
import {
  StyleUtils,
  StylesheetMap,
  MediaMarshaller,
  ɵMatchMedia,
  BreakPointRegistry,
  PrintHook,
  LayoutStyleBuilder,
  FlexStyleBuilder,
  ShowHideStyleBuilder,
  FlexOrderStyleBuilder,
  LayoutGapStyleBuilder
} from "@angular/flex-layout";
import { SearchComponent } from './search/search.component';
import { MovieListValueComponent } from './movie-list-value/movie-list-value.component';



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
    HomeComponent,
    InvalidPageComponent,
    MovieListComponent,
    MovieDetailComponent,
    SearchComponent,
    MovieListValueComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    DirectiveModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    PipeModule,
    YouTubePlayerModule,
    FlexLayoutModule,
  ], 
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder,
    LayoutGapStyleBuilder,
    LayoutAlignStyleBuilder
  ],
  exports: [
    HomeComponent,
    InvalidPageComponent,
    MovieListComponent,
    MovieDetailComponent,
  ]
})
export class PageModule { }
