import { MdCheck } from 'react-icons/md';
import classes from './TagsList.module.css';

interface TagProps {
  children: string;
  selected?: boolean;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ children, selected, onClick }) => (
  <span
    onClick={onClick}
    className={`${classes.tag} ${selected ? classes.tagSelected : ''}`}
  >
    {selected && <MdCheck className={classes.tagCheck} />}
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
