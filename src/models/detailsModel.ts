import { IBaseIdName, IImage, IReview, IVideo } from './commonModel';
import { ICast, ICrew } from './castCrewModel';
import { IMedia } from './mediaModel';
import { ISeason } from './seasonModel';

export type Results<T> = { results: T[] };
export type Credits = { cast: ICast[]; crew: ICrew[] };

export interface IDetailsImages {
  backdrops: IImage[];
  posters: IImage[];
  logos: IImage[];
}

export interface IDetails extends IMedia {
  // Common
  homepage: string;
  genres: IBaseIdName[];
  status: string;
  tagline: string;
  videos: Results<IVideo>;
  images: IDetailsImages;
  reviews: Results<IReview>;
  recommendations: Results<IMedia>;
  vote_count: number;
  production_companies: IBaseIdName[];
  keywords: { [key: string]: IBaseIdName[] };

  // Movie
  belongs_to_collection?: IBaseIdName | null;
  budget?: number;
  imdb_id?: string;
  revenue?: number;
  runtime?: number;
  credits?: Credits;

  // TV Show
  networks?: IBaseIdName[];
  last_air_date?: string;
  aggregate_credits?: Credits;
  created_by?: IBaseIdName[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: ISeason[];
}
