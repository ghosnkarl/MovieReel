export interface MediaListInterface {
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
