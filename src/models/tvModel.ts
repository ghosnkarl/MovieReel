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
  created_by: { id: number; name: string }[];
}
