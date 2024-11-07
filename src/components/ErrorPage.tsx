import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import classes from '../styles/error-page.module.css';
import Navigation from './Navigation';
import { IoArrowBack } from 'react-icons/io5';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.status === 404
        ? "The page you're looking for is beyond our reach"
        : error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <>
      <Navigation />
      <div className={classes.error}>
        <h1 className={classes['error__title']}>Oops! An error Occured!</h1>
        <h2 className={classes['error__message']}>{errorMessage}</h2>
        <button onClick={() => navigate(-1)} className='btn btn--gradient'>
          <IoArrowBack />
          Back
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
