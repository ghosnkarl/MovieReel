import { QueryClient } from "@tanstack/react-query";
import {
  CastInterface,
  CrewInterface,
  MediaListInterface,
  MovieDetailsInterface,
} from "../models/mediaModel";
import { PeopleListInterface, PersonInterface } from "../models/peopleModel";
import { GenreInterface } from "../models/genreModel";
import { KeywordInterface } from "../models/keywordModel";

export const queryClient = new QueryClient();

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const buildURL = (
  path: string,
  params: { [key: string]: string } | null
): string => {
  let queryParams = null;
  if (params) {
    queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
  }

  const url = `${BASE_URL}/${path}?api_key=${API_KEY}&${queryParams || ""}`;
  return url;
};

async function getResponse(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");

    error.message = await response.json();
    throw error;
  }

  const { results } = await response.json();
  return results;
}

export async function search(
  type: string,
  query: string
): Promise<KeywordInterface[]> {
  const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`;

  return getResponse(url);
}

export async function fetchMovieDetails(
  id: string | undefined
): Promise<MovieDetailsInterface> {
  const params = {
    append_to_response:
      "credits,images,videos,keywords,reviews,recommendations,similar",
    include_image_language: "en,null",
  };

  const url = buildURL(`movie/${id}`, params);
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");

    error.message = await response.json();
    throw error;
  }
  return await response.json();
}

export async function fetchPeopleDetails(
  id: string | undefined
): Promise<PersonInterface> {
  const url = `${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=images,combined_credits&include_image_language=null`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");

    error.message = await response.json();
    throw error;
  }
  return await response.json();
}

export async function fetchCastDetails(
  id: string | undefined
): Promise<{ cast: CastInterface[]; crew: CrewInterface[] }> {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");

    error.message = await response.json();
    throw error;
  }
  return await response.json();
}

export async function discover(
  type: "movie" | "tv",
  discoverParams: string
): Promise<MediaListInterface[]> {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&${discoverParams}`;
  return getResponse(url);
}

export async function fetchTrendingMovies(
  type: "day" | "week"
): Promise<MediaListInterface[]> {
  const url = buildURL(`trending/movie/${type}`, null);

  return getResponse(url);
}

export async function fetchTrendingTV(
  type: string
): Promise<MediaListInterface[]> {
  const url = `${BASE_URL}/trending/tv/${type}?api_key=${API_KEY}`;

  return getResponse(url);
}

export async function fetchMovies(type: string): Promise<MediaListInterface[]> {
  const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;

  return getResponse(url);
}

export async function fetchTV(type: string): Promise<MediaListInterface[]> {
  const url = `${BASE_URL}/tv/${type}?api_key=${API_KEY}`;
  return getResponse(url);
}

export async function fetchGenres(type: string): Promise<GenreInterface[]> {
  const url = `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");

    error.message = await response.json();
    throw error;
  }
  const { genres } = await response.json();

  return genres;
}

export async function fetchPopular(): Promise<PeopleListInterface[]> {
  const url = `${BASE_URL}/person/popular?api_key=${API_KEY}`;
  return getResponse(url);
}
