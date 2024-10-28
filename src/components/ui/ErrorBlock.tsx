import classes from "./error.module.css";

interface ErrorInterface {
  title: string;
  message: string;
  onTryAgainClick: () => void;
}

export default function ErrorBlock({
  title,
  message,
  onTryAgainClick,
}: ErrorInterface) {
  return (
    <div className={classes["error-block"]}>
      <div className={classes.container}>
        <div className={classes["error-block-icon"]}>!</div>
        <div className={classes["error-block-text"]}>
          <h2>{title}</h2>
          <p>{message}</p>
          <button onClick={onTryAgainClick} className="btn btn-error">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
