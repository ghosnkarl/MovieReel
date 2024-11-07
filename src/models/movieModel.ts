import { CollectionInterface } from './collectionModel';
import { GenreInterface } from './genreModel';
import { ImageInterface } from './imageModel';
import { CastInterface, CrewInterface, MediaListInterface } from './mediaModel';
import { ProductionCompanyInterface } from './productionCompanyModel';
import { ReviewInterface } from './reviewModel';
import { VideoInterface } from './videoModel';

export interface MovieDetailsImagesInterface {
  backdrops: ImageInterface[];
  posters: ImageInterface[];
  logos: ImageInterface[];
}

export interface MovieDetailsInterface {
  backdrop_path: string;
  belongs_to_collection: CollectionInterface | null;
  budget: number;
  genres: GenreInterface[];
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
  production_companies: ProductionCompanyInterface[];
  credits: { cast: CastInterface[]; crew: CrewInterface[] };
  videos: { results: VideoInterface[] };
  images: MovieDetailsImagesInterface;
  keywords: { keywords: { id: number; name: string }[] };
  reviews: { results: ReviewInterface[] };
  recommendations: { results: MediaListInterface[] };
  similar: { results: MediaListInterface[] };
}
