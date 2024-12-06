import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/http';
import TVPage from './pages/tv_pages/TVPage';
import PeoplePage from './pages/people_pages/PeoplePage';
import DiscoverPage from './pages/discover_page/DiscoverPage';
import PeopleDetailsPage from './pages/people_pages/PeopleDetailsPage';
import ErrorPage from './pages/error_page/ErrorPage';
import DetailsPage from './pages/details_page/DetailsPage';
import OutletRootLayout from './components/ui/OutletRootLayout';
import HomePage from './pages/homepage/HomePage';
import MoviesPage from './pages/movies_page/MoviesPage';

import SearchPage from './pages/search_page/SearchPage';

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
            element: <DetailsPage isMovie={true} />,
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
            element: <DetailsPage isMovie={false} />,
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
            element: <PeopleDetailsPage />,
          },
        ],
      },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'search', element: <SearchPage /> },
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
