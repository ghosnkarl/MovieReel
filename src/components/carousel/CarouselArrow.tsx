import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classes from "./carousel-arrow.module.css";

interface CarouselArrowProps {
  direction: "left" | "right";
  handleClick: () => void;
}

const CarouselArrow = ({ direction, handleClick }: CarouselArrowProps) => {
  const isRight = direction === "right";
  const rightArrowStyle = isRight ? classes["btn-arrow--right"] : "";
  return (
    <div
      className={`${classes["btn-arrow"]} ${rightArrowStyle}`}
      onClick={handleClick}
    >
      {isRight && <IoIosArrowForward className={classes.arrow} />}
      {!isRight && <IoIosArrowBack className={classes.arrow} />}
    </div>
  );
};

export default CarouselArrow;
