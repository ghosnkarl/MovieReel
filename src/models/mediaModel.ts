export interface IBaseMedia {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  genre_ids: number[];
}

export interface IMovie extends IBaseMedia {
  title: string;
  release_date: string;
}

export interface ITVShow extends IBaseMedia {
  name: string;
  first_air_date: string;
}

interface ICastCrew {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
}

export interface ICast extends ICastCrew {
  character: string;
  cast_id: number;
  roles: ICastRole[];
}

export interface ICrewRole {
  credit_id: string;
  job: string;
  episode_count: number;
}
export interface ICastRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface ICrew extends ICastCrew {
  credit_id: string;
  department: string;
  job: string;
  jobs: ICrewRole[];
}
