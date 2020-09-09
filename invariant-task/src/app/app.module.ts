import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/Home/home/home.component';
import { ReviewComponent } from './components/Review/review.component';
import { ToolbarComponent } from './components/Toolbar/toolbar/toolbar.component';
import { AddReviewComponent } from './components/Review/add-review/add-review.component';
import { GraphQLModule } from './graphql.module';
import { EditReviewComponent } from './components/Review/edit-review/edit-review.component';
import { EpisodeReviewsComponent } from './components/Review/episode-reviews/episode-reviews.component';
import { StarComponent } from './components/Rating/star/star.component';

const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reviews', component: ReviewComponent },
  {
    path: 'episode-reviews',
    component: EpisodeReviewsComponent,
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReviewComponent,
    ToolbarComponent,
    AddReviewComponent,
    EditReviewComponent,
    EpisodeReviewsComponent,
    StarComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
