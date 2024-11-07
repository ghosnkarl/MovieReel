import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const buildURL = (
  path: string,
  params: { [key: string]: string } | null | string
): string => {
  let queryParams = null;

  if (params && typeof params === 'object') {
    queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
  }
  if (params && typeof params === 'string') queryParams = params;

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

export async function fetchGenres(type: string) {
  const url = buildURL(`genre/${type}/list`, null);
  const { genres } = await getResponse(url);
  return genres;
}

interface QueryInterface {
  path: string;
  params: { [key: string]: string } | string | null;
}

export const fetchSingleResult = async ({ path, params }: QueryInterface) => {
  const url = buildURL(path, params);
  const response = await getResponse(url);
  return response;
};

export const fetchResults = async ({ path, params }: QueryInterface) => {
  const url = buildURL(path, params);
  const { results } = await getResponse(url);
  return results;
};
