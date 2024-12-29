import classes from './EmptyResource.module.css';

interface EmptyResourceProps {
  title: string;
  description: string;
}

const EmptyResource = ({ title, description }: EmptyResourceProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.icon}>📦</div>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyResource;
