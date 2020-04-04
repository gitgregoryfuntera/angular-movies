import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatInputModule, 
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatAutocompleteModule,
  MatCardModule,
  MatGridListModule,
  MatChipsModule,
  MatTooltipModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule
  ], exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class AppMaterialModule { }
