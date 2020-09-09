import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor() {}
  filteredEpisodes: any[];

  tiles = [
    {
      url: '../../../../assets/empire.jpg',
      episode: 'EMPIRE',
      about:
        'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.',
    },
    {
      url: '../../../../assets/jedi.jpg',
      episode: 'JEDI',
      about:
        'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.',
    },
    {
      url: '../../../../assets/newhope.jpg',
      episode: 'NEWHOPE',
      about:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    },
  ];
  episodes: any[] = ['NEWHOPE', 'EMPIRE', 'JEDI'];

  _listFilterEpisode: string;
  get listFilterEpisode(): string {
    return this._listFilterEpisode;
  }
  set listFilterEpisode(value: string) {
    this._listFilterEpisode = value;
    this.filteredEpisodes = value
      ? this.performFilterEpisode(this._listFilterEpisode)
      : this.tiles;
  }

  ngOnInit() {
    this.filteredEpisodes = this.tiles;
  }

  //filtering technologies by name
  performFilterEpisode(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tiles.filter(
      (e) => e.episode.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
}
