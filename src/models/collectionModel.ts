import { IMovie } from './mediaModel';

export interface ICollection {
  id: number;
  name: string;
}

export interface ICollectionDetails extends ICollection {
  parts: IMovie[];
}
