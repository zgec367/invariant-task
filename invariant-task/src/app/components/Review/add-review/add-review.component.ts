import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/data/review.service';
import { count } from 'console';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  saving = false;
  close = true;
  wentWrongMessage = false;
  episode: string;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  reviewDto: Review = {
    id: null,
    episode: null,
    commentary: null,
    stars: null,
  };
  review: Review = { ...this.reviewDto };
  constructor(
    private dialogRef: MatDialogRef<AddReviewComponent>,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.episode = this.data;
  }
  /* (starEnter)="onenter($event)"
  (starLeave)="onleave()"
  (starClicked)="onclick($event)"
*/

  onenter(starId: number) {
    this.hoverState = starId;
  }
  onleave() {
    this.hoverState = 0;
  }
  onclick(starId: number) {
    this.rating = starId;
    console.log(this.review.stars);
  }
  submitReview(form: NgForm) {
    if (this.rating != 0) {
      this.saving = true;
      if (form.valid) {
        this.review.episode = this.data;
        this.review.stars = this.rating;
        this.reviewService.newReview(this.review).subscribe({
          next: (result) => {
            //getting created data from server, reason: getting id

            var createdReview: any = {};
            createdReview = result.data;
            this.review.id = createdReview.createReview.id;
            this.review.commentary = createdReview.createReview.commentary;
            this.review.episode = createdReview.createReview.episode;
            this.review.stars = createdReview.createReview.stars;
            console.log(result.data);
            this.saving = false;
            this.close = false;
            this.dismiss();
          },
          error: (error) => {
            console.log(error);
          },
        });

        console.log(this.review);
      }
    }
  }

  // close dialog window
  dismiss() {
    if (!this.close) {
      this.dialogRef.close({ data: this.review });
    } else {
      this.dialogRef.close();
    }
  }
}
