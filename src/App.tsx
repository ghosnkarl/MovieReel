import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http';
import PeoplePage from './pages/peoplePage/PeoplePage';
import DiscoverPage from './pages/discoverPage/DiscoverPage';
import PeopleDetailsPage from './pages/peoplePage/PeopleDetailsPage';
import ErrorPage from './pages/errorPage/ErrorPage';
import DetailsPage from './pages/detailsPage/DetailsPage';
import OutletRootLayout from './components/ui/OutletRootLayout';
import HomePage from './pages/homepage/HomePage';
import MediaListPage from './pages/moviesPage/MediaListPage';
import SeasonDetailsPage from './pages/tvPage/SeasonDetailsPage';
import AboutPage from './pages/aboutPage/AboutPage';
import RootLayout from './components/ui/RootLayout';
import { MediaType } from './helpers/constants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: MediaType.MOVIE,
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <MediaListPage type={MediaType.MOVIE} />,
          },
          {
            path: ':movieId',
            element: <DetailsPage isMovie={true} />,
          },
        ],
      },
      {
        path: MediaType.TV,
        element: <OutletRootLayout />,
        children: [
          {
            index: true,
            element: <MediaListPage type={MediaType.TV} />,
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
