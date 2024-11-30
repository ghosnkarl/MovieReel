import { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { motion } from 'framer-motion';
import classes from './HorizontalList.module.css';

interface IArrowButton {
  handleClick: () => void;
  disabled: boolean | null;
  isNext: boolean;
}

const ArrowButton = ({ disabled, handleClick, isNext }: IArrowButton) => {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.2,
      }}
      className={`${classes['btn-arrow']} ${
        disabled ? classes['btn-arrow--disabled'] : ''
      }`}
      onClick={handleClick}
    >
      {isNext ? <MdNavigateNext /> : <MdNavigateBefore />}
    </motion.button>
  );
};

interface IListArrows {
  listRef: HTMLUListElement | null;
}

const ListArrows = ({ listRef }: IListArrows) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleArrowClicked = (isNext: boolean) => {
    if (listRef) {
      setScrollPosition(() => {
        const newScrollPosition = isNext
          ? listRef.scrollLeft + listRef.clientWidth
          : listRef.scrollLeft - listRef.clientWidth;
        listRef.scrollLeft = newScrollPosition;
        return newScrollPosition;
      });
    }
  };

  const disableNext =
    listRef && listRef.scrollWidth - scrollPosition < listRef.clientWidth;

  let showButtons = null;
  if (listRef) showButtons = listRef.scrollWidth > listRef.clientWidth;

  return (
    <div className={classes['arrows__container']}>
      {showButtons && (
        <ArrowButton
          disabled={scrollPosition <= 0}
          handleClick={() => handleArrowClicked(false)}
          isNext={false}
        />
      )}

      {showButtons && (
        <ArrowButton
          disabled={disableNext}
          handleClick={() => handleArrowClicked(true)}
          isNext={true}
        />
      )}
    </div>
  );
};

export default ListArrows;
