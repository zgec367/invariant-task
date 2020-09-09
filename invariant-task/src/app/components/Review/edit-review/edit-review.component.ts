import { Component, OnInit, Inject } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewService } from 'src/app/data/review.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  saving = false;
  close = true;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  review: Review;
  constructor(
    private dialogRef: MatDialogRef<EditReviewComponent>,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.review = { ...this.data.review[0] };
    this.rating = this.review.stars;
  }

  submitReview(form: NgForm) {
    this.saving = true;
    if (form.valid) {
      this.review.stars = this.rating;
      console.log(this.review);
      this.reviewService.updateReview(this.review.id, this.review).subscribe({
        next: (result) => {
          this.saving = false;
          this.close = false;
          console.log(result.data);
          console.log(this.review);

          this.dismiss();
        },
        error: (error) => {
          console.log(error);
        },
      });

      console.log(this.review);
    }
  }
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
  // close dialog window
  dismiss() {
    if (!this.close) {
      this.dialogRef.close({ data: this.review });
    } else {
      this.dialogRef.close();
    }
  }
}
