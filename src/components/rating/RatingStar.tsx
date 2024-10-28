import { IoMdStar } from "react-icons/io";
import classes from "./rating-star.module.css";

const RatingStar = ({
  value,
  size,
}: {
  value: number;
  size: "small" | "medium";
}) => {
  return (
    <div className={`${classes.container} ${classes[`container--${size}`]}`}>
      <span>
        <IoMdStar />
      </span>
      <p>{value.toFixed(1)}</p>
    </div>
  );
};

export default RatingStar;
