import { IMedia } from './mediaModel';

export interface IBaseIdName {
  id: number;
  name: string;
}

export interface ICollectionDetails extends IBaseIdName {
  parts: IMedia[];
}

export interface IImage {
  file_path: string;
}

export interface IReview {
  author: string;
  content: string;
  create_at: string;
  author_details: {
    rating: number | null;
    avatar_path: string | null;
  };
  id: string;
  updated_at: string;
  url: string;
}

export interface IVideo extends IBaseIdName {
  key: string;
  type: string;
}
