import classes from '../../styles/media-details.module.css';

interface MediaDetailsItem {
  title: string;
  text: string;
}

const MediaDetailsItem = ({ title, text }: MediaDetailsItem) => {
  return (
    <div className={classes['details__left--item']}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default MediaDetailsItem;
