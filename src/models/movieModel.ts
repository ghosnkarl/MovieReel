import { ICollection } from './collectionModel';
import { IGenre } from './genreModel';
import { IImage } from './imageModel';
import { IKeyword } from './keywordModel';
import { ICast, ICrew, IMovie } from './mediaModel';
import { IProductionCompany } from './productionCompanyModel';
import { IReview } from './reviewModel';
import { IVideo } from './videoModel';

export interface IMovieDetailsImages {
  backdrops: IImage[];
  posters: IImage[];
  logos: IImage[];
}

export interface IMovieDetails extends IMovie {
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  imdb_id: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  production_companies: IProductionCompany[];
  credits: { cast: ICast[]; crew: ICrew[] };
  videos: { results: IVideo[] };
  images: IMovieDetailsImages;
  keywords: { keywords: IKeyword[] };
  reviews: { results: IReview[] };
  recommendations: { results: IMovie[] };
}
