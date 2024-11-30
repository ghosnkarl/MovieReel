import classes from './TagsList.module.css';

interface ITags {
  tagsList: string[];
  handleSelectTag: (tag: string) => void;
  selectedTag: string;
}

const TagsList = ({ tagsList, handleSelectTag, selectedTag }: ITags) => {
  return (
    <div className={classes.container}>
      {tagsList.map((job) => (
        <button
          onClick={() => handleSelectTag(job)}
          key={job}
          className={`${classes['btn-tag']} ${
            selectedTag === job ? classes.selected : ''
          }`}
        >
          {job}
        </button>
      ))}
    </div>
  );
};

export default TagsList;
