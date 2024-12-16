import classes from './ErrorComponent.module.css';

interface ErrorComponentProps {
  onRetry?: () => void;
}

const ErrorComponent = ({ onRetry }: ErrorComponentProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h2 className={classes.title}>Oops! Something Went Wrong</h2>
        <p className={classes.message}>An error occured while fetching data.</p>
        {onRetry && (
          <button className={classes.retry} onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
