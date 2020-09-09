import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ReviewService } from 'src/app/data/review.service';
import { Review } from 'src/app/models/Review';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  reviews: Review[] = [];
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getAllReviews().valueChanges.subscribe((data) => {
      this.reviews = [...data.data.reviews];
    });
  }
}
