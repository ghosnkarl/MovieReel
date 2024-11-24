import { IMovie } from './mediaModel';

export interface IIdName {
  id: number;
  name: string;
}

export type MediaType = 'movie' | 'tv';

export interface ICollectionDetails extends IIdName {
  parts: IMovie[];
}

export interface IImage {
  file_path: string;
}

export interface IReview {
  author: string;
  content: string;
  create_at: string;
  author_details: { rating: number | null };
  id: string;
  updated_at: string;
  url: string;
}

export interface IVideo extends IIdName {
  key: string;
  type: string;
}
