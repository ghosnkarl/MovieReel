import { ImageInterface } from "./mediaModel";

export interface PeopleListInterface {
  id: number;
  profile_path: string;
  name: string;
  known_for: { title?: string; name?: string }[];
}

export interface CastMediaInterface {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  character: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  credit_id: string;
}

export interface CrewMediaInterface {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  department: string;
  job: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  credit_id: string;
}

export interface PersonInterface {
  id: number;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  known_for_department: string | null;
  name: string;
  place_of_birth: string | null;
  profile_path: string | null;
  images: {
    profiles: ImageInterface[];
  };
  combined_credits: { cast: CastMediaInterface[]; crew: CrewMediaInterface[] };
}
