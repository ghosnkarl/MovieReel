import { ICollection } from './collectionModel';
import { IGenre } from './genreModel';
import { IImage } from './imageModel';
import { ICast, ICrew, IMedia } from './mediaModel';
import { IProductionCompany } from './productionCompanyModel';
import { IReview } from './reviewModel';
import { IVideo } from './videoModel';

export interface IMovieDetailsImages {
  backdrops: IImage[];
  posters: IImage[];
  logos: IImage[];
}

export interface IMovieDetails {
  backdrop_path: string;
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  production_companies: IProductionCompany[];
  credits: { cast: ICast[]; crew: ICrew[] };
  videos: { results: IVideo[] };
  images: IMovieDetailsImages;
  keywords: { keywords: { id: number; name: string }[] };
  reviews: { results: IReview[] };
  recommendations: { results: IMedia[] };
  similar: { results: IMedia[] };
}
