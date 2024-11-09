import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from './pages/HomePage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http';
import MoviesPage from './pages/movies/MoviesPage';
import TVPage from './pages/tv/TVPage';
import PeoplePage from './pages/people/PeoplePage';
import DiscoverPage from './pages/DiscoverPage';
import ReviewsPage from './pages/ReviewsPage';
import ImagesPage from './pages/ImagesPages';
import PeopleDetailsPage from './pages/people/PeopleDetailsPage';

import CreditsPage from './pages/CreditsPage';

import DetailsRootLayout from './pages/DetailsRootLayout';
import ErrorPage from './components/ErrorPage';
import OutletRootLayout from './components/OutletRootLayout';
import MovieDetails from './pages/movies/MovieDetails';
import TVDetailsPage from './pages/tv/TVDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'movies',
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <MoviesPage />,
          },
          {
            path: ':movieId',
            element: <OutletRootLayout />,
            children: [
              {
                index: true,
                element: <MovieDetails />,
              },
              {
                path: '',
                element: <DetailsRootLayout />,
                children: [
                  {
                    path: 'cast',
                    element: <CreditsPage />,
                  },
                  {
                    path: 'review',
                    element: <ReviewsPage />,
                  },
                  {
                    path: 'images',
                    element: <ImagesPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'tv',
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <TVPage />,
          },
          {
            path: ':tvId',
            element: <OutletRootLayout />,
            children: [
              {
                index: true,
                element: <TVDetailsPage />,
              },
              {
                path: '',
                element: <DetailsRootLayout />,
                children: [
                  {
                    path: 'cast',
                    element: <CreditsPage />,
                  },
                  {
                    path: 'review',
                    element: <ReviewsPage />,
                  },
                  {
                    path: 'images',
                    element: <ImagesPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'people',
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <PeoplePage />,
          },
          {
            path: ':personId',
            element: <OutletRootLayout />,
            children: [
              { index: true, element: <PeopleDetailsPage /> },
              {
                path: '',
                element: <DetailsRootLayout />,
                children: [
                  {
                    path: 'images',
                    element: <ImagesPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: 'discover', element: <DiscoverPage /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
