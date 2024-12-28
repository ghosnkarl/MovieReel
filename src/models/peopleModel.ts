import { MediaType } from '../helpers/constants';
import { IBaseIdName, IImage } from './commonModel';

export interface IPeople extends IBaseIdName {
  profile_path: string;
}

interface IBaseCastCrewMedia {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  credit_id: string;
  vote_average: number;
}

export interface ICastMedia extends IBaseCastCrewMedia {
  character: string;
}

export interface ICrewMedia extends IBaseCastCrewMedia {
  department: string;
  job: string;
}

export interface IPerson {
  id: number;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  known_for_department: string | null;
  name: string;
  place_of_birth: string | null;
  profile_path: string | null;
  images: {
    profiles: IImage[];
  };
  combined_credits: { cast: ICastMedia[]; crew: ICrewMedia[] };
}
