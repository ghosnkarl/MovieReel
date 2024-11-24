import { IIdName } from './commonModel';

export interface ISeasonBase extends IIdName {
  air_date: string;
  overview: string;
  vote_average: number;
  season_number: number;
}

export interface ISeason extends ISeasonBase {
  episode_count: number;
  poster_path: string | null;
  episodes: IEpisode[];
}

export interface IEpisode extends ISeasonBase {
  episode_number: number;
  runtime: number;
  still_path: string | null;
}
