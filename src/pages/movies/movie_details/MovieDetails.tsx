import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../services/http";
import {
  getBackdropImage,
  getLogoImage,
  getPosterImage,
} from "../../../helpers/imageSizes";
import classes from "./movie-details.module.css";
import CastList from "../../../components/details_components/cast/CastList";
import VideoList from "../../../components/details_components/videos/VideoList";
import ImageList from "../../../components/details_components/images/ImageList";
import MediaDetails from "../../../components/details_components/media_details/MediaDetails";
import Review from "../../../components/review/Review";
import MediaList from "../../../components/horizontal_list/MediaList";
import DetailsHeader from "../../../components/details_components/details_header/DetailsHeader";

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const { data } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    retry: 1,
  });

  let content = <></>;

  if (data) {
    let backdropList = [...data.images.backdrops];
    if (backdropList.length > 8) backdropList = backdropList.slice(0, 8);

    // Get random review to display
    let reviewContent = <></>;
    if (
      data.reviews &&
      data.reviews.results &&
      data.reviews.results.length > 3
    ) {
      reviewContent = (
        <div>
          <div className="list-header">
            <h1>Reviews</h1>
            <NavLink
              state={{
                reviews: data.reviews,
                title: data.title,
                image: getPosterImage(data.poster_path, "w342"),
              }}
              className="btn-view"
              to="review"
            >
              View All
            </NavLink>
          </div>
          <ul className={classes["reviews-list"]}>
            {data.reviews.results.slice(0, 3).map((review) => (
              <Review key={review.id} review={review} shortenText={true} />
            ))}
          </ul>
        </div>
      );
    }

    let backdrops: { galleryImage: string; fullImage: string }[] = [];
    let logos: { galleryImage: string; fullImage: string }[] = [];
    let posters: { galleryImage: string; fullImage: string }[] = [];

    if (
      data.images &&
      data.images.backdrops &&
      data.images.backdrops.length > 0
    )
      backdrops = data.images.backdrops.map((backdrop) => {
        return {
          galleryImage: getBackdropImage(backdrop.file_path, "w300"),
          fullImage: getBackdropImage(backdrop.file_path, "original"),
        };
      });

    if (data.images && data.images.logos && data.images.logos.length > 0)
      logos = data.images.logos.map((logo) => {
        return {
          galleryImage: getLogoImage(logo.file_path, "w300"),
          fullImage: getLogoImage(logo.file_path, "original"),
        };
      });

    if (data.images && data.images.posters && data.images.posters.length > 0)
      posters = data.images.posters.map((posters) => {
        return {
          galleryImage: getPosterImage(posters.file_path, "w342"),
          fullImage: getPosterImage(posters.file_path, "original"),
        };
      });

    const images = [...backdrops, ...logos, ...posters];

    content = (
      <div className={classes["page-container"]}>
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

            {backdropList && backdropList.length > 0 && (
              <ImageList
                images={images}
                backdropList={backdropList}
                title={data.title}
                image={getPosterImage(data.poster_path, "w342")}
              />
            )}

            {reviewContent}

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
      </div>
    );
  }

  return <>{content}</>;
};

export default MovieDetails;
