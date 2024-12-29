import classes from './DetailsMediaItem.module.css';
interface DetailsMediaItemProps {
  title: string;
  text: string | number | undefined;
}

const DetailsMediaItem = ({ title, text }: DetailsMediaItemProps) => {
  if (!text) return null;
  return (
    <div className={classes.container}>
      <p className={classes.title}>{title}</p>
      <p className={classes.text}>{text}</p>
    </div>
  );
};

export default DetailsMediaItem;
