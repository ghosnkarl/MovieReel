export interface IMedia {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
}
