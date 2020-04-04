import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSliderComponent } from './movie-list-slider.component';

describe('MovieListSliderComponent', () => {
  let component: MovieListSliderComponent;
  let fixture: ComponentFixture<MovieListSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
