import classes from '../../styles/loading.module.css';

export default function LoadingIndicator({ title }: { title: string }) {
  return (
    <div className={classes.container}>
      <div className={classes['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>{title}</h1>
    </div>
  );
}
