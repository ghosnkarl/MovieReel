import { FaCircleExclamation } from 'react-icons/fa6';
import classes from './ErrorBlock.module.css';

interface ErrorInterface {
  message: string;
  onTryAgainClick: () => void;
}

export default function ErrorBlock({
  message,
  onTryAgainClick,
}: ErrorInterface) {
  return (
    <div className={classes.container}>
      <div className={classes['error__container']}>
        <FaCircleExclamation className={classes.icon} />

        <h2 className={classes.title}>Error Fetching Data</h2>
        <p className={classes.message}>{message}</p>

        <button onClick={onTryAgainClick} className={classes.refresh}>
          Refresh
        </button>
      </div>
    </div>
  );
}
