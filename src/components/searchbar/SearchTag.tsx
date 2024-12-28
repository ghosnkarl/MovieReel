import { IoClose } from 'react-icons/io5';
import classes from './SearchTag.module.css';

interface SearchTagProps {
  title: string;
  onRemoveTag: () => void;
}

const SearchTag = ({ title, onRemoveTag }: SearchTagProps) => {
  return (
    <div className={classes.container}>
      {title}
      <IoClose onClick={onRemoveTag} className={classes.icon} />
    </div>
  );
};

export default SearchTag;
