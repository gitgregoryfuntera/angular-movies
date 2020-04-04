import { VoteValuePipe } from './vote-value/vote-value.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    VoteValuePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VoteValuePipe
  ]
})
export class PipeModule { }
