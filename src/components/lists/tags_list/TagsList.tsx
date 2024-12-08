import { MdCheck } from 'react-icons/md';
import classes from './TagsList.module.css';

interface ITagProps {
  children: string;
  selected?: boolean;
  onClick: () => void;
}

const Tag: React.FC<ITagProps> = ({ children, selected, onClick }) => (
  <span
    onClick={onClick}
    className={`${classes.tag} ${selected ? classes['tag--selected'] : ''}`}
  >
    {selected && <MdCheck className={classes['tag__check']} />}
    {children}
  </span>
);

interface ITags {
  tagsList: string[];
  handleSelectTag: (tag: string) => void;
  selectedTag: string;
}

const TagsList: React.FC<ITags> = ({
  tagsList,
  handleSelectTag,
  selectedTag,
}: ITags) => {
  return (
    <div className={classes.tags}>
      {tagsList.map((job) => (
        <Tag
          key={job}
          selected={job === selectedTag}
          onClick={() => handleSelectTag(job)}
        >
          {job}
        </Tag>
      ))}
    </div>
  );
};

export default TagsList;
