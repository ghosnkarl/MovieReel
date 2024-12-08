import { IIdName, IImage, IReview, IVideo } from './commonModel';
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
  // Common keys
  homepage: string;
  genres: IIdName[];
  status: string;
  tagline: string;
  videos: Results<IVideo>;
  images: IDetailsImages;
  reviews: Results<IReview>;
  recommendations: Results<IMedia>;
  vote_count: number;
  production_companies: IIdName[];
  keywords: { [key: string]: IIdName[] };

  // Movie keys
  belongs_to_collection?: IIdName | null;
  budget?: number;
  imdb_id?: string;
  revenue?: number;
  runtime?: number;
  credits?: Credits;

  // TV Show keys
  last_air_date?: string;
  aggregate_credits?: Credits;
  created_by?: IIdName[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: ISeason[];
}
