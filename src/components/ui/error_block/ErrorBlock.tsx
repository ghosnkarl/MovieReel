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
        <div className={classes['error__block']}>
          <FaCircleExclamation className={classes['error__block--icon']} />
          <div>
            <h2 className={classes['error__block--title']}>
              Error Fetching Data
            </h2>
            <p className={classes['error__block--message']}>{message}</p>
          </div>
        </div>

        <button onClick={onTryAgainClick} className={classes['error__btn']}>
          Refresh
        </button>
      </div>
    </div>
  );
}
