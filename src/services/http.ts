import { QueryClient } from '@tanstack/react-query';

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

export async function search(type: string, query: string) {
  const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`;

  const { results } = await getResponse(url);
  return results;
}

export async function fetchMovieDetails(id: string | undefined) {
  const params = {
    append_to_response:
      'credits,images,videos,keywords,reviews,recommendations,similar',
    include_image_language: 'en,null',
  };

  const url = buildURL(`movie/${id}`, params);
  return await getResponse(url);
}

export async function fetchPeopleDetails(id: string | undefined) {
  const params = {
    append_to_response: 'images,combined_credits',
    include_image_language: 'en,null',
  };

  const url = buildURL(`person/${id}`, params);

  return await getResponse(url);
}

export async function fetchCastDetails(id: string | undefined) {
  const url = buildURL(`movie/${id}/credits`, null);

  return await getResponse(url);
}

export async function discover(type: 'movie' | 'tv', discoverParams: string) {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&${discoverParams}`;
  const { results } = await getResponse(url);
  return results;
}

export async function fetchTrendingMovies(type: 'day' | 'week') {
  const url = buildURL(`trending/movie/${type}`, null);

  const { results } = await getResponse(url);
  return results;
}

export async function fetchTrendingTV(type: 'day' | 'week') {
  const url = buildURL(`trending/tv/${type}`, null);

  const { results } = await getResponse(url);
  return results;
}

export async function fetchMovies(type: string) {
  const url = buildURL(`movie/${type}`, null);
  const { results } = await getResponse(url);
  return results;
}

export async function fetchTV(type: string) {
  const url = buildURL(`tv/${type}`, null);
  const { results } = await getResponse(url);
  return results;
}

export async function fetchGenres(type: string) {
  const url = buildURL(`genre/${type}/list`, null);
  const { genres } = await getResponse(url);
  return genres;
}

interface PaginatedResultsInterface {
  path: string;
  params: { [key: string]: string } | null;
}

export const fetchPaginatedResults = async ({
  path,
  params,
}: PaginatedResultsInterface) => {
  const url = buildURL(path, params);
  const { results } = await getResponse(url);
  return results;
};
