export interface IBaseMedia {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
}

export interface IMovie extends IBaseMedia {
  title: string;
  release_date: string;
}

export interface ITVShow extends IBaseMedia {
  name: string;
  first_air_date: string;
}
