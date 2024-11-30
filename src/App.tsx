import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http';
import TVPage from './pages/tv_pages/TVPage';
import PeoplePage from './pages/people_pages/PeoplePage';
import DiscoverPage from './pages/discover_page/DiscoverPage';
import ImagesPage from './pages/images_page/ImagesPages';
import PeopleDetailsPage from './pages/people_pages/PeopleDetailsPage';
import DetailsRootLayout from './components/ui/details_root_layout/DetailsRootLayout';
import ErrorPage from './pages/error_page/ErrorPage';
import SeasonDetailsPage from './pages/tv_pages/SeasonDetailsPage';
import DetailsPage from './pages/details_page/DetailsPage';
import OutletRootLayout from './components/ui/OutletRootLayout';
import HomePage from './pages/homepage/HomePage';
import MoviesPage from './pages/movies_page/MoviesPage';
import CreditsPage from './pages/credits_page/CreditsPage';
import ReviewsPage from './pages/reviews_page/ReviewsPage';

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
                element: <DetailsPage isMovie={true} />,
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
                element: <DetailsPage isMovie={false} />,
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
                  {
                    path: 'seasons/:seasonNumber',
                    element: <SeasonDetailsPage />,
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
