export type Review = {
  id: number;
  episode: string;
  stars: number;
  commentary: string;
};
export type Query = {
  reviews: Review[];
};
