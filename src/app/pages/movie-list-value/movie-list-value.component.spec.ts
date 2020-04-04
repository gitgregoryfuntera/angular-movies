import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListValueComponent } from './movie-list-value.component';

describe('MovieListValueComponent', () => {
  let component: MovieListValueComponent;
  let fixture: ComponentFixture<MovieListValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
