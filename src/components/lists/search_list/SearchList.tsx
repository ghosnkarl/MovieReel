import classes from './SearchList.module.css';
import { getPosterImage, getProfileImage } from '../../../helpers/imageSizes';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export interface ISearchItem {
  id: number;
  image: string | null;
  type: 'movie' | 'tv' | 'person' | 'keyword' | 'company';
  title: string;
  date: string | null;
  setOpen: (dropdownOpen: boolean) => void;
  clearInput: () => void;
}

const SearchItem = ({
  id,
  image,
  type,
  title,
  date,
  setOpen,
  clearInput,
}: ISearchItem) => {
  const navigate = useNavigate();

  const handleSearchClicked = () => {
    navigate(`/${type}/${id}`);
    clearInput();
    setOpen(false);
  };

  const poster =
    type === 'person'
      ? getProfileImage(image, 'w185')
      : type === 'movie' || type === 'tv'
      ? getPosterImage(image, 'w342')
      : null;
  return (
    <div onClick={handleSearchClicked} key={id} className={classes.item}>
      {poster && <img className={classes.poster} src={poster} alt={title} />}
      <div className={classes['text__container']}>
        <h1 className={classes.title}>{title}</h1>
        {date && <p className={classes.text}>{moment(date).format('YYYY')}</p>}
      </div>
    </div>
  );
};

const SearchList = ({
  data,
  setOpen,
  clearInput,
}: {
  data: ISearchItem[];
  setOpen: (dropdownOpen: boolean) => void;
  clearInput: () => void;
}) => {
  return (
    <ul className={classes.list}>
      {data.map((item) => (
        <SearchItem
          key={item.id}
          {...item}
          setOpen={setOpen}
          clearInput={clearInput}
        />
      ))}
    </ul>
  );
};

export default SearchList;
