import { QueryClient } from '@tanstack/react-query';
import {
  CastInterface,
  CrewInterface,
  MediaListInterface,
  MovieDetailsInterface,
} from '../models/mediaModel';
import { PeopleListInterface, PersonInterface } from '../models/peopleModel';
import { GenreInterface } from '../models/genreModel';
import { KeywordInterface } from '../models/keywordModel';

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
      .join('&');
  }

  const url = `${BASE_URL}/${path}?api_key=${API_KEY}&${queryParams || ''}`;
  return url;
};

async function getResponse(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');

    error.message = await response.json();
    throw error;
  }

  const result = await response.json();
  return result;
}

export async function search(
  type: string,
  query: string
): Promise<KeywordInterface[]> {
  const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`;

  const { results } = await getResponse(url);
  return results;
}

export async function fetchMovieDetails(
  id: string | undefined
): Promise<MovieDetailsInterface> {
  const params = {
    append_to_response:
      'credits,images,videos,keywords,reviews,recommendations,similar',
    include_image_language: 'en,null',
  };

  const url = buildURL(`movie/${id}`, params);
  return await getResponse(url);
}

export async function fetchPeopleDetails(
  id: string | undefined
): Promise<PersonInterface> {
  const params = {
    append_to_response: 'images,combined_credits',
    include_image_language: 'en,null',
  };

  const url = buildURL(`person/${id}`, params);

  return await getResponse(url);
}

export async function fetchCastDetails(
  id: string | undefined
): Promise<{ cast: CastInterface[]; crew: CrewInterface[] }> {
  const url = buildURL(`movie/${id}/credits`, null);

  return await getResponse(url);
}

export async function discover(
  type: 'movie' | 'tv',
  discoverParams: string
): Promise<MediaListInterface[]> {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&${discoverParams}`;
  const { results } = await getResponse(url);
  return results;
}

export async function fetchTrendingMovies(
  type: 'day' | 'week'
): Promise<MediaListInterface[]> {
  const url = buildURL(`trending/movie/${type}`, null);

  const { results } = await getResponse(url);
  return results;
}

export async function fetchTrendingTV(
  type: 'day' | 'week'
): Promise<MediaListInterface[]> {
  const url = buildURL(`trending/tv/${type}`, null);

  const { results } = await getResponse(url);
  return results;
}

export async function fetchMovies(type: string): Promise<MediaListInterface[]> {
  const url = buildURL(`movie/${type}`, null);
  const { results } = await getResponse(url);
  return results;
}

export async function fetchTV(type: string): Promise<MediaListInterface[]> {
  const url = buildURL(`tv/${type}`, null);
  const { results } = await getResponse(url);
  return results;
}

export async function fetchGenres(type: string): Promise<GenreInterface[]> {
  const url = buildURL(`genre/${type}/list`, null);
  const { genres } = await getResponse(url);
  return genres;
}

export async function fetchPopular(): Promise<PeopleListInterface[]> {
  const url = buildURL('person/popular', null);
  const { results } = await getResponse(url);
  return results;
}
