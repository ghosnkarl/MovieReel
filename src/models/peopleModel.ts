import { IImage } from './imageModel';

export interface IPeople {
  id: number;
  profile_path: string;
  name: string;
  known_for: { title?: string; name?: string }[];
}

export interface ICastMedia {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  character: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  credit_id: string;
  vote_average: number;
}

export interface ICrewMedia {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  department: string;
  job: string;
  release_date?: string;

  first_air_date?: string;
  poster_path: string;
  credit_id: string;
  vote_average: number;
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
