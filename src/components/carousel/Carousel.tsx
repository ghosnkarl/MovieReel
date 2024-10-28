import classes from "./carousel.module.css";

import { useState } from "react";
import { MediaListInterface } from "../../models/mediaModel";
import CarouselItem, { CarouselItemInterface } from "./CarouselItem";
import { GenreInterface } from "../../models/genreModel";
import CarouselArrow from "./CarouselArrow";

const Carousel = ({
  content,
  genres,
}: {
  content: MediaListInterface[];
  genres: GenreInterface[] | undefined;
}) => {
  const [current, setCurrent] = useState<CarouselItemInterface>({
    index: 0,
    isRight: true,
  });
  const length = content?.length;

  const nextSlide = () => {
    setCurrent({
      index: current.index === length - 1 ? 0 : current.index + 1,
      isRight: true,
    });
  };

  const prevSlide = () => {
    setCurrent({
      index: current.index === 0 ? length - 1 : current.index - 1,
      isRight: false,
    });
  };

  return (
    <div className={classes.carousel}>
      <CarouselItem genres={genres} current={current} content={content} />
      <CarouselArrow direction="right" handleClick={nextSlide} />
      <CarouselArrow direction="left" handleClick={prevSlide} />
    </div>
  );
};

export default Carousel;
