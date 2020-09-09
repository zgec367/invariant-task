import { Component } from '@angular/core';
import { ReviewService } from './data/review.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private reviewService: ReviewService) {}
  ngOnInit() {}
}
