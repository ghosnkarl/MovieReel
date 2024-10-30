import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "./pages/homepage/HomePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/http";
import MoviesPage from "./pages/movies/MoviesPage";
import TVPage from "./pages/tv/TVPage";
import PeoplePage from "./pages/people/PeoplePage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import MovieDetails from "./pages/movies/movie_details/MovieDetails";
import MoviesRootLayout from "./pages/movies/MoviesRootLayout";

import ReviewsPage from "./pages/reviews/ReviewsPage";
import ImagesPage from "./pages/images/ImagesPages";
import PeopleRootLayout from "./pages/people/PeopleRootLayout";
import PeopleDetailsPage from "./pages/people/PeopleDetailsPage";
import PeopleDetailsRootLayout from "./pages/people/PeopleDetailsRootLayout";
import CreditsPage from "./pages/credits/CreditsPage";
import ErrorPage from "./components/error_page/ErrorPage";
import DetailsRootLayout from "./pages/details_root_layout/DetailsRootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movies",
        element: <MoviesRootLayout />,
        children: [
          {
            index: true,
            element: <MoviesPage />,
          },
          {
            path: ":movieId",
            element: <MoviesRootLayout />,
            children: [
              {
                index: true,
                element: <MovieDetails />,
              },
              {
                path: "",
                element: <DetailsRootLayout />,
                children: [
                  {
                    path: "cast",
                    element: <CreditsPage />,
                  },
                  {
                    path: "review",
                    element: <ReviewsPage />,
                  },
                  {
                    path: "images",
                    element: <ImagesPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "tv", element: <TVPage /> },
      {
        path: "people",
        element: <PeopleRootLayout />,
        children: [
          {
            index: true,
            element: <PeoplePage />,
          },
          {
            path: ":personId",
            element: <PeopleDetailsRootLayout />,
            children: [
              { index: true, element: <PeopleDetailsPage /> },
              {
                path: "images",
                element: <ImagesPage />,
              },
            ],
          },
        ],
      },
      { path: "discover", element: <DiscoverPage /> },
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
