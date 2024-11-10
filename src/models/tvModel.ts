import { IGenre } from './genreModel';
import { IKeyword } from './keywordModel';
import { ICast, ICrew } from './mediaModel';
import { IMovieDetailsImages } from './movieModel';
import { IProductionCompany } from './productionCompanyModel';
import { IReview } from './reviewModel';
import { IVideo } from './videoModel';

export interface ITV {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  last_air_date: string;
  first_air_date: string;
  genre_ids: number[];
}

export interface ICreatedBy {
  id: number;
  name: string;
}

export interface ITVDetails extends ITV {
  budget: number;
  genres: IGenre[];
  homepage: string;
  imdb_id: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  production_companies: IProductionCompany[];
  aggregate_credits: { cast: ICast[]; crew: ICrew[] };
  videos: { results: IVideo[] };
  images: IMovieDetailsImages;
  keywords: { results: IKeyword[] };
  reviews: { results: IReview[] };
  recommendations: { results: ITV[] };
  created_by: ICreatedBy[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: ISeason[];
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface IEpisode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  air_date: string;
  episode_number: string;
  runtime: number;
  season_number: number;
  still_path: string | null;
}
