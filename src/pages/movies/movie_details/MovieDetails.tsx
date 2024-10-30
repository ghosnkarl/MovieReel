import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../services/http";
import { getBackdropImage, getPosterImage } from "../../../helpers/imageSizes";
import classes from "./movie-details.module.css";
import CastList from "../../../components/details_components/cast/CastList";
import VideoList from "../../../components/details_components/videos/VideoList";
import ImageList from "../../../components/details_components/images/ImageList";
import MediaDetails from "../../../components/details_components/media_details/MediaDetails";
import MediaList from "../../../components/horizontal_list/MediaList";
import DetailsHeader from "../../../components/details_components/details_header/DetailsHeader";
import DetailsReviews from "../../../components/details_components/details_reviews/DetailsReviews";
import { getGalleryImages } from "../../../helpers/galleryImages";
import LoadingIndicator from "../../../components/ui/LoadingIndicator";
import ErrorBlock from "../../../components/ui/ErrorBlock";

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const { data, isError, refetch } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    retry: 0,
  });

  let content = <LoadingIndicator title="Fetching Movie Details" />;

  if (isError) {
    content = (
      <ErrorBlock
        title="Error Fetching Movie Details"
        message="There was an error loading movie details."
        onTryAgainClick={refetch}
      />
    );
  }

  if (data) {
    const images = getGalleryImages({ images: data.images });

    content = (
      <>
        <img
          className={classes["backdrop-img"]}
          src={getBackdropImage(data.backdrop_path, "w1280")}
          alt={data.title}
        />
        <DetailsHeader
          title={data.title}
          overview={data.overview}
          genres={data.genres}
          vote_average={data.vote_average}
          release_date={data.release_date}
          runtime={data.runtime}
        />
        <div className={classes["details-container"]}>
          <div className={classes["main-container"]}>
            {data.credits && (
              <CastList
                title={data.title}
                image={getPosterImage(data.poster_path, "w342")}
                credits={data.credits}
              />
            )}

            {data.videos.results && data.videos.results.length > 0 && (
              <VideoList videos={data.videos.results} />
            )}

            <MediaDetails
              status={data.status}
              homepage={data.homepage}
              imdb_id={data.imdb_id}
              production_companies={data.production_companies}
              revenue={data.revenue}
              budget={data.budget}
              keywords={data.keywords.keywords}
              tagline={data.tagline}
              collection={data.belongs_to_collection}
            />

            <ImageList
              images={images}
              backdropList={data.images.backdrops}
              title={data.title}
              image={getPosterImage(data.poster_path, "w342")}
            />

            <DetailsReviews
              reviews={data.reviews}
              title={data.title}
              poster_path={data.poster_path}
            />

            {data.recommendations &&
              data.recommendations.results &&
              data.recommendations.results.length > 0 && (
                <div>
                  <h1>
                    If you like <strong>{data.title}, </strong>check out
                  </h1>
                  <ul className="horizontal-list--container">
                    <MediaList
                      data={data.recommendations.results}
                      type="movies"
                    />
                  </ul>
                </div>
              )}
          </div>
        </div>
      </>
    );
  }

  return <div className={classes["page-container"]}>{content}</div>;
};

export default MovieDetails;
