import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
  starClassName = 'star-rating-blank';
  @Input() starId;
  @Input() rating;

  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starClassName = 'star-rating-filled';
    }
  }

  onenter() {
    this.starEnter.emit(this.starId);
  }

  onleave() {
    this.starLeave.emit(this.starId);
  }

  onclick() {
    this.starClicked.emit(this.starId);
  }
}
