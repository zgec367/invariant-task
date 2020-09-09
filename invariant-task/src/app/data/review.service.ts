import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Review, Query } from '../models/Review';
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private apollo: Apollo) {}
  addMutation = gql`
    mutation createReview($review: ReviewInput!) {
      createReview(review: $review) {
        id
        episode
        stars
        commentary
      }
    }
  `;
  updateMutation = gql`
    mutation updateReview($id: ID!, $review: ReviewInput!) {
      updateReview(id: $id, review: $review) {
        episode
        commentary
        id
      }
    }
  `;
  deleteMutation = gql`
    mutation deleteReview($id: ID!) {
      deleteReview(id: $id) {
        episode
      }
    }
  `;
  allReviewsQuery = gql`
    query {
      reviews {
        episode
        stars
        commentary
        id
      }
    }
  `;
  reviewsByEpisodeQuery = gql`
    query getReviewByEpisode($episode: Episode!) {
      getReview(episode: $episode) {
        id
        episode
        stars
        commentary
      }
    }
  `;
  getAllReviews() {
    return this.apollo.watchQuery<any>({
      query: this.allReviewsQuery,
    });
  }
  getReviewsByEpisode(episode: string) {
    return this.apollo.watchQuery<any>({
      query: this.reviewsByEpisodeQuery,
      variables: {
        episode: episode,
      },
    });
  }
  newReview(reviewData: Review) {
    return this.apollo.mutate({
      mutation: this.addMutation,
      variables: {
        review: {
          episode: reviewData.episode,
          commentary: reviewData.commentary,
          stars: reviewData.stars,
        },
      },
    });
  }
  updateReview(id: number, reviewData: Review) {
    return this.apollo.mutate({
      mutation: this.updateMutation,
      variables: {
        id: id,
        review: {
          id: reviewData.id,
          episode: reviewData.episode,
          stars: reviewData.stars,
          commentary: reviewData.commentary,
        },
      },
    });
  }
  deleteReview(id: number) {
    return this.apollo.mutate({
      mutation: this.deleteMutation,
      variables: {
        id: id,
      },
    });
  }
}
