import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeReviewsComponent } from './episode-reviews.component';

describe('EpisodeReviewsComponent', () => {
  let component: EpisodeReviewsComponent;
  let fixture: ComponentFixture<EpisodeReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
