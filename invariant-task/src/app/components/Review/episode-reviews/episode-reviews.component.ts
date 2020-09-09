import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/data/review.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';
import { EditReviewComponent } from '../edit-review/edit-review.component';
@Component({
  selector: 'app-episode-reviews',
  templateUrl: './episode-reviews.component.html',
  styleUrls: ['./episode-reviews.component.css'],
})
export class EpisodeReviewsComponent implements OnInit {
  reviews: Review[] = [];
  episodeDetail: any;
  reviewUpdate: Review[];
  stars = [1, 2, 3, 4, 5];
  rating = '';
  numberOfReviews: number;
  average = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.episodeDetail = { ...data };
      this.getData();
    });
  }
  getData() {
    this.reviewService
      .getReviewsByEpisode(this.episodeDetail.episode)
      .valueChanges.subscribe({
        next: (result) => {
          this.reviews = [...result.data.getReview];
          this.numberOfReviews = this.reviews.length;
          this.averageRating(this.reviews);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  averageRating(reviews: Review[]) {
    if (this.reviews.length) {
      let ratings = reviews.map((e) => e.stars).reduce((a, b) => a + b, 0);

      this.rating = (ratings / reviews.length).toFixed(2);
    } else {
      this.rating = '';
    }
  }
  addReview() {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      width: '600px',
      disableClose: true,
      data: this.episodeDetail.episode,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        location.reload();
        if (this.reviews.length <= 0) {
          this.reviews.push(result.data);
        } else {
          this.reviews = [...this.reviews, result.data];
          console.log(this.reviews);
        }
        this.numberOfReviews = this.reviews.length;

        this.averageRating(this.reviews);
      }
    });
  }
  deleteReview(id) {
    this.reviewService.deleteReview(id).subscribe({
      next: (result) => {
        this.reviews = this.reviews.filter((r) => r.id !== id);
        this.averageRating(this.reviews);
        this.numberOfReviews = this.reviews.length;
        location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  editReview(id) {
    this.reviewUpdate = this.reviews.filter((r) => r.id === id);
    console.log(this.reviewUpdate);
    const dialogRef = this.dialog.open(EditReviewComponent, {
      width: '600px',
      disableClose: true,
      data: {
        review: this.reviewUpdate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.data);
        const updatedReview = result.data;
        const index = this.reviews.findIndex((item) => item.id === id);

        this.reviews[index] = updatedReview;
        this.averageRating(this.reviews);
      }
    });
  }

  moveItem(origin, destination) {
    var temp = this.reviews[destination];
    this.reviews[destination] = this.reviews[origin];

    this.reviews[origin] = temp;
  }

  // Move list item Up
  listItemUp(itemIndex) {
    itemIndex = this.reviews.findIndex((e) => e.id === itemIndex);
    if (itemIndex > 0) {
      this.moveItem(itemIndex, itemIndex - 1);
    }
  }

  // Move list item Down
  listItemDown(itemIndex) {
    itemIndex = this.reviews.findIndex((e) => e.id === itemIndex);
    if (itemIndex < this.reviews.length - 1) {
      this.moveItem(itemIndex, itemIndex + 1);
    }
  }
}
