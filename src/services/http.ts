import { QueryClient } from '@tanstack/react-query';
import { IIdName } from '../models/commonModel';

export const queryClient = new QueryClient();

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Helper function to handle building the URL with optional query parameters
const buildURL = (
  path: string,
  params: { [key: string]: string } | string | null,
  pageParam?: number
): string => {
  let queryParams = params
    ? typeof params === 'object'
      ? new URLSearchParams(params as { [key: string]: string }).toString()
      : params
    : '';

  if (pageParam) queryParams += '&page=' + pageParam;

  // Only append `&` if queryParams exists (avoiding unnecessary `&` in URL)
  return `${BASE_URL}/${path}?api_key=${API_KEY}${
    queryParams ? '&' + queryParams : ''
  }`;
};

// Simplified function to throw errors with detailed messages
const handleFetchError = (response: Response): never => {
  const error = new Error('An error occurred while fetching the data');
  response.json().then((json) => {
    // Now includes the actual error message in the thrown error
    error.message = JSON.stringify(json);
  });
  throw error; // Re-throw the error to be handled by the calling function
};

// Generic fetch function for reusable API calls
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    handleFetchError(response);
  }

  return await response.json();
};

// Function to fetch genres
export const fetchGenres = async (type: string): Promise<IIdName[]> => {
  const url = buildURL(`genre/${type}/list`, null);
  const { genres } = await fetchData<{
    genres: IIdName[];
  }>(url);
  return genres;
};

// Type for the query parameters
interface QueryInterface {
  path: string;
  params: { [key: string]: string } | string | null;
  pageParam?: number;
}

// Function to fetch a single result (reusable for multiple endpoints)
export const fetchSingleResult = async <T>({
  path,
  params,
}: QueryInterface): Promise<T> => {
  const url = buildURL(path, params);
  return await fetchData<T>(url);
};

export interface IResultsProps<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export const fetchResults = async <T>({
  path,
  params,
  pageParam,
}: QueryInterface): Promise<IResultsProps<T>> => {
  const url = buildURL(path, params, pageParam);

  const data = await fetchData<IResultsProps<T>>(url);

  return {
    page: data.page,
    results: data.results,
    total_pages: data.total_pages,
  };
};
