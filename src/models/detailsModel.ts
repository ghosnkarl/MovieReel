import { IIdName, IImage, IReview, IVideo } from './commonModel';
import { ICast, ICrew } from './castCrewModel';
import { IMovie, ITVShow } from './mediaModel';
import { ISeason } from './seasonModel';

interface IDetailsImages {
  backdrops: IImage[];
  posters: IImage[];
  logos: IImage[];
}

export interface IBaseDetails {
  homepage: string;
  genres: IIdName[];
  status: string;
  tagline: string;
  production_companies: IIdName[];
  videos: { results: IVideo[] };
  images: IDetailsImages;
  reviews: { results: IReview[] };
  recommendations: { results: IMovie[] };
}

export interface IMovieDetails extends Omit<IMovie, 'genre_ids'>, IBaseDetails {
  belongs_to_collection: IIdName | null;
  budget: number;
  imdb_id: string;
  revenue: number;
  runtime: number;
  credits: { cast: ICast[]; crew: ICrew[] };
  keywords: { keywords: IIdName[] };
}

export interface ITVDetails extends Omit<ITVShow, 'genre_ids'>, IBaseDetails {
  last_air_date: string;
  aggregate_credits: { cast: ICast[]; crew: ICrew[] };
  keywords: { results: IIdName[] };
  created_by: IIdName[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: ISeason[];
}
