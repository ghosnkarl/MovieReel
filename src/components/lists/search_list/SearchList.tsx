import classes from './SearchList.module.css';
import { getPosterImage, getProfileImage } from '../../../helpers/imageSizes';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ISearchItem {
  id: number;
  image: string | null;
  type: 'movie' | 'tv' | 'person' | 'keyword' | 'company';
  title: string;
  date: string | null;
}

interface SearchItemProps extends ISearchItem {
  isFocused: boolean;
  onClick: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

const SearchItem = ({
  image,
  type,
  title,
  date,
  isFocused,
  onClick,
  itemRef,
}: SearchItemProps) => {
  const poster =
    type === 'person'
      ? getProfileImage(image, 'w185')
      : type === 'movie' || type === 'tv'
      ? getPosterImage(image, 'w342')
      : null;
  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`${classes.item} ${isFocused ? classes.focused : ''}`}
      tabIndex={-1}
    >
      {poster && <img className={classes.poster} src={poster} alt={title} />}
      <div className={classes['text__container']}>
        <h1 className={classes.title}>{title}</h1>
        {date && <p className={classes.text}>{moment(date).format('YYYY')}</p>}
      </div>
    </div>
  );
};

interface SearchListProps {
  data: ISearchItem[];
  setOpen: (dropdownOpen: boolean) => void;
  clearInput: () => void;
}

const SearchList = ({ data, setOpen, clearInput }: SearchListProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useEffect(() => {
  //   listRef.current?.focus();
  // }, []);

  const handleSearchClicked = useCallback(
    (item: ISearchItem) => {
      navigate(`/${item.type}/${item.id}`);
      clearInput();
      setOpen(false);
    },
    [navigate, clearInput, setOpen]
  );

  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (data.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % data.length);
          listRef.current?.focus(); // Focus the list
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + data.length) % data.length);
          listRef.current?.focus();
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            handleSearchClicked(data[focusedIndex]);
          }
          break;
        case 'Escape':
          setOpen(false);
          break;
        default:
          break;
      }
    },
    [data, focusedIndex, handleSearchClicked, setOpen]
  );

  useEffect(() => {
    if (data.length > 0) {
      setFocusedIndex(0);
    }
  }, [data]);

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

  return (
    <ul ref={listRef} className={classes.list} tabIndex={-1}>
      {data.map((item, index) => (
        <SearchItem
          key={item.id}
          {...item}
          isFocused={index === focusedIndex}
          onClick={() => handleSearchClicked(item)}
          itemRef={(el: HTMLDivElement | null) =>
            (itemRefs.current[index] = el)
          }
        />
      ))}
    </ul>
  );
};

export default SearchList;
