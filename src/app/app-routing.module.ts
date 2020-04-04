import { SearchComponent } from './pages/search/search.component';
import { MovieListValueComponent } from './pages/movie-list-value/movie-list-value.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { InvalidPageComponent } from './pages/invalid-page/invalid-page.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
  {component: HomeComponent, path: 'home'},
  {
      path: 'movie_list/:type', 
      component: MovieListComponent,
      children: [
        {
          path: 'list',
          component: MovieListValueComponent
        },
        {
          path: 'list/:movieID', 
          component: MovieDetailComponent,
        }
      ]
  },
  {component: SearchComponent, path: 'search'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
