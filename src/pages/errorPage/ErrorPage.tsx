import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import classes from './ErrorPage.module.css';
import Navigation from '../../components/ui/navigation/Navigation';

const ErrorPage = () => {
  const error = useRouteError();

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
        <h1 className={classes.title}>Oops! An error Occured!</h1>
        <h2 className={classes.message}>{errorMessage}</h2>
        <button
          onClick={() => window.location.reload()}
          className={classes.back}
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
