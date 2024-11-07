export interface IMedia {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  release_date: string;
  genre_ids: number[];
}

export interface ICast {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
}

export interface ICrew {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
