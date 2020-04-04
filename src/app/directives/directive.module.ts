import { ImageLoaderDirective } from './image-loader/image-loader.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ImageLoaderDirective
  ]
    ,
  imports: [
    CommonModule
  ],
  exports: [
    ImageLoaderDirective
  ]
})
export class DirectiveModule { }
