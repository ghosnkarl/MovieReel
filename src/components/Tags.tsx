import classes from '../styles/people-details.module.css';

interface ITags {
  tagsList: string[];
  handleSelectTag: (tag: string) => void;
  selectedTag: string;
}

const Tags = ({ tagsList, handleSelectTag, selectedTag }: ITags) => {
  return (
    <div className={classes['departments-container']}>
      {tagsList.map((job) => (
        <button
          onClick={() => handleSelectTag(job)}
          key={job}
          className={`btn btn-department ${
            selectedTag === job ? 'selected' : ''
          }`}
        >
          {job}
        </button>
      ))}
    </div>
  );
};

export default Tags;
