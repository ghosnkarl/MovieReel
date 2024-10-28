import { useLocation, useNavigate } from "react-router-dom";
import classes from "./reviews-page.module.css";
import { ReviewInterface } from "../../models/mediaModel";
import Review from "../../components/review/Review";
import { IoArrowBack } from "react-icons/io5";

const ReviewsPage = () => {
  const location = useLocation();
  const { title, image, reviews } = location.state;
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div onClick={() => navigate(-1)} className={classes.header}>
        <img src={image} alt={title} />
        <div>
          <h1 className={classes["movie-title"]}>{title}</h1>
          <p>
            <IoArrowBack />
            Back to main
          </p>
        </div>
      </div>
      <ul className={classes["reviews-list"]}>
        {reviews.results.map((review: ReviewInterface) => (
          <Review key={review.id} review={review} shortenText={false} />
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
