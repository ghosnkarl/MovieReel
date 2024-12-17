import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http';
import PeoplePage from './pages/people_pages/PeoplePage';
import DiscoverPage from './pages/discover_page/DiscoverPage';
import PeopleDetailsPage from './pages/people_pages/PeopleDetailsPage';
import ErrorPage from './pages/error_page/ErrorPage';
import DetailsPage from './pages/details_page/DetailsPage';
import OutletRootLayout from './components/ui/OutletRootLayout';
import HomePage from './pages/homepage/HomePage';
import MediaListPage from './pages/movies_page/MediaListPage';
import { MOVIE_TYPE, TV_TYPE } from './helpers/constants';
import SeasonDetailsPage from './pages/tv_pages/SeasonDetailsPage';
import AboutPage from './pages/about_page/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: MOVIE_TYPE,
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <MediaListPage type='movie' />,
          },
          {
            path: ':movieId',
            element: <DetailsPage isMovie={true} />,
          },
        ],
      },
      {
        path: TV_TYPE,
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <MediaListPage type='tv' />,
          },
          {
            path: ':tvId',
            element: <OutletRootLayout />,
            children: [
              { index: true, element: <DetailsPage isMovie={false} /> },
              { path: 'seasons/:seasonNumber', element: <SeasonDetailsPage /> },
            ],
          },
        ],
      },
      {
        path: 'person',
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <PeoplePage />,
          },
          {
            path: ':personId',
            element: <PeopleDetailsPage />,
          },
        ],
      },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'about', element: <AboutPage /> },
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
