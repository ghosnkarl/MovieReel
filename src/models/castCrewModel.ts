import { IIdName } from './commonModel';

interface ICastCrew extends IIdName {
  known_for_department: string;
  profile_path: string;
}

interface IBaseRole {
  credit_id: string;
  episode_count: number;
}

interface ICastRole extends IBaseRole {
  character: string;
}

interface ICrewRole extends IBaseRole {
  job: string;
}

export interface ICast extends ICastCrew {
  character: string;
  cast_id: number;
  roles: ICastRole[];
}

export interface ICrew extends ICastCrew {
  credit_id: string;
  department: string;
  job: string;
  jobs: ICrewRole[];
}
