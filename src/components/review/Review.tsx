import moment from "moment";
import { ReviewInterface } from "../../models/mediaModel";
import classes from "./review.module.css";
import Rating from "../rating/Rating";

const Review = ({
  review,
  shortenText,
}: {
  review: ReviewInterface;
  shortenText: boolean;
}) => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          {review.author_details.rating && (
            <Rating
              value={(review.author_details.rating * 10).toFixed(0)}
              size="small"
            />
          )}
          <div>
            <h2>{review.author}</h2>
            <span>{moment(review.updated_at).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <p className={shortenText ? classes["max--four-lines"] : ""}>
          {review.content}
        </p>
      </div>
    </div>
  );
};

export default Review;
