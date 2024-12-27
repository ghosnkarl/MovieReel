import classes from './DetailsMediaItem.module.css';
interface MediaDetailsItem {
  title: string;
  text: string | number | undefined;
}

const DetailsMediaItem = ({ title, text }: MediaDetailsItem) => {
  if (!text) return null;
  return (
    <div className={classes['details__container']}>
      <p className={classes['details__title']}>{title}</p>
      <p className={classes['details__text']}>{text}</p>
    </div>
  );
};

export default DetailsMediaItem;
