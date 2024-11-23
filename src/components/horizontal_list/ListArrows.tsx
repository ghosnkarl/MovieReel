import { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { motion } from 'framer-motion';

interface IListArrows {
  listRef: HTMLUListElement | null;
}

const ListArrows = ({ listRef }: IListArrows) => {
  const [scrollPosition, setScrollPosition] = useState(0); // Track the scroll position

  const handleNext = () => {
    if (listRef) {
      setScrollPosition(() => {
        const newScrollPosition = listRef.scrollLeft + listRef.clientWidth;
        listRef.scrollLeft = newScrollPosition;
        return newScrollPosition;
      });
    }
  };

  const handleLeft = () => {
    if (listRef) {
      setScrollPosition(() => {
        const newScrollPosition = listRef.scrollLeft - listRef.clientWidth;
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
    <div className='list-arrows__container'>
      {showButtons && (
        <motion.button
          whileHover={{
            scale: scrollPosition <= 0 ? 1 : 1.2,
          }}
          className={`btn-arrow ${
            scrollPosition <= 0 ? 'btn-arrow--disabled' : ''
          }`}
          onClick={handleLeft}
        >
          <MdNavigateBefore />
        </motion.button>
      )}

      {showButtons && (
        <motion.button
          whileHover={{
            scale: disableNext ? 1 : 1.2,
          }}
          className={`btn-arrow ${disableNext ? 'btn-arrow--disabled' : ''}`}
          onClick={handleNext}
        >
          <MdNavigateNext />
        </motion.button>
      )}
    </div>
  );
};

export default ListArrows;
