import { GenreInterface } from "./genreModel";

export interface MediaListInterface {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
  genre_ids: number[];
}

export interface ReviewInterface {
  author: string;
  content: string;
  create_at: string;
  author_details: { rating: number | null };
  id: string;
  updated_at: string;
  url: string;
}

export interface CollectionInterface {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompanyInterface {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface CastInterface {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
}

export interface CrewInterface {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface VideoInterface {
  id: string;
  key: string;
  name: string;
}

export interface ImageInterface {
  file_path: string;
}

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
